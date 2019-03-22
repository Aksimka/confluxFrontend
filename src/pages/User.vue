<template lang="pug">
.user
    .user-template
        .user-template-wrapper
            .user-template-top
                .user-template-top-choose
                    .user-template-top-choose__underline
                    .user-template-top-choose__item(v-for="item in chooseItems" @click="choose(item.id)") {{ item.text }}
            .user-template-form
                transition(name="fade")
                    router-view
            .user-template-forgot
</template>
<script>
export default {
    name: 'User',
    mounted: function(){
        let menuItems = document.querySelectorAll('.user-template-top-choose__item');
        let menuLine = document.querySelector('.user-template-top-choose__underline');
        let itemWidths = []
        for (let i = 0; i < menuItems.length; i++){
            itemWidths[i] = menuItems[i].clientWidth
        }
        menuLine.style.width = `${itemWidths[0]}px`;
    },
    data: function(){
        return {
            chooseItems: [
                {
                    id: 0,
                    text: 'sign in'
                },
                {
                    id: 1,
                    text: 'sign up'
                }
            ]
        }
    },
    methods: {
        choose: function(id){
            let menuItems = document.querySelectorAll('.user-template-top-choose__item');
            let menuLine = document.querySelector('.user-template-top-choose__underline');

            menuLine.style.left = `${menuItems[id].offsetLeft}px`;
            menuLine.style.width = `${menuItems[id].clientWidth}px`;
            if(id === 0){
                this.$router.push('auth')
            }
            if(id === 1){
                this.$router.push('registration')
            }
        }
    }

}
</script>

<style lang="sass" scoped>
.user
    height: 100vh
    /*background: linear-gradient(to right bottom, #7d4577, #400d37)*/
    background: linear-gradient(to right bottom, #a3ffa7, #ebff8b)
    display: flex
    align-items: center
    justify-content: center
    font-family: 'Roboto', sans-serif

.user-template
    width: 433px
    height: 555px
    background: rgba(255, 255, 255, 0.65)
    overflow: hidden
    /*margin-top: 336px*/
.user-template-wrapper
    margin: 44px 44px
.user-template-top-choose
    display: flex
    width: auto
    color: #ffffff
    text-transform: uppercase
    font-size: 23px
    position: relative
.user-template-top-choose__item
    cursor: pointer
    color: #333333
.user-template-top-choose__item:last-child
    margin-left: 40px
.user-template-top-choose__underline
    position: absolute
    bottom: -9px
    left: 0
    height: 4px
    background: #F2AB30
    -webkit-border-radius: 2px
    -moz-border-radius: 2px
    border-radius: 2px
    transition: .3s all

.user-template-form
    position: relative

.registration.fade-enter
    transform: translateX(500px)
.registration.fade-enter-active
    transition: .2s
    transition-delay: .2s
.registration.fade-enter-to
    transform: translateX(0px)
.registration.fade-leave
    transform: translateX(0px)
.registration.fade-leave-active
    transition: .2s
.registration.fade-leave-to
    transform: translateX(500px)

.auth.fade-enter
    transform: translateX(-500px)
.auth.fade-enter-active
    transition: .2s
    transition-delay: .2s
.auth.fade-enter-to
    transform: translateX(0px)
.auth.fade-leave
    transform: translateX(0px)
.auth.fade-leave-active
    transition: .2s
.auth.fade-leave-to
    transform: translateX(-500px)
</style>