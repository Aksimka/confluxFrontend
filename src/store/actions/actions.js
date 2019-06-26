import firebase from 'firebase/app'

export default {
    createChatMessage({dispatch, commit}, val){
        dispatch('updateArray', {collection: 'chatHistory', val: val.val, ref: val.ref, field: val.field});
    },
    createMessage({commit}, val){
        commit('createMessage', val)
    },
    async getChatMembers({dispatch, commit}, val){
        let opponent = val.opponent;
        let items = [];
        for(const item of opponent){
            let result = await dispatch('getData', {collection: 'usersData', filters: {field: "id", cond: "==", eq: item}});
            items.push(result);
        }
        return items;
    }
}