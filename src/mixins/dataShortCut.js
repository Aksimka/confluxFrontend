export default {
    computed: {
        myInfo(){
            return this.$store.state.myInfo
        },
        dialogList(){
            return this.$store.state.dialogList
        },
        currentChatInfo(){
            return this.$store.state.currentChat
        },
        chatHistory(){
            return this.$store.state.currentChat.chatStory.history;
        },
        messageStory(){
            return this.$store.state.messageStory
        },
        userId(){
            return this.$store.state.user.user
        },
        userLoaded(){
            return this.$store.state.user.userLoaded
        }
    }
}