import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// import { useAuthStore } from '@/store/modules/auth'

export const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // const authStore = useAuthStore()

    // 白名单路由
    const whiteList = ['/login', '/register', '/404', '/403']

    if (whiteList.includes(to.path)) {
        next()
        return
    }

    // // 检查是否已登录
    // if (!authStore.token) {
    //     next('/login')
    //     return
    // }

    // // 检查用户信息
    // if (!authStore.userInfo) {
    //     // 获取用户信息
    //     authStore
    //         .getUserInfo()
    //         .then(() => {
    //             next()
    //         })
    //         .catch(() => {
    //             next('/login')
    //         })
    //     return
    // }

    next()
}
