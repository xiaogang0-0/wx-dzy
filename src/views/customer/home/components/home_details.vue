// 展会详情
<template>
  <div class="home_details">
    <div v-if="details.id">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index)  in details.imgList" :key="index">
          <!-- <router-link :to="{'path':'personal'}"> -->
          <img :src="image" alt />
          <!-- </router-link> -->
        </van-swipe-item>
      </van-swipe>

      <div class="details_top">
        <van-row class="cont">
          <van-col span="4">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg"
              alt="logo"
              class="logo"
            />
          </van-col>
          <van-col span="20">
            <van-row>
              <van-col span="19">
                <h2 class="tit">{{ '亚森国际' }}</h2>
              </van-col>
              <van-col span="4">
                <span class="type">{{'仅线下' || '仅线上、仅线下、全包括'}}</span>
              </van-col>

              <van-col span="24" class="timer">预计开展日期：{{ '2020.06.23 - 2020.06.30' }}</van-col>
            </van-row>
          </van-col>

          <van-col span="24" class="text-right">
            <van-button icon="icon iconfont yz-guanzhu" type="default" class="btnNone">关注</van-button>
            <van-button icon="icon iconfont yz-yiguanzhu" type="default" class="btnNone">已关注</van-button>
            <van-button
              icon="icon iconfont yz-fenxiang"
              type="default"
              class="btnNone"
              @click="handleShare"
            >分享</van-button>
          </van-col>
          <van-row class="w100">
            <van-col span="12">
              <van-button
                type="default"
                class="btnNone1"
                @click="handleToIntroduce(1)"
              >{{year}}年会展日历</van-button>
            </van-col>
            <van-col span="12">
              <van-button type="default" class="btnNone1" @click="handleToIntroduce(2)">公司简介</van-button>
            </van-col>
          </van-row>
        </van-row>
      </div>
      <div class="center_btn">
        <van-grid clickable :border="false" :column-num="3">
          <van-grid-item to="/">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yz-canzhanshangmulu" />
            </svg>
            参展商目录
          </van-grid-item>

          <van-grid-item to="/">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yz-zhanhuiricheng" />
            </svg>
            展会日程
          </van-grid-item>

          <van-grid-item to="/">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yz-canguanyuyue" />
            </svg>
            参观预约
          </van-grid-item>
        </van-grid>
        <van-row class="cont_footer">
          <van-col span="24">
            <h3>承办方</h3>
          </van-col>
          <van-col span="24">主办单位：{{ '中国交通协会' }}</van-col>
          <van-col span="24">承办单位：{{ '承办单位：雅森国' }}</van-col>
          <van-col span="24">协办单位：{{ }}</van-col>
          <van-col span="24">支持媒体：{{ }}</van-col>
        </van-row>
      </div>
    </div>

    <!-- 占位图 -->
    <img v-else src="@/assets/images/null.png" class="nullImg" alt />

    <van-overlay :show="showShare" @click="showShare = false">
      <div class="wrapper" @click.stop>
        <!-- 名片 -->
        <div class="wrapper_cont">
          <img src="@/assets/images/home/detail.png" class="bgImg" alt />
          <van-row>
            <van-col span="24">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg"
                alt="logo"
                class="logo"
              />
            </van-col>
            <van-col span="18">
              <van-row>
                <van-col span="24">
                  <h3 class="tit">{{ '亚森国际' }}</h3>
                </van-col>
                <van-col span="24" class="timer">
                  <div>
                    预计开展日期：
                    <p>{{ '2020.06.23 - 2020.06.30' }}</p>
                  </div>
                </van-col>
              </van-row>
            </van-col>
            <van-col span="4">
              <img src="@/assets/images/home/ma.png" class="ma" alt="二维码" />
            </van-col>
          </van-row>
        </div>
        <!-- 分享底部 -->
        <van-share-sheet
          v-model="showShare"
          :overlay="false"
          :options="options"
          @cancel="handleCancel"
          @select="onSelect"
        />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
import img1 from "@/assets/images/home/1.png";
import img2 from "@/assets/images/home/2.png";
import img3 from "@/assets/images/home/3.png";

// import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "home_details",
  components: {
    // VideoDemo, // 播放
    // footerNav
  },
  data() {
    return {
      // 当前年
      year: "",
      showShare: false,
      options: [
        {
          name: "生成图片",
          icon: img1
        },
        {
          name: "微信",
          icon: img2
        },
        {
          name: "朋友圈",
          icon: img3
        }
      ],
      details: {
        id: "1",
        imgList: [
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592222408697&di=4a084fddbef6ee6e0c2f36e3a28f1817&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1871768207%2C1897648880%26fm%3D214%26gp%3D0.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212479210&di=67b3ada2b2c47521e7ea2de18d9ffa0b&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h640%2F20180109%2Fb756-fyqnici7832949.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212531543&di=9d59120aa8b215694e9993b67950027a&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1601155093%2C2841826143%26fm%3D214%26gp%3D0.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212565237&di=3e2da936b910826f25cbc121c4fe9e73&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3021468801%2C4117927881%26fm%3D214%26gp%3D0.jpg"
        ]
      }
      // loading: false,
      // finished: false,
      // refreshing: false,
      // pageSize: 10,
      // pageNum: 1
    };
  },

  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.id = this.$route.query.id;
    document.title = this.$route.query.title;
    this.year = this.doHandleYear();
    // 默认刷新列表
    this.handleGetDetail();
  },

  methods: {
    // 获取当前年
    doHandleYear(tYear) {
      var myDate = new Date();
      var tYear = myDate.getFullYear();

      return tYear;
    },
    // 分享
    handleShare() {
      this.showShare = true;
    },

    // 取消分享图片
    handleCancel() {
      this.showShare = false;
      // this.showShare = true;
    },

    // 选择分享
    onSelect(option) {
      // Toast(option.name);
      util.success(option.name);

      this.showShare = false;
    },

    // 查看公司简介
    handleToIntroduce(type) {
      // 年会展日历
      if (type == 1) {
        this.$router.push({
          name: "home_calendar",
          query: {
            id: 1
          }
        });
      }
      // 公司简介
      if (type == 2) {
        this.$router.push({
          name: "home_introduce",
          query: {
            id: 1
          }
        });
      }
    },

    // 查看详情
    handleLook(_id) {
      this.$router.push({
        name: "toBeQuotedDetails",
        query: {
          inquiryId: _id
        }
      });
    },

    // 请求参数
    handleGetDetail() {
      Api.getHomePageDetails(this.id)
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.banner = data;
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
    }
  },

  computed: {},

  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    });
  }

};
</script>

<style lang="scss">
.home_details {
  .van-swipe__indicators {
    bottom: 1.28rem !important;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "../home.scss";
.home_details {
  .nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
  }
}
</style>

