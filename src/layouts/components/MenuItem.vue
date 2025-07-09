<script setup lang="ts">
    import { type MenuItem } from '~/router/helper/menuHelper'

    interface Props {
        item: MenuItem
    }

    defineProps<Props>()
    defineEmits<{
        menuClick: [path: string]
    }>()
</script>

<template>
    <!-- 有子菜单的情况 -->
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path" class="menu-sub-menu">
        <template #title>
            <el-icon v-if="item.icon" class="menu-icon">
                <component :is="item.icon" />
            </el-icon>
            <span class="menu-title">{{ item.title }}</span>
            <el-badge v-if="item.badge && item.badge.trim()" :value="item.badge" class="menu-badge" :max="99" />
        </template>

        <MenuItem
            v-for="child in item.children"
            :key="child.path"
            :item="child"
            @menu-click="$emit('menuClick', $event)" />
    </el-sub-menu>

    <!-- 没有子菜单的情况 -->
    <el-menu-item v-else :index="item.path" class="menu-item" @click="$emit('menuClick', item.path)">
        <el-icon v-if="item.icon" class="menu-icon">
            <component :is="item.icon" />
        </el-icon>
        <span class="menu-title">{{ item.title }}</span>
        <el-badge v-if="item.badge && item.badge.trim()" :value="item.badge" class="menu-badge" :max="99" />
    </el-menu-item>
</template>

<style lang="scss" scoped>
    // 确保徽记正确显示
    .menu-badge {
        display: flex !important;
        align-items: center;
    }
</style>
