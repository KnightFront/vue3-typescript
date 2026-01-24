<template>
    <div class="show-name">
        <template v-for="(item, index) in names" :key="item">
            <slot :item="item" :index="index"></slot>
        </template>
    </div>
</template>

<script>
    export default {
        props:{
            names:{
                type:Array,
                default: ()=> []
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>