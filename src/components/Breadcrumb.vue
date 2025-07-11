<script setup lang="ts">
    import type { BreadcrumbItem } from '~/utils/breadcrumb'

    interface Props {
        items: BreadcrumbItem[]
    }

    const props = defineProps<Props>()
    const router = useRouter()

    // 处理面包屑点击
    const handleClick = (item: BreadcrumbItem, index: number, items: BreadcrumbItem[]) => {
        // 如果不是最后一项，则可以点击跳转
        if (index < items.length - 1) {
            router.push(item.path)
        }
    }

    const shouldShow = computed(() => props.items.length > 0)
</script>

<template>
    <div v-if="shouldShow" class="breadcrumb-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item, index) in items"
                :key="index"
                :to="index < items.length - 1 ? item.path : undefined"
                :class="{ 'is-current': index === items.length - 1 }"
                @click="handleClick(item, index, items)">
                {{ item.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<style lang="scss" scoped>
    .breadcrumb-container {
        display: flex;
        align-items: center;
        margin-left: 12px;
        padding-left: 12px;
        border-left: 1px solid var(--app-border-color);
        transition: all 0.3s ease;

        :deep(.el-breadcrumb) {
            font-size: 14px;
            line-height: 1;

            .el-breadcrumb__item {
                .el-breadcrumb__inner {
                    color: var(--app-text-secondary);
                    font-weight: 400;
                    transition: color 0.3s ease;

                    &:hover {
                        color: var(--el-color-primary);
                    }

                    &.is-link {
                        cursor: pointer;
                    }
                }

                &:last-child .el-breadcrumb__inner {
                    color: var(--app-text-color);
                    font-weight: 500;
                    cursor: default;

                    &:hover {
                        color: var(--app-text-color);
                    }
                }

                .el-breadcrumb__separator {
                    color: var(--app-text-placeholder);
                    margin: 0 8px;
                }
            }
        }
    }

    // 响应式样式
    @media (max-width: 600px) {
        .breadcrumb-container {
            display: none;
        }
    }
</style>
