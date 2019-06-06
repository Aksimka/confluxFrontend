export default {
    state: {
        peopleList: [],
        friendsList: []
    },
    actions: {
        peopleList({commit, dispatch}, {collection, limit}){
            dispatch('getData', {collection, limit})
                .then(res=>{
                    let toPush = [];
                    res.body.forEach(i=>{
                        toPush.push(i);
                    });
                    commit('setPeopleList', toPush);
                })
        },
        friendsListPush({commit, dispatch}, {collection, filters}){
            console.log(filters, 'filters');
            dispatch('getData', {collection, filters})
                .then(res=>{
                    commit('pushToFriends', res.body[0]);
                })
        },
        addToFriends({commit, dispatch}, {collection, val, ref, field}){
            dispatch('updateArray', {collection, val, ref, field})
        }
    },
    mutations: {
        setPeopleList(state, val){
            state.peopleList = val;
            console.log(state.peopleList, 'peopleList is set');
        },
        clearPeopleList(state){
            state.peopleList = [];
            console.log('peopleList cleared');
        },
        pushToFriends(state, val){
            state.friendsList.push(val);
            console.log(state.friendsList, 'pushed to friendsList');
        },
        clearFriendsList(state){
            state.friendsList = [];
            console.log('friendsList cleared');
        }
    },
    getters: {
        getPeopleList(state){
            return state.peopleList;
        },
        getFriendsList(state){
            return state.friendsList;
        }
    }
}