// 展会日历
<template>
  <div class="home_calendar">
    <div v-if="details.id">
      222
      <van-divider dashed>
        <span class="bot_text">这里展会信息真的很多</span>
      </van-divider>
    </div>
    <img v-else src="@/assets/images/orderList/null.png" class="nullImg" alt />

    <div class="container-water-fall">
      <div>
        <button @click="loadmore">loadmore</button>
        <button @click="mix">mix</button>
        <button @click="switchCol('5')">5列</button>
        <button @click="switchCol('8')">8列</button>
        <button @click="switchCol('10')">10列</button>
      </div>

      <waterfall
        :col="col"
        width="50%"
        gutterWidth="50%"
        :data="data"
        @loadmore="loadmore"
        @scroll="scroll"
      >
        <template>
          <div class="cell-item" v-for="(item,index) in data">
            <img v-if="item.img" :src="item.img" alt="加载错误" />
            <div class="item-body">
              <div class="item-desc">{{item.title}}</div>
              <div class="item-footer">
                <div class="avatar" :style="{backgroundImage : `url(${item.avatar})` }"></div>
                <div class="name">{{item.user}}</div>
                <div class="like" :class="item.liked ?'active' :''">
                  <i></i>
                  <div class="like-total">{{item.liked}}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </waterfall>
    </div>

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
      data: [
        {
          img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          title: '标题1',
          imavatarg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          user: '用户1',
          liked: 'liked1'
        },
        {
          img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          title: '标题1',
          imavatarg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          user: '用户1',
          liked: 'liked1'
        },
        {
          img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          title: '标题1',
          imavatarg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592312719436&di=a174ad3a0041a8649adb737b7e66816f&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4006718874%2C3505974745%26fm%3D214%26gp%3D0.jpg",
          user: '用户1',
          liked: 'liked1'
        }
      ],
      col: 2,
      details: {
        id: "1"
      }
      // loading: false,
      // finished: false,
      // refreshing: false,
      // pageSize: 10,
      // pageNum: 1
    };
  },

  computed: {
    itemWidth() {
      return 50 * (document.documentElement.clientWidth / 750); //#rem布局 计算宽度
    },
    gutterWidth() {
      return 9 * 0.5 * (document.documentElement.clientWidth / 750); // #rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
    }
  },

  methods: {
    scroll(scrollData) {
      console.log(scrollData);
    },
    switchCol(col) {
      this.col = col;
      console.log(this.col);
    },
    loadmore(index) {
      this.data = this.data.concat(this.data);
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
        inquiryCode: this.searchText, // 询价单号
        status: this.status, // 询价单状态，2待报价，3已报价，4已超时，5已完成
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize, // 每页几条数据
        startTime: "", // 开始时间
        operator: "", // 操作人
        productId: ""
      };
      // console.log(params,'onSearch')
      this.onsubmt(params);
    },

    // 懒加载请求加载列表
    onLoad() {
      this.pageNum++;
      let params = {
        inquiryCode: this.searchText, // 询价单号
        status: this.status, // 询价单状态，2待报价，3已报价，4已超时，5已完成
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize, // 每页几条数据
        startTime: "", // 开始时间
        operator: "", // 操作人
        productId: ""
      };
      // console.log(params,'onLoad')
      this.onsubmt(params);
    },

    // 上拉刷新
    onRefresh() {
      this.finished = false;
      this.pageNum = 1;
      let params = {
        inquiryCode: this.searchText, // 询价单号
        status: this.status, // 询价单状态，2待报价，3已报价，4已超时，5已完成
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize, // 每页几条数据
        startTime: "", // 开始时间
        operator: "", // 操作人
        productId: ""
      };
      this.onsubmt(params, 1);
    },

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

    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },

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
.home_calendar {
  .nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
  }
}
</style>

