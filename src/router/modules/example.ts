import type { RouteRecordRaw } from 'vue-router'

export const exampleRoutes: RouteRecordRaw[] = [
    {
        path: '/example',
        name: 'Example',
        redirect: '/example/level1',
        meta: {
            title: '多级菜单示例',
            icon: 'Folder',
            sort: 50,
            alwaysShow: true, // 始终显示父菜单
            keepAlive: false,
            badge: 'Demo'
        },
        children: [
            {
                path: 'level1',
                name: 'ExampleLevel1',
                redirect: '/example/level1/level2',
                meta: {
                    title: '二级菜单',
                    icon: 'Document',
                    alwaysShow: true,
                    keepAlive: false,
                    badge: '2'
                },
                children: [
                    {
                        path: 'level2',
                        name: 'ExampleLevel2',
                        component: () => import('~/pages/dashboard/index.vue'), // 临时使用已存在的页面
                        meta: {
                            title: '三级菜单页面',
                            icon: 'Edit',
                            keepAlive: true,
                            badge: ''
                        }
                    },
                    {
                        path: 'level2-2',
                        name: 'ExampleLevel2_2',
                        component: () => import('~/pages/dashboard/workplace.vue'), // 临时使用已存在的页面
                        meta: {
                            title: '三级菜单页面2',
                            icon: 'Files',
                            keepAlive: true,
                            badge: 'Hot'
                        }
                    }
                ]
            },
            {
                path: 'direct',
                name: 'ExampleDirect',
                component: () => import('~/pages/dashboard/index.vue'), // 临时使用已存在的页面
                meta: {
                    title: '二级直接页面',
                    icon: 'Monitor',
                    keepAlive: true,
                    badge: ''
                }
            }
        ]
    }
]
