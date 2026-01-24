<template>
    <div class="about">
        <!-- 负责发送全局事件 -->
         About
         <button @click="btnClick">单机按钮触发事件</button>
    </div>
</template>

<script>
import emitter from './utils/eventbus';
    export default {
        methods:{
            btnClick(){
                console.log("1.About单机触发全局Why事件")
                emitter.emit("why",{name:"why", age:18})
                console.log("1.About单机触发全局kobe事件")
                emitter.emit("kobe",{name:"kobe", age:30})
            }
        }
    }
</script>

<style scoped>
.about{
    
    border: 1px solid red;
}
</style>