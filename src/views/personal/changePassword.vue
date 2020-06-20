// 修改密码
<template>
    <div class="changePassword">
        <div class="loginForm">
                
            <van-field
            v-model="oldPassword"
            ref="oldPassword"
            clearable
            left-icon="icon iconfont iconpassword"
            label="原密码"
            placeholder="请输入原密码"/>
             
            <van-field
                v-model="newPassword"
                ref="newPassword"
                v-if="true"
                clearable
                left-icon="icon iconfont iconpassword"
                right-icon="icon iconfont iconhide"
                :type="lookPassword ? 'password' : 'text'"
                @click-right-icon="handleLook"
                label="新密码"
                placeholder="请输入新密码" />
            <van-field
                v-model="againNewPassword"
                ref="againNewPassword"
                v-if="true"
                clearable
                left-icon="icon iconfont iconpassword"
                right-icon="icon iconfont iconhide"
                :type="lookPassword ? 'password' : 'text'"
                @click-right-icon="handleLook"
                label="确认新密码"
                placeholder="请再次输入新密码" />
            
                <van-button type="info"
                    loading-type="spinner"
                    loading-text="登 录 中..." @click="hanldResetPsw" class="changePasswordBtn">修改密码
                </van-button>

        </div> 
    </div>
</template>

<script>
    import * as Api from './api';

    import {mapGetters} from 'vuex'
    import util from "../../utils/util";
import { setTimeout } from 'timers';

    export default {
        name: 'personal',
        data() {
            return {
                // 查看密码
                lookPassword: true,
                // 原密碼
                oldPassword:'',
                // 新密码
                newPassword:'',
                // 确认新密码
                againNewPassword:''
            }
        },
        components: {},
        created(){},
        mounted() {
            if (this.oldPassword == '') {
                this.$refs.oldPassword.focus()
            } else if (this.newPassword == '') {
                this.$refs.newPassword.focus()
            }else if (this.againNewPassword == '') {
                this.$refs.againNewPassword.focus()
            }
        },
        methods: {
            // 查看密码
            handleLook(){
                this.lookPassword = !this.lookPassword;
            },
            // 点击修改密码
            hanldResetPsw(){
                if(this.oldPassword.length < 6 || this.newPassword.length < 6 || this.againNewPassword.length < 6){
                    util.error('密码不能少于6位！')
                }else if(this.newPassword != this.againNewPassword){
                    util.error('新密码不相同，请确认输入！')
                }else{
                    // let params = {
                    //     username:util.getCookie("username"),
                    //     oldPassword: this.oldPassword,
                    //     newPassword:this.newPassword,
                    //     againNewPassword:this.againNewPassword
                    // };
                    var params = {
                        "oldPassword": this.oldPassword,
                        "password": this.newPassword
                    }
                    // 请求登录
                    this.onSubmt(params)
                }
            },
            // 修改密码请求
            onSubmt(params){
                util.showLoading();
                Api.changePassword(params).then(res => {
                    if (res.code == 200) {
                        util.clearCookie("password");
                        util.success('密码修改成功！')
                        setTimeout(()=>{
                            this.$router.push({'name':'personal'})
                        },2000)
                    }else{
                        util.warning('密码修改失败！')
                    }
                    util.hideLoading();
                }).catch(err => {
                    console.log(err)
                    util.hideLoading();
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/styles/base/calc_vm.scss';
    @import "./changePassword.scss";
</style>

<style lang="scss">
    @import '@/assets/styles/base/calc_vm.scss';
    .changePassword {
        .iconfont {
            font-size: vw(50);
            color: #DEDEDE;
        }
    }
</style>