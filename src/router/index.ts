import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { dashboardRoutes } from './modules/dashboard'

// 基础路由 - 不需要权限验证的路由
const baseRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('~/layouts/index.vue'),
        redirect: '/dashboard',
        children: [...dashboardRoutes]
    },
    {
        path: '/404',
        name: 'Error404',
        component: () => import('~/pages/error/404.vue'),
        meta: {
            title: '404',
            hidden: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }
]

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
