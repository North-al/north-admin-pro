import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoutes: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('~/pages/dashboard/index.vue'),
        meta: {
            title: '仪表板',
            icon: 'Odometer',
            affix: true, // 固定标签页
            breadcrumb: false,
            sort: 1,
            keepAlive: true,
            badge: ''
        }
    },
    {
        path: '/workplace',
        name: 'Workplace',
        component: () => import('~/pages/dashboard/workplace.vue'),
        meta: {
            title: '工作台',
            icon: 'Monitor',
            sort: 2,
            keepAlive: true,
            badge: ''
        }
    }
]
