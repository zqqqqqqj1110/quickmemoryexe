let pathValue = ''; // 初始值为空字符串
let FontValue = '';
let AccountValue = '';
let PassValue = '';

// txt文件名字
export const setPath = (value) => {
  pathValue = value;
};

export const getPath = () => pathValue;


// 字体文件名字
export const setFont = (value) => {
  FontValue = value;
};

export const getFont = () => FontValue;


// 账号密码
export const setAccount = (value) => {
  AccountValue = value;
};

export const getAccount = () => AccountValue;

export const setPass = (value) => {
  PassValue = value;
};

export const getPass = () => PassValue;