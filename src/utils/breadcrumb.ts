import type { RouteLocationNormalized } from 'vue-router'

export interface BreadcrumbItem {
    title: string
    path: string
}

/**
 * 生成面包屑导航
 * @param route 当前路由
 * @returns 面包屑数组
 */
export function generateBreadcrumbs(route: RouteLocationNormalized): BreadcrumbItem[] {
    // 如果路由meta中明确设置了不显示面包屑，则返回空数组
    if (route.meta?.breadcrumb === false) {
        return []
    }

    const breadcrumbs: BreadcrumbItem[] = []

    // 获取所有匹配的路由记录，过滤掉Layout根路由
    const matched = route.matched.filter(item => item.name !== 'Layout' && item.meta?.title)

    // 如果没有匹配的路由，但当前页面有标题，则显示当前页面标题
    if (matched.length === 0 && route.meta?.title) {
        breadcrumbs.push({
            title: route.meta.title as string,
            path: route.path
        })
        return breadcrumbs
    }

    // 遍历匹配的路由，构建面包屑
    matched.forEach((routeRecord, index) => {
        const meta = routeRecord.meta
        const title = meta?.title as string

        if (title) {
            let path = routeRecord.path

            // 简化路径处理逻辑
            if (index === matched.length - 1) {
                // 最后一个路由（当前页面），使用当前完整路径
                path = route.path
            } else if (routeRecord.redirect && typeof routeRecord.redirect === 'string') {
                // 如果路由有redirect，使用redirect路径
                path = routeRecord.redirect
            } else {
                // 对于中间层级的路由，使用路由记录的完整路径
                // 如果是相对路径，需要构建完整路径
                if (!path.startsWith('/')) {
                    // 从当前路径中提取对应的部分
                    const currentSegments = route.path.split('/').filter(Boolean)
                    const routeSegments = path.split('/').filter(Boolean)

                    // 找到路由段在当前路径中的位置
                    for (let i = 0; i <= currentSegments.length - routeSegments.length; i++) {
                        const match = routeSegments.every((segment, j) => currentSegments[i + j] === segment)
                        if (match) {
                            path = '/' + currentSegments.slice(0, i + routeSegments.length).join('/')
                            break
                        }
                    }
                }
            }

            breadcrumbs.push({ title, path })
        }
    })

    return breadcrumbs
}

/**
 * 判断是否应该显示面包屑
 * @param breadcrumbs 面包屑数组
 * @returns 是否显示
 */
export function shouldShowBreadcrumbs(breadcrumbs: BreadcrumbItem[]): boolean {
    // 只要有面包屑内容就显示，包括单个菜单
    return breadcrumbs.length > 0
}
