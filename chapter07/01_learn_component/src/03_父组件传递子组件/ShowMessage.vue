<template>
    <div class="show-message">
        <h4>{{ title }}</h4>
        <div>{{ content }}</div>

        <div v-if="messageInfo">{{ messageInfo }}</div>
    </div>
</template>

<script>
    export default {
        // props: ['title', 'content']
        props:{
            title:String,
            content:{
                type:String,
                // type支持的类型：String\Number\Boolean\Array\Object\Date\Function\Symbol
                require:true,
                default:"我是内容默认值"
            },
            // 1、基础类型检查
            propA: Number,
            // 2、多个可能类型
            propB: [String, Number],
            // 3.必填字符串
            propC: {
                type: String,
                required:true
            },
             // 4、带有默认值的数字
            propD:{
                type: Number,
                default: 100
            },
            // 5、带有默认值的对象
            propE:{
                type: Object,
                default(){
                    return {message: 'hello'}
                }
            },
            // 6、自定义验证函数
            propF:{
                validator(value){
                    // 这个值必须匹配下列字符串中的一个
                    return ['success', 'warning','danger'].includes(value)
                }
            },
            // 7.具有默认值的函数
            propG:{
                type: Function,
                default(){
                    return "DefaultFunction"
                }
            },
            'message-info': {
                type: String
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>