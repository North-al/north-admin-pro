<script setup lang="ts">
    import { useThemeStore } from '../../store/modules/theme'
    import { useSettingsStore } from '../../store/modules/settings'
    import ContextMenu, { type ContextMenuItem } from '../../components/ContextMenu.vue'

    interface TagItem {
        name: string
        path: string
        title: string
        closable: boolean
        fixed: boolean
    }

    const route = useRoute()
    const router = useRouter()
    const themeStore = useThemeStore()
    const settingsStore = useSettingsStore()

    // 获取当前主题
    const currentTheme = computed(() => themeStore.computedTheme)

    // 标签页是否启用
    const tagsViewEnabled = computed(() => settingsStore.tagsViewEnabled)

    // 标签页列表
    const tags = ref<TagItem[]>([
        {
            name: 'Dashboard',
            path: '/dashboard',
            title: '首页',
            closable: false,
            fixed: true
        }
    ])

    // 当前激活的标签页
    const activeTag = computed(() => route.path)

    // 标签页容器引用
    const tagsContainerRef = ref<HTMLElement>()

    // 滚动相关状态
    const showScrollButtons = ref(false)
    const canScrollLeft = ref(false)
    const canScrollRight = ref(false)

    // 右键菜单相关
    const contextMenuVisible = ref(false)
    const contextMenuPosition = ref({ x: 0, y: 0 })
    const contextMenuTag = ref<TagItem | null>(null)

    // 右键菜单项
    const contextMenuItems = computed((): ContextMenuItem[] => {
        if (!contextMenuTag.value) return []

        return [
            {
                key: 'refresh',
                label: '刷新页面',
                icon: 'Refresh'
            },
            {
                key: 'fixed',
                label: contextMenuTag.value.fixed ? '取消固定' : '固定标签',
                icon: 'MoreFilled',
                disabled: !contextMenuTag.value.closable,
                divided: true
            },
            {
                key: 'close',
                label: '关闭标签',
                icon: 'Close',
                disabled: !contextMenuTag.value.closable
            },
            {
                key: 'close-others',
                label: '关闭其他',
                icon: 'CircleClose'
            },
            {
                key: 'close-left',
                label: '关闭左侧',
                icon: 'ArrowLeft'
            },
            {
                key: 'close-right',
                label: '关闭右侧',
                icon: 'ArrowRight'
            },
            {
                key: 'close-all',
                label: '关闭所有',
                icon: 'FolderDelete'
            }
        ]
    })

    // 添加标签页
    const addTag = (tag: TagItem) => {
        const existingTag = tags.value.find(t => t.path === tag.path)
        if (!existingTag) {
            tags.value.push(tag)
        }
        // 滚动到新添加的标签页
        nextTick(() => {
            updateScrollButtons()
            scrollToActiveTag()
        })
    }

    // 关闭标签页
    const removeTag = (targetPath: string, force = false) => {
        const targetIndex = tags.value.findIndex(tag => tag.path === targetPath)
        if (targetIndex === -1) return

        const targetTag = tags.value[targetIndex]
        if (!targetTag.closable && !force) return

        // 如果关闭的是当前激活的标签页，需要切换到其他标签页
        if (targetPath === activeTag.value) {
            const nextTag = tags.value[targetIndex + 1] || tags.value[targetIndex - 1]
            if (nextTag) {
                router.push(nextTag.path)
            }
        }

        tags.value.splice(targetIndex, 1)

        nextTick(() => {
            updateScrollButtons()
        })
    }

    // 刷新页面
    const refreshPage = (targetPath?: string) => {
        if (targetPath && targetPath !== activeTag.value) {
            router.push(targetPath).then(() => {
                setTimeout(() => {
                    window.location.reload()
                }, 100)
            })
        } else {
            window.location.reload()
        }
    }

    // 固定/取消固定标签页
    const toggleFixedTag = (targetPath: string) => {
        const tag = tags.value.find(t => t.path === targetPath)
        if (tag) {
            tag.fixed = !tag.fixed
        }
    }

    // 关闭其他标签页
    const closeOthers = (targetPath: string) => {
        tags.value = tags.value.filter(tag => tag.path === targetPath || !tag.closable || tag.fixed)
        if (activeTag.value !== targetPath) {
            router.push(targetPath)
        }
        nextTick(() => {
            updateScrollButtons()
        })
    }

    // 关闭所有可关闭的标签页
    const closeAll = () => {
        tags.value = tags.value.filter(tag => !tag.closable || tag.fixed)
        router.push('/dashboard')
        nextTick(() => {
            updateScrollButtons()
        })
    }

    // 关闭左侧标签页
    const closeLeft = (targetPath: string) => {
        const targetIndex = tags.value.findIndex(tag => tag.path === targetPath)
        if (targetIndex === -1) return

        const leftTags = tags.value.slice(0, targetIndex)
        leftTags.forEach(tag => {
            if (tag.closable && !tag.fixed) {
                removeTag(tag.path, true)
            }
        })
    }

    // 关闭右侧标签页
    const closeRight = (targetPath: string) => {
        const targetIndex = tags.value.findIndex(tag => tag.path === targetPath)
        if (targetIndex === -1) return

        const rightTags = tags.value.slice(targetIndex + 1)
        rightTags.forEach(tag => {
            if (tag.closable && !tag.fixed) {
                removeTag(tag.path, true)
            }
        })
    }

    // 更新滚动按钮状态
    const updateScrollButtons = () => {
        if (!tagsContainerRef.value) return

        const container = tagsContainerRef.value
        const { scrollLeft, scrollWidth, clientWidth } = container

        showScrollButtons.value = scrollWidth > clientWidth
        canScrollLeft.value = scrollLeft > 0
        canScrollRight.value = scrollLeft < scrollWidth - clientWidth
    }

    // 滚动到激活的标签页
    const scrollToActiveTag = () => {
        if (!tagsContainerRef.value) return

        const activeTagEl = tagsContainerRef.value.querySelector('.tag-item.active') as HTMLElement
        if (activeTagEl) {
            const containerWidth = tagsContainerRef.value.clientWidth
            const tagLeft = activeTagEl.offsetLeft
            const tagWidth = activeTagEl.offsetWidth
            const scrollLeft = tagsContainerRef.value.scrollLeft

            if (tagLeft < scrollLeft) {
                tagsContainerRef.value.scrollLeft = tagLeft - 20
            } else if (tagLeft + tagWidth > scrollLeft + containerWidth) {
                tagsContainerRef.value.scrollLeft = tagLeft + tagWidth - containerWidth + 20
            }
        }
    }

    // 左滚动
    const scrollToLeft = () => {
        if (!tagsContainerRef.value) return
        tagsContainerRef.value.scrollLeft -= 200
    }

    // 右滚动
    const scrollToRight = () => {
        if (!tagsContainerRef.value) return
        tagsContainerRef.value.scrollLeft += 200
    }

    // 标签页点击事件
    const handleTagClick = (tag: TagItem) => {
        if (tag.path !== activeTag.value) {
            router.push(tag.path)
        }
    }

    // 右键菜单事件
    const handleContextMenu = (e: MouseEvent, tag: TagItem) => {
        e.preventDefault()
        contextMenuTag.value = tag
        contextMenuPosition.value = { x: e.clientX, y: e.clientY }
        contextMenuVisible.value = true
    }

    // 右键菜单操作
    const handleContextMenuCommand = (command: string) => {
        if (!contextMenuTag.value) return

        const targetPath = contextMenuTag.value.path

        switch (command) {
            case 'refresh':
                refreshPage(targetPath)
                break
            case 'close':
                removeTag(targetPath)
                break
            case 'close-others':
                closeOthers(targetPath)
                break
            case 'close-left':
                closeLeft(targetPath)
                break
            case 'close-right':
                closeRight(targetPath)
                break
            case 'close-all':
                closeAll()
                break
            case 'fixed':
                toggleFixedTag(targetPath)
                break
        }
    }

    // 关闭右键菜单
    const handleContextMenuClose = () => {
        contextMenuVisible.value = false
        contextMenuTag.value = null
    }

    // 监听路由变化，添加新标签页
    watch(
        () => route,
        newRoute => {
            if (newRoute.path && newRoute.meta?.title) {
                addTag({
                    name: (newRoute.name as string) || newRoute.path,
                    path: newRoute.path,
                    title: newRoute.meta.title as string,
                    closable: newRoute.path !== '/dashboard',
                    fixed: newRoute.path === '/dashboard'
                })
            }
        },
        { immediate: true, deep: true }
    )

    // 监听激活标签页变化
    watch(
        () => activeTag.value,
        () => {
            nextTick(() => {
                scrollToActiveTag()
            })
        }
    )

    // 监听容器尺寸变化
    onMounted(() => {
        if (tagsContainerRef.value) {
            const resizeObserver = new ResizeObserver(() => {
                updateScrollButtons()
            })
            resizeObserver.observe(tagsContainerRef.value)

            // 监听滚动事件
            tagsContainerRef.value.addEventListener('scroll', updateScrollButtons)

            updateScrollButtons()
        }

        // 监听点击事件，关闭右键菜单
        document.addEventListener('click', () => {
            contextMenuVisible.value = false
        })
    })
