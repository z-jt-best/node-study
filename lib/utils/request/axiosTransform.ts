import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
    transform?: AxiosTransform
    
}

export abstract class AxiosTransform {
    // 请求拦截器
    requestInterceptors?: (config: AxiosRequestConfig, options: CreateAxiosOptions) => AxiosRequestConfig

    // 请求拦截器错误处理
    requestInterceptorsCatch?: (error: Error) => void

    // 响应拦截器
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

    // 响应拦截器错误处理
    responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: Error) => void
}
