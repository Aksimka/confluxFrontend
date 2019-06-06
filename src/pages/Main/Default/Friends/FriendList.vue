<template>
    <v-container grid-list-md>
        <v-text-field
                v-model="friendSearch"
                label="Поиск"
                append-outer-icon="search"
        >
        </v-text-field>
        <v-layout wrap>
            <v-flex md3 v-for="i in friendsList">

                <friend-card :name="i.name" :mail="i.mail" :avatar="i.avatar" :lastVisit="i.lastVisit">
                    <template slot="btn">
                        <v-btn
                                block
                                color="red"
                                class="white--text"
                        >
                            Удалить из друзей
                            <v-icon right dark>person_add_disabled</v-icon>
                        </v-btn>
                    </template>
                </friend-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import FriendCard from '@/components/Cards/PeopleCard'
    import shortCuts from '@/mixins/dataShortCut'
    export default {
        name: "FriendList",
        mixins: [shortCuts],
        components: {
            'friend-card': FriendCard
        },
        data(){
            return {
                friendSearch: ''
            }
        },
        created(){
            if(this.friendsList.length === 0){
                this.myInfo.friends.forEach(i=>{
                    this.$store.dispatch('friendsListPush', {collection: 'usersData', filters: {field: 'id', cond: '==', eq: i}});
                    console.log(this.myInfo.friends, 'is my friend');
                });
            }
        },
        computed: {
            friendsList(){
                return this.$store.getters.getFriendsList;
            }
        }
    }
</script>

<style scoped>

</style>