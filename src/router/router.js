import Vue from 'vue'
import Router from 'vue-router'
//PAGES
import Main from './../pages/Main'
import Toolbar from './../pages/Main/Toolbar'
import Default from './../pages/Main/Default'
import LeftNavigation from './../pages/Main/Left-navigation'
import chatList from './../pages/Main/Default/ChatList'
import chat from './../pages/Main/Default/Chat'



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
            children: [
                {
                    path: ':id',
                    components: {
                        LeftNavigation,
                        Toolbar,
                        Default
                    }
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
                }
            ]
        },
        {
            path: '*',
            component: Page404
        }
    ]
})
