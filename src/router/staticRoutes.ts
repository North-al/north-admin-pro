import type { RouteRecordRaw } from 'vue-router'

export const staticRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('~/pages/login/index.vue'),
        meta: {
            title: '登录',
            hidden: true
        }
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
        redirect: '/404',
        meta: {
            hidden: true
        }
    }
]
