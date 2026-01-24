<template>
    <div class="main">
        <main-banner/>
        <main-product-list/>
    </div>
</template>

<script>
    import MainBanner from './MainBanner.vue';
    import MainProductList from './MainProductList.vue';
    export default {
        components:{
            MainBanner,
            MainProductList
        }

    }
</script>

<style lang="scss" scoped>

</style>