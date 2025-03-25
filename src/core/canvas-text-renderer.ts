import { CreateCancvasTextRendererOptions } from './types';
import { generateSegments, lineBreak, pageBreak } from './utils';

export class CanvasTextRenderer {
  private dom: HTMLElement;
  private options: CreateCancvasTextRendererOptions;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private segments: string[] = [];
  private lines: string[] = [];
  private pages: string[][] = [];
  private curentPageIndex = 0;

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

    // 绘制文本
    this.drawText();
  }

  public nextPage() {
    if (this.curentPageIndex < this.pages.length - 1) {
      this.curentPageIndex++;
      this.drawText();
    }
  }

  public prevPage() {
    if (this.curentPageIndex > 0) {
      this.curentPageIndex--;
      this.drawText();
    }
  }

  public unmount() {
    this.dom.removeChild(this.canvas);
    this.ctx = null;
    this.segments = [];
    this.lines = [];
    this.pages = [];
    this.curentPageIndex = 0;
  }

  public downloadCurrentPage() {
    const link = document.createElement('a');
    link.download = 'text.png';
    link.href = this.canvas.toDataURL();
    link.click();
  }

  public downloadAll() {
    const link = document.createElement('a');
    link.download = 'text.png';
    link.href = this.canvas.toDataURL();
    link.click();
  }

  private createCavnas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.options.width;
    canvas.height = this.options.height;
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

  private computedContent(text: string) {
    const { height, padding, lineHeight, width } = this.options;

    const segments = generateSegments(text);

    const maxWidth = width - padding.left - padding.right;
    const lines = lineBreak(segments, {
      maxWidth,
      measureText: (text) => {
        return this.ctx?.measureText(text) || { width: 0 };
      },
    });

    const contentHeight = height - padding.top - padding.bottom;

    const pages = pageBreak(lines, {
      lineHeight,
      contentHeight,
    });

    this.segments = segments;
    this.lines = lines;
    this.pages = pages;
    this.curentPageIndex = 0;
  }

  private drawText() {
    const { ctx, options, curentPageIndex } = this;
    const { backgroundColor, textColor, padding } = options;
    const currentPage = this.pages[curentPageIndex];

    if (!ctx || !currentPage) {
      return;
    }

    // 清空画布
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 绘制背景
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 绘制文本
    ctx.fillStyle = textColor;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    currentPage.forEach((line, index) => {
      const x = padding.left;
      let y = index * options.lineHeight + padding.top;

      ctx.fillText(line, x, y);
    });
  }
}
