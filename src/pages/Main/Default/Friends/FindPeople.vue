<template>
    <v-container grid-list-md>
        <v-text-field
                v-model="findSearch"
                label="Поиск"
                append-outer-icon="search"
        >
        </v-text-field>
        <v-layout wrap>
            <v-flex md3 v-for="(i, index) in filteredPeoples" :key="index">
                <people-card :avatar="i.avatar" :name="i.name" :mail="i.mail" :lastVisit="i.lastVisit">
                    <template slot="btn">
                        <v-btn
                                block
                                color="amber darken-2"
                                class="white--text"
                                @click="addToFriends(i.id)"
                        >
                            Добавить в друзья
                            <v-icon right dark>person_add</v-icon>
                        </v-btn>
                    </template>
                </people-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import shortCuts from '@/mixins/dataShortCut'
    import PeopleCard from '@/components/Cards/PeopleCard'
    import firebase from 'firebase/app'
    export default {
        name: "FindPeople",
        mixins: [shortCuts],
        components: {
            'people-card': PeopleCard
        },
        data(){
            return {
                findSearch: ''
            }
        },
        methods: {
            addToFriends(id){
                //adding
                this.$store.dispatch('addToFriends', {collection: 'usersData', val: id, ref: this.myRef, field: 'friends'})
                    .then(()=>{
                        let userData = firebase.firestore().collection('usersData').doc(this.myInfo.reference);
                        return userData.get();
                    })
                    .then(data=> { //get new friendsList
                        console.log(data.data(), this.myInfo);
                        this.myInfo.friends = data.data().friends;
                        return this.myInfo.friends;
                    })
                    .then(friends=>{ //render new friendsList
                        this.$store.commit('clearFriendsList');
                        friends.forEach(i=>{
                            this.$store.dispatch('friendsListPush', {collection: 'usersData', filters: {field: 'id', cond: '==', eq: i}});
                            console.log(this.myInfo.friends, 'is my friend');
                        });
                    });
                //delete from findPeople
                let index = this.peopleList.findIndex(i=> i.id === id);
                this.$store.commit('deleteFromList', {index, list: 'peopleList'})
            }
        },
        created(){
            this.$store.dispatch('getPeopleList', {collection: 'usersData', limit: 20});
            if(this.friendsList.length === 0){
                this.myInfo.friends.forEach(i=>{
                    this.$store.dispatch('friendsListPush', {collection: 'usersData', filters: {field: 'id', cond: '==', eq: i}});
                    console.log(this.myInfo.friends, 'is my friend');
                });
            }
        },
        mounted(){
            //console.log(this.filteredPeoples, 'this.filteredPeoples');
        },
        computed: {
            peopleList(){
                return this.$store.getters.getPeopleList;
            },
            friendsList(){
                return this.$store.getters.getFriendsList;
            },
            myRef(){
                return this.myInfo.reference;
            },
            filteredPeoples(){
                let list = this.peopleList;
                let friendsId = [];
                friendsId.push(...this.myInfo.friends);
                friendsId.push(this.myInfo.id);
                let set = new Set(list);
                set.forEach(i=>{
                    friendsId.forEach(j=>{
                        if(i.id === j){
                            set.delete(i);
                        }
                    })
                });
                return Array(...set);
            }
        }
    }
</script>

<style scoped>

</style>