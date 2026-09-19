type MediaView = {
  id: string;
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit: string;
  rights: string;
  focalPoint: string;
  title: string;
  description: string;
  sourceId: string;
  href: string;
  role: string;
};

type ChapterPreview = {
  number: string;
  title: string;
  copy: string;
  mediaId: string;
  href: string;
};

type StagePreview = {
  eyebrow: string;
  title: string;
  copy: string;
  mediaId: string;
};

type ExhibitionData = {
  locale: string;
  labels: { chapter: string; inspect: string; loadingError: string };
  media: Record<string, MediaView>;
  chapters: ChapterPreview[];
  stages: Record<string, StagePreview>;
};

const dataNode = document.querySelector<HTMLScriptElement>('#exhibition-data');
let exhibition: ExhibitionData | null = null;

if (dataNode?.textContent) {
  try {
    exhibition = JSON.parse(dataNode.textContent) as ExhibitionData;
  } catch {
    // The server-rendered page remains completely usable when enhancement data is invalid.
  }
}

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let reduceMotion = motionQuery.matches;
const animations = new Set<Animation>();

function animate(
  element: Element | null,
  frames: Keyframe[],
  duration = 440,
  delay = 0,
): Animation | null {
  if (!element || reduceMotion || typeof element.animate !== 'function') return null;
  const animation = element.animate(frames, {
    duration,
    delay,
    easing: 'cubic-bezier(.22,.7,.2,1)',
    fill: 'backwards',
  });
  animations.add(animation);
  void animation.finished.then(
    () => animations.delete(animation),
    () => animations.delete(animation),
  );
  return animation;
}

