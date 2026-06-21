/**
 * Anim233 - Enhanced anime.js v4 with DOTween-style chaining and shader support
 * @packageDocumentation
 */

// ============================================================
// Core Types
// ============================================================

export type EasingFunction = (t: number) => number;
export type EasingName = 
  | 'linear' | 'ease' | 'easeIn' | 'easeOut' | 'easeInOut'
  | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad'
  | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'
  | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart'
  | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint'
  | 'easeInSine' | 'easeOutSine' | 'easeInOutSine'
  | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo'
  | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc'
  | 'easeInBack' | 'easeOutBack' | 'easeInOutBack'
  | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic'
  | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce'
  | 'spring' | 'steps' | 'inBack' | 'outBack' | 'inOutBack'
  | 'inElastic' | 'outElastic' | 'inOutElastic'
  | 'inBounce' | 'outBounce' | 'inOutBounce';

export type TweenValue = number | string | ((el: HTMLElement, i: number, l: number) => number | string);
export type AnimationTarget = string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>;

export interface TweenParams {
  to?: TweenValue;
  from?: TweenValue;
  delay?: number;
  duration?: number;
  ease?: EasingName | EasingFunction | string;
  composition?: 'replace' | 'add' | 'accumulate';
  modifier?: (value: number, target: HTMLElement) => number;
}

export interface AnimationOptions {
  targets?: AnimationTarget;
  [key: string]: any;
  delay?: number | ((el: HTMLElement, i: number, l: number) => number);
  duration?: number;
  loop?: number | boolean;
  loopDelay?: number;
  alternate?: boolean;
  reversed?: boolean;
  autoplay?: boolean;
  frameRate?: number;
  playbackRate?: number;
  playbackEase?: EasingName | EasingFunction | string;
  onBegin?: (anim: AnimationInstance) => void;
  onComplete?: (anim: AnimationInstance) => void;
  onBeforeUpdate?: (anim: AnimationInstance) => void;
  onUpdate?: (anim: AnimationInstance) => void;
  onRender?: (anim: AnimationInstance) => void;
  onLoop?: (anim: AnimationInstance) => void;
  onPause?: (anim: AnimationInstance) => void;
}

export interface TimelineOptions {
  delay?: number;
  duration?: number;
  loop?: number | boolean;
  loopDelay?: number;
  alternate?: boolean;
  reversed?: boolean;
  autoplay?: boolean;
  frameRate?: number;
  playbackRate?: number;
  playbackEase?: EasingName | EasingFunction | string;
  defaults?: Partial<AnimationOptions>;
  onBegin?: (tl: TimelineInstance) => void;
  onComplete?: (tl: TimelineInstance) => void;
  onUpdate?: (tl: TimelineInstance) => void;
}

// ============================================================
// Tween Instance Interface (DOTween Style)
// ============================================================

export interface TweenInstance {
  to(target: Record<string, any>, duration?: number, ease?: EasingName | EasingFunction | string): TweenInstance;
  from(target: Record<string, any>, duration?: number, ease?: EasingName | EasingFunction | string): TweenInstance;
  fromTo(from: Record<string, any>, to: Record<string, any>, duration?: number, ease?: EasingName | EasingFunction | string): TweenInstance;
  set(target: Record<string, any>): TweenInstance;
  delay(delay: number): TweenInstance;
  play(): TweenInstance;
  pause(): TweenInstance;
  resume(): TweenInstance;
  restart(): TweenInstance;
  reverse(): TweenInstance;
  kill(): TweenInstance;
  onBegin(callback: () => void): TweenInstance;
  onComplete(callback: () => void): TweenInstance;
  onUpdate(callback: (progress: number) => void): TweenInstance;
  onLoop(callback: () => void): TweenInstance;
  append(callback: () => void): TweenInstance;
  appendInterval(delay: number): TweenInstance;
  join(): TweenInstance;
  loop(count?: number): TweenInstance;
  yoyo(enable?: boolean): TweenInstance;
  readonly duration: number;
  readonly currentTime: number;
  readonly progress: number;
  readonly isPlaying: boolean;
  readonly isPaused: boolean;
  readonly isComplete: boolean;
}

// ============================================================
// Animation Instance Interface
// ============================================================

export interface AnimationInstance {
  play(): AnimationInstance;
  pause(): AnimationInstance;
  restart(): AnimationInstance;
  reverse(): AnimationInstance;
  alternate(): AnimationInstance;
  resume(): AnimationInstance;
  complete(): AnimationInstance;
  cancel(): AnimationInstance;
  revert(): AnimationInstance;
  reset(): AnimationInstance;
  seek(time: number): AnimationInstance;
  stretch(newDuration: number): AnimationInstance;
  then(callback?: () => void): Promise<void>;
  readonly finished: Promise<void>;
  readonly currentTime: number;
  readonly progress: number;
  readonly duration: number;
  readonly paused: boolean;
  readonly reversed: boolean;
  readonly began: boolean;
  readonly completed: boolean;
}

// ============================================================
// Timeline Instance Interface
// ============================================================

export interface TimelineInstance {
  add(animation: AnimationOptions | AnimationInstance, timeOffset?: number | string): TimelineInstance;
  add(callback: () => void, timeOffset?: number | string): TimelineInstance;
  set(properties: Record<string, any>, timeOffset?: number | string): TimelineInstance;
  sync(animation: AnimationInstance, timeOffset?: number | string): TimelineInstance;
  label(name: string, timeOffset?: number | string): TimelineInstance;
  remove(animation: AnimationInstance): TimelineInstance;
  call(callback: () => void, timeOffset?: number | string): TimelineInstance;
  play(): TimelineInstance;
  pause(): TimelineInstance;
  restart(): TimelineInstance;
  reverse(): TimelineInstance;
  alternate(): TimelineInstance;
  resume(): TimelineInstance;
  complete(): TimelineInstance;
  cancel(): TimelineInstance;
  revert(): TimelineInstance;
  seek(time: number): TimelineInstance;
  stretch(newDuration: number): TimelineInstance;
  refresh(): TimelineInstance;
  then(callback?: () => void): Promise<void>;
  readonly duration: number;
  readonly currentTime: number;
  readonly progress: number;
  readonly paused: boolean;
  readonly reversed: boolean;
}

// ============================================================
// Animatable Instance Interface
// ============================================================

export interface AnimatableInstance {
  set(properties: Record<string, any>): AnimatableInstance;
  revert(): AnimatableInstance;
  [key: string]: any;
}

// ============================================================
// Draggable Instance Interface
// ============================================================

export interface DraggableInstance {
  disable(): DraggableInstance;
  enable(): DraggableInstance;
  setX(value: number): DraggableInstance;
  setY(value: number): DraggableInstance;
  animateInView(): DraggableInstance;
  scrollInView(): DraggableInstance;
  stop(): DraggableInstance;
  reset(): DraggableInstance;
  revert(): DraggableInstance;
  refresh(): DraggableInstance;
  readonly x: number;
  readonly y: number;
  readonly isDragging: boolean;
}

export interface DraggableOptions {
  trigger?: string | HTMLElement;
  container?: string | HTMLElement;
  containerPadding?: number;
  containerFriction?: number;
  releaseContainerFriction?: number;
  releaseMass?: number;
  releaseStiffness?: number;
  releaseDamping?: number;
  velocityMultiplier?: number;
  minVelocity?: number;
  maxVelocity?: number;
  releaseEase?: EasingName | EasingFunction | string;
  dragSpeed?: number;
  dragThreshold?: number;
  scrollThreshold?: number;
  scrollSpeed?: number;
  cursor?: string;
  x?: boolean | { snap?: number | number[]; modifier?: (v: number) => number; mapTo?: string | HTMLElement };
  y?: boolean | { snap?: number | number[]; modifier?: (v: number) => number; mapTo?: string | HTMLElement };
  onGrab?: (e: Event) => void;
  onDrag?: (e: Event) => void;
  onUpdate?: (e: Event) => void;
  onRelease?: (e: Event) => void;
  onSnap?: (e: Event) => void;
  onSettle?: (e: Event) => void;
}

// ============================================================
// ScrollObserver Interface
// ============================================================

export interface ScrollObserverInstance {
  link(animations: AnimationInstance | AnimationInstance[]): ScrollObserverInstance;
  refresh(): ScrollObserverInstance;
  revert(): ScrollObserverInstance;
  readonly linked: AnimationInstance[];
}

export interface ScrollObserverOptions {
  container?: string | HTMLElement;
  target?: string | HTMLElement;
  debug?: boolean;
  axis?: 'x' | 'y';
  repeat?: boolean;
  threshold?: number | [number, number] | string;
  onEnter?: (entry: IntersectionObserverEntry) => void;
  onEnterForward?: (entry: IntersectionObserverEntry) => void;
  onEnterBackward?: (entry: IntersectionObserverEntry) => void;
  onLeave?: (entry: IntersectionObserverEntry) => void;
  onLeaveForward?: (entry: IntersectionObserverEntry) => void;
  onLeaveBackward?: (entry: IntersectionObserverEntry) => void;
  onUpdate?: (entry: IntersectionObserverEntry) => void;
}

// ============================================================
// Text Splitter Interface
// ============================================================

export interface TextSplitterInstance {
  addEffect(effect: (el: HTMLElement, i: number) => void): TextSplitterInstance;
  revert(): TextSplitterInstance;
  refresh(): TextSplitterInstance;
  readonly lines: HTMLElement[];
  readonly words: HTMLElement[];
  readonly chars: HTMLElement[];
}

