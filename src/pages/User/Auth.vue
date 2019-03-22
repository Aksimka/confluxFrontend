<template lang="pug">
.auth
    form.auth-form
        .input-wrapper
            InputOne(name="login" placeholder="Login" pattern="email" type="text" @write="pushValue($event, 'login')")
        .input-wrapper
            InputOne(name="password" placeholder="Password" pattern="alpha_num|min:5|max:20" type="text" @write="pushValue($event, 'password')")
        .input-wrapper
            CheckboxOne(name="keep" text="Keep me logged in")
        .input-wrapper
            ButtonDefault(type="input" text="LOGIN" :primary="true")
    .auth-forgot-password
        a.auth-forgot-password__btn(href="#") Forgot password?


</template>

<script>
import InputOne from './../../components/Input-one'
import CheckboxOne from './../../components/Checkbox-one'
import ButtonDefault from './../../components/Buttons/Button-default'
export default {
    name: "Auth",
    components: {ButtonDefault, CheckboxOne, InputOne},
    data: function(){
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        pushValue($event, name){
            if(name === 'login'){
                this.login = $event
            }
            if(name === 'password'){
                this.password = $event
            }
        }
    },
    computed: {

    }
}
</script>

<style lang="sass" scoped>
.auth
    color: #ffffff
    margin-top: 90px

.input-wrapper
    margin-top: 50px
.input-wrapper:nth-child(3)
    margin-top: 38px
.input-wrapper:nth-child(4)
    margin-top: 59px
    display: flex
    justify-content: center
.auth-forgot-password
    display: flex
    justify-content: center
    align-items: center
    margin-top: 25px
.auth-forgot-password__btn
    color: #333333
    font-size: 20px
    text-decoration: none
    font-weight: bolder
</style>