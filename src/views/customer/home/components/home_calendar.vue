// 展会日历
<template>
  <div class="home_calendar">
    <div v-if="details.id">222</div>
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
          finished-text="----- 这里展会信息真的很多 -----"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          class="contentList"
        >
          <div class="container-water-fall">
            <waterfall
              :col="col"
              :data="list"
              @loadmore="loadmore"
              @scroll="scroll"
              :lazyDistance="50"
            >
              <template>
                <div class="cell-item" v-for="(item,index) in list" :key="index">
                  <img v-if="item.img" :src="item.img" alt="加载错误" />
                  <div class="item-body">
                    <div class="item-desc">{{item.title}}</div>
                    <div class="item-footer">
                      <div class="name">{{item.timer}}</div>
                      <div class="like" :class="item.liked ?'active' :''">
                        <i></i>
                        <div class="like-total">
                          地点：{{item.liked}}
                          <span class="icon">{{ '仅线下' || '仅线上' || '线上/线下'}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </waterfall>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <!-- <van-divider dashed>
      <span class="bot_text">这里展会信息真的很多</span>
    </van-divider>-->

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
      list: [
        {
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          title: "亚森车品春季展2",
          timer: "06.23-06.30",
          imavatarg:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          liked: "北京"
        },
        {
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          title: "亚森车品春季展1",
          timer: "06.23-06.30",
          imavatarg:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          liked: "上海"
        },
        {
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592655275421&di=6d40b74106bd65c8bec3381e20b52d38&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg",
          title: "亚森车品春季展",
          timer: "06.23-06.30",
          imavatarg:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          liked: "天津"
        }
      ],
      col: 2,
      details: {
        id: "1"
      },
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 10,
      pageNum: 1
    };
  },

  computed: {},

  methods: {
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
    },


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
    }
    .vue-waterfall-column:last-child {
      margin-right: 0;
    }
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

