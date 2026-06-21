/**
 * Anim233 - Enhanced anime.js with modern animations and shader support
 * @packageDocumentation
 */

export interface AnimationOptions {
  duration?: number;
  easing?: string | ((t: number) => number);
  delay?: number;
  loop?: boolean | number;
  direction?: 'normal' | 'reverse' | 'alternate';
}

export interface Anim233Instance {
  play(): void;
  pause(): void;
  reverse(): void;
  restart(): void;
  seek(time: number): void;
}

/**
 * Create an animation
 */
export function animate(
  targets: string | HTMLElement | HTMLElement[],
  properties: Record<string, any>,
  options: AnimationOptions = {}
): Anim233Instance {
  const elements = getElements(targets);
  const duration = options.duration || 1000;
  const easing = options.easing || 'easeInOutQuad';
  const delay = options.delay || 0;
  const loop = options.loop || false;
  const direction = options.direction || 'normal';

  let isPlaying = false;
  let startTime = 0;
  let animationFrame: number;

  const instance: Anim233Instance = {
    play() {
      isPlaying = true;
      startTime = performance.now() - delay;
      tick();
    },
    pause() {
      isPlaying = false;
      cancelAnimationFrame(animationFrame);
    },
    reverse() {
      // TODO: Implement reverse
    },
    restart() {
      this.pause();
      this.play();
    },
    seek(time: number) {
      // TODO: Implement seek
    }
  };

  function tick() {
    if (!isPlaying) return;

    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    elements.forEach(el => {
      Object.entries(properties).forEach(([prop, value]) => {
        const currentValue = getComputedValue(el, prop);
        const targetValue = parseValue(value);
        const easedProgress = applyEasing(progress, easing);
        
        const newValue = interpolate(currentValue, targetValue, easedProgress);
        setStyle(el, prop, newValue);
      });
    });

    if (progress < 1) {
      animationFrame = requestAnimationFrame(tick);
    } else if (loop) {
      startTime = performance.now();
      animationFrame = requestAnimationFrame(tick);
    }
  }

  return instance;
}

function getElements(targets: string | HTMLElement | HTMLElement[]): HTMLElement[] {
  if (typeof targets === 'string') {
    return Array.from(document.querySelectorAll(targets));
  }
  if (targets instanceof HTMLElement) {
    return [targets];
  }
  return targets;
}

function getComputedValue(el: HTMLElement, prop: string): number {
  const computed = window.getComputedStyle(el);
  const value = computed.getPropertyValue(prop);
  return parseFloat(value) || 0;
}

function parseValue(value: any): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const match = value.match(/(-?\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }
  return 0;
}

function interpolate(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

function applyEasing(t: number, easing: string | ((t: number) => number)): number {
  if (typeof easing === 'function') {
    return easing(t);
  }
  
  const easings: Record<string, (t: number) => number> = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => (--t) * t * t + 1,
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeInOutExpo: (t) => {
      if (t === 0 || t === 1) return t;
      return t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2;
    }
  };
  
  return easings[easing] ? easings[easing](t) : t;
}

function setStyle(el: HTMLElement, prop: string, value: number): void {
  el.style.setProperty(prop, `${value}px`);
}

export default animate;