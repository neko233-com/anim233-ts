import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Anim233',
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'min'}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        globals: {}
      }
    },
    minify: 'terser',
    sourcemap: true
  }
});