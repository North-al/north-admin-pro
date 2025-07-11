<template>
    <div class="components-index">
        <div class="page-header">
            <h1>组件示例</h1>
            <p>项目中的自定义组件使用示例和API文档</p>
        </div>

        <div class="components-grid">
            <div class="component-card" @click="navigateTo('/examples/components/breadcrumb')">
                <div class="card-icon">
                    <el-icon><Guide /></el-icon>
                </div>
                <div class="card-content">
                    <h3>面包屑组件</h3>
                    <p>用于显示当前页面路径的导航组件</p>
                    <div class="card-tags">
                        <span class="tag">导航</span>
                        <span class="tag">路径</span>
                        <span class="tag">响应式</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="component-card" @click="navigateTo('/examples/components/context-menu')">
                <div class="card-icon">
                    <el-icon><Menu /></el-icon>
                </div>
                <div class="card-content">
                    <h3>右键菜单组件</h3>
                    <p>可定制的右键上下文菜单组件</p>
                    <div class="card-tags">
                        <span class="tag">菜单</span>
                        <span class="tag">交互</span>
                        <span class="tag">可定制</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="component-card disabled">
                <div class="card-icon">
                    <el-icon><Bell /></el-icon>
                </div>
                <div class="card-content">
                    <h3>通知组件</h3>
                    <p>消息通知和提醒组件（开发中）</p>
                    <div class="card-tags">
                        <span class="tag">通知</span>
                        <span class="tag">消息</span>
                        <span class="tag">开发中</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="component-card disabled">
                <div class="card-icon">
                    <el-icon><Loading /></el-icon>
                </div>
                <div class="card-content">
                    <h3>加载组件</h3>
                    <p>各种加载状态的展示组件（开发中）</p>
                    <div class="card-tags">
                        <span class="tag">加载</span>
                        <span class="tag">状态</span>
                        <span class="tag">开发中</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>
        </div>

        <div class="components-info">
            <div class="info-card">
                <h2>组件开发规范</h2>
                <ul>
                    <li>使用Vue 3 Composition API</li>
                    <li>支持TypeScript类型定义</li>
                    <li>遵循Element Plus设计规范</li>
                    <li>支持主题切换和响应式设计</li>
                    <li>提供完整的Props和Events文档</li>
                </ul>
            </div>

            <div class="info-card">
                <h2>使用指南</h2>
                <ul>
                    <li>点击组件卡片查看详细示例</li>
                    <li>每个组件都包含使用示例和API文档</li>
                    <li>可以直接复制代码到项目中使用</li>
                    <li>支持在线预览和交互测试</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()

const navigateTo = (path: string) => {
    router.push(path)
}
</script>

<style lang="scss" scoped>
.components-index {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;

    .page-header {
        text-align: center;
        margin-bottom: 48px;

        h1 {
            font-size: 32px;
            color: var(--app-text-color);
            margin-bottom: 8px;
            font-weight: 600;
        }

        p {
            font-size: 16px;
            color: var(--app-text-secondary);
            line-height: 1.6;
        }
    }

    .components-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-bottom: 48px;

        .component-card {
            background: var(--app-bg-color);
            border: 1px solid var(--app-border-color);
            border-radius: 12px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 16px;

            &:hover:not(.disabled) {
                border-color: var(--el-color-primary);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                transform: translateY(-2px);
            }

            &.disabled {
                opacity: 0.6;
                cursor: not-allowed;

                .card-content h3::after {
                    content: ' (敬请期待)';
                    font-size: 12px;
                    color: var(--app-text-placeholder);
                    font-weight: normal;
                }
            }

            .card-icon {
                width: 48px;
                height: 48px;
                background: var(--el-color-primary-light-9);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;

                .el-icon {
                    font-size: 24px;
                    color: var(--el-color-primary);
                }
            }

            .card-content {
                flex: 1;

                h3 {
                    font-size: 16px;
                    color: var(--app-text-color);
                    margin-bottom: 8px;
                    font-weight: 600;
                }

                p {
                    font-size: 14px;
                    color: var(--app-text-secondary);
                    line-height: 1.5;
                    margin-bottom: 12px;
                }

                .card-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;

                    .tag {
                        background: var(--app-bg-secondary);
                        color: var(--app-text-secondary);
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                        border: 1px solid var(--app-border-color);
                    }
                }
            }

            .card-arrow {
                flex-shrink: 0;
                color: var(--app-text-placeholder);
                transition: all 0.3s ease;

                .el-icon {
                    font-size: 16px;
                }
            }

            &:hover:not(.disabled) .card-arrow {
                color: var(--el-color-primary);
                transform: translateX(4px);
            }
        }
    }

    .components-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;

        .info-card {
            background: var(--app-bg-color);
            border: 1px solid var(--app-border-color);
            border-radius: 8px;
            padding: 24px;

            h2 {
                font-size: 18px;
                color: var(--app-text-color);
                margin-bottom: 16px;
                font-weight: 600;
            }

            ul {
                color: var(--app-text-secondary);
                line-height: 1.6;
                padding-left: 20px;

                li {
                    margin-bottom: 8px;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .components-index {
        padding: 16px;

        .components-grid {
            grid-template-columns: 1fr;
            gap: 16px;
        }

        .components-info {
            grid-template-columns: 1fr;
            gap: 16px;
        }
    }
}
</style>
