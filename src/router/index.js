import Vue from 'vue';
import Router from 'vue-router';
import Routes from './router.js';
import {util} from '@/utils';
import store from '@/store/index';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: Routes
});


let ONCE_FUNCTION = (to) => {

    /*处理ios配置路径问题（ios 微信配置需要第一次进入页面时的url）*/
    let FRONT_BASE = `${location.protocol}//${location.host}`;
    let url = FRONT_BASE + to.fullPath;
    store.commit('updatePath', url);


    ONCE_FUNCTION = function () {
        return false;
    }
}

router.beforeEach((to, from, next) => {
    util.setTitle(to.meta.title || '');
    next();
});

router.afterEach((to, from) => {
    document.documentElement.scrollTop = 0;

    ONCE_FUNCTION(to);
})

export default router;
