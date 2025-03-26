import { CJKRegExp, punctuationRegExp, splitRegExp } from './regExp';

interface GenerateSegmentsOptions {
  regExp: RegExp;
}

interface LineBreakOptions {
  maxWidth: number;
  // 自定义换行逻辑
  newlineRegExp?: RegExp;
  measureText: (text: string) => { width: number };
}

interface PageBreakOptions {
  lineHeight: number;
  contentHeight: number;
}

// 分词
export const generateSegments = (
  text: string,
  options?: GenerateSegmentsOptions,
) => {
  const regExp = options?.regExp || splitRegExp;
  const segments = text.split(regExp).filter((s) => s && s.trim());
  return segments;
};

// 分行
export const lineBreak = (
  segments: string[],
  { maxWidth, measureText, newlineRegExp }: LineBreakOptions,
) => {
  const lines = [];
  let currentLine = [];
  let currentWidth = 0;

  for (const segment of segments) {
    const isCJK = CJKRegExp.test(segment);
    const isPunctuation = punctuationRegExp.test(segment);
    const segmentWidth = measureText(segment).width;

    // 处理换行
    if (currentWidth + segmentWidth > maxWidth) {
      // TODO: 如果就是当前行的第一个分段，但是超出了怎么办？
      if (currentLine.length > 0) {
        lines.push(currentLine.join(''));
        currentLine = [];
        currentWidth = 0;
      }
    }

    // 英文数字追加空格
    if (!isCJK && !isPunctuation && currentLine.length > 0) {
      currentLine.push(' ');
      currentWidth += measureText(' ').width;
    }

    // 添加当前片段 TODO: 加了空格以后刚好超出了怎么办？
    currentLine.push(segment);
    currentWidth += segmentWidth;

    // 处理自定义换行逻辑
    if (newlineRegExp && newlineRegExp.test(segment)) {
      lines.push(currentLine.join(''));
      currentLine = [];
      currentWidth = 0;
      lines.push(' ');
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine.join(''));
  }

  return lines;
};

// 分页
export const pageBreak = (
  lines: string[],
  { lineHeight, contentHeight }: PageBreakOptions,
) => {
  const pages = [];
  let currentPage = [];
  let currentHeight = 0;

  for (const line of lines) {
    if (currentHeight + lineHeight > contentHeight) {
      pages.push(currentPage);
      currentPage = [];
      currentHeight = 0;
    }

    currentPage.push(line);
    currentHeight += lineHeight;
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages;
};
