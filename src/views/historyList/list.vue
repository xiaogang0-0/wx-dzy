// 历史记录
<template>
    <div class="historyList">
        <!-- 上拉刷新 -->
         <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="pullDisabled">
            <!-- 物料搜索 -->
            <van-row class="search">
                <van-col span="13">
                    <span class="tit">物料名称：</span>
                    <!-- <van-field
                        class="searchText"
                        v-model.trim="activeGoodsName.name"
                        center
                        clearable
                        @blur="goodShow = false"
                        @focus="handleGoogsSearch"
                        @input="handleGoogsSearch"
                        placeholder="请输入物料名称">
                    </van-field>  -->
                    <van-field
                        class="searchText"
                        v-model.trim="activeGoodsName.name"
                        center
                        clearable
                        @focus="handleGoogsSearch"
                        @input="handleGoogsSearch"
                        placeholder="请输入物料名称">
                    </van-field> 

                    <van-actionsheet
                        class="goodsSelect"
                        v-model="goodShow"
                        :actions="searchList"
                        :overlay="false"
                        cancel-text="取消"
                        @cancel="goodShow = false"
                        @select="handleGoodSelect"/>
                </van-col>
                
                <van-col span="11">
                    <span class="tit">规格：</span>
                    <van-field
                        class="searchText"
                        v-model="activeGoodsName.subname"
                        readonly
                        placeholder="规格"
                    />
                </van-col>
            </van-row>
            
            <van-row>
                <div class="activeData" @click="dataShow=true">{{activeData.name}}
                    <i class="icon iconfont iconsanjiaoxia"></i>
                </div>
                <van-actionsheet
                    v-model="dataShow"
                    :actions="dateList"
                    cancel-text="取消"
                    @cancel="dataShow=false"
                    @select="handeleDataSelect"/>

                <div class="activeText" v-show="average">{{activeData.name}}成交均价：<span class="red">{{average ? average+'元' :''}}</span></div>
            </van-row>

            <!-- 图表 -->
            <div class="echartsWrap">
                <div id="historyEcharts" class="historyEcharts" ref="historyEcharts"></div>
                <p class="echartsText">近{{activeData.id == 0 ? '一月' : activeData.name}}历史折线图</p>
                <img v-if="option.series[0].data.length == 0" src="@/assets/images/orderList/null.png" class="nullImg" alt="">
            </div>

            <p class="listTitle">历史确认报价明细</p>
            <ul class="thead">
                <li class="w24 pleft22">报价时间</li>
                <li class="w21">报价/元</li>
                <li class="w21">数量/KG</li>
                <li class="w10">包装</li>
                <li class="w24">账期</li>
            </ul>
            <!-- 占位图 -->
            <img v-if="questionList.length == 0" src="@/assets/images/orderList/null.png" class="nullImg" alt="">
            <!-- 列表内容 -->
            <div class="content" v-else>
                <!-- 列表 -->
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <div class="listItem" v-for="(item,index) in questionList" :key="index">
                        <div class="title">
                            <span class="w24">{{item.createTime ? item.createTime.substring(0,10) : ''}}</span>
                            <span class="w21">{{item.quotationPrice ?parseFloat(item.quotationPrice) : ''}}</span>
                            <span class="w21">{{item.quotationQuantity ? parseFloat(item.quotationQuantity) : ''}}</span>
                            <span class="w10">{{item.quotationPack}}</span>
                            <span class="w24">{{item.expectedAccountPeriod}}</span>
                        </div>
                        <div class="address">
                            <span class="tit">供应商：</span>
                            <span class="text">{{item.simpleName}}</span>
                        </div>
                        <div class="address">
                            <span class="tit">采购商地址：</span>
                            <span class="text">{{item.provinceName}}{{item.cityName}}{{item.townName}}</span>
                        </div>
                    </div>
                </van-list>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
// import moment from 'moment';
// import { mapGetters } from 'vuex';
// import { setTimeout } from 'timers';
import { util } from '@/utils';
import * as Api from './api';
import echarts from 'echarts';


