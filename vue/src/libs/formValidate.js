import Validate from './validate'
export default {
  mobile (rule, value, callback) {
    if (value === "") {
      callback(new Error("请输入手机号码"));
    } else {
      if (Validate.isMobile(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号码"));
      }
    }
  },
  ID (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入身份证号码'))
    }
    if (Validate.isIdCard(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的二代身份证号码'))
    }
  },
  password () {
    if (!value) {
      return callback(new Error('请输入密码'))
    }
    if (value.length >= 6) {
      callback()
    } else {
      callback(new Error('请输入6位以上密码'))
    }
  }
}