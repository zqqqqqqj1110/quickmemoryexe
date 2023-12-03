// setStyle.js

export const setStyle = (fontPath) => {
    // 创建一个 style 元素
    const styleElement = document.createElement('style');
  
    // 设置 style 元素的内容，包括 @font-face 规则
    styleElement.innerHTML = `
      @font-face {
        font-family: 'CustomFont';
        src: url(${fontPath});
        font-weight: normal;
        font-style: normal;
      }
      :root {
        --custom-font: 'CustomFont';
      }
    `;
  
    // 将 style 元素插入到 head 中
    document.head.appendChild(styleElement);
  
    // 设置字体路径变量
    document.documentElement.style.setProperty('--custom-font', 'CustomFont');
  };
  