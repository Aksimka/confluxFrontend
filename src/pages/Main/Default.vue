<template>
<v-content>
    <v-container fluid>
        <v-layout row wrap>
            <router-view name="chatList"></router-view>
            <router-view name="chat"></router-view>
            <v-flex lg3 md4 xs5>
                <v-select
                    :items="test"
                    counter
                    dense
                    no-data-text
                    single-line
                    filter="cutSelectValue"
                    label="TEEEEEEEEEEESTTTTTTTT"
                ></v-select>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</template>

<script>
export default {
    name: "Default",
    data: function(){
        return {
            drawer: true,
            test: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, natus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, natus.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, natus.', 'asdasd'],
            items: [
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend?',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
                }
            ]
        }
    },
    filters: {
        cutSelectValue(val){
            if(val.length > 20){
                return val.slice(0,20) + '...'
            }
        }
    }

}
</script>

<style lang="sass" scoped>

</style>