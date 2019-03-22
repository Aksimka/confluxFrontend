<template lang="pug">
button.btn(:type="buttonType" :class="{'primary': primary, 'success': success, 'warning': warning, 'danger': danger, 'dark': dark,}") {{ text }}
</template>

<script>
export default {
    name: "Button-default",
    props: {
        text: {
            type: String,
            default: 'Button'
        },
        buttonType: {
            type: String,
            default: ''
        },
        primary: {
            type: Boolean,
            default: false
        },
        success: {
            type: Boolean,
            default: false
        },
        warning: {
            type: Boolean,
            default: false
        },
        danger: {
            type: Boolean,
            default: false
        },
        dark: {
            type: Boolean,
            default: false
        }
    },
    data: function(){
        return {
            greeting: "hi"
        }
    }

}
</script>

<style lang="sass" scoped>
.btn
    border: 0
    padding: 10px 0
    width: 200px
    display: flex
    justify-content: center
    cursor: pointer
    color: #ffffff
    font-weight: bolder
    font-size: 18px
.primary
    background: #2d4ef5
.success
    background: #4CE2A7
.danger
    background: #E24C4C
.warning
    background: #F1A153
.dark
    background: #022047
</style>