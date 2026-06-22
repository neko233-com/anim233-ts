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
  listEasings,
  createAnimationGroup,
  createVirtualList,
  createListAnimation
} from '../index';

// Mock DOM
class MockHTMLElement {
  textContent = '';
  style = { setProperty: vi.fn(), removeProperty: vi.fn(), getPropertyValue: vi.fn(() => '') };
  private _children: MockHTMLElement[] = [];
  private _clientHeight = 400;
  
  appendChild = vi.fn((child: MockHTMLElement) => {
    this._children.push(child);
    return child;
  });
  
  removeChild = vi.fn((child: MockHTMLElement) => {
    const idx = this._children.indexOf(child);
    if (idx !== -1) this._children.splice(idx, 1);
    return child;
  });
  
  insertBefore = vi.fn((newChild: MockHTMLElement, refChild: MockHTMLElement | null) => {
    if (refChild) {
      const idx = this._children.indexOf(refChild);
      if (idx !== -1) {
        this._children.splice(idx, 0, newChild);
      } else {
        this._children.push(newChild);
      }
    } else {
      this._children.push(newChild);
    }
    return newChild;
  });
  
  get children() { return this._children; }
  get childNodes() { return this._children; }
  get clientHeight() { return this._clientHeight; }
  set clientHeight(val: number) { this._clientHeight = val; }
  
  getBoundingClientRect = vi.fn(() => ({ left: 0, top: 0, width: 100, height: 100 }));
  classList = { add: vi.fn(), remove: vi.fn() };
  setAttribute = vi.fn();
  removeAttribute = vi.fn();
  querySelectorAll = vi.fn(() => []);
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  scrollIntoView = vi.fn();
  remove = vi.fn();
  scrollTop = 0;
  scrollTo = vi.fn();
}

vi.stubGlobal('HTMLElement', MockHTMLElement);

vi.stubGlobal('document', {
  querySelectorAll: vi.fn(() => []),
  querySelector: vi.fn(() => null),
  createElement: vi.fn((tag: string) => new MockHTMLElement())
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
    expect(Anim233.version).toBe('1.0.0');
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

  it('should have group method', () => {
    expect(typeof Anim233.group).toBe('function');
  });
});

describe('AnimationGroup', () => {
  it('should create group instance', () => {
    const group = createAnimationGroup();
    expect(group).toBeDefined();
    expect(typeof group.add).toBe('function');
    expect(typeof group.remove).toBe('function');
    expect(typeof group.play).toBe('function');
    expect(typeof group.pause).toBe('function');
    expect(typeof group.restart).toBe('function');
    expect(typeof group.reverse).toBe('function');
    expect(typeof group.resume).toBe('function');
    expect(typeof group.cancel).toBe('function');
    expect(typeof group.revert).toBe('function');
    expect(typeof group.kill).toBe('function');
    expect(typeof group.then).toBe('function');
  });

  it('should add and remove animations', () => {
    const group = createAnimationGroup();
    const el = document.createElement('div') as HTMLElement;
    const anim = Anim233.animate({ targets: el, duration: 100 });
    
    group.add(anim);
    expect(group.animations.length).toBe(1);
    
    group.remove(anim);
    expect(group.animations.length).toBe(0);
  });

  it('should add multiple animations', () => {
    const group = createAnimationGroup();
    const el1 = document.createElement('div') as HTMLElement;
    const el2 = document.createElement('div') as HTMLElement;
    const anim1 = Anim233.animate({ targets: el1, duration: 100 });
    const anim2 = Anim233.animate({ targets: el2, duration: 200 });
    
    group.add([anim1, anim2]);
    expect(group.animations.length).toBe(2);
  });

  it('should have correct duration', () => {
    const group = createAnimationGroup();
    const el1 = document.createElement('div') as HTMLElement;
    const el2 = document.createElement('div') as HTMLElement;
    const anim1 = Anim233.animate({ targets: el1, duration: 100 });
    const anim2 = Anim233.animate({ targets: el2, duration: 200 });
    
    group.add([anim1, anim2]);
    expect(group.duration).toBe(200);
  });

  it('should kill and clear animations', () => {
    const group = createAnimationGroup();
    const el = document.createElement('div') as HTMLElement;
    const anim = Anim233.animate({ targets: el, duration: 100 });
    
    group.add(anim);
    group.kill();
    expect(group.animations.length).toBe(0);
  });
});