export interface TextSplitterOptions {
  lines?: boolean;
  words?: boolean;
  chars?: boolean;
  debug?: boolean;
  includeSpaces?: boolean;
  accessible?: boolean;
  class?: string;
  wrap?: string;
  clone?: boolean;
}

// ============================================================
// Layout Interface
// ============================================================

export interface LayoutInstance {
  record(): LayoutInstance;
  animate(options?: Partial<AnimationOptions>): AnimationInstance;
  revert(): LayoutInstance;
}

export interface LayoutOptions {
  targets?: AnimationTarget;
  duration?: number;
  easing?: EasingName | EasingFunction | string;
  delay?: number | ((el: HTMLElement, i: number) => number);
  enterFrom?: Record<string, any>;
  leaveTo?: Record<string, any>;
}

// ============================================================
// Path Morph Interface
// ============================================================

export interface PathMorphInstance {
  to(pathData: string, duration?: number, ease?: EasingName | EasingFunction | string): TweenInstance;
  from(pathData: string, duration?: number, ease?: EasingName | EasingFunction | string): TweenInstance;
  set(pathData: string): PathMorphInstance;
}

// ============================================================
// Shader Animation Instance Interface
// ============================================================

export interface ShaderAnim233Instance {
  play(): ShaderAnim233Instance;
  pause(): ShaderAnim233Instance;
  stop(): ShaderAnim233Instance;
  setUniform(name: string, value: number | number[] | Float32Array): ShaderAnim233Instance;
  setFragmentShader(source: string): ShaderAnim233Instance;
  setVertexShader(source: string): ShaderAnim233Instance;
  resize(width: number, height: number): ShaderAnim233Instance;
  readonly isPlaying: boolean;
  readonly canvas: HTMLCanvasElement;
  readonly gl: WebGLRenderingContext | null;
}

export interface ShaderAnim233Options {
  vertex?: string;
  fragment?: string;
  uniforms?: Record<string, number | number[] | Float32Array>;
  target: HTMLCanvasElement;
  autoplay?: boolean;
  onResize?: (width: number, height: number) => void;
}

// ============================================================
// Easing Functions
// ============================================================

const easings: Record<string, EasingFunction> = {
  linear: (t) => t,
  ease: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => 1 + (--t) * t * t * t * t,
  easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: (t) => {
    if (t === 0 || t === 1) return t;
    return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
  },
  easeInCirc: (t) => 1 - Math.sqrt(1 - t * t),
  easeOutCirc: (t) => Math.sqrt(1 - (--t) * t),
  easeInOutCirc: (t) => t < 0.5 ? (1 - Math.sqrt(1 - 4 * t * t)) / 2 : (Math.sqrt(1 - (-2 * t + 2) * (-2 * t + 2)) + 1) / 2,
  easeInBack: (t) => { const s = 1.70158; return t * t * ((s + 1) * t - s); },
  easeOutBack: (t) => { const s = 1.70158; return 1 + (--t) * t * ((s + 1) * t + s); },
  easeInOutBack: (t) => { const s = 1.70158 * 1.525; if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s)); return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2); },
  inBack: (t) => { const s = 1.70158; return t * t * ((s + 1) * t - s); },
  outBack: (t) => { const s = 1.70158; return 1 + (--t) * t * ((s + 1) * t + s); },
  inOutBack: (t) => { const s = 1.70158 * 1.525; if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s)); return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2); },
  easeInElastic: (t) => { if (t === 0 || t === 1) return t; return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3)); },
  easeOutElastic: (t) => { if (t === 0 || t === 1) return t; return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1; },
  easeInOutElastic: (t) => { if (t === 0 || t === 1) return t; const c = (2 * Math.PI) / 4.5; if (t < 0.5) { return -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c)) / 2; } return (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c)) / 2 + 1; },
  inElastic: (t) => { if (t === 0 || t === 1) return t; return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3)); },
  outElastic: (t) => { if (t === 0 || t === 1) return t; return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1; },
  inOutElastic: (t) => { if (t === 0 || t === 1) return t; const c = (2 * Math.PI) / 4.5; if (t < 0.5) { return -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c)) / 2; } return (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c)) / 2 + 1; },
  easeInBounce: (t) => 1 - bounceOut(1 - t),
  easeOutBounce: bounceOut,
  easeInOutBounce: (t) => t < 0.5 ? (1 - bounceOut(1 - 2 * t)) / 2 : (1 + bounceOut(2 * t - 1)) / 2,
  inBounce: (t) => 1 - bounceOut(1 - t),
  outBounce: bounceOut,
  inOutBounce: (t) => t < 0.5 ? (1 - bounceOut(1 - 2 * t)) / 2 : (1 + bounceOut(2 * t - 1)) / 2,
};

function bounceOut(t: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  else return n1 * (t -= 2.625 / d1) * t + 0.984375;
}

function createSpringEasing(stiffness: number = 100, damping: number = 10, mass: number = 1): EasingFunction {
  return (t: number) => {
    const omega0 = Math.sqrt(stiffness / mass);
    const zeta = damping / (2 * Math.sqrt(stiffness * mass));
    const timeScale = omega0 * 6;
    if (zeta < 1) {
      const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
      return 1 - Math.exp(-zeta * omega0 * t * timeScale) * (
        Math.cos(omegaD * t * timeScale) +
        (zeta * omega0 / omegaD) * Math.sin(omegaD * t * timeScale)
      );
    } else if (zeta === 1) {
      return 1 - (1 + omega0 * t * timeScale) * Math.exp(-omega0 * t * timeScale);
    } else {
      const sq = Math.sqrt(zeta * zeta - 1);
      const s1 = -omega0 * (zeta - sq);
      const s2 = -omega0 * (zeta + sq);
      return 1 - (s2 * Math.exp(s1 * t * timeScale) - s1 * Math.exp(s2 * t * timeScale)) / (s2 - s1);
    }
  };
}

easings['spring'] = createSpringEasing();

// ============================================================
// Utility Functions
// ============================================================

export function registerEasing(name: string, fn: EasingFunction): void {
  easings[name] = fn;
}

export function getEasing(name: string): EasingFunction | undefined {
  return easings[name];
}

export function listEasings(): string[] {
  return Object.keys(easings);
}

export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function createSeededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function randomPick<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function round(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function snap(value: number, gridValues: number | number[]): number {
  if (typeof gridValues === 'number') return Math.round(value / gridValues) * gridValues;
  return gridValues.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
}

export function wrap(value: number, min: number, max: number): number {
  const range = max - min;
  return ((value - min) % range + range) % range + min;
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function damp(start: number, end: number, smooth: number, dt: number): number {
  return lerp(start, end, 1 - Math.exp(-smooth * dt));
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { createSpringEasing };

// ============================================================
// Internal Helpers: Color, Transform, Value Parsing
// ============================================================

const COLOR_PROPS = new Set([
  'color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderBottomColor',
  'borderLeftColor', 'borderRightColor', 'outlineColor', 'textDecorationColor',
  'fill', 'stroke', 'floodColor', 'lightingColor', 'stopColor'
]);

const TRANSFORM_PROPS = new Set([
  'x', 'y', 'translateX', 'translateY', 'translate',
  'rotate', 'rotateX', 'rotateY', 'rotateZ',
  'scale', 'scaleX', 'scaleY',
  'skew', 'skewX', 'skewY'
]);

const TRANSFORM_ORDER = [
  'translateX', 'translateY', 'x', 'y', 'translate',
  'rotate', 'rotateX', 'rotateY', 'rotateZ',
  'scale', 'scaleX', 'scaleY',
  'skew', 'skewX', 'skewY'
];

function toTransformCSS(name: string, value: number): string {
  switch (name) {
    case 'x': return `translateX(${value}px)`;
    case 'y': return `translateY(${value}px)`;
    case 'translateX': return `translateX(${value}px)`;
    case 'translateY': return `translateY(${value}px)`;
    case 'translate': return `translate(${value}px, ${value}px)`;
    case 'rotate': return `rotate(${value}deg)`;
    case 'rotateX': return `rotateX(${value}deg)`;
    case 'rotateY': return `rotateY(${value}deg)`;
    case 'rotateZ': return `rotateZ(${value}deg)`;
    case 'scale': return `scale(${value})`;
    case 'scaleX': return `scaleX(${value})`;
    case 'scaleY': return `scaleY(${value})`;
    case 'skew': return `skew(${value}deg)`;
    case 'skewX': return `skewX(${value}deg)`;
    case 'skewY': return `skewY(${value}deg)`;
    default: return '';
  }
}

function composeTransform(props: Record<string, number>): string {
  const parts: string[] = [];
  for (const key of TRANSFORM_ORDER) {
    if (key in props) {
      parts.push(toTransformCSS(key, props[key]));
    }
  }
  return parts.join(' ');
}

function parseColor(str: string): [number, number, number, number] {
  if (str.startsWith('#')) {
    const hex = str.slice(1);
    if (hex.length === 3) {
      return [parseInt(hex[0] + hex[0], 16), parseInt(hex[1] + hex[1], 16), parseInt(hex[2] + hex[2], 16), 1];
    }
    if (hex.length === 6) {
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16), 1];
    }
    if (hex.length === 8) {
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16), parseInt(hex.slice(6, 8), 16) / 255];
    }
  }
  const m = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/);
  if (m) {
    return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), m[4] !== undefined ? parseFloat(m[4]) : 1];
  }
  return [0, 0, 0, 1];
}

