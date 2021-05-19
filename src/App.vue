<!--App.vue-->
<template>
    <div id="app">
<!--        <p>hello world!!!</p>-->
<!--        <img alt="Vue logo" src="@/assets/logo.png" />-->
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { getCurrentInstance, provide } from "vue";
export default {
    setup() {
        const { appContext } = getCurrentInstance();
        const $app = appContext.config.globalProperties;
        // console.log("--$app--", $app);
        provide("$app", $app);
    }
};
</script>
