<template>
    <div class="orderList">
        <van-tabs v-model="active"  @click="handleTabClick">
            <van-tab title="待报价">
                <toBeQuoted :active="0"></toBeQuoted>
            </van-tab>

            <van-tab title="已报价">
                <quotedPrice :active="1"></quotedPrice>
            </van-tab>

            <van-tab title="已完成 ">
                <completed :active="2"></completed>
            </van-tab>

            <van-tab title="已超时">
                <overtime :active="3"></overtime>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import * as Api from './api';
    // import {mapGetters} from 'vuex'
    import util from "../../utils/util";
    // 待报价
    import toBeQuoted from './components/toBeQuoted.vue';
    // 已报价
    import quotedPrice from './components/quotedPrice.vue';
    // 已完成
    import completed from './components/completed.vue';
    // 已超时
    import overtime from './components/overtime.vue';

    export default {
        name: 'orderList',
        data() {
            return {
                active:0,
            }
        },
        components: {},
        computed: {
        },
        methods: {
            // tab 点击事件
            handleTabClick(){
                this.$router.push({
                    name:'orderList',
                    query:{
                        active:this.active,
                    }
                })
            },

        },
        created(){
            // 获取选中
            this.active = this.$route.query.active*1;
        },
        components: {
            toBeQuoted,
            quotedPrice,
            completed,
            overtime
        }
    }
</script>
<style lang="scss">
.orderList {
    .van-tab{
        font-size:vw(30);
        font-weight:400;
        color:#666666;
    }
    .van-tab--active {
        color: #f44;
    }
}
</style>
<style lang="scss" scoped>
    @import '@/assets/styles/base/calc_vm.scss';
</style>