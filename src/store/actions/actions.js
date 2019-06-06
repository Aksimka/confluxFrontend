import firebase from 'firebase/app'

export default {
    createChatMessage({dispatch, commit}, val){
        dispatch('updateArray', {collection: 'chatHistory', val: val.val, ref: val.ref, field: val.field});
        //commit('createMessage', val.val)
    },
    createMessage({commit}, val){
        commit('createMessage', val)
    }
}