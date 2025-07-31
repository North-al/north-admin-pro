// 用户相关类型定义

/**
 * 用户信息
 */
export interface User {
    id: number
    name: string
    email: string
    phone?: string
    avatar?: string
    status: 'active' | 'inactive'
    createdAt: string
    updatedAt: string
}

/**
 * 创建用户数据
 */
export interface CreateUserData {
    name: string
    email: string
    phone?: string
    avatar?: string
    password: string
}

/**
 * 更新用户数据
 */
export interface UpdateUserData {
    name?: string
    email?: string
    phone?: string
    avatar?: string
    status?: 'active' | 'inactive'
}
