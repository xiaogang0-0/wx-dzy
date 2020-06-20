<template>
  <div class="login">
    <!-- <img src="@/assets/images/login/logo.png" alt="" class="logoImg"> -->
    <h1 class="title">大招云</h1>
    <p class="logoTitle">随时随地看展 时时刻刻参展</p>

    <div class="loginForm">
      <div class="text-center">
        <img :src="userImg" alt class="userImg" />
        <p class="userName">{{username}}</p>
      </div>

      <!-- <van-field
        v-model="username"
        ref="username"
        clearable
        left-icon="icon iconfont iconaccount"
        placeholder="请输入您的账号"
        @click-right-icon="$toast('question')"
      /> -->

      <van-field
        v-model="password"
        ref="password"
        v-if="true"
        clearable
        left-icon="icon iconfont iconpassword"
        right-icon="icon iconfont iconhide"
        :type="lookPassword ? 'password' : 'text'"
        @click-right-icon="handleLook"
        placeholder="请输入您的密码"
      />

      <!-- <van-checkbox
        v-model="KeepPassword"
        shape="square"
        checked-color="#D0111B"
        style="padding: 5px 10px;"
      >记住密码</van-checkbox> -->

      <van-button
        type="info"
        loading-type="spinner"
        loading-text="登 录 中..."
        @click="hanldSubClick"
        class="idea_btn"
      >登 录</van-button>
    </div>
  </div>
</template>

<script>
import * as Api from "@/api/customer/login";
import { util } from "@/utils";
import { Field, Button, Toast, Checkbox, CheckboxGroup } from "vant";
import { mapActions, mapGetters } from "vuex";
import { setTimeout } from "timers";
import img3 from "@/assets/images/home/3.png";

