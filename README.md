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

## Installation

```bash
npm install anim233-ts
```

Or via CDN:

```html
<script src="https://unpkg.com/anim233-ts/dist/index.min.js"></script>
```

## Quick Start

```typescript
import { animate } from 'anim233-ts';

// Basic animation
animate('.box', {
  translateX: 100,
  opacity: 0.5
}, {
  duration: 1000,
  easing: 'easeInOutQuad'
});

// With options
animate(element, {
  scale: 1.5,
  rotate: '45deg'
}, {
  duration: 500,
  delay: 200,
  loop: true,
  direction: 'alternate'
});
```

## API

### `animate(targets, properties, options)`

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

### Animation Instance Methods

- `play()`: Start or resume animation
- `pause()`: Pause animation
- `reverse()`: Reverse animation direction
- `restart()`: Restart animation from beginning
- `seek(time)`: Seek to specific time in ms

## Easing Functions

- `linear`
- `easeInQuad`, `easeOutQuad`, `easeInOutQuad`
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic`
- `easeInExpo`, `easeOutExpo`, `easeInOutExpo`

## Custom Easings

```typescript
import { animate } from 'anim233-ts';

animate('.box', {
  x: 100
}, {
  duration: 1000,
  easing: (t) => t * t * t // Custom cubic easing
});
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