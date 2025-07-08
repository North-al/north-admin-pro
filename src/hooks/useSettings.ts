import { computed } from 'vue'
import { useThemeStore } from '../store/modules/theme'
import { useTheme } from './useTheme'
import { useFullscreen } from './useFullscreen'

/**
 * 设置管理Hook
 * 提供设置面板、侧边栏、全局配置等功能
 */
export function useSettings() {
    const themeStore = useThemeStore()
    const { setTheme, themeOptions } = useTheme()
    const { toggleFullscreen } = useFullscreen()

    // 侧边栏折叠状态
    const sidebarCollapsed = computed(() => themeStore.sidebarCollapsed)

    // 设置面板状态
    const settingsPanelOpen = computed(() => themeStore.settingsPanelOpen)

    // 切换侧边栏
    const toggleSidebar = () => {
        themeStore.toggleSidebar()
    }

    // 打开设置面板
    const openSettingsPanel = () => {
        themeStore.settingsPanelOpen = true
    }

    // 关闭设置面板
    const closeSettingsPanel = () => {
        themeStore.settingsPanelOpen = false
    }

    // 切换设置面板
    const toggleSettingsPanel = () => {
        themeStore.toggleSettingsPanel()
    }

    // 重置所有设置
    const resetSettings = () => {
        setTheme('auto')
        themeStore.sidebarCollapsed = false
        themeStore.settingsPanelOpen = false
    }

    // 导出设置配置
    const exportSettings = () => {
        const settings = {
            theme: themeStore.currentTheme,
            sidebarCollapsed: themeStore.sidebarCollapsed,
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
                        themeStore.sidebarCollapsed = settings.sidebarCollapsed
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

        // actions
        toggleSidebar,
        openSettingsPanel,
        closeSettingsPanel,
        toggleSettingsPanel,
        toggleFullscreen,
        resetSettings,
        exportSettings,
        importSettings,
        setTheme
    }
}
