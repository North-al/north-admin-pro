import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios'
import { handleError } from './errorHandler'
import type { ApiResponse } from './type'

class CancelManager {
    private pendingRequests = new Map<string, CancelTokenSource>()
    /**
     * 生成请求key
     */
    private generateRequestKey(config: AxiosRequestConfig): string {
        const { method, url, params, data } = config
        return `${method}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}`
    }

    /**
     * 添加请求
     */
    addRequest(config: AxiosRequestConfig): CancelTokenSource {
        const requestKey = this.generateRequestKey(config)

        // 如果存在相同请求，取消之前的请求
        if (this.pendingRequests.has(requestKey)) {
            this.cancelRequest(requestKey)
        }

        const cancelTokenSource = axios.CancelToken.source()
        this.pendingRequests.set(requestKey, cancelTokenSource)

        return cancelTokenSource
    }

    /**
     * 移除请求
     */
    removeRequest(config: AxiosRequestConfig): void {
        const requestKey = this.generateRequestKey(config)
        this.pendingRequests.delete(requestKey)
    }

    /**
     * 取消指定请求
     */
    cancelRequest(requestKey: string): void {
        const cancelTokenSource = this.pendingRequests.get(requestKey)
        if (cancelTokenSource) {
            cancelTokenSource.cancel('重复请求已取消')
            this.pendingRequests.delete(requestKey)
        }
    }

    /**
     * 取消所有请求
     */
    cancelAllRequests(): void {
        this.pendingRequests.forEach(cancelTokenSource => {
            cancelTokenSource.cancel('所有请求已取消')
        })
        this.pendingRequests.clear()
    }
}

class HttpRequest {
    private cancelManager: CancelManager
    private instance: AxiosInstance

    constructor(options: AxiosRequestConfig) {
        this.cancelManager = new CancelManager()

        this.instance = axios.create({
            timeout: 1000 * 30,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            ...options
        })

        this.setupInterceptors()
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use(
            config => {
                // 添加取消请求token
                const cancelTokenSource = this.cancelManager.addRequest(config)
                config.cancelToken = cancelTokenSource.token

                // TODO: 添加业务token
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )

        this.instance.interceptors.response.use(
            response => {
                // 移除请求
                this.cancelManager.removeRequest(response.config)
                const { code } = response.data
                if (code !== 200) {
                    return Promise.reject(response)
                }

                return response
            },
            error => {
                // 如果不是取消请求的错误，移除请求
                if (!axios.isCancel(error) && error.config) {
                    this.cancelManager.removeRequest(error.config)
                }

                // 异常处理
                handleError(error)
                return Promise.reject(error)
            }
        )
    }

    // 将axios的get post put 等请求方法进行统一包装一下，返回最终需要的ApiResponse<T>
    public async request<T = any>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.instance.request(config)
        return response.data
    }

    public get = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        return this.request({ method: 'get', url, params: data, ...config })
    }

    public post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        return this.request({ method: 'post', url, data, ...config })
    }

    public put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        return this.request({ method: 'put', url, data, ...config })
    }

    public delete = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        return this.request({ method: 'delete', url, data, ...config })
    }

    public upload = <T = any>(url: string, file: File, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        const formData = new FormData()
        formData.append('file', file)

        return this.request({
            method: 'post',
            url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            ...config
        })
    }
}

const http = new HttpRequest({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 1000 * 30,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    withCredentials: true
})

const get = http.get
const post = http.post
const put = http.put
const del = http.delete
const upload = http.upload

export { get, post, put, del, upload, http }
