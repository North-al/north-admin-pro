<script setup lang="ts">
    import ThemeToggle from '~/components/ThemeToggle.vue'
    import Breadcrumb from '~/components/Breadcrumb.vue'
    import { useSettings } from '../../hooks/useSettings'
    import { useFullscreen } from '../../hooks/useFullscreen'
    import { generateBreadcrumbs } from '~/utils/breadcrumb'

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
    const { toggleFullscreen: toggleFullscreenMode } = useFullscreen()

    // 面包屑数据
    const breadcrumbs = computed(() => {
        return generateBreadcrumbs(route)
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
    <header class="header-bar">
        <div class="header-left">
            <!-- 菜单折叠按钮 -->
            <el-button :icon="collapsed ? 'Expand' : 'Fold'" circle @click="handleToggleCollapse" />

            <!-- 面包屑导航 -->
            <Breadcrumb :items="breadcrumbs" />
        </div>

        <div class="header-right">
            <!-- 主题切换 -->
            <ThemeToggle />

            <!-- 全屏按钮 -->
            <el-button text class="action-btn" @click="toggleFullscreen">
                <el-icon size="18">
                    <FullScreen />
                </el-icon>
            </el-button>

            <!-- 消息通知 -->
            <el-badge :value="notificationCount" :hidden="notificationCount === 0" class="notification-badge">
                <el-button text class="action-btn">
                    <el-icon size="18">
                        <Bell />
                    </el-icon>
                </el-button>
            </el-badge>

            <!-- 设置按钮 -->
            <el-button text class="action-btn" @click="handleOpenSettings">
                <el-icon size="18">
                    <Setting />
                </el-icon>
            </el-button>

            <!-- 用户信息下拉菜单 -->
            <el-dropdown class="user-dropdown" @command="handleCommand">
                <div class="user-info">
                    <el-avatar :src="userInfo.avatar" :size="24" class="user-avatar" />
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

        .action-btn {
            color: var(--header-text-color);
            padding: 8px;
            // border-radius: 6px;
            // transition: all 0.2s ease;

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
    }
</style>
