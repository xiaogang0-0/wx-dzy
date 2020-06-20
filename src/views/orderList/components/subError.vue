// 請求失敗
<template>
    <div class="subError">
        <!-- <i class="icon iconfont iconselected"></i> -->
        <img src="@/assets/images/orderList/subError.png" class="successImg" alt="">
        <p class="text">报价单提交失败!</p>
        <div class="foot">
            <van-button type="info" class="lookBtn" @click="handleList">返回待报价管理</van-button>
        </div>
    </div>
</template>

<script>
import { util } from '@/utils';
import * as Api from '../api';
import { mapGetters } from 'vuex';

export default {
    name: 'subError',
    components: {
       
    },
    data () {
        return {
        }
    },

    methods: {
        
        // 返回首頁
        handleHome(){
            this.$router.push({
                name:'home',
                query:{}
            })
        },

        // 查看報價單
        handleList(){
             this.$router.push({
                name:'orderList',
                query:{}
            })
        }

    },

    computed: {},

    created() {
        // 错误原因
        if(this.$route.query.msg){
            util.error(this.$route.query.msg)
        }
       
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
    @import '../../../assets/styles/base/calc_vm.scss';

    .subError{
    text-align: center;
    .successImg{
        width:vw(264);
        margin-top: vw(91);
    }
    .text{
        padding:0 0 vw(150);
        line-height:vw(130);
        font-size:vw(42);
        font-weight:400;
        color:rgba(208,17,27,1);
    }
    .foot{
        .lookBtn{
            width:vw(638);
            line-height:vw(88);
            font-size:vw(32);
            font-weight:400;
            border-radius:vw(6);
            border-color:rgba(86,136,202,1);
            background:rgba(86,136,202,1);
            box-shadow:0 vw(10) vw(20) 0 rgba(86,136,202,0.2);
            color:rgba(255,255,255,1);
        }
    }
}
</style>

<style lang="scss">
    
</style>


