<template>
    <div class="app">
        App
        <home></home>
        <button @click="addFriend">addFriend</button>
    </div>
</template>

<script>
import Home from './Home.vue';
import { computed } from 'vue';
export default {
    components:{
        Home
    },
   
    // 在根组件中通过provides属性为子组件和孙子组件提供数据
    provide(){
       return {
        name: 'why',
        age:18,
        friends: this.friends,
        friendLength: computed(() => this.friends.length)
       }
    },
    data () {
        return {
            friends: ["jack","rose"]
        }
    },
    methods: {
        addFriend(){
            this.friends.push("Jony")
        }
    }
}
</script>

<style lang="scss" scoped>

</style>