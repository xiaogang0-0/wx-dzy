import { axios } from '@/utils';

// get请求
// export const test = params => axios.get('/', {params});

// post请求
// export const test = params => axios.get('/', params);


//  post
export const quotationList = params => axios.post('url', params);

// get
export const quotationDetail = params => axios.get('url', {params});



