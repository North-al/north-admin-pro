import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from './type'

export function handleBusinessError(code: number, message: string): void {
    switch (code) {
        case 401:
            ElMessage.error('登录已过期，请重新登录')
            // 清除token
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            // 跳转到登录页
            break
        case 403:
            ElMessage.error('没有权限访问该资源')
            break
        case 404:
            ElMessage.error('请求的资源不存在')
            break
        case 422:
            ElMessage.error(message || '数据验证失败')
            break
        case 500:
            ElMessage.error('服务器内部错误')
            break
        default:
            ElMessage.error(message || '操作失败')
    }
}

export function handleError(err: AxiosError): void {
    // 如果是取消请求，不显示错误
    if (axios.isCancel(err)) {
        console.log('请求已取消:', err.message)
    } else {
        let message = '请求失败'
        err = err // 消除类型错误

        if (err.response) {
            const { status, data } = err.response as { status: number; data: ApiResponse<any> }

            // 根据HTTP状态码处理
            switch (status) {
                case 400:
                    message = '请求参数错误'
                    break
                case 401:
                    message = '未授权，请重新登录'
                    // 清除token并跳转到登录页
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('refresh_token')
                    // 可以在这里触发路由跳转到登录页
                    // router.push('/login')
                    break
                case 403:
                    message = '拒绝访问'
                    break
                case 404:
                    message = '请求地址不存在'
                    break
                case 408:
                    message = '请求超时'
                    break
                case 422:
                    message = '数据验证失败'
                    break
                case 500:
                    message = '服务器内部错误'
                    break
                case 501:
                    message = '服务未实现'
                    break
                case 502:
                    message = '网关错误'
                    break
                case 503:
                    message = '服务不可用'
                    break
                case 504:
                    message = '网关超时'
                    break
                case 505:
                    message = 'HTTP版本不受支持'
                    break
                default:
                    message = `请求失败 (${status})`
            }

            // 如果后端返回了具体的错误信息，优先使用
            if (data && data.message) {
                message = data.message
            }
        } else if (err.message) {
            message = err.message
        }

        // 显示错误提示
        ElMessage.error(message)
    }
}