</script>

<template>
    <div v-if="tagsViewEnabled" class="tags-view" :data-theme="currentTheme">
        <!-- 滚动控制按钮 -->
        <div v-if="showScrollButtons" class="scroll-buttons">
            <el-button :disabled="!canScrollLeft" class="scroll-button scroll-left" size="small" @click="scrollToLeft">
                <el-icon><ArrowLeft /></el-icon>
            </el-button>
            <el-button
                :disabled="!canScrollRight"
                class="scroll-button scroll-right"
                size="small"
                @click="scrollToRight">
                <el-icon><ArrowRight /></el-icon>
            </el-button>
        </div>

        <!-- 标签页容器 -->
        <div ref="tagsContainerRef" class="tags-container" :class="{ 'has-scroll': showScrollButtons }">
            <div
                v-for="tag in tags"
                :key="tag.path"
                class="tag-item"
                :class="{
                    active: tag.path === activeTag,
                    fixed: tag.fixed,
                    closable: tag.closable
                }"
                @click="handleTagClick(tag)"
                @contextmenu="handleContextMenu($event, tag)">
                <!-- 固定标签图标 -->
                <el-icon v-if="tag.fixed && !tag.closable" class="fixed-icon">
                    <MoreFilled />
                </el-icon>

                <!-- 标签标题 -->
                <span class="tag-title">{{ tag.title }}</span>

                <!-- 关闭按钮 -->
                <el-icon v-if="tag.closable" class="close-icon" @click.stop="removeTag(tag.path)">
                    <Close />
                </el-icon>
            </div>
        </div>

        <!-- 右键菜单 -->
        <ContextMenu
            :visible="contextMenuVisible"
            :x="contextMenuPosition.x"
            :y="contextMenuPosition.y"
            :items="contextMenuItems"
            @command="handleContextMenuCommand"
            @close="handleContextMenuClose" />
    </div>
