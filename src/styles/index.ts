export const setupStyles = () => {
    // 导入全局样式重置和布局样式
    import('./reset.scss')
    import('./app.scss')
    import('./layout.scss')

    // 导入 Element Plus 组件样式自定义
    import('./element-plus.scss')

    // 导入主题样式
    import('./themes/dark.scss')
    import('./themes/light.scss')
    import('./themes/mixed.scss')

    // 导入 Element Plus 原生主题
    import('element-plus/theme-chalk/dark/css-vars.css')
    import('./el-light.scss')
    import('./el-dark.scss')
}
