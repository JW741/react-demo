import request from "@/utils/request"
// 获取频道列表
export const getChannelAPI = () => {
    return request({
        url: '/channels',
        method: 'GET',
    })
}
// 发布文章
export const createArticleAPI = (data)=>{
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}
// 获取文章列表
export const getArticleListAPI = (params)=>{
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}
// 删除文章
export const deleteArticleAPI = (id)=>{
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE',
    })
}
// 获取文章详情
export const getArticleById = (id)=>{
    return request({
        url: `/mp/articles/${id}`,
        method: 'GET',
    })
}
// 更新文章
export const updateArticleAPI = (data)=>{
    return request({
        url: `/mp/articles/${data.id}?draft=false`,
        method: 'PUT',
        data
    })
}