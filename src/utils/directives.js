export default (Vue) => {
    const handler = (e) => {
        e.preventDefault();
    }
    Vue.directive('roll', {
        componentUpdated(el, binding) {
            let isShow = binding.value;
            if (isShow) {
                document.getElementsByTagName('body')[0].addEventListener('touchmove', handler, {passive: false})
            } else {
                document.getElementsByTagName('body')[0].removeEventListener('touchmove', handler, {passive: false})
            }
        }
    })
}