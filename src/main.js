import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VeeValidate from 'vee-validate'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/firestore'

Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
    router,
    store,
    render: h => h(App),
    created(){
        var config = {
            apiKey: "AIzaSyCbPxfGlAXT8gAaSiyw04oV5-smxXDidLw",
            authDomain: "conflux-6ed73.firebaseapp.com",
            databaseURL: "https://conflux-6ed73.firebaseio.com",
            projectId: "conflux-6ed73",
            storageBucket: "conflux-6ed73.appspot.com",
            messagingSenderId: "978484968618"
        };
        firebase.initializeApp(config);

        var db = firebase.firestore();
        // db.collection('usersData').get().then(res=>{
        //     res.forEach((doc) => {
        //         console.log('resresresresresresresresres');
        //         console.log(doc.id ,doc.data());
        //     });
        // })


        firebase.auth().onAuthStateChanged(user=> {
            console.log(user, 'user');
            let userData = firebase.firestore().collection('usersData').where('mail', '==', user.email);
            userData.get().then(data=> {
                data.forEach(i=>{
                    this.$store.commit('setMyInfo', i.data(), {root: true});
                });
                this.$store.commit('userLoaded');
            });
            if(user){
                console.log(this.$store.state.user.user, 'before relogging');
                this.$store.dispatch('loggedUser', user);
                console.log('user is logged again!');
            }
        })
    }
}).$mount('#app');
