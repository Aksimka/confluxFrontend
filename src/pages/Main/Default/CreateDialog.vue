<template>
    <v-content>
        <v-container grid-list-md>
            <v-layout wrap>
                <v-flex md10>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex md10>
                                <v-autocomplete
                                        v-model="friendSearch"
                                        label="Участники"
                                        :items="friendsList"
                                        item-text="name"
                                        item-value="id"
                                        chips deletable-chips multiple
                                >
                                </v-autocomplete>
                            </v-flex>
                            <v-flex md2 xs12 class="align-center">
                                <v-btn
                                        color="amber darken-2"
                                        class="white--text"
                                        @click="createModal = true"
                                >
                                    Создать диалог
                                </v-btn>
                            </v-flex>

                            <v-flex md3 v-for="(i, index) in friendsList" :key="index">

                                <friend-card :name="i.name" :mail="i.mail" :avatar="i.avatar" :lastVisit="i.lastVisit">
                                    <template slot="btn">
                                        <v-btn
                                                block
                                                color="amber darken-2"
                                                class="white--text"
                                                @click="addToCreateList(i.id)"
                                                v-if="!searchInFriendSearchField(i.id)"
                                        >
                                            Добавить
                                            <v-icon right dark>add</v-icon>
                                        </v-btn>
                                        <v-btn
                                                block
                                                color="amber darken-4"
                                                class="white--text"
                                                @click="addToCreateList(i.id)"
                                                v-else="searchInFriendSearchField(i.id)"
                                        >
                                            Добавлен
                                            <v-icon right dark>done</v-icon>
                                        </v-btn>
                                    </template>
                                </friend-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>

                <v-dialog v-model="createModal" width="800">
                    <v-card>
                        <v-toolbar dark color="amber darken-2">
                            <v-btn icon dark @click="createModal = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Создание диалога</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn dark flat @click="createModal = false">Создать Диалог</v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <v-container>
                            <v-layout wrap>
                                <v-flex md12>
                                    <h1>Информация о диалоге:</h1>
                                </v-flex>
                                <v-flex md12 mt-5>
                                    <v-autocomplete
                                            v-model="friendSearch"
                                            color="amber darken-2"
                                            label="Участники"
                                            :items="friendsList"
                                            item-text="name"
                                            item-value="id"
                                            outline
                                            chips  multiple small-chips
                                    >
                                        <template v-slot:selection="data">
                                            <v-chip
                                                    close
                                                    class="chip--select-multi"
                                                    @input="addToCreateList(data.item.id)"
                                                    color="amber lighten-3"

                                            >
                                                {{data.item.name}}
                                            </v-chip>
                                        </template>
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex md6>
                                    <v-text-field
                                            v-model="chatName"
                                            label="Название диалога"
                                            color="amber darken-2"
                                            outline
                                            clearable
                                    ></v-text-field>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-flex md3>
                                    <v-btn
                                            large block
                                            color="amber darken-2"
                                            class="white--text"
                                            @click="createDialog(chatName, friendSearch)"
                                    >
                                        <v-progress-circular
                                                indeterminate
                                                color="amber lighten-2"
                                                v-if="createLoading"
                                        ></v-progress-circular>
                                        <span v-else>Создать диалог</span>
                                    </v-btn>
                                </v-flex>
                                <v-spacer></v-spacer>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-dialog>

            </v-layout>
        </v-container>


    </v-content>
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
                friendSearch: [],
                createModal: false,
                test: false,
                chatName: '',
                createLoading: false
            }
        },
        methods: {
            createDialog(name, _members){
                this.createLoading = true;
                let members = _members;
                members.push(this.myInfo.id);
                let historyId = new Date().getTime() + 5;
                let dialog = {
                    id: new Date().getTime(),
                    historyId,
                    class: members.length > 2 ? 'dialog' : 'chat',
                    img: "",
                    lastMessage: {
                        image: '',
                        message: '',
                        name: '',
                        ownerId: null,
                        unread: false
                    },
                    members,
                    name,
                    ownerId: this.myInfo.id
                };
                this.$store.dispatch('createDialog', {value: dialog})
                    .then(()=>{
                        this.$store.commit('setDialogs', []);
                        this.createLoading = false;
                        this.myInfo.dialogs.push(dialog.id);
                        if(this.dialogList.length === 0){
                            this.myInfo.dialogs.forEach(i=> {
                                this.$store.dispatch('getData', {
                                    collection: 'dialogs',
                                    target: 'dialogList',
                                    filters: {field: "id", cond: "==", eq: i},
                                    root: true
                                })
                                    .then(res => {
                                        res.body.forEach(i=>{
                                            this.dialogList.push(i)
                                        });
                                    })
                            });
                        }

                        this.$router.push(`/user/${this.userId.id}/dialog`)
                    })
            },
            addToCreateList(id){
                let index = this.friendSearch.findIndex(i=>i === id);
                if(index >= 0){
                    this.friendSearch.splice(index, 1);
                }
                else{
                    this.friendSearch.push(id);
                }
            },
            searchInFriendSearchField(id){
                let friendSearch = this.friendSearch;
                let set = new Set(friendSearch);
                return set.has(id);
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
        watch: {
            userLoaded(){
                console.log(this.friendsList, 'this.friendsList');
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