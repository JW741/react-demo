import { useEffect, useState } from "react"
import { getChannelAPI } from '@/api/article'

// 获取频道列表
function useChannel() {
  // 获取频道列表
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const getchannelList = async ()=>{
      const res = await getChannelAPI()
      setChannelList(res.data.data.channels)
    }
    getchannelList()
  }, [])
  return {
    channelList
  }
}
export {useChannel}