</template>

<style lang="scss" scoped>
    .tags-view {
        position: relative;
        height: 40px;
        background: var(--tags-bg-color);
        border-bottom: 1px solid var(--tags-border-color);
        display: flex;
        align-items: center;
        transition: all 0.3s ease;

        .scroll-buttons {
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            display: flex;
            align-items: center;
            background: var(--tags-bg-color);
            border-left: 1px solid var(--tags-border-color);
            z-index: 10;
            padding: 0 6px;

            .scroll-button {
                width: 24px;
                height: 24px;
                margin: 0 1px;
                border: 1px solid var(--tags-border-color);
                background: var(--tags-item-bg);
                color: var(--app-text-color);
                transition: all 0.3s ease;
                border-radius: 4px;

                &:hover:not(:disabled) {
                    background: var(--tags-item-hover-bg);
                    color: var(--el-color-primary);
                    border-color: var(--el-color-primary-light-8);
                }

                &:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
            }
        }

        .tags-container {
            flex: 1;
            height: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            display: flex;
            align-items: center;
            padding: 0 12px;
            transition: all 0.3s ease;

            &.has-scroll {
                padding-right: 65px;
            }

            // 隐藏滚动条
            &::-webkit-scrollbar {
                display: none;
            }

            .tag-item {
                position: relative;
                display: flex;
                align-items: center;
                height: 28px;
                padding: 0 10px;
                margin-right: 6px;
                background: var(--tags-item-bg);
                color: var(--app-text-color);
                border: 1px solid var(--tags-border-color);
                border-radius: 4px;
                cursor: pointer;
                user-select: none;
                white-space: nowrap;
                font-size: 12px;
                font-weight: 400;
                transition: all 0.2s ease;
                min-width: 60px;

                &:hover {
                    background: var(--tags-item-hover-bg);
                    color: var(--el-color-primary);
                    border-color: var(--el-color-primary-light-8);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
                }

                &.active {
                    background: var(--tags-item-active-bg);
                    color: var(--tags-item-active-color);
                    border-color: var(--el-color-primary);
                    box-shadow: 0 2px 6px rgba(24, 144, 255, 0.15);
                }

                &.fixed {
                    .fixed-icon {
                        color: var(--el-color-warning);
                        margin-right: 4px;
                        font-size: 10px;
                        opacity: 0.8;
                    }
                }

                .tag-title {
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 100px;
                    font-weight: 400;
                }

                .close-icon {
                    margin-left: 4px;
                    padding: 2px;
                    border-radius: 50%;
                    font-size: 10px;
                    opacity: 0.6;
                    transition: all 0.2s ease;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &:hover {
                        opacity: 1;
                        background: rgba(255, 255, 255, 0.15);
                        color: var(--el-color-danger);
                    }
                }

                &:not(.closable) {
                    .tag-title {
                        max-width: 120px;
                    }
                }

                // 活跃状态下的特殊样式
                &.active {
                    .close-icon:hover {
                        background: rgba(255, 255, 255, 0.2);
                    }
                }
            }
        }
    }
</style>
