<template>
<v-app id="inspire">
    <router-view name="leftNavigation"></router-view>
    <router-view name="toolbar"></router-view>
    <router-view name="Default"></router-view>
</v-app>
</template>

<script>
export default {
    name: "Main",
    data: function(){
        return {
        }
    }
}
</script>

<style lang="sass">

</style>
