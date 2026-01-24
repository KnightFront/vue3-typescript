<template>
    <div class="App">
        <show-name :names="names">
            <template v-slot="slotProps">
                <span>{{slotProps.item}}- {{slotProps.index}}</span>
            </template>
        </show-name>
    </div>
</template>

<script>
    import ShowName from './ShowName.vue';
    export default {
        components:{
            ShowName
        },
        data () {
            return {
                names: ["why", "kobe", "jame", "curry"]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>