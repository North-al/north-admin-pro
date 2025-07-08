import { useThemeStore, type ThemeType, type ThemeConfig } from '../store/modules/theme'

/**
 * 主题管理Hook
 * 提供主题切换、主题配置等功能
 */
export function useTheme() {
    const themeStore = useThemeStore()

    // 当前主题
    const currentTheme = computed(() => themeStore.currentTheme)

    // 当前主题配置
    const currentThemeConfig = computed(() => themeStore.currentThemeConfig)

    // 所有主题配置
    const themeConfigs = computed(() => themeStore.themeConfigs)

    // 主题列表
    const themeOptions = computed(() => {
        return Object.values(themeStore.themeConfigs).map((config: ThemeConfig) => ({
            value: config.name as ThemeType,
            label: config.label,
            description: config.description,
            preview: config.preview
        }))
    })

    // 设置主题
    const setTheme = (theme: ThemeType) => {
        themeStore.setTheme(theme)
    }

    // 切换主题（在预设主题之间循环切换）
    const toggleTheme = () => {
        const themes: ThemeType[] = ['light', 'dark', 'mixed']
        const currentIndex = themes.indexOf(currentTheme.value)
        const nextIndex = (currentIndex + 1) % themes.length
        setTheme(themes[nextIndex])
    }

    // 判断是否为深色主题
    const isDark = computed(() => {
        return (
            currentTheme.value === 'dark' ||
            (currentTheme.value === 'mixed' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        )
    })

    // 判断是否为浅色主题
    const isLight = computed(() => {
        return currentTheme.value === 'light'
    })

    // 判断是否为混色主题
    const isMixed = computed(() => {
        return currentTheme.value === 'mixed'
    })

    return {
        // state
        currentTheme,
        currentThemeConfig,
        themeConfigs,
        themeOptions,
        isDark,
        isLight,
        isMixed,

        // actions
        setTheme,
        toggleTheme
    }
}
