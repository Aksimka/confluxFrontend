<template>
    <v-card>
        <v-img
                :src="avatar"
                height="200px"
                gradient="to top right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)"
        >
            <v-layout pa-2 column fill-height class="white--text">
                <v-spacer></v-spacer>
                <v-flex shrink>
                    <div class="subheading">{{name}}</div>
                    <div class="body-1">{{mail}}</div>
                </v-flex>

            </v-layout>
        </v-img>

        <v-card-actions pa-0>
            <v-btn
                    block
                    color="blue-grey"
                    class="white--text"
            >
                Create Chat
                <v-icon right dark>question_answer</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "FriendCard",
        data(){
            return{

            }
        },
        props: {
            avatar: {
                type: String,
                default: '/images/default-avatar.png'
            },
            name: {
                type: String,
                required: true
            },
            mail: {
                type: String
            }
        }
    }
</script>

<style scoped>

</style>