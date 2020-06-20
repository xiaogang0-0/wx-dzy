import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import {directives} from './utils';
import wx from 'weixin-js-sdk';
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

import {   
  Button,   
  Field,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Tab,
  Tabs,
  List,
  Search,
  cell,
  PullRefresh,
  Dialog,
  Row, 
  Col,
  Picker,
  Swipe,
  SwipeItem,
  Icon,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Overlay,
  ShareSheet,
  Toast,
  Divider


} from 'vant';
 
Vue.use(Button);
Vue.use(Field);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Tab).use(Tabs);
Vue.use(List);
Vue.use(Search);
Vue.use(cell); 
Vue.use(PullRefresh); 
Vue.use(Dialog);
Vue.use(Row).use(Col);
Vue.use(Picker);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Overlay);
Vue.use(ShareSheet);
Vue.use(Toast);
Vue.use(Divider);



// 视频播放
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
// require('vue-video-player/node_modules/video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

// 瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

Vue.config.productionTip = false
Vue.use(directives);

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')