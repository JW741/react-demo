// 路由配置
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import {createBrowserRouter} from 'react-router-dom'
import {AuthRoute} from '@/components/AuthRoute'
import {Suspense, lazy} from 'react'

const Home = lazy(()=>import('@/pages/Home'))
const Article = lazy(()=>import('@/pages/Article'))
const Publish = lazy(()=>import('@/pages/Publish'))

// 路由实例
const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                path: '/',
                element: <Suspense fallback={'加载中'}><Home /></Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={'加载中'}><Article /></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={'加载中'}><Publish /></Suspense>
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    }
])

export default router