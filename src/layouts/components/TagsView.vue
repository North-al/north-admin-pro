<script setup lang="ts">
    import { useSettingsStore, useTagsViewStore, type TagItem } from '~/store/modules'
    import ContextMenu, { type ContextMenuItem } from '~/components/ContextMenu.vue'

    const route = useRoute()
    const router = useRouter()
    const settingsStore = useSettingsStore()
    const tagsViewStore = useTagsViewStore()

    // 标签页是否启用
    const tagsViewEnabled = computed(() => settingsStore.tagsViewEnabled)

    // 标签页列表
    const tags = computed(() => tagsViewStore.tags)

    // 当前激活的标签页
    const activeTag = computed(() => route.path)

    // 标签页容器引用
    const tagsContainerRef = ref<HTMLElement>()

    // 滚动相关状态
    const showScrollButtons = ref(false)
    const canScrollLeft = ref(false)
    const canScrollRight = ref(false)
    const containerWidth = ref(0)

    // 右键菜单相关
    const contextMenuVisible = ref(false)
    const contextMenuPosition = ref({ x: 0, y: 0 })
    const contextMenuTag = ref<TagItem | null>(null)

    // 右键菜单项
    const contextMenuItems = computed((): ContextMenuItem[] => {
        if (!contextMenuTag.value) return []

        const items = [
            { key: 'refresh', label: '刷新页面', icon: 'Refresh' },
            {
                key: 'fixed',
                label: contextMenuTag.value.fixed ? '取消固定' : '固定标签',
                icon: 'Lock',
                disabled: !contextMenuTag.value.closable,
                divided: true
            },
            { key: 'close', label: '关闭标签', icon: 'Close', disabled: !contextMenuTag.value.closable },
            { key: 'close-others', label: '关闭其他', icon: 'CircleClose' },
            { key: 'close-left', label: '关闭左侧', icon: 'ArrowLeft' },
            { key: 'close-right', label: '关闭右侧', icon: 'ArrowRight' },
            { key: 'close-all', label: '关闭所有', icon: 'FolderDelete' }
        ]

        return items
    })

    // 添加标签页
    const addTag = (tag: TagItem) => {
        tagsViewStore.addTag(tag)
        // 滚动到新添加的标签页
        nextTick(() => {
            updateScrollButtons()
            scrollToActiveTag()
        })
    }

    // 关闭标签页
    const removeTag = (targetPath: string) => {
        // 如果关闭的是当前激活的标签页，需要切换到其他标签页
        if (targetPath === activeTag.value) {
            const currentIndex = tags.value.findIndex(tag => tag.path === targetPath)
            const nextTag = tags.value[currentIndex + 1] || tags.value[currentIndex - 1]
            if (nextTag) {
                router.push(nextTag.path)
            }
        }

        tagsViewStore.removeTag(targetPath)

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
        tagsViewStore.toggleFixed(targetPath)
    }

    // 关闭其他标签页
    const closeOthers = (targetPath: string) => {
        tagsViewStore.closeOthers(targetPath)
        if (activeTag.value !== targetPath) {
            router.push(targetPath)
        }
        nextTick(() => {
            updateScrollButtons()
        })
    }

    // 关闭所有可关闭的标签页
    const closeAll = () => {
        tagsViewStore.closeAll()
        // 如果还有标签，跳转到第一个，否则跳转到首页
        if (tags.value.length > 0) {
            router.push(tags.value[0].path)
        } else {
            router.push('/')
        }
        nextTick(() => {
            updateScrollButtons()
        })
    }

    // 关闭左侧标签页
    const closeLeft = (targetPath: string) => {
        // 如果当前激活的标签在要删除的列表中，需要切换
        const targetIndex = tags.value.findIndex(tag => tag.path === targetPath)
        if (targetIndex > 0) {
            const leftTags = tags.value.slice(0, targetIndex)
            const pathsToRemove = leftTags.filter(tag => tag.closable && !tag.fixed).map(tag => tag.path)

            if (pathsToRemove.includes(activeTag.value)) {
                router.push(targetPath)
            }
        }

        tagsViewStore.closeLeft(targetPath)

        nextTick(() => {
            updateScrollButtons()
        })
    }

    // 关闭右侧标签页
    const closeRight = (targetPath: string) => {
        // 如果当前激活的标签在要删除的列表中，需要切换
        const targetIndex = tags.value.findIndex(tag => tag.path === targetPath)
        if (targetIndex < tags.value.length - 1) {
            const rightTags = tags.value.slice(targetIndex + 1)
            const pathsToRemove = rightTags.filter(tag => tag.closable && !tag.fixed).map(tag => tag.path)

            if (pathsToRemove.includes(activeTag.value)) {
                router.push(targetPath)
            }
        }

        tagsViewStore.closeRight(targetPath)

        nextTick(() => {
            updateScrollButtons()
        })
    }

    // 更新滚动按钮状态
    const updateScrollButtons = () => {
        if (!tagsContainerRef.value) return

        const container = tagsContainerRef.value
        const { scrollLeft, scrollWidth, clientWidth } = container

        // 更新容器宽度
        containerWidth.value = clientWidth

        // 当内容宽度超过容器宽度时显示滚动按钮
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
                    closable: newRoute.meta?.closable !== false, // 默认可关闭，除非明确设置为false
                    fixed: newRoute.meta?.fixed === true, // 默认不固定，除非明确设置为true
                    icon: newRoute.meta?.icon as string
                })
            } else if (newRoute.path) {
                // 如果路由没有title，使用路径作为标题（临时测试）
                addTag({
                    name: (newRoute.name as string) || newRoute.path,
                    path: newRoute.path,
                    title: newRoute.path,
                    closable: true,
                    fixed: false,
                    icon: newRoute.meta?.icon as string
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
    <div v-if="tagsViewEnabled && tags.length > 0" class="tags-view">
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
                <el-icon v-if="tag.fixed" class="fixed-icon">
                    <Lock />
                </el-icon>

                <!-- 标签图标 -->
                <el-icon v-else-if="tag.icon" class="tag-icon">
                    <component :is="tag.icon" />
                </el-icon>

                <!-- 标签标题 -->
                <span class="tag-title" :class="{ 'has-icon': tag.fixed || tag.icon }">{{ tag.title }}</span>

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
        // border-bottom: 1px solid var(--tags-border-color);
        display: flex;
        align-items: center;

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
            padding: 0 4px;

            .scroll-button {
                width: 24px;
                height: 24px;
                margin: 0 1px;
                border: 1px solid var(--tags-border-color);
                background: var(--tags-item-bg);
                border-radius: 4px;

                &:hover:not(:disabled) {
                    background: var(--tags-item-hover-bg);
                    color: var(--el-color-primary);
                }

                &:disabled {
                    opacity: 0.3;
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

            &.has-scroll {
                padding-right: 58px;
            }

            &::-webkit-scrollbar {
                display: none;
            }

            .tag-item {
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

                &:hover {
                    color: var(--el-color-primary);

                    .tag-icon,
                    .fixed-icon {
                        color: var(--el-color-primary);
                    }
                }

                &.active {
                    color: var(--el-color-primary);
                    border-color: var(--el-color-primary);

                    .tag-icon,
                    .fixed-icon {
                        color: var(--el-color-primary);
                    }
                }

                .fixed-icon {
                    color: var(--el-color-warning);
                    margin-right: 4px;
                    font-size: 12px;
                    opacity: 0.8;
                    transition: color 0.2s ease;
                }

                .tag-icon {
                    color: var(--app-text-color);
                    margin-right: 4px;
                    font-size: 12px;
                    opacity: 0.9;
                    transition: color 0.2s ease;
                }

                .tag-title {
                    white-space: nowrap;
                }

                .close-icon {
                    margin-left: 6px;
                    padding: 3px;
                    border-radius: 50%;
                    font-size: 12px;
                    opacity: 0.7;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 18px;
                    height: 18px;

                    &:hover {
                        opacity: 1;
                        background: rgba(255, 255, 255, 0.2);
                        color: var(--el-color-danger);
                        transform: scale(1.1);
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .tags-view {
            .scroll-buttons {
                padding: 0 3px;

                .scroll-button {
                    width: 20px;
                    height: 20px;
                    margin: 0;
                }
            }

            .tags-container {
                &.has-scroll {
                    padding-right: 50px;
                }

                .tag-item {
                    .close-icon {
                        width: 16px;
                        height: 16px;
                        font-size: 10px;
                    }
                }
            }
        }
    }

    @media (max-width: 480px) {
        .tags-view {
            .scroll-buttons {
                padding: 0 2px;

                .scroll-button {
                    width: 18px;
                    height: 18px;
                }
            }

            .tags-container {
                &.has-scroll {
                    padding-right: 44px;
                }

                .tag-item {
                    .tag-title {
                        font-size: 11px;
                    }

                    .tag-icon,
                    .fixed-icon {
                        font-size: 10px;
                        margin-right: 2px;
                    }

                    .close-icon {
                        width: 14px;
                        height: 14px;
                        font-size: 9px;
                    }
                }
            }
        }
    }
</style>
