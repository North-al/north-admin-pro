import { createTypedApi, createApiBuilder } from './index'

// ===== 基础使用示例 =====

// 1. 用户API
export const userApi = createTypedApi('user', '/api/user')
// 生成：fetchUserList, fetchUserCreate, fetchUserUpdate, fetchUserDelete, fetchUserDetail

// 2. 产品API
export const productApi = createTypedApi('product', '/api/product')
// 生成：fetchProductList, fetchProductCreate, fetchProductUpdate, fetchProductDelete, fetchProductDetail

// 3. 订单API
export const orderApi = createTypedApi('order', '/api/order')
// 生成：fetchOrderList, fetchOrderCreate, fetchOrderUpdate, fetchOrderDelete, fetchOrderDetail

// ===== 高级配置示例 =====

// 4. 文章API - 自定义路径
export const articleApi = createApiBuilder({
    name: 'article',
    basePath: '/api/article',
    customPaths: {
        list: '/api/articles', // 列表使用复数形式
        detail: '/api/article/:id/detail', // 详情使用特殊路径
        delete: '/api/article/:id/remove' // 删除使用特殊路径
    }
})

// 5. 分类API - 禁用分页
export const categoryApi = createApiBuilder({
    name: 'category',
    basePath: '/api/category',
    enablePagination: false // 分类通常不需要分页
})

// 6. 文件API - 完全自定义路径
export const fileApi = createApiBuilder({
    name: 'file',
    basePath: '/api/file',
    customPaths: {
        list: '/api/files/list',
        create: '/api/files/upload',
        update: '/api/files/:id/update',
        delete: '/api/files/:id/delete',
        detail: '/api/files/:id/info'
    }
})

// ===== 使用示例 =====

// 用户相关操作
export async function userOperations() {
    // 获取用户列表
    const userList = await userApi.fetchUserList({ page: 1, size: 10 })

    // 创建用户
    const newUser = await userApi.fetchUserCreate({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456'
    })

    // 更新用户
    const updatedUser = await userApi.fetchUserUpdate({
        name: 'Jane Doe',
        status: 'active'
    })

    // 获取用户详情
    const userDetail = await userApi.fetchUserDetail(1)

    // 删除用户
    await userApi.fetchUserDelete(1)

    return { userList, newUser, updatedUser, userDetail }
}

// 产品相关操作
export async function productOperations() {
    // 获取产品列表（带搜索参数）
    const productList = await productApi.fetchProductList({
        page: 1,
        size: 20,
        keyword: 'iPhone',
        category: 'electronics'
    })

    // 创建产品
    const newProduct = await productApi.fetchProductCreate({
        name: 'iPhone 15',
        price: 999,
        category: 'electronics',
        description: 'Latest iPhone model'
    })

    return { productList, newProduct }
}

// 订单相关操作
export async function orderOperations() {
    // 获取订单列表（带状态筛选）
    const orderList = await orderApi.fetchOrderList({
        page: 1,
        size: 10,
        status: 'pending',
        startDate: '2024-01-01',
        endDate: '2024-12-31'
    })

    // 创建订单
    const newOrder = await orderApi.fetchOrderCreate({
        userId: 1,
        products: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ],
        totalAmount: 1998
    })

    // 更新订单状态
    const updatedOrder = await orderApi.fetchOrderUpdate({
        status: 'confirmed'
    })

    return { orderList, newOrder, updatedOrder }
}

// ===== 类型安全示例 =====

// 定义具体的类型
interface Product {
    id: number
    name: string
    price: number
    category: string
    description?: string
}

interface CreateProductData {
    name: string
    price: number
    category: string
    description?: string
}

interface UpdateProductData {
    name?: string
    price?: number
    category?: string
    description?: string
}

// 使用类型安全的API构建器
export const typedProductApi = createTypedApi<Product, CreateProductData, UpdateProductData>('product', '/api/product')

// 现在所有的API调用都有完整的类型检查
export async function typedProductOperations() {
    // TypeScript会检查参数类型
    const product = await typedProductApi.fetchProductCreate({
        name: 'MacBook Pro',
        price: 2999,
        category: 'computers'
        // description 是可选的
    })

    // TypeScript会检查返回值类型
    const productList = await typedProductApi.fetchProductList()
    // productList.data.list 的类型是 Product[]

    return { product, productList }
}
