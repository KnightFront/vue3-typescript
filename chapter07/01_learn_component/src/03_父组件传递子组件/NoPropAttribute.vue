<template>
    <div>
        <!-- 该组件没有定义任何props属性 -->
         该组件没有定义任何props属性
         <!-- <h4 :class="$attrs.class">{{ $attrs.id }} - {{ $attrs.name }}</h4> -->
        <div class="no-prop-attribute">该子组件没有定义任何prop属性(节点1)</div>
        <div class="no-prop-attribute">该子组件没有定义任何prop属性(节点2)</div>

        <div class="no-prop-attribute" :class="$attrs.class">该子组件没有定义任何prop属性(节点2)</div>

    </div>
</template>

<script>
    export default {
        name:"NoPropAttribute",
        inheritAttrs:false
    }
</script>

<style lang="scss" scoped>

</style>