import { axios } from '@/utils';

// get请求
// export const test = params => axios.get('/', {params});

// post请求
// export const test = params => axios.get('/', params);


//  post
export const quotationList = params => axios.post('url', params);

// 首页-顶部轮播图列表/c/index/media-list
export const getHomeMediaList = params => axios.get('/c/index/media-list', {params});

// 首页-展会分页列表  /c/index/page
export const getHomePage = params => axios.get('/c/index/page', {params});

// 参观者-展会详情  /c/enterprise-show/get-by-id/{id}
export const getHomePageDetails= params => axios.get('/c/enterprise-show/get-by-id/'+params);


