import Vue from 'vue'
import Vuex from 'vuex'

import state from './state/state'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'

//!!MODULES
import user from './modules/user'
import reqRes from './modules/reqRes'
import firebase from './modules/firebase'

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        user,
        reqRes,
        firebase
    }
})
