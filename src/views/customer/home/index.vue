// 首页
<template>
  <div class="home footerPad">
    <h2 class="head">
      大招云
      <i>帮你放大招！</i>
    </h2>

    <van-swipe v-if="banner.length" class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index)  in banner" :key="index">
        <!-- <router-link :to="{'path':'personal'}"> -->
        <img :src="image.mediaUrl" alt />
        <!-- </router-link> -->
      </van-swipe-item>
    </van-swipe>

    <!-- 占位图 -->
    <img v-if="!list.length" src="@/assets/images/null.png" class="nullImg" alt />
    <!-- 列表内容 -->
    <div class="content" v-else>
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!-- List 列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="----- 我是有底线的 -----"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          class="contentList"
        >
          <!-- <van-cell v-for="item in list" :key="item" :title="item"> -->
          <van-cell
            v-for="(image, index)  in list"
            :key="index"
            class="contentItem"
            :class="index+1 == list.length ? 'margin0' : ''"
          >
            <!-- <img :src="banner[0]" alt class="itemImg" /> -->
            <div class="itemImg">
              <Video-Demo :src="src" :showVideo="showVideo" style="width: 100%;" />
            </div>

            <p class="status">{{'仅线下' || '仅线上、仅线下、全包括'}}</p>
            <ol class="cont">
              <li class="tit">
                <span class="type">汽配</span>夏季汽配展
              </li>
              <li class="timer">2020.06.23 - 2020.06.30</li>
              <li class="clearfix">
                <!-- <img src="@/assets/images/personal/index_03.png" alt class="logo" /> -->
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg"
                  alt="logo"
                  class="logo"
                />
                <i>亚森国际</i>
                <!-- <router-link :to="{'path':'personal',}"> -->
                <van-button
                  round
                  type="default"
                  size="small"
                  style="float:right;"
                  @click="handleLook(image.id, image.title)"
                >了解更多</van-button>
                <!-- </router-link> -->
              </li>
            </ol>
          </van-cell>
        </van-list>
      </van-pull-refresh>
      <!-- <van-button round type="default" size="small" style="float:right;" @click="showVideo = !showVideo">了解更多</van-button> -->
      <footer-nav :active="active" />
    </div>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
import VideoDemo from "@/components/customer/videoPlay/index.vue";
import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "home",
  components: {
    VideoDemo, // 播放
    footerNav
  },
  data() {
    return {
      showVideo: false,
      active: "home",
      src: require("@/assets/images/video1.mp4"),
      // 轮播
      banner: [
        {
          id: 1,
          mediaUrl:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212565237&di=3e2da936b910826f25cbc121c4fe9e73&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3021468801%2C4117927881%26fm%3D214%26gp%3D0.jpg",
          mediaTitle: "",
          mediaType: 1,
          videoUrl: ""
        },
        {
          id: 1,
          mediaUrl:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592222408697&di=4a084fddbef6ee6e0c2f36e3a28f1817&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1871768207%2C1897648880%26fm%3D214%26gp%3D0.jpg",
          mediaTitle: "",
          mediaType: 1,
          videoUrl: ""
        },
        // {
        //   id: 1,
        //   mediaUrl:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212479210&di=67b3ada2b2c47521e7ea2de18d9ffa0b&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h640%2F20180109%2Fb756-fyqnici7832949.jpg",
        //   mediaTitle: "",
        //   mediaType: 1,
        //   videoUrl: ""
        // },
        // {
        //   id: 1,
        //   mediaUrl:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212531543&di=9d59120aa8b215694e9993b67950027a&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1601155093%2C2841826143%26fm%3D214%26gp%3D0.jpg",
        //   mediaTitle: "",
        //   mediaType: 1,
        //   videoUrl: ""
        // }
      ],
      details: {},
      list: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212479210&di=67b3ada2b2c47521e7ea2de18d9ffa0b&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h640%2F20180109%2Fb756-fyqnici7832949.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212531543&di=9d59120aa8b215694e9993b67950027a&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1601155093%2C2841826143%26fm%3D214%26gp%3D0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212565237&di=3e2da936b910826f25cbc121c4fe9e73&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3021468801%2C4117927881%26fm%3D214%26gp%3D0.jpg"
      ],
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 10,
      pageNum: 1
    };
  },

  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // 获取轮播图
    this.handleGetBanner();
    // 默认刷新列表
    this.onSearch();
  },

  methods: {
    // 获取轮播图
    handleGetBanner() {
      console.log(111);
      Api.getHomeMediaList()
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.banner = data;
          }
        })
        .catch(err => {
          this.banner = [];
        });
    },
    // 搜索
    onSearch() {
      this.questionList = [];
      this.pageNum = 1;
      let params = {
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize // 每页几条数据
      };
      // console.log(params,'onSearch')
      this.onsubmt(params);
    },

    // 懒加载请求加载列表
    onLoad() {
      this.pageNum++;
      let params = {
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize // 每页几条数据
      };
      // console.log(params,'onLoad')
      this.onsubmt(params);
    },

    // 上拉刷新
    onRefresh() {
      this.finished = false;
      this.pageNum = 1;
      let params = {
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize // 每页几条数据
      };
      this.onsubmt(params, 1);
    },

    // 请求参数 params status{1:上拉刷新，2：正常请求}
    onsubmt(params, statu) {
      return;
      let status = statu ? statu : 2; // 默认正常请求
      Api.getHomePage(params)
        .then(res => {
          let { code, msg, data, total } = res;
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
            if (status == 1) {
              // 上拉刷新
              this.refreshing = false;
              this.questionList = data;
              this.$toast("刷新成功");
            } else {
              data.forEach(element => {
                this.questionList.push(element);
              });
            }
            // 数据全部加载完成
            if (data.length < this.pageSize) {
              this.finished = true;
            }
          }
        })
        .catch(err => {
          // 上拉刷新
          this.refreshing = false;
          console.log(err, "err");
        });
    },

    // 查看详情
    handleLook(_id, title) {
      this.$router.push({
        name: "home_details",
        query: {
          //   id: _id
          id: _id || 11,
          title: title || "自定义标题"
        }
      });
    },

    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
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
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./home.scss";
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
</style>

