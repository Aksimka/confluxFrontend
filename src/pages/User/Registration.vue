<template lang="pug">
form.registration(@submit.prevent="validateBeforeSubmit")
    .input-wrapper
        InputOne(name="username" placeholder="Username" pattern="alpha_num|min:5|max:20|required" type="text" @write="pushValue($event, 'login')")
    .input-wrapper
        InputOne(name="email" placeholder="Email" pattern="email|required" type="text" @write="pushValue($event, 'email')")
    .input-wrapper
        InputOne(name="password" placeholder="Password" pattern="alpha_num|min:5|max:20|required" type="text" @write="pushValue($event, 'password')")
    .input-wrapper(:class="{'warning': conformError}")
        CheckboxOne(name="agree" text="I agree to terms and conditions" @changeCheckBox="pushValue($event, 'conform')")
    .input-wrapper
        ButtonDefault(type="submit" text="REGISTER" :primary="true")
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
                conformError: false
            }
        },
        methods: {
            validateBeforeSubmit () {
                this.$validator.validateAll().then((result) => {

                    this.errors.clear()
                    if(this.login === '' || this.email === '' || this.password === '') {
                        this.errors.add({
                            field: 'SomeField',
                            msg: 'All fields are required.'
                        })
                        console.log(this.errors)
                    }
                    if(this.conform === false) {
                        this.conformError = true
                        this.errors.add({
                            field: 'Checkbox',
                            msg: 'You need to agree with our terms.'
                        })
                    }
                    else if (result) {
                        if(this.conform === false) {
                            this.conformError = true
                        }
                        axios({
                            method: 'post',
                            url: 'https://localhost:3000/user/registration',
                            data: {
                                login: this.login,
                                mail: this.email,
                                password: this.password
                            }
                        })
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