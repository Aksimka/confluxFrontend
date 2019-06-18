<template>
<div class="default">
    <router-view></router-view>
</div>


</template>

<script>


export default {
    name: "Default",
}
</script>

<style lang="sass">
.default
    background: url('/images/backgrounds/white-scratch-lines.png')
    height: 100vh
.h100
    height: 100%
.chat-wrapper
    background: #FAFAFA
.dialog-list
    overflow-y: scroll
    height: 85vh

</style>