function interpolateColor(from: string, to: string, t: number): string {
  const [r1, g1, b1, a1] = parseColor(from);
  const [r2, g2, b2, a2] = parseColor(to);
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));
  const a = round(lerp(a1, a2, t), 4);
  if (a >= 1) return `rgb(${r},${g},${b})`;
  return `rgba(${r},${g},${b},${a})`;
}

function isColorValue(val: any): boolean {
  if (typeof val !== 'string') return false;
  return val.startsWith('#') || val.startsWith('rgb');
}

const UNIT_RE = /^(-?\d*\.?\d+)(px|%|rem|em|vw|vh|vmin|vmax|deg|rad|turn|s|ms)?$/;

function parseValueWithUnit(val: any): { num: number; unit: string } | null {
  if (typeof val === 'number') return { num: val, unit: 'px' };
  if (typeof val !== 'string') return null;
  const m = val.match(UNIT_RE);
  if (!m) return null;
  return { num: parseFloat(m[1]), unit: m[2] || 'px' };
}

const RELATIVE_RE = /^([+-])=(\d*\.?\d+)$/;

function parseRelativeValue(val: string): { op: '+' | '-'; value: number } | null {
  const m = val.match(RELATIVE_RE);
  if (!m) return null;
  return { op: m[1] as '+' | '-', value: parseFloat(m[2]) };
}

function resolveKeyframes(value: any, progress: number): any {
  if (!Array.isArray(value)) return value;
  const count = value.length;
  if (count <= 1) return value[0];
  const seg = progress * (count - 1);
  const idx = Math.min(Math.floor(seg), count - 2);
  const local = seg - idx;
  const a = value[idx];
  const b = value[idx + 1];
  if (typeof a === 'number' && typeof b === 'number') return lerp(a, b, local);
  if (typeof a === 'string' && typeof b === 'string') {
    if (isColorValue(a) && isColorValue(b)) return interpolateColor(a, b, local);
    const pa = parseValueWithUnit(a);
    const pb = parseValueWithUnit(b);
    if (pa && pb && pa.unit === pb.unit) return `${lerp(pa.num, pb.num, local)}${pa.unit}`;
  }
  return local < 0.5 ? a : b;
}

function morphPath(from: string, to: string, t: number): string {
  const fromNums = from.match(/-?\d*\.?\d+/g)?.map(Number) || [];
  const toNums = to.match(/-?\d*\.?\d+/g)?.map(Number) || [];
  let i = 0;
  return from.replace(/-?\d*\.?\d+/g, () => {
    const fv = fromNums[i] ?? 0;
    const tv = toNums[i] ?? 0;
    i++;
    return String(Math.round(lerp(fv, tv, t) * 1000) / 1000);
  });
}

// ============================================================
// Stagger Function
// ============================================================

export interface StaggerOptions {
  start?: number;
  from?: number | 'first' | 'last' | 'center' | 'edges' | [number, number];
  reversed?: boolean;
  ease?: EasingName | EasingFunction | string;
  grid?: [number, number];
  axis?: 'x' | 'y';
  modifier?: (value: number, index: number) => number;
  total?: number;
}

export function stagger(value: number | [number, number], options: StaggerOptions = {}): (index: number, total: number) => number {
  const { start = 0, from = 0, reversed = false, ease, grid, axis, modifier, total: totalItems } = options;

  return (index: number, total: number) => {
    const t = totalItems || total;
    let fromIndex = typeof from === 'number' ? from :
      from === 'first' ? 0 : from === 'last' ? t - 1 :
      from === 'center' ? (t - 1) / 2 : from === 'edges' ? (index % (t - 1)) : 0;

    let distance = Math.abs(index - fromIndex);
    if (grid) {
      const [cols, rows] = grid;
      const row = Math.floor(index / cols);
      const col = index % cols;
      const fromRow = Math.floor(fromIndex / cols);
      const fromCol = fromIndex % cols;
      distance = Math.sqrt(Math.pow(col - fromCol, 2) + Math.pow(row - fromRow, 2));
    }

    const maxValue = typeof value === 'number' ? value : value[1] - value[0];
    const minValue = typeof value === 'number' ? 0 : value[0];
    let result = minValue + (distance / (t - 1)) * maxValue;

    if (ease) {
      const easingFn = typeof ease === 'function' ? ease : easings[ease] || easings.linear;
      result = easingFn(result);
    }

    if (reversed) result = maxValue - result + minValue;
    if (modifier) result = modifier(result, index);

    return result;
  };
}

// ============================================================
// Helper: Resolve target elements
// ============================================================

function getElements(targets: AnimationTarget): HTMLElement[] {
  if (typeof targets === 'string') return Array.from(document.querySelectorAll(targets));
  if (targets instanceof HTMLElement) return [targets];
  if (targets instanceof NodeList) return Array.from(targets) as HTMLElement[];
  return targets;
}

function resolveValue(value: TweenValue, el: HTMLElement, i: number, l: number): any {
  return typeof value === 'function' ? value(el, i, l) : value;
}

function applyEasing(t: number, ease: EasingName | EasingFunction | string): number {
  if (typeof ease === 'function') return ease(t);
  if (typeof ease === 'string' && easings[ease]) return easings[ease](t);
  return t;
}

// ============================================================
// Tween Engine (DOTween Style) - HIGH PERFORMANCE
// ============================================================

interface TweenStep {
  properties: Record<string, any>;
  duration: number;
  ease: EasingName | EasingFunction | string;
  type: 'to' | 'from' | 'fromTo' | 'set';
  fromProps?: Record<string, any>;
}

let tweenIdCounter = 0;

