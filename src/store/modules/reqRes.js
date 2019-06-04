export default {
    state: {
        loading: false,
        error: null,
    },
    mutations: {
        setError(state, payload){
            state.error = payload;
        },
        clearError(state){
            state.error = null;
        },
        toggleLoading(state){
            state.loading = !state.loading;
        },
    },
    actions: {

    },
    getters: {
        getLoading(state){
            return state.loading;
        },
        getError(state){
            return state.error;
        }
    }
}