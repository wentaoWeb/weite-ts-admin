<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
import {defineComponent} from 'vue'


export default defineComponent({
    name: 'login',
    setup() {

    }
})
</script>

<style scoped lang="scss">
.el-container {
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-container{
        display: flex;
        .el-aside {
            background-color: #D3DCE6;
            color: #333;
            text-align: center;
            height: calc(100vh - 60px);
        }

        .el-main {
            width: 100%;
            background-color: #E9EEF3;
            color: #333;
            text-align: center;
            line-height: 160px;
        }
    }

}

</style>
