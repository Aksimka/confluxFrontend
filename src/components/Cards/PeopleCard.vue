<template>
    <v-card>
        <v-img
                :src="ava"
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
            <slot name="btn"></slot>
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
        computed: {
            ava(){
                if(this.avatar === ''){
                    return '/images/default-avatar.png'
                }
                else return this.avatar;
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
            },
            lastVisit: {
                type: String
            }
        }
    }
</script>

<style scoped>

</style>