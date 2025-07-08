export interface RouteMetaCustom {
    /** 页面标题 */
    title?: string
    /** 页面图标 */
    icon?: string
    /** 是否隐藏菜单 */
    hidden?: boolean
    /** 是否缓存页面 */
    keepAlive?: boolean
    /** 权限标识 */
    permission?: string[]
    /** 角色标识 */
    roles?: string[]
    /** 面包屑导航 */
    breadcrumb?: boolean
    /** 外部链接 */
    isLink?: string
    /** 菜单排序 */
    sort?: number
    /** 是否固定在标签页 */
    affix?: boolean
    /** 标签页图标 */
    tabIcon?: string
}

export interface RouteConfig {
    path: string
    name?: string
    component?: any
    redirect?: string
    meta?: RouteMetaCustom
    children?: RouteConfig[]
}
