/**
 * 扩展echarts的类型
 */
declare namespace echarts {
    interface SelfEChartOption extends EChartOption {
        //允许任意属性存在
        [propName: string]: any
        xAxis?: any
        series?: any
        tooltip?: any
        visualMap?: any
        title?: any
        dataZoom?: any
        grid?: any
    }
}
