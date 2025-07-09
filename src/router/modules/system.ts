import type { RouteRecordRaw } from 'vue-router'

export const systemRoutes: RouteRecordRaw[] = [
    {
        path: '/system',
        name: 'System',
        redirect: '/system/user',
        meta: {
            title: '系统管理',
            icon: 'Setting',
            sort: 99
        },
        children: [
            {
                path: 'user',
                name: 'SystemUser',
                component: () => import('~/pages/system/user/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'User'
                }
            },
            {
                path: 'role',
                name: 'SystemRole',
                component: () => import('~/pages/system/role/index.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'Avatar'
                }
            },
            {
                path: 'menu',
                name: 'SystemMenu',
                component: () => import('~/pages/system/menu/index.vue'),
                meta: {
                    title: '菜单管理',
                    icon: 'Menu'
                }
            }
        ]
    }
]
