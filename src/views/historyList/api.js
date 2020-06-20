import {axios} from '@/utils';

// 模糊搜索
// export function fuzzySearch(params) {
//   return this.$jsonp('http://platform.hlwl.com:8181/hlwlsearch', params)
// };

// 物料立式报价折线图
export const getChartList = params => axios.post('/biw-rfq/rfq/quotation/manage/selectAllGoodsQuotationReplyPrice', params);

// 报价历史列表
export const getDetailedlist = params => axios.post('/biw-rfq/rfq/quotation/manage/goodsPage', params);
