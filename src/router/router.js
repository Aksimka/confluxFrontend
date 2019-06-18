import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
//PAGES
import Main from './../pages/Main'
import Toolbar from './../pages/Main/Toolbar'
import Default from './../pages/Main/Default'

import LeftNavigation from './../pages/Main/Left-navigation'
import dialog from './../pages/Main/Default/Dialog'
import chat from './../pages/Main/Default/Dialog/Chat'
import profile from './../pages/Main/Default/Profile'
import friends from './../pages/Main/Default/Friends'
import createDialog from './../pages/Main/Default/CreateDialog'
import logout from './../pages/Main/Default/LogOut';



import User from './../pages/User'
import Auth from './../pages/User/Auth'
import Registration from './../pages/User/Registration'
import Page404 from './../pages/Page404'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/user',
            component: Main,
            // beforeCreate(to, from, next) {
            //     console.log(store.getters.checkUser, 'checking user');
            //     store.getters.checkUser ? next(): next('/auth');
            // },
            children: [
                {
                    path: ':id',
                    components: {
                        LeftNavigation,
                        Toolbar,
                        Default
                    },
                    children: [
                        {
                            path: 'dialog',
                            component: dialog,
                            children: [
                                {
                                    path: ':dialog',
                                    component: chat,
                                }
                            ]
                        },
                        {
                            path: 'profile',
                            component: profile
                        },
                        {
                            path: 'friends',
                            component: friends
                        },
                        {
                            path: 'createDialog',
                            component: createDialog
                        }
                    ]
                },
                {
                    path: 'out',
                    component: logout
                }
            ]
        },
        {
            path: '/',
            component: User,
            children: [
                {
                    path: '',
                    redirect: 'auth'
                },
                {
                    path: 'auth',
                    component: Auth
                },
                {
                    path: 'registration',
                    component: Registration
                },
            ]
        },
        {
            path: '*',
            component: Page404
        }
    ]
})
