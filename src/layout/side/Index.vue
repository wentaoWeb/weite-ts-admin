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
<!--            <el-submenu index="1">-->
<!--                <template #title>-->
<!--                    <i class="el-icon-location"></i>-->
<!--                    <span>导航一</span>-->
<!--                </template>-->
<!--                <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--                <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--                <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--                <el-menu-item index="1-4-1">选项4</el-menu-item>-->
<!--                <el-submenu index="1-5">-->
<!--                    <template #title>-->
<!--                        <span>选项5</span>-->
<!--                    </template>-->
<!--                    <el-menu-item index="5-1-1">选项5-1</el-menu-item>-->
<!--                    <el-menu-item index="5-1-2">选项5-2</el-menu-item>-->
<!--                    <el-menu-item index="5-1-3">选项5-3</el-menu-item>-->
<!--                    <el-menu-item index="5-1-4-1">选项5-1</el-menu-item>-->
<!--                    <el-menu-item index="5-1-4-2">选项5-2</el-menu-item>-->
<!--                    <el-menu-item index="5-1-4-3">选项5-3</el-menu-item>-->
<!--                    <el-menu-item index="5-1-4-4">选项5-4</el-menu-item>-->
<!--                    <el-menu-item index="5-1-4-5">选项5-5</el-menu-item>-->
<!--                    <el-menu-item index="5-1-4-6">选项5-6</el-menu-item>-->
<!--                </el-submenu>-->
<!--            </el-submenu>-->
<!--            <el-menu-item index="2">-->
<!--                <i class="el-icon-menu"></i>-->
<!--                <template #title>导航二</template>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="4">-->
<!--                <i class="el-icon-setting"></i>-->
<!--                <template #title>导航四</template>-->
<!--            </el-menu-item>-->
        </el-menu>
    </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue'


export default defineComponent({
    name: 'Side',
    setup() {
        function handSelect(key, keyPath){
            console.log(key, keyPath);
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

}

</style>
