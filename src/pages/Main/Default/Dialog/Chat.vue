<template>

    <div class="chat">
        <v-progress-circular
                v-if="currentChatInfo.id === null"
                :size="50"
                color="amber"
                indeterminate
        ></v-progress-circular>
        <div class="chat-main">
            <div class="chat-toolbar">
                <v-toolbar color="white">
                    <v-avatar>
                        <img :src="currentChatInfo.img" alt="" v-if="currentChatInfo.img !== ''">
                        <img src="@/assets/default-avatar.png" alt="" v-else>
                    </v-avatar>
                    <v-toolbar-title>
                        <span>
                            <span v-if="currentChatInfo.name">{{ currentChatInfo.name }}</span>
                        </span>

                        <span class="caption font-weight-light grey--text">
                            <span v-if="currentChatInfo.members.length === 2">
                                was online: {{opponent.lastVisit}}
                            </span>

                        </span>
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-toolbar-side-icon></v-toolbar-side-icon>
                </v-toolbar>
            </div>
            <div class="chat-content">
                <div class="chat-content-messages">
                    <div class="chat-content-messages-item"
                         :class="{'chat-content-messages-item_my-message': mess.ownerId === myInfo.id}"
                         v-for="(mess, index) in history"
                    >
                        <img
                                :src="findInfo(mess.ownerId, 'avatar')"
                                class="chat-content-messages-item__avatar"
                                v-if="findInfo(mess.ownerId, 'avatar') !== null && findInfo(mess.ownerId, 'avatar') !== ''">
                        <img
                                src="@/assets/default-avatar.png"
                                class="chat-content-messages-item__avatar"
                                v-else>
                        <div class="chat-content-messages-item-content">

                            <div class="chat-content-messages-item-content__text">{{mess.message}}</div>
                            <div class="chat-content-messages-item-content__time">{{mess.date}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-send-form">
                <div class="send-message">
                    <v-icon class="mx-3" @click="emojiToggleMenu">mdi-emoticon-cool</v-icon>
                    <v-text-field class="my-2"
                                  v-model="message"
                                  append-icon="mdi-attachment"
                                  box
                                  clear-icon="mdi-close-circle"
                                  clearable
                                  label="Message"
                                  type="text"
                                  @click:append="sendMenuToggle"
                                  @click:clear="clearMessage"
                                  @keyup.enter="sendMessage"
                                  hide-details
                                  @keyup="emojiMenu = false"
                    ></v-text-field>
                    <span>
            <v-icon class="mx-3"
                    v-if="message"
                    @click="sendMessage"
            >
                mdi-send
            </v-icon>
            <v-icon
                    class="mx-3"
                    v-else
                    @click="recordMessage"
            >
                mdi-microphone
            </v-icon>
        </span>
                </div>

                <div class="emoji-wrapper" v-if="emojiMenu" @blur="test">
                    <VEmojiPicker :pack="pack" @select="selectEmoji" />
                </div>


            </div>
        </div>
    </div>



</template>

<script>


    import shortCuts from '@/mixins/dataShortCut'
    import VEmojiPicker from 'v-emoji-picker';
    import packData from 'v-emoji-picker/data/emojis.json';
    import firebase from 'firebase/app'
    export default {
        name: "Chat",
        mixins: [shortCuts],
        data: function(){
            return {
                message: '',
                pack: packData,
                emojiMenu: false,
                dbReference: {},
                added: false
            }
        },
        components: {VEmojiPicker},
        computed: {
            messageInput(){
                return document.querySelector('.send-message input');
            },
            opponent(){
                return this.$store.state.firebase.opponent;
            },
            db(){
                return firebase.firestore().collection('chatHistory').doc(`${this.currentChatInfo.reference}`);
            },
            history:{
                get(){
                    return this.currentChatInfo.chatStory.history;
                },
                set(val){
                    this.currentChatInfo.chatStory.history.push(val);
                }
            }
        },
        methods: {
            sendMessage () {
                this.emojiMenu = false;
                if(this.message !== ''){
                    this.$store.dispatch('createChatMessage', {
                        collection: 'chatHistory',
                        val: {date: new Date().toISOString(), message: this.message, ownerId: this.myInfo.id},
                        ref: this.currentChatInfo.reference,
                        field: 'history'
                    });
                    this.clearMessage();
                    console.log(this.currentChatInfo, 'this.currentChatInfo');
                    setTimeout(function(){
                        let a = document.querySelector('.chat-content-messages');
                        a.scrollTo({
                            top: a.scrollHeight,
                            behavior: "smooth"
                        })
                    }, 10)
                }
                this.added = false;

            },
            findInfo(id, field){
                return this.currentChatInfo.membersInfo.find(i=> i.id === id)[`${field}`];
            },
            clearMessage () {
                this.message = ''
            },
            selectEmoji(emoji) {
                this.message = this.message + emoji.emoji;
                this.messageInput.focus()
            },
            emojiToggleMenu(){
                this.emojiMenu = !this.emojiMenu;
            },
            sendMenuToggle(){
                console.log('Message sent');
            },
            recordMessage(){
                console.log('Voice message record');
            }
        },
        mounted(){
            console.log(+this.$route.params.dialog, '+this.$route.params.dialog');
            let opponent = this.currentChatInfo.members.find(i=> i !== this.myInfo.id);
            this.$store.dispatch('getData', {collection: 'usersData', target: 'opponent', filters: {field: "id", cond: "==", eq: opponent}})
                .then((res)=>{
                    res.body.forEach(i=>{
                        this.$store.commit('saveGotData', {target: 'opponent', val: i});
                        console.log(this.$store.state.firebase.opponent, this.currentChatInfo, 'this.$store.firebase.state.opponent');
                        !this.currentChatInfo['membersInfo']? this.currentChatInfo.membersInfo = []: false;
                        this.currentChatInfo.membersInfo.push(this.myInfo);
                        this.currentChatInfo.membersInfo.push(this.$store.state.firebase.opponent);
                    });
                });
            this.db.onSnapshot(doc => {
                let source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                let data = doc.data();
                let el = data.history[data.history.length - 1];
                let preLastEl = this.currentChatInfo.chatStory.history[data.history.length - 1];
                console.log(el, 'is it ot me?');
                console.log(source, 'source');

                if(source === "Server"){
                    console.log(el, preLastEl, 'el, preLastEl');
                    this.history = el;
                    console.log(this.currentChatInfo.chatStory.history, 'this.currentChatInfo.chatStory.history');
                    setTimeout(function(){
                        let a = document.querySelector('.chat-content-messages');
                        a.scrollTo({
                            top: a.scrollHeight,
                            behavior: "smooth"
                        })
                    }, 50)
                }
            });
            this.currentChatInfo.chatStory.history.pop();
            // this.db.onSnapshot(doc => {
            //     let source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            //     let data = doc.data();
            //     let el = data.history[data.history.length - 1];
            //     console.log(el, 'is it ot me?');
            //     console.log(source, 'source');
            //     if(source === "Server"){
            //         let temp = this.history;
            //         temp.push(el);
            //         this.history = temp;
            //         console.log(this.currentChatInfo.chatStory.history, 'this.currentChatInfo.chatStory.history');
            //     }
            // });
            //this.currentChatInfo.chatStory.history.pop();
            setTimeout(function(){
                let a = document.querySelector('.chat-content-messages');
                a.scrollTo({
                    top: a.scrollHeight,
                    behavior: "smooth"
                })
            }, 10)
        },
        watch: {
            userLoaded(){
                if(this.currentChatInfo.length === 0){
                    console.log('go back');
                    this.$router.push(`/user/${this.userId.id}/dialog`)
                }
            },
            chatStory(){

            }
        }
    }
</script>

<style lang="sass">
    .chat
        height: 85vh
        position: relative
        background: #ffffff
        .chat-main
            background: #ffffff
            display: flex
            flex-direction: column
            justify-content: space-between
            height: 85vh
            overflow: hidden


        .chat-content
            position: relative
            display: flex
            flex-direction: column
            justify-content: flex-end
            overflow-y: scroll
            &::-webkit-scrollbar
                width: 0
        .chat-toolbar
            justify-self: flex-start
        .chat-content-messages
            overflow-y: scroll
        .chat-content-messages-item
            display: flex
            margin: 20px 10px

        .chat-content-messages-item_my-message
            flex-direction: row-reverse
            .chat-content-messages-item-content__text
                text-align: right

        .chat-content-messages-item-content
            margin: 0 10px
            padding: 10px
            -webkit-border-radius: 5px
            -moz-border-radius: 5px
            border-radius: 5px
            background: #dfdfdf

        .chat-content-messages-item-content__time
            font-size: 12px
            color: #919191

        .chat-content-messages-item__avatar
            width: 40px
            height: 40px
            -webkit-border-radius: 50%
            -moz-border-radius: 50%
            border-radius: 50%
        .chat-send-form
            position: relative
        .emoji-wrapper
            position: absolute
            bottom: 100%
            left: 0
        .send-message
            display: flex
            justify-content: space-around
            align-items: center

</style>