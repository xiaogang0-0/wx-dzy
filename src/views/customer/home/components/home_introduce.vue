// 展会企业 介绍
<template>
  <div class="home_introduce">
    <div v-if="details.id">
      <div v-if="src">
        <Video-Demo :src="src" :showVideo="showVideo" style="width: 100%;" />
      </div>
      <img
        v-else
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg"
        alt
        class="banner"
      />

      <van-row class="cont">
        <van-col span="24">
          <h2 class="tit">欧亚国际幼儿教育博览会</h2>
        </van-col>
        
        <van-col span="16">
          <van-button icon="icon iconfont yz-guanzhu" size="small" type="default" class="btnNone">关注</van-button>
          <van-button
            icon="icon iconfont yz-yiguanzhu"
            size="small"
            type="default"
            class="btnNone"
          >已关注</van-button>
        </van-col>
       
        <van-col span="8" class="text-right">
          <van-button type="default" size="small" round color="#F8D57E" @click="handleWith">咨询客服</van-button>
        </van-col>
        
        <van-col span="24" class="text_wrap">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg"
            alt
            class="text"
          />
        </van-col>
      </van-row>
    </div>

    <!-- 占位图 -->
    <img v-else src="@/assets/images/null.png" class="nullImg" alt />

  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
import VideoDemo from "@/components/customer/videoPlay/index.vue";

// import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "home_introduce",
  components: {
    VideoDemo // 播放
    // footerNav
  },
  data() {
    return {
      showVideo: false,
      src: require("@/assets/images/video1.mp4"),

      // 当前年
      year: "",
      showShare: false,
      details: {
        id: "1",
        
      }
      // loading: false,
      // finished: false,
      // refreshing: false,
      // pageSize: 10,
      // pageNum: 1
    };
  },

  methods: {
    // 获取当前年
    doHandleYear(tYear) {
      var myDate = new Date();
      var tYear = myDate.getFullYear();

      return tYear;
    },
    // 咨询客服
    handleWith() {},


    // 请求参数 params status{1:上拉刷新，2：正常请求}
    onsubmt(params, statu) {
      return;
      let status = statu ? statu : 2; // 默认正常请求
      Api.quotationList(params)
        .then(res => {
          let { rows, total } = res;
          // console.log(rows,rows.length,'rows,rows.length')
          // if (rows.length) {
          // 加载状态结束
          this.loading = false;

          if (status == 1) {
            // 上拉刷新
            this.refreshing = false;
            this.questionList = rows;
            this.$toast("刷新成功");
          } else {
            rows.forEach(element => {
              this.questionList.push(element);
            });
          }
          // 数据全部加载完成
          if (rows.length < this.pageSize) {
            this.finished = true;
          }
          // }
        })
        .catch(err => {
          // 上拉刷新
          this.refreshing = false;
          console.log(err, "err");
        });
    },

    // 查看详情
    handleLook(_id) {
      this.$router.push({
        name: "toBeQuotedDetails",
        query: {
          inquiryId: _id
        }
      });
    }
  
  },

  computed: {},

  beforeRouteLeave(to, from, next) {
    // 主页禁止返回
    if (to.fullPath == "/login") {
      next(false);
    } else {
      next();
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    });
  },

  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.inquiryId = this.$route.query.inquiryId;
    document.title = this.$route.query.title;
    this.year = this.doHandleYear();
    // 默认刷新列表
    // this.onSearch();
  }
};
</script>

<style lang="scss">

</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "../home.scss";
.home_introduce {
  .nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
  }
}
</style>

