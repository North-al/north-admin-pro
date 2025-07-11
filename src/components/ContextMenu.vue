<script setup lang="ts">
    export interface ContextMenuItem {
        key: string
        label: string
        icon?: string
        disabled?: boolean
        divided?: boolean
    }

    interface Props {
        visible: boolean
        x: number
        y: number
        items: ContextMenuItem[]
    }

    const props = defineProps<Props>()

    const emit = defineEmits<{
        command: [key: string]
        close: []
    }>()

    const handleItemClick = (item: ContextMenuItem) => {
        if (item.disabled) return
        emit('command', item.key)
        emit('close')
    }

    // 点击外部关闭菜单
    const handleOutsideClick = () => {
        emit('close')
    }

    onMounted(() => {
        if (props.visible) {
            document.addEventListener('click', handleOutsideClick)
        }
    })

    onUnmounted(() => {
        document.removeEventListener('click', handleOutsideClick)
    })

    watch(
        () => props.visible,
        visible => {
            if (visible) {
                document.addEventListener('click', handleOutsideClick)
            } else {
                document.removeEventListener('click', handleOutsideClick)
            }
        }
    )
</script>

<template>
    <teleport to="body">
        <div
            v-if="visible"
            class="context-menu"
            :style="{
                left: x + 'px',
                top: y + 'px'
            }"
            @click.stop>
            <div
                v-for="item in items"
                :key="item.key"
                class="context-menu-item"
                :class="{
                    disabled: item.disabled,
                    divided: item.divided
                }"
                @click="handleItemClick(item)">
                <el-icon v-if="item.icon" class="menu-icon">
                    <component :is="item.icon" />
                </el-icon>
                <span class="menu-label">{{ item.label }}</span>
            </div>
        </div>
    </teleport>
</template>

<style lang="scss" scoped>
    .context-menu {
        position: fixed;
        z-index: 9999;
        background: var(--card-bg-color);
        border: 1px solid var(--card-border-color);
        box-shadow: var(--card-shadow);
        border-radius: 8px;
        padding: 8px 0;
        min-width: 140px;
        backdrop-filter: blur(8px);

        .context-menu-item {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            font-size: 13px;
            color: var(--app-text-color);
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: var(--app-border-color);
                opacity: 0;
                transition: opacity 0.2s ease;
            }

            &.divided::before {
                opacity: 1;
            }

            &:hover:not(.disabled) {
                background: var(--sidebar-hover-bg);
                color: var(--el-color-primary);
            }

            &.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .menu-icon {
                margin-right: 8px;
                font-size: 14px;
                flex-shrink: 0;
            }

            .menu-label {
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>
