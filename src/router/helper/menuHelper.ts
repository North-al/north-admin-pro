import type { RouteRecordRaw } from 'vue-router'

/**
 * 菜单项接口
 */
export interface MenuItem {
    path: string
    name?: string
    title: string
    icon?: string
    children?: MenuItem[]
    hidden?: boolean
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
        hidden: meta.hidden as boolean,
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

        if (route.children && route.children.length > 0) {
            menuItem.children = generateMenu(route.children, fullPath)
        }

        // 如果只有一个子路由且没有设置 alwaysShow，则只显示子路由
        if (menuItem.children?.length === 1 && !menuItem.meta?.alwaysShow && !menuItem.children[0].children?.length) {
            const singleChild = menuItem.children[0]
            singleChild.path = menuItem.path // 使用父路由的路径
            menu.push(singleChild)
        } else {
            menu.push(menuItem)
        }
    }

    // 排序
    return menu.sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0))
}
