<template>
    <div class="app">
        <!--<div class="modal">-->
            <!--<div class="modal__title"></div>-->
            <!--<div class="modal__text"></div>-->
        <!--</div>-->
        <router-view></router-view>
    </div>

</template>

<script>

    export default {
        name: 'App',
        data () {
            return {
                //
            }
        },
        computed: {
            registerResponse(){
                return this.$store.getters('getError')
            }
        },
    }
</script>

<style lang="sass">
    .cup
        cursor: pointer
    .modal
        position: absolute
        top: 15px
        right: 15px
        width: 300px
        height: 75px
        background: #ffffff
        -webkit-box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.75)
        -moz-box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.75)
        box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.75)
</style>
