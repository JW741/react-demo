// 用户仓库
import { createSlice } from '@reduxjs/toolkit'
import { getToken, setToken as $setToken, clearToken } from '@/utils'
import { loginAPI, getProfileAPI } from '@/api/user'

const userSlice = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {},
  },
  // 同步修改
  reducers: {
    // 设置token
    setToken(state, action) {
      state.token = action.payload
      // 持久化存储
      $setToken(action.payload)
    },
    // 获取用户信息
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    // 退出登录
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      clearToken()
    },
  },
})

// 解构action
const { setToken, setUserInfo, clearUserInfo } = userSlice.actions
// 获取reducer函数
const userReducer = userSlice.reducer

// 异步获取登录token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送请求
    const res = await loginAPI(loginForm)
    // 提交同步action进行token存储
    dispatch(setToken(res.data.data.token))
  }
}
// 异步获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    try {
      const res = await getProfileAPI()
      dispatch(setUserInfo(res.data.data))
    } catch (error) {
      
    }
  }
}

export { setToken, fetchLogin, fetchUserInfo, clearUserInfo }
export default userReducer
