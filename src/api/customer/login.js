import { axios } from '@/utils';

// get请求
// export const test = params => axios.get('/', {params});

// post请求
// export const test = params => axios.get('/', params);

/*登录*/
export const loginInit = params => axios.post('url', params);
