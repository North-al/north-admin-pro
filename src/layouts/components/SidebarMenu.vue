<script setup lang="ts">
    import { useThemeStore } from '../../store/modules/theme'

    interface Props {
        collapsed: boolean
    }

    defineProps<Props>()
    const router = useRouter()
    const route = useRoute()
    const themeStore = useThemeStore()

    // 获取当前主题
    const currentTheme = computed(() => themeStore.computedTheme)

    // 菜单数据 - 这里可以从路由配置或API获取
    const menuItems = ref([
        {
            path: '/dashboard',
            title: '仪表板',
            icon: 'Odometer',
            children: [
                {
                    path: '/dashboard',
                    title: '分析页',
                    icon: 'DataAnalysis'
                },
                {
                    path: '/workplace',
                    title: '工作台',
                    icon: 'Monitor'
                },
                {
                    path: '/e-commerce',
                    title: '电子商务',
                    icon: 'ShoppingCart'
                }
            ]
        },
        {
            path: '/model-center',
            title: '模板中心',
            icon: 'Folder',
            children: [
                {
                    path: '/model/list',
                    title: '模板列表',
                    icon: 'Document'
                },
                {
                    path: '/model/category',
                    title: '分类管理',
                    icon: 'Collection'
                }
            ]
        },
        {
            path: '/design-center',
            title: '设计中心',
            icon: 'Edit',
            children: [
                {
                    path: '/design/canvas',
                    title: '画布设计',
                    icon: 'Picture'
                },
                {
                    path: '/design/assets',
                    title: '素材库',
                    icon: 'Files'
                }
            ]
        },
        {
            path: '/function-demo',
            title: '功能示例',
            icon: 'Cpu'
        },
        {
            path: '/system',
            title: '系统管理',
            icon: 'Setting',
            children: [
                {
                    path: '/system/user',
                    title: '用户管理',
                    icon: 'User'
                },
                {
                    path: '/system/role',
                    title: '角色管理',
                    icon: 'Avatar'
                },
                {
                    path: '/system/menu',
                    title: '菜单管理',
                    icon: 'MenuIcon'
                }
            ]
        },
        {
            path: '/document-manage',
            title: '文章管理',
            icon: 'Document'
        },
        {
            path: '/result-page',
            title: '结果页面',
            icon: 'Checked'
        },
        {
            path: '/exception-page',
            title: '异常页面',
            icon: 'Warning'
        },
        {
            path: '/operation-manage',
            title: '运维管理',
            icon: 'Tools'
        },
        {
            path: '/help-center',
            title: '帮助中心',
            icon: 'QuestionFilled',
            badge: 'v2.6.1'
        },
        {
            path: '/update-log',
            title: '更新日志',
            icon: 'Notebook',
            badge: 'v2.6.1'
        }
    ])

    // 当前激活的菜单
    const activeMenu = computed(() => route.path)

    // 图标组件映射
    const getIconComponent = (iconName: string) => {
        const iconMap: Record<string, any> = {
            Odometer: 'Odometer',
            DataAnalysis: 'DataAnalysis',
            Monitor: 'Monitor',
            ShoppingCart: 'ShoppingCart',
            Folder: 'Folder',
            Document: 'Document',
            Collection: 'Collection',
            Edit: 'Edit',
            Picture: 'Picture',
            Files: 'Files',
            Cpu: 'Cpu',
            Setting: 'Setting',
            User: 'User',
            Avatar: 'Avatar',
            MenuIcon: 'MenuIcon',
            Checked: 'Checked',
            Warning: 'Warning',
            Tools: 'Tools',
            QuestionFilled: 'QuestionFilled',
            Notebook: 'Notebook'
        }
        return iconMap[iconName] || Document
    }

    // 处理菜单点击
    const handleMenuClick = (path: string) => {
        if (path !== route.path) {
            router.push(path)
        }
    }
</script>

