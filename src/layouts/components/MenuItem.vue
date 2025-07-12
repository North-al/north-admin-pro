<script setup lang="tsx">
    import { type MenuItem } from '~/router/helper/menuHelper'

    interface Props {
        item: MenuItem
        collapsed: boolean
    }

    const props = defineProps<Props>()
    defineEmits<{
        menuClick: [path: string]
    }>()

    const renderIconItem = (item: MenuItem) => {
        return (
            <>
                {item.icon && <el-icon class='menu-icon'>{h(resolveComponent(item.icon))}</el-icon>}
                <span class='menu-title'>{item.title}</span>
            </>
        )
    }

    const renderBadgeMenuItem = (item: MenuItem) => {
        if (props.collapsed) {
            if (item.badge && item.badge.trim()) {
                return (
                    // 有徽记并且折叠
                    <div class='menu-badge-dot-container'>
                        {renderIconItem(item)}
                        <div class={'menu-badge-dot'}></div>
                        {/* <el-badge is-dot class='menu-badge'></el-badge> */}
                    </div>
                )
            } else {
                return <>{renderIconItem(item)}</>
            }
        } else {
            return (
                <>
                    {renderIconItem(item)}
                    {item.badge && item.badge.trim() && <el-badge value={item.badge} class='menu-badge' max={99} />}
                </>
            )
        }
    }
</script>

<template>
    <!-- 有子菜单的情况 -->
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path" class="menu-sub-menu">
        <template #title>
            <component :is="renderBadgeMenuItem(item)"></component>
        </template>

        <MenuItem
            v-for="child in item.children"
            :key="child.path"
            :item="child"
            :collapsed="collapsed"
            @menu-click="$emit('menuClick', $event)" />
    </el-sub-menu>

    <!-- 没有子菜单的情况 -->
    <el-menu-item v-else :index="item.path" class="menu-item" @click="$emit('menuClick', item.path)">
        <component :is="renderIconItem(item)"></component>
        <el-badge v-if="item.badge && item.badge.trim()" :value="item.badge" class="menu-badge" :max="99" />
    </el-menu-item>
</template>

<style lang="scss" scoped>
    .menu-badge {
        display: flex !important;
    }
    .menu-badge-dot-container {
        position: relative;
        width: 100%;
    }

    .menu-badge-dot {
        position: absolute;
        top: 30%;
        transform: translateY(-50%);
        right: 80%;
        width: 8px;
        height: 8px;
        background-color: var(--el-color-danger);
        border-radius: 50%;
    }
</style>
