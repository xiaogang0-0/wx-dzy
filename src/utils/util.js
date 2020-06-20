import {
    Toast,
    Notify,
} from 'vant';
import moment from 'moment';

/**
 * 工具
 * @type {Object}
 */
let util = {};

/**
 * 引用moment对象
 * @type {moment | ((inp?: moment.MomentInput, format?: moment.M omentFormatSpecification, language?: string, strict?: boolean) => moment.Moment) | ((inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean) => moment.Moment)}
 */

/**
 * 设置文档标题
 * @param {String} 标题
 */
util.setTitle = function (title = '') {
    document.title = title;
}

/**
 * 显示全局loading
 */
util.showLoading = function (message = '加载中...') {
    Toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, // 遮罩层显示
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: message
    });
}

/**
 * 隐藏全局loading
 */
util.hideLoading = function () {
    Toast.clear();
}

/**
 * 成功-提示信息
 * @param  {String} message  提示语
 * @param  {String} title    标题
 * @param  {Number} duration 自动关闭延时时间，单位豪秒
 */
util.success = function (message, duration = 2000) {
    Notify({
        message: message,
        duration,
        background: '#77deac'
    });
}

/**
 * 警告-提示信息
 * @param  {String} message  提示语
 * @param  {String} title    标题
 * @param  {Number} duration 自动关闭延时时间，单位豪秒
 */
util.warning = function (message, duration = 2000) {
    Notify({
        message: message,
        duration,
        background: '#ffb624'
    });
}

/**
 * 错误-提示信息
 * @param  {String} message  提示语
 * @param  {String} title    标题
 * @param  {Number} duration 自动关闭延时时间，单位秒
 */
util.error = function (message, duration = 2000) {
    Notify({
        message: message,
        duration,
        background: '#ff8e8e'
    });
}

util.info = function (message, duration = 2000) {
    Notify({
        message: message,
        duration,
        background: '#5996f8'
    });
}

/**
 * 从原始对象开始遍历，查找目标对象，如果有则覆盖原始对象中的值
 * 注：
 *   合并表单数据，后台返回的字段中可能存在多余的，这里只拷贝表单中存在的字段
 * @param  {Object} [origin={}] 原始对象
 * @param  {Object} [target={}] 目标对象
 * @return {Object}             原始对象
 */
util.merge = function (origin = {}, target = {}) {
    for (let p in origin) {
        if (target.hasOwnProperty(p)) {
            origin[p] = target[p]
        }
    }
    return origin
}

/**
 * 格式化日期字符串类型为日期对象
 * @param {Object} target 目标对象
 * @param {Array} props  要格式化的字段名称集合
 */
util.formatStringToDate = function (target, props) {
    if (!props || props.length === 0) return
    for (let i = 0, len = props.length; i < len; i++) {
        let prop = props[i]
        let val = target.hasOwnProperty(prop) ? target[prop] : null
        if (val && val != '') {
            target[prop] = new Date(val)
        }
    }
}

/**
 * 格式化日期对象为字符串
 * @param {Object} target 目标对象
 * @param {Array} props   要格式化的字段名称集合
 * @param {String} format [format='YYYY-MM-DD']
 */
util.formatDateToString = function (target, props, format = 'YYYY-MM-DD') {
    if (!props || props.length === 0) return
    for (let i = 0, len = props.length; i < len; i++) {
        let prop = props[i]
        let val = target.hasOwnProperty(prop) ? target[prop] : null
        if (val && val != '') {
            target[prop] = moment(val).format(format)
        }
    }
}

/**
 * 判断开始日期是否在结束日期之前（注：开始日期小于结束日期）
 * @param {String} start 开始日期
 * @param {String} end   结束日期
 */
util.checkDateIsBefore = function (start, end) {
    if (!start || !end) return false
    if (moment(start).isSame(end)) return false
    if (!moment(start).isBefore(end)) return true
    return false
}

/**
 * 验证邮箱
 * @param val
 * @returns {boolean}
 */
util.regEmail = function (val) {
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(val);
}

/**
 * 验证手机号
 * @param val
 * @returns {boolean}
 */
util.regMobile = function (val) {
    return /^1[0-9]{10}$/.test(val);
}

/**
 * 验证是否为数字（含小数）
 * @param value
 * @returns {boolean}
 */
util.regIsNumber = (value) => {
    return /^[0-9]+.?[0-9]*\d$/.test(value)
}

/**
 * 验证是否为数字（正数）
 * @param value
 * @returns {boolean}
 */
util.regIsInt = (value) => {
    return /^[\d]*$/.test(value)
}

/**
 * 判断一个数组是否包含另一个数组
 * @param arr1 原始数组
 * @param arr2 包含的数组
 * @returns {boolean}
 */
util.isContainedArray = function (arr1, arr2) {
    if (!(arr1 instanceof Array) || !(arr2 instanceof Array) || ((arr1.length < arr2.length))) {
        return false;
    }
    let arr1Str = arr1.toString();
    for (let i = 0, len = arr2.length; i < len; i++) {
        if (arr1Str.indexOf(arr2[i]) < 0) return false;
    }
    return true;
};

/**
 * 去除首部空格
 * @param str
 * @returns {*}
 */
util.ltrim = function (str) {
    if (!str) return false;
    return str.replace(/(^\s*)/g, '');
};

/**
 * 去除尾部空格
 * @param str
 * @returns {*}
 */
util.rtrim = function (str) {
    if (!str) return false;
    return str.replace(/(\s*$)/g, '');
};

/**
 * 去除首尾空格
 * @param str   字符串
 * @returns {*}
 */
util.trim = function (str) {
    if (!str) return false;
    return str.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * 去除首尾空格
 * @param cname  字符串
 * @param cvalue 字符串
 * @param exdays 字符串
 * @returns {*}
 */
util.setCookie = function(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

util.getCookie = function(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}
util.clearCookie = function(cname) {  
	util.setCookie(cname, "", -1);  
}  



const TokenKey = 'hlwl_token'

util.getToken = function() {
  return sessionStorage.getItem(TokenKey)
}

util.setToken = function (token) {
  return sessionStorage.setItem(TokenKey, token)
}

util.removeToken = function () {
  return sessionStorage.removeItem(TokenKey)
}

// util.delCookie = function(cname) {
// 	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT ;path=/hlwl_wexin";
// }
// util.delCookie_ = function(cname) {
// 	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT ;path=/hlwl_wexin/uploadInquiry";
// }


/**
 * DOM操作
 */
let dom = {
    // 获取元素
    $$: function (selector) {
        return typeof selector === 'string' ? document.querySelector(selector) : selector;
    },

    // 获取元素距离顶部距离
    offset: function (selector) {
        let el = this.$$(selector);
        let y = 0;
        let x = 0;
        do {
            x += el.offsetLeft;
            y += el.offsetTop;
        } while (el = el.offsetParent);
        return {x, y};
    },

    // 滚动到指定位置
    scrollTop(el, from = 0, to, duration = 500) {
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = (
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                }
            );
        }
        const difference = Math.abs(from - to);
        const step = Math.ceil(difference / duration * 50);

        function scroll(start, end, step) {
            if (start === end) return;

            let d = (start + step > end) ? end : start + step;
            if (start > end) {
                d = (start - step < end) ? end : start - step;
            }

            if (el === window) {
                window.scrollTo(d, d);
            } else {
                el.scrollTop = d;
            }
            window.requestAnimationFrame(() => scroll(d, end, step));
        }

        scroll(from, to, step);
    }
};

util.dom = dom;

export default util;
