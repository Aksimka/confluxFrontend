<template lang="pug">
.input-block
    input(:name="name" @input="write()" @focus="isFocused = true" @blur="isFocused = false" v-model="value" v-validate="pattern" :type="inputType")
    .input-block__placeholder(:class="{ input_focused: isFocused || value.length > 0 }") {{ placeholder }}
    .input-block__line(:class="{'input-block__line_focused': isFocused && value.length === 0, 'input-block__line_danger': errors.has(name) || $parent.errors.has('SomeField'), 'input-block__line_success': !errors.has(name)  && value.length !== 0}")
</template>

<script>
export default {
    name: "Input-one",
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        pattern: {
            type: String,
            default: ''
        },
        inputType: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            required: true
        }
    },
    data: function(){
        return {
            greeting: "hi",
            isFocused: false,
            value: ''
        }
    },
    methods: {
        write(){
            this.$emit('write', this.value)
        }
    }
}
</script>

<style lang="sass" scoped>
.input-block
    position: relative
input
    border: 0px
    width: 100%
    background: inherit
    color: #5d5d5d
    font-size: 18px
    padding: 12px 5px 8px 5px
    &:focus
        outline: none
input:-webkit-autofill
    box-shadow: inset 0 0 0 1000px #FBF0C0

.input-block__placeholder
    position: absolute
    top: 14px
    left: 5px
    color: #999999
    transition: .5s
    font-size: 18px
.input_focused
    top: 0
    left: 0
    font-size: 11px
    color: #000000


.input-block__line
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    background: #666666
    height: 2px
    -webkit-border-radius: 1px
    -moz-border-radius: 1px
    border-radius: 1px
    transition: .5s


.input-block__line_focused
    background: #7eb0ff
.input-block__line_danger
    background: #ed6f67
.input-block__line_success
    background: #71ff6b
    
</style>