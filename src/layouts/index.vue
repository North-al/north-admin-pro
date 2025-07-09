<script setup lang="ts">
    import SidebarMenu from './components/SidebarMenu.vue'
    import HeaderBar from './components/HeaderBar.vue'
    import TagsView from './components/TagsView.vue'
    import SettingsPanel from '../components/SettingsPanel.vue'
    import { useThemeStore } from '../store/modules/theme'
    import { useSettingsStore } from '../store/modules/settings'

    defineOptions({ name: 'Layout' })

    const router = useRouter()
    const route = useRoute()
    const themeStore = useThemeStore()
    const settingsStore = useSettingsStore()

    // 初始化主题和设置
    onMounted(() => {
        themeStore.initTheme()
        settingsStore.initSettings()
    })

    // 移动端菜单状态
    const mobileMenuOpen = ref(false)

    // 缓存的组件名称列表
    const cachedViews = ref<string[]>([])

    // 监听路由变化，动态管理缓存
    watch(
        () => route.name,
        newRouteName => {
            if (newRouteName && route.meta?.keepAlive) {
                const componentName = newRouteName as string
                if (!cachedViews.value.includes(componentName)) {
                    cachedViews.value.push(componentName)
                }
            }
        },
        { immediate: true }
    )

    // 从缓存中移除指定组件
    const removeCachedView = (componentName: string) => {
        const index = cachedViews.value.indexOf(componentName)
        if (index > -1) {
            cachedViews.value.splice(index, 1)
        }
    }

    // 清空所有缓存
    const clearAllCachedViews = () => {
        cachedViews.value = []
    }

    // 切换侧边栏折叠状态
    const toggleCollapse = () => {
        if (window.innerWidth <= 768) {
            mobileMenuOpen.value = !mobileMenuOpen.value
        } else {
            settingsStore.toggleSidebar()
        }
    }

    // 用户信息
    const userInfo = ref({
        name: '管理员',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        role: '超级管理员'
    })

    // 退出登录
    const handleLogout = async () => {
        try {
            await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })

            // 这里添加退出登录逻辑
            localStorage.removeItem('token')
            clearAllCachedViews() // 清空缓存
            router.push('/login')
        } catch {
            // 用户取消
        }
    }

    // 计算侧边栏宽度
    const sidebarWidth = computed(() => {
        if (window.innerWidth <= 768) {
            return '250px'
        }
        return settingsStore.sidebarCollapsed ? '64px' : '250px'
    })

    // 计算实际应用的主题
    const appliedTheme = computed(() => themeStore.computedTheme)

    // 计算logo图片路径
    const logoSrc = computed(() => {
        // 根据主题选择logo - 深色主题和混色主题使用白色logo，浅色主题使用黑色logo
        if (appliedTheme.value === 'dark' || appliedTheme.value === 'mixed') {
            return new URL('../assets/logo-white.png', import.meta.url).href
        } else {
            return new URL('../assets/logo-black.png', import.meta.url).href
        }
    })

    // logo点击事件
    const handleLogoClick = () => {
        if (router.currentRoute.value.path !== '/dashboard') {
            router.push('/dashboard')
        }
    }

    // 计算侧边栏类名
    const sidebarClass = computed(() => {
        const classes = ['layout-sidebar']
        if (window.innerWidth <= 768 && mobileMenuOpen.value) {
            classes.push('mobile-open')
        }
        return classes.join(' ')
    })

    // 暴露方法给子组件使用（如 TagsView）
    defineExpose({
        removeCachedView,
        clearAllCachedViews
    })
</script>

<template>
    <div class="layout" :data-theme="appliedTheme">
        <!-- 侧边栏 -->
        <aside :class="sidebarClass" :style="{ width: sidebarWidth }" :data-theme="appliedTheme">
            <div class="sidebar-logo" :data-theme="appliedTheme" @click="handleLogoClick">
                <img v-if="!settingsStore.sidebarCollapsed" :src="logoSrc" alt="North Admin Logo" class="logo-img" />
                <img v-else :src="logoSrc" alt="North Admin Logo" class="logo-img-mini" />
                <span v-if="!settingsStore.sidebarCollapsed" class="logo-text">North Admin</span>
            </div>

            <SidebarMenu :collapsed="settingsStore.sidebarCollapsed" :data-theme="appliedTheme" />
        </aside>

        <!-- 主内容区 -->
        <div class="layout-main">
            <!-- 顶部导航 -->
            <HeaderBar
                :collapsed="settingsStore.sidebarCollapsed"
                :user-info="userInfo"
                :data-theme="appliedTheme"
                @toggle-collapse="toggleCollapse"
                @logout="handleLogout" />

            <!-- 标签页导航 -->
            <TagsView v-if="settingsStore.tagsViewEnabled" :data-theme="appliedTheme" />

            <!-- 页面内容 -->
            <main class="layout-content" :data-theme="appliedTheme">
                <div class="content-wrapper">
                    <router-view v-slot="{ Component, route: currentRoute }">
                        <transition name="fade-transform" mode="out-in" appear>
                            <keep-alive :include="cachedViews">
                                <component :is="Component" :key="currentRoute.fullPath" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </main>
        </div>

        <!-- 设置面板 -->
        <SettingsPanel />
    </div>
</template>

<style lang="scss" scoped>
    /* 布局样式已移至全局样式文件 src/styles/app.scss */
</style>
