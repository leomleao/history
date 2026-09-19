type VoyageElements = {
  root: HTMLElement;
  image: HTMLImageElement;
  track: SVGPathElement;
  progress: SVGPathElement;
  ship: SVGGElement;
  play: HTMLButtonElement;
  replay: HTMLButtonElement;
  view: HTMLButtonElement;
  range: HTMLInputElement;
  output: HTMLOutputElement;
  status: HTMLElement;
  ports: HTMLButtonElement[];
};

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function findElements(root: HTMLElement): VoyageElements | null {
  const image = root.querySelector<HTMLImageElement>('[data-voyage-image]');
  const track = root.querySelector<SVGPathElement>('[data-voyage-track]');
  const progress = root.querySelector<SVGPathElement>('[data-voyage-progress]');
  const ship = root.querySelector<SVGGElement>('[data-voyage-ship]');
  const play = root.querySelector<HTMLButtonElement>('[data-voyage-play]');
  const replay = root.querySelector<HTMLButtonElement>('[data-voyage-replay]');
  const view = root.querySelector<HTMLButtonElement>('[data-voyage-view]');
  const range = root.querySelector<HTMLInputElement>('[data-voyage-range]');
  const output = root.querySelector<HTMLOutputElement>('[data-voyage-output]');
  const status = root.querySelector<HTMLElement>('[data-voyage-status]');
  if (!image || !track || !progress || !ship || !play || !replay || !view || !range || !output || !status) {
    return null;
  }
  return {
    root,
    image,
    track,
    progress,
    ship,
    play,
    replay,
    view,
    range,
    output,
    status,
    ports: Array.from(root.querySelectorAll<HTMLButtonElement>('[data-voyage-port]')),
  };
}

function enhanceVoyageMap(root: HTMLElement): void {
  const elements = findElements(root);
  if (!elements) return;

  const {
    image,
    track,
    progress: progressPath,
    ship,
    play,
    replay,
    view,
    range,
    output,
    status,
    ports,
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
    progress: root.dataset.progressStatus ?? 'Route progress: {value}%.',
    imageError: root.dataset.imageError ?? 'The historical map could not be loaded; the route remains available.',
  };

  let value = motionQuery.matches ? 1 : 0;
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

  ports.forEach((port) => {
    const x = Number(port.dataset.voyageX);
    const y = Number(port.dataset.voyageY);
    if (Number.isFinite(x) && Number.isFinite(y)) {
      port.dataset.voyagePosition = String(locatePointOnRoute(x, y));
    }
  });

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

  function render(nextValue: number): void {
    value = Math.max(0, Math.min(1, nextValue));
    root.style.setProperty('--voyage-progress', String(value));
    progressPath.style.strokeDashoffset = String(1 - value);
    const rangeValue = String(Math.round(value * 1000));
    range.value = rangeValue;
    range.setAttribute('aria-valuetext', `${Math.round(value * 100)}%`);
    output.value = `${Math.round(value * 100)}%`;

    const position = track.getPointAtLength(totalLength * value);
    const sample = Math.max(totalLength * 0.004, 0.5);
    const before = track.getPointAtLength(Math.max(0, totalLength * value - sample));
    const after = track.getPointAtLength(Math.min(totalLength, totalLength * value + sample));
    const heading = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
    ship.setAttribute('transform', `translate(${position.x} ${position.y}) rotate(${heading})`);

    ports.forEach((port) => {
      const portValue = Number(port.dataset.voyagePosition);
      port.setAttribute('aria-pressed', String(Number.isFinite(portValue) && Math.abs(portValue - value) < 0.002));
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
    if (!lastFrame) lastFrame = timestamp;
    const elapsed = Math.min(timestamp - lastFrame, 100);
    lastFrame = timestamp;
    render(value + elapsed / duration);
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
    if (value >= 1) render(0);
    if (!visible || document.visibilityState !== 'visible') {
      resumeWhenVisible = true;
      queuedAnnouncement = message ?? queuedAnnouncement;
      return;
    }
    playing = true;
    lastFrame = performance.now();
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
    stopPlayback();
    render(0);
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
    stopPlayback();
    render(Number(range.value) / 1000);
  });
  range.addEventListener('change', () => {
    announce(labels.progress.replace('{value}', String(Math.round(value * 100))));
  });

  ports.forEach((port) => {
    port.addEventListener('click', () => {
      const portValue = Number(port.dataset.voyagePosition);
      if (!Number.isFinite(portValue)) return;
      autoStarted = true;
      userPaused = true;
      resumeWhenVisible = false;
      queuedAnnouncement = '';
      stopPlayback();
      render(portValue);
      announce(port.dataset.voyageContext ?? port.textContent?.trim() ?? '');
    });
  });

  view.addEventListener('click', () => {
    const flat = root.toggleAttribute('data-flat');
    view.setAttribute('aria-pressed', String(flat));
    view.textContent = flat ? labels.tilted : labels.flat;
  });

  const markImageReady = (): void => {
    if (image.naturalWidth <= 0) return;
    imageReady = true;
    root.dataset.imageState = 'ready';
    if (status.textContent === labels.imageError) status.textContent = '';
    maybeStartOrResume();
  };

  const markImageError = (): void => {
    imageReady = false;
    root.dataset.imageState = 'error';
    announce(labels.imageError);
  };

  image.addEventListener('load', markImageReady);
  image.addEventListener('error', markImageError);
  if (image.complete && image.naturalWidth > 0) markImageReady();
  else if (image.complete && image.currentSrc) markImageError();

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
    stopPlayback();
    render(1);
  });

  root.dataset.enhanced = 'true';
  updatePlayControl();
  render(value);
}

document.querySelectorAll<HTMLElement>('[data-voyage-map]').forEach(enhanceVoyageMap);

export {};
