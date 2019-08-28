const Joi = require('joi');

const zhCN = {
  string: {
    min: '至少 {{limit}} 个字符',
    max: '至多 {{limit}} 个字符',
    regex: {
      base: '({{!value}}) 格式不匹配 {{pattern}}',
      name: '({{!value}}) 格式不匹配 "{{name}}" 的格式'
    },
    length: '长度必须为 {{limit}} 个字符',
    email: '格式不合法'
  },
  number: {
    base: '必须为数字'
  }
};

module.exports = function validate(...args) {
  return new Promise((resolve, reject) => Joi.validate(...args, {
    language: zhCN
  }, (err, val) => {
    if (err) return reject(err);

    return resolve(val);
  }));
};
