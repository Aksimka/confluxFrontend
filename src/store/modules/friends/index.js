export default {
    state: {
        peopleList: []
    },
    actions: {
        peopleList({getters, commit, dispatch}, {collection, limit}){
            dispatch('getData', {collection, limit})
                .then(res=>{
                    let toPush = [];
                    res.body.forEach(i=>{
                        toPush.push(i);
                    });
                    commit('setPeopleList', toPush);
                })
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
        }
    },
    getters: {
        getPeopleList(state){
            return state.peopleList;
        }
    }
}