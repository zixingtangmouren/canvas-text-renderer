# 指引

一个高性能的文本渲染库，可以将文本内容渲染到 Canvas 画布上，支持分页、自动换行等功能。

## 特性

- 🚀 高性能：基于 Canvas 渲染，性能优异
- 📝 自动换行：智能处理文本换行
- 📖 分页支持：自动将长文本分页展示
- 🎨 样式可配：支持自定义字体、颜色、行高等样式
- 📱 响应式：支持高 DPI 屏幕

## 安装

```bash
npm install canvas-text-renderer
# 或者
yarn add canvas-text-renderer
# 或者
pnpm add canvas-text-renderer
```

## 使用示例

```typescript
import { CanvasTextRenderer } from 'canvas-text-renderer';

// 创建渲染器实例
const container = document.getElementById('container');
const renderer = new CanvasTextRenderer(container, {
  width: 800,
  height: 600,
  padding: { top: 20, right: 20, bottom: 20, left: 20 },
  fontSize: 16,
  fontFamily: 'Arial',
  lineHeight: 24,
  backgroundColor: '#ffffff',
  textColor: '#000000',
});

// 渲染文本
renderer.render('你的文本内容');

// 翻页操作
renderer.nextPage(); // 下一页
renderer.prevPage(); // 上一页

// 导出功能
renderer.downloadCurrentPage(); // 下载当前页
renderer.downloadAll(); // 下载所有页面

// 清理资源
renderer.unmount();
```

## API 文档

### CanvasTextRenderer

#### 构造函数

```typescript
new CanvasTextRenderer(container: HTMLElement, options: CreateCancvasTextRendererOptions)
```

#### 配置项

```typescript
interface CreateCancvasTextRendererOptions {
  width: number; // 画布宽度
  height: number; // 画布高度
  padding: {
    // 内边距
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  fontSize: number; // 字体大小
  fontFamily: string; // 字体族
  lineHeight: number; // 行高
  backgroundColor: string; // 背景色
  textColor: string; // 文字颜色
}
```

#### 方法

- `render(text: string): void` - 渲染文本内容
- `nextPage(): void` - 切换到下一页
- `prevPage(): void` - 切换到上一页
- `downloadCurrentPage(): void` - 下载当前页面为图片
- `downloadAll(): void` - 下载所有页面为图片
- `unmount(): void` - 清理资源

## License

MIT
