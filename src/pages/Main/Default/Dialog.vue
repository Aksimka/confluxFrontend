<template>
    <v-content class="grey lighten-3">
        <v-container fluid pl0 class="h100" style="height: 85vh">
            <v-layout row wrap class="h100" style="height: 85vh">
                <v-flex lg3 md3 sm4 xs5>
                    <ChatList></ChatList>
                </v-flex>


                <v-flex lg6 md7 sm8 xs8>
                    <router-view></router-view>
                </v-flex>

            </v-layout>
        </v-container>
    </v-content>


</template>

<script>


    import ChatList from './Dialog/ChatList'
    export default {
        name: "Dialog",

        components: {ChatList},

    }
</script>

<style lang="sass">


</style>