function lift(element: Element | null, delay = 0): void {
  animate(
    element,
    [
      { opacity: 0.12, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    460,
    delay,
  );
}

motionQuery.addEventListener('change', (event) => {
  reduceMotion = event.matches;
  if (!reduceMotion) return;
  animations.forEach((animation) => animation.cancel());
  animations.clear();
  document.querySelectorAll('.photo-ghost').forEach((element) => element.remove());
});

const imageRequests = new Map<string, Promise<boolean>>();

function requestImage(media: MediaView): Promise<boolean> {
  const cached = imageRequests.get(media.id);
  if (cached) return cached;

  const request = new Promise<boolean>((resolve) => {
    const image = new Image(media.width, media.height);
    image.onload = () => resolve(true);
    image.onerror = () => {
      imageRequests.delete(media.id);
      resolve(false);
    };
    if (media.srcset) image.srcset = media.srcset;
    image.sizes = '100vw';
    image.src = media.src;
  });
  imageRequests.set(media.id, request);
  return request;
}

function setImage(image: HTMLImageElement, media: MediaView): void {
  image.alt = media.alt;
  image.width = media.width;
  image.height = media.height;
  image.style.objectPosition = media.focalPoint;
  image.sizes = image.sizes || '100vw';
  if (media.srcset) image.srcset = media.srcset;
  else image.removeAttribute('srcset');
  image.src = media.src;
}

function enhanceAnchor(anchor: HTMLAnchorElement): HTMLButtonElement {
  const button = document.createElement('button');
  for (const attribute of Array.from(anchor.attributes)) {
    if (!['href', 'target', 'rel', 'download'].includes(attribute.name)) {
      button.setAttribute(attribute.name, attribute.value);
    }
  }
  button.type = 'button';
  button.innerHTML = anchor.innerHTML;
  return button;
}

function setPressed(selector: string, attribute: string, value: string): void {
  document.querySelectorAll<HTMLElement>(selector).forEach((control) => {
    control.setAttribute('aria-pressed', String(control.dataset[attribute] === value));
  });
}

function makeStatus(): HTMLElement | null {
  const home = document.querySelector('.chapters, .journey');
  if (!home) return null;
  const existing = document.querySelector<HTMLElement>('.interaction-status');
  if (existing) return existing;
  const status = document.createElement('p');
  status.className = 'interaction-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  document.querySelector('.journey')?.append(status);
  return status;
}

const interactionStatus = makeStatus();
function reportFailure(): void {
  if (interactionStatus && exhibition) interactionStatus.textContent = exhibition.labels.loadingError;
}
function clearStatus(): void {
  if (interactionStatus) interactionStatus.textContent = '';
}

const stageSelector = document.querySelector<HTMLElement>('.stage-selector');
const stagePhoto = document.querySelector<HTMLImageElement>('.stage-photo');
const stageCaption = document.querySelector<HTMLElement>('.stage-caption');
const stageEyebrow = document.querySelector<HTMLElement>('.stage-copy .eyebrow');
const stageTitle = document.querySelector<HTMLElement>('.stage-copy h2');
const stageCopy = document.querySelector<HTMLElement>('.stage-copy p');
const stageEvidenceLinks = Array.from(
  document.querySelectorAll<HTMLAnchorElement>('.stage-image-open, .look-closer'),
);
let selectedStage =
  document.querySelector<HTMLElement>(
    '[data-stage][data-selected="true"], [data-stage][aria-pressed="true"]',
  )?.dataset.stage ?? 'genoa';
let stageRequest = 0;

function positionStageMarker(): void {
  if (!stageSelector) return;
  const selected = Array.from(stageSelector.querySelectorAll<HTMLElement>('[data-stage]')).find(
    (control) => control.dataset.stage === selectedStage,
  );
  if (!selected) return;
  stageSelector.style.setProperty('--marker-left', `${selected.offsetLeft}px`);
  stageSelector.style.setProperty('--marker-width', `${selected.offsetWidth}px`);
}

function updateEvidenceLink(link: HTMLAnchorElement, media: MediaView): void {
  link.href = media.href;
  link.dataset.evidence = media.id;
  if (link.classList.contains('image-open') && exhibition) {
    link.setAttribute('aria-label', `${exhibition.labels.inspect}: ${media.title}`);
  }
}

async function selectStage(key: string): Promise<void> {
  if (!exhibition) return;
  const request = ++stageRequest;
  if (key === selectedStage) {
    clearStatus();
    setPressed('[data-stage]', 'stage', selectedStage);
    positionStageMarker();
    return;
  }
  const stage = exhibition.stages[key];
  const media = stage ? exhibition.media[stage.mediaId] : undefined;
  if (!stage || !media || !stagePhoto || !stageCaption || !stageEyebrow || !stageTitle || !stageCopy) {
    return;
  }

  const loaded = await requestImage(media);
  if (request !== stageRequest) return;
  if (!loaded) {
    reportFailure();
    setPressed('[data-stage]', 'stage', selectedStage);
    positionStageMarker();
    return;
  }

  clearStatus();
  const frame = stagePhoto.parentElement;
  let ghost: HTMLImageElement | null = null;
  if (!reduceMotion && frame && stagePhoto.currentSrc !== media.src) {
    frame.querySelectorAll('.photo-ghost').forEach((element) => element.remove());
    ghost = stagePhoto.cloneNode(false) as HTMLImageElement;
    ghost.className = 'photo-ghost';
    ghost.alt = '';
    ghost.setAttribute('aria-hidden', 'true');
    frame.append(ghost);
  }

  selectedStage = key;
  setImage(stagePhoto, media);
  stageCaption.textContent = media.caption;
  stageEyebrow.textContent = stage.eyebrow;
  stageTitle.textContent = stage.title;
  stageCopy.textContent = stage.copy;
  stageEvidenceLinks.forEach((link) => updateEvidenceLink(link, media));
  setPressed('[data-stage]', 'stage', key);
  positionStageMarker();

  [stageEyebrow, stageTitle, stageCopy].forEach((element, index) => lift(element, index * 35));
  if (ghost) {
    const fade = animate(ghost, [{ opacity: 1 }, { opacity: 0 }], 520);
    if (fade) void fade.finished.then(() => ghost?.remove(), () => ghost?.remove());
    else ghost.remove();
  }
}

if (exhibition && stageSelector) {
  stageSelector.setAttribute('role', 'group');
  const anchors = Array.from(stageSelector.querySelectorAll<HTMLAnchorElement>('a[data-stage]'));
  anchors.forEach((anchor) => {
    const button = enhanceAnchor(anchor);
    button.addEventListener('click', () => {
      const key = button.dataset.stage;
      if (key) void selectStage(key);
    });
    anchor.replaceWith(button);
  });
  setPressed('[data-stage]', 'stage', selectedStage);
  stageSelector.querySelectorAll<HTMLElement>('[data-selected]').forEach((control) => {
    control.removeAttribute('data-selected');
  });
}

const chapterList = document.querySelector<HTMLElement>('.chapter-list');
const chapterNumber = document.querySelector<HTMLElement>('#chapter-number');
const chapterTitle = document.querySelector<HTMLElement>('#chapter-title');
const chapterCopy = document.querySelector<HTMLElement>('#chapter-copy');
const chapterImage = document.querySelector<HTMLImageElement>('#chapter-image');
const chapterCaption = document.querySelector<HTMLElement>('.chapter-preview-image figcaption');
const chapterLink = document.querySelector<HTMLAnchorElement>('#chapter-link');
const chapterEvidenceLink = document.querySelector<HTMLAnchorElement>('#chapter-preview-source');
let chapterRequest = 0;

async function selectChapter(index: number): Promise<void> {
  if (!exhibition) return;
  const chapter = exhibition.chapters[index];
  const media = chapter ? exhibition.media[chapter.mediaId] : undefined;
  if (
    !chapter ||
    !media ||
    !chapterNumber ||
    !chapterTitle ||
    !chapterCopy ||
    !chapterImage ||
    !chapterCaption ||
    !chapterLink
  ) {
    return;
  }

  const request = ++chapterRequest;
  // Request the matching place immediately so a later explicit place choice wins.
  if (exhibition.stages[chapter.mediaId]) void selectStage(chapter.mediaId);
  const loaded = await requestImage(media);
  if (request !== chapterRequest) return;
  if (!loaded) {
    reportFailure();
    return;
  }

  clearStatus();
  chapterNumber.textContent = `${exhibition.labels.chapter} ${chapter.number}`;
  chapterTitle.textContent = chapter.title;
  chapterCopy.textContent = chapter.copy;
  chapterLink.href = chapter.href;
  if (chapterEvidenceLink) updateEvidenceLink(chapterEvidenceLink, media);
  setImage(chapterImage, media);
  chapterCaption.textContent = media.caption;
  setPressed('[data-chapter]', 'chapter', String(index));
  [chapterNumber, chapterTitle, chapterCopy, chapterImage].forEach((element, order) => {
    element.getAnimations().forEach((animation) => animation.cancel());
    lift(element, order * 30);
  });

}

if (exhibition && chapterList) {
  const initiallySelected = chapterList.querySelector<HTMLElement>(
    '[data-chapter][data-selected="true"], [data-chapter][aria-pressed="true"]',
  )?.dataset.chapter ?? '1';
  chapterList.setAttribute('role', 'group');
  const anchors = Array.from(chapterList.querySelectorAll<HTMLAnchorElement>('a[data-chapter]'));
  anchors.forEach((anchor) => {
    const button = enhanceAnchor(anchor);
    button.addEventListener('click', () => {
      const index = Number(button.dataset.chapter);
      if (Number.isInteger(index)) void selectChapter(index);
    });
    anchor.replaceWith(button);
  });
  setPressed('[data-chapter]', 'chapter', initiallySelected);
  chapterList.querySelectorAll<HTMLElement>('[data-selected]').forEach((control) => {
    control.removeAttribute('data-selected');
  });
}

const dialog = document.querySelector<HTMLDialogElement>('.evidence-dialog');
const dialogPhoto = dialog?.querySelector<HTMLImageElement>('.dialog-photo') ?? null;
const viewport = dialog?.querySelector<HTMLElement>('.image-viewport') ?? null;
const zoomRange = dialog?.querySelector<HTMLInputElement>('#zoom-range') ?? null;
const zoomValue = dialog?.querySelector<HTMLOutputElement>('#zoom-value') ?? null;
const zoomOut = dialog?.querySelector<HTMLButtonElement>('[data-zoom="out"]') ?? null;
const zoomIn = dialog?.querySelector<HTMLButtonElement>('[data-zoom="in"]') ?? null;
const zoomReset = dialog?.querySelector<HTMLButtonElement>('[data-zoom="reset"]') ?? null;
let zoom = 100;
let dialogTrigger: HTMLElement | null = null;
let lockedScroll = 0;

function fitDialogPhoto(): void {
  if (!dialog?.open || !dialogPhoto?.naturalWidth || !viewport) return;
  const scale = Math.min(
    viewport.clientWidth / dialogPhoto.naturalWidth,
    viewport.clientHeight / dialogPhoto.naturalHeight,
  );
  const fitWidth = Math.max(1, dialogPhoto.naturalWidth * scale);
  dialogPhoto.style.width = `${fitWidth * (zoom / 100)}px`;
  dialogPhoto.style.height = 'auto';
}

function setZoom(nextZoom: number): void {
  zoom = Math.max(100, Math.min(240, nextZoom));
  if (zoomRange) zoomRange.value = String(zoom);
  if (zoomValue) zoomValue.value = `${zoom}%`;
  if (zoomOut) zoomOut.disabled = zoom === 100;
  if (zoomIn) zoomIn.disabled = zoom === 240;
  fitDialogPhoto();
  if (zoom === 100) viewport?.scrollTo({ left: 0, top: 0, behavior: 'instant' });
}

function lockPage(): void {
  lockedScroll = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${lockedScroll}px`;
  document.body.style.width = '100%';
  document.body.classList.add('dialog-open');
}

function unlockPage(): void {
  document.body.classList.remove('dialog-open');
  document.body.style.removeProperty('position');
  document.body.style.removeProperty('top');
  document.body.style.removeProperty('width');
  window.scrollTo({ left: 0, top: lockedScroll, behavior: 'instant' });
}

function populateDialog(media: MediaView): void {
  if (!dialog || !dialogPhoto) return;
  setImage(dialogPhoto, media);
  dialogPhoto.removeAttribute('srcset');
  dialogPhoto.removeAttribute('sizes');
  const title = dialog.querySelector<HTMLElement>('#evidence-title');
  const caption = dialog.querySelector<HTMLElement>('.dialog-caption');
  const description = dialog.querySelector<HTMLElement>('.dialog-description');
  const credit = dialog.querySelector<HTMLElement>('.dialog-credit');
  const rights = dialog.querySelector<HTMLElement>('.dialog-rights');
  const source = dialog.querySelector<HTMLAnchorElement>('.dialog-source-link');
  if (title) title.textContent = media.title;
  if (caption) caption.textContent = media.caption;
  if (description) description.textContent = media.description;
  if (credit) credit.textContent = media.credit;
  if (rights) rights.textContent = media.rights;
  if (source) source.href = media.href;
}

function openEvidence(trigger: HTMLElement, media: MediaView): void {
  if (!dialog) return;
  dialogTrigger = trigger;
  populateDialog(media);
  lockPage();
  dialog.showModal();
  setZoom(100);
  viewport?.scrollTo({ left: 0, top: 0, behavior: 'instant' });
  dialog.querySelector<HTMLElement>('.dialog-close')?.focus({ preventScroll: true });
}

function closeEvidence(): void {
  if (!dialog?.open) return;
  dialog.close();
}

if (dialog && exhibition) {
  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest<HTMLElement>('a[data-evidence]');
    if (!trigger) return;
    if (
      !(event instanceof MouseEvent) ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const key = trigger.dataset.evidence;
    const media = key ? exhibition?.media[key] : undefined;
    if (!media) return;
    event.preventDefault();
    openEvidence(trigger, media);
  });

  // Keep keyboard focus within the open viewer at both ends of its tab order.
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !dialog.open) return;
    const controls = Array.from(dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )).filter((element) => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  dialog.querySelector<HTMLElement>('.dialog-close')?.addEventListener('click', closeEvidence);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeEvidence();
  });
  dialog.addEventListener('close', () => {
    unlockPage();
    dialogTrigger?.focus({ preventScroll: true });
    dialogTrigger = null;
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    const outside =
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom;
    if (outside) closeEvidence();
  });
  dialogPhoto?.addEventListener('load', fitDialogPhoto);
  zoomRange?.addEventListener('input', () => setZoom(Number(zoomRange.value)));
  zoomOut?.addEventListener('click', () => setZoom(zoom - 20));
  zoomIn?.addEventListener('click', () => setZoom(zoom + 20));
  zoomReset?.addEventListener('click', () => setZoom(100));
}

if (typeof ResizeObserver !== 'undefined') {
  const resizeObserver = new ResizeObserver(() => {
    positionStageMarker();
    fitDialogPhoto();
  });
  if (stageSelector) resizeObserver.observe(stageSelector);
  if (viewport) resizeObserver.observe(viewport);
} else {
  window.addEventListener('resize', () => {
    positionStageMarker();
    fitDialogPhoto();
  });
}

export {};

void document.fonts?.ready.then(positionStageMarker);
positionStageMarker();

if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        lift(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll('.section-heading, .reading, .journey, .lower-grid, .page-intro, .record-card, .timeline-section, .collection-selection, .chapter-gallery, .story-card, .collection-card, .archive-quote, .essay-grid figure')
    .forEach((element) => observer.observe(element));
}

const progress = document.querySelector<HTMLElement>('.reading-progress');
let progressQueued = false;
function updateProgress(): void {
  progressQueued = false;
  if (!progress) return;
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const value = distance > 0 ? Math.min(1, window.scrollY / distance) : 0;
  progress.style.transform = `scaleX(${value})`;
}
if (progress) {
  window.addEventListener(
    'scroll',
    () => {
      if (progressQueued) return;
      progressQueued = true;
      window.requestAnimationFrame(updateProgress);
    },
    { passive: true },
  );
  updateProgress();
}

// All archive records remain visible without JavaScript; filtering is an enhancement.
const archiveTools = document.querySelector<HTMLElement>('.archive-tools');
const archiveSearch = document.querySelector<HTMLInputElement>('#archive-search');
if (archiveTools && archiveSearch) {
  const records = Array.from(document.querySelectorAll<HTMLElement>('#archive-results [data-source-kind]'));
  const filters = Array.from(archiveTools.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const count = archiveTools.querySelector<HTMLElement>('.archive-count');
  const empty = document.querySelector<HTMLElement>('.archive-empty');
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  let kind = 'all';
  const applyFilters = () => {
    const terms = normalize(archiveSearch.value).trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    records.forEach(record => {
      const matches = (kind === 'all' || record.dataset.sourceKind === kind) && terms.every(term => normalize(record.dataset.search ?? '').includes(term));
      record.hidden = !matches;
      if (matches) visible++;
    });
    if (count) count.textContent = `${visible} ${count.dataset.resultsLabel}`;
    if (empty) empty.hidden = visible > 0;
  };
  archiveSearch.addEventListener('input', applyFilters);
  filters.forEach(button => button.addEventListener('click', () => {
    kind = button.dataset.filter ?? 'all';
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    applyFilters();
  }));
  archiveTools.hidden = false;
}

// The complete chronology and native disclosures remain available without JavaScript.
// Filters are revealed only after their enhancement is ready.
const timelineTools = document.querySelector<HTMLElement>('.timeline-tools');
if (timelineTools) {
  const timelineItems = Array.from(document.querySelectorAll<HTMLElement>('#timeline-events [data-timeline-kind]'));
  const timelineFilters = Array.from(timelineTools.querySelectorAll<HTMLButtonElement>('[data-timeline-filter]'));
  const timelineCount = timelineTools.querySelector<HTMLElement>('.timeline-count');
  const applyTimelineFilter = (kind: string) => {
    let visible = 0;
    timelineItems.forEach((item) => {
      const matches = kind === 'all' || item.dataset.timelineKind === kind;
      item.hidden = !matches;
      if (matches) visible++;
    });
    timelineFilters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.timelineFilter === kind)));
    if (timelineCount) {
      const label = visible === 1 ? timelineCount.dataset.eventSingular : timelineCount.dataset.eventPlural;
      timelineCount.textContent = `${visible} ${label ?? ''}`.trim();
    }
  };
  timelineFilters.forEach((button) => button.addEventListener('click', () => applyTimelineFilter(button.dataset.timelineFilter ?? 'all')));
  timelineTools.hidden = false;
}

document.querySelectorAll<HTMLDetailsElement>('.timeline-event').forEach(event => {
  event.addEventListener('toggle', () => {
    if (event.open) lift(event.querySelector('.timeline-detail'));
  });
});
