<template>
    <v-container grid-list-md>
        <v-text-field
                v-model="findSearch"
                label="Поиск"
                append-outer-icon="search"
        >
        </v-text-field>
        <v-layout wrap>
            <v-flex md3 v-for="i in filteredPeoples">
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
                this.$store.dispatch('addToFriends', {collection: 'usersData', val: id, ref: this.myRef, field: 'friends'})
            }
        },
        created(){
            this.$store.dispatch('peopleList', {collection: 'usersData', limit: 20})
        },
        mounted(){
            //console.log(this.filteredPeoples, 'this.filteredPeoples');
        },
        computed: {
            peopleList(){
                return this.$store.getters.getPeopleList;
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