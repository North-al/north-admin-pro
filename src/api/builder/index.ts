import { get, post, put, del } from '~/api'
import type { ApiResponse, PageResponse } from '~/api'

/**
 * API构建器配置选项
 */
export interface ApiBuilderOptions {
    /** 资源名称，用于生成函数名 */
    name: string
    /** API基础路径 */
    basePath: string
    /** 是否启用分页查询，默认为true */
    enablePagination?: boolean
    /** 自定义路径映射 */
    customPaths?: {
        list?: string
        create?: string
        update?: string
        delete?: string
        detail?: string
    }
}

/**
 * 首字母大写
 */
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * API构建器
 * @param options 构建器配置选项
 * @returns 生成的API接口对象
 */
export function createApiBuilder<T = any, CreateData = any, UpdateData = any>(options: ApiBuilderOptions) {
    const { name, basePath, enablePagination = true, customPaths = {} } = options

    // 生成函数名前缀
    const capitalizedName = capitalize(name)

    // 默认路径配置
    const paths = {
        list: customPaths.list || basePath,
        create: customPaths.create || basePath,
        update: customPaths.update || basePath,
        delete: customPaths.delete || `${basePath}/:id`,
        detail: customPaths.detail || `${basePath}/:id`
    }

    // 替换路径中的参数
    const replacePath = (path: string, id?: string | number): string => {
        return path.replace(':id', String(id))
    }

    // 生成API接口
    const api = {
        // 获取列表
        [`fetch${capitalizedName}List`]: (params?: any) => {
            if (enablePagination) {
                return get<PageResponse<T>>(paths.list, params)
            }
            return get<T[]>(paths.list, params)
        },

        // 创建
        [`fetch${capitalizedName}Create`]: (data: CreateData) => {
            return post<T>(paths.create, data)
        },

        // 更新
        [`fetch${capitalizedName}Update`]: (data: UpdateData) => {
            return put<T>(paths.update, data)
        },

        // 删除
        [`fetch${capitalizedName}Delete`]: (id: string | number) => {
            return del<boolean>(replacePath(paths.delete, id))
        },

        // 获取详情
        [`fetch${capitalizedName}Detail`]: (id: string | number) => {
            return get<T>(replacePath(paths.detail, id))
        }
    }

    return api
}

/**
 * 快速创建API构建器的便捷函数
 * @param name 资源名称
 * @param basePath API基础路径
 * @returns 生成的API接口对象
 */
export function apiBuilder<T = any, CreateData = any, UpdateData = any>(name: string, basePath: string) {
    return createApiBuilder<T, CreateData, UpdateData>({ name, basePath })
}

/**
 * 创建类型安全的API接口
 * @param name 资源名称
 * @param basePath API基础路径
 * @returns 类型安全的API接口对象
 */
export function createTypedApi<T = any, CreateData = any, UpdateData = any>(
    name: string,
    basePath: string,
    options?: Omit<ApiBuilderOptions, 'name' | 'basePath'>
) {
    const { enablePagination = true, customPaths = {} } = options || {}

    // 默认路径配置
    const paths = {
        list: customPaths.list || basePath,
        create: customPaths.create || basePath,
        update: customPaths.update || basePath,
        delete: customPaths.delete || `${basePath}/:id`,
        detail: customPaths.detail || `${basePath}/:id`
    }

    // 替换路径中的参数
    const replacePath = (path: string, id?: string | number): string => {
        return path.replace(':id', String(id))
    }

    const capitalizedName = capitalize(name)

    return {
        [`fetch${capitalizedName}List`]: (params?: any) => {
            if (enablePagination) {
                return get<PageResponse<T>>(paths.list, params)
            }
            return get<T[]>(paths.list, params)
        },
        [`fetch${capitalizedName}Create`]: (data: CreateData) => {
            return post<T>(paths.create, data)
        },
        [`fetch${capitalizedName}Update`]: (data: UpdateData) => {
            return put<T>(paths.update, data)
        },
        [`fetch${capitalizedName}Delete`]: (id: string | number) => {
            return del<boolean>(replacePath(paths.delete, id))
        },
        [`fetch${capitalizedName}Detail`]: (id: string | number) => {
            return get<T>(replacePath(paths.detail, id))
        }
    }
}
