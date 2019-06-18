<template>
<v-app id="inspire">
    <router-view name="LeftNavigation"></router-view>
    <router-view name="Toolbar"></router-view>
    <router-view name="Default"></router-view>
</v-app>
</template>

<script>
import firebase from 'firebase/app'
export default {
    name: "Main",
    data: function(){
        return {
        }
    },
    created(){
        this.$store.commit('setDialogs', []);
        this.$store.commit('setCurrentChat', []);
        let ref = firebase.firestore().collection('chatHistory').doc('u2bpQ3WoHxeG1qskMj9K')
        console.log(ref, 'ref to chat');
    },
    mounted(){
        // let info = {
        //     id: 1,
        //     name: 'Aksimka',
        //     mail: 'mks_comp97@mail.ru',
        //     password: 'qwe123',
        //     lastVisit: new Date().toISOString(),
        //     avatar: '/images/me.jpg',
        //     dialogs: [],
        //     friends: [2, 3]
        // };
        //this.$store.commit('setMyInfo', info)
        console.log(this.$store.state.myInfo, 'this.$store.state.myInfo');
    }
}
</script>

<style lang="sass">


</style>
