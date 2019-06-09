<template>
    <v-container grid-list-md>
        <v-text-field
                v-model="friendSearch"
                label="Поиск"
                append-outer-icon="search"
        >
        </v-text-field>
        <v-layout wrap>
            <v-flex md3 v-for="(i, index) in friendsList" :key="index">

                <friend-card :name="i.name" :mail="i.mail" :avatar="i.avatar" :lastVisit="i.lastVisit">
                    <template slot="btn">
                        <v-btn
                                block
                                color="red"
                                class="white--text"
                                @click="deleteFromFriends(i.id)"
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
        methods: {
            deleteFromFriends(id){
                let index = this.friendsList.findIndex(i=> i.id === id);
                this.$store.commit('deleteFromList', {index, list: 'friendsList'});
                let toDelIndex = this.myInfo.friends.findIndex(i=> i === id);
                this.myInfo.friends.splice(toDelIndex, 1);

                this.$store.dispatch('deleteFromFriends', {value: {friends: this.myInfo.friends}, ref: this.myInfo.reference})
                    .then(()=>{
                        this.$store.commit('clearPeopleList');
                        this.$store.dispatch('getPeopleList', {collection: 'usersData', limit: 20})
                    })
            }
        },
        created(){

        },
        watch: {
            userLoaded(){
                if(this.friendsList.length === 0){
                    this.myInfo.friends.forEach(i=>{
                        this.$store.dispatch('friendsListPush', {collection: 'usersData', filters: {field: 'id', cond: '==', eq: i}});
                        console.log(this.myInfo.friends, 'is my friend');
                    });
                }
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