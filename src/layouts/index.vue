<script setup lang="ts">
    import SidebarMenu from './components/SidebarMenu.vue'
    import HeaderBar from './components/HeaderBar.vue'
    import TagsView from './components/TagsView.vue'
    import SettingsPanel from '../components/SettingsPanel.vue'
    import { useThemeStore } from '../store/modules/theme'

    defineOptions({ name: 'Layout' })

    const router = useRouter()
    const themeStore = useThemeStore()

    // 初始化主题
    onMounted(() => {
        themeStore.initTheme()
    })

    // 移动端菜单状态
    const mobileMenuOpen = ref(false)

    // 切换侧边栏折叠状态
    const toggleCollapse = () => {
        if (window.innerWidth <= 768) {
            mobileMenuOpen.value = !mobileMenuOpen.value
        } else {
            themeStore.toggleSidebar()
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
        return themeStore.sidebarCollapsed ? '64px' : '250px'
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
</script>

<template>
    <div class="layout" :data-theme="appliedTheme">
        <!-- 侧边栏 -->
        <aside :class="sidebarClass" :style="{ width: sidebarWidth }" :data-theme="appliedTheme">
            <div class="sidebar-logo" :data-theme="appliedTheme" @click="handleLogoClick">
                <img v-if="!themeStore.sidebarCollapsed" :src="logoSrc" alt="North Admin Logo" class="logo-img" />
                <img v-else :src="logoSrc" alt="North Admin Logo" class="logo-img-mini" />
                <span v-if="!themeStore.sidebarCollapsed" class="logo-text">North Admin</span>
            </div>

            <SidebarMenu :collapsed="themeStore.sidebarCollapsed" :data-theme="appliedTheme" />
        </aside>

        <!-- 主内容区 -->
        <div class="layout-main">
            <!-- 顶部导航 -->
            <HeaderBar
                :collapsed="themeStore.sidebarCollapsed"
                :user-info="userInfo"
                :data-theme="appliedTheme"
                @toggle-collapse="toggleCollapse"
                @logout="handleLogout" />

            <!-- 标签页导航 -->
            <TagsView :data-theme="appliedTheme" />

            <!-- 页面内容 -->
            <main class="layout-content" :data-theme="appliedTheme">
                <div class="content-wrapper">
                    <router-view />
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
