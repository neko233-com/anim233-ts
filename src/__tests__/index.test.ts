import { describe, it, expect, vi } from 'vitest';
import { Anim233, animate, createShader, timeline, wait, stagger, spring, registerEasing, getEasing, listEasings } from '../index';

// Mock DOM
vi.stubGlobal('document', {
  querySelectorAll: vi.fn(() => []),
  querySelector: vi.fn(() => null)
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

describe('Anim233', () => {
  it('should export Anim233 object', () => {
    expect(Anim233).toBeDefined();
    expect(Anim233.version).toBe('0.1.0');
  });

  it('should have all API methods', () => {
    expect(typeof Anim233.animate).toBe('function');
    expect(typeof Anim233.timeline).toBe('function');
    expect(typeof Anim233.createShader).toBe('function');
    expect(typeof Anim233.wait).toBe('function');
    expect(typeof Anim233.stagger).toBe('function');
    expect(typeof Anim233.spring).toBe('function');
    expect(typeof Anim233.registerEasing).toBe('function');
    expect(typeof Anim233.getEasing).toBe('function');
    expect(typeof Anim233.listEasings).toBe('function');
    expect(typeof Anim233.setDebug).toBe('function');
  });

  it('should create animation instance', () => {
    const instance = animate('div', { opacity: 1 });
    expect(instance).toHaveProperty('play');
    expect(instance).toHaveProperty('pause');
    expect(instance).toHaveProperty('reverse');
    expect(instance).toHaveProperty('restart');
    expect(instance).toHaveProperty('seek');
    expect(instance).toHaveProperty('destroy');
    expect(instance).toHaveProperty('isPlaying');
    expect(instance).toHaveProperty('progress');
    expect(instance).toHaveProperty('currentTime');
  });

  it('should have timeline method', () => {
    const tl = timeline();
    expect(tl).toHaveProperty('add');
    expect(tl).toHaveProperty('play');
    expect(tl).toHaveProperty('pause');
    expect(tl).toHaveProperty('restart');
    expect(tl).toHaveProperty('destroy');
  });

  it('should have createShader method', () => {
    expect(typeof createShader).toBe('function');
  });

  it('should have wait method', () => {
    expect(typeof wait).toBe('function');
  });

  it('should have stagger method', () => {
    expect(typeof stagger).toBe('function');
  });

  it('should have spring method', () => {
    const s = spring({ target: 100 });
    expect(s).toHaveProperty('update');
    expect(s).toHaveProperty('reset');
  });

  it('should have registerEasing method', () => {
    expect(typeof registerEasing).toBe('function');
  });

  it('should have getEasing method', () => {
    expect(typeof getEasing).toBe('function');
  });

  it('should have listEasings method', () => {
    const easings = listEasings();
    expect(Array.isArray(easings)).toBe(true);
    expect(easings).toContain('linear');
    expect(easings).toContain('easeInOutQuad');
  });

  it('should register custom easing', () => {
    const customEasing = (t: number) => t * t;
    registerEasing('custom', customEasing);
    expect(getEasing('custom')).toBe(customEasing);
  });

  it('should set debug mode', () => {
    Anim233.setDebug(true);
    Anim233.setDebug(false);
  });
});

describe('Timeline', () => {
  it('should create timeline with add method', () => {
    const tl = timeline();
    const result = tl.add(() => {}, 100);
    expect(result).toBe(tl); // Should be chainable
  });

  it('should be chainable', () => {
    const tl = timeline();
    const result = tl
      .add(() => {}, 0)
      .add(() => {}, 100)
      .add(() => {}, 200);
    expect(result).toBe(tl);
  });
});

describe('Spring', () => {
  it('should update value towards target', () => {
    const s = spring({ target: 100, stiffness: 0.1, damping: 0.8 });
    const values = [];
    for (let i = 0; i < 10; i++) {
      values.push(s.update());
    }
    expect(values[values.length - 1]).toBeGreaterThan(0);
    // Spring overshoots, so we just check it's moving towards target
    expect(values[values.length - 1]).toBeGreaterThan(values[0]);
  });

  it('should reset value', () => {
    const s = spring({ target: 100 });
    s.update();
    s.reset(50);
    const value = s.update();
    // After reset to 50, first update should be near 50 (may overshoot slightly)
    expect(value).toBeGreaterThanOrEqual(48);
    expect(value).toBeLessThanOrEqual(55);
  });
});