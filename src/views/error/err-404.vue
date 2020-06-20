<template>
    <div class="err-404">
        <img src="../../assets/images/error/404.png" alt="404">
        <div class="gohome">
            <router-link to="/home">返回首页</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'err-404',
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/base/calc_vm.scss";
@import "./err-404.scss";
</style>

