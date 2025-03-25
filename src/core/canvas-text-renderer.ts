import { CreateCancvasTextRendererOptions } from './types';
import { generateSegments, lineBreak, pageBreak } from './utils';

export default class CanvasTextRenderer {
  private dom: HTMLElement;
  private options: CreateCancvasTextRendererOptions;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private segments: string[] = [];
  private lines: string[] = [];
  private pages: string[][] = [];

  constructor(dom: HTMLElement, options: CreateCancvasTextRendererOptions) {
    this.dom = dom;
    this.options = options || {};

    const { canvas, ctx } = this.createCavnas();
    this.canvas = canvas;
    this.ctx = ctx;
  }

  public render(text: string) {
    // 计算文本内容
    this.computedContent(text);

    // 绘制文本 TODO:分页
    console.log(this.pages);
  }

  private computedContent(text: string) {
    const { height, padding, lineHeight, fontSize } = this.options;

    const segments = generateSegments(text);

    const lines = lineBreak(segments, {
      maxWidth: this.options.width || 100,
      measureText: (text) => {
        return this.ctx?.measureText(text) || { width: 0 };
      },
    });

    const contentHeight = height - padding.top - padding.bottom;

    const pages = pageBreak(lines, {
      lineHeight: lineHeight * fontSize,
      contentHeight: contentHeight,
    });

    this.segments = segments;
    this.lines = lines;
    this.pages = pages;
  }

  public unmount() {
    this.dom.removeChild(this.canvas);
    this.ctx = null;
    this.segments = [];
    this.lines = [];
    this.pages = [];
  }

  private createCavnas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.options.width || 100;
    canvas.height = this.options.height || 100;
    const dpi = window.devicePixelRatio || 1;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
    canvas.width *= dpi;
    canvas.height *= dpi;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpi, dpi);
    ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;
    // TODO: 这里需要考虑 dom 节点的位置，比如 dom 节点是绝对定位的，那么 canvas 节点需要相对于 dom 节点定位
    this.dom.appendChild(canvas);

    return { canvas, ctx };
  }
}
