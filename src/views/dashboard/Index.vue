<template>
    <div>
        面板页
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useStore} from 'vuex';


export default defineComponent({
    name: 'Dashboard',
    setup() {
        const store = useStore()
        // console.log(store.state.token);

        return {

        }
    }


})
</script>
<style scoped lang="scss">

</style>
