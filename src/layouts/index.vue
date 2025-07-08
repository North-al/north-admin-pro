<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { ElMessageBox } from 'element-plus'
    import SidebarMenu from './components/SidebarMenu.vue'
    import HeaderBar from './components/HeaderBar.vue'
    import TagsView from './components/TagsView.vue'

    defineOptions({ name: 'Layout' })

    const router = useRouter()

    // 主题管理
    const currentTheme = ref('dark') // 默认深色主题

    // 监听主题变化事件
    onMounted(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark'
        currentTheme.value = savedTheme
        document.documentElement.setAttribute('data-theme', savedTheme)

        // 监听主题切换事件
        window.addEventListener('theme-change', (event: any) => {
            currentTheme.value = event.detail
        })
    })

    // 侧边栏折叠状态
    const isCollapsed = ref(false)

    // 移动端菜单状态
    const mobileMenuOpen = ref(false)

    // 切换侧边栏折叠状态
    const toggleCollapse = () => {
        if (window.innerWidth <= 768) {
            mobileMenuOpen.value = !mobileMenuOpen.value
        } else {
            isCollapsed.value = !isCollapsed.value
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
        return isCollapsed.value ? '64px' : '250px'
    })

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
    <div class="layout" :data-theme="currentTheme">
        <!-- 侧边栏 -->
        <aside :class="sidebarClass" :style="{ width: sidebarWidth }" :data-theme="currentTheme">
            <div class="sidebar-logo" :data-theme="currentTheme">
                <img v-if="!isCollapsed" src="/vite.svg" alt="Logo" class="logo-img" />
                <img v-else src="/vite.svg" alt="Logo" class="logo-img-mini" />
                <span v-if="!isCollapsed" class="logo-text">Art Design Pro</span>
            </div>

            <SidebarMenu :collapsed="isCollapsed" :data-theme="currentTheme" />
        </aside>

        <!-- 主内容区 -->
        <div class="layout-main">
            <!-- 顶部导航 -->
            <HeaderBar
                :collapsed="isCollapsed"
                :user-info="userInfo"
                :data-theme="currentTheme"
                @toggle-collapse="toggleCollapse"
                @logout="handleLogout" />

            <!-- 标签页导航 -->
            <TagsView :data-theme="currentTheme" />

            <!-- 页面内容 -->
            <main class="layout-content" :data-theme="currentTheme">
                <div class="content-wrapper">
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    /* 布局样式已移至全局样式文件 src/styles/app.scss */
</style>
