/**
 * Anim233 - Enhanced anime.js with modern animations and shader support
 * @packageDocumentation
 */

// ============================================================
// Types
// ============================================================

export type EasingFunction = (t: number) => number;
export type EasingName = 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' |
  'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo';

export interface AnimationOptions {
  duration?: number;
  easing?: EasingName | EasingFunction;
  delay?: number;
  loop?: boolean | number;
  direction?: 'normal' | 'reverse' | 'alternate';
  onUpdate?: (progress: number, instance: Anim233Instance) => void;
  onComplete?: (instance: Anim233Instance) => void;
  debug?: boolean;
}

export interface Anim233Instance {
  play(): void;
  pause(): void;
  reverse(): void;
  restart(): void;
  seek(time: number): void;
  destroy(): void;
  readonly isPlaying: boolean;
  readonly progress: number;
  readonly currentTime: number;
}

export interface ShaderOptions {
  vertex?: string;
  fragment?: string;
  uniforms?: Record<string, number | number[] | Float32Array>;
  target: HTMLCanvasElement;
}

export interface ShaderInstance {
  play(): void;
  pause(): void;
  destroy(): void;
  setUniform(name: string, value: number | number[] | Float32Array): void;
  readonly isPlaying: boolean;
}

// ============================================================
// Debug Logger (Agent First)
// ============================================================

export interface DebugLogger {
  enabled: boolean;
  prefix: string;
  log(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  group(label: string): void;
  groupEnd(): void;
  time(label: string): void;
  timeEnd(label: string): void;
  clear(): void;
}

function createDebugLogger(enabled: boolean): DebugLogger {
  return {
    enabled,
    prefix: '[Anim233]',
    log(message: string, ...args: any[]) {
      if (this.enabled) console.log(`${this.prefix} ${message}`, ...args);
    },
    warn(message: string, ...args: any[]) {
      if (this.enabled) console.warn(`${this.prefix} ${message}`, ...args);
    },
    error(message: string, ...args: any[]) {
      if (this.enabled) console.error(`${this.prefix} ${message}`, ...args);
    },
    group(label: string) {
      if (this.enabled) console.group(`${this.prefix} ${label}`);
    },
    groupEnd() {
      if (this.enabled) console.groupEnd();
    },
    time(label: string) {
      if (this.enabled) console.time(`${this.prefix} ${label}`);
    },
    timeEnd(label: string) {
      if (this.enabled) console.timeEnd(`${this.prefix} ${label}`);
    },
    clear() {
      if (this.enabled) console.clear();
    }
  };
}

const logger = createDebugLogger(false);

// ============================================================
// Easing Functions
// ============================================================

const easings: Record<string, EasingFunction> = {
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

export function registerEasing(name: string, fn: EasingFunction): void {
  easings[name] = fn;
  logger.log(`Registered custom easing: ${name}`);
}

export function getEasing(name: string): EasingFunction | undefined {
  return easings[name];
}

export function listEasings(): string[] {
  return Object.keys(easings);
}

// ============================================================
// DOM Utilities
// ============================================================

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

function applyEasing(t: number, easing: EasingName | EasingFunction): number {
  if (typeof easing === 'function') {
    return easing(t);
  }
  return easings[easing] ? easings[easing](t) : t;
}

function setStyle(el: HTMLElement, prop: string, value: number): void {
  el.style.setProperty(prop, `${value}px`);
}

// ============================================================
// Animation Factory
// ============================================================

let animationIdCounter = 0;

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
  const debug = options.debug || false;

  if (debug) {
    logger.enabled = true;
  }

  const animationId = ++animationIdCounter;
  let isPlaying = false;
  let startTime = 0;
  let animationFrame: number;
  let _progress = 0;
  let _currentTime = 0;

  logger.group(`Animation #${animationId}`);
  logger.log('Created with targets:', elements.length, 'properties:', Object.keys(properties).join(', '));
  logger.groupEnd();

  const instance: Anim233Instance = {
    play() {
      isPlaying = true;
      startTime = performance.now() - _currentTime;
      logger.log(`Animation #${animationId} playing from ${_currentTime}ms`);
      tick();
    },
    pause() {
      isPlaying = false;
      cancelAnimationFrame(animationFrame);
      logger.log(`Animation #${animationId} paused at ${_currentTime}ms`);
    },
    reverse() {
      // TODO: Implement reverse
      logger.warn('reverse() not yet implemented');
    },
    restart() {
      this.pause();
      _currentTime = 0;
      this.play();
    },
    seek(time: number) {
      _currentTime = Math.max(0, Math.min(time, duration));
      _progress = _currentTime / duration;
      logger.log(`Animation #${animationId} seeked to ${_currentTime}ms`);
    },
    destroy() {
      this.pause();
      elements.forEach(el => {
        el.style.removeProperty('--anim233-progress');
      });
      logger.log(`Animation #${animationId} destroyed`);
    },
    get isPlaying() { return isPlaying; },
    get progress() { return _progress; },
    get currentTime() { return _currentTime; }
  };

  function tick() {
    if (!isPlaying) return;

    const now = performance.now();
    const elapsed = now - startTime;
    _currentTime = elapsed;
    _progress = Math.min(elapsed / duration, 1);

    elements.forEach(el => {
      el.style.setProperty('--anim233-progress', String(_progress));
      
      Object.entries(properties).forEach(([prop, value]) => {
        const currentValue = getComputedValue(el, prop);
        const targetValue = parseValue(value);
        const easedProgress = applyEasing(_progress, easing);
        
        const newValue = interpolate(currentValue, targetValue, easedProgress);
        setStyle(el, prop, newValue);
      });
    });

    if (options.onUpdate) {
      options.onUpdate(_progress, instance);
    }

    if (_progress < 1) {
      animationFrame = requestAnimationFrame(tick);
    } else {
      if (options.onComplete) {
        options.onComplete(instance);
      }
      if (loop) {
        const loopCount = typeof loop === 'number' ? loop : Infinity;
        startTime = performance.now();
        animationFrame = requestAnimationFrame(tick);
      }
    }
  }

  return instance;
}

// ============================================================
// Shader Support
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

export function createShader(options: ShaderOptions): ShaderInstance {
  const canvas = options.target;
  const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
  
  if (!gl) {
    throw new Error('WebGL not supported');
  }

  const vertexShaderSource = options.vertex || DEFAULT_VERTEX;
  const fragmentShaderSource = options.fragment || DEFAULT_FRAGMENT;

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

  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    throw new Error('Program linking failed: ' + info);
  }

  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
     1,  1,
  ]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const uniforms: Record<string, WebGLUniformLocation> = {};
  ['time', 'resolution'].forEach(name => {
    const loc = gl.getUniformLocation(program, name);
    if (loc) uniforms[name] = loc;
  });

  let isPlaying = false;
  let startTime = 0;
  let animationFrame: number;
  const customUniforms: Record<string, number | number[] | Float32Array> = { ...options.uniforms };

  function render() {
    if (!isPlaying) return;

    const time = (performance.now() - startTime) / 1000;
    gl!.viewport(0, 0, canvas.width, canvas.height);

    if (uniforms.time) gl!.uniform1f(uniforms.time, time);
    if (uniforms.resolution) gl!.uniform2f(uniforms.resolution, canvas.width, canvas.height);

    Object.entries(customUniforms).forEach(([name, value]) => {
      const loc = gl!.getUniformLocation(program, name);
      if (loc) {
        if (typeof value === 'number') {
          gl!.uniform1f(loc, value);
        } else if (Array.isArray(value)) {
          if (value.length === 2) gl!.uniform2fv(loc, value);
          else if (value.length === 3) gl!.uniform3fv(loc, value);
          else if (value.length === 4) gl!.uniform4fv(loc, value);
        } else {
          gl!.uniform1fv(loc, value);
        }
      }
    });

    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    animationFrame = requestAnimationFrame(render);
  }

  return {
    play() {
      isPlaying = true;
      startTime = performance.now();
      render();
    },
    pause() {
      isPlaying = false;
      cancelAnimationFrame(animationFrame);
    },
    destroy() {
      this.pause();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    },
    setUniform(name: string, value: number | number[] | Float32Array) {
      customUniforms[name] = value;
    },
    get isPlaying() { return isPlaying; }
  };
}

