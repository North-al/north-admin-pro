/**
 * API响应数据结构
 * @template T - 响应数据的类型
 */
export interface ApiResponse<T = unknown> {
    code: number
    data: T
    message: string
}

/**
 * 分页数据结构
 */
export interface PageResponse<T = any> {
    list: T[]
    total: number
    records: T[]
}
