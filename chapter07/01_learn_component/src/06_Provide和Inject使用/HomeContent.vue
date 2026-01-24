<template>
    <div class="HomeContent">
        <!-- 孙子组件 -->
         HomeContent
        <p>{{ name }} - {{ age }} - {{ friends }}- {{ friendLength }}</p>
    </div>
</template>

<script>
    export default {
        inject: ["name", "age", "friends", "friendLength"]
    }
</script>

<style lang="scss" scoped>

</style>