// 提示框封装
import React,{useEffect} from "react";
import { notification } from "antd";

export default function MyNotification({type,description}) {
    const [api,contextHolder] = notification.useNotification();
    useEffect(()=>{
        if(type){
            api[type]({
                message:'系统提示',
                description
            })
        }
    },[props])
    return (
        <>{contextHolder}</>
    )
}
