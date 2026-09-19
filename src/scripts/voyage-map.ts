type VoyageElements = {
  root: HTMLElement;
  image: HTMLImageElement;
  track: SVGPathElement;
  progress: SVGPathElement;
  ship: SVGGElement;
  shipShape: SVGGElement;
  smoke: SVGGElement;
  play: HTMLButtonElement;
  replay: HTMLButtonElement;
  view: HTMLButtonElement;
  range: HTMLInputElement;
  output: HTMLOutputElement;
  status: HTMLElement;
  ports: HTMLButtonElement[];
  portMarks: SVGGElement[];
};

type Puff = {
  el: SVGCircleElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  r0: number;
  r1: number;
  a0: number;
};

const SVG_NS = 'http://www.w3.org/2000/svg';
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

/** How long the ship holds at an intermediate port before getting under way again. */
const PORT_DWELL_MS = 1400;
/** Time constant for the heading to settle toward the route tangent. */
const HEADING_TAU_MS = 220;
/** Time constant for the smoothed speed estimate. */
const SPEED_TAU_MS = 300;
/** Interval between smoke puffs while under way. */
const SMOKE_INTERVAL_MS = 300;
/** Funnel position in ship-local units (bow at +x). */
const FUNNEL_OFFSET = -4.6;

function findElements(root: HTMLElement): VoyageElements | null {
  const image = root.querySelector<HTMLImageElement>('[data-voyage-image]');
  const track = root.querySelector<SVGPathElement>('[data-voyage-track]');
  const progress = root.querySelector<SVGPathElement>('[data-voyage-progress]');
  const ship = root.querySelector<SVGGElement>('[data-voyage-ship]');
  const shipShape = root.querySelector<SVGGElement>('[data-voyage-ship-shape]');
  const smoke = root.querySelector<SVGGElement>('[data-voyage-smoke]');
  const play = root.querySelector<HTMLButtonElement>('[data-voyage-play]');
  const replay = root.querySelector<HTMLButtonElement>('[data-voyage-replay]');
  const view = root.querySelector<HTMLButtonElement>('[data-voyage-view]');
  const range = root.querySelector<HTMLInputElement>('[data-voyage-range]');
  const output = root.querySelector<HTMLOutputElement>('[data-voyage-output]');
  const status = root.querySelector<HTMLElement>('[data-voyage-status]');
  if (!image || !track || !progress || !ship || !shipShape || !smoke || !play || !replay || !view || !range || !output || !status) {
    return null;
  }
  return {
    root,
    image,
    track,
    progress,
    ship,
    shipShape,
    smoke,
    play,
    replay,
    view,
    range,
    output,
    status,
    ports: Array.from(root.querySelectorAll<HTMLButtonElement>('[data-voyage-port]')),
    portMarks: Array.from(root.querySelectorAll<SVGGElement>('[data-voyage-port-mark]')),
  };
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function enhanceVoyageMap(root: HTMLElement): void {
  const elements = findElements(root);
  if (!elements) return;

  const {
    image,
    track,
    progress: progressPath,
    ship,
    shipShape,
    smoke,
    play,
    replay,
    view,
    range,
    output,
    status,
    ports,
    portMarks,
  } = elements;
  const totalLength = track.getTotalLength();
  if (!Number.isFinite(totalLength) || totalLength <= 0) return;

  const duration = Number(root.dataset.duration) || 30_000;
  const labels = {
    play: root.dataset.playLabel ?? 'Play',
    pause: root.dataset.pauseLabel ?? 'Pause',
    replay: root.dataset.replayLabel ?? 'Replay',
    flat: root.dataset.flatLabel ?? 'Flat view',
    tilted: root.dataset.tiltedLabel ?? 'Tilted view',
    playing: root.dataset.playingStatus ?? 'The voyage is underway.',
    paused: root.dataset.pausedStatus ?? 'The voyage is paused.',
    replaying: root.dataset.replayingStatus ?? 'The voyage has started again.',
    complete: root.dataset.completeStatus ?? 'The ship has reached Santos.',
    calling: root.dataset.callingStatus ?? 'Calling at {port}.',
    progress: root.dataset.progressStatus ?? 'Route progress: {value}%.',
    imageError: root.dataset.imageError ?? 'The historical map could not be loaded; the route remains available.',
  };

  /** Raw progress along the scrubber, 0–1. */
  let value = motionQuery.matches ? 1 : 0;
  /** Eased position along the track from the previous render, used for the speed estimate. */
  let lastPosition = value;
  /** Displayed heading in degrees, smoothed toward the route tangent while playing. */
  let heading = 0;
  /** When true the next render snaps the heading instead of easing it. */
  let snap = true;
  /** Smoothed speed relative to the nominal constant-speed traversal (1 = nominal). */
  let speed = 0;
  let dwellRemaining = 0;
  const dwelled = new Set<string>();
  let smokeClock = 0;
  const puffs: Puff[] = [];
  let playing = false;
  let visible = false;
  let imageReady = false;
  let userPaused = false;
  let autoStarted = motionQuery.matches;
  let resumeWhenVisible = false;
  let queuedAnnouncement = '';
  let lastFrame = 0;
  let frame = 0;
  const stage = root.querySelector<HTMLElement>('.voyage-map__stage') ?? root;

  function locatePointOnRoute(x: number, y: number): number {
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    const samples = 600;
    for (let index = 0; index <= samples; index += 1) {
      const candidate = index / samples;
      const point = track.getPointAtLength(totalLength * candidate);
      const distance = (point.x - x) ** 2 + (point.y - y) ** 2;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = candidate;
      }
    }
    let radius = 1 / samples;
    for (let pass = 0; pass < 4; pass += 1) {
      const candidates = [best - radius, best - radius / 2, best, best + radius / 2, best + radius];
      candidates.forEach((rawCandidate) => {
        const candidate = Math.max(0, Math.min(1, rawCandidate));
        const point = track.getPointAtLength(totalLength * candidate);
        const distance = (point.x - x) ** 2 + (point.y - y) ** 2;
        if (distance < bestDistance) {
          bestDistance = distance;
          best = candidate;
        }
      });
      radius /= 3;
    }
    return best;
  }

  type Stop = { id: string; label: string; position: number; button: HTMLButtonElement; mark?: SVGGElement };
  const stops: Stop[] = [];
  ports.forEach((port) => {
    const x = Number(port.dataset.voyageX);
    const y = Number(port.dataset.voyageY);
    const id = port.dataset.voyagePort ?? '';
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const position = locatePointOnRoute(x, y);
    port.dataset.voyagePosition = String(position);
    stops.push({
      id,
      label: port.textContent?.trim() ?? id,
      position,
      button: port,
      mark: portMarks.find((mark) => mark.dataset.voyagePortMark === id),
    });
  });
  stops.sort((a, b) => a.position - b.position);
  const legBounds = [0, ...stops.map((stop) => stop.position).filter((position) => position > 0.001 && position < 0.999), 1];
  const intermediateStops = stops.filter((stop) => stop.position > 0.001 && stop.position < 0.999);

  /** Remaps raw progress so the ship slows into each port and gathers way on leaving. */
  function easedPosition(raw: number): number {
    for (let index = 0; index < legBounds.length - 1; index += 1) {
      const start = legBounds[index] ?? 0;
      const end = legBounds[index + 1] ?? 1;
      if (raw >= start && raw <= end && end > start) {
        return start + easeInOutSine((raw - start) / (end - start)) * (end - start);
      }
    }
    return raw;
  }

  function syncDwelled(): void {
    dwelled.clear();
    stops.forEach((stop) => {
      if (stop.position <= value + 0.0015) dwelled.add(stop.id);
    });
    dwellRemaining = 0;
  }

  function shipScale(): number {
    const transform = getComputedStyle(shipShape).transform;
    if (!transform || transform === 'none') return 1;
    const match = /matrix\(([^,]+),/.exec(transform);
    const scale = match ? Number(match[1]) : 1;
    return Number.isFinite(scale) && scale > 0 ? scale : 1;
  }

  function clearSmoke(): void {
    puffs.forEach((puff) => puff.el.remove());
    puffs.length = 0;
    smokeClock = 0;
  }

  /** Smoke lives in map space: each puff is released at the funnel and then lifts from that spot. */
  function stepSmoke(elapsed: number, sea: number, position: DOMPoint): void {
    if (motionQuery.matches) return;
    const scale = shipScale();
    smokeClock += elapsed;
    if (smokeClock >= SMOKE_INTERVAL_MS && sea > 0.05) {
      smokeClock = 0;
      const radians = (heading * Math.PI) / 180;
      const x = position.x + Math.cos(radians) * FUNNEL_OFFSET * scale;
      const y = position.y + Math.sin(radians) * FUNNEL_OFFSET * scale;
      const el = document.createElementNS(SVG_NS, 'circle');
      el.setAttribute('cx', x.toFixed(1));
      el.setAttribute('cy', y.toFixed(1));
      el.setAttribute('r', (3 * scale).toFixed(2));
      smoke.appendChild(el);
      puffs.push({
        el,
        x,
        y,
        age: 0,
        life: 3200 + Math.random() * 800,
        vx: 0.0028 + (Math.random() - 0.5) * 0.002,
        vy: -0.0052 + (Math.random() - 0.5) * 0.002,
        r0: 3 * scale,
        r1: (11 + Math.random() * 4) * scale,
        a0: 0.55 + 0.3 * sea,
      });
    }
    for (let index = puffs.length - 1; index >= 0; index -= 1) {
      const puff = puffs[index];
      if (!puff) continue;
      puff.age += elapsed;
      if (puff.age >= puff.life) {
        puff.el.remove();
        puffs.splice(index, 1);
        continue;
      }
      const k = puff.age / puff.life;
      puff.x += puff.vx * elapsed;
      puff.y += puff.vy * elapsed;
      puff.el.setAttribute('cx', puff.x.toFixed(1));
      puff.el.setAttribute('cy', puff.y.toFixed(1));
      puff.el.setAttribute('r', (puff.r0 + (puff.r1 - puff.r0) * Math.sqrt(k)).toFixed(2));
      puff.el.setAttribute('opacity', (puff.a0 * (1 - k) * (1 - k * 0.5)).toFixed(3));
    }
  }

  function announce(message: string): void {
    status.textContent = message;
  }

  function updatePlayControl(): void {
    play.setAttribute('aria-pressed', String(playing));
    root.toggleAttribute('data-playing', playing);
    const label = playing ? labels.pause : labels.play;
    play.setAttribute('aria-label', label);
    const text = play.querySelector<HTMLElement>('[data-voyage-play-text]');
    if (text) text.textContent = label;
  }

  function tangentAt(position: number): number {
    const sample = Math.max(totalLength * 0.006, 0.5);
    const before = track.getPointAtLength(Math.max(0, totalLength * position - sample));
    const after = track.getPointAtLength(Math.min(totalLength, totalLength * position + sample));
    return (Math.atan2(after.y - before.y, after.x - before.x) * 180) / Math.PI;
  }

  /**
   * Draws the current state. `elapsed` is the frame time in ms while playing; when omitted the
   * ship is positioned instantly (scrub, port jump, initial render) with no smoothing.
   */
  function render(nextValue: number, elapsed = 0): void {
    value = Math.max(0, Math.min(1, nextValue));
    const position = easedPosition(value);
    root.style.setProperty('--voyage-progress', String(position));
    progressPath.style.strokeDashoffset = String(1 - position);
    range.value = String(Math.round(value * 1000));
    range.setAttribute('aria-valuetext', `${Math.round(value * 100)}%`);
    output.value = `${Math.round(value * 100)}%`;

    const point = track.getPointAtLength(totalLength * position);
    const target = tangentAt(position);
    if (snap || elapsed <= 0) {
      heading = target;
      snap = false;
    } else {
      let delta = target - heading;
      delta = ((delta % 360) + 540) % 360 - 180;
      heading += delta * (1 - Math.exp(-elapsed / HEADING_TAU_MS));
    }
    ship.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${heading})`);

    if (elapsed > 0) {
      const instantaneous = Math.max(0, (position - lastPosition) / elapsed) * duration;
      speed += (instantaneous - speed) * (1 - Math.exp(-elapsed / SPEED_TAU_MS));
    } else {
      speed = 0;
    }
    lastPosition = position;
    const sea = Math.min(1, Math.max(0, (speed - 0.32) / 0.45));
    ship.style.setProperty('--voyage-sea', sea.toFixed(3));
    root.toggleAttribute('data-at-sea', sea > 0.02);
    if (elapsed > 0 && playing) stepSmoke(elapsed, sea, point);

    stops.forEach((stop) => {
      stop.button.setAttribute('aria-pressed', String(Math.abs(stop.position - position) < 0.002));
      stop.mark?.toggleAttribute('data-reached', position >= stop.position - 0.0015);
    });
  }

  function stopPlayback(): void {
    playing = false;
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    updatePlayControl();
  }

  function tick(timestamp: number): void {
    if (!playing) return;
    if (!lastFrame) {
      lastFrame = timestamp;
      frame = window.requestAnimationFrame(tick);
      return;
    }
    const elapsed = Math.max(0, Math.min(timestamp - lastFrame, 100));
    lastFrame = timestamp;
    if (!elapsed) {
      frame = window.requestAnimationFrame(tick);
      return;
    }
    if (dwellRemaining > 0) {
      dwellRemaining -= elapsed;
      render(value, elapsed);
      frame = window.requestAnimationFrame(tick);
      return;
    }
    let next = value + elapsed / duration;
    for (const stop of intermediateStops) {
      if (value < stop.position && next >= stop.position && !dwelled.has(stop.id)) {
        next = stop.position;
        dwelled.add(stop.id);
        dwellRemaining = PORT_DWELL_MS;
        announce(labels.calling.replace('{port}', stop.label));
        break;
      }
    }
    render(next, elapsed);
    if (value >= 1) {
      stopPlayback();
      resumeWhenVisible = false;
      announce(labels.complete);
      return;
    }
    frame = window.requestAnimationFrame(tick);
  }

  function startPlayback(message?: string): void {
    if (playing) return;
    if (value >= 1) {
      clearSmoke();
      snap = true;
      render(0);
      syncDwelled();
    }
    if (!visible || document.visibilityState !== 'visible') {
      resumeWhenVisible = true;
      queuedAnnouncement = message ?? queuedAnnouncement;
      return;
    }
    playing = true;
    lastFrame = 0;
    updatePlayControl();
    const announcement = message ?? queuedAnnouncement;
    queuedAnnouncement = '';
    if (announcement) announce(announcement);
    frame = window.requestAnimationFrame(tick);
  }

  function maybeStartOrResume(): void {
    if (!visible || document.visibilityState !== 'visible') return;
    if (resumeWhenVisible && !userPaused && value < 1) {
      resumeWhenVisible = false;
      startPlayback(queuedAnnouncement || undefined);
      return;
    }
    if (!autoStarted && imageReady && !motionQuery.matches) {
      autoStarted = true;
      userPaused = false;
      startPlayback(labels.playing);
    }
  }

  function suspendOffscreen(): void {
    if (!playing) return;
    resumeWhenVisible = !userPaused && value < 1;
    stopPlayback();
  }

  /** Stops playback and positions the ship instantly, clearing anything tied to motion. */
  function jumpTo(nextValue: number): void {
    stopPlayback();
    clearSmoke();
    snap = true;
    render(nextValue);
    syncDwelled();
  }

  play.addEventListener('click', () => {
    autoStarted = true;
    if (playing) {
      userPaused = true;
      resumeWhenVisible = false;
      queuedAnnouncement = '';
      stopPlayback();
      announce(labels.paused);
      return;
    }
    userPaused = false;
    if (!visible) {
      stage.scrollIntoView({ behavior: motionQuery.matches ? 'auto' : 'smooth', block: 'center' });
    }
    startPlayback(labels.playing);
  });

  replay.addEventListener('click', () => {
    autoStarted = true;
    userPaused = false;
    resumeWhenVisible = false;
    queuedAnnouncement = '';
    jumpTo(0);
    if (!visible) {
      stage.scrollIntoView({ behavior: motionQuery.matches ? 'auto' : 'smooth', block: 'center' });
    }
    startPlayback(labels.replaying);
  });

  range.addEventListener('input', () => {
    autoStarted = true;
    userPaused = true;
    resumeWhenVisible = false;
    queuedAnnouncement = '';
    jumpTo(Number(range.value) / 1000);
  });
  range.addEventListener('change', () => {
    announce(labels.progress.replace('{value}', String(Math.round(value * 100))));
  });

  stops.forEach((stop) => {
    stop.button.addEventListener('click', () => {
      autoStarted = true;
      userPaused = true;
      resumeWhenVisible = false;
      queuedAnnouncement = '';
      jumpTo(stop.position);
      announce(stop.button.dataset.voyageContext ?? stop.label);
    });
  });

  view.addEventListener('click', () => {
    const flat = root.toggleAttribute('data-flat');
    view.setAttribute('aria-pressed', String(flat));
    view.textContent = flat ? labels.tilted : labels.flat;
  });

  const markImageReady = (): void => {
    imageReady = true;
    root.dataset.imageState = 'ready';
    maybeStartOrResume();
  };
  if (image.complete && image.naturalWidth > 0) markImageReady();
  else if (image.complete) {
    root.dataset.imageState = 'error';
    announce(labels.imageError);
  } else {
    image.addEventListener('load', markImageReady, { once: true });
    image.addEventListener('error', () => {
      root.dataset.imageState = 'error';
      announce(labels.imageError);
    }, { once: true });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) maybeStartOrResume();
      else suspendOffscreen();
    }, { threshold: 0.18 });
    observer.observe(stage);
  } else {
    visible = true;
    maybeStartOrResume();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') suspendOffscreen();
    else maybeStartOrResume();
  });

  motionQuery.addEventListener('change', (event) => {
    if (!event.matches) return;
    autoStarted = true;
    userPaused = true;
    resumeWhenVisible = false;
    queuedAnnouncement = '';
    jumpTo(1);
  });

  root.dataset.enhanced = 'true';
  updatePlayControl();
  render(value);
  syncDwelled();
}

document.querySelectorAll<HTMLElement>('[data-voyage-map]').forEach(enhanceVoyageMap);

export {};
