<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    // 当前主题
    const currentTheme = ref('dark')

    // 主题选项
    const themes = [
        { label: '深色主题', value: 'dark' },
        { label: '浅色主题', value: 'light' }
    ]

    // 设置主题
    const setTheme = (theme: string) => {
        currentTheme.value = theme
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)

        // 触发自定义事件通知其他组件
        const event = new CustomEvent('theme-change', { detail: theme })
        window.dispatchEvent(event)
    }

    // 初始化主题
    onMounted(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark'
        setTheme(savedTheme)
    })

    defineExpose({
        currentTheme,
        setTheme
    })
</script>

<template>
    <el-dropdown trigger="click" @command="setTheme">
        <el-button type="text" class="theme-toggle">
            <el-icon size="18">
                <component :is="currentTheme === 'dark' ? 'moon' : 'sunny'" />
            </el-icon>
        </el-button>

        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    v-for="theme in themes"
                    :key="theme.value"
                    :command="theme.value"
                    :class="{ 'is-active': currentTheme === theme.value }">
                    <el-icon style="margin-right: 8px">
                        <component :is="theme.value === 'dark' ? 'moon' : 'sunny'" />
                    </el-icon>
                    {{ theme.label }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style lang="scss" scoped>
    .theme-toggle {
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    :deep(.el-dropdown-menu__item.is-active) {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
    }
</style>
