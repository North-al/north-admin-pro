<script setup lang="ts">
    import { type MenuItem } from '~/router/helper/menuHelper'

    interface Props {
        item: MenuItem
    }

    defineProps<Props>()
    defineEmits<{
        menuClick: [path: string]
    }>()

    // 图标组件映射
    const getIconComponent = (iconName?: string) => {
        if (!iconName) return 'Document'
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
            Menu: 'Menu',
            Checked: 'Checked',
            Warning: 'Warning',
            Tools: 'Tools',
            QuestionFilled: 'QuestionFilled',
            Notebook: 'Notebook',
            dashboard: 'Odometer',
            workplace: 'Monitor'
        }
        return iconMap[iconName] || 'Document'
    }
</script>

<template>
    <!-- 有子菜单的情况 -->
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path" class="menu-sub-menu">
        <template #title>
            <el-icon class="menu-icon">
                <component :is="getIconComponent(item.icon)" />
            </el-icon>
            <span class="menu-title">{{ item.title }}</span>
            <el-badge v-if="item.badge && item.badge.trim()" :value="item.badge" badge-class="menu-badge" :max="99" />
        </template>

        <MenuItem
            v-for="child in item.children"
            :key="child.path"
            :item="child"
            @menu-click="$emit('menuClick', $event)" />
    </el-sub-menu>

    <!-- 没有子菜单的情况 -->
    <el-menu-item v-else :index="item.path" class="menu-item" @click="$emit('menuClick', item.path)">
        <el-icon class="menu-icon">
            <component :is="getIconComponent(item.icon)" />
        </el-icon>
        <span class="menu-title">{{ item.title }}</span>
        <el-badge
            v-if="item.badge && item.badge.trim()"
            :offset="[0, -20]"
            :value="item.badge"
            badge-class="menu-badge"
            :max="99" />
    </el-menu-item>
</template>

<style lang="scss" scoped>
    :deep(.el-badge) {
        display: flex;
        align-items: center;
    }
</style>
