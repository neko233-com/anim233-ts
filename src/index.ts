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
  // Chainable methods
  to(target: Record<string, any>, duration?: number, ease?: EasingName | EasingFunction | string): TweenInstance;
  from(target: Record<string, any>, duration?: number, ease?: EasingName | EasingFunction | string): TweenInstance;
  fromTo(from: Record<string, any>, to: Record<string, any>, duration?: number, ease?: EasingName | EasingFunction | string): TweenInstance;
  set(target: Record<string, any>): TweenInstance;
  
  // Delay
  delay(delay: number): TweenInstance;
  
  // Playback
  play(): TweenInstance;
  pause(): TweenInstance;
  resume(): TweenInstance;
  restart(): TweenInstance;
  reverse(): TweenInstance;
  kill(): TweenInstance;
  
  // Callbacks
  onBegin(callback: () => void): TweenInstance;
  onComplete(callback: () => void): TweenInstance;
  onUpdate(callback: (progress: number) => void): TweenInstance;
  onLoop(callback: () => void): TweenInstance;
  
  // Chaining helpers
  append(callback: () => void): TweenInstance;
  appendInterval(delay: number): TweenInstance;
  join(): TweenInstance;
  
  // Loop
  loop(count?: number): TweenInstance;
  yoyo(enable?: boolean): TweenInstance;
  
  // Properties
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
  let _yoyo = false;
  let _isPlaying = false;
  let _isPaused = false;
  let _isComplete = false;
