<template>
<v-navigation-drawer app v-model="$store.state.drawer">
    <v-img :aspect-ratio="16/9" src="me.jpg" gradient="to top right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)">
        <v-layout pa-2 column fill-height class="white--text">
            <v-spacer></v-spacer>
            <v-flex shrink>
                <div class="subheading">{{userName}}</div>
                <div class="body-1">{{mail}}</div>
            </v-flex>
        </v-layout>
    </v-img>
    <v-list>
        <template v-for="(item, i) in menuItems">
            <v-divider v-if="item.divider" :key="i"></v-divider>
            <v-list-tile v-else :key="item.title" @click>
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
        </template>
    </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
    name: "Left-navigation",
    data: function(){
        return {
            drawer: false,
            userName: 'Aksimka',
            mail: 'mks_comp97@mail.ru',
            menuItems: [
                { icon: 'inbox', title: 'Inbox' },
                { icon: 'star', title: 'Starred' },
                { icon: 'send', title: 'Sent mail' },
                { icon: 'drafts', title: 'Drafts' },
                { divider: true },
                { icon: 'mail', title: 'All mail' },
                { icon: 'delete', title: 'Trash' },
                { icon: 'error', title: 'Spam' }
            ],
        }
    },
    methods: {
        func(e){
            console.log(e);
        }
    }

}
</script>

<style lang="sass" scoped>

</style>