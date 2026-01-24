<template>
    <div class="app">
        <!-- 直接传递字符串 -->
        <!-- <show-message title="我是标题" content="我是内容"></show-message> -->
        <!-- 绑定字符串内容的变量 -->
        <!-- <show-message :title="title" :content="content"></show-message> -->
        <!-- 绑定对象中字符串类型属性 -->
        <!-- <show-message :title="message.title" :content="message.content"></show-message>

        <show-message message-info="我是message-info字符串"></show-message>

        <show-message messageInfo="我是messageInfo字符串"></show-message> -->

        <no-prop-attribute id="corder" name="corderWay" class="way"></no-prop-attribute>
        
    </div>
</template>

<script>
    import ShowMessage from './ShowMessage.vue';
    import NoPropAttribute from './NoPropAttribute.vue';
    export default {
        components: {
            ShowMessage,
            NoPropAttribute
        },
        data () {
            return {
                title: "我是标题title",
                content: "我是内容content",
                message:{
                    title: "我是标题message.title",
                    content: "我是标题message.content"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>