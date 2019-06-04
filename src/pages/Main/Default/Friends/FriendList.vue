<template>
    <v-container grid-list-md>
        <v-text-field
                v-model="friendSearch"
                label="Поиск"
                append-outer-icon="search"
        >
        </v-text-field>
        <v-layout wrap>
            <v-flex md3 v-for="i in 1">

                <friend-card name="Kolya" mail="asd@asd.ru"></friend-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import FriendCard from '@/components/Cards/PeopleCard'
    export default {
        name: "FriendList",
        components: {
            'friend-card': FriendCard
        },
        data(){
            return {
                friendSearch: ''
            }
        }
    }
</script>

<style scoped>

</style>