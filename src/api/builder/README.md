# API 构建器

API 构建器是一个用于自动生成 RESTful API 接口的工具，可以快速创建标准的增删改查操作。

## 特性

-   🚀 **快速生成**: 一行代码生成完整的 CRUD 接口
-   🔧 **高度可配置**: 支持自定义路径、分页设置等
-   📝 **类型安全**: 完整的 TypeScript 类型支持
-   🎯 **标准化**: 遵循 RESTful API 设计规范
-   🔄 **一致性**: 统一的 API 调用方式和响应格式

## 基础用法

### 快速开始

```typescript
import { createTypedApi } from '~/api/builder'

// 创建用户API
const userApi = createTypedApi('user', '/api/user')

// 自动生成以下5个接口：
// - fetchUserList(params?) - 获取用户列表
// - fetchUserCreate(data) - 创建用户
// - fetchUserUpdate(data) - 更新用户（不需要id参数）
// - fetchUserDelete(id) - 删除用户
// - fetchUserDetail(id) - 获取用户详情
```

### 使用生成的 API

```typescript
// 获取用户列表
const userList = await userApi.fetchUserList({ page: 1, size: 10 })

// 创建用户
const newUser = await userApi.fetchUserCreate({
    name: 'John Doe',
    email: 'john@example.com'
})

// 更新用户
const updatedUser = await userApi.fetchUserUpdate({
    name: 'Jane Doe'
})

// 删除用户
await userApi.fetchUserDelete(1)

// 获取用户详情
const userDetail = await userApi.fetchUserDetail(1)
```

## 高级配置

### 使用 createApiBuilder

```typescript
import { createApiBuilder } from '~/api/builder'

const userApi = createApiBuilder({
    name: 'user',
    basePath: '/api/user',
    enablePagination: true, // 是否启用分页，默认true
    customPaths: {
        list: '/api/users', // 自定义列表路径
        detail: '/api/user/:id/profile', // 自定义详情路径
        delete: '/api/user/:id/remove' // 自定义删除路径
    }
})
```

### 配置选项

| 选项               | 类型      | 默认值 | 说明                     |
| ------------------ | --------- | ------ | ------------------------ |
| `name`             | `string`  | -      | 资源名称，用于生成函数名 |
| `basePath`         | `string`  | -      | API 基础路径             |
| `enablePagination` | `boolean` | `true` | 是否启用分页查询         |
| `customPaths`      | `object`  | `{}`   | 自定义路径映射           |

### 自定义路径

```typescript
const articleApi = createApiBuilder({
    name: 'article',
    basePath: '/api/article',
    customPaths: {
        list: '/api/articles', // GET /api/articles
        create: '/api/article/new', // POST /api/article/new
        update: '/api/article/:id/edit', // PUT /api/article/:id/edit
        delete: '/api/article/:id/del', // DELETE /api/article/:id/del
        detail: '/api/article/:id/info' // GET /api/article/:id/info
    }
})
```

## 类型安全

### 定义类型

```typescript
interface User {
    id: number
    name: string
    email: string
    status: 'active' | 'inactive'
}

interface CreateUserData {
    name: string
    email: string
    password: string
}

interface UpdateUserData {
    name?: string
    email?: string
    status?: 'active' | 'inactive'
}
```

### 使用类型

```typescript
const userApi = apiBuilder<User, CreateUserData, UpdateUserData>('user', '/api/user')

// 现在所有API调用都有完整的类型检查
const user = await userApi.fetchUserCreate({
    name: 'John',
    email: 'john@example.com',
    password: '123456'
}) // 返回类型: ApiResponse<User>
```

## 生成的接口规范

### HTTP 方法映射

| 操作   | HTTP 方法 | 默认路径            | 说明                       |
| ------ | --------- | ------------------- | -------------------------- |
| List   | GET       | `/api/resource`     | 获取资源列表               |
| Create | POST      | `/api/resource`     | 创建新资源                 |
| Update | PUT       | `/api/resource`     | 更新资源（数据在请求体中） |
| Delete | DELETE    | `/api/resource/:id` | 删除指定资源               |
| Detail | GET       | `/api/resource/:id` | 获取资源详情               |

### 响应格式

所有 API 都遵循统一的响应格式：

```typescript
interface ApiResponse<T> {
    code: number // 状态码，200表示成功
    data: T // 响应数据
    message: string // 响应消息
}
```

### 分页响应

启用分页时，列表接口返回分页数据：

```typescript
interface PageResponse<T> {
    list: T[] // 数据列表
    total: number // 总数量
    records: T[] // 记录列表（别名）
}
```

## 实际示例

### 用户管理

```typescript
// 定义类型
interface User {
    id: number
    name: string
    email: string
    phone?: string
    status: 'active' | 'inactive'
    createdAt: string
}

// 创建API
const userApi = apiBuilder<User>('user', '/api/user')

// 使用API
export class UserService {
    // 获取用户列表
    static async getUsers(params: { page: number; size: number; keyword?: string }) {
        return await userApi.fetchUserList(params)
    }

    // 创建用户
    static async createUser(userData: CreateUserData) {
        return await userApi.fetchUserCreate(userData)
    }

    // 更新用户
    static async updateUser(id: number, userData: UpdateUserData) {
        return await userApi.fetchUserUpdate(id, userData)
    }

    // 删除用户
    static async deleteUser(id: number) {
        return await userApi.fetchUserDelete(id)
    }

    // 获取用户详情
    static async getUserDetail(id: number) {
        return await userApi.fetchUserDetail(id)
    }
}
```

## 注意事项

1. **路径参数**: 使用 `:id` 作为路径参数占位符
2. **分页参数**: 分页查询的参数会作为 query 参数发送
3. **错误处理**: 所有 API 调用都会经过统一的错误处理
4. **请求取消**: 支持自动取消重复请求
5. **类型检查**: 建议使用 TypeScript 以获得完整的类型支持

## 扩展

如果需要更复杂的 API 操作，可以在生成的基础 API 上进行扩展：

```typescript
const baseUserApi = apiBuilder('user', '/api/user')

export const userApi = {
    ...baseUserApi,

    // 扩展：批量删除
    fetchUserBatchDelete: (ids: number[]) => {
        return post('/api/user/batch-delete', { ids })
    },

    // 扩展：重置密码
    fetchUserResetPassword: (id: number) => {
        return post(`/api/user/${id}/reset-password`)
    }
}
```
