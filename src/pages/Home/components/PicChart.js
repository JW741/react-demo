import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const PicChart = ({title}) => {
  const chartRef = useRef(null)
  useEffect(() => {
    const chartDom = document.getElementById('pic_main')
    const myChart = echarts.init(chartDom)
    const option = {
      title: {
        text: title,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'javascript' },
            { value: 735, name: 'React' },
            { value: 580, name: 'Angular' },
            { value: 484, name: 'Vue' },
            { value: 300, name: 'uni-app' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    option && myChart.setOption(option)
  }, [title])
  return (
    <div
      id="pic_main"
      ref={chartRef}
      style={{ width: '500px', height: '312px',marginLeft: '100px'}}
    ></div>
  )
}
export default PicChart