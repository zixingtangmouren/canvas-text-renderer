import { defineConfig } from 'father';

const ignores = ['src/**/demo.tsx'];

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { output: 'dist/es', ignores },
  cjs: { output: 'dist/cjs', ignores },
  umd: {
    name: 'CanvasTextRenderer',
    output: 'dist/umd',
    externals: {
      react: 'React',
    },
  },
});
