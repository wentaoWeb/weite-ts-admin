<template>
    <div>
        <el-menu default-active="/dashboard" class="el-menu-vertical-demo"
                 @select="handSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router>
            <el-menu-item index="/dashboard">
                <i class="el-icon-menu"></i>
                <template #title>Dashboard</template>
            </el-menu-item>
            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <template #title>首页</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue'


export default defineComponent({
    name: 'Side',
    setup() {
        function handSelect(key, keyPath){
            // console.log(key, keyPath);
            console.log('点击路由');
        }


        return {
            handSelect
        }
    }


})
</script>
<style scoped lang="scss">
.el-menu-vertical-demo {
    overflow-x: hidden;
    border: none;
    .el-submenu .el-menu-item, .el-submenu, .el-menu-item {
        min-width: 200px;
    }

    .el-submenu__title {
        display: flex;
        justify-content: flex-start;
    }

    .el-menu-item-group__title {
        padding: 0;
    }

    .el-submenu {
        .el-submenu__title {
            padding-left: 20px;
        }
    }
    .el-menu-item{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        //margin-left: 10px;
    }

}

</style>
