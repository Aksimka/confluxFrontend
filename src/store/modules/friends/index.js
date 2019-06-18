export default {
    state: {
        peopleList: [],
        friendsList: []
    },
    actions: {
        getPeopleList({commit, dispatch}, {collection, limit}){
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
                    res.body.forEach(i=>{
                        commit('pushToFriends', i);
                    });

                })
        },
        addToFriends({commit, dispatch}, {collection, val, ref}){
            return new Promise(function (resolve, reject) {
                dispatch('updateArray', {collection, val, ref, field: 'friends'})
                    .then(data=>{
                        console.log(data, 'updateArray');
                        resolve(data);
                    })
            })
        },
        deleteFromFriends({commit, dispatch}, {ref, value}){
            console.log(ref, value);
            return new Promise(function (resolve, reject) {
                dispatch('changeFieldInDoc', {collection: 'usersData', ref, val: value})
                    .then(res=>{
                        resolve(res);
                    })
            });
        },
        createDialog({commit, dispatch}, {value}){
            let dialogId = value.id;
            return new Promise(function (resolve, reject) {
                dispatch('addData', {collection: 'dialogs', val: value})
                    .then(res=>{
                        value.members.forEach(i=> {
                            dispatch('getData', {collection: 'usersData', filters: {field: 'id', cond: '==', eq: i}})
                                .then(res=> {
                                    console.log(value, dialogId, 'to update data');
                                    dispatch('updateArray', {collection: 'usersData', val: dialogId, ref: res.collection, field: 'dialogs'});
                                })
                        });
                        return value;
                    })
                    .then((_value)=>{
                        console.log(_value, 'to create history');
                        value = {
                            id: _value.historyId,
                            history: []
                        };
                        dispatch('addData', {collection: 'chatHistory', val: value})
                    });
            });
        }
    },
    mutations: {
        setPeopleList(state, val){
            state.peopleList = val;
            console.log(state.peopleList, 'peopleList is set');
        },
        setFriendsList(state, val){
            state.friendsList = val;
            console.log(state.friendsList, 'friendsList is set');
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
        },
        deleteFromList(state, val){
            let list = val.list;
            let index = val.index;
            state[list].splice(index, 1)
        },
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