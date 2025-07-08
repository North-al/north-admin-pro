import type { RouteConfig } from 'src/typings/router'

export const dashboardRoutes: RouteConfig[] = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('~/pages/dashboard/index.vue'),
        meta: {
            title: '仪表板',
            icon: 'dashboard',
            affix: true,
            breadcrumb: false,
            sort: 1
        }
    },
    {
        path: '/workplace',
        name: 'Workplace',
        component: () => import('~/pages/dashboard/workplace.vue'),
        meta: {
            title: '工作台',
            icon: 'workplace',
            sort: 2
        }
    }
]
