import {axios,util} from '@/utils';

// 报价列表
// export function quotationList(params) {
//   return axios.post('/biw-rfq/rfq/quotation/manage/page', params, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + util.getCookie('biw_token')
//     }

//   })
// };


// 报价列表 post
export const quotationList = params => axios.post('/biw-rfq/rfq/quotation/manage/page', params);

// 报价列表详情
export const quotationDetail = params => axios.get('/biw-rfq/rfq/quotation/manage/detail', {params});

// 报价历史列表
export const getDetailedlist  = params => axios.post('/biw-rfq/rfq/quotation/manage/goodsPage', params);

// 提交议价接口
export const submintBargaining= params=>  axios.post('/biw-rfq/rfq/quotation/bargaining/submit',params)

// 报价单提交接口
export const quotationSubmit= params=>  axios.post('/biw-rfq/rfq/quotation/manage/submit',params)

// 推送给地推
export const bargainingPush= params=>  axios.get('/biw-rfq/rfq/quotation/bargaining/push',{params})




