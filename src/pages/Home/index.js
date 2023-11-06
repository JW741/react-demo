import BarChart from './components/BarChart'
import PicChart from './components/PicChart'
import LineChart from './components/LineChart'
import './index.scss'

const Home = () => {
  return (
    <div className='chart'>
      <BarChart title={'框架数据展示'} />
      <PicChart title={'饼图数据展示'} />
      <BarChart title={'框架模拟数据'} />
      <LineChart />
    </div>
  )
}

export default Home
