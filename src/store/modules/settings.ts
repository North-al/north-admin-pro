export const useSettingsStore = defineStore('settings', () => {
    // 侧边栏折叠状态
    const sidebarCollapsed = ref(false)

    // 设置面板状态
    const settingsPanelOpen = ref(false)

    // 全屏状态
    const isFullscreen = ref(false)

    // 标签页开关状态
    const tagsViewEnabled = ref(true)

    // 切换侧边栏折叠状态
    const toggleSidebar = () => {
        sidebarCollapsed.value = !sidebarCollapsed.value
        localStorage.setItem('sidebar-collapsed', String(sidebarCollapsed.value))
    }

    // 切换设置面板
    const toggleSettingsPanel = () => {
        settingsPanelOpen.value = !settingsPanelOpen.value
    }

    // 设置全屏状态
    const setFullscreen = (value: boolean) => {
        isFullscreen.value = value
    }

    // 切换标签页开关
    const toggleTagsView = () => {
        tagsViewEnabled.value = !tagsViewEnabled.value
        localStorage.setItem('tags-view-enabled', String(tagsViewEnabled.value))
    }

    // 初始化设置
    const initSettings = () => {
        const savedSidebarState = localStorage.getItem('sidebar-collapsed') === 'true'
        const savedTagsViewState = localStorage.getItem('tags-view-enabled') !== 'false'

        sidebarCollapsed.value = savedSidebarState
        tagsViewEnabled.value = savedTagsViewState
    }

    // 重置所有设置
    const resetSettings = () => {
        sidebarCollapsed.value = false
        settingsPanelOpen.value = false
        isFullscreen.value = false
        tagsViewEnabled.value = true

        // 清理 localStorage
        localStorage.removeItem('sidebar-collapsed')
        localStorage.removeItem('tags-view-enabled')
    }

    return {
        // state
        sidebarCollapsed,
        settingsPanelOpen,
        isFullscreen,
        tagsViewEnabled,

        // actions
        toggleSidebar,
        toggleSettingsPanel,
        setFullscreen,
        toggleTagsView,
        initSettings,
        resetSettings
    }
})
