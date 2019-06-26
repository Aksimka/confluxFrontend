import Vue from 'vue'

export default {
    initial(state, val){

    },
    setMyInfo(state, val){
        state.myInfo = val;
        console.log('my info gotten', state.myInfo);
    },
    drawNavigation(state, val){
        state.drawer = val;
    },
    setDialogs(state, val){
        console.log('Dialogs are gotten');
        Vue.set(state, 'dialogList', val);
    },
    setCurrentChat(state, val){
        console.log('Current chat is gotten');
        Vue.set(state, 'currentChat', val);
    },
    setInDialog(state, val){
        state.inDialog = val;
    },
    clearCurrentChat(state){
        let clearedChat = {
          chatStory: {
              history: [],
              id: null
          },
            class: '',
            historyId: null,
            id: null,
            lastMessage: {
              image: '',
                message: '',
                name: '',
                ownerId: null,
                unread: false
            },
            members: [],
            name: '',
            ownerId: null,
            reference: ''
        };
        Vue.set(state, 'currentChat', clearedChat);
        console.log('currentChat clear');
    },
    removeCurrnetChat(state){
        state.currentChat = [];
    },
    setMessageStory(state, val){
        console.log('Message story is gotten');
        state.messageStory = val;
    },
    createMessage(state, val){
        state.currentChat.chatStory.history.push(val);
        console.log(state.currentChat.chatStory.history, `pushed ${val}`);
    },
    refreshMessages(state, val){
        state.currentChat.chatStory.history = val;
        console.log(state.currentChat.chatStory.history, 'messgaes refreshed');
    }
}