export function tween(target: HTMLElement | HTMLElement[]): TweenInstance {
  const targets = Array.isArray(target) ? target : [target];
  const steps: TweenStep[] = [];
  let _currentStep = 0;
  let _currentTime = 0;
  let _totalDuration = 0;
  let _delay = 0;
  let _loop = 1;
  let _loopCount = 0;
  let _yoyo = false;
  let _yoyoReversed = false;
  let _isPlaying = false;
  let _isPaused = false;
  let _isComplete = false;
  let _animationFrame = 0;
  let _startTime = 0;

  const _callbacks = {
    onBegin: [] as (() => void)[],
    onComplete: [] as (() => void)[],
    onUpdate: [] as ((progress: number) => void)[],
    onLoop: [] as (() => void)[],
  };

  function calculateTotalDuration(): void {
    _totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
  }

  function getStepAtTime(time: number): { step: TweenStep; localProgress: number; globalProgress: number } | null {
    let elapsed = 0;
    for (let i = 0; i < steps.length; i++) {
      if (time <= elapsed + steps[i].duration || i === steps.length - 1) {
        const localProgress = steps[i].duration > 0 ? Math.min(1, (time - elapsed) / steps[i].duration) : 1;
        const globalProgress = _totalDuration > 0 ? time / _totalDuration : 0;
        return { step: steps[i], localProgress, globalProgress };
      }
      elapsed += steps[i].duration;
    }
    return null;
  }

  function applyStep(step: TweenStep, progress: number): void {
    const effectiveProgress = _yoyoReversed ? 1 - progress : progress;
    const easedProgress = applyEasing(effectiveProgress, step.ease);

    targets.forEach(el => {
      const transformAccum: Record<string, number> = {};
      let hasTransform = false;

      Object.entries(step.properties).forEach(([prop, rawTargetValue]) => {
        let targetValue = resolveKeyframes(rawTargetValue, effectiveProgress);

        if (typeof targetValue === 'string') {
          const rel = parseRelativeValue(targetValue);
          if (rel) {
            const current = TRANSFORM_PROPS.has(prop) ? 0 : (parseFloat(el.style.getPropertyValue(prop)) || 0);
            targetValue = rel.op === '+' ? current + rel.value : current - rel.value;
          }
        }

        if (TRANSFORM_PROPS.has(prop)) {
          const fromVal = step.type === 'from' ? (typeof targetValue === 'number' ? targetValue : parseFloat(targetValue as string) || 0) : (step.fromProps?.[prop] ?? 0);
          const toVal = step.type === 'from' ? (step.fromProps?.[prop] ?? 0) : (typeof targetValue === 'number' ? targetValue : parseFloat(targetValue as string) || 0);
          const startVal = step.type === 'fromTo' ? (step.fromProps?.[prop] ?? fromVal) : fromVal;
          const endVal = step.type === 'fromTo' ? (typeof targetValue === 'number' ? targetValue : parseFloat(targetValue as string) || 0) : toVal;
          transformAccum[prop] = lerp(startVal, endVal, easedProgress);
          hasTransform = true;
          return;
        }

        if (isColorValue(targetValue)) {
          const fromColor = step.type === 'from' ? (typeof targetValue === 'string' ? targetValue : 'rgb(0,0,0)') : (step.fromProps?.[prop] ?? 'rgba(0,0,0,0)');
          const toColor = step.type === 'from' ? (step.fromProps?.[prop] ?? 'rgba(0,0,0,0)') : (typeof targetValue === 'string' ? targetValue : 'rgb(0,0,0)');
          const startC = step.type === 'fromTo' ? (step.fromProps?.[prop] ?? fromColor) : fromColor;
          const endC = step.type === 'fromTo' ? (typeof targetValue === 'string' ? targetValue : 'rgb(0,0,0)') : toColor;
          if (typeof startC === 'string' && typeof endC === 'string') {
            el.style.setProperty(prop, interpolateColor(startC, endC, easedProgress));
            return;
          }
        }

        if (typeof targetValue === 'string') {
          const parsed = parseValueWithUnit(targetValue);
          if (parsed) {
            const fromNum = step.type === 'from' ? parsed.num : (step.fromProps?.[prop] !== undefined ? (parseValueWithUnit(step.fromProps[prop])?.num ?? 0) : (parseFloat(el.style.getPropertyValue(prop)) || 0));
            const toNum = step.type === 'from' ? (step.fromProps?.[prop] !== undefined ? (parseValueWithUnit(step.fromProps[prop])?.num ?? 0) : (parseFloat(el.style.getPropertyValue(prop)) || 0)) : parsed.num;
            const startN = step.type === 'fromTo' ? (step.fromProps?.[prop] !== undefined ? (parseValueWithUnit(step.fromProps[prop])?.num ?? fromNum) : fromNum) : fromNum;
            const endN = step.type === 'fromTo' ? parsed.num : toNum;
            const unit = parsed.unit;
            el.style.setProperty(prop, `${lerp(startN, endN, easedProgress)}${unit}`);
            return;
          }
        }

        const fromNum = step.type === 'from' ? (typeof targetValue === 'number' ? targetValue : parseFloat(targetValue as string) || 0) : (step.fromProps?.[prop] ?? 0);
        const toNum = step.type === 'from' ? (step.fromProps?.[prop] ?? 0) : (typeof targetValue === 'number' ? targetValue : parseFloat(targetValue as string) || 0);
        const startN = step.type === 'fromTo' ? (step.fromProps?.[prop] ?? fromNum) : fromNum;
        const endN = step.type === 'fromTo' ? (typeof targetValue === 'number' ? targetValue : parseFloat(targetValue as string) || 0) : toNum;
        el.style.setProperty(prop, `${lerp(startN, endN, easedProgress)}px`);
      });

      if (hasTransform) {
        el.style.transform = composeTransform(transformAccum);
      }
    });
  }

  function tick(): void {
    if (!_isPlaying || _isPaused) return;

    const now = performance.now();
    const elapsed = now - _startTime;
    _currentTime = elapsed;

    const result = getStepAtTime(elapsed);
    if (result) {
      applyStep(result.step, result.localProgress);
    }

    _callbacks.onUpdate.forEach(cb => cb(elapsed / _totalDuration || 0));

    if (elapsed >= _totalDuration) {
      if (_loop === Infinity || _loop > 1) {
        if (_loop !== Infinity) _loop--;
        _loopCount++;
        _yoyoReversed = _yoyo ? !_yoyoReversed : false;
        _startTime = now;
        _callbacks.onLoop.forEach(cb => cb());
      } else {
        _isComplete = true;
        _isPlaying = false;
        _callbacks.onComplete.forEach(cb => cb());
        return;
      }
    }

    _animationFrame = requestAnimationFrame(tick);
  }

  const instance: TweenInstance = {
    to(props: Record<string, any>, duration: number = 400, ease: EasingName | EasingFunction | string = 'easeOutCubic'): TweenInstance {
      steps.push({ properties: props, duration, ease, type: 'to' });
      calculateTotalDuration();
      return instance;
    },
    from(props: Record<string, any>, duration: number = 400, ease: EasingName | EasingFunction | string = 'easeOutCubic'): TweenInstance {
      steps.push({ properties: props, duration, ease, type: 'from', fromProps: { ...props } });
      calculateTotalDuration();
      return instance;
    },
    fromTo(from: Record<string, any>, to: Record<string, any>, duration: number = 400, ease: EasingName | EasingFunction | string = 'easeOutCubic'): TweenInstance {
      steps.push({ properties: to, duration, ease, type: 'fromTo', fromProps: { ...from } });
      calculateTotalDuration();
      return instance;
    },
    set(props: Record<string, any>): TweenInstance {
      steps.push({ properties: props, duration: 0, ease: 'linear', type: 'set' });
      calculateTotalDuration();
      return instance;
    },
    delay(ms: number): TweenInstance {
      _delay = ms;
      return instance;
    },
    play(): TweenInstance {
      if (_isComplete) {
        _currentTime = 0;
        _currentStep = 0;
        _loopCount = 0;
        _yoyoReversed = false;
      }
      _isPlaying = true;
      _isPaused = false;
      _startTime = performance.now() + _delay;
      _callbacks.onBegin.forEach(cb => cb());
      tick();
      return instance;
    },
    pause(): TweenInstance {
      _isPaused = true;
      cancelAnimationFrame(_animationFrame);
      return instance;
    },
    resume(): TweenInstance {
      if (_isPaused) {
        _isPaused = false;
        _startTime = performance.now() - _currentTime;
        tick();
      }
      return instance;
    },
    restart(): TweenInstance {
      _currentTime = 0;
      _currentStep = 0;
      _isComplete = false;
      _loopCount = 0;
      _yoyoReversed = false;
      instance.play();
      return instance;
    },
    reverse(): TweenInstance {
      _yoyoReversed = !_yoyoReversed;
      return instance;
    },
    kill(): TweenInstance {
      _isPlaying = false;
      _isPaused = true;
      cancelAnimationFrame(_animationFrame);
      steps.length = 0;
      return instance;
    },
    onBegin(cb: () => void): TweenInstance { _callbacks.onBegin.push(cb); return instance; },
    onComplete(cb: () => void): TweenInstance { _callbacks.onComplete.push(cb); return instance; },
    onUpdate(cb: (progress: number) => void): TweenInstance { _callbacks.onUpdate.push(cb); return instance; },
    onLoop(cb: () => void): TweenInstance { _callbacks.onLoop.push(cb); return instance; },
    append(cb: () => void): TweenInstance { _callbacks.onComplete.push(cb); return instance; },
    appendInterval(ms: number): TweenInstance { _delay += ms; return instance; },
    join(): TweenInstance { return instance; },
    loop(count: number = Infinity): TweenInstance { _loop = count; return instance; },
    yoyo(enable: boolean = true): TweenInstance { _yoyo = enable; return instance; },
    get duration() { return _totalDuration; },
    get currentTime() { return _currentTime; },
    get progress() { return _totalDuration ? _currentTime / _totalDuration : 0; },
    get isPlaying() { return _isPlaying; },
    get isPaused() { return _isPaused; },
    get isComplete() { return _isComplete; }
  };

  return instance;
}

// ============================================================
// Core Animation Engine
// ============================================================

const RESERVED_KEYS = new Set([
  'targets', 'delay', 'duration', 'loop', 'loopDelay', 'alternate', 'reversed',
  'autoplay', 'frameRate', 'playbackRate', 'playbackEase',
  'onBegin', 'onComplete', 'onBeforeUpdate', 'onUpdate', 'onRender', 'onLoop', 'onPause'
]);

