// 底部导航 组件
<template>
  <div class="footerNav">
    <van-tabbar v-model="active" active-color="#313437" inactive-color="#C8CCD3">
      <van-tabbar-item
        v-for="(item, index) in navList"
        :key="index"
        :name="item.name"
        :icon="item.ico"
        @click="handleClick(item.path)"
      >{{item.lable}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: ["active"],

  data() {
    return {
      // active: '',
      navList: [
        {
          ico: "home-o",
          name: "home",
          lable: "会展",
          // 路由
          path: "personal"
        },
        {
          ico: "search",
          name: "search",
          lable: "资源",
          // 路由
          path: "personal"
        },
        {
          ico: "search",
          name: "my",
          lable: "我的",
          // 路由
          path: "personal"
        }
      ]
    };
  },
  components: {},

  watch: {
    // 'active': {
    //   deep: true,
    //   handler(newOptions, oldOptions) {
    //     console.log(newOptions);
    //     if (newOptions) {
    //     }
    //   }
    // }
  },
  created() {},
  methods: {
    handleClick(url) {
      this.$router.push({
        name: url
      });
    },
  },
  computed: {}
};
</script>
<style lang="scss">
.footerNav {
}
</style>
<style lang="scss" scoped>
.footerNav {
  .van-tabbar--fixed {
    height: 1.8rem;
    .van-tabbar-item {
      font-size: 0.24rem;
      color: rgba(49, 52, 55, 1);
      line-height: 0.34rem;
    }
  }
}
</style>