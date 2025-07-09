import type { RouteRecordRaw } from 'vue-router'

/**
 * 菜单项接口
 */
export interface MenuItem {
    path: string
    name?: string
    title: string
    icon?: string
    badge?: string // 徽章内容
    children?: MenuItem[]
    hidden?: boolean
    keepAlive?: boolean // 是否缓存
    affix?: boolean // 是否固定标签页
    meta?: any
}

/**
 * 将路由记录转换为菜单项
 * @param route 路由记录
 * @returns 菜单项
 */
function routeToMenuItem(route: RouteRecordRaw): MenuItem {
    const meta = route.meta || {}
    return {
        path: route.path,
        name: route.name as string,
        title: (meta.title as string) || (route.name as string) || '未命名',
        icon: meta.icon as string,
        badge: meta.badge as string,
        hidden: meta.hidden as boolean,
        keepAlive: meta.keepAlive as boolean,
        affix: meta.affix as boolean,
        meta: meta,
        children: []
    }
}

/**
 * 递归生成菜单
 * @param routes 路由配置
 * @param basePath 基础路径
 * @returns 菜单项数组
 */
export function generateMenu(routes: readonly RouteRecordRaw[], basePath = ''): MenuItem[] {
    const menu: MenuItem[] = []

    for (const route of routes) {
        // 忽略隐藏的路由
        if (route.meta?.hidden) {
            continue
        }

        const menuItem = routeToMenuItem(route)
        const fullPath = basePath ? `${basePath}/${route.path}`.replace(/\/+/g, '/') : route.path

        menuItem.path = fullPath

        // 递归处理子路由
        if (route.children && route.children.length > 0) {
            menuItem.children = generateMenu(route.children, fullPath)

            // 如果只有一个子路由且没有设置 alwaysShow，则只显示子路由
            if (menuItem.children.length === 1 && !menuItem.meta?.alwaysShow) {
                const singleChild = menuItem.children[0]
                // 如果子路由还有子路由，则保持父级菜单结构
                if (singleChild.children && singleChild.children.length > 0) {
                    menu.push(menuItem)
                } else {
                    // 如果子路由没有子路由，则提升到当前级别
                    singleChild.path = fullPath
                    menu.push(singleChild)
                }
            } else {
                menu.push(menuItem)
            }
        } else {
            // 没有子路由的情况
            menu.push(menuItem)
        }
    }

    // 排序
    return menu.sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0))
}
