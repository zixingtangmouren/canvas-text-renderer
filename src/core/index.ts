import { CanvasTextRenderer } from './canvas-text-renderer';
import { CreateCancvasTextRendererOptions } from './types';

export const createCancvasTextRenderer = (
  dom: HTMLElement,
  options?: Partial<CreateCancvasTextRendererOptions>,
) => {
  if (!dom) {
    return;
  }

  const defaultOptions: CreateCancvasTextRendererOptions = {
    width: 400,
    height: 300,
    fontSize: 16,
    fontFamily: 'sans-serif',
    lineHeight: 24,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    textColor: '#000',
    backgroundColor: '#fff',
  };

  const _options = Object.assign(defaultOptions, options);

  return new CanvasTextRenderer(dom, _options);
};

export * from './canvas-text-renderer';
export * from './types';
export * from './utils';