function createAnimation(options: AnimationOptions): AnimationInstance {
  const targets = getElements(options.targets || '');
  const total = targets.length;
  let _currentTime = 0;
  let _duration = options.duration || 1000;
  let _delay = typeof options.delay === 'number' ? options.delay : 0;
  let _loop = options.loop === true ? Infinity : (options.loop || 1);
  let _loopDelay = options.loopDelay || 0;
  let _alternate = options.alternate || false;
  let _reversed = options.reversed || false;
  let _autoplay = options.autoplay !== false;
  let _playbackRate = options.playbackRate || 1;
  let _paused = false;
  let _began = false;
  let _completed = false;
  let _animationFrame = 0;
  let _startTime = 0;
  let _resolvePromise: () => void;
  const _finished = new Promise<void>(resolve => { _resolvePromise = resolve; });

  const instance: AnimationInstance = {
    play() { _paused = false; _startTime = performance.now() - _currentTime / _playbackRate; tick(); return instance; },
    pause() { _paused = true; cancelAnimationFrame(_animationFrame); return instance; },
    restart() { _currentTime = 0; _began = false; _completed = false; instance.play(); return instance; },
    reverse() { _reversed = !_reversed; return instance; },
    alternate() { _alternate = !_alternate; return instance; },
    resume() { if (_paused) instance.play(); return instance; },
    complete() { _currentTime = _duration; _completed = true; if (options.onComplete) options.onComplete(instance); _resolvePromise(); return instance; },
    cancel() { _paused = true; cancelAnimationFrame(_animationFrame); return instance; },
    revert() { targets.forEach(el => el.removeAttribute('style')); return instance; },
    reset() { _currentTime = 0; _began = false; _completed = false; return instance; },
    seek(time: number) { _currentTime = Math.max(0, Math.min(time, _duration)); return instance; },
    stretch(newDuration: number) { _duration = newDuration; return instance; },
    then(callback?: () => void) { return _finished.then(callback); },
    get finished() { return _finished; },
    get currentTime() { return _currentTime; },
    get progress() { return _duration ? _currentTime / _duration : 0; },
    get duration() { return _duration; },
    get paused() { return _paused; },
    get reversed() { return _reversed; },
    get began() { return _began; },
    get completed() { return _completed; }
  };

  function updateProperties(progress: number): void {
    const effectiveProgress = _reversed ? 1 - progress : progress;

    targets.forEach((el, i) => {
      const transformAccum: Record<string, number> = {};
      let hasTransform = false;

      Object.entries(options).forEach(([prop, rawValue]) => {
        if (RESERVED_KEYS.has(prop)) return;

        let value = resolveValue(rawValue, el, i, total);
        value = resolveKeyframes(value, effectiveProgress);

        if (typeof value === 'string') {
          const rel = parseRelativeValue(value);
          if (rel) {
            const current = TRANSFORM_PROPS.has(prop) ? 0 : (parseFloat(el.style.getPropertyValue(prop)) || 0);
            value = rel.op === '+' ? current + rel.value : current - rel.value;
          }
        }

        if (TRANSFORM_PROPS.has(prop)) {
          const numVal = typeof value === 'number' ? value : parseFloat(value as string) || 0;
          transformAccum[prop] = numVal;
          hasTransform = true;
          return;
        }

        if (isColorValue(value)) {
          el.style.setProperty(prop, value as string);
          return;
        }

        if (typeof value === 'string') {
          el.style.setProperty(prop, value);
          return;
        }

        el.style.setProperty(prop, `${value}px`);
      });

      if (hasTransform) {
        el.style.transform = composeTransform(transformAccum);
      }
    });
  }

  function tick(): void {
    if (_paused) return;
    const now = performance.now();
    const elapsed = (now - _startTime) * _playbackRate;
    _currentTime = elapsed;

    if (!_began && elapsed > 0) {
      _began = true;
      if (options.onBegin) options.onBegin(instance);
    }

    const progress = Math.min(elapsed / _duration, 1);
    updateProperties(progress);
    if (options.onUpdate) options.onUpdate(instance);
    if (options.onRender) options.onRender(instance);

    if (progress < 1) {
      _animationFrame = requestAnimationFrame(tick);
    } else {
      _completed = true;
      if (options.onComplete) options.onComplete(instance);
      _resolvePromise();

      if (_loop !== 1 && _loop !== Infinity) {
        _loop--;
        _currentTime = 0;
        _startTime = performance.now();
        if (_alternate) _reversed = !_reversed;
        if (options.onLoop) options.onLoop(instance);
        _animationFrame = requestAnimationFrame(tick);
      } else if (_loop === Infinity) {
        _currentTime = 0;
        _startTime = performance.now();
        if (_alternate) _reversed = !_reversed;
        if (options.onLoop) options.onLoop(instance);
        _animationFrame = requestAnimationFrame(tick);
      }
    }
  }

  if (_autoplay) setTimeout(() => instance.play(), _delay);

  return instance;
}

// ============================================================
// Timeline
// ============================================================

function createTimeline(options: TimelineOptions = {}): TimelineInstance {
  const items: Array<{ time: number; item: any; type: string }> = [];
  let _duration = 0;
  let _currentTime = 0;
  let _paused = true;
  let _reversed = false;
  let _animationFrame = 0;
  let _startTime = 0;
  let _loop = options.loop || 1;
  let _playbackRate = options.playbackRate || 1;
  let _resolvePromise: () => void;
  const _finished = new Promise<void>(resolve => { _resolvePromise = resolve; });

  const instance: TimelineInstance = {
    add(animation: any, timeOffset?: number | string) {
      const time = typeof timeOffset === 'number' ? timeOffset : parseFloat(timeOffset || '0') || 0;
      items.push({ time, item: animation, type: 'animation' });
      _duration = Math.max(_duration, time + 1000);
      return instance;
    },
    set(properties: Record<string, any>, timeOffset?: number | string) {
      const time = typeof timeOffset === 'number' ? timeOffset : parseFloat(timeOffset || '0') || 0;
      items.push({ time, item: properties, type: 'set' });
      return instance;
    },
    sync(animation: AnimationInstance, timeOffset?: number | string) {
      const time = typeof timeOffset === 'number' ? timeOffset : parseFloat(timeOffset || '0') || 0;
      items.push({ time, item: animation, type: 'animation' });
      return instance;
    },
    label(_name: string, _timeOffset?: number | string) { return instance; },
    remove(_animation: AnimationInstance) { return instance; },
    call(callback: () => void, timeOffset?: number | string) {
      const time = typeof timeOffset === 'number' ? timeOffset : parseFloat(timeOffset || '0') || 0;
      items.push({ time, item: callback, type: 'callback' });
      return instance;
    },
    play() { _paused = false; _startTime = performance.now() - _currentTime / _playbackRate; tick(); return instance; },
    pause() { _paused = true; cancelAnimationFrame(_animationFrame); return instance; },
    restart() { _currentTime = 0; instance.play(); return instance; },
    reverse() { _reversed = !_reversed; return instance; },
    alternate() { return instance; },
    resume() { if (_paused) instance.play(); return instance; },
    complete() { return instance; },
    cancel() { _paused = true; cancelAnimationFrame(_animationFrame); return instance; },
    revert() { return instance; },
    seek(time: number) { _currentTime = Math.max(0, Math.min(time, _duration)); return instance; },
    stretch(newDuration: number) { _duration = newDuration; return instance; },
    refresh() { return instance; },
    then(callback?: () => void) { return _finished.then(callback); },
    get duration() { return _duration; },
    get currentTime() { return _currentTime; },
    get progress() { return _duration ? _currentTime / _duration : 0; },
    get paused() { return _paused; },
    get reversed() { return _reversed; }
  };

  function tick(): void {
    if (_paused) return;
    const now = performance.now();
    const elapsed = (now - _startTime) * _playbackRate;
    _currentTime = elapsed;

    items.forEach(item => {
      if (elapsed >= item.time) {
        if (item.type === 'callback' && typeof item.item === 'function') {
          item.item();
        } else if (item.type === 'set' && typeof item.item === 'object') {
        }
      }
    });

    if (elapsed < _duration) {
      _animationFrame = requestAnimationFrame(tick);
    } else {
      _completed = true;
      if (options.onComplete) options.onComplete(instance);
      _resolvePromise();
    }
  }

  let _completed = false;
  return instance;
}

// ============================================================
// Animatable
// ============================================================

function createAnimatable(target: HTMLElement, settings: Record<string, any> = {}): AnimatableInstance {
  const props: Record<string, any> = {};
  const instance: AnimatableInstance = {
    set(properties: Record<string, any>) {
      Object.entries(properties).forEach(([key, value]) => {
        props[key] = value;
        target.style.setProperty(key, `${value}px`);
      });
      return instance;
    },
    revert() {
      Object.keys(props).forEach(key => target.style.removeProperty(key));
      return instance;
    }
  };
  return new Proxy(instance, {
    get(obj, prop) { return prop in obj ? (obj as any)[prop] : props[prop as string]; },
    set(obj, prop, value) { (props as any)[prop] = value; target.style.setProperty(prop as string, `${value}px`); return true; }
  });
}

// ============================================================
// Draggable
// ============================================================

