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

                        <div @click="modify">修改密码</div>
                        <div @click="signout">退出登录</div>
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
import {defineComponent, inject} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

import Side from './side/Index.vue'

export default defineComponent({
    name: 'login',
    components: {
        Side
    },
    setup() {
        const $app:any = inject("$app");
        console.log($app);

        // const store = useStore()
        // const router = useRouter()
        const modify = () => {
            console.log('修改密码');
        }
        const signout = () => {
            $app.$store.dispatch('delToken');
            $app.$router.push('/login')
        }
        return {
            modify,
            signout
        }
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


//路由切换动画
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
// 渐入
.fade-right-enter-active {
    transition: all 0.5s;
}
.fade-right-leave-active {
    transition: all 0.5s;
}
.fade-right-enter-from {
    opacity: 0;
    transform: translateX(-35px);
}
.fade-right-leave-to {
    opacity: 0;
    transform: translateX(35px);
    display: none;
}
// 上滑
.fade-top-enter-active {
    transition: all 0.3s;
}
.fade-top-leave-active {
    transition: all 0.3s;
}
.fade-top-enter-from {
    opacity: 0;
    transform: translateY(35px);
}
.fade-top-leave-to {
    opacity: 0;
    transform: translateY(-35px);
    display: none;
}
</style>
