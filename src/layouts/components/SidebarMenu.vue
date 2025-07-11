<script setup lang="ts">
    import { generateMenu } from '~/router/helper/menuHelper'
    import MenuItem from './MenuItem.vue'

    interface Props {
        collapsed: boolean
    }

    defineProps<Props>()
    const router = useRouter()
    const route = useRoute()

    // 从路由生成菜单
    const menuItems = computed(() => {
        const layoutRoute = router.options.routes.find(r => r.name === 'Layout')
        return layoutRoute ? generateMenu(layoutRoute.children || []) : []
    })

    // 当前激活的菜单
    const activeMenu = computed(() => route.path)

    // 处理菜单点击
    const handleMenuClick = (path: string) => {
        if (path !== route.path) {
            router.push(path)
        }
    }
</script>

<template>
    <div class="sidebar-menu">
        <el-menu
            :default-active="activeMenu"
            :collapse="collapsed"
            background-color="transparent"
            :collapse-transition="false"
            mode="vertical"
            class="sidebar-el-menu">
            <MenuItem v-for="item in menuItems" :key="item.path" :item="item" @menu-click="handleMenuClick" />
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
                display: flex;
                align-items: center;

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
                    flex-shrink: 0;

                    &:empty {
                        display: none;
                    }
                }

                .menu-title {
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    flex: 1;
                    text-align: left;
                }
                .menu-badge {
                    margin-left: auto;
                    margin-right: 8px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;

                    :deep(.el-badge__content) {
                        background-color: var(--el-color-primary);
                        border: none;
                        font-size: 10px;
                        height: 18px;
                        line-height: 18px;
                        padding: 0 6px;
                        min-width: 18px;
                        border-radius: 9px;
                        font-weight: 600;
                        color: #fff;
                        position: static;
                        transform: none;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            } // 折叠状态下的样式
            &.el-menu--collapse {
                :deep(.el-menu-item),
                :deep(.el-sub-menu__title) {
                    padding: 0;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;

                    .menu-icon {
                        margin-right: 0;
                        font-size: 20px;
                    }

                    .menu-title {
                        display: none;
                    }

                    // 折叠时隐藏第一级的徽记
                    .menu-badge {
                        display: none;
                    }
                }

                // 子菜单弹出样式
                :deep(.el-sub-menu) {
                    .el-sub-menu__title {
                        justify-content: center;

                        .menu-badge {
                            display: none;
                        }
                    }

                    // 弹出的子菜单仍然显示徽记
                    .el-menu--popup {
                        .el-menu-item {
                            .menu-badge {
                                display: flex;
                            }
                        }
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
                        display: flex;
                        align-items: center;

                        .menu-icon {
                            font-size: 16px;
                            width: 16px;
                            margin-right: 8px;
                            flex-shrink: 0;

                            &:empty {
                                display: none;
                            }
                        }

                        .menu-title {
                            font-size: 13px;
                            flex: 1;
                        }
                        .menu-badge {
                            margin-left: auto;
                            margin-right: 8px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;

                            :deep(.el-badge__content) {
                                background-color: var(--el-color-primary);
                                border: none;
                                font-size: 9px;
                                height: 16px;
                                line-height: 16px;
                                padding: 0 5px;
                                min-width: 16px;
                                border-radius: 8px;
                                font-weight: 600;
                                color: #fff;
                                transform: none;
                                position: static;
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                            }
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
                        display: flex;
                        align-items: center;
                        padding-left: 12px;
                        padding-right: 12px;

                        .menu-icon {
                            font-size: 14px;
                            width: 14px;
                            margin-right: 8px;
                            flex-shrink: 0;

                            &:empty {
                                display: none;
                            }
                        }

                        .menu-title {
                            font-size: 13px;
                            flex: 1;
                        }
                        .menu-badge {
                            margin-left: auto;
                            margin-right: 8px;
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;

                            :deep(.el-badge__content) {
                                background-color: var(--el-color-primary);
                                border: none;
                                font-size: 9px;
                                height: 14px;
                                line-height: 14px;
                                padding: 0 4px;
                                min-width: 14px;
                                border-radius: 7px;
                                font-weight: 600;
                                color: #fff;
                                transform: none;
                                position: static;
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }

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
</style>
