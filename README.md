# Anim233

[![npm version](https://img.shields.io/npm/v/anim233-ts.svg)](https://www.npmjs.com/package/anim233-ts)
[![license](https://img.shields.io/npm/l/anim233-ts.svg)](https://github.com/neko233-com/anim233-ts/blob/main/LICENSE)

增强版 anime.js v4 + DOTween 风格链式 API + Shader 支持

## Features

- 🎯 **DOTween 风格** - 链式 API，类似 Unity DOTween Pro
- 🎨 **完整 anime.js v4** - 支持所有动画功能
- 🖥️ **ShaderAnim233** - 原生 WebGL Shader 动画
- 🚀 **高性能** - 优化的动画引擎
- 🔌 **Agent First** - 为 AI 辅助开发设计
- 📱 **双模式** - 支持 ES Modules 和 script 标签

## Installation

### npm

```bash
npm install anim233-ts
```

### CDN

```html
<script src="https://unpkg.com/anim233-ts/dist/index.min.js"></script>
```

## Quick Start

### DOTween 风格链式动画

```typescript
import { tween } from 'anim233-ts';

// 链式动画 - 类似 Unity DOTween
tween('.box')
  .to({ x: 100, y: 50 }, 500, 'easeOutCubic')
  .to({ scale: 1.5, rotate: 45 }, 300, 'easeInOutQuad')
  .delay(100)
  .loop(2)
  .yoyo(true)
  .onComplete(() => console.log('Done!'))
  .play();
```

### anime.js 风格

```typescript
import { Anim233 } from 'anim233-ts';

Anim233.animate('.box', {
  x: 100,
  opacity: 0.5
}, {
  duration: 1000,
  easing: 'easeInOutQuad'
});
```

### Shader 动画

```typescript
import { createShaderAnim233 } from 'anim233-ts';

const shader = createShaderAnim233({
  target: document.getElementById('canvas'),
  fragment: `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution;
      float color = sin(uv.x * 10.0 + time) * 0.5 + 0.5;
      gl_FragColor = vec4(color, uv.y, sin(time * 0.5), 1.0);
    }
  `
});
shader.play();
```

## API

### Tween (DOTween Style)

```typescript
tween(target)
  .to(properties, duration, easing)
  .from(properties, duration, easing)
  .fromTo(fromProps, toProps, duration, easing)
  .set(properties)
  .delay(ms)
  .loop(count)
  .yoyo(enable)
  .play()
  .pause()
  .resume()
  .restart()
  .reverse()
  .kill()
  .onBegin(callback)
  .onComplete(callback)
  .onUpdate(callback)
  .onLoop(callback)
```

### Animation

```typescript
Anim233.animate(targets, properties, options)
```

### Timeline

```typescript
Anim233.timeline(options)
  .add(animation, timeOffset)
  .set(properties, timeOffset)
  .call(callback, timeOffset)
  .play()
  .pause()
```

### Utilities

```typescript
// 数学工具
Anim233.random(min, max)
Anim233.clamp(value, min, max)
Anim233.lerp(start, end, t)
Anim233.snap(value, grid)
Anim233.wrap(value, min, max)
Anim233.mapRange(value, inMin, inMax, outMin, outMax)
Anim233.degToRad(deg)
Anim233.radToDeg(rad)

// 列表工具
Anim233.stagger(value, options)
Anim233.randomPick(array)
Anim233.shuffle(array)

// 时间工具
Anim233.wait(ms)
```

### Easings

```typescript
// 获取所有可用缓动函数
Anim233.listEasings()

// 注册自定义缓动
Anim233.registerEasing('myEasing', (t) => t * t * t);
```

### ShaderAnim233

```typescript
const shader = Anim233.createShaderAnim233({
  target: canvasElement,
  vertex: vertexShaderSource,
  fragment: fragmentShaderSource,
  uniforms: { speed: 1.0 }
});

shader.play();
shader.pause();
shader.setUniform('speed', 2.0);
shader.setFragmentShader(newSource);
shader.resize(800, 600);
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Apache-2.0