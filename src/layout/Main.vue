<template>
    <div>
        <el-container>
            <el-header>
                <div class="head-left">
                    LOGO
                </div>
                <div class="head-right">
                    <el-popover
                        style="width: 120px;min-width: 80px"
                        placement="bottom"
                        :width="80"
                        trigger="hover"
                        popper-class="popover-user"
                    >
                        <template #reference>
                            <el-avatar shape="circle" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </template>

                        <div>修改密码</div>
                        <div>退出登录</div>
                    </el-popover>

                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <side/>
                </el-aside>
                <el-main>
                    <el-scrollbar>
                        <router-view v-slot="{ Component }">
                            <transition name="fade-top" mode="out-in">
                                <component :is="Component" />
                            </transition>
                        </router-view>
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue'

import Side from './side/Index.vue'

export default defineComponent({
    name: 'login',
    components: {
        Side
    },
    setup() {

    }
})
</script>

<style scoped lang="scss">
.el-container {
    background-color: #fff;
    .el-header {
        background-color: #26394d;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 45px;
        .head-left {
            color: #FFFFFF;
        }
        .head-right {
            width: 40px;
            height: 40px;

            .el-avatar{
                display: flex;
                width: 40px;
                height: 40px;
            }
        }
    }

    .el-container {
        display: flex;

        .el-aside {
            background-color: #545c64;
            color: #333;
            text-align: center;
            height: calc(100vh - 60px);
        }

        .el-main {
            margin: 10px;
            border-radius: 3px;
            width: 100%;
            background-color: #E9EEF3;
            color: #333;
            text-align: center;
            line-height: 160px;
        }
    }

}

</style>
