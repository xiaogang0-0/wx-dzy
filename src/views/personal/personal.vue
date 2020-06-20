<template>
    <div class="personal">
        <div class="personal_header">
            <span>平台采购：</span>
            <span>{{userInfo.username}}</span>
        </div>
        <ul class="list_wrap">
            <li @click="$router.push({name:'changePassword'})">
                <van-button type="info" class="changePassword">修改密码</van-button>
            </li>
            <li @click="loginOut">
                <van-button plain type="danger" class="logOut">退出登录</van-button>
            </li>
            <!-- <li @click="$router.push({name:'home'})">
                <van-button type="primary" class="goHome">返回首页</van-button>              
            </li> -->
        </ul>
       
    </div>
</template>

<script>
    import * as Api from './api';

    import {mapGetters} from 'vuex'
    import util from "../../utils/util";

    export default {
        name: 'personal',
        components: {},
        computed: {},
        data() {
            return {
                userInfo:{},
            };
        },
        methods: {
            /*退出登录*/
            loginOut() {
                Api.landingExit('').then(res=>{
                    if(res.code == 200){
                        // console.log(res)
                        util.clearCookie('biw_token')
                        util.clearCookie('password')
                        localStorage.removeItem('userInfo');
                        // this.$router.push({
                        //     path: '/login'
                        // })
                        this.$router.push({name:'login'})
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            // console.log(this.userInfo)
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/styles/base/calc_vm.scss';
    @import "./personal.scss";
</style>