function createDraggable(target: HTMLElement, options: DraggableOptions = {}): DraggableInstance {
  let _x = 0;
  let _y = 0;
  let _pointerDown = false;
  let _dragStarted = false;
  let _isEnabled = true;
  let _startPointerX = 0;
  let _startPointerY = 0;
  let _startX = 0;
  let _startY = 0;
  let _lastPointerX = 0;
  let _lastPointerY = 0;
  let _lastMoveTime = 0;
  let _velocitySamples: Array<{ x: number; y: number; t: number }> = [];
  let _momentumFrame = 0;

  const triggerEl = options.trigger
    ? (typeof options.trigger === 'string' ? document.querySelector(options.trigger) as HTMLElement : options.trigger)
    : target;

  const containerEl = options.container
    ? (typeof options.container === 'string' ? document.querySelector(options.container) as HTMLElement : options.container)
    : null;

  const containerPadding = options.containerPadding || 0;
  const velocityMultiplier = options.velocityMultiplier || 1;
  const minVelocity = options.minVelocity || 0.1;
  const maxVelocity = options.maxVelocity || 5000;
  const dragThreshold = options.dragThreshold || 3;
  const releaseStiffness = options.releaseStiffness ?? 100;
  const releaseDamping = options.releaseDamping ?? 10;
  const releaseMass = options.releaseMass ?? 1;

  const xEnabled = options.x !== false;
  const yEnabled = options.y !== false;
  const xSnap = typeof options.x === 'object' ? options.x?.snap : undefined;
  const ySnap = typeof options.y === 'object' ? options.y?.snap : undefined;
  const xModifier = typeof options.x === 'object' ? options.x?.modifier : undefined;
  const yModifier = typeof options.y === 'object' ? options.y?.modifier : undefined;

  function getContainerBounds(): { minX: number; minY: number; maxX: number; maxY: number } | null {
    if (!containerEl) return null;
    const cr = containerEl.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    return {
      minX: -(cr.width - tr.width) / 2 - containerPadding,
      minY: -(cr.height - tr.height) / 2 - containerPadding,
      maxX: (cr.width - tr.width) / 2 + containerPadding,
      maxY: (cr.height - tr.height) / 2 + containerPadding
    };
  }

  function clampToBounds(val: number, min: number, max: number, friction: number): number {
    if (val < min) return min + (val - min) * friction;
    if (val > max) return max + (val - max) * friction;
    return val;
  }

  function applyPosition(): void {
    const parts: string[] = [];
    if (xEnabled) parts.push(`translateX(${_x}px)`);
    if (yEnabled) parts.push(`translateY(${_y}px)`);
    target.style.transform = parts.join(' ');
  }

  function onPointerDown(e: PointerEvent): void {
    if (!_isEnabled || _pointerDown) return;
    _pointerDown = true;
    _dragStarted = false;
    _startPointerX = e.clientX;
    _startPointerY = e.clientY;
    _startX = _x;
    _startY = _y;
    _lastPointerX = e.clientX;
    _lastPointerY = e.clientY;
    _lastMoveTime = performance.now();
    _velocitySamples = [];

    if (options.cursor) target.style.cursor = options.cursor;

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    (e as any).preventDefault?.();
  }

  function onPointerMove(e: PointerEvent): void {
    if (!_pointerDown) return;

    const now = performance.now();
    const dt = now - _lastMoveTime;
    const dx = e.clientX - _lastPointerX;
    const dy = e.clientY - _lastPointerY;

    const totalDx = e.clientX - _startPointerX;
    const totalDy = e.clientY - _startPointerY;

    if (!_dragStarted) {
      if (Math.abs(totalDx) < dragThreshold && Math.abs(totalDy) < dragThreshold) return;
      _dragStarted = true;
      _isDragging = true;
      if (options.onGrab) options.onGrab(e);
    }

    if (dt > 0) {
      _velocitySamples.push({ x: dx / dt * 1000, y: dy / dt * 1000, t: now });
      if (_velocitySamples.length > 5) _velocitySamples.shift();
    }

    _lastPointerX = e.clientX;
    _lastPointerY = e.clientY;
    _lastMoveTime = now;

    let newX = _startX + totalDx;
    let newY = _startY + totalDy;

    const bounds = getContainerBounds();
    if (bounds) {
      newX = clampToBounds(newX, bounds.minX, bounds.maxY, 0.1);
      newY = clampToBounds(newY, bounds.minY, bounds.maxY, 0.1);
    }

    if (xEnabled) {
      _x = xModifier ? xModifier(newX) : newX;
    }
    if (yEnabled) {
      _y = yModifier ? yModifier(newY) : newY;
    }

    applyPosition();
    if (options.onDrag) options.onDrag(e);
    if (options.onUpdate) options.onUpdate(e);
  }

  let _isDragging = false;

  function onPointerUp(e: PointerEvent): void {
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

    if (!_dragStarted) {
      _pointerDown = false;
      return;
    }

    _isDragging = false;
    _pointerDown = false;

    if (options.cursor) target.style.cursor = '';

    let vx = 0;
    let vy = 0;
    if (_velocitySamples.length > 0) {
      const recent = _velocitySamples.slice(-3);
      vx = recent.reduce((s, v) => s + v.x, 0) / recent.length * velocityMultiplier;
      vy = recent.reduce((s, v) => s + v.y, 0) / recent.length * velocityMultiplier;
      vx = clamp(vx, -maxVelocity, maxVelocity);
      vy = clamp(vy, -maxVelocity, maxVelocity);
    }

    const snapX = xSnap ? snap(_x, xSnap) : _x;
    const snapY = ySnap ? snap(_y, ySnap) : _y;

    if (options.onRelease) options.onRelease(e);

    if (Math.abs(vx) > minVelocity || Math.abs(vy) > minVelocity) {
      applyMomentum(vx, vy, snapX, snapY);
    } else {
      _x = snapX;
      _y = snapY;
      applyPosition();
      if (xSnap || ySnap) {
        if (options.onSnap) options.onSnap(e);
      }
      if (options.onSettle) options.onSettle(e);
    }
  }

  function applyMomentum(vx: number, vy: number, targetSnapX: number, targetSnapY: number): void {
    const springEase = createSpringEasing(releaseStiffness, releaseDamping, releaseMass);
    const startX = _x;
    const startY = _y;
    const startTime = performance.now();
    const duration = 800;
    let lastTime = startTime;

    function momentumTick(): void {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      vx *= Math.pow(0.95, dt * 60);
      vy *= Math.pow(0.95, dt * 60);

      _x += vx * dt;
      _y += vy * dt;

      const bounds = getContainerBounds();
      if (bounds) {
        if (_x < bounds.minX) { _x = bounds.minX; vx = 0; }
        if (_x > bounds.maxX) { _x = bounds.maxX; vx = 0; }
        if (_y < bounds.minY) { _y = bounds.minY; vy = 0; }
        if (_y > bounds.maxY) { _y = bounds.maxY; vy = 0; }
      }

      applyPosition();

      if (Math.abs(vx) < minVelocity && Math.abs(vy) < minVelocity) {
        const settleSnapX = xSnap ? snap(_x, xSnap) : _x;
        const settleSnapY = ySnap ? snap(_y, ySnap) : _y;

        const settleStartX = _x;
        const settleStartY = _y;
        const settleStart = performance.now();
        const settleDuration = 300;

        function settleTick(): void {
          const t = Math.min((performance.now() - settleStart) / settleDuration, 1);
          const eased = springEase(t);
          _x = lerp(settleStartX, settleSnapX, eased);
          _y = lerp(settleStartY, settleSnapY, eased);
          applyPosition();
          if (t < 1) {
            _momentumFrame = requestAnimationFrame(settleTick);
          } else {
            _x = settleSnapX;
            _y = settleSnapY;
            applyPosition();
            if (xSnap || ySnap) options.onSnap?.(new Event('snap'));
            options.onSettle?.(new Event('settle'));
          }
        }
        settleTick();
        return;
      }

      _momentumFrame = requestAnimationFrame(momentumTick);
    }

    _momentumFrame = requestAnimationFrame(momentumTick);
  }

  if (triggerEl) {
    triggerEl.addEventListener('pointerdown', onPointerDown);
  }

  const instance: DraggableInstance = {
    disable() { _isEnabled = false; return instance; },
    enable() { _isEnabled = true; return instance; },
    setX(value: number) { _x = value; applyPosition(); return instance; },
    setY(value: number) { _y = value; applyPosition(); return instance; },
    animateInView() { return instance; },
    scrollInView() { return instance; },
    stop() {
      _isDragging = false;
      _pointerDown = false;
      cancelAnimationFrame(_momentumFrame);
      return instance;
    },
    reset() {
      _x = 0;
      _y = 0;
      target.style.transform = '';
      return instance;
    },
    revert() {
      instance.stop();
      instance.reset();
      if (triggerEl) triggerEl.removeEventListener('pointerdown', onPointerDown);
      return instance;
    },
    refresh() { return instance; },
    get x() { return _x; },
    get y() { return _y; },
    get isDragging() { return _isDragging; }
  };

  return instance;
}

// ============================================================
// ScrollObserver
// ============================================================

function createScrollObserver(options: ScrollObserverOptions = {}): ScrollObserverInstance {
  const linked: AnimationInstance[] = [];
  let _observer: IntersectionObserver | null = null;
  let _isVisible = false;
  let _lastScrollPos = 0;
  let _scrollHandler: (() => void) | null = null;

  const targetEl = options.target
    ? (typeof options.target === 'string' ? document.querySelector(options.target) as HTMLElement : options.target)
    : null;

  const containerEl = options.container
    ? (typeof options.container === 'string' ? document.querySelector(options.container) as HTMLElement : options.container)
    : null;

  const scrollRoot = containerEl || (typeof document !== 'undefined' ? document.documentElement : null);

  let thresholds: number[];
  if (options.threshold === undefined) {
    thresholds = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
  } else if (typeof options.threshold === 'number') {
    thresholds = [options.threshold];
  } else if (Array.isArray(options.threshold)) {
    thresholds = options.threshold;
  } else {
    thresholds = [0, 0.5, 1];
  }

  if (targetEl && typeof IntersectionObserver !== 'undefined') {
    _observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const wasVisible = _isVisible;
        _isVisible = entry.isIntersecting;

        if (_isVisible && !wasVisible) {
          if (options.onEnter) options.onEnter(entry);
          if (options.onEnterForward) options.onEnterForward(entry);
        } else if (!_isVisible && wasVisible) {
          if (options.onLeave) options.onLeave(entry);
          if (options.onLeaveForward) options.onLeaveForward(entry);
        }

        if (options.onUpdate) options.onUpdate(entry);

        linked.forEach(anim => {
          const ratio = entry.intersectionRatio;
          anim.seek(ratio * anim.duration);
        });
      });
    }, {
      root: containerEl,
      threshold: thresholds
    });

    _observer.observe(targetEl);
  }

  function computeScrollProgress(): number {
    if (!targetEl || !scrollRoot) return 0;
    const rect = targetEl.getBoundingClientRect();
    const rootRect = scrollRoot.getBoundingClientRect();
    const axis = options.axis || 'y';

    if (axis === 'x') {
      const rootWidth = rootRect.width;
      if (rootWidth === 0) return 0;
      return clamp(1 - (rect.left - rootRect.left) / rootWidth, 0, 1);
    } else {
      const rootHeight = rootRect.height;
      if (rootHeight === 0) return 0;
      return clamp(1 - (rect.top - rootRect.top) / rootHeight, 0, 1);
    }
  }

  function onScroll(): void {
    const currentPos = options.axis === 'x'
      ? (scrollRoot?.scrollLeft || 0)
      : (scrollRoot?.scrollTop || 0);

    const direction = currentPos > _lastScrollPos ? 'forward' : 'backward';
    _lastScrollPos = currentPos;

    const progress = computeScrollProgress();

    linked.forEach(anim => {
      anim.seek(progress * anim.duration);
    });

    if (direction === 'forward' && options.onEnterForward) {
    } else if (direction === 'backward' && options.onEnterBackward) {
    }
  }

  if (scrollRoot) {
    _scrollHandler = onScroll;
    scrollRoot.addEventListener('scroll', _scrollHandler, { passive: true });
  }

  const instance: ScrollObserverInstance = {
    link(animations: AnimationInstance | AnimationInstance[]) {
      if (Array.isArray(animations)) linked.push(...animations);
      else linked.push(animations);
      return instance;
    },
    refresh() {
      if (_observer && targetEl) {
        _observer.unobserve(targetEl);
        _observer.observe(targetEl);
      }
      return instance;
    },
    revert() {
      if (_observer) {
        _observer.disconnect();
        _observer = null;
      }
      if (scrollRoot && _scrollHandler) {
        scrollRoot.removeEventListener('scroll', _scrollHandler);
        _scrollHandler = null;
      }
      return instance;
    },
    get linked() { return linked; }
  };

  return instance;
}

