import axios from 'axios'
let baseURL = window.VUE_APP_httpUrl
var instance = axios.create({
  baseURL
})
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export let get95598Data = async function (params) {
  let url = '/dyfxyj/fxyj_data/rest/gdData/get95598Data'
  let res = await instance.get(url, { params })
  return res
}
export let fetch = instance
