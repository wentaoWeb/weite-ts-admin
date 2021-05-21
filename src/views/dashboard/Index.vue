<template>
    <div class="dashboard">
        <div class="top">
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

        <div class="center" id="chart" ref="chartRef"></div>


    </div>
</template>

<script lang="ts">
import {defineComponent, inject, onMounted, reactive,ref} from 'vue'
import * as echarts from "echarts"

export default defineComponent({
    name: 'Dashboard',
    setup() {
        const $app: any = inject("$app")

        const state = reactive({
            topList: []
        })
        const chartRef = ref<HTMLDivElement | null>(null);
        const initChart = () =>{
            const chart = echarts.init(document.getElementById('chart'))
            let option:echarts.EChartsOption = {
                color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    top:'20',
                    data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
                },
                grid: {
                    top:'60',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Line 1',
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(128, 255, 165)'
                            }, {
                                offset: 1,
                                color: 'rgba(1, 191, 236)'
                            }])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [140, 232, 101, 264, 90, 340, 250]
                    },
                    {
                        name: 'Line 2',
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 221, 255)'
                            }, {
                                offset: 1,
                                color: 'rgba(77, 119, 255)'
                            }])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 282, 111, 234, 220, 340, 310]
                    },
                    {
                        name: 'Line 3',
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(55, 162, 255)'
                            }, {
                                offset: 1,
                                color: 'rgba(116, 21, 219)'
                            }])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [320, 132, 201, 334, 190, 130, 220]
                    },
                    {
                        name: 'Line 4',
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255, 0, 135)'
                            }, {
                                offset: 1,
                                color: 'rgba(135, 0, 157)'
                            }])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [220, 402, 231, 134, 190, 230, 120]
                    },
                    {
                        name: 'Line 5',
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        label: {
                            show: true,
                            position: 'top'
                        },
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255, 191, 0)'
                            }, {
                                offset: 1,
                                color: 'rgba(224, 62, 76)'
                            }])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [220, 302, 181, 234, 210, 290, 150]
                    }
                ]
            }
            chart.setOption(option,true)
        }
        function queryList() {
            $app.$api.all('post', '/dashboard/top', {}).then(res => {
                state.topList = res.data
            })
        }

        onMounted(() => {
            queryList()
            initChart()
        })
        return state
        return {
            chartRef
        }

    }


})
</script>
<style scoped lang="scss">
.dashboard {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

    .top {
        display: flex;
        justify-content: space-between;
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

    .center {
        width: 100%;
        height: 500px;
        margin-top: 10px;
        border-radius: 3px;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
        //background-color: #777777;
    }
}
</style>