// ============================================================
// Text Splitter
// ============================================================

function createTextSplitter(target: HTMLElement, options: TextSplitterOptions = {}): TextSplitterInstance {
  const originalHTML = target.innerHTML;
  const originalText = target.textContent || '';
  const chars: HTMLElement[] = [];
  const words: HTMLElement[] = [];
  const lines: HTMLElement[] = [];
  const className = options.class || 'split';
  const wrapTag = options.wrap || 'span';

  function splitText(): void {
    target.innerHTML = '';
    const text = originalText;

    if (options.lines) {
      const lineWrapper = document.createElement('div');
      lineWrapper.style.display = 'inline-block';
      lineWrapper.style.whiteSpace = 'nowrap';

      const wordSplit = text.split(options.includeSpaces ? /(\s+)/ : /\s+/).filter(w => w.length > 0);

      wordSplit.forEach(wordText => {
        const wordEl = document.createElement(wrapTag);
        wordEl.className = `${className}-word`;
        if (options.chars) {
          wordText.split('').forEach(char => {
            const charEl = document.createElement(wrapTag);
            charEl.className = `${className}-char`;
            charEl.textContent = char;
            wordEl.appendChild(charEl);
            chars.push(charEl);
          });
        } else {
          wordEl.textContent = wordText + ' ';
        }
        words.push(wordEl);
        lineWrapper.appendChild(wordEl);
      });

      target.appendChild(lineWrapper);

      const lineRect = lineWrapper.getBoundingClientRect();
      let currentLineTop = -1;
      let currentLine: HTMLElement[] = [];
      let charIdx = 0;

      words.forEach(word => {
        const wordRect = word.getBoundingClientRect();
        if (currentLineTop === -1 || Math.abs(wordRect.top - currentLineTop) < 2) {
          currentLineTop = wordRect.top;
          currentLine.push(word);
        } else {
          const lineEl = document.createElement('div');
          lineEl.className = `${className}-line`;
          currentLine.forEach(w => lineEl.appendChild(w));
          lines.push(lineEl);
          target.appendChild(lineEl);
          currentLine = [word];
          currentLineTop = wordRect.top;
        }
      });

      if (currentLine.length > 0) {
        const lineEl = document.createElement('div');
        lineEl.className = `${className}-line`;
        currentLine.forEach(w => lineEl.appendChild(w));
        lines.push(lineEl);
        target.appendChild(lineEl);
      }

      lineWrapper.remove();
    } else if (options.words) {
      const fragments = text.split(options.includeSpaces ? /(\s+)/ : /\s+/).filter(w => w.length > 0);
      fragments.forEach(frag => {
        const wordEl = document.createElement(wrapTag);
        wordEl.className = `${className}-word`;
        if (options.chars) {
          frag.split('').forEach(char => {
            const charEl = document.createElement(wrapTag);
            charEl.className = `${className}-char`;
            charEl.textContent = char;
            wordEl.appendChild(charEl);
            chars.push(charEl);
          });
        } else {
          wordEl.textContent = frag;
        }
        words.push(wordEl);
        target.appendChild(wordEl);
      });
    } else if (options.chars) {
      text.split('').forEach(char => {
        const charEl = document.createElement(wrapTag);
        charEl.className = `${className}-char`;
        charEl.textContent = char;
        target.appendChild(charEl);
        chars.push(charEl);
      });
    } else {
      text.split('').forEach(char => {
        const charEl = document.createElement(wrapTag);
        charEl.className = `${className}-char`;
        charEl.textContent = char;
        target.appendChild(charEl);
        chars.push(charEl);
      });
    }

    if (options.accessible) {
      target.setAttribute('aria-label', originalText);
    }
  }

  splitText();

  const instance: TextSplitterInstance = {
    addEffect(effect: (el: HTMLElement, i: number) => void) {
      chars.forEach((char, i) => effect(char, i));
      return instance;
    },
    revert() {
      target.innerHTML = originalHTML;
      if (options.accessible) target.removeAttribute('aria-label');
      return instance;
    },
    refresh() {
      target.innerHTML = originalHTML;
      chars.length = 0;
      words.length = 0;
      lines.length = 0;
      splitText();
      return instance;
    },
    get lines() { return lines; },
    get words() { return words; },
    get chars() { return chars; }
  };

  return instance;
}

// ============================================================
// Layout (FLIP)
// ============================================================

function createLayout(options: LayoutOptions = {}): LayoutInstance {
  const targets = options.targets ? getElements(options.targets) : [];
  let _recordedPositions: Map<HTMLElement, DOMRect> = new Map();

  const instance: LayoutInstance = {
    record() {
      _recordedPositions.clear();
      targets.forEach(el => {
        _recordedPositions.set(el, el.getBoundingClientRect());
      });
      return instance;
    },
    animate(animOptions?: Partial<AnimationOptions>): AnimationInstance {
      const els = targets.filter(el => _recordedPositions.has(el));
      const duration = animOptions?.duration ?? options.duration ?? 400;
      const ease = (animOptions?.ease ?? options.easing ?? 'easeOutCubic') as EasingName | EasingFunction | string;
      const rawDelay = animOptions?.delay ?? options.delay ?? 0;

      const enterEls: HTMLElement[] = [];
      const moveEls: Array<{ el: HTMLElement; fromRect: DOMRect }> = [];

      els.forEach(el => {
        const oldRect = _recordedPositions.get(el);
        const newRect = el.getBoundingClientRect();
        if (!oldRect) {
          enterEls.push(el);
        } else {
          moveEls.push({ el, fromRect: oldRect });
        }
      });

      const tl = createTimeline({ duration, autoplay: false });

      moveEls.forEach(({ el, fromRect }, i) => {
        const newRect = el.getBoundingClientRect();
        const dx = fromRect.left - newRect.left;
        const dy = fromRect.top - newRect.top;
        const dw = fromRect.width / (newRect.width || 1);
        const dh = fromRect.height / (newRect.height || 1);

        const stepDelay = typeof rawDelay === 'function' ? (rawDelay as (el: HTMLElement, i: number) => number)(el, i) : rawDelay;

        tl.add(createAnimation({
          targets: el,
          duration,
          delay: stepDelay,
          autoplay: false,
          [String('translateX')]: `${dx}px`,
          [String('translateY')]: `${dy}px`,
          [String('scaleX')]: dw,
          [String('scaleY')]: dh,
        }), 0);
      });

      enterEls.forEach((el, i) => {
        const enterFrom = options.enterFrom || {};
        const stepDelay = typeof rawDelay === 'function' ? (rawDelay as (el: HTMLElement, i: number) => number)(el, i) : rawDelay;

        const fromProps: Record<string, any> = {};
        const toProps: Record<string, any> = {};

        Object.entries(enterFrom).forEach(([key, value]) => {
          fromProps[key] = value;
          toProps[key] = el.style.getPropertyValue(key) || '';
        });

        tl.add(createAnimation({
          targets: el,
          duration,
          delay: stepDelay,
          autoplay: false,
          ...toProps
        }), 0);
      });

      tl.play();
      return {
        play() { tl.play(); return this as any; },
        pause() { tl.pause(); return this as any; },
        restart() { tl.restart(); return this as any; },
        reverse() { tl.reverse(); return this as any; },
        alternate() { return this as any; },
        resume() { tl.resume(); return this as any; },
        complete() { return this as any; },
        cancel() { tl.cancel(); return this as any; },
        revert() { return this as any; },
        reset() { return this as any; },
        seek(time: number) { tl.seek(time); return this as any; },
        stretch(d: number) { tl.stretch(d); return this as any; },
        then(cb?: () => void) { return tl.then(cb); },
        get finished() { return Promise.resolve(); },
        get currentTime() { return tl.currentTime; },
        get progress() { return tl.progress; },
        get duration() { return tl.duration; },
        get paused() { return tl.paused; },
        get reversed() { return tl.reversed; },
        get began() { return false; },
        get completed() { return false; }
      } as AnimationInstance;
    },
    revert() {
      targets.forEach(el => {
        el.style.transform = '';
        el.style.opacity = '';
      });
      _recordedPositions.clear();
      return instance;
    }
  };

  return instance;
}

// ============================================================
// Path Morph
// ============================================================

