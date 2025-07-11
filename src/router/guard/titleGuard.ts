import type { RouteLocationNormalized } from 'vue-router'

export const titleGuard = (to: RouteLocationNormalized, __: RouteLocationNormalized) => {
    // 设置页面标题
    document.title = to.meta?.title ? `${to.meta.title} - 后台管理系统` : '后台管理系统'

    // 页面加载完成后的逻辑
    const loadingInstance = (window as any).loading
    if (loadingInstance) {
        loadingInstance.close()
    }
}
