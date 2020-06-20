import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import {
    state,
    getters,
    mutations,
    actions
} from './store.js';

Vue.use(Vuex);

const strict = process.env.NODE_ENV !== 'production'
const plugins = process.env.NODE_ENV !== 'production' ? [createLogger()] : []

export default new Vuex.Store({
    strict,
    state,
    getters,
    mutations,
    actions
});