function createPathMorph(target: SVGPathElement | HTMLElement): PathMorphInstance {
  const getD = () => (target as SVGPathElement).getAttribute('d') || '';

  const instance: PathMorphInstance = {
    to(pathData: string, duration: number = 400, ease: EasingName | EasingFunction | string = 'easeOutCubic'): TweenInstance {
      const startD = getD();
      return tween(target as HTMLElement).to({ d: pathData } as any, duration, ease);
    },
    from(pathData: string, duration: number = 400, ease: EasingName | EasingFunction | string = 'easeOutCubic'): TweenInstance {
      return tween(target as HTMLElement).from({ d: pathData } as any, duration, ease);
    },
    set(pathData: string): PathMorphInstance {
      (target as SVGPathElement).setAttribute('d', pathData);
      return instance;
    }
  };

  return instance;
}

// ============================================================
// Shader Animation (ShaderAnim233)
// ============================================================

const DEFAULT_VERTEX = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const DEFAULT_FRAGMENT = `
  precision mediump float;
  uniform float time;
  uniform vec2 resolution;
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    gl_FragColor = vec4(uv.x, uv.y, sin(time) * 0.5 + 0.5, 1.0);
  }
`;

export interface ShaderAnim233Options {
  vertex?: string;
  fragment?: string;
  uniforms?: Record<string, number | number[] | Float32Array>;
  target: HTMLCanvasElement;
  autoplay?: boolean;
}

export function createShaderAnim233(options: ShaderAnim233Options): ShaderAnim233Instance {
  const canvas = options.target;
  const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

  if (!gl) throw new Error('WebGL not supported');

  function compileShader(type: number, source: string): WebGLShader {
    const shader = gl!.createShader(type)!;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      const info = gl!.getShaderInfoLog(shader);
      gl!.deleteShader(shader);
      throw new Error('Shader compilation failed: ' + info);
    }
    return shader;
  }

  function createProgram(vertexSource: string, fragmentSource: string): WebGLProgram {
    const vs = compileShader(gl!.VERTEX_SHADER, vertexSource);
    const fs = compileShader(gl!.FRAGMENT_SHADER, fragmentSource);
    const prog = gl!.createProgram()!;
    gl!.attachShader(prog, vs);
    gl!.attachShader(prog, fs);
    gl!.linkProgram(prog);
    if (!gl!.getProgramParameter(prog, gl!.LINK_STATUS)) {
      throw new Error('Program linking failed: ' + gl!.getProgramInfoLog(prog));
    }
    return prog;
  }

  let vertexSource = options.vertex || DEFAULT_VERTEX;
  let fragmentSource = options.fragment || DEFAULT_FRAGMENT;
  let program = createProgram(vertexSource, fragmentSource);
  
  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  let uniformLocations: Record<string, WebGLUniformLocation> = {};
  const customUniforms: Record<string, number | number[] | Float32Array> = { ...options.uniforms };

  function updateUniformLocations(): void {
    uniformLocations = {};
    ['time', 'resolution'].forEach(name => {
      const loc = gl!.getUniformLocation(program, name);
      if (loc) uniformLocations[name] = loc;
    });
  }
  updateUniformLocations();

  let isPlaying = false;
  let startTime = 0;
  let animationFrame: number;

  function render(): void {
    if (!isPlaying) return;
    const time = (performance.now() - startTime) / 1000;
    gl!.viewport(0, 0, canvas.width, canvas.height);

    if (uniformLocations.time) gl!.uniform1f(uniformLocations.time, time);
    if (uniformLocations.resolution) gl!.uniform2f(uniformLocations.resolution, canvas.width, canvas.height);

    Object.entries(customUniforms).forEach(([name, value]) => {
      const loc = gl!.getUniformLocation(program, name);
      if (loc) {
        if (typeof value === 'number') gl!.uniform1f(loc, value);
        else if (Array.isArray(value)) {
          if (value.length === 2) gl!.uniform2fv(loc, value);
          else if (value.length === 3) gl!.uniform3fv(loc, value);
          else if (value.length === 4) gl!.uniform4fv(loc, value);
        } else gl!.uniform1fv(loc, value);
      }
    });

    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    animationFrame = requestAnimationFrame(render);
  }

  const instance: ShaderAnim233Instance = {
    play() { isPlaying = true; startTime = performance.now(); render(); return instance; },
    pause() { isPlaying = false; cancelAnimationFrame(animationFrame); return instance; },
    stop() { instance.pause(); return instance; },
    setUniform(name: string, value: number | number[] | Float32Array) { customUniforms[name] = value; return instance; },
    setFragmentShader(source: string) {
      fragmentSource = source;
      gl!.deleteProgram(program);
      program = createProgram(vertexSource, fragmentSource);
      gl!.useProgram(program);
      updateUniformLocations();
      return instance;
    },
    setVertexShader(source: string) {
      vertexSource = source;
      gl!.deleteProgram(program);
      program = createProgram(vertexSource, fragmentSource);
      gl!.useProgram(program);
      updateUniformLocations();
      return instance;
    },
    resize(width: number, height: number) {
      canvas.width = width;
      canvas.height = height;
      return instance;
    },
    get isPlaying() { return isPlaying; },
    get canvas() { return canvas; },
    get gl() { return gl; }
  };

  if (options.autoplay !== false) instance.play();

  return instance;
}

// ============================================================
// Legacy Shader API (compat)
// ============================================================

export interface ShaderOptions {
  vertex?: string;
  fragment?: string;
  uniforms?: Record<string, number | number[] | Float32Array>;
  target: HTMLCanvasElement;
}

export function createShader(options: ShaderOptions): ShaderAnim233Instance {
  return createShaderAnim233({ ...options, autoplay: true });
}

// ============================================================
// Agent-Friendly API
// ============================================================

export interface AgentAPI {
  animate(options: AnimationOptions): AnimationInstance;
  timeline(options?: TimelineOptions): TimelineInstance;
  tween(target: HTMLElement | HTMLElement[]): TweenInstance;
  animatable(target: HTMLElement, settings?: Record<string, any>): AnimatableInstance;
  draggable(target: HTMLElement, options?: DraggableOptions): DraggableInstance;
  onScroll(options?: ScrollObserverOptions): ScrollObserverInstance;
  splitText(target: HTMLElement, options?: TextSplitterOptions): TextSplitterInstance;
  layout(options?: LayoutOptions): LayoutInstance;
  pathMorph(target: SVGPathElement | HTMLElement): PathMorphInstance;
  animateClass(targets: AnimationTarget, options?: { add?: string; remove?: string; duration?: number; easing?: string }): AnimationInstance;
  createWAAPIAnimation(target: HTMLElement, keyframes: Keyframe[], options?: KeyframeAnimationOptions): Animation;
  createShader(options: ShaderOptions): ShaderAnim233Instance;
  createShaderAnim233(options: ShaderAnim233Options): ShaderAnim233Instance;
  stagger(value: number | [number, number], options?: StaggerOptions): (index: number, total: number) => number;
  wait(ms: number): Promise<void>;
  random(min: number, max: number): number;
  createSeededRandom(seed: number): () => number;
  randomPick<T>(array: T[]): T;
  shuffle<T>(array: T[]): T[];
  round(value: number, decimals?: number): number;
  clamp(value: number, min: number, max: number): number;
  snap(value: number, gridValues: number | number[]): number;
  wrap(value: number, min: number, max: number): number;
  mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
  lerp(start: number, end: number, t: number): number;
  damp(start: number, end: number, smooth: number, dt: number): number;
  degToRad(deg: number): number;
  radToDeg(rad: number): number;
  registerEasing(name: string, fn: EasingFunction): void;
  getEasing(name: string): EasingFunction | undefined;
  listEasings(): string[];
  setDebug(enabled: boolean): void;
  version: string;
}

function createAnimateClass(targets: AnimationTarget, options: { add?: string; remove?: string; duration?: number; easing?: string } = {}): AnimationInstance {
  const els = getElements(targets);
  const duration = options.duration || 400;
  const ease = (options.easing || 'easeOutCubic') as EasingName | EasingFunction | string;

  els.forEach(el => {
    if (options.remove) el.classList.remove(options.remove);
    if (options.add) el.classList.add(options.add);
  });

  return createAnimation({
    targets,
    duration,
    autoplay: true,
    ease
  });
}

function createWAAPI(target: HTMLElement, keyframes: Keyframe[], options?: KeyframeAnimationOptions): Animation {
  return target.animate(keyframes, options);
}

export const Anim233: AgentAPI = {
  animate: createAnimation,
  timeline: createTimeline,
  tween,
  animatable: createAnimatable,
  draggable: createDraggable,
  onScroll: createScrollObserver,
  splitText: createTextSplitter,
  layout: createLayout,
  pathMorph: createPathMorph,
  animateClass: createAnimateClass,
  createWAAPIAnimation: createWAAPI,
  createShader,
  createShaderAnim233,
  stagger,
  wait,
  random,
  createSeededRandom,
  randomPick,
  shuffle,
  round,
  clamp,
  snap,
  wrap,
  mapRange,
  lerp,
  damp,
  degToRad,
  radToDeg,
  registerEasing,
  getEasing,
  listEasings,
  setDebug: (_enabled: boolean) => {},
  version: '1.0.0'
};

// ============================================================
// Global Registration (Non-Engineering Mode)
// ============================================================

if (typeof window !== 'undefined') {
  (window as any).Anim233 = Anim233;
  (window as any).anim233 = Anim233;
}

export default Anim233;
