<template>
    <div class="home-content">
        HomeContent
    </div>
</template>

<script>
import emitter from './utils/eventbus';
    export default {
        name:'HomeContent',
        created(){
            // 监听全局why事件。参数1.事件名称 参数2 监听事件回调函数
            emitter.on("why",(info)=>{
                debugger
                console.log("why111", info)
            })
            // 监听全局kobe事件。
            emitter.on("kobe",(info)=>{
                console.log("kobe", info)
            })
            // 监听全局all事件。
            emitter.on("*",(type,info)=>{
                console.log("* listener:", type, info)
            })
        }
    }
</script>

<style scoped>
.home-content{
    border: 1px solid red;
}
</style>