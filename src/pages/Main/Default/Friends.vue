<template>
    <v-content>
        <v-container>
            <v-layout row wrap>
                <v-flex md8>
                    <v-text-field
                            v-model="friendSearch"
                            label="Поиск"
                            append-outer-icon="search"
                    >
                    </v-text-field>
                    <v-tabs
                            v-model="tabs"
                            color="transparent"
                            slider-color="white"
                    >
                        <v-tab>
                            Вcе друзья
                        </v-tab>
                        <v-tab>
                            Онлайн
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tabs">
                        <v-tab-item>

                        </v-tab-item>
                    </v-tabs-items>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex md2>
                    <v-list>
                        <template v-for="item in menuItems">
                            <v-list-tile :key="item.title" :to="item.path" @click="item.func">
                                <!--<v-list-tile-action>-->
                                    <!--<v-icon>{{ item.icon }}</v-icon>-->
                                <!--</v-list-tile-action>-->
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-flex>
                <v-spacer></v-spacer>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: "Friends",
        data(){
            return {
                friendSearch: '',
                tabs: null
            }
        },
        computed: {
            menuItems(){
                return [
                    {title: 'Friends', path: `/user/${this.user.id}/friends`},
                    {title: 'Find people', path: `/user/${this.user.id}/findPeople`},
                ]
            },
            user(){
                return this.$store.getters.getUser
            }
        }
    }
</script>

<style scoped>

</style>