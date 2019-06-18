<template lang="pug">
.auth(@submit.prevent="validateBeforeSubmit")
    form.auth-form
        .input-wrapper
            InputOne(name="login" placeholder="Логин" pattern="email" type="text" @write="pushValue($event, 'email')")
        .input-wrapper
            InputOne(name="password" placeholder="Пароль" pattern="alpha_num|min:5|max:20" inputType="password" @write="pushValue($event, 'password')")
        .input-wrapper
            CheckboxOne(name="keep" text="Запомнить пароль")
        .input-wrapper
            ButtonDefault(type="input" :text="btnText" :primary="!isWrong" :danger="isWrong")
    .auth__error-message {{errMess}}
    .auth-forgot-password
        a.auth-forgot-password__btn(href="#") Забыли пароль?


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
            email: '',
            password: '',
            errMess: null,
            loginError: '',
            isWrong: false,
            btnText: 'Войти',
            conformError: null
        }
    },
    methods: {
        validateBeforeSubmit () {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    const user = {
                        email: this.email,
                        password: this.password,
                        name: this.name
                    };
                    this.btnText = 'Loading...';
                    this.$store.dispatch('loginUser', user)
                        .then(()=>{
                            console.log('logged in');
                            this.errMess = null;
                            console.log(this.$store.getters.getUser);
                            this.$router.push(`/user/${this.$store.getters.getUser.id}`)
                        })
                        .catch(()=> {
                            this.isWrong = true;
                            this.btnText = 'Попробуйте снова';
                            console.log(this.errors)
                        });
                }
                if(this.conform === true) {
                    this.conformError = false
                }
                console.log(this.email, this.password, this.conform)
            });
        },
        pushValue($event, name){
            if(name === 'email'){
                this.email = $event
            }
            if(name === 'password'){
                this.password = $event
            }
        }
    },
    computed: {

    },
    mounted(){

    }
}
</script>

<style lang="sass">
.auth
    color: #ffffff
    margin-top: 90px
.wrong
    background: #ff6e3e
    color: #ffffff

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