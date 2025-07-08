<script setup lang="ts">
    import { computed } from 'vue'
    import {
        ElButton,
        ElDropdown,
        ElDropdownMenu,
        ElDropdownItem,
        ElAvatar,
        ElBreadcrumb,
        ElBreadcrumbItem
    } from 'element-plus'
    import { useRoute } from 'vue-router'
    import ThemeToggle from '~/components/ThemeToggle.vue'

    interface UserInfo {
        name: string
        avatar: string
        role: string
    }

    interface Props {
        collapsed: boolean
        userInfo: UserInfo
    }

    interface Emits {
        (e: 'toggle-collapse'): void
        (e: 'logout'): void
    }

    defineProps<Props>()
    const emit = defineEmits<Emits>()
    const route = useRoute()

    // 面包屑数据
    const breadcrumbs = computed(() => {
        const crumbs = [{ title: '仪表板', path: '/dashboard' }]

        if (route.path !== '/dashboard') {
            // 根据路径生成面包屑
            if (route.meta?.title) {
                crumbs.push({ title: route.meta.title as string, path: route.path })
            } else {
                crumbs.push({ title: '工作台', path: route.path })
            }
        }

        return crumbs
    })

    // 处理菜单折叠
    const handleToggleCollapse = () => {
        emit('toggle-collapse')
    }

    // 处理用户下拉菜单
    const handleCommand = (command: string) => {
        switch (command) {
            case 'profile':
                // 跳转到个人中心
                break
            case 'settings':
                // 跳转到设置页面
                break
            case 'logout':
                emit('logout')
                break
        }
    }

    // 全屏功能
    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
    }
</script>

<template>
    <header class="header-bar" :data-theme="$attrs['data-theme']">
        <div class="header-left">
            <!-- 菜单折叠按钮 -->
            <el-button type="text" class="collapse-btn" @click="handleToggleCollapse">
                <el-icon size="20">
                    <component :is="collapsed ? 'expand' : 'fold'" />
                </el-icon>
            </el-button>

            <!-- 面包屑导航 -->
            <el-breadcrumb separator="/" class="breadcrumb">
                <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="item.path">
                    {{ item.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="header-right">
            <!-- 主题切换 -->
            <ThemeToggle />

            <!-- 全屏按钮 -->
            <el-button type="text" class="action-btn" @click="toggleFullscreen">
                <el-icon size="18">
                    <component :is="'full-screen'" />
                </el-icon>
            </el-button>

            <!-- 消息通知 -->
            <el-button type="text" class="action-btn">
                <el-icon size="18">
                    <component :is="'bell'" />
                </el-icon>
            </el-button>

            <!-- 用户信息下拉菜单 -->
            <el-dropdown class="user-dropdown" @command="handleCommand">
                <div class="user-info">
                    <el-avatar :src="userInfo.avatar" :size="32" class="user-avatar" />
                    <span class="user-name">{{ userInfo.name }}</span>
                    <el-icon class="dropdown-icon">
                        <component :is="'arrow-down'" />
                    </el-icon>
                </div>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="profile">
                            <el-icon><component :is="'user'" /></el-icon>
                            个人中心
                        </el-dropdown-item>
                        <el-dropdown-item command="settings">
                            <el-icon><component :is="'setting'" /></el-icon>
                            个人设置
                        </el-dropdown-item>
                        <el-dropdown-item divided command="logout">
                            <el-icon><component :is="'switch-button'" /></el-icon>
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    /* 头部导航样式已移至主题文件和全局样式 */
</style>
