// 待报价详情
<template>
    
    <div class="toBeQuotedDetails">
        <!-- 上拉刷新 -->
         <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="min-height:96vh;" :disabled="pullDisabled">
            <!-- 占位图 -->
            <div class="nullBox" v-show="!quotationDetail.inquiryId">
                <img src="@/assets/images/orderList/null.png" class="nullImg" alt="">
            </div>

            <div v-show="quotationDetail.inquiryId">
                <div class="inquiryHead bg" :data-id="quotationDetail.inquiryCode">
                    <div class="title">
                        <i class="icon iconfont iconlist"></i>
                        询价单号：<span>{{quotationDetail.inquiryCode}}</span>
                    </div>
                    <ul class="list">
                        <li>询价开始时间：
                            <span class="text">{{quotationDetail.startTime}}</span>
                        </li>
                        <li>期望账期：
                            <span class="text">{{quotationDetail.accountPeriodType}}{{quotationDetail.expectedAccountPeriod ? quotationDetail.expectedAccountPeriod+'天'  : ''}}</span>
                        </li>
                        <li>询价截止时间：
                            <span class="text red">{{quotationDetail.endTime}}</span>
                        </li>
                        <li>付款方式：
                            <span class="text">{{quotationDetail.paymentType}}</span>
                        </li>
                        <li>质量标准：
                            <span class="text">{{quotationDetail.standardName}}</span>
                        </li>
                        <li>询价备注：
                            <span class="text">{{quotationDetail.remark}}</span>
                        </li>
                        <li>收货地址：
                            <span class="text">{{quotationDetail.provinceName}}{{quotationDetail.cityName}}{{quotationDetail.townName}}</span>
                        </li>
                        <li>包装要求：
                            <span class="text">{{quotationDetail.packRequire}}</span>
                        </li>
                    </ul>
                </div>


                <!-- 物料列表 -->
                <ul class="goodList">
                    <li class="goodItem bg" v-for="(item,index) in quotationDetail.goodsInfoList" :key="index" :data-code="item.goodsCode">
                        <div class="tit">
                            物料名称：<span class="blue">{{item.goodsName}}</span>
                            <span class="lookBtn blue fr" 
                                v-show="(quotationDetail.inquiryStatus ==5 || quotationDetail.inquiryStatus ==4) ? false : true"
                                @click="handleDetailedHistory(item.productId)">历史价格详情</span>
                        </div>
                    
                        <ol class="list">
                            <li class="w281">询价数量：
                                <span class="text">{{item.quantity}}{{item.unit}}</span>
                            </li>
                            <li class="w209">询价意向价：
                                <span class="text">{{item.intentionPrice ? item.intentionPrice + '元' : ''}}</span>
                            </li>
                            <li class="">规格：
                                <span class="text">{{item.specification}}</span>
                            </li>
                            <li class="w100">规格要求：
                                <span class="text">{{item.specificationRequire}}</span>
                            </li>
                            <li class="w100">询价备注：
                                <span class="text">{{item.remark}}</span>
                            </li>
                        </ol>

                        <div class="inquiryTable">
                            <div class="thead tr">
                                <span class="td w25"></span>
                                <span class="td w225">报价/元</span>
                                <span class="td w225">数量/KG</span>
                                <span class="td w16">包装</span>
                                <span class="td w14"></span>
                            </div>
                            
                            <div class="tbody" v-if="item.quotationOrderItems.length && !item.is_Null">
                                <van-radio-group v-model="item.custom_selectAll"  
                                    class="tr" 
                                    v-for="(tableItem, i) in item.quotationOrderItems" 
                                    :key="i" 
                                    v-show="(quotationDetail.inquiryStatus ==3 || quotationDetail.inquiryStatus ==5)  ? ( i != item.custom_selectAll ? false :true ) : true">
                                    <div class="bgf8">
                                        <span class="td w25">
                                            <van-radio 
                                            :name="i" 
                                            v-if="tableItem.refuseType!='' ? false : true" 
                                            :disabled="!quotationDetail.editable">{{tableItem.vendorName ?tableItem.vendorName.substring(0,5) : ''}}</van-radio>
                                            <span v-else>{{tableItem.vendorName ? tableItem.vendorName.substring(0,5) : ''}}</span>
                                        </span>
                                        <span class="td w225">{{tableItem.price ? parseFloat(tableItem.price) +'元' : ''}}</span>
                                        <span class="td w225">{{parseFloat(tableItem.quotationQuantity)}}{{tableItem.quotationQuantity ? tableItem.quotationUnit : ''}}</span>
                                        <span class="td w16">{{tableItem.pack}}</span>
                                        <span class="td w14 blue" 
                                            
                                            v-show="(quotationDetail.inquiryStatus ==5 || quotationDetail.inquiryStatus ==4) ? false : true"
                                            v-if="quotationDetail.inquiryStatus !=4 && quotationDetail.inquiryStatus !=5 && (tableItem.bargainingStatus ==2 || tableItem.bargainingStatus == 0) && (tableItem.refuseType!='' ? false : true)" @click="handlebargaininModal(tableItem)">议价</span>
                                        <span class="td w14 red" 
                                            v-show="(quotationDetail.inquiryStatus ==5 || quotationDetail.inquiryStatus ==4) ? false : true" 
                                            v-if="quotationDetail.inquiryStatus !=4 && quotationDetail.inquiryStatus !=5 && tableItem.bargainingStatus ==1 && (tableItem.refuseType!='' ? false : true)" @click="handlebargaininModal(tableItem)">议价中</span>
                                    </div>
                                   
                                    <van-field
                                        v-model="tableItem.remarks"
                                        clearable
                                        label-width="1rem"
                                        label="备注："
                                        maxLength="20"
                                        placeholder="输入备注信息"
                                        type="textarea"
                                        rows="1"
                                        autosize
                                        :disabled="!quotationDetail.editable"
                                        v-if="!tableItem.refuseType"
                                    />
                                    <div class="pd20" v-else>不报价原因：<span class="inlinblock">{{tableItem.refuseType}}{{tableItem.refuseReason}}</span></div>
                                    <div class="textRight pd20">交期/天 <span class="red">{{tableItem.estimateDeliverDays}}</span>&nbsp;&nbsp;&nbsp;报价有效期/天 <span class="red">{{tableItem.expiryDays}}</span></div>
                                </van-radio-group>

                            </div>
                           
                            <!-- 占位 -->
                            <div class="nullList" v-else>暂无数据</div>
                            
                        </div>
                    </li>
                </ul>

                <van-button 
                    type="danger" 
                    v-if="quotationDetail.editable"
                    @click="handleSubmitClick"
                    class="subBtn">提&nbsp;&nbsp;交
                </van-button>


                <!-- 历史价格弹窗 -->
                <van-dialog
                    v-model="showDetailedHistory"
                    :showConfirmButton="false"
                    :closeOnClickOverlay="true"
                    className="detailedHistory"
                    >
                    <div class="title" >
                        <img :src="icoImg" alt="" class="iconhistoricalprice">
                        {{historyListItem[0] ? historyListItem[0].goodsName +'历史提交报价明细':''}}
                    </div>
                    <div class="thead">
                        <span class="td w30">提交时间</span>
                        <span class="td w30">提交报价/元</span>
                        <span class="td w25">数量kg</span>
                        <span class="td w15">包装</span>
                    </div>
                    <ul class="tbody">
                        <li class="tr" v-for="(item , index) in historyListItem" :key="index">
                            <span class="td w30">{{item.createTime ? item.createTime.substring(0,10) : ''}}</span>
                            <span class="td w30">{{item.quotationPrice ?parseFloat(item.quotationPrice) : ''}}</span>
                            <span class="td w25">{{item.quotationQuantity ? parseFloat(item.quotationQuantity) : ''}}</span>
                            <span class="td w15">{{item.quotationPack}}</span>
                        </li>
                    </ul>
                    <i class="icon iconfont iconclose" @click="showDetailedHistory=false"></i>
                </van-dialog>

                <!-- 议价弹窗 -->
                <van-dialog
                    v-model="showBargaining"
                    :showConfirmButton="false"
                    :closeOnClickOverlay="true"
                    className="showBargaining"
                    >
                    <div class="title" >剩余议价次数：<span class="red">{{bargainingListItem.bargainingTimesTotal*1 - bargainingListItem.bargainingTimes*1}}</span></div>
                    <div class="tabWrap">
                        <table border="0" cellspacing="0" cellpadding="0">
                            <tr class="thead">
                                <td class="w7">次数</td>
                                <td class="w33">议价时间</td>
                                <td class="w24">平台数量/kg</td>
                                <td class="w18">平台价格/元</td>
                                <td class="w18">报价/元</td>
                            </tr>
                            <tbody class="tbody">
                                <tr v-for= "(item,index) in bargainingListItem.quotationBargainingList" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{item.bargainingTime.substring(0,16)}}</td>
                                    <td> {{item.bargainingQuantity}}</td>
                                    <td> {{item.bargainingPrice}}</td>
                                    <!-- 推送地推 -->
                                    <td class="blue"
                                        v-if="quotationDetail.inquiryStatus==3 && item.status == 1  && item.isSend !=1" 
                                        @click="handeleSendNotice(item)"> 
                                        <span v-if="item.status == 2">不议价</span>
                                        <span v-else>{{item.quoteAgainPrice}}</span>
                                    </td>
                                    <td v-else> 
                                        <span v-if="item.status == 2">不议价</span>
                                        <span v-else>{{item.quoteAgainPrice}}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="footNum">
                        平台数量：<input 
                                    type="number" 
                                    :disabled="(bargainingListItem.bargainingStatus == 1 ? true : false) || ((bargainingListItem.bargainingTimesTotal*1 - bargainingListItem.bargainingTimes*1) == 0 ? true : false)"
                                    v-model.trim="bargainingListItem.quotationQuantity">&nbsp;&nbsp;
                        平台价格：<input 
                                    type="number" 
                                    :disabled="(bargainingListItem.bargainingStatus == 1 ? true : false) || ((bargainingListItem.bargainingTimesTotal*1 - bargainingListItem.bargainingTimes*1) == 0 ? true : false)"
                                    v-model.trim="bargainingListItem.price">
                    </div>

                    <van-button 
                        type="info" 
                        :disabled="(bargainingListItem.bargainingStatus == 1 ? true : false) || ((bargainingListItem.bargainingTimesTotal*1 - bargainingListItem.bargainingTimes*1) == 0 ? true : false)"
                        loading-text="提交中..." 
                        block  
                        class="subBtn" 
                        :loading="BargainingLoading"  

                        @click="handleBargaining">提 交</van-button>

                    <i class="icon iconfont iconclose" @click="showBargaining=false"></i>
                </van-dialog>
            </div>
        </van-pull-refresh>
     
    </div>
