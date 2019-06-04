<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <!--<div class="profile">-->
        <!--<div class="profile-content">-->
            <!--<div class="profile-content-header">-->
                <!--<div class="profile-content-header__avatar">-->
                    <!--<v-badge overlap bottom color="white">-->
                        <!--<template v-slot:badge>-->
                            <!--<span>-->
                                <!--<v-icon size="25px" color="amber" @click="changeAvatarModal">-->
                                    <!--edit-->
                                <!--</v-icon>-->
                            <!--</span>-->
                        <!--</template>-->
                        <!--<v-avatar  size="70px">-->
                            <!--<img :src="myInfo.avatar" alt="">-->
                        <!--</v-avatar>-->
                    <!--</v-badge>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="profile-content-body">-->
                <!--<div class="profile-content-body-items">-->
                    <!--<div class="profile-content-body-item">-->
                        <!--<div v-if="nameEdit">-->
                            <!--<v-text-field-->
                                    <!--label="Name"-->
                                    <!--v-model="myInfo.name"-->
                                    <!--@keyup.enter="changeUserName()"-->
                            <!--&gt;</v-text-field>-->
                        <!--</div>-->
                        <!--<div class="profile-content-body-item-front" v-else @click="nameEdit = true">-->
                            <!--<div>-->
                                <!--<div class="grey&#45;&#45;text profile-content-body-item__title">name:</div>-->
                                <!--<div class="profile-content-body-item__name">{{myInfo.name}}</div>-->
                            <!--</div>-->
                            <!--<div class="profile-content-body-item__edit">-->
                                <!--<v-icon size="20px">edit</v-icon>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="profile-content-body-item">-->
                        <!--<div v-if="mailEdit">-->
                            <!--<v-text-field-->
                                    <!--label="Name"-->
                                    <!--v-model="myInfo.mail"-->
                                    <!--@keyup.enter="changeUserMail()"-->
                            <!--&gt;</v-text-field>-->
                        <!--</div>-->
                        <!--<div class="profile-content-body-item-front" v-else @click="mailEdit = true">-->
                            <!--<div>-->
                                <!--<div class="grey&#45;&#45;text profile-content-body-item__title">mail:</div>-->
                                <!--<div class="profile-content-body-item__name">{{myInfo.mail}}</div>-->
                            <!--</div>-->
                            <!--<div class="profile-content-body-item__edit">-->
                                <!--<v-icon size="20px">edit</v-icon>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="profile-content-out">-->
                    <!--<v-btn color="error"-->
                            <!--@click="loggingOut()">-->
                        <!--Log out-->
                    <!--</v-btn>-->
                <!--</div>-->
            <!--</div>-->


        <!--</div>-->
    <!--</div>-->
    <v-content>
        <v-container>
            <v-layout row wrap>
                <v-spacer></v-spacer>
                <v-flex md4>
                    <v-card>
                        <v-img
                                :src="myInfo.avatar"
                                height="200px"
                                gradient="to top right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)"
                        >
                            <v-layout pa-2 column fill-height class="white--text">
                                <v-spacer></v-spacer>
                                <v-flex shrink>
                                    <div class="subheading">{{myInfo.name}}</div>
                                    <div class="body-1">{{myInfo.mail}}</div>
                                </v-flex>

                            </v-layout>
                        </v-img>

                        <v-card-title primary-title>
                            <div>
                                <div class="headline">Top western road trips</div>
                                <span class="grey--text">1,000 miles of wonder</span>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-btn flat>Share</v-btn>
                            <v-btn flat color="purple">Explore</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="show = !show">
                                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <v-slide-y-transition>
                            <v-card-text v-show="show">
                                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                            </v-card-text>
                        </v-slide-y-transition>
                    </v-card>
                </v-flex>
                <v-spacer></v-spacer>
            </v-layout>
        </v-container>
    </v-content>

</template>

<script>
    import shortCut from '@/mixins/dataShortCut'
    export default {
        name: "Profile",
        mixins: [shortCut],
        data(){
            return {
                nameEdit: false,
                mailEdit: false
            }
        },
        computed: {

        },
        methods: {
            changeAvatarModal(){
                console.log('change avatar modal on');
            },
            changeUserName(){
                console.log('username Changed');
                this.nameEdit = false;
            },
            changeUserMail(){
                console.log('username Changed');
                this.mailEdit = false;
            },
            loggingOut(){
                console.log('Logging out');
            }
        }
    }
</script>

<style lang="sass" scoped>
.profile
    position: relative
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
.profile-content
    width: 400px
    height: 70vh
    padding: 20px
    background: #ffffff
    -webkit-border-radius: 10px
    -moz-border-radius: 10px
    border-radius: 10px
.profile-content-header
    text-align: center
.profile-content-header__name
    font-size: 18px
    margin-top: 10px
.profile-content-body
    margin-top: 20px

.profile-content-body-item
    padding: 10px 20px
    transition: .3s
    cursor: pointer
    -webkit-border-radius: 5px
    -moz-border-radius: 5px
    border-radius: 5px
    &:hover
        background: #eeeeee
        .profile-content-body-item__edit
            opacity: 1
.profile-content-body-item__edit
    transition: .3s
    opacity: 0
.profile-content-body-item-front
    display: flex
    justify-content: space-between
    align-items: center
.profile-content-body-item__title
    font-size: 12px
.profile-content-out
    text-align: center
    margin-top: 50px
</style>