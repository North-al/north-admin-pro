export const setupStyles = () => {
    // 导入全局样式重置和布局样式
    import('./reset.scss')
    import('./app.scss')
    import('./layout.scss')

    // 导入主题样式
    import('./themes/dark.scss')
    import('./themes/light.scss')
    import('./themes/mixed.scss')

    import('./el-light.scss')
    import('./el-dark.scss')
}
