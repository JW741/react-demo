// token路由鉴权(携带token正常跳转)
import { getToken } from '@/utils'
import {Navigate} from 'react-router-dom'

export function AuthRoute ({children}){
    const token = getToken()
    if(token){
        return <>{children}</>
    }else{
        return <Navigate to={"/login"} replace />
    }
}
