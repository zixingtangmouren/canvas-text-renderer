import React, { useEffect, useRef } from 'react';
import { CanvasTextRenderer, createCancvasTextRenderer } from './index';

function Demo() {
  const divRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const renderer = useRef<CanvasTextRenderer>();

  useEffect(() => {
    renderer.current = createCancvasTextRenderer(
      divRef.current as HTMLElement,
      {
        width: 400,
        height: 300,
        fontSize: 16,
        lineHeight: 24,
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        },
      },
    );

    return () => {
      renderer.current?.unmount();
    };
  }, []);

  const onRender = () => {
    const text = textRef.current?.value;
    if (!text) {
      return;
    }
    renderer.current?.render(text);
  };

  const nextPage = () => {
    renderer.current?.nextPage();
  };

  const prevPage = () => {
    renderer.current?.prevPage();
  };

  const download = () => {
    renderer.current?.downloadCurrentPage();
  };

  return (
    <div>
      <textarea
        style={{ width: 300, height: 120 }}
        ref={textRef}
        placeholder="请输入你需要渲染的内容"
      />

      <div>
        <button type="button" onClick={onRender}>
          渲染内容
        </button>
        <button type="button" onClick={download}>
          下载图片
        </button>
        <button type="button" onClick={prevPage}>
          上一页
        </button>
        <button type="button" onClick={nextPage}>
          下一页
        </button>
      </div>
      <br />
      <div
        ref={divRef}
        style={{
          border: '1px solid #000',
        }}
      ></div>
    </div>
  );
}

export default Demo;
