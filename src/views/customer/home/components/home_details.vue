// 展会详情  http://localhost:9000/home_details?id=1272919606905835521&title=%E4%BA%9A%E6%A3%AE%E5%9B%BD%E9%99%85
<template>
  <div class="home_details">
    <!-- <div v-if="details.enterprise && details.enterprise.id"> -->
    <div v-if="details.enterprise && details.enterprise.id">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index)  in details.mediaList" :key="index">
          <!-- <router-link :to="{'path':'personal'}"> -->
          <img :src="item.mediaUrl" alt />
          <!-- </router-link> -->
        </van-swipe-item>
      </van-swipe>

      <div class="details_top">
        <van-row class="cont">
          <van-col span="4">
            <img :src="details.enterprise.logo" alt="logo" class="logo" />
          </van-col>
          <van-col span="20">
            <van-row>
              <van-col span="19">
                <h2 class="tit">{{ details.enterprise.name }}</h2>
              </van-col>
              <van-col span="4">
                <span
                  class="type"
                >{{ details.enterpriseShow.showFormat ==1 ? '仅线上' : details.enterpriseShow.showFormat == 2 ? '仅线下' : details.enterpriseShow.showFormat == 3 ? '全包括' : ''}}</span>
              </van-col>
              <van-col
                span="24"
                class="timer"
              >预计开展日期：{{ details.enterpriseShow.planStartDate + ' - ' + details.enterpriseShow.planEndDate }}</van-col>
            </van-row>
          </van-col>
          <van-col span="24" class="text-right">
            <van-button
              v-show="!details.followStatus"
              icon="icon iconfont yz-guanzhu"
              type="default"
              class="btnNone"
              @click="handleIsFollow(1)"
            >关注</van-button>
            <van-button
              v-show="details.followStatus"
              icon="icon iconfont yz-yiguanzhu"
              type="default"
              class="btnNone"
              @click="handleIsFollow(0)"
            >已关注</van-button>
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
          <van-grid-item @click="handleToIntroduce(3)">
            <!-- <van-grid-item to="/"> -->
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yz-canzhanshangmulu" />
            </svg>
            参展商目录
          </van-grid-item>

          <van-grid-item @click="handleToIntroduce(4)">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yz-zhanhuiricheng" />
            </svg>
            展会日程
          </van-grid-item>

          <van-grid-item @click="handleToIntroduce(5)">
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
          <van-col span="24">主办单位：{{ details.enterpriseShow.hosts }}</van-col>
          <van-col span="24">承办单位：{{ details.enterpriseShow.organizer }}</van-col>
          <van-col span="24">协办单位：{{ details.enterpriseShow.coOrganizer }}</van-col>
          <van-col span="24">支持媒体：{{ details.enterpriseShow.supportMedia }}</van-col>
        </van-row>
      </div>
    </div>

    <!-- 占位图 -->
    <img v-else src="@/assets/images/null.png" class="nullImg" alt />

    <van-overlay :show="showShare" @click="showShare = false">
      <div class="wrapper" @click.stop>
        <!-- 名片 -->
        <div class="wrapper_cont" v-if="details.enterprise && details.enterprise.id">
          <!-- <img src="@/assets/images/home/detail.png" class="bgImg" alt /> -->
          <img :src="details.enterpriseShow.shareImageUrl" class="bgImg" alt />

          <van-row class="wrapper_text">
            <van-col span="24">
              <img :src="details.enterprise.logo" alt="logo" class="logo" />
            </van-col>
            <van-col span="18">
              <van-row>
                <van-col span="24">
                  <h3 class="tit">{{ details.enterprise.name }}</h3>
                </van-col>
                <van-col span="24" class="timer">
                  <div>
                    预计开展日期：
                    <p>{{ details.enterpriseShow.planStartDate + ' - ' + details.enterpriseShow.planEndDate }}</p>
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
      // 企业id
      id: '',
      // 当前年
      year: "",
      // 分享弹窗
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
        // mediaList: [
        //   {
        //     id: 1272913711522246658,
        //     enterpriseShowId: 1272919606301855745,
        //     enterpriseShowName: "夏季汽配展",
        //     mediaUrl:
        //       "https://img30.360buyimg.com/popWaterMark/jfs/t1/117113/35/8884/224865/5ed3b7eaE848717a8/bb3a27cfcac3a2e8.jpg",
        //     mediaTitle: "测1",
        //     mediaType: 1,
        //     videoUrl:
        //       "https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/56219e93229189724781699073/v.f30.mp4",
        //     remarks: "",
        //     showOrder: ""
        //   },
        //   {
        //     id: 1272913711522246659,
        //     enterpriseShowId: 1272919606301855745,
        //     enterpriseShowName: "夏季汽配展",
        //     mediaUrl:
        //       "http://himg2.huanqiu.com/attachment2010/2015/0407/10/16/20150407101608259.jpg",
        //     mediaTitle: "测2",
        //     mediaType: 0,
        //     videoUrl: "",
        //     remarks: "",
        //     showOrder: 100
        //   }
        // ],
        // followStatus: 1,
        // enterprise: {
        //   id: 1272913711522246658,
        //   logo:
        //     "https://org.modao.cc/uploads4/images/4826/48266322/v2_qa1ods.jpg",
        //   name: "亚森国际",
        //   shortName: "亚森"
        // },
        // enterpriseShow: {
        //   id: 1272919606301855745,
        //   showName: "夏季汽配展",
        //   showFormat: 1,
        //   provinceName: "河北省",
        //   cityName: "石家庄市",
        //   planStartDate: "2020-01-16",
        //   planEndDate: "2020-01-19",
        //   hosts: "中国交通协会",
        //   organizer: "亚森国际有限公司",
        //   coOrganizer: "北京市交通协会",
        //   supportMedia: "一览展会网, 大招网"
        // },
      }
    };
  },

  created() {
    // 企业id
    this.id = this.$route.query.id;
    // document.title = this.$route.query.title;
    // 获取当前年
    this.doHandleYear();
    // 默认刷新列表
    this.handleGetDetail();
    alert('二维码,跳转路由,接口')
  },

  methods: {
    // 获取当前年
    doHandleYear(tYear) {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      this.year = tYear;
      return tYear;
    },

    // 请求参数
    handleGetDetail() {
      Api.getHomePageDetails(this.$route.query.id)
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.details = data;
             document.title = this.details.enterprise.name;

          }
        })
        .catch(err => {
            this.details = {}
        });
    },
    // 关注/取消关注  followStatus 1表示关注，0表示取消关注
    handleIsFollow(followStatus) {
      let param = {
        // followStatus 1表示关注，0表示取消关注
        followStatus: followStatus || '',
        // 要关注的企业id或人物id
        followId: this.details.enterprise.id,
        // 1：关注企业，2：关注人物
        followType: '1',
        // 用户openId
        openId: ''
      }
      Api.setIsFollow(param)
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            Notify({ type: 'success', message: msg });
          }
        })
        .catch(err => {
            this.details = {}
        });
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
      console.log(type);
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

      // 参展商目录
      if (type == 3) {
        this.$router.push({
          name: "home_introduce",
          query: {
            id: 1
          }
        });
      }

      // 展会日程
      if (type == 4) {
        this.$router.push({
          name: "home_introduce",
          query: {
            id: 1
          }
        });
      }

      // 参观预约
      if (type == 5) {
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

