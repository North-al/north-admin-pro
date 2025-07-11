import type { RouteRecordRaw } from 'vue-router'

export const examplesRoutes: RouteRecordRaw[] = [
    {
        path: '/examples',
        name: 'Examples',
        redirect: '/examples/index',
        meta: {
            title: '开发示例',
            icon: 'Document',
            sort: 10,
            alwaysShow: true,
            keepAlive: false,
            badge: 'New'
        },
        children: [
            {
                path: 'index',
                name: 'ExamplesIndex',
                component: () => import('~/pages/examples/index.vue'),
                meta: {
                    title: '示例首页',
                    icon: 'House',
                    keepAlive: true,
                    badge: ''
                }
            },
            {
                path: 'components',
                name: 'ExamplesComponents',
                redirect: '/examples/components/index',
                meta: {
                    title: '组件示例',
                    icon: 'Grid',
                    alwaysShow: true,
                    keepAlive: false,
                    badge: ''
                },
                children: [
                    {
                        path: 'index',
                        name: 'ExamplesComponentsIndex',
                        component: () => import('~/pages/examples/components/index.vue'),
                        meta: {
                            title: '组件列表',
                            icon: 'List',
                            keepAlive: true,
                            badge: ''
                        }
                    },
                    {
                        path: 'breadcrumb',
                        name: 'ExamplesComponentsBreadcrumb',
                        component: () => import('~/pages/examples/components/breadcrumb.vue'),
                        meta: {
                            title: '面包屑组件',
                            icon: 'Guide',
                            keepAlive: true,
                            badge: ''
                        }
                    },
                    {
                        path: 'context-menu',
                        name: 'ExamplesComponentsContextMenu',
                        component: () => import('~/pages/examples/components/context-menu.vue'),
                        meta: {
                            title: '右键菜单组件',
                            icon: 'Menu',
                            keepAlive: true,
                            badge: ''
                        }
                    }
                ]
            },
            {
                path: 'hooks',
                name: 'ExamplesHooks',
                redirect: '/examples/hooks/index',
                meta: {
                    title: '功能示例',
                    icon: 'Connection',
                    alwaysShow: true,
                    keepAlive: false,
                    badge: ''
                },
                children: [
                    {
                        path: 'index',
                        name: 'ExamplesHooksIndex',
                        component: () => import('~/pages/examples/hooks/index.vue'),
                        meta: {
                            title: '功能列表',
                            icon: 'List',
                            keepAlive: true,
                            badge: ''
                        }
                    },
                    {
                        path: 'mouse',
                        name: 'ExamplesHooksMouse',
                        component: () => import('~/pages/examples/hooks/mouse.vue'),
                        meta: {
                            title: '鼠标位置Hook',
                            icon: 'Mouse',
                            keepAlive: true,
                            badge: ''
                        }
                    },
                    {
                        path: 'context-menu',
                        name: 'ExamplesHooksContextMenu',
                        component: () => import('~/pages/examples/hooks/context-menu.vue'),
                        meta: {
                            title: '右键菜单Hook',
                            icon: 'Menu',
                            keepAlive: true,
                            badge: ''
                        }
                    }
                ]
            }
        ]
    }
]
