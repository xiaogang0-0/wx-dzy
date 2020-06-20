// 已报价
<template>
    <div class="toBeQuoted">
        <div class="search">
            <van-field
                v-model.trim="searchText"
                center
                clearable
                placeholder="请输入询价单号">
                <van-button slot="button" size="small" type="default" @click="onSearch">搜索</van-button>
            </van-field> 
        </div>
        <!-- 占位图 -->
        <img v-if="!questionList.length" src="@/assets/images/orderList/null.png" class="nullImg" alt="">

        <!-- 列表内容 -->
        <div class="content"  v-else>
            <!-- 上拉刷新 -->
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <!-- 列表 -->
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <div class="listItem" 
                        v-for="(item,index) in questionList" 
                        :key="index" 
                        :data-id="item.inquiryId"
                        @click="handleLook(item.inquiryId)">
                        <!-- {{index+1}} -->
                        <div class="title">
                            <i class="icon iconfont iconlist"></i>
                            <span>询价单号：</span>{{item.inquiryCode}}
                            <!-- <span class="titleIco" v-if="1">议价中</span> -->
                        </div>
                        <ul class="list">
                            <li class="w270">
                                <span>询价单类型：</span>
                                <span class="red" v-if="item.managerInquiryType == 1">紧急询价</span>
                                <span v-else>普通询价</span>
                            </li>
                            <li class="">
                                <span>询价开始时间：</span>
                                <span>{{item.inquiryStartTime}}</span>
                            </li>
                            <li class="w270">
                                <span>商品数量：</span>
                                <span>{{ item.productCount ? item.productCount+'件' : ''}}</span>
                            </li>
                            <li class="">
                                <span>询价截止时间：</span>
                                <span>{{item.quotationEndTime}}</span>
                            </li>
                            <li class="" v-if="status[0]==2">
                                <span>供应商推送情况：</span>
                                <span>{{item.pushDesc}}</span>
                            </li>
                        </ul>

                    </div>
                </van-list>
         </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import { util } from '@/utils';
import * as Api from '../api';

// import moment from 'moment';
// import { mapGetters } from 'vuex';

export default {
    name: 'toBeQuoted',
    components: {
    },
    data () {
        return {
            // 上拉刷新
            isLoading:false,
            // 懒加载
            loading: false,
            finished: false,
            // 搜索
            searchText:'',
            // 渲染列表
            questionList: [
                // {
                //     inquiryId:1111,	// 询价单id	
                //     inquiryCode:'xjd11111111',	// 询价单编码	
                //     pushDesc:'已推送供应商', // 供应商推送情况	
                //     quotationEndTime:'2018-02-01 12:00:00', // 询价结束时间	
                //     inquiryStartTime:'2019-03-01 14:11:08', // 询价开始时间	
                //     status:2, //状态	
                //     operator:'',
                //     operateTime:'',
                //     managerInquiryType:'1',// 询价单类型，1紧急，2普通	
                //     productCount:'111',  // 物料数量
                // }
            ],
            // 询价单状态，2待报价，3已报价，4已超时，5已完成
            status:[3],
            pageSize: 10,
            pageNum:1
        }
    },

    methods: {
        // 搜索
        onSearch(){
            this.questionList=[];
            this.pageNum= 1;
            let params = {
                inquiryCode:this.searchText,  // 询价单号	
                status:this.status,  // 询价单状态，2待报价，3已报价，4已超时，5已完成
                pageNum:this.pageNum,  // 页数
                pageSize:this.pageSize,  // 每页几条数据
                startTime:'',	 // 开始时间
                operator:'', // 操作人
                productId:'',	
            };
            // console.log(params,'onSearch')
            this.onsubmt(params)
        },

        // 懒加载请求加载列表
        onLoad() {
            this.pageNum++;
            let params = {
                inquiryCode:this.searchText,  // 询价单号	
                status:this.status,  // 询价单状态，2待报价，3已报价，4已超时，5已完成
                pageNum:this.pageNum,  // 页数
                pageSize:this.pageSize,  // 每页几条数据
                startTime:'',	 // 开始时间
                operator:'', // 操作人
                productId:'',	
            };
            // console.log(params,'onLoad')
            this.onsubmt(params)
        },

        // 上拉刷新
        onRefresh() {
            this.finished = false;
            this.pageNum =1;
            let params = {
                inquiryCode:this.searchText,  // 询价单号	
                status:this.status,  // 询价单状态，2待报价，3已报价，4已超时，5已完成
                pageNum:this.pageNum,  // 页数
                pageSize:this.pageSize,  // 每页几条数据
                startTime:'',	 // 开始时间
                operator:'', // 操作人
                productId:'',	
            };
            this.onsubmt(params,1)
        },

        // 请求参数 params status{1:上拉刷新，2：正常请求}
        onsubmt(params,statu){
            let status = statu ? statu : 2;  // 默认正常请求
            Api.quotationList(params)
            .then(res => {
                let {rows,total} = res;
                // console.log(rows,rows.length,'rows,rows.length')
                // if (rows.length) {
                    // 加载状态结束
                    this.loading = false;
                    
                    if(status ==1){
                        // 上拉刷新
                        this.isLoading = false;
                        this.questionList = rows;
                        this.$toast('刷新成功');
                    }else{
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
                this.isLoading=false;
                console.log(err,'err');
            });

        },

        // 查看详情
        handleLook(_id){
            this.$router.push({
                name:'toBeQuotedDetails',
                query:{
                    inquiryId:_id,
                }
            })
        }
    },

    computed: {
    },

    created() {
        
        // util.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaGx3bC1wbGF0Zm9ybS1yZXNvdXJjZS1pZCJdLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJwYXJlbnRVc2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTY5Mzk5MzE1LCJ1c2VySWQiOjEwMDksImF1dGhvcml0aWVzIjpbIjQ2NjNkMTkyLWI4N2ItNDhkMi04MzMwLWFkNTBhYWFiMjg1YiIsIi91c2VyL3N5cy91c2VyL3BhZ2UiLCJiNzVkNzA3ZS1hNDAxLTRiZDEtYWMzNC1jMTNiYWMwMjNlODEiLCJST0xFX1VTRVIiLCIvdXNlci9zeXMvcm9sZS9wYWdlIiwicmZxOnF1b3RhdGlvbjptYW5hZ2U6cGFnZSIsIi9yZnEvcXVvdGF0aW9uL21hbmFnZS9wYWdlIiwic3lzOnVzZXI6YWxsIiwic3lzOnJvbGU6cGFnZSIsIjQyZjQ4MDNkLTkzMDEtNDAxMy05YTk2LTIxYTdjZmFlNDUzNSJdLCJqdGkiOiI3ZWEyMDYxMS03YTVkLTQzOWMtYTkyNS1kOTdlZmI5YWI0NGMiLCJwYXJlbnRJZCI6MTAwOSwiY2xpZW50X2lkIjoiaGx3bC1wbGF0Zm9ybS1yZXNvdXJjZSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.JPh7Fk-nFOzEQMBP-kqIASze6D0aaToxfslFTeZWOHw')
        // 默认刷新列表
        this.onSearch();
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
    @import '../../../assets/styles/base/calc_vm.scss';
    @import './toBeQuoted.scss';
</style>

<style lang="scss">

</style>




