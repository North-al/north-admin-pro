import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { staticRoutes } from './staticRoutes'

// 自动导入所有路由模块
const modules = import.meta.glob('./modules/*.ts', { eager: true })
const dynamicRoutes: RouteRecordRaw[] = []

// 遍历所有模块文件，提取路由配置
Object.keys(modules).forEach(key => {
    const mod = modules[key] as any
    // 查找模块中导出的路由数组（通常以 Routes 结尾）
    Object.keys(mod).forEach(exportKey => {
        if (exportKey.endsWith('Routes') && Array.isArray(mod[exportKey])) {
            dynamicRoutes.push(...mod[exportKey])
        }
    })
})

// 主布局路由，包含所有动态路由作为子路由
const layoutRoute: RouteRecordRaw = {
    path: '/',
    name: 'Layout',
    component: () => import('~/layouts/index.vue'),
    redirect: '/dashboard',
    children: dynamicRoutes
}

// 基础路由配置
const baseRoutes: RouteRecordRaw[] = [layoutRoute, ...staticRoutes]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: baseRoutes,
    scrollBehavior(_, __, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0 }
    }
})

// 全局后置守卫
router.afterEach(to => {
    // 设置页面标题
    document.title = to.meta?.title ? `${to.meta.title} - 后台管理系统` : '后台管理系统'

    // 页面加载完成后的逻辑
    const loadingInstance = (window as any).loading
    if (loadingInstance) {
        loadingInstance.close()
    }
})

export const setupRouter = (app: App) => {
    app.use(router)
}
