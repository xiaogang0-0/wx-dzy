<template>
    <div class="err-500">
        <img src="../../assets/images/error/500.png" alt="500">
        <div class="gohome">
            <router-link to="/home">返回首页</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'err-500',
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/base/calc_vm.scss";
@import "./err-500.scss";
</style>