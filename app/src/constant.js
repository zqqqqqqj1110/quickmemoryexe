let pathValue = ''; // 初始值为空字符串
let FontValue = '';
let AccountValue = '';
let PassValue = '';
let classifyValue = '';
let ls_adminValue = '';

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

//机构类型
export const setclassify = (value) => {
  classifyValue = value;
};

export const getclassify = () => classifyValue;

// 是否为管理员
export const setls_admin = (value) => {
  ls_adminValue = value;
};

export const getls_admin = () => ls_adminValue;