<template>
    <div class="sidebar-menu" :data-theme="currentTheme">
        <el-menu
            :default-active="activeMenu"
            :collapse="collapsed"
            :unique-opened="true"
            background-color="transparent"
            :text-color="undefined"
            :active-text-color="undefined"
            :collapse-transition="false"
            mode="vertical"
            class="sidebar-el-menu">
            <template v-for="item in menuItems" :key="item.path">
                <!-- 有子菜单的情况 -->
                <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path" class="menu-sub-menu">
                    <template #title>
                        <el-icon class="menu-icon">
                            <component :is="getIconComponent(item.icon)" />
                        </el-icon>
                        <span class="menu-title">{{ item.title }}</span>
                    </template>

                    <el-menu-item
                        v-for="child in item.children"
                        :key="child.path"
                        :index="child.path"
                        class="menu-sub-item"
                        @click="handleMenuClick(child.path)">
                        <el-icon class="menu-icon">
                            <component :is="getIconComponent(child.icon)" />
                        </el-icon>
                        <span class="menu-title">{{ child.title }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <!-- 没有子菜单的情况 -->
                <el-menu-item v-else :index="item.path" class="menu-item" @click="handleMenuClick(item.path)">
                    <el-icon class="menu-icon">
                        <component :is="getIconComponent(item.icon)" />
                    </el-icon>
                    <span class="menu-title">{{ item.title }}</span>
                    <el-tag type="primary" v-if="item.badge" class="menu-badge" size="small">{{ item.badge }}</el-tag>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
    .sidebar-menu {
        flex: 1;
        overflow-y: auto;
        padding: 12px 0;
        background: var(--sidebar-bg-color);
        transition: all 0.3s ease;

        .sidebar-el-menu {
            border-right: none;
            background: transparent;

            // 全局菜单样式
            :deep(.el-menu-item),
            :deep(.el-sub-menu__title) {
                height: 48px;
                line-height: 48px;
                margin: 2px 12px;
                border-radius: 8px;
                color: var(--sidebar-text-color);
                background-color: transparent;
                border: none;
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;

                &:hover {
                    background-color: var(--sidebar-hover-bg);
                    color: var(--sidebar-text-active);
                }

                &.is-active {
                    background-color: var(--sidebar-active-bg);
                    color: var(--sidebar-text-active);
                    font-weight: 600;

                    &::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 3px;
                        height: 20px;
                        background-color: var(--sidebar-text-active);
                        border-radius: 0 2px 2px 0;
                    }
                }

                .menu-icon {
                    font-size: 18px;
                    width: 18px;
                    margin-right: 12px;
                    transition: all 0.2s ease;
                }

                .menu-title {
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }
            }

            // 折叠状态下的样式
            &.el-menu--collapse {
                :deep(.el-menu-item),
                :deep(.el-sub-menu__title) {
                    padding: 0;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .menu-icon {
                        margin-right: 0;
                        font-size: 20px;
                    }

                    .menu-title {
                        display: none;
                    }

                    .menu-badge {
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        transform: scale(0.8);
                    }
                }

                // 子菜单弹出样式
                :deep(.el-sub-menu) {
                    .el-sub-menu__title {
                        justify-content: center;
                    }
                }
            }

            // 子菜单样式
            :deep(.el-sub-menu) {
                .el-menu {
                    background-color: rgba(0, 0, 0, 0.02);

                    [data-theme='dark'] & {
                        background-color: rgba(255, 255, 255, 0.02);
                    }

                    .el-menu-item {
                        height: 40px;
                        line-height: 40px;
                        margin: 4px 12px 4px 36px;
                        padding-left: 20px;

                        .menu-icon {
                            font-size: 16px;
                            width: 16px;
                            margin-right: 8px;
                        }

                        .menu-title {
                            font-size: 13px;
                        }
                    }
                }

                // 展开的子菜单弹出层样式
                .el-menu--popup {
                    background: var(--sidebar-bg-color);
                    border: 1px solid var(--sidebar-border-color);
                    box-shadow: var(--app-shadow-color) 0 2px 12px;
                    border-radius: 8px;
                    padding: 4px 0;

                    .el-menu-item {
                        margin: 1px 8px;
                        height: 36px;
                        line-height: 36px;
                        border-radius: 6px;
                        color: var(--sidebar-text-color);

                        &:hover {
                            background-color: var(--sidebar-hover-bg);
                            color: var(--sidebar-text-active);
                        }

                        &.is-active {
                            background-color: var(--sidebar-active-bg);
                            color: var(--sidebar-text-active);
                        }
                    }
                }
            }

            // 徽章样式
            .menu-badge {
                :deep(.el-badge__content) {
                    background-color: var(--el-color-primary);
                    border: 1px solid var(--sidebar-bg-color);
                    font-size: 10px;
                    height: 16px;
                    line-height: 14px;
                    padding: 0 4px;
                    min-width: 16px;
                }
            }
        }

        // 滚动条样式
        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--app-border-color);
            border-radius: 3px;

            &:hover {
                background: var(--app-text-placeholder);
            }
        }
    }

    // 确保弹出菜单的主题一致性 - 使用全局样式注入
    .el-popper[data-popper-placement] {
        .el-menu--popup {
            .el-menu-item {
                color: var(--sidebar-text-color) !important;
                background: transparent !important;
                margin: 2px 8px !important;
                border-radius: 6px !important;
                transition: all 0.2s ease !important;

                &:hover {
                    background-color: var(--sidebar-hover-bg) !important;
                    color: var(--sidebar-text-active) !important;
                }

                &.is-active {
                    color: var(--sidebar-text-active) !important;
                    background-color: var(--sidebar-active-bg) !important;
                }
            }
        }
    }
</style>
