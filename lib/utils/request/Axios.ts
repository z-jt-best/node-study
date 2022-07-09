import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

import axios from 'axios'

import { CreateAxiosOptions } from './axiosTransform'
import { isFunction } from '../is'

export class ZAxios {
    private axiosInstance: AxiosInstance
    private readonly options: CreateAxiosOptions

    constructor(options: CreateAxiosOptions) {
        this.options = options
        this.axiosInstance = axios.create(options)
        this.initInterceptions()
    }

    // 返回其拦截器函数
    private getTransform() {
        const { transform } = this.options
        return transform
    }

    // 初始化拦截器
    private initInterceptions() {
        const transform = this.getTransform()
        if (!transform) {
            return
        }
        const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } = transform

        // Request interceptor configuration processing
        this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config, this.options)
            }
            return config
        }, undefined)

        // Request interceptor error capture
        requestInterceptorsCatch &&
            isFunction(requestInterceptorsCatch) &&
            this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

        // Response result interceptor processing
        this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
            if (responseInterceptors && isFunction(responseInterceptors)) {
                res = responseInterceptors(res)
            }
            return res
        }, undefined)

        // Response result interceptor error capture
        responseInterceptorsCatch &&
            isFunction(responseInterceptorsCatch) &&
            this.axiosInstance.interceptors.response.use(undefined, error => {
                return responseInterceptorsCatch(this.axiosInstance, error)
            })
    }

    request<T>(config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axiosInstance.request<any, AxiosResponse>(config).then(testing).then()
        })
    }
}

function testing(res: AxiosResponse): Promise<number> {
    const name: number = 23
    return new Promise
}
