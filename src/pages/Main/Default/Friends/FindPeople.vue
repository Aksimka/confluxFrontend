<template>
    <v-container>
        <v-flex>
            <v-text-field
                    v-model="findSearch"
                    label="Поиск"
                    append-outer-icon="search"
            >
            </v-text-field>
        </v-flex>
        <v-layout wrap>
            <v-flex md3 v-for="i in 1">

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import shortCuts from '@/mixins/dataShortCut'
    export default {
        name: "FindPeople",
        mixins: [shortCuts],
        data(){
            return {
                findSearch: ''
            }
        },
        created(){
            this.$store.dispatch('peopleList', {collection: 'usersData', limit: 20})
        }
    }
</script>

<style scoped>

</style>