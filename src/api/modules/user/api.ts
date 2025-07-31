// import { createTypedApi } from '~/api/builder'
// import type { User, CreateUserData, UpdateUserData } from './type'

// // 方式1: 使用类型安全的便捷函数
// export const userApi = createTypedApi<User, CreateUserData, UpdateUserData>('user', '/api/user')

// // 方式2: 使用完整配置
// export const userApiAdvanced = createTypedApi<User, CreateUserData, UpdateUserData>('user', '/api/user', {
//     enablePagination: true,
//     customPaths: {
//         // 可以自定义特定接口的路径
//         list: '/api/users',
//         detail: '/api/user/:id/profile'
//     }
// })

// 生成的API包含以下方法：
// userApi.fetchUserList(params) // - 获取用户列表
// userApi.fetchUserCreate(data) - 创建用户
// userApi.fetchUserUpdate(id, data) - 更新用户
// userApi.fetchUserDelete(id) - 删除用户
// userApi.fetchUserDetail(id) - 获取用户详情

// 使用示例：
/*
// 获取用户列表
const userList = await userApi.fetchUserList({ page: 1, size: 10 })

// 创建用户
const newUser = await userApi.fetchUserCreate({
  name: 'John Doe',
  email: 'john@example.com'
})

// 更新用户
const updatedUser = await userApi.fetchUserUpdate(1, {
  name: 'Jane Doe'
})

// 删除用户
await userApi.fetchUserDelete(1)

// 获取用户详情
const userDetail = await userApi.fetchUserDetail(1)
*/

// export default userApi
