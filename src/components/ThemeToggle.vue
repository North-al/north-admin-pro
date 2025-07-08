<script setup lang="ts">
    import { useTheme } from '../hooks/useTheme'

    const { currentTheme, setTheme, themeOptions } = useTheme()

    // 获取主题图标
    const getThemeIcon = (theme: string) => {
        switch (theme) {
            case 'dark':
                return 'Moon'
            case 'light':
                return 'Sunny'
            case 'mixed':
                return 'PartlyCloudy'
            case 'auto':
                return 'Monitor'
            default:
                return 'Moon'
        }
    }

    // 获取当前图标
    const currentIcon = computed(() => {
        return getThemeIcon(currentTheme.value)
    })
</script>

<template>
    <el-dropdown trigger="click" @command="setTheme">
        <el-button text class="theme-toggle">
            <el-icon size="18">
                <component :is="currentIcon" />
            </el-icon>
        </el-button>

        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    v-for="theme in themeOptions"
                    :key="theme.value"
                    :command="theme.value"
                    :class="{ 'is-active': currentTheme === theme.value }">
                    <el-icon style="margin-right: 8px">
                        <component :is="getThemeIcon(theme.value)" />
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