export default {
    name: 'historyList',
    components: {},
    data () {
        return {
            // 下拉刷新禁用
            pullDisabled:true,
            // 模糊搜索定时器管理
            timeout:'0',
            // 物料搜索开关
            goodShow:false,
            // 物料搜索列表
            searchList:[
                // {
                    // name: item.productName,
                    // subname: item.specs,
                    // goodsId:item.goodsId,
                    // goodsName:item.goodsName,
                    // productId:item.productId,
                    // sn:item.sn,
                // }
            ],
            // 物料選中
            activeGoodsName:{},
            // 时间段选择开关
            dataShow: false,
            // 时间段选择列表
            dateList: [
                {
                    name: '一个月内',
                    id:'1'
                },
                {
                    name: '三个月内',
                    id:'3'
                },
                {
                    name: '六个月内',
                    id:'6'
                },
                {
                    name: '一年内',
                    id:'12'
                }
            ],
            // 时间段选中
            activeData:{
                name: '一个月内',
                id:'1'
            },
            pageNum:1, // 页码
            pageSize: 10, // 页大小
            // 成交均價
            average:'',
            // 折線圖表
            option: {
                grid: {
                    top:'10%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                    border:'none',
                    show:'true',
                    borderWidth:'0'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    // data: ['周一','周二','周三','周四','周五','周六','周日'],
                    axisLine:{
                        show:false,  //是否显示x轴 默认为true
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine:{
                        lineStyle:{ //lineStyle里面写y轴那一条线的样式
                          color:'#656565',
                          width:0,    //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
                        }
                    },
                },
                series: [{
                    // data: [100, 932, 901, 934, 1290, 1330, 1320],
                    data: [],
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#17CE10'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#17CE10'
                            }, {
                                offset: 1,
                                color: '#ffe'
                            }])
                        }
                    },
                }]
            },
            // 當前選的時間段
            timeSlot:{},
            
            // 上拉刷新
            isLoading:false,
            // 懒加载
            loading: false,
            // 全部完成加載
            finished: false,
            // 渲染列表
            questionList: [],
        }
    },

    methods: {
        // init  调用函数 获取搜索信息
        init(statu){
             if(!this.activeGoodsName.productId){
                // util.warning('物料名称，以及规格不能为空');
                this.$toast('物料名称，以及规格不能为空');
                // 禁用下拉刷新
                this.pullDisabled = true;
                return 
            }
            // 下拉刷新可用
            this.pullDisabled = false;
            this.questionList=[];
            this.pageNum= 1;
            // 物料立式报价折线图
            let params0 = {
                productId:this.activeGoodsName.productId, // 物料规格id	
                startTime:this.timeSlot.start,// 开始时间	
                endTime:this.timeSlot.end, // 结束时间
            };
            // 物料历史报价分页列表
            let params1 = {
                productId:this.activeGoodsName.productId,    // 物料规格ID
                startTime:this.timeSlot.start,      // 报价时间－开始时间	
                endTime:this.timeSlot.end,          // 报价时间－截止时间
                pageNum:this.pageNum,       // 页码
                pageSize: this.pageSize,    // 页大小
                inquiryCode:'',             // 询价单号
            }
            // 获取折线图数据
            this.handleChartList(params0);
            // 获取报价历史列表
            this.handleDetailedlist(params1,statu);

        },
        // 获取折线图数据
        handleChartList(params) {
            util.showLoading();
            Api.getChartList(params).then(res=>{
                util.hideLoading();
                if(res.code ==200){
                    this.option.series[0].data = res.rows;
                    this.average = res.average;
                    // 云图初始化
                    this.initPrepareLessonPie();
                }
                
            }).catch(error=>{
                console.log(error)
                util.hideLoading();
            })
        },

        //云图初始化  
        initPrepareLessonPie () {
            // let dom = document.getElementById("historyEcharts");
            let myChart = echarts.init(this.$refs.historyEcharts);
            myChart.setOption(this.option, true);
            //初始化canvas
            // myChart.resize();
        },

        // 模糊搜索
        handleGoogsSearch(){
            if(this.activeGoodsName.name == ""){
                this.activeGoodsName={};
                this.goodShow = false;
                return
            }
            // 禁用下拉刷新
            this.pullDisabled = true;
            // 清空選中的 物料id
            this.activeGoodsName.productId = ''
            // 清空選中的 規格            
            this.activeGoodsName.subname = '';
            // 清空列表显示loading
            this.searchList=[{loading: true }];

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.goodShow = true;
                let params ={
                    method: "searchlist",
                    wd: this.activeGoodsName.name,
                    pageNo: 1,
                    pageSize: 999
                };
                this.$jsonp('http://platform.hlwl.com:8181/hlwlsearch', params).then(res => {
                    if(res.code == 0){
                        let list =[];
                        if(!res.data.productList.length){
                            // util.warning('暂无数据')
                            list.push(
                                {
                                    name: '暂无数据',
                                    disabled: true
                                }
                            )
                        }else{
                            res.data.productList.forEach(item => {
                                list.push({
                                    name: item.productName,
                                    subname: item.specs,
                                    goodsId:item.goodsId,
                                    goodsName:item.goodsName,
                                    productId:item.productId,
                                    sn:item.sn,
                                })
                            });
                        }
                        this.searchList = list;
                    }
                })
                .catch(error => {
                    this.goodShow = false;
                    util.hideLoading();
                    console.log(error);
                })
            }, 800);
        },
       
        // 物料选中
        handleGoodSelect(item){
            this.activeGoodsName=item;
            this.goodShow = false;
            // 请求两组列表数据
            this.init();
        },

        // 时间段选择
        handeleDataSelect(item) {
            this.activeData=item;
            this.dataShow = false;
            // 記錄 處理過的時間段 
            this.timeSlot = this.getToday(this.activeData.id)
            // 请求两组列表数据
            this.init();
        },

        // 懒加载请求加载列表
        onLoad() {
            this.pageNum++;
            // 物料历史报价分页列表
            let params1 = {
                "productId":this.activeGoodsName.productId,    // 物料规格ID
                "startTime":this.timeSlot.start,      // 报价时间－开始时间	
                "endTime":this.timeSlot.end,          // 报价时间－截止时间
                "pageNum":this.pageNum,       // 页码
                "pageSize": this.pageSize,    // 页大小
                "inquiryCode":'',             // 询价单号
            }
            // 获取报价历史列表
            this.handleDetailedlist(params1);
        },
        // 上拉刷新
        onRefresh() {
            this.finished = false;
            //參數1 為 上拉刷新
            this.init(1)
        },

        // 获取报价历史列表  请求参数 params status{1:上拉刷新，2：正常请求}
        handleDetailedlist(params, statu){
            // console.log(params,'handleDetailedlist')
            let status = statu ? statu : 2;  // 默认正常请求
            Api.getDetailedlist(params).then(res=>{
                util.hideLoading();
                if(res.code ==200){
                    // 加载状态结束
                    this.loading = false;
                    this.finished = false;
                    if(status ==1){
                        // 上拉刷新
                        this.isLoading = false;
                        this.questionList = res.rows;
                        this.$toast('刷新成功');
                    }else{
                        res.rows.forEach(element => {
                            this.questionList.push(element);
                        });
                    }
                    // 数据全部加载完成
                    if (res.rows.length < this.pageSize) {
                        // console.log(res.rows.length , this.pageSize,'res.rows.length < this.pageSize')
                        this.finished = true;
                    }
                    // console.log(this.questionList,'列表')
                }
            }).catch(error=>{
                console.log(error)
                util.hideLoading();
            })
        },

        // 当前日期
        getToday(monthNum) {
            let date=new Date();
            let year=date.getFullYear();
            let month=(date.getMonth()+1)>10?date.getMonth()+1 :'0'+(date.getMonth()+1);
            let day=date.getDate()>9?date.getDate():'0'+date.getDate();
            // 当前日期(今天)
            let nowdatestr=year+"-"+month+"-"+day;
            return this.getPreMonthDay(nowdatestr,monthNum)
        },

        //获取当前日期前N个月的日期
        getPreMonthDay(date,monthNum){
            let dateArr = date.split('-');
            let year = dateArr[0]; //获取当前日期的年份
            let month = dateArr[1]; //获取当前日期的月份
            let day = dateArr[2]; //获取当前日期的日
            let days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数
            let year2 = year;
            let month2 = parseInt(month) - monthNum;

            if (month2 <=0) {
                year2 = parseInt(year2) - 1;
                month2 = 12 - (Math.abs(month2) % 12);
            }
            let day2 = day;
            if(monthNum==0){
                day2 = 1;
            }
            let days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            if (day2 < 10) {
                day2 = '0' + day2*1;
            }
            let t2 = year2 + '-' + month2 + '-' + day2 + ' 00:00:00';
            date = date + ' 23:59:59'
            return {
                start:t2,
                end:date
                };
        },
    },

    computed: {},

    created() {
        // 處理默認的 時間段 
        this.timeSlot = this.getToday(this.activeData.id)
    },

    mounted() {
        this.$nextTick().then(() => {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        });
    },
}
</script>

<style lang="scss" scoped>
    @import '@/assets/styles/base/calc_vm.scss';
    @import './list.scss';
</style>


