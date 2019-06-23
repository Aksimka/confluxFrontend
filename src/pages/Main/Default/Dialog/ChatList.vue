<template>
    <v-list three-line class="dialog-list">
        <v-subheader>Последние переписки</v-subheader>
        <v-list-tile
                v-for="item in dialogList"
                :key="item.id"
                avatar
                @click="goToChat(item.id)"
        >
            <v-list-tile-avatar>
                <img :src="item.img" v-if="item.img !== '' && item.img !== null ">
                <img src="@/assets/default-avatar.png" v-else>
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title>
                    <span>{{item.lastMessage.name}}: </span>
                    <span>{{item.lastMessage.message}}</span>
                </v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
import shortCuts from '@/mixins/dataShortCut';
import Vue from 'vue';
export default {
    name: "ChatList",
    mixins: [shortCuts],
    data: function(){
        return {

        }
    },
    methods: {
        getDialogs(){
            if(this.dialogList.length === 0){
                this.myInfo.dialogs.forEach(i=> {
                    this.$store.dispatch('getData', {
                        collection: 'dialogs',
                        target: 'dialogList',
                        filters: {field: "id", cond: "==", eq: i},
                        root: true
                    })
                        .then(res => {
                            res.body.forEach(i=>{
                                this.dialogList.push(i)
                            });
                        })
                });
            }
        },
        goToChat(to){
            this.$router.push(`/user/${this.$store.getters.getUser.id}/dialog`);
            console.log(`go to ${to}`);
            this.$store.commit('clearCurrentChat');
            Vue.set(this.$store.state.firebase, 'opponent', []);
            let toChat = this.dialogList.find(i=>i.id === to);
            console.log(this.$store.state.messageStory, toChat, 'this.messageStory');

            if(this.$store.state.messageStory.length === 0){
                console.log('begin search messages');
                console.log(toChat);
                this.$store.dispatch('getData', {
                    collection: 'chatHistory',
                    target: 'messageStory',
                    filters: {field: "id", cond: "==", eq: toChat.historyId},
                    root: true
                })
                    .then(res => {
                        console.log(res, 'res to chat');
                        res.body.forEach(i=>{
                            Vue.set(toChat, 'chatStory', i);
                            toChat['reference'] = res.collection;
                            this.$store.commit('setCurrentChat', toChat);
                        });

                        this.$router.push(`/user/${this.$store.getters.getUser.id}/dialog/${to}`)
                    })
            }
        }

    },
    watch:{
        userLoaded(){
            this.getDialogs()
        }
    },
    mounted(){
        this.$store.commit('setMessageStory', []);
        console.log(this.myInfo);
        this.getDialogs()
    },
    created(){


    }

}
</script>

<style lang="sass" scoped>

</style>