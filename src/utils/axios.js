/**
 * axios
 *
 * https://github.com/mzabriskie/axios
 */
import axios from 'axios';
import qs from 'qs';
import {
    util
} from '@/utils';

// 运行环境
const env = process.env.NODE_ENV === 'development' ?
    'development' :
    process.env.VUE_APP_MODE === 'test' ? 'test' :
    process.env.VUE_APP_MODE === 'demo' ? 'demo' :
    'production';

console.log(env,'运行环境env{production:线上;test:测试;development:本地;}')
// 线上测试&线上正式环境   
// const baseURL = env === 'production' ? 'http://192.168.15.61:8899/dzy' : (env === 'test' ? 'http://192.168.15.61:8899/dzy' : 'http://192.168.15.61:8899/dzy');
const baseURL = env === 'production' ? 'http://es.hlwl.com:20000/dzy' : (env === 'test' ? 'http://es.hlwl.com:20000/dzy' : 'http://es.hlwl.com:20000/dzy'); 

// 创建实例
const instance = axios.create({
    // #production
    baseURL,

    // #local
    // baseURL: 'http://localhost:3003/mock',
    // baseURL: 'http://wechattest.tunnel.aitifen.cn/',
    timeout: 30000
});

// 发送请求允许携带 cookie
instance.defaults.withCredentials = true;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截
instance.interceptors.request.use(config => {
    // 格式化Post数据
    // if (config.method == 'post') {
        // config.data = qs.stringify(config.data);
    // }

    // 统一携带tooken
    if(util.getCookie('biw_token')){
        config.headers =  {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + util.getCookie('biw_token')
        };
    }
    return config
}, error => {
    util.error('服务器错误！！！');
    return Promise.reject(error);
})


// 响应拦截
instance.interceptors.response.use(response => {
    let {
        data
    } = response;

    if (response.status == 404) {
        this.$router.push('/err-404');
    } else if (response.status == 500) {
        util.error('服务器开小差了，请稍后再试');
        this.$router.push('/err-500');
    } else if (data.code == 1001 || data.code == 1002) { // 退出登录
        if (env == 'test') {
            window.location.href = `${baseURL}/wechat/weChatAuthorization?name=atfStu`;
        } else if (env == 'demo') {
            window.location.href = `${baseURL}/wechat/weChatAuthorization?name=atfStu`;
        } else {
            window.location.href = `${baseURL}/wechat/weChatAuthorization?name=atfStu`;
        }
    } else if ( data.code && data.code != 200) { // 非0则提示错误信息
        util.error(data.message ? data.message : data.msg);
        // util.error('获取数据失败，请重新再试！');
    }
    return data;
}, error => {
    // console.log(error.response.data)
    if (error.response.data.status == 401) {
        util.error('登录过期请重新登录');
        vm.$router.push({name: 'login'})
        return
    }
    if (error.response.data.status == 417) {
        util.error(error.response.data.msg);
        return
    }
    if (error.response.data.status == 500) {
        if(error.response.data.msg){
            util.error(error.response.data.msg);
        }else if(error.response.data.message){
            util.error(error.response.data.message);
        }
        return
    }
    if (error.toString().search('timeout')) {
        // util.error('请求超时！');
        util.error(error.response.data.msg);
    }
    return Promise.reject(error);
});

export default instance;
