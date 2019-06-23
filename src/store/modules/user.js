import firebase from 'firebase/app'
import User from './helpers/User'
import UserData from './helpers/UserData'
import Vue from 'vue'
import store from './../store.js'

export default {
    state: {
        user: null,
        userLoaded: false
    },
    mutations: {
        setUser(state, payload){
            state.user = payload;
        },
        userLoaded(state){
            state.userLoaded = true
        }
    },
    actions: {
        async registerUser({commit}, {email, password, name}) {
            commit('clearError');
            commit('toggleLoading');
            try{
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                const userData = new UserData(new Date().toLocaleString(), name, email, password, new Date().toISOString(), '', [], []);

                firebase.firestore().collection("usersData").add({
                    id: userData.id,
                    name: userData.name,
                    mail: userData.mail,
                    password: userData.password,
                    lastVisit: userData.lastVisit,
                    avatar: userData.avatar,
                    friends: userData.friends,
                    dialogs: userData.dialogs
                });
                commit('setUser', new User(user.user.uid));
                commit('toggleLoading');
            } catch (error) {
                commit('setError', error.message);
                commit('toggleLoading');
                throw error;
            }

        },
        async loginUser({commit, state, rootState}, {email, password}) {
            commit('clearError');
            commit('toggleLoading');

            try{
                const userLogin = await firebase.auth().signInWithEmailAndPassword(email, password);
                let userData = firebase.firestore().collection('usersData').where('mail', '==', email);
                userData.get().then(data=> {
                    data.forEach(i=>{
                        commit('setMyInfo', i.data(), {root: true});
                        Vue.set(rootState.myInfo, 'reference', i.id);
                        console.log(rootState.myInfo, 'rootState.myInfo');
                    })
                });

                commit('setUser', new User(userLogin.user.uid));
                commit('toggleLoading');
            } catch (error) {
                commit('setError', error.message);
                commit('toggleLoading');
                throw error;
            }
        },
        async loggedUser({state, commit, getters}, payload){
            commit('setUser', new User(payload.uid));
            console.log(payload.uid, 'Check 2');
            return payload.uid;
        },
        logoutUser({commit}){
            firebase.auth().signOut();
            commit('clearFriendsList');
            commit('setUser', null)
        }
    },
    getters: {
        getUser(state){
            return state.user;
        },
        checkUser(state){
            return state.user !== null;
        }
    }
}