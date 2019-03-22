import Vue from 'vue'
import Vuex from 'vuex'

import state from './state/state'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
