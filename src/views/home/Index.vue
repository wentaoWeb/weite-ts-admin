<template>
    <div>首页</div>
</template>

<script lang="ts">
import { defineComponent,watchEffect,ref } from 'vue'


export default defineComponent({
    name: 'login',
    setup() {
        // const count = ref(0)
        //
        // watchEffect(() => console.log(count.value))// -> 打印出 0
        //
        // setTimeout(() => {
        //     count.value++// -> 打印出 1
        // }, 100)
    }
})
</script>
