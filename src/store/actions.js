import { axios } from '@/utils';

// 获取用户信息
export const getUserInfo = params => axios.post('/oauth-server/auth/sys/login', params);
// import * as Api from './api';

const actions = {
    getUserInfo ({ commit }) {
        Api.getUserInfo()
        .then(res => {
            if (res.code == 0) {
                commit('setUserInfo', res.data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
};

export default actions;
