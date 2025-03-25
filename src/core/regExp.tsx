// 分割中文、连续英文数字、其他字符
export const splitRegExp = /([\u4e00-\u9fa5]|[\w\d]+|.)/gim;

// 中文
export const CJKRegExp = /[\u4e00-\u9fa5]/;

// 中文符号
export const punctuationRegExp = /[\u3000-\u303F\uff00-\uffef]/;
