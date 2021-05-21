<template>
    <div class="dashboard">
        <div class="top" :key="index">
            <el-card class="box-card" shadow="always" v-for="(item,index) in topList" :key="index">
                <div class="el-card__body">
                    <img v-if="item.image" :src="item.image" class="card-img" alt="">
                    <div class="card-text">
                        <div>{{ item.cname }}</div>
                        <div>{{ item.number }}</div>
                    </div>
                </div>

            </el-card>
        </div>

    </div>
</template>

<script lang="ts">
import {defineComponent, inject, onMounted, reactive} from 'vue'
import {useStore} from 'vuex';
import {ref} from "@vue/composition-api";


export default defineComponent({
    name: 'Dashboard',
    setup() {
        const $app: any = inject("$app")
        // const topList:any[] = [
        //     {
        //         icon:require("")
        //     }
        // ]
        const state = reactive({
            topList: []
        })
        const store = useStore()

        function queryList() {
            $app.$api.all('post', '/dashboard/top', {}).then(res => {
                state.topList = res.data
                console.log(state.topList)
            })
        }

        onMounted(() => {
            queryList()
        })
        return state


    }


})
</script>
<style scoped lang="scss">
.dashboard {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;

    .top {
        display: flex;
        justify-content: space-evenly;
        height: 150px;

        .box-card {
            width: 30%;
            height: 150px;

            .el-card__body {
                display: flex;
                align-items: center;

                .card-img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                }

                .card-text {
                    margin-left: 20px;
                    line-height: 30px;
                    text-align: left;
                }
            }
        }
    }
}
</style>
