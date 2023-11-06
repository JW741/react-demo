import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

// 封装echarts
const BarChart = ({title}) => {
  const chartRef = useRef(null)
  useEffect(() => {
    // 获取渲染节点
    const chartDom = chartRef.current
    // 初始化生成实例
    const myChart = echarts.init(chartDom)
    // 图表参数
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular', 'JavaScript', 'Uni-app'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 200, 100, 250, 180],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    }
    // 使用参数完成渲染
    option && myChart.setOption(option)
  }, [title])
  return (
    <div
      id="main"
      ref={chartRef}
      style={{ width: '500px', height: '312px' }}
    ></div>
  )
}
export default BarChart
