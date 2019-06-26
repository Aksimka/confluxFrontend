<template>
    <v-content>
        <v-container fluid pl0 class="h100" style="height: 85vh">
            <v-layout row wrap class="h100" style="height: 85vh">
                <v-flex lg3 md3 sm4 xs12 style="background: #fff; border-right: 1px solid #dcdcdc" :class="{'hidden-xs-only': inDialog === true}">
                    <ChatList></ChatList>
                </v-flex>


                <v-flex lg6 md7 sm8 xs12>
                    <div class="chat-wrapper hidden-xs-only" v-if="this.currentChatInfo.length === 0">
                        <span class="chat__begin-message">Для дальнейшей работы выберите диалог</span>
                    </div>
                    <div class="chat-wrapper hidden-xs-only" v-else-if="this.currentChatInfo.id === null">
                        <v-progress-circular
                                v-if="currentChatInfo.id === null"
                                :size="50"
                                color="amber"
                                indeterminate
                        ></v-progress-circular>
                    </div>
                    <router-view v-else></router-view>
                </v-flex>

            </v-layout>
        </v-container>
    </v-content>


</template>

<script>

    import shortCuts from '@/mixins/dataShortCut'
    import ChatList from './Dialog/ChatList'
    export default {
        name: "Dialog",
        mixins: [shortCuts],
        components: {ChatList},


    }
</script>

<style lang="sass">
.chat-wrapper
    width: 100%
    height: 100%
    position: relative
    display: flex
    justify-content: center
    align-items: center
.chat__begin-message
    font-size: 28px
    color: #cbcbcb

</style>