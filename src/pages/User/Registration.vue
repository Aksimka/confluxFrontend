<template lang="pug">
form.registration(@submit.prevent="validateBeforeSubmit")
    .input-wrapper
        InputOne(name="username" placeholder="Логин" pattern="alpha_num|min:5|max:20|required" type="text" @write="pushValue($event, 'login')")
    .input-wrapper
        InputOne(name="email" placeholder="Email" pattern="email|required" type="text" @write="pushValue($event, 'email')")
    .input-wrapper
        InputOne(name="password" placeholder="Пароль" pattern="alpha_num|min:5|max:20|required" inputType="password" @write="pushValue($event, 'password')")


    .input-wrapper
        ButtonDefault(type="submit" :text="btnText" :primary="!isWrong" :danger="isWrong" :success="registrated")
    .message {{errMess}}
</template>

<script>
    import InputOne from './../../components/Input-one'
    import CheckboxOne from './../../components/Checkbox-one'
    import ButtonDefault from './../../components/Buttons/Button-default'
    import axios from 'axios'
    export default {
        name: 'Registration',
        components: { ButtonDefault, CheckboxOne, InputOne },
        data: function () {
            return {
                login: '',
                email: '',
                password: '',
                conform: false,
                conformError: false,
                errMess: null,
                isWrong: false,
                btnText: 'Зарегистрироваться',
                registrated: false,
            }
        },
        methods: {
            validateBeforeSubmit () {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.btnText = 'Загрузка...';
                        const user = {
                            email: this.email,
                            password: this.password,
                            name: this.login
                        };
                        this.$store.dispatch('registerUser', user)
                            .then(()=>{
                                console.log('registrated');
                                this.registrated = true;
                                this.isWrong = false;
                                this.btnText = 'Успешно';
                                this.errMess = null;
                            })
                            .catch(()=> {
                                this.errMess = 'Пользователь с данным email уже зарегестрирован.';
                                console.log(this.errors);
                                this.registrated = false;
                                this.isWrong = true;
                                this.btnText = 'Попробуйте снова';
                            });
                    }
                    if(this.conform === true) {
                        this.conformError = false
                    }
                    console.log(this.login, this.email, this.password, this.conform)
                });
            },
            pushValue($event, name) {
                if(name === 'login') {
                    this.login = $event
                }
                if(name === 'email') {
                    this.email = $event
                }
                if(name === 'password') {
                    this.password = $event
                }
                if(name === 'conform') {
                    this.conform = $event
                }
            }
        }

    }
</script>

<style lang="sass" scoped>
.registration
    color: #ffffff
    padding-top: 20px
    /*width: 400px*/
    /*height: 600px*/
    /*background: #ffffff*/
    /*-webkit-border-radius: 35px*/
    /*-moz-border-radius: 35px*/
    /*border-radius: 35px*/
.input-wrapper
    margin-top: 50px
.input-wrapper:nth-child(4)
    margin-top: 45px
.input-wrapper:nth-child(5)
    margin-top: 37px
    display: flex
    justify-content: center
    align-items: center
.message
    color: #ff8079
    text-align: center
    margin-top: 15px

.warning
    animation: warning .5s


@keyframes warning
    0%
        transform: translateX(0px)
    25%
        transform: translateX(-20px)
    50%
        transform: translateX(20px)
    75%
        transform: translateX(-10px)
    100%
        transform: translateX(0px)



</style>