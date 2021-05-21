<template>
    <div class="dashboard">
        <div class="top" :key="index">
            <el-card class="box-card" shadow="always" v-for="(item,index) in 3" :key="index">
                从不显示
            </el-card>
        </div>

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
.dashboard{
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    .top{
        display: flex;
        justify-content: space-evenly;
        .box-card{
            width: 30%;
        }
    }
}
</style>
