import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VeeValidate from 'vee-validate'

import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/firestore'

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(PerfectScrollbar);
Vue.mixin({
    methods: {
        // forTime(val) {
        //     if (val && val !== null) {
        //         var without = val.split('T')[0];
        //         var partDate = without.split('-');
        //         return partDate[2] + '.' + partDate[1] + '.' + partDate[0];
        //     }
        // },
    }
});

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

        //var db = firebase.firestore();
        // db.collection('usersData').get().then(res=>{
        //     res.forEach((doc) => {
        //         console.log('resresresresresresresresres');
        //         console.log(doc.id ,doc.data());
        //     });
        // })


        firebase.auth().onAuthStateChanged(user=> {
            console.log(user, 'user');
            let userData = firebase.firestore().collection('usersData').where('mail', '==', user.email);
            userData.get()
                .then(data=> {
                    data.forEach(i=>{
                        this.$store.commit('setMyInfo', i.data(), {root: true});
                        Vue.set(this.$store.state.myInfo, 'reference', i.id);
                    });
                    this.$store.commit('userLoaded');
                    this.$store.dispatch('changeFieldInDoc', {collection: 'usersData', ref: this.$store.state.myInfo.reference, val: {lastVisit: null} })

                });

            if(user){
                console.log(this.$store.state.user.user, 'before relogging');
                this.$store.dispatch('loggedUser', user).then((ref)=> {
                    console.log(this.$store.state.myInfo, 'document reference');
                    //this.$store.dispatch('changeFieldInDoc', {collection: 'usersData', ref: data[0].id, val: {lastVisit: null} })
                });
                console.log('user is logged again!');
            }
        })
    }
}).$mount('#app');
