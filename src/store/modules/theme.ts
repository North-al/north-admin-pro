export type ThemeType = 'dark' | 'light' | 'mixed' | 'auto'

export interface ThemeConfig {
    name: string
    label: string
    description: string
    preview: {
        sidebar: string
        header: string
        content: string
    }
}

export const useThemeStore = defineStore('theme', () => {
    // 当前主题设置（用户选择）
    const currentTheme = ref<ThemeType>('auto')

    // 实际应用的主题（计算后的结果）
    const actualTheme = ref<Exclude<ThemeType, 'auto'>>('dark')

    // 侧边栏折叠状态
    const sidebarCollapsed = ref(false)

    // 设置面板状态
    const settingsPanelOpen = ref(false)

    // 全屏状态
    const isFullscreen = ref(false)

    // 主题配置
    const themeConfigs: Record<ThemeType, ThemeConfig> = {
        auto: {
            name: 'auto',
            label: '跟随系统',
            description: '自动跟随系统主题设置',
            preview: {
                sidebar: 'linear-gradient(45deg, #232324 50%, #FFFFFF 50%)',
                header: 'linear-gradient(45deg, #232324 50%, #FFFFFF 50%)',
                content: 'linear-gradient(45deg, #29292C 50%, #FAFBFC 50%)'
            }
        },
        dark: {
            name: 'dark',
            label: '深色主题',
            description: '适合夜间使用的深色界面',
            preview: {
                sidebar: '#232324',
                header: '#232324',
                content: '#29292C'
            }
        },
        light: {
            name: 'light',
            label: '浅色主题',
            description: '经典的浅色界面风格',
            preview: {
                sidebar: '#FFFFFF',
                header: '#FFFFFF',
                content: '#FAFBFC'
            }
        },
        mixed: {
            name: 'mixed',
            label: '混合主题',
            description: '深色侧边栏配浅色内容区',
            preview: {
                sidebar: '#232324',
                header: '#FFFFFF',
                content: '#FAFBFC'
            }
        }
    }

    // 获取系统主题
    const getSystemTheme = (): Exclude<ThemeType, 'auto'> => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        return 'dark'
    }

    // 计算实际应用的主题
    const computedTheme = computed(() => {
        if (currentTheme.value === 'auto') {
            return getSystemTheme()
        }
        return currentTheme.value as Exclude<ThemeType, 'auto'>
    })

    // 当前主题配置
    const currentThemeConfig = computed(() => themeConfigs[currentTheme.value])

    // 设置主题
    const setTheme = (theme: ThemeType) => {
        currentTheme.value = theme
        const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme
        actualTheme.value = effectiveTheme as Exclude<ThemeType, 'auto'>

        // 设置data-theme属性
        document.documentElement.setAttribute('data-theme', effectiveTheme)

        // 为Element Plus设置主题class
        // mixed主题下，元素组件使用light主题
        const elementTheme = effectiveTheme === 'dark' ? 'dark' : 'light'
        document.documentElement.className =
            document.documentElement.className.replace(/\b(dark|light)\b/g, '').trim() + ` ${elementTheme}`

        localStorage.setItem('app-theme', theme)

        // 触发自定义事件
        const event = new CustomEvent('theme-change', { detail: effectiveTheme })
        window.dispatchEvent(event)
    }

    // 监听系统主题变化
    const setupSystemThemeListener = () => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            mediaQuery.addEventListener('change', () => {
                if (currentTheme.value === 'auto') {
                    setTheme('auto') // 重新应用auto主题
                }
            })
        }
    }

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

    // 初始化主题
    const initTheme = () => {
        const savedTheme = (localStorage.getItem('app-theme') as ThemeType) || 'auto'
        const savedSidebarState = localStorage.getItem('sidebar-collapsed') === 'true'

        sidebarCollapsed.value = savedSidebarState

        // 设置主题并监听系统变化
        setTheme(savedTheme)
        setupSystemThemeListener()
    }

    return {
        // state
        currentTheme,
        actualTheme,
        sidebarCollapsed,
        settingsPanelOpen,
        isFullscreen,
        themeConfigs,

        // getters
        currentThemeConfig,
        computedTheme,

        // actions
        setTheme,
        toggleSidebar,
        toggleSettingsPanel,
        setFullscreen,
        initTheme
    }
})