// ============================================================
// Timeline (Agent First - Chainable)
// ============================================================

export interface TimelineInstance {
  add(callback: () => void, time?: number): TimelineInstance;
  play(): TimelineInstance;
  pause(): TimelineInstance;
  restart(): TimelineInstance;
  destroy(): void;
}

export function timeline(): TimelineInstance {
  const events: Array<{ time: number; callback: () => void }> = [];
  let isPlaying = false;
  let startTime = 0;
  let animationFrame: number;

  function tick() {
    if (!isPlaying) return;
    const elapsed = performance.now() - startTime;
    events.forEach(event => {
      if (elapsed >= event.time) {
        event.callback();
      }
    });
    animationFrame = requestAnimationFrame(tick);
  }

  return {
    add(callback: () => void, time: number = 0) {
      events.push({ time, callback });
      return this;
    },
    play() {
      isPlaying = true;
      startTime = performance.now();
      tick();
      return this;
    },
    pause() {
      isPlaying = false;
      cancelAnimationFrame(animationFrame);
      return this;
    },
    restart() {
      this.pause();
      this.play();
      return this;
    },
    destroy() {
      this.pause();
      events.length = 0;
    }
  };
}

// ============================================================
// Utility Functions (Agent First)
// ============================================================

export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function stagger(items: any[], delay: number): void {
  items.forEach((item, i) => {
    setTimeout(() => {
      if (typeof item === 'function') item();
      else if (item && typeof item.play === 'function') item.play();
    }, i * delay);
  });
}

export function spring(options: { target: number; stiffness?: number; damping?: number; mass?: number }) {
  const { target, stiffness = 0.1, damping = 0.8, mass = 1 } = options;
  let current = 0;
  let velocity = 0;

  return {
    update() {
      const force = (target - current) * stiffness;
      const acceleration = force / mass;
      velocity = (velocity + acceleration) * damping;
      current += velocity;
      return current;
    },
    reset(value: number) {
      current = value;
      velocity = 0;
    }
  };
}

// ============================================================
// Agent-Friendly API
// ============================================================

export interface AgentAPI {
  animate: typeof animate;
  timeline: typeof timeline;
  createShader: typeof createShader;
  wait: typeof wait;
  stagger: typeof stagger;
  spring: typeof spring;
  registerEasing: typeof registerEasing;
  getEasing: typeof getEasing;
  listEasings: typeof listEasings;
  setDebug: (enabled: boolean) => void;
  version: string;
}

export const Anim233: AgentAPI = {
  animate,
  timeline,
  createShader,
  wait,
  stagger,
  spring,
  registerEasing,
  getEasing,
  listEasings,
  setDebug: (enabled: boolean) => { logger.enabled = enabled; },
  version: '0.1.0'
};

// ============================================================
// Global Registration (Non-Engineering Mode)
// ============================================================

if (typeof window !== 'undefined') {
  (window as any).Anim233 = Anim233;
  (window as any).anim233 = Anim233;
}

// Default export
export default Anim233;