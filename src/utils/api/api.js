"use strict";
import axios from 'axios';
import config from './config'
import qs from 'qs'

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseURL,
            headers: {},
            transformResponse: [function (data) {}]
        })

        //request拦截器
        instance.interceptors.request.use(
            config => {
                if (config.method.toLocaleLowerCase() === 'post'
                        || config.method.toLocaleLowerCase() === 'put'
                        || config.method.toLocaleLowerCase() === 'delete') {
                    config.data = qs.stringify(config.data)
                }
                return config
            },
            error => {
                console.log('request:', error)
                //请求超时处理
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    console.log('在这里加入超时处理方案')
                }
                //重定向到错误页面
                const errorInfo = error.transformResponse
                console.log(errorInfo)
                if (errorInfo) {
                    const errorStatus = errorInfo.status;
                    reture.push({
                        path: `/error/${errorStatus}`
                    })
                }
                return Promise.reject(error)
            }
        )

        // response拦截器
        instance.interceptors.response.use(
            response => {
                let data;
                if (response.data == undefined) {
                    data = response.request.responseText
                } else {
                    data = response.data
                }
                // 根据返回的code值来做不同的处理(和后端约定)
                switch (data.code) {
                    case '':
                    break;               
                    default:
                }
                return data
            },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误'
                            break;
                        case 401:
                            err.message = '未授权,请登录'
                            break;
                        case 403:
                            err.message = '拒绝访问'
                            break;
                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`
                            break;
                        case 408:
                            err.message = '请求超时'
                            break;
                        case 500:
                            err.message = '服务器内部错误'
                            break;
                        case 501:
                            err.message = '服务未实现'
                            break;
                        case 502:
                            err.message = '网关错误'
                            break;
                        case 503:
                            err.message = '服务不可用'
                            break;
                        case 504:
                            err.message = '网关超时'
                            break;
                        case 505:
                            err.message = 'HTTP版本不受支持'
                            break;
                        default:
                    }
                }
                console.error(err);
                return Promise.reject(err)
            }
        )

        //请求处理
        instance(options)
            .then((res) => {
                resolve(res)
                return false
            })
            .catch((error) => {
                reject(error)
            })
    })
}
