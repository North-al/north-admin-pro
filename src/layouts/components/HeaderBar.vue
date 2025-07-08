<script setup lang="ts">
    import ThemeToggle from '~/components/ThemeToggle.vue'
    import { useSettings } from '../../hooks/useSettings'
    import { useFullscreen } from '../../hooks/useFullscreen'
    import { useThemeStore } from '../../store/modules/theme'

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

    // 使用hooks和store
    const { openSettingsPanel } = useSettings()
    const { toggleFullscreen: toggleFullscreenMode, isFullscreen } = useFullscreen()
    const themeStore = useThemeStore()

    // 获取当前主题
    const currentTheme = computed(() => themeStore.computedTheme)

    // 面包屑数据
    const breadcrumbs = computed(() => {
        const crumbs = [{ title: '首页', path: '/dashboard' }]

        if (route.path !== '/dashboard') {
            // 根据路径生成面包屑
            if (route.meta?.title) {
                crumbs.push({ title: route.meta.title as string, path: route.path })
            } else {
                // 根据路径生成标题
                const pathSegments = route.path.split('/').filter(Boolean)
                if (pathSegments.length > 0) {
                    const title = pathSegments[pathSegments.length - 1]
                    crumbs.push({ title: title === 'workplace' ? '工作台' : title, path: route.path })
                }
            }
        }

        return crumbs
    })

    // 模拟通知数据
    const notificationCount = computed(() => 3) // 可以从store或API获取

    // 处理菜单折叠
    const handleToggleCollapse = () => {
        emit('toggle-collapse')
    }

    // 处理用户下拉菜单
    const handleCommand = (command: string) => {
        switch (command) {
            case 'profile':
                // 跳转到个人中心
                console.log('跳转到个人中心')
                break
            case 'settings':
                // 跳转到设置页面
                console.log('跳转到设置页面')
                break
            case 'messages':
                // 跳转到消息中心
                console.log('跳转到消息中心')
                break
            case 'logout':
                emit('logout')
                break
        }
    }

    // 全屏功能
    const toggleFullscreen = () => {
        toggleFullscreenMode()
    }

    // 打开设置面板
    const handleOpenSettings = () => {
        openSettingsPanel()
    }
</script>

<template>
    <header class="header-bar" :data-theme="currentTheme">
        <div class="header-left">
            <!-- 菜单折叠按钮 -->
            <el-tooltip :content="collapsed ? '展开菜单' : '折叠菜单'" placement="bottom">
                <el-button type="text" class="collapse-btn" @click="handleToggleCollapse">
                    <el-icon size="20">
                        <Expand v-if="collapsed" />
                        <Fold v-else />
                    </el-icon>
                </el-button>
            </el-tooltip>

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
            <el-tooltip :content="isFullscreen ? '退出全屏' : '进入全屏'" placement="bottom">
                <el-button type="text" class="action-btn" @click="toggleFullscreen">
                    <el-icon size="18">
                        <FullScreen />
                    </el-icon>
                </el-button>
            </el-tooltip>

            <!-- 消息通知 -->
            <el-tooltip content="消息通知" placement="bottom">
                <el-badge :value="notificationCount" :hidden="notificationCount === 0" class="notification-badge">
                    <el-button type="text" class="action-btn">
                        <el-icon size="18">
                            <Bell />
                        </el-icon>
                    </el-button>
                </el-badge>
            </el-tooltip>

            <!-- 设置按钮 -->
            <el-tooltip content="系统设置" placement="bottom">
                <el-button type="text" class="action-btn" @click="handleOpenSettings">
                    <el-icon size="18">
                        <Setting />
                    </el-icon>
                </el-button>
            </el-tooltip>

            <!-- 用户信息下拉菜单 -->
            <el-dropdown class="user-dropdown" @command="handleCommand">
                <div class="user-info">
                    <el-avatar :src="userInfo.avatar" :size="32" class="user-avatar" />
                    <span class="user-name">{{ userInfo.name }}</span>
                    <el-icon class="dropdown-icon">
                        <ArrowDown />
                    </el-icon>
                </div>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="profile">
                            <el-icon><User /></el-icon>
                            个人中心
                        </el-dropdown-item>
                        <el-dropdown-item command="settings">
                            <el-icon><Setting /></el-icon>
                            个人设置
                        </el-dropdown-item>
                        <el-dropdown-item command="messages">
                            <el-icon><Message /></el-icon>
                            消息中心
                        </el-dropdown-item>
                        <el-dropdown-item divided command="logout">
                            <el-icon><SwitchButton /></el-icon>
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    .header-bar {
        // 使用主题变量
        background: var(--header-bg-color);
        border-bottom: 1px solid var(--header-border-color);
        box-shadow: var(--header-shadow);
        color: var(--header-text-color);
        transition: all 0.3s ease;

        .collapse-btn,
        .action-btn {
            color: var(--header-text-color);
            border-radius: 6px;
            transition: all 0.2s ease;

            &:hover {
                background-color: var(--app-hover-bg, rgba(0, 0, 0, 0.05));
                color: var(--el-color-primary);
            }
        }

        .breadcrumb {
            :deep(.el-breadcrumb__item) {
                .el-breadcrumb__inner {
                    color: var(--app-text-secondary);
                    font-weight: normal;

                    &:hover {
                        color: var(--el-color-primary);
                    }
                }

                &:last-child .el-breadcrumb__inner {
                    color: var(--app-text-color);
                    font-weight: 500;
                }
            }
        }

        .user-info {
            color: var(--header-text-color);
            border-radius: 6px;
            transition: all 0.2s ease;

            &:hover {
                background-color: var(--app-hover-bg, rgba(0, 0, 0, 0.05));
            }

            .user-name {
                color: var(--app-text-color);
                font-weight: 500;
            }

            .dropdown-icon {
                color: var(--app-text-secondary);
            }
        }

        .notification-badge {
            :deep(.el-badge__content) {
                border: 2px solid var(--header-bg-color);
            }
        }
    }
</style>
