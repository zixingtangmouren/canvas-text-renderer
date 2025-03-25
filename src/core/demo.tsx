import React, { useEffect, useRef } from 'react';
import { createCancvasTextRenderer } from './index';

function Demo() {
  const divRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const renderer = useRef<any>(null);

  useEffect(() => {
    renderer.current = createCancvasTextRenderer(divRef.current as HTMLElement);
  }, []);

  const onRender = () => {
    const text = textRef.current?.value;
    if (!text) {
      return;
    }
    renderer.current.render(text);
  };

  return (
    <div>
      <textarea ref={textRef} />
      <button type="button" onClick={onRender}>
        渲染内容
      </button>
      <button type="button">下载图片</button>
      <div ref={divRef}></div>
    </div>
  );
}

export default Demo;
