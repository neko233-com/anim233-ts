import { describe, it, expect, vi } from 'vitest';
import { animate } from '../index';

// Mock document for Node.js environment
vi.stubGlobal('document', {
  querySelectorAll: vi.fn(() => []),
  querySelector: vi.fn(() => null)
});

vi.stubGlobal('window', {
  getComputedStyle: vi.fn(() => ({
    getPropertyValue: vi.fn(() => '0')
  }))
});

vi.stubGlobal('performance', {
  now: vi.fn(() => Date.now())
});

vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => setTimeout(cb, 16)));
vi.stubGlobal('cancelAnimationFrame', vi.fn());

describe('Anim233', () => {
  it('should export animate function', () => {
    expect(typeof animate).toBe('function');
  });

  it('should create animation instance', () => {
    const instance = animate('div', { opacity: 1 });
    expect(instance).toHaveProperty('play');
    expect(instance).toHaveProperty('pause');
    expect(instance).toHaveProperty('reverse');
    expect(instance).toHaveProperty('restart');
    expect(instance).toHaveProperty('seek');
  });

  it('should have play method', () => {
    const instance = animate('div', { opacity: 1 });
    expect(typeof instance.play).toBe('function');
  });

  it('should have pause method', () => {
    const instance = animate('div', { opacity: 1 });
    expect(typeof instance.pause).toBe('function');
  });

  it('should have reverse method', () => {
    const instance = animate('div', { opacity: 1 });
    expect(typeof instance.reverse).toBe('function');
  });

  it('should have restart method', () => {
    const instance = animate('div', { opacity: 1 });
    expect(typeof instance.restart).toBe('function');
  });

  it('should have seek method', () => {
    const instance = animate('div', { opacity: 1 });
    expect(typeof instance.seek).toBe('function');
  });
});