describe('Timeline', () => {
  it('should create timeline instance', () => {
    const tl = Anim233.timeline();
    expect(tl).toBeDefined();
    expect(typeof tl.add).toBe('function');
    expect(typeof tl.set).toBe('function');
    expect(typeof tl.sync).toBe('function');
    expect(typeof tl.label).toBe('function');
    expect(typeof tl.remove).toBe('function');
    expect(typeof tl.call).toBe('function');
    expect(typeof tl.play).toBe('function');
    expect(typeof tl.pause).toBe('function');
    expect(typeof tl.restart).toBe('function');
    expect(typeof tl.reverse).toBe('function');
    expect(typeof tl.alternate).toBe('function');
    expect(typeof tl.resume).toBe('function');
    expect(typeof tl.complete).toBe('function');
    expect(typeof tl.cancel).toBe('function');
    expect(typeof tl.revert).toBe('function');
    expect(typeof tl.seek).toBe('function');
    expect(typeof tl.stretch).toBe('function');
    expect(typeof tl.refresh).toBe('function');
    expect(typeof tl.then).toBe('function');
  });

  it('should support adding animations', () => {
    const tl = Anim233.timeline();
    const el = document.createElement('div') as HTMLElement;
    const anim = Anim233.animate({ targets: el, duration: 500 });
    
    tl.add(anim, 0);
    expect(tl.duration).toBeGreaterThan(0);
  });

  it('should support labels', () => {
    const tl = Anim233.timeline();
    tl.label('start', 0);
    tl.label('end', 1000);
    expect(tl).toBeDefined();
  });

  it('should support callbacks', () => {
    const tl = Anim233.timeline();
    const callback = vi.fn();
    tl.call(callback, 0);
    expect(tl).toBeDefined();
  });

  it('should support seek', () => {
    const tl = Anim233.timeline();
    tl.stretch(1000);
    tl.seek(500);
    expect(tl.currentTime).toBe(500);
  });

  it('should support stretch', () => {
    const tl = Anim233.timeline();
    tl.stretch(2000);
    expect(tl.duration).toBe(2000);
  });
});

describe('Draggable', () => {
  it('should create draggable instance', () => {
    const el = document.createElement('div') as HTMLElement;
    const d = Anim233.draggable(el);
    expect(d).toBeDefined();
    expect(typeof d.disable).toBe('function');
    expect(typeof d.enable).toBe('function');
    expect(typeof d.setX).toBe('function');
    expect(typeof d.setY).toBe('function');
    expect(typeof d.animateInView).toBe('function');
    expect(typeof d.scrollInView).toBe('function');
    expect(typeof d.stop).toBe('function');
    expect(typeof d.reset).toBe('function');
    expect(typeof d.revert).toBe('function');
    expect(typeof d.refresh).toBe('function');
  });

  it('should support enable/disable', () => {
    const el = document.createElement('div') as HTMLElement;
    const d = Anim233.draggable(el);
    
    d.disable();
    d.enable();
    expect(d).toBeDefined();
  });

  it('should support setX/setY', () => {
    const el = document.createElement('div') as HTMLElement;
    const d = Anim233.draggable(el);
    
    d.setX(100);
    d.setY(200);
    expect(d.x).toBe(100);
    expect(d.y).toBe(200);
  });

  it('should support reset', () => {
    const el = document.createElement('div') as HTMLElement;
    const d = Anim233.draggable(el);
    
    d.setX(100);
    d.setY(200);
    d.reset();
    expect(d.x).toBe(0);
    expect(d.y).toBe(0);
  });
});

describe('ScrollObserver', () => {
  it('should create scroll observer instance', () => {
    const so = Anim233.onScroll();
    expect(so).toBeDefined();
    expect(typeof so.link).toBe('function');
    expect(typeof so.refresh).toBe('function');
    expect(typeof so.revert).toBe('function');
    expect(so.linked).toBeDefined();
  });

  it('should link animations', () => {
    const so = Anim233.onScroll();
    const el = document.createElement('div') as HTMLElement;
    const anim = Anim233.animate({ targets: el, duration: 100 });
    
    so.link(anim);
    expect(so.linked.length).toBe(1);
  });

  it('should link multiple animations', () => {
    const so = Anim233.onScroll();
    const el1 = document.createElement('div') as HTMLElement;
    const el2 = document.createElement('div') as HTMLElement;
    const anim1 = Anim233.animate({ targets: el1, duration: 100 });
    const anim2 = Anim233.animate({ targets: el2, duration: 200 });
    
    so.link([anim1, anim2]);
    expect(so.linked.length).toBe(2);
  });
});

