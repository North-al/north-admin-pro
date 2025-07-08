import type { RouteConfig } from '~/typings/router.d'
import type { RouteRecordRaw } from 'vue-router'

/**
 * 转换路由格式
 * @param routes 路由配置
 * @returns Vue Router 路由格式
 */
export function transformRoutes(routes: RouteConfig[]): RouteRecordRaw[] {
    return routes.map(route => ({
        path: route.path,
        name: route.name,
        component: route.component,
        redirect: route.redirect,
        meta: route.meta,
        children: route.children ? transformRoutes(route.children) : undefined
    }))
}

/**
 * 获取菜单树
 * @param routes 路由配置
 * @returns 菜单树
 */
export function getMenuTree(routes: RouteConfig[]): RouteConfig[] {
    return routes
        .filter(route => !route.meta?.hidden)
        .sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0))
        .map(route => ({
            ...route,
            children: route.children ? getMenuTree(route.children) : undefined
        }))
}

/**
 * 扁平化路由
 * @param routes 路由配置
 * @returns 扁平化后的路由数组
 */
export function flattenRoutes(routes: RouteConfig[]): RouteConfig[] {
    const result: RouteConfig[] = []

    function traverse(routes: RouteConfig[], parent?: RouteConfig) {
        routes.forEach(route => {
            result.push(route)
            if (route.children) {
                traverse(route.children, route)
            }
        })
    }

    traverse(routes)
    return result
}

/**
 * 根据路径查找路由
 * @param routes 路由配置
 * @param path 路径
 * @returns 路由配置
 */
export function findRouteByPath(routes: RouteConfig[], path: string): RouteConfig | null {
    const flatRoutes = flattenRoutes(routes)
    return flatRoutes.find(route => route.path === path) || null
}

/**
 * 获取面包屑导航
 * @param routes 路由配置
 * @param currentPath 当前路径
 * @returns 面包屑数组
 */
export function getBreadcrumbs(routes: RouteConfig[], currentPath: string): RouteConfig[] {
    const breadcrumbs: RouteConfig[] = []

    function findPath(routes: RouteConfig[], targetPath: string, path: RouteConfig[] = []): boolean {
        for (const route of routes) {
            const currentPath = [...path, route]

            if (route.path === targetPath) {
                breadcrumbs.push(...currentPath.filter(item => item.meta?.breadcrumb !== false))
                return true
            }

            if (route.children && findPath(route.children, targetPath, currentPath)) {
                return true
            }
        }
        return false
    }

    findPath(routes, currentPath)
    return breadcrumbs
}
