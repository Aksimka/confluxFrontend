<template>
<v-flex lg3 md3 sm5 xs12>
    <v-list three-line>
        <v-subheader>Recent chat</v-subheader>
        <v-list-tile
                v-for="item in items"
                :key="item.title"
                avatar
                @click=""
        >
            <v-list-tile-avatar>
                <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</v-flex>
</template>

<script>
export default {
    name: "ChatList",
    data: function(){
        return {
            greeting: "hi"
        }
    }

}
</script>

<style lang="sass" scoped>

</style>