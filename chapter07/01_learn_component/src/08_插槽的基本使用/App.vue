<template>
    <div>
        <!-- 1.默认没有插入内容 -->
         <my-slot-cpn></my-slot-cpn>
        <!-- 2.插入一个元素 -->
         <my-slot-cpn>
            <button>我是一个按钮</button>
         </my-slot-cpn>
         <!-- 插入一个文本 -->
          <my-slot-cpn>
            我是一个文本
         </my-slot-cpn>
         <!-- 插入一个组件 -->
        <my-slot-cpn>
            <mybutton></mybutton>
        </my-slot-cpn>
         <!-- 插入更多 -->
          <my-slot-cpn>
            <button>我是button</button>
            <strong>我是Strong</strong>
         </my-slot-cpn>

    </div>
</template>

<script>
    import MySlotCpn from './MySlotCpn.vue';
    import Mybutton from './Mybutton.vue';
    export default {
        components:{
            MySlotCpn,
            Mybutton
        }
    }
</script>

<style lang="scss" scoped>

</style>