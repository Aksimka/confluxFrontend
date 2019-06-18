<template>
<v-toolbar app dark color="amber darken-2 pr-4">
    <v-toolbar-side-icon @click="changeDrawerState"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Conflux</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="greeting pr-4 hidden-xs-only" >Привет, {{myInfo.name}}!</div>
    <v-badge overlap bottom class="cup">
        <span slot="badge">3</span>
        <v-avatar color="teal">
            <img
                    :src="avatar"
                    alt="My photo"
            >
        </v-avatar>
    </v-badge>


</v-toolbar>
</template>

<script>
import shortCuts from '@/mixins/dataShortCut'
export default {
    name: "Toolbar",
    mixins: [shortCuts],
    methods: {
        changeDrawerState(){
            this.$store.commit('drawNavigation', !this.$store.state.drawer)
        }
    },
    computed: {
        avatar(){
            if(this.myInfo.avatar.length === 0){
                return '/images/default-avatar.png'
            }
            else return this.myInfo.avatar
        }
    }

}
</script>

<style lang="sass" scoped>

</style>