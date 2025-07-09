import type { RouteRecordRaw } from 'vue-router'

export const systemRoutes: RouteRecordRaw[] = [
    {
        path: '/system',
        name: 'System',
        redirect: '/system/user',
        meta: {
            title: '系统管理',
            icon: 'Setting',
            sort: 99,
            alwaysShow: true, // 始终显示父菜单
            keepAlive: false // 是否缓存
        },
        children: [
            {
                path: 'user',
                name: 'SystemUser',
                component: () => import('~/pages/system/user/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'User',
                    keepAlive: true, // 开启页面缓存
                    badge: '' // 徽章内容，为空则不显示
                }
            },
            {
                path: 'role',
                name: 'SystemRole',
                component: () => import('~/pages/system/role/index.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'Avatar',
                    keepAlive: true,
                    badge: ''
                }
            },
            {
                path: 'menu',
                name: 'SystemMenu',
                component: () => import('~/pages/system/menu/index.vue'),
                meta: {
                    title: '菜单管理',
                    icon: 'Menu',
                    keepAlive: true,
                    badge: 'New' // 显示徽章
                }
            }
        ]
    }
]
