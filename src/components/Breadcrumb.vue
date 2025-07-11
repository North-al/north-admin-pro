<script setup lang="ts">
    import type { BreadcrumbItem } from '~/utils/breadcrumb'

    interface Props {
        items: BreadcrumbItem[]
    }

    const props = defineProps<Props>()
    const router = useRouter()

    // 容器引用
    const breadcrumbRef = ref<HTMLElement>()
    const containerWidth = ref(0)

    // 响应式状态
    const isSmallScreen = computed(() => containerWidth.value < 600)
    const isVerySmallScreen = computed(() => containerWidth.value < 400)

    // 处理面包屑点击
    const handleClick = (item: BreadcrumbItem, index: number, items: BreadcrumbItem[]) => {
        // 如果不是最后一项，则可以点击跳转
        if (index < items.length - 1) {
            router.push(item.path)
        }
    }

    // 判断是否显示面包屑
    const shouldShow = computed(() => {
        // 很小屏幕时直接隐藏
        if (isVerySmallScreen.value) return false
        // 有内容就显示
        return props.items.length > 0
    })

    // 监听容器尺寸变化
    onMounted(() => {
        if (breadcrumbRef.value) {
            const resizeObserver = new ResizeObserver(() => {
                if (breadcrumbRef.value) {
                    containerWidth.value = breadcrumbRef.value.clientWidth
                }
            })
            resizeObserver.observe(breadcrumbRef.value)

            // 初始化宽度
            containerWidth.value = breadcrumbRef.value.clientWidth
        }
    })
</script>

<template>
    <div v-if="shouldShow" ref="breadcrumbRef" class="breadcrumb-container" :class="{ 'small-screen': isSmallScreen }">
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

        &.small-screen {
            margin-left: 8px;
            padding-left: 8px;

            :deep(.el-breadcrumb) {
                font-size: 12px;

                .el-breadcrumb__item {
                    .el-breadcrumb__separator {
                        margin: 0 4px;
                    }
                }
            }
        }

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
            margin-left: 8px;
            padding-left: 8px;

            :deep(.el-breadcrumb) {
                font-size: 12px;

                .el-breadcrumb__item {
                    .el-breadcrumb__separator {
                        margin: 0 4px;
                    }
                }
            }
        }
    }
</style>
