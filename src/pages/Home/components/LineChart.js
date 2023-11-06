import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const LineChart = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    const chartDom = document.getElementById('line_main')
    const myChart = echarts.init(chartDom)
    var option
    setTimeout(function () {
        option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                showContent: false,
            },
            dataset: {
                source: [
                    ['product', '2018', '2019', '2020', '2021', '2022', '2023'],
                    ['JavaScript', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
                    ['React', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                    ['Angular', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                    ['Vue', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
                    ['uni-app', 28.2, 35.1, 45.2, 20, 35.9, 45.1],
                ],
            },
            xAxis: { type: 'category' },
            yAxis: { gridIndex: 0 },
            grid: { top: '55%' },
            series: [
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' },
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' },
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' },
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' },
                },
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    emphasis: {
                    focus: 'self',
                    },
                    label: {
                    formatter: '{b}: {@2012} ({d}%)',
                    },
                    encode: {
                    itemName: 'product',
                    value: '2012',
                    tooltip: '2012',
                    },
                },
            ],
    }
    myChart.on('updateAxisPointer', function (event) {
        const xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1
            myChart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)',
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension,
                    },
                },
            })
        }
        })
        myChart.setOption(option)
    })

    option && myChart.setOption(option)
  }, [])
  return (
    <div
      id="line_main"
      ref={chartRef}
      style={{ width: '500px', height: '312px', marginLeft: '100px' }}
    ></div>
  )
}
export default LineChart
