import {axios,util} from '@/utils';

// 退出登陆
export const landingExit = params => axios.post('/oauth-server/auth/sys/logout', params);

/*修改密码*/
export const changePassword = params => axios.put('/user-center/user/sys/user/password', params);




// 退出登陆
// export function landingExit(params) {
//   return axios.post('/oauth-server/auth/sys/logout', params, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + util.getCookie('biw_token')
//     }
//   })
// };

// 修改密码
// export function changePassword(params) {
//   return axios({
//     url: '/user-center/user/sys/user/password',
//     method: 'put',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + util.getCookie('biw_token')
//     },
//     data:params
//   })
// }


