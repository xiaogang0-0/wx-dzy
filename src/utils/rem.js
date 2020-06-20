/**
 * window     window窗口对象
 * pageSize   设计稿网页宽度
 * fontSize   初始字体大小
 */

var pageSize = 750;
var fontSize = 100;

!function(window, pageSize, fontSize) {
    var document = window.document, //文档对象
        html     = document.documentElement, //获取html元素
        event    = ('onorientationchange' in window) ? 'orientationchange' : 'resize', //判断是屏幕旋转还是resize;
        realw    = pageSize / fontSize,
        timer    = null;

    function refreshRem() {
        var clientWidth = html.clientWidth || 320;
        //设置html的fontSize，随着event的改变而改变。
        html.style.fontSize = clientWidth / realw + 'px';
    };

    window.addEventListener(event, function() {
        clearTimeout(timer);
        timer = setTimeout(refreshRem, 300);
    }, false);

    /*
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) { //缓存中读取
            clearTimeout(timer);
            timer = setTimeout(refreshRem, 300);
        }
    }, false);
    */

    refreshRem();
    document.addEventListener("DOMContentLoaded", refreshRem, false);
}(window, pageSize, fontSize);
