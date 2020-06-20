<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import { mapActions, mapGetters  } from 'vuex';
import '@/assets/fonts/iconfont.js'

export default {
    name: 'app',

    // methods : {
    //     ...mapActions([
    //         'getUserInfo'
    //     ])
    // },

    // created() {
    //     this.getUserInfo()
    // }
}
</script>

<style lang="scss">
    @import '@/assets/styles/app.scss';
</style>
