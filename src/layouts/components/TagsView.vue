<script setup lang="ts">
    import { ref, computed, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { ElTabs, ElTabPane, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

    interface TagItem {
        name: string
        path: string
        title: string
        closable: boolean
    }

    const route = useRoute()
    const router = useRouter()

    // 标签页列表
    const tags = ref<TagItem[]>([
        {
            name: 'Dashboard',
            path: '/dashboard',
            title: '仪表板',
            closable: false // 首页不可关闭
        }
    ])

    // 当前激活的标签页
    const activeTag = computed({
        get: () => route.path,
        set: (path: string) => {
            router.push(path)
        }
    })

    // 添加标签页
    const addTag = (tag: TagItem) => {
        const existingTag = tags.value.find(t => t.path === tag.path)
        if (!existingTag) {
            tags.value.push(tag)
        }
    }

    // 关闭标签页
    const removeTag = (targetPath: string | number) => {
        const path = String(targetPath)
        const targetIndex = tags.value.findIndex(tag => tag.path === path)

        if (targetIndex === -1) return

        // 如果关闭的是当前激活的标签页，需要切换到其他标签页
        if (path === activeTag.value) {
            const nextTag = tags.value[targetIndex + 1] || tags.value[targetIndex - 1]
            if (nextTag) {
                router.push(nextTag.path)
            }
        }

        tags.value.splice(targetIndex, 1)
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
                    closable: newRoute.path !== '/dashboard'
                })
            }
        },
        { immediate: true, deep: true }
    )

    // 标签页点击事件
    const handleTabClick = (pane: any) => {
        router.push(pane.props.name)
    }

    // 右键菜单操作
    const handleContextMenu = (command: string, targetPath: string) => {
        switch (command) {
            case 'refresh':
                // 刷新当前页面
                location.reload()
                break
            case 'close':
                removeTag(targetPath)
                break
            case 'close-others':
                // 关闭其他标签页
                tags.value = tags.value.filter(tag => tag.path === targetPath || !tag.closable)
                if (activeTag.value !== targetPath) {
                    router.push(targetPath)
                }
                break
            case 'close-all':
                // 关闭所有可关闭的标签页
                tags.value = tags.value.filter(tag => !tag.closable)
                router.push('/dashboard')
                break
        }
    }
</script>

<template>
    <div class="tags-view" :data-theme="$attrs['data-theme']">
        <el-tabs v-model="activeTag" type="card" class="tags-tabs" @tab-click="handleTabClick" @tab-remove="removeTag">
            <el-tab-pane
                v-for="tag in tags"
                :key="tag.path"
                :label="tag.title"
                :name="tag.path"
                :closable="tag.closable">
                <template #label>
                    <el-dropdown
                        trigger="contextmenu"
                        @command="(command: string) => handleContextMenu(command, tag.path)">
                        <span class="tag-label">{{ tag.title }}</span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="refresh">
                                    <el-icon><component :is="'refresh'" /></el-icon>
                                    刷新页面
                                </el-dropdown-item>
                                <el-dropdown-item command="close" :disabled="!tag.closable">
                                    <el-icon><component :is="'close'" /></el-icon>
                                    关闭标签
                                </el-dropdown-item>
                                <el-dropdown-item command="close-others">
                                    <el-icon><component :is="'circle-close'" /></el-icon>
                                    关闭其他
                                </el-dropdown-item>
                                <el-dropdown-item command="close-all">
                                    <el-icon><component :is="'folder-delete'" /></el-icon>
                                    关闭所有
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="scss" scoped>
    /* 标签页样式已移至主题文件和全局样式 */
    .tag-label {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
</style>
