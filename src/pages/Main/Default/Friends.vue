<template>
    <v-content>
        <v-container>
            <v-layout row wrap>
                <v-flex md8>

                    <v-tabs
                            v-model="tabs"
                            color="transparent"
                            slider-color="white"
                    >
                        <v-tab href="#tab-1">
                            Вcе друзья
                        </v-tab>
                        <v-tab href="#tab-2">
                            Поиск людей
                        </v-tab>
                    </v-tabs>

                    <!------------------------FRIENDS TAB------------------------------>

                    <v-tabs-items v-model="tabs">
                        <v-tab-item value="tab-1">
                            <friend-list></friend-list>
                        </v-tab-item>

                        <!-----------------------------FIND TAB------------------------------------->

                        <v-tab-item value="tab-2">
                            <find-people></find-people>
                        </v-tab-item>

                        <!------------------------------------------------------------------------>

                    </v-tabs-items>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex md2>
                    <!--<v-list>-->
                        <!--<template v-for="item in menuItems">-->
                            <!--<v-list-tile :key="item.title" :to="item.path" @click="item.func">-->
                                <!--&lt;!&ndash;<v-list-tile-action>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<v-icon>{{ item.icon }}</v-icon>&ndash;&gt;-->
                                <!--&lt;!&ndash;</v-list-tile-action>&ndash;&gt;-->
                                <!--<v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
                            <!--</v-list-tile>-->
                        <!--</template>-->
                    <!--</v-list>-->
                </v-flex>
                <v-spacer></v-spacer>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import shortCuts from '@/mixins/dataShortCut'
    import FindPeople from './Friends/FindPeople'
    import FriendList from './Friends/FriendList'
    export default {
        name: "Friends",
        mixins: [shortCuts],
        components: {
            'find-people': FindPeople,
            'friend-list': FriendList
        },
        data(){
            return {
                tabs: 'tab-1'
            }
        },
        computed: {
            menuItems(){
                return [
                    {title: 'Friends', path: `/user/${this.user.id}/friends`},
                    {title: 'Find people', path: `/user/${this.user.id}/findPeople`},
                ]
            },
            user(){
                return this.$store.getters.getUser
            }
        }
    }
</script>

<style scoped>

</style>