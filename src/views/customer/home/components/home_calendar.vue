// 展会日历
<template>
  <div class="home_calendar">
    <div class="head">
      <img src="@/assets/images/home/head.png" alt />
    </div>

    <van-tabs v-model="active" scrollspy sticky @click="onClick">
      <van-tab v-for="(item,index) in details" :key="index" :title="item.monthDesc"></van-tab>
    </van-tabs>
    <!-- 占位图 -->
    <img
      v-if="!itemList.enterpriseShowCalendarList || !itemList.enterpriseShowCalendarList.length"
      src="@/assets/images/null.png"
      class="nullImg"
      alt
    />
    <!-- 列表内容 -->
    <div class="content" v-else>
      <div class="container-water-fall">
        <waterfall
          :col="col"
          :data="itemList.enterpriseShowCalendarList"
          @loadmore="loadmore"
          @scroll="scroll"
          :lazyDistance="50"
        >
          <template>
            <div
              class="cell-item"
              v-for="(obj,_index) in itemList.enterpriseShowCalendarList"
              :key="_index"
              @click="handleLook(obj.id)"
            >
              <img v-if="obj.mediaUrl" :src="obj.mediaUrl" alt="加载错误" />
              <div class="item-body">
                <div class="item-desc">
                  <p>{{obj.mediaTitle}}</p>
                  <p class="timer">{{obj.startDate}} - {{obj.endDate}}</p>
                </div>

                <div class="item-footer">
                  <p class="like-total clear">
                    地点：{{obj.liked}}
                    <span class="status">{{ '仅线下' || '仅线上' || '线上/线下'}}</span>
                    <span
                      class="status"
                      :class="true ? 'style1' : ''"
                    >{{ '仅线下' || '仅线上' || '线上/线下'}}</span>
                    <span
                      class="status"
                      :class="true ? 'style2' : ''"
                    >{{ '仅线下' || '仅线上' || '线上/线下'}}</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </waterfall>
      </div>
    </div>

    <van-divider
      dashed
      v-show="itemList.enterpriseShowCalendarList && itemList.enterpriseShowCalendarList.length"
    >
      <span class="bot_text">这里展会信息真的很多</span>
    </van-divider>

    <!-- 占位图 -->
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
  name: "home_calendar",
  components: {
    // VideoDemo, // 播放
    // footerNav
  },
  data() {
    return {
      // 当前年
      year: "",
      showShare: false,
      active: "二月",
      details: [
        {
          month: 1,
          monthDesc: "一月",
          enterpriseShowCalendarList: []
        },
        {
          month: 2,
          monthDesc: "二月",
          enterpriseShowCalendarList: [
            {
              id: 1272203711512246651,
              enterpriseId: 1272913711522246658,
              enterpriseName: "亚森国际",
              startDate: "2020-02-17",
              endDate: "2020-02-25",
              showName: "亚森车品春季展",
              mediaUrl:
                "https://img30.360buyimg.com/popWaterMark/jfs/t1/117113/35/8884/224865/5ed3b7eaE848717a8/bb3a27cfcac3a2e8.jpg",
              videoUrl:
                "https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/56219e93229189724781699073/v.f30.mp4",
              mediaTitle: "展会1",
              mediaType: 1,
              mediaDuration: "02:22",
              provinceName: "",
              cityName: "",
              showFormat: 1
            },
            {
              id: 1272203711512246651,
              enterpriseId: 1272913711522246658,
              enterpriseName: "亚森国际",
              startDate: "2020-02-17",
              endDate: "2020-02-25",
              showName: "亚森车品春季展",
              mediaUrl:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592815006098&di=97d46c818f57733bc08d54ce0a9462e6&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D2080745074%2C2793209448%26fm%3D214%26gp%3D0.jpg",
              videoUrl:
                "https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/56219e93229189724781699073/v.f30.mp4",
              mediaTitle: "展会2",
              mediaType: 1,
              mediaDuration: "02:22",
              provinceName: "",
              cityName: "",
              showFormat: 1
            }
          ]
        },
        {
          month: 3,
          monthDesc: "三月",
          enterpriseShowCalendarList: []
        },
        {
          month: 4,
          monthDesc: "四月",
          enterpriseShowCalendarList: []
        },
        {
          month: 5,
          monthDesc: "五月",
          enterpriseShowCalendarList: []
        },
        {
          month: 6,
          monthDesc: "六月",
          enterpriseShowCalendarList: [
            {
              id: 1272203711522246651,
              enterpriseId: 1272913711522246658,
              enterpriseName: "亚森国际",
              startDate: "2020-06-18",
              endDate: "2020-06-21",
              showName: "亚森车品夏季展",
              mediaUrl:
                "https://img30.360buyimg.com/popWaterMark/jfs/t1/117113/35/8884/224865/5ed3b7eaE848717a8/bb3a27cfcac3a2e8.jpg",
              videoUrl: "",
              mediaTitle: "展会2",
              mediaType: 0,
              mediaDuration: "",
              provinceName: "北京",
              cityName: "北京",
              showFormat: 2
            }
          ]
        },
        {
          month: 7,
          monthDesc: "七月",
          enterpriseShowCalendarList: []
        },
        {
          month: 8,
          monthDesc: "八月",
          enterpriseShowCalendarList: []
        },
        {
          month: 9,
          monthDesc: "九月",
          enterpriseShowCalendarList: []
        },
        {
          month: 10,
          monthDesc: "十月",
          enterpriseShowCalendarList: []
        },
        {
          month: 11,
          monthDesc: "十一月",
          enterpriseShowCalendarList: []
        },
        {
          month: 12,
          monthDesc: "十二月",
          enterpriseShowCalendarList: []
        }
      ],
      itemList: {},

      col: 2,

      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 10,
      pageNum: 1
    };
  },

  computed: {},

  methods: {
    onClick(name, title) {
      console.log(name, title);
      this.itemList = this.details[name];
      // Toast(title);
    },

    scroll(scrollData) {
      console.log(scrollData);
    },
    switchCol(col) {
      this.col = col;
      console.log(this.col);
    },
    loadmore(index) {
      this.list = this.list.concat(this.list);
    },
    // 获取当前年
    doHandleYear(tYear) {
      var myDate = new Date();
      var tYear = myDate.getFullYear();

      return tYear;
    },

    // 查看公司简介
    handleToIntroduce() {
      this.$router.push({
        name: "home_introduce",
        query: {
          id: 1
        }
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
.home_calendar {
  .container-water-fall {
    .vue-waterfall-column {
      // background: green;
      width: 3.36rem !important;
      margin-right: 0.28rem;
      .cell-item {
        margin-bottom: 0.28rem;
      }
      img {
        width: 100%;
      }
      .item-desc {
        font-size: 0.28rem;
        color: rgba(49, 52, 55, 1);
        line-height: 0.44rem;
      }
      .like-total {
        font-size: 0.24rem;
        color: rgba(157, 161, 166, 1);
        line-height: 0.3rem;
        padding: 0.22rem 0;

        .status {
          float: right;
          padding: 0 0.03rem;
          font-size: 0.2rem;
          color: rgba(0, 0, 0, 1);
          line-height: 0.28rem;
          background: rgba(193, 232, 238, 1);
          border-radius: 0.08rem;
        }
        .status.style1 {
          background: rgba(223, 216, 247, 1);
        }
        .status.style2 {
          background: rgba(248, 213, 126, 1);
        }
      }
    }
    .vue-waterfall-column:last-child {
      margin-right: 0;
    }
  }
  .van-tabs {
    margin-bottom: 0.41rem;
  }
  .van-tabs--line .van-tabs__wrap {
    width: 100%;
  }
  .van-tab__pane,
  .van-tab__pane-wrapper {
    display: none;
  }
  .van-tab--active {
    color: #0091ff;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "../home.scss";
.home_calendar {
  .nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
  }
}
</style>

