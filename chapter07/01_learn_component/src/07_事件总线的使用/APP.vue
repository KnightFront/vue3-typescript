<template>
    <div class="app">
        APP
        <home/>
        <about/>
    </div>
</template>

<script>
import Home from './Home.vue';
import About from './About.vue';
    export default {
        components:{
            Home,
            About
        }
    }
</script>

<style scoped>
.app{
    border: 1px solid red;
}
</style>