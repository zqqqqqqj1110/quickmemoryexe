let pathValue = ''; // 初始值为空字符串
let FontValue = '';

export const setPath = (value) => {
  pathValue = value;
};

export const getPath = () => pathValue;

export const setFont = (value) => {
  FontValue = value;
};

export const getFont = () => FontValue;