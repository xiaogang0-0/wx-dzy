const mutations = {
    setUserInfo (state, data) {
        state.userInfo = data;
    },

    // 更改ios配置路径
    updatePath(state, data){
        state.entryUrl = data;
    }
};

export default mutations;