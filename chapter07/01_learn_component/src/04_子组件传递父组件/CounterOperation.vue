<template>
    <div>
        <!-- <button @click="increment">+1</button>
        <button @click="decrement">-1</button> -->
        <input type="text" name="" id="" v-model="num">
        <button @click="incrementN">+n</button>
    </div>
</template>

<script>
    export default {
        name:'CounterOperation',
        emits: ["add", "sub"],
        data () {
            return {
                num: 0
            }
        },
        methods:{
            increment(){
                this.$emit("add")
            },
            decrement(){
                this.$emit("sub")
            },
            incrementN(){
                this.$emit('addN',this.num, "why",18)
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>