# Anim233

[![npm version](https://img.shields.io/npm/v/anim233-ts.svg)](https://www.npmjs.com/package/anim233-ts)
[![license](https://img.shields.io/npm/l/anim233-ts.svg)](https://github.com/neko233-com/anim233-ts/blob/main/LICENSE)

neko233-com 编写, 其目的是增强版的 anime.js ，提供更多更加现代化的动画，且绝对傻瓜式 + agent first 的动画库

## Features

- 🎨 **Modern Animations** - CSS transforms, colors, SVG, and more
- 🚀 **TypeScript Native** - Full type safety and IntelliSense
- 📦 **Lightweight** - Small bundle size with tree-shaking
- 🔌 **Extensible** - Plugin system for custom easings and properties
- 🎯 **Agent First** - Designed for AI-assisted development
- 🌐 **CDN Ready** - Works with unpkg, jsDelivr, and cdnjs
- 🖥️ **WebGL Shader Support** - Create custom shader animations
- 📱 **Dual Mode** - Supports both ES modules and script tags

## Installation

### npm (Recommended)

```bash
npm install anim233-ts
```

### CDN (No Build Required)

```html
<script src="https://unpkg.com/anim233-ts/dist/index.min.js"></script>
```

## Quick Start

### TypeScript / ES Modules

```typescript
import { Anim233 } from 'anim233-ts';

// Basic animation
Anim233.animate('.box', {
  translateX: 100,
  opacity: 0.5
}, {
  duration: 1000,
  easing: 'easeInOutQuad'
});
```

### HTML (No Build Required)

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/anim233-ts/dist/index.min.js"></script>
</head>
<body>
  <div class="box">Hello</div>
  <script>
    Anim233.animate('.box', {
      translateX: 100,
      opacity: 0.5
    }, {
      duration: 1000,
      easing: 'easeInOutQuad'
    });
  </script>
</body>
</html>
```

## API

### Core Functions

#### `Anim233.animate(targets, properties, options)`

Creates and returns an animation instance.

**Parameters:**
- `targets`: CSS selector string, HTMLElement, or array of elements
- `properties`: Object with target property values
- `options`: Animation configuration object

**Options:**
- `duration`: Animation duration in ms (default: 1000)
- `easing`: Easing function or name (default: 'easeInOutQuad')
- `delay`: Delay before animation starts in ms (default: 0)
- `loop`: Number of times to loop or `true` for infinite (default: false)
- `direction`: 'normal', 'reverse', or 'alternate' (default: 'normal')
- `onUpdate`: Callback function called on each frame
- `onComplete`: Callback function called when animation completes
- `debug`: Enable debug logging (default: false)

#### `Anim233.timeline()`

Creates a timeline for sequencing animations.

```typescript
const tl = Anim233.timeline();
tl.add(() => Anim233.animate('.box1', { x: 100 }), 0);
tl.add(() => Anim233.animate('.box2', { x: 200 }), 500);
tl.play();
```

#### `Anim233.createShader(options)`

Creates a WebGL shader animation.

```typescript
const shader = Anim233.createShader({
  target: document.getElementById('canvas'),
  fragment: `
    precision mediump float;
    uniform float time;
    void main() {
      gl_FragColor = vec4(sin(time), cos(time), 0.5, 1.0);
    }
  `
});
shader.play();
```

### Animation Instance Methods

- `play()`: Start or resume animation
- `pause()`: Pause animation
- `reverse()`: Reverse animation direction
- `restart()`: Restart animation from beginning
- `seek(time)`: Seek to specific time in ms
- `destroy()`: Clean up animation resources

**Properties:**
- `isPlaying`: Boolean indicating if animation is playing
- `progress`: Current progress (0-1)
- `currentTime`: Current time in ms

### Utility Functions

#### `Anim233.wait(ms)`

Returns a promise that resolves after specified milliseconds.

```typescript
await Anim233.wait(1000);
console.log('1 second passed');
```

#### `Anim233.stagger(items, delay)`

Executes items with a stagger delay.

```typescript
Anim233.stagger([
  () => Anim233.animate('.box1', { x: 100 }),
  () => Anim233.animate('.box2', { x: 100 }),
  () => Anim233.animate('.box3', { x: 100 })
], 100); // 100ms between each
```

#### `Anim233.spring(options)`

Creates a spring physics simulation.

```typescript
const spring = Anim233.spring({
  target: 100,
  stiffness: 0.1,
  damping: 0.8
});

function update() {
  const value = spring.update();
  element.style.transform = `translateX(${value}px)`;
  requestAnimationFrame(update);
}
update();
```

### Easing Functions

- `linear`
- `easeInQuad`, `easeOutQuad`, `easeInOutQuad`
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic`
- `easeInExpo`, `easeOutExpo`, `easeInOutExpo`

### Custom Easings

```typescript
Anim233.registerEasing('myEasing', (t) => t * t * t);

Anim233.animate('.box', {
  x: 100
}, {
  duration: 1000,
  easing: 'myEasing'
});
```

## Agent-First Features

Anim233 is designed for AI-assisted development:

### Debug Mode

```typescript
Anim233.setDebug(true); // Enable debug logging
```

### Introspection

```typescript
const instance = Anim233.animate('.box', { x: 100 });
console.log(instance.progress); // 0-1
console.log(instance.currentTime); // ms
console.log(instance.isPlaying); // boolean
```

### List Available Easings

```typescript
console.log(Anim233.listEasings());
// ['linear', 'easeInQuad', 'easeOutQuad', ...]
```

## Shader Example

```html
<canvas id="canvas" width="400" height="400"></canvas>
<script>
  const shader = Anim233.createShader({
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
</script>
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

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [anime.js](https://github.com/juliangarnier/anime)
- Built with TypeScript and modern web APIs