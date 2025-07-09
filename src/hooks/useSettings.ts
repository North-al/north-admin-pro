import { useThemeStore } from '../store/modules/theme'
import { useSettingsStore } from '../store/modules/settings'
import { useTheme } from './useTheme'
import { useFullscreen } from './useFullscreen'

/**
 * 设置管理Hook
 * 提供设置面板、侧边栏、全局配置等功能
 */
export function useSettings() {
    const themeStore = useThemeStore()
    const settingsStore = useSettingsStore()
    const { setTheme, themeOptions } = useTheme()
    const { toggleFullscreen } = useFullscreen()

    // 侧边栏折叠状态
    const sidebarCollapsed = computed(() => settingsStore.sidebarCollapsed)

    // 设置面板状态
    const settingsPanelOpen = computed(() => settingsStore.settingsPanelOpen)

    // 标签页开关状态
    const tagsViewEnabled = computed(() => settingsStore.tagsViewEnabled)

    // 切换侧边栏
    const toggleSidebar = () => {
        settingsStore.toggleSidebar()
    }

    // 打开设置面板
    const openSettingsPanel = () => {
        settingsStore.settingsPanelOpen = true
    }

    // 关闭设置面板
    const closeSettingsPanel = () => {
        settingsStore.settingsPanelOpen = false
    }

    // 切换设置面板
    const toggleSettingsPanel = () => {
        settingsStore.toggleSettingsPanel()
    }

    // 切换标签页开关
    const toggleTagsView = () => {
        settingsStore.toggleTagsView()
    }

    // 重置所有设置
    const resetSettings = () => {
        setTheme('auto')
        settingsStore.resetSettings()
    }

    // 导出设置配置
    const exportSettings = () => {
        const settings = {
            theme: themeStore.currentTheme,
            sidebarCollapsed: settingsStore.sidebarCollapsed,
            tagsViewEnabled: settingsStore.tagsViewEnabled,
            timestamp: Date.now()
        }

        const blob = new Blob([JSON.stringify(settings, null, 2)], {
            type: 'application/json'
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `admin-settings-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    // 导入设置配置
    const importSettings = (file: File): Promise<boolean> => {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.onload = e => {
                try {
                    const settings = JSON.parse(e.target?.result as string)

                    if (settings.theme) {
                        setTheme(settings.theme)
                    }
                    if (typeof settings.sidebarCollapsed === 'boolean') {
                        // 如果当前状态与目标状态不同，则切换
                        if (settingsStore.sidebarCollapsed !== settings.sidebarCollapsed) {
                            toggleSidebar()
                        }
                    }
                    if (typeof settings.tagsViewEnabled === 'boolean') {
                        // 如果当前状态与目标状态不同，则切换
                        if (settingsStore.tagsViewEnabled !== settings.tagsViewEnabled) {
                            toggleTagsView()
                        }
                    }

                    resolve(true)
                } catch (error) {
                    console.error('Failed to import settings:', error)
                    resolve(false)
                }
            }
            reader.readAsText(file)
        })
    }

    return {
        // state
        sidebarCollapsed,
        settingsPanelOpen,
        themeOptions,
        tagsViewEnabled,

        // actions
        toggleSidebar,
        openSettingsPanel,
        closeSettingsPanel,
        toggleSettingsPanel,
        toggleTagsView,
        toggleFullscreen,
        resetSettings,
        exportSettings,
        importSettings,
        setTheme
    }
}