</template>

<script>
import { util } from '@/utils';
import * as Api from '../api';
import { mapGetters } from 'vuex';
import icoImg from '@/assets/images/orderList/iconhistoricalprice.png';
import { setTimeout } from 'timers';
import { Dialog } from 'vant';

export default {
    name: 'toBeQuotedDetails',
    components: {
       
    },
    data () {
        return {
            // 询价单id
            inquiryId:'',
            // 询价单信息
            quotationDetail:{},
            icoImg:icoImg,
            // 上拉刷新
            isLoading:false,
            // 历史明细弹窗
            showDetailedHistory:false,
            // 历史价格详情列表本地存储
            historyList:{
                // 393:[{
                //     "goodsName":"枸杞子",
                //     "quotationSpecification":"统货",
                //     "quotationPrice":"66.0000",
                //     "quotationQuantity":"200.0000",
                //     "quotationUnit":"kg",
                //     "createTime":"2019-08-15 14:02:40",
                //     "inquiryId":1157,
                //     "inquiryCode":"SX190815174426",
                //     "simpleName":"顺和堂",
                //     "provinceName":"北京",
                //     "cityName":"北京市",
                //     "townName":"东城区",
                //     "paymentType":"电汇"
                //     ,"otherPaymentType":"",
                //     "expectedAccountPeriod":"30",
                //     "quotationPack":"编织袋"}
                //     ]
            },
            // 历史价格详情列表当前展示
            historyListItem:[],
            // 议价列表当前展示
            bargainingListItem:{},
            // 议价弹窗
            showBargaining:false,
            // 议价提交按钮login
            BargainingLoading:false,
            // 上拉刷新禁用
            pullDisabled:false,
            // 
            radio:'1',

        }
    },

    methods: {

        // 请求询价单信息 参数 params status{1:上拉刷新，不传为正常获取}
        getList(status){
            let params = {
                inquiryId:this.inquiryId
            };
            util.showLoading();
            Api.quotationDetail(params)
            .then(res => {
                util.hideLoading();
                if(status==1){
                    this.$toast('刷新成功');
                    this.isLoading = false;
                }
                // 数据处理函数
                this.handleDataProcessing(res.data)
                // this.quotationDetail = res.data;
            })
            .catch(err=>{
                // 上拉刷新
                this.isLoading=false;
                util.hideLoading();
                console.log(err)
            })
        },

        // 上拉刷新
        onRefresh() {
            //參數1 為 上拉刷新
            this.getList(1);
        },
        
        // 查看历史详情弹窗
        handleDetailedHistory(productId){
            this.historyListItem=[];
            // console.log(productId,'productId')
            if(this.historyList[productId]){
                this.historyListItem = this.historyList[productId];
                // 打开弹窗
                this.showDetailedHistory= true;
                return
            }
            let params = {
                "productId":productId,    // 物料规格ID
                "startTime":'',      // 报价时间－开始时间	
                "endTime":'',          // 报价时间－截止时间
                "pageNum":1,       // 页码
                "pageSize": 10,    // 页大小
                "inquiryCode":'',             // 询价单号
            }
            util.showLoading();
            Api.getDetailedlist(params).then(res=>{
                util.hideLoading();
                if(res.code ==200){
                    if(res.rows.length){
                        // 本地保存
                        this.historyList[productId] = res.rows;
                        // 给显示的赋值
                        this.historyListItem = this.historyList[productId];
                        // 打开弹窗
                        this.showDetailedHistory= true;
                    }else{
                        // this.$toast('暂无该物料历史数据');
                        util.error('暂无该物料历史数据')
                        // util.success('暂无该物料历史数据')
                    }
                }
            }).catch(error=>{
                util.hideLoading();
                // util.error(error.msg);
                console.log(error)
                
            })
        },

        // 议价弹窗
        handlebargaininModal(itemData){
            this.bargainingListItem = {};
            // 给显示的数据赋值
            // this.bargainingListItem = itemData;
            this.bargainingListItem = Object.assign({},itemData);

            // 打开弹窗
            this.showBargaining= true;
        },
        
        // 议价点击事件
        handleBargaining(){
            if(!this.bargainingListItem.quotationQuantity || !this.bargainingListItem.price){
                return util.error('提交失败！平台数量、平台价格 必须大于零');
            }
            // 提交中
            this.BargainingLoading = true;
            let parmam ={
                "inquiryId": this.quotationDetail.inquiryId,
                "inquiryStatus":this.quotationDetail.inquiryStatus,
                "quotationId": this.bargainingListItem.quotationId,
                "quotationItemId": this.bargainingListItem.itemId,
                "quotationItemSubId":this.bargainingListItem.quotationItemSubId,
                "bargainingQuantity": this.bargainingListItem.quotationQuantity,
                "bargainingPrice": this.bargainingListItem.price,
            };
            Api.submintBargaining(parmam).then(res => {
                if (res.code == 200) {
                    // 关闭加载按钮
                    this.BargainingLoading = false;
                    // 关闭弹窗
                    this.showBargaining= false;
                    util.success('提交议价成功！');
                    // 重新渲染数据
                    this.getList(); 
                } 
            })
        },

        // 获取数据后 数据处理函数(添加自定义 选中项custom_selectAll)
        handleDataProcessing(data){
            // 过度数据
            let temporary = data;
            let _this =
            temporary.goodsInfoList.forEach(wrap => {
                // is_Null 是否显示暂无数据站位 默认显示
                wrap.is_Null = true;
                // 设置默认值 没选中-1为空 
                wrap.custom_selectAll ='-1';
                wrap.quotationOrderItems.forEach((item,index) =>{
                
                    // 选中的位置赋值
                    if(item.isSelect == 1){
                        // 选中的索引
                        wrap.custom_selectAll =index;
                        // is_Null 是否显示暂无数据站位 设置不显示
                        wrap.is_Null=false;
                    }
                    // 待报价的 设置全显示
                     if(temporary.inquiryStatus ==2){
                        wrap.is_Null=false;
                     }
                });
            });
            this.quotationDetail = temporary;
            quotationDetail.inquiryStatus
            // console.log(this.quotationDetail,'this.quotationDetail')
        },

        // 订单提交点击事件
        handleSubmitClick(){
            let params ={
                    inquiryId:this.quotationDetail.inquiryId,
                    remark:this.quotationDetail.remark,
                    items:[
                        // {
                        //     isSelect:1,
                        //     itemId:7144,
                        //     opremark:"测试专用"
                        // }
                    ]
                };
      
            // 获取提交数据
            this.quotationDetail.goodsInfoList.forEach((item,index) =>{
                // console.log(item.custom_selectAll)
                if(item.custom_selectAll >= 0 ){
                    params.items.push({
                        isSelect:1,
                        itemId:item.quotationOrderItems[item.custom_selectAll].itemId,
                        opremark:item.quotationOrderItems[item.custom_selectAll].remarks
                    })
                }
            })

            if(!params.items.length){
                util.error('请选择数据')
                return 
            }
            // 提交请求
            this.onsubmit(params)
        },

        // 提交请求
        onsubmit(params) {
            // console.log(params,'params')
            Api.quotationSubmit(params).then(res => {
                if (res.code == 200) {
                    this.$router.push({name:'subSuccess'})
                } 

                if (res.code == 500) {
                    this.$router.push({
                        name:'subError',
                        query:{
                            msg:res.msg
                        }
                    })
                }
            }).catch(err =>{
                // console.log(err.response.data.msg,'err');
                this.$router.push({
                    name:'subError',
                    query:{
                        msg:err.response.data.msg
                    }
                })
            })    
        },
      
        // 发送地推通知
        handeleSendNotice(data){
         
            Dialog.confirm({
                title: '是否发送给地推？',
                confirmButtonText:'发送',
                beforeClose
            })
            let parmam = {
                "bargainingId": data.bargainingId*1
            }
            // 是否能够取消
            let isClose = true
            function beforeClose(action, done) {
                if (action === 'confirm') {

                    Api.bargainingPush(parmam).then(res => {
                        // console.log(res,'res')
                        if (res.code == 200) {
                             data.isSend =1
                            done()
                            util.success('推送成功！')
                        } 
                        if (res.code == 500) {
                            done()
                        }

                    }).catch(error=>{
                        util.error(res.msg)
                    })
                } else {
                    done();
                }
            }



            
           
            
        },
        
        


    },
    watch: {
        // 议价弹窗的监听 控制能否上拉刷新
        "showBargaining":{
            handler(newName,oldName) {
                this.pullDisabled = newName
            },
            immediate: true
        },
        // 历史价格详情弹窗的监听 控制能否上拉刷新
        "showDetailedHistory":{
            handler(newName,oldName) {
                this.pullDisabled = newName
            },
            immediate: true
        },
        // 数量 
        'bargainingListItem.quotationQuantity':{
            handler(newName, oldName) {
                if(!newName){ return}
                let number = newName
                if(number    >10000000000){
                    number =number.substr(0,10)
                    util.error('整数位置不能大于10位')
                }
                //先把非数字的都替换掉，除了数字和. 
                number = number.replace(/[^\d.]/g,""); 
                //保证只有出现一个.而没有多个. 
                number = number.replace(/\.{2,}/g,"."); 
                //必须保证第一个为数字而不是. 
                number = number.replace(/^\./g,""); 
                //保证.只出现一次，而不能出现两次以上 
                number = number.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
                //只能输入2个小数
                number = number.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); 
                number = isNaN(number) ? '': number;
                this.bargainingListItem.quotationQuantity = number 
            },
            immediate: true
        },
        // 价格
        'bargainingListItem.price':{
            handler(newName, oldName) {
            if(!newName){ return}
            let number = newName
            if(number >100000000){
                number =number.substr(0,8)
                util.error('整数位置不能大于8位')
            }
            //先把非数字的都替换掉，除了数字和. 
            number = number.replace(/[^\d.]/g,""); 
            //保证只有出现一个.而没有多个. 
            number = number.replace(/\.{2,}/g,"."); 
            //必须保证第一个为数字而不是. 
            number = number.replace(/^\./g,""); 
            //保证.只出现一次，而不能出现两次以上 
            number = number.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            //只能输入四个小数
            number = number.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3'); 
            number = isNaN(number) ? '': number;
            this.bargainingListItem.price = number 
            },
            immediate: true
        }
    },

    computed: {},

    created() {
        this.inquiryId = this.$route.query.inquiryId;
        // 获取信息
        this.getList();
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
    // @import '../../../assets/styles/base/calc_vm.scss';
    @import '@/assets/styles/base/calc_vm.scss';
    @import './toBeQuotedDetails.scss';
</style>

<style lang="scss">
    @import '@/assets/styles/base/calc_vm.scss';
    .toBeQuotedDetails{
        .van-field__control {color: #333;}
        .van-radio__label--disabled {
            color: #323233;
            margin: 0;
            text-align: left;
            display: inline-block;
            vertical-align: middle;
            line-height:vw(58);
        }
        .van-radio { text-align: left;}
    }
   
</style>