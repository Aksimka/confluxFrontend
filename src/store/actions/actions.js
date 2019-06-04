import firebase from 'firebase/app'

export default {
    createChatMessage({dispatch, commit}, val){
        dispatch('updateArray', {collection: 'chatHistory', val: val, ref: val.ref});
        //commit('createMessage', val.val)
    },
    createMessage({commit}, val){
        commit('createMessage', val)
    }
}