describe('TextSplitter', () => {
  it('should create text splitter instance', () => {
    const el = document.createElement('div') as HTMLElement;
    el.textContent = 'Hello World';
    const ts = Anim233.splitText(el, { chars: true });
    expect(ts).toBeDefined();
    expect(typeof ts.addEffect).toBe('function');
    expect(typeof ts.revert).toBe('function');
    expect(typeof ts.refresh).toBe('function');
  });

  it('should split into chars', () => {
    const el = document.createElement('div') as HTMLElement;
    el.textContent = 'Hi';
    const ts = Anim233.splitText(el, { chars: true });
    expect(ts.chars.length).toBe(2);
  });

  it('should split into words', () => {
    const el = document.createElement('div') as HTMLElement;
    el.textContent = 'Hello World';
    const ts = Anim233.splitText(el, { words: true });
    expect(ts.words.length).toBe(2);
  });
});

describe('Layout (FLIP)', () => {
  it('should create layout instance', () => {
    const el = document.createElement('div') as HTMLElement;
    const l = Anim233.layout({ targets: el });
    expect(l).toBeDefined();
    expect(typeof l.record).toBe('function');
    expect(typeof l.animate).toBe('function');
    expect(typeof l.revert).toBe('function');
  });

  it('should record and animate', () => {
    const el = document.createElement('div') as HTMLElement;
    const l = Anim233.layout({ targets: el, duration: 400 });
    
    l.record();
    const anim = l.animate();
    expect(anim).toBeDefined();
    expect(typeof anim.play).toBe('function');
    expect(typeof anim.pause).toBe('function');
  });
});

describe('Animation Engine', () => {
  it('should create animation instance', () => {
    const el = document.createElement('div') as HTMLElement;
    const anim = Anim233.animate({ targets: el, duration: 500 });
    expect(anim).toBeDefined();
    expect(typeof anim.play).toBe('function');
    expect(typeof anim.pause).toBe('function');
    expect(typeof anim.restart).toBe('function');
    expect(typeof anim.reverse).toBe('function');
    expect(typeof anim.alternate).toBe('function');
    expect(typeof anim.resume).toBe('function');
    expect(typeof anim.complete).toBe('function');
    expect(typeof anim.cancel).toBe('function');
    expect(typeof anim.revert).toBe('function');
    expect(typeof anim.reset).toBe('function');
    expect(typeof anim.seek).toBe('function');
    expect(typeof anim.stretch).toBe('function');
    expect(typeof anim.then).toBe('function');
  });

  it('should support playbackEase', () => {
    const el = document.createElement('div') as HTMLElement;
    const anim = Anim233.animate({ 
      targets: el, 
      duration: 500,
      playbackEase: 'easeInOutQuad'
    });
    expect(anim).toBeDefined();
  });

  it('should support frameRate', () => {
    const el = document.createElement('div') as HTMLElement;
    const anim = Anim233.animate({ 
      targets: el, 
      duration: 500,
      frameRate: 30
    });
    expect(anim).toBeDefined();
  });

  it('should support loop', () => {
    const el = document.createElement('div') as HTMLElement;
    const anim = Anim233.animate({ 
      targets: el, 
      duration: 100,
      loop: 3
    });
    expect(anim).toBeDefined();
  });

  it('should support alternate', () => {
    const el = document.createElement('div') as HTMLElement;
    const anim = Anim233.animate({ 
      targets: el, 
      duration: 100,
      alternate: true
    });
    expect(anim).toBeDefined();
  });

  it('should support reversed', () => {
    const el = document.createElement('div') as HTMLElement;
    const anim = Anim233.animate({ 
      targets: el, 
      duration: 100,
      reversed: true
    });
    expect(anim).toBeDefined();
  });
});

describe('VirtualList', () => {
  it('should create virtual list instance', () => {
    const container = document.createElement('div') as HTMLElement;
    const vl = createVirtualList({
      container,
      items: Array.from({ length: 100 }, (_, i) => ({ id: i, text: `Item ${i}` })),
      itemHeight: 50,
      renderItem: (item: any) => {
        const el = document.createElement('div');
        el.textContent = item.text;
        return el;
      }
    });
    expect(vl).toBeDefined();
    expect(typeof vl.setItems).toBe('function');
    expect(typeof vl.scrollToIndex).toBe('function');
    expect(typeof vl.scrollToTop).toBe('function');
    expect(typeof vl.refresh).toBe('function');
    expect(typeof vl.destroy).toBe('function');
  });

  it('should have correct properties', () => {
    const container = document.createElement('div') as HTMLElement;
    const items = Array.from({ length: 100 }, (_, i) => ({ id: i, text: `Item ${i}` }));
    const vl = createVirtualList({
      container,
      items,
      itemHeight: 50,
      renderItem: (item: any) => {
        const el = document.createElement('div');
        el.textContent = item.text;
        return el;
      }
    });
    expect(vl.startIndex).toBeGreaterThanOrEqual(0);
    expect(vl.endIndex).toBeGreaterThanOrEqual(vl.startIndex);
    expect(vl.visibleItems.length).toBeGreaterThan(0);
  });

  it('should setItems correctly', () => {
    const container = document.createElement('div') as HTMLElement;
    const vl = createVirtualList({
      container,
      items: [1, 2, 3],
      itemHeight: 50,
      renderItem: (item: any) => {
        const el = document.createElement('div');
        el.textContent = String(item);
        return el;
      }
    });
    vl.setItems([4, 5, 6, 7, 8]);
    expect(vl.visibleItems.length).toBeGreaterThan(0);
  });

  it('should support dynamic item heights', () => {
    const container = document.createElement('div') as HTMLElement;
    const vl = createVirtualList({
      container,
      items: [1, 2, 3],
      itemHeight: (item: any, index: number) => index === 0 ? 100 : 50,
      renderItem: (item: any) => {
        const el = document.createElement('div');
        el.textContent = String(item);
        return el;
      }
    });
    expect(vl).toBeDefined();
  });

  it('should call onScroll callback', () => {
    const container = document.createElement('div') as HTMLElement;
    const onScroll = vi.fn();
    const vl = createVirtualList({
      container,
      items: Array.from({ length: 100 }, (_, i) => i),
      itemHeight: 50,
      renderItem: (item: any) => {
        const el = document.createElement('div');
        el.textContent = String(item);
        return el;
      },
      onScroll
    });
    expect(vl).toBeDefined();
  });

  it('should destroy correctly', () => {
    const container = document.createElement('div') as HTMLElement;
    const vl = createVirtualList({
      container,
      items: [1, 2, 3],
      itemHeight: 50,
      renderItem: (item: any) => {
        const el = document.createElement('div');
        el.textContent = String(item);
        return el;
      }
    });
    expect(() => vl.destroy()).not.toThrow();
  });
});

describe('ListAnimation', () => {
  it('should create list animation instance', () => {
    const container = document.createElement('div') as HTMLElement;
    const la = createListAnimation({
      container,
      duration: 400,
      ease: 'easeOutCubic'
    });
    expect(la).toBeDefined();
    expect(typeof la.add).toBe('function');
    expect(typeof la.remove).toBe('function');
    expect(typeof la.reorder).toBe('function');
    expect(typeof la.animate).toBe('function');
    expect(typeof la.revert).toBe('function');
  });

  it('should have items property', () => {
    const container = document.createElement('div') as HTMLElement;
    const child1 = document.createElement('div');
    const child2 = document.createElement('div');
    container.appendChild(child1);
    container.appendChild(child2);
    
    const la = createListAnimation({ container });
    expect(la.items.length).toBe(2);
  });

  it('should add items', () => {
    const container = document.createElement('div') as HTMLElement;
    const la = createListAnimation({ container });
    
    const newItem = document.createElement('div');
    newItem.textContent = 'New Item';
    const anims = la.add([newItem]);
    expect(anims.length).toBeGreaterThan(0);
    expect(la.items.length).toBe(1);
  });

  it('should remove items', () => {
    const container = document.createElement('div') as HTMLElement;
    const child = document.createElement('div');
    container.appendChild(child);
    
    const la = createListAnimation({ container });
    const anims = la.remove([child]);
    expect(anims.length).toBeGreaterThan(0);
  });

  it('should support stagger', () => {
    const container = document.createElement('div') as HTMLElement;
    const la = createListAnimation({
      container,
      stagger: 50
    });
    expect(la).toBeDefined();
  });

  it('should support custom enterFrom and leaveTo', () => {
    const container = document.createElement('div') as HTMLElement;
    const la = createListAnimation({
      container,
      enterFrom: { opacity: 0, scale: 0.8 },
      leaveTo: { opacity: 0, scale: 1.2 }
    });
    expect(la).toBeDefined();
  });

  it('should revert correctly', () => {
    const container = document.createElement('div') as HTMLElement;
    const la = createListAnimation({ container });
    expect(() => la.revert()).not.toThrow();
  });
});

describe('Anim233 API - Virtual List & List Animation', () => {
  it('should have virtualList method', () => {
    expect(typeof Anim233.virtualList).toBe('function');
  });

  it('should have listAnimation method', () => {
    expect(typeof Anim233.listAnimation).toBe('function');
  });
});