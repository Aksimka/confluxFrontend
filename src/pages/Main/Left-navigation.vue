<template>
<v-navigation-drawer app v-model="$store.state.drawer">
    <v-img :aspect-ratio="16/9" src="/images/me.jpg" gradient="to top right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)">
        <v-layout pa-2 column fill-height class="white--text">
            <v-spacer></v-spacer>
            <v-flex shrink>
                <div class="subheading">{{myInfo.name}}</div>
                <div class="body-1">{{myInfo.mail}}</div>
            </v-flex>
        </v-layout>
    </v-img>
    <v-list>
        <template v-for="(item, i) in menuItems">
            <v-divider v-if="item.divider" :key="i"></v-divider>
            <v-list-tile v-else :key="item.title" :to="item.path" @click="item.func">
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
import shortCut from '@/mixins/dataShortCut'
export default {
    name: "Left-navigation",
    mixins: [shortCut],
    data: function(){
        return {
            drawer: false,
            userName: 'Aksimka',
            mail: 'mks_comp97@mail.ru'
        }
    },
    computed: {
        menuItems(){
            return [
                { icon: 'person', title: 'Profile', path: `/user/${this.user.id}/profile`},
                { icon: 'accessibility', title: 'My Friends', path: `/user/${this.user.id}/friends` },
                { icon: 'send', title: 'Dialogs', path: `/user/${this.user.id}/dialog` },
                { icon: 'question_answer', title: 'Create Dialog', path: `/user/${this.user.id}/newdialog` },
                { divider: true },
                { icon: 'help_outline', title: 'About us', path: `/user/${this.user.id}/about` },
                { icon: 'remove_circle', title: 'Log out', func: this.logOut},
            ]
        },
        user(){
            return this.$store.getters.getUser
        }
    },
    methods: {
        logOut(){
            this.$store.dispatch('logoutUser');
            this.$router.push('/auth');
        }
    }

}
</script>

<style lang="sass" scoped>

</style>