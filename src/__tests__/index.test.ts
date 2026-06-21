import { describe, it, expect, vi } from 'vitest';
import {
  Anim233,
  tween,
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
  listEasings
} from '../index';

// Mock DOM
vi.stubGlobal('document', {
  querySelectorAll: vi.fn(() => []),
  querySelector: vi.fn(() => null),
  createElement: vi.fn((tag: string) => ({
    textContent: '',
    style: { setProperty: vi.fn(), removeProperty: vi.fn() },
    appendChild: vi.fn()
  }))
});

vi.stubGlobal('window', {
  getComputedStyle: vi.fn(() => ({
    getPropertyValue: vi.fn(() => '0')
  })),
  Anim233: undefined
});

vi.stubGlobal('performance', {
  now: vi.fn(() => Date.now())
});

vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => setTimeout(cb, 16)));
vi.stubGlobal('cancelAnimationFrame', vi.fn());

describe('Anim233 Core', () => {
  it('should export Anim233 object', () => {
    expect(Anim233).toBeDefined();
    expect(Anim233.version).toBe('0.3.0');
  });

  it('should have all API methods', () => {
    expect(typeof Anim233.animate).toBe('function');
    expect(typeof Anim233.timeline).toBe('function');
    expect(typeof Anim233.tween).toBe('function');
    expect(typeof Anim233.animatable).toBe('function');
    expect(typeof Anim233.draggable).toBe('function');
    expect(typeof Anim233.onScroll).toBe('function');
    expect(typeof Anim233.splitText).toBe('function');
    expect(typeof Anim233.createShader).toBe('function');
    expect(typeof Anim233.createShaderAnim233).toBe('function');
    expect(typeof Anim233.stagger).toBe('function');
    expect(typeof Anim233.wait).toBe('function');
    expect(typeof Anim233.random).toBe('function');
    expect(typeof Anim233.registerEasing).toBe('function');
    expect(typeof Anim233.getEasing).toBe('function');
    expect(typeof Anim233.listEasings).toBe('function');
  });
});

describe('Tween (DOTween Style)', () => {
  it('should create tween instance', () => {
    const el = document.createElement('div') as HTMLElement;
    const t = tween(el);
    expect(t).toBeDefined();
    expect(typeof t.to).toBe('function');
    expect(typeof t.from).toBe('function');
    expect(typeof t.fromTo).toBe('function');
    expect(typeof t.set).toBe('function');
    expect(typeof t.play).toBe('function');
    expect(typeof t.pause).toBe('function');
    expect(typeof t.resume).toBe('function');
    expect(typeof t.restart).toBe('function');
    expect(typeof t.reverse).toBe('function');
    expect(typeof t.kill).toBe('function');
  });

  it('should support chaining', () => {
    const el = document.createElement('div') as HTMLElement;
    const t = tween(el)
      .to({ x: 100 }, 500, 'easeOutCubic')
      .to({ y: 200 }, 300, 'easeInOutQuad')
      .delay(100)
      .loop(2)
      .yoyo(true);
    
    expect(t).toBeDefined();
    expect(t.duration).toBeGreaterThan(0);
  });

  it('should support set (immediate)', () => {
    const el = document.createElement('div') as HTMLElement;
    const t = tween(el).set({ opacity: 1, x: 50 });
    expect(t).toBeDefined();
  });

  it('should support callbacks', () => {
    const el = document.createElement('div') as HTMLElement;
    const onComplete = vi.fn();
    const onBegin = vi.fn();
    const onUpdate = vi.fn();

    const t = tween(el)
      .to({ x: 100 }, 100)
      .onComplete(onComplete)
      .onBegin(onBegin)
      .onUpdate(onUpdate);
    
    expect(t).toBeDefined();
  });

  it('should support loop and yoyo', () => {
    const el = document.createElement('div') as HTMLElement;
    const t = tween(el)
      .to({ x: 100 }, 200)
      .loop(3)
      .yoyo(true);
    
    expect(t).toBeDefined();
  });

  it('should support from and fromTo', () => {
    const el = document.createElement('div') as HTMLElement;
    const t = tween(el)
      .from({ opacity: 0 }, 500)
      .fromTo({ x: 0 }, { x: 100 }, 500);
    
    expect(t).toBeDefined();
  });

  it('should be playable and pausable', () => {
    const el = document.createElement('div') as HTMLElement;
    const t = tween(el).to({ x: 100 }, 500);
    
    t.play();
    expect(t.isPlaying).toBe(true);
    
    t.pause();
    expect(t.isPaused).toBe(true);
    
    t.resume();
    expect(t.isPaused).toBe(false);
  });

  it('should be killable', () => {
    const el = document.createElement('div') as HTMLElement;
    const t = tween(el).to({ x: 100 }, 500);
    
    t.play();
    t.kill();
    expect(t.isPlaying).toBe(false);
  });
});