export default {
  name: "login",

  components: {
    Field,
    Button,
    Toast,
    Checkbox,
    CheckboxGroup
  },

  data() {
    return {
      userImg: img3,

      // 记住密码
      KeepPassword: true,
      // 查看密码
      lookPassword: true,
      // 账户
      username: "",
      // 密码
      password: ""
      // userInfo:{
      // access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaGx3bC1wbGF0Zm9ybS1yZXNvdXJjZS1pZCJdLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJwYXJlbnRVc2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTY5NDYxNzQ0LCJ1c2VySWQiOjEwMDksImF1dGhvcml0aWVzIjpbIjQ2NjNkMTkyLWI4N2ItNDhkMi04MzMwLWFkNTBhYWFiMjg1YiIsIi91c2VyL3N5cy91c2VyL3BhZ2UiLCJiNzVkNzA3ZS1hNDAxLTRiZDEtYWMzNC1jMTNiYWMwMjNlODEiLCIzZDE2YmU5Yy1mOGVlLTQ2MDQtOTk5Ny0yOGE5ZWQ2OGM5OWYiLCJST0xFX1VTRVIiLCIvdXNlci9zeXMvcm9sZS9wYWdlIiwicmZxOnF1b3RhdGlvbjptYW5hZ2U6cGFnZSIsIi9yZnEvcXVvdGF0aW9uL21hbmFnZS9wYWdlIiwic3lzOnVzZXI6YWxsIiwic3lzOnJvbGU6cGFnZSIsIjQyZjQ4MDNkLTkzMDEtNDAxMy05YTk2LTIxYTdjZmFlNDUzNSJdLCJqdGkiOiIzNTZlYTdmNy1hOGJjLTQyMzQtOTlhMS1mMjljY2ZhOGEyMWUiLCJwYXJlbnRJZCI6MTAwOSwiY2xpZW50X2lkIjoiaGx3bC1wbGF0Zm9ybS1yZXNvdXJjZSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.2XH6gHkIvEqUMVitrIfCUP277nFw1VdMMUWusZjVWEo",
      // expires_in:2591998,
      // jti:"356ea7f7-a8bc-4234-99a1-f29ccfa8a21e",
      // parentId:1009,
      // parentUsername:"admin",
      // refresh_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaGx3bC1wbGF0Zm9ybS1yZXNvdXJjZS1pZCJdLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiIzNTZlYTdmNy1hOGJjLTQyMzQtOTlhMS1mMjljY2ZhOGEyMWUiLCJwYXJlbnRVc2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTY5NDYxNzQ0LCJ1c2VySWQiOjEwMDksImF1dGhvcml0aWVzIjpbIjQ2NjNkMTkyLWI4N2ItNDhkMi04MzMwLWFkNTBhYWFiMjg1YiIsIi91c2VyL3N5cy91c2VyL3BhZ2UiLCJiNzVkNzA3ZS1hNDAxLTRiZDEtYWMzNC1jMTNiYWMwMjNlODEiLCIzZDE2YmU5Yy1mOGVlLTQ2MDQtOTk5Ny0yOGE5ZWQ2OGM5OWYiLCJST0xFX1VTRVIiLCIvdXNlci9zeXMvcm9sZS9wYWdlIiwicmZxOnF1b3RhdGlvbjptYW5hZ2U6cGFnZSIsIi9yZnEvcXVvdGF0aW9uL21hbmFnZS9wYWdlIiwic3lzOnVzZXI6YWxsIiwic3lzOnJvbGU6cGFnZSIsIjQyZjQ4MDNkLTkzMDEtNDAxMy05YTk2LTIxYTdjZmFlNDUzNSJdLCJqdGkiOiI5ZjhkZGIzZi00NWIxLTQwYTQtODAzNy1lYjdjMzkyY2MxMDQiLCJwYXJlbnRJZCI6MTAwOSwiY2xpZW50X2lkIjoiaGx3bC1wbGF0Zm9ybS1yZXNvdXJjZSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.avCxm4dtJsKKGq5cGTWm8F0aFA9rK3ThKcsUJH_DJXE",
      // scope:"read write",
      // token_type:"bearer",
      // userId:1009,
      // username:"admin",
      // },
    };
  },

  methods: {
    // 查看密码
    handleLook() {
      this.lookPassword = !this.lookPassword;
    },
    // 点击登录登录
    hanldSubClick() {
      if (this.username == "") {
        util.error("请输入您的账号");
      } else if (this.password == "") {
        util.error("请输入您的密码");
      } else if (this.password.length < 6) {
        util.error("密码不能少于6位");
      } else {
        let params = {
          username: this.username,
          password: this.password,
          moduleId: 4,
          code: this.$route.query.code ? this.$route.query.code : ""
          // "moduleId":1,
        };
        // 请求登录
        this.onSubmt(params);
      }
    },
    // 请求登录
    onSubmt(params) {
      console.log(params);
      util.showLoading();
      Api.loginInit(params)
        .then(res => {
          // console.log(res,'res')
          if (res.code == 417) {
            this_.$message.error(res.message);
          } else if (res.code == 200) {
            let { access_token, username } = res.data;

            // // 是否记住密码
            // if (this.KeepPassword) {
            //   // 本地缓存密码
            //   util.setCookie("password", this.password, 365);
            // } else {
            //   util.clearCookie("password");
            // }

            // 本地缓存
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            util.setCookie("biw_token", access_token, 365);
            util.setCookie("username", username, 365);
            this.$router.push({
              name: "home"
            });
            //  console.log(
            //     util.getCookie("biw_token"),
            //     util.getCookie("username"),
            //     util.getCookie("password")
            // )
          }
          util.hideLoading();
        })
        .catch(err => {
          console.log(err);
          util.hideLoading();
        });
    }
  },

  computed: {},

  mounted() {
    if (this.username == "") {
      this.$refs.username.focus();
    } else if (this.password == "") {
      this.$refs.password.focus();
    }
  },

  created() {
    // 获取本地登录信息
    let username = util.getCookie("username");
    let password = util.getCookie("password");
    this.username = username;
    this.password = password;

    if (username && password) {
      // this.KeepPassword = true;
      setTimeout(() => {
        // this.hanldSubClick();
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./login.scss";
</style>

<style lang="scss">
@import "@/assets/styles/base/calc_vm.scss";
// 登录页图标样式
.login {
  .iconfont {
    font-size: vw(50);
    color: #dedede;
  }
  .van-checkbox__icon .van-icon {
    border: 1px solid #dedede;
  }
}
</style>