let _animationFrame = 0;
    let _startTime = 0;
    let _stepStartTime = 0;
  
  const _callbacks = {
    onBegin: [] as (() => void)[],
    onComplete: [] as (() => void)[],
    onUpdate: [] as ((progress: number) => void)[],
    onLoop: [] as (() => void)[],
  };

  function calculateTotalDuration(): void {
    _totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
  }

  function getStepAtTime(time: number): { step: TweenStep; localProgress: number } | null {
    let elapsed = 0;
    for (let i = 0; i < steps.length; i++) {
      if (time <= elapsed + steps[i].duration) {
        const localProgress = (time - elapsed) / steps[i].duration;
        return { step: steps[i], localProgress: Math.min(1, localProgress) };
      }
      elapsed += steps[i].duration;
    }
    return null;
  }

  function applyStep(step: TweenStep, progress: number): void {
    const easedProgress = applyEasing(progress, step.ease);
    
    targets.forEach(el => {
      Object.entries(step.properties).forEach(([prop, targetValue]) => {
        if (step.type === 'set') {
          el.style.setProperty(prop, `${targetValue}`);
        } else {
          const startValue = step.fromProps?.[prop] ?? 0;
          const endValue = typeof targetValue === 'number' ? targetValue : parseFloat(targetValue) || 0;
          const currentValue = startValue + (endValue - startValue) * easedProgress;
          el.style.setProperty(prop, `${currentValue}px`);
        }
      });
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

    _callbacks.onUpdate.forEach(cb => cb(elapsed / _totalDuration));

    if (elapsed >= _totalDuration) {
      if (_loop === Infinity || _loop > 1) {
        if (_loop !== Infinity) _loop--;
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
      steps.push({ properties: to, duration, ease, type: 'fromTo', fromProps: from });
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
      instance.play();
      return instance;
    },
    reverse(): TweenInstance {
      steps.reverse();
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
    restart() { _currentTime = 0; instance.play(); return instance; },
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
    targets.forEach((el, i) => {
      Object.entries(options).forEach(([prop, value]) => {
        if (['targets', 'delay', 'duration', 'loop', 'loopDelay', 'alternate', 'reversed', 'autoplay', 'frameRate', 'playbackRate', 'playbackEase', 'onBegin', 'onComplete', 'onBeforeUpdate', 'onUpdate', 'onRender', 'onLoop', 'onPause'].includes(prop)) return;
        const resolved = resolveValue(value, el, i, total);
        if (typeof resolved === 'number') el.style.setProperty(prop, `${resolved}px`);
        else if (typeof resolved === 'string') el.style.setProperty(prop, resolved);
      });
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
    label(name: string, timeOffset?: number | string) { return instance; },
    remove(animation: AnimationInstance) { return instance; },
    call(callback: () => void, timeOffset?: number | string) {
      const time = typeof timeOffset === 'number' ? timeOffset : parseFloat(timeOffset || '0') || 0;
      items.push({ time, item: callback, type: 'callback' });
      return instance;
    },
    play() { _paused = false; _startTime = performance.now() - _currentTime / _playbackRate; return instance; },
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
  let _x = 0, _y = 0, _isDragging = false;
  const instance: DraggableInstance = {
    disable() { return instance; },
    enable() { return instance; },
    setX(value: number) { _x = value; target.style.transform = `translateX(${value}px)`; return instance; },
    setY(value: number) { _y = value; target.style.transform = `translateY(${value}px)`; return instance; },
    animateInView() { return instance; },
    scrollInView() { return instance; },
    stop() { _isDragging = false; return instance; },
    reset() { _x = 0; _y = 0; target.style.transform = ''; return instance; },
    revert() { instance.reset(); return instance; },
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
  const instance: ScrollObserverInstance = {
    link(animations: AnimationInstance | AnimationInstance[]) {
      if (Array.isArray(animations)) linked.push(...animations);
      else linked.push(animations);
      return instance;
    },
    refresh() { return instance; },
    revert() { return instance; },
    get linked() { return linked; }
  };
  return instance;
}

// ============================================================
// Text Splitter
// ============================================================

function createTextSplitter(target: HTMLElement, options: TextSplitterOptions = {}): TextSplitterInstance {
  const text = target.textContent || '';
  const chars: HTMLElement[] = [];
  const words: HTMLElement[] = [];
  const lines: HTMLElement[] = [];

  if (options.chars) {
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char;
      target.appendChild(span);
      chars.push(span);
    });
  }

  return {
    addEffect(effect: (el: HTMLElement, i: number) => void) {
      chars.forEach((char, i) => effect(char, i));
      return instance;
    },
    revert() { target.textContent = text; return instance; },
    refresh() { return instance; },
    get lines() { return lines; },
    get words() { return words; },
    get chars() { return chars; }
  };

  const instance = { addEffect: (f: any) => instance, revert: () => instance, refresh: () => instance, lines, words, chars };
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
  // Core Animation
  animate(options: AnimationOptions): AnimationInstance;
  timeline(options?: TimelineOptions): TimelineInstance;
  tween(target: HTMLElement | HTMLElement[]): TweenInstance;
  animatable(target: HTMLElement, settings?: Record<string, any>): AnimatableInstance;
  draggable(target: HTMLElement, options?: DraggableOptions): DraggableInstance;
  onScroll(options?: ScrollObserverOptions): ScrollObserverInstance;
  splitText(target: HTMLElement, options?: TextSplitterOptions): TextSplitterInstance;
  
  // Shader
  createShader(options: ShaderOptions): ShaderAnim233Instance;
  createShaderAnim233(options: ShaderAnim233Options): ShaderAnim233Instance;
  
  // Utilities
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
  
  // Easing
  registerEasing(name: string, fn: EasingFunction): void;
  getEasing(name: string): EasingFunction | undefined;
  listEasings(): string[];
  
  // Debug
  setDebug(enabled: boolean): void;
  
  // Meta
  version: string;
}

export const Anim233: AgentAPI = {
  animate: createAnimation,
  timeline: createTimeline,
  tween,
  animatable: createAnimatable,
  draggable: createDraggable,
  onScroll: createScrollObserver,
  splitText: createTextSplitter,
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
  setDebug: (enabled: boolean) => {},
  version: '0.3.0'
};

// ============================================================
// Global Registration (Non-Engineering Mode)
// ============================================================

if (typeof window !== 'undefined') {
  (window as any).Anim233 = Anim233;
  (window as any).anim233 = Anim233;
}

export default Anim233;