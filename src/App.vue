<!--App.vue-->
<template>
    <div id="app">
<!--        <p>hello world!!!</p>-->
<!--        <img alt="Vue logo" src="@/assets/logo.png" />-->
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'App',
    components: {  },
    setup() {

    }

})
</script>