describe('Easings', () => {
  it('should have all standard easings', () => {
    const easings = listEasings();
    expect(easings).toContain('linear');
    expect(easings).toContain('easeInQuad');
    expect(easings).toContain('easeOutQuad');
    expect(easings).toContain('easeInOutQuad');
    expect(easings).toContain('easeInCubic');
    expect(easings).toContain('easeOutCubic');
    expect(easings).toContain('easeInOutCubic');
    expect(easings).toContain('easeInBack');
    expect(easings).toContain('easeOutBack');
    expect(easings).toContain('easeInElastic');
    expect(easings).toContain('easeOutElastic');
    expect(easings).toContain('easeInBounce');
    expect(easings).toContain('easeOutBounce');
  });

  it('should register custom easing', () => {
    const custom = (t: number) => t * t;
    registerEasing('myCustom', custom);
    expect(getEasing('myCustom')).toBe(custom);
  });

  it('easing functions should return valid values', () => {
    const linear = getEasing('linear');
    expect(linear).toBeDefined();
    expect(linear!(0)).toBe(0);
    expect(linear!(1)).toBe(1);
    expect(linear!(0.5)).toBe(0.5);
  });
});

describe('Utilities', () => {
  it('wait should return promise', async () => {
    const start = Date.now();
    await wait(10);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(10);
  });

  it('random should return value in range', () => {
    for (let i = 0; i < 100; i++) {
      const val = random(5, 10);
      expect(val).toBeGreaterThanOrEqual(5);
      expect(val).toBeLessThanOrEqual(10);
    }
  });

  it('createSeededRandom should return consistent values', () => {
    const rng1 = createSeededRandom(12345);
    const rng2 = createSeededRandom(12345);
    expect(rng1()).toBe(rng2());
    expect(rng1()).toBe(rng2());
  });

  it('randomPick should return element from array', () => {
    const arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < 100; i++) {
      const val = randomPick(arr);
      expect(arr).toContain(val);
    }
  });

  it('shuffle should return shuffled array', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    expect(shuffled.length).toBe(arr.length);
    expect(shuffled.sort()).toEqual(arr.sort());
  });

  it('round should round to decimals', () => {
    expect(round(1.23456, 2)).toBe(1.23);
    expect(round(1.23456, 0)).toBe(1);
  });

  it('clamp should clamp value', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('snap should snap to grid', () => {
    expect(snap(12, 10)).toBe(10);
    expect(snap(18, 10)).toBe(20);
  });

  it('wrap should wrap value', () => {
    expect(wrap(11, 0, 10)).toBe(1);
    expect(wrap(-1, 0, 10)).toBe(9);
  });

  it('mapRange should map value', () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapRange(0, 0, 10, 0, 100)).toBe(0);
    expect(mapRange(10, 0, 10, 0, 100)).toBe(100);
  });

  it('lerp should interpolate', () => {
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, 1)).toBe(100);
    expect(lerp(0, 100, 0.5)).toBe(50);
  });

  it('degToRad and radToDeg should convert', () => {
    expect(degToRad(180)).toBeCloseTo(Math.PI);
    expect(radToDeg(Math.PI)).toBeCloseTo(180);
  });
});

describe('Stagger', () => {
  it('should create stagger function', () => {
    const s = stagger(100, { from: 'center' });
    expect(typeof s).toBe('function');
  });

  it('stagger should calculate values', () => {
    const s = stagger(100, { from: 0 });
    expect(s(0, 5)).toBe(0);
    expect(s(4, 5)).toBe(100);
  });
});

describe('Agent API', () => {
  it('should have setDebug method', () => {
    expect(typeof Anim233.setDebug).toBe('function');
  });

  it('setDebug should not throw', () => {
    expect(() => Anim233.setDebug(true)).not.toThrow();
    expect(() => Anim233.setDebug(false)).not.toThrow();
  });
});