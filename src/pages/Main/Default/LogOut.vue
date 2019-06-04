<template>
    <div class="logout">
        <div class="logout__text">Logging out...</div>
    </div>
</template>

<script>
    export default {
        name: "LogOut",
        created(){
            console.log('out');
        }
    }
</script>

<style lang="sass" scoped>
.logout
    width: 100vw
    height: 100vh
    display: flex
    justify-content: center
    align-items: center

.logout__text
    font-size: 24px
    color: #ffa33d
    font-weight: bolder

</style>