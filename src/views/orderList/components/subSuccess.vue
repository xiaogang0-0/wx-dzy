// 請求成功
<template>
    <div class="subSuccess">
        
        <!-- <i class="icon iconfont iconselected"></i> -->
        <img src="@/assets/images/orderList/subSuccess.png" class="successImg" alt="">
        <p class="text">报价单提交成功!</p>
        <div class="foot">
            <van-button type="info" class="lookBtn" @click="handleList">查看报价单</van-button>
            <van-button plain type="danger" class="homeBtn" @click="handleHome">返回首页</van-button>
        </div>
    </div>
</template>

<script>
import { util } from '@/utils';
import * as Api from '../api';
import { mapGetters } from 'vuex';

export default {
    name: 'subSuccess',
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
                query:{

                }
            })
        },
        // 查看報價單
        handleList(){
             this.$router.push({
                name:'orderList',
                query:{

                }
            })
        }



    },

    computed: {
     

    },
    created() {
       
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
    @import '../../../assets/styles/base/calc_vm.scss';
    .subSuccess{
        text-align: center;
        .successImg{
            width:vw(254);
            border-radius: 50%;
            margin-top: vw(91);
            box-shadow: vw(10) vw(10) vw(10) rgba(192,153,102,0.1);
        }
        .text{
            padding:0 0 vw(150);
            line-height:vw(130);
            font-size:vw(42);
            font-weight:400;
            color:rgba(105,168,84,1);
        }
        .foot{
            button{
                margin: 0 vw(15);
                line-height:vw(88);
                font-size:vw(32);
                font-weight:400;
                border-radius:vw(6);
                border-color:rgba(86,136,202,1);


            }
        }
        .lookBtn{
            background:rgba(86,136,202,1);
            box-shadow:0 vw(10) vw(20) 0 rgba(86,136,202,0.2);
            color:rgba(255,255,255,1);

        }
        .homeBtn{
            background:rgba(255,255,255,1);
            border:vw(2) solid rgba(86,136,202,1);
            color:rgba(86,136,202,1);
            // color:rgba(255,255,255,1)
        }
    }
</style>

<style lang="scss">
    
</style>


