<template>
    <div class="examples-index">
        <div class="examples-header">
            <h1>开发示例</h1>
            <p>项目中的组件、Hook和工具使用示例与文档</p>
        </div>

        <div class="examples-grid">
            <div class="example-card" @click="navigateTo('/examples/components')">
                <div class="card-icon">
                    <el-icon><Grid /></el-icon>
                </div>
                <div class="card-content">
                    <h3>组件示例</h3>
                    <p>查看项目中的自定义组件使用示例和API文档</p>
                    <div class="card-features">
                        <span class="feature-tag">面包屑组件</span>
                        <span class="feature-tag">右键菜单</span>
                        <span class="feature-tag">更多组件...</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="example-card" @click="navigateTo('/examples/hooks')">
                <div class="card-icon">
                    <el-icon><Connection /></el-icon>
                </div>
                <div class="card-content">
                    <h3>功能示例</h3>
                    <p>查看项目中的自定义Hooks和工具函数使用示例</p>
                    <div class="card-features">
                        <span class="feature-tag">鼠标位置</span>
                        <span class="feature-tag">右键菜单Hook</span>
                        <span class="feature-tag">更多功能...</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>
        </div>

        <div class="examples-info">
            <div class="info-section">
                <h2>关于示例</h2>
                <p>
                    这些示例展示了项目中自定义组件、Hooks和工具函数的使用方法。
                    每个示例都包含了详细的代码演示、API文档和最佳实践建议。
                </p>
            </div>

            <div class="info-section">
                <h2>开发规范</h2>
                <ul>
                    <li>组件使用Vue 3 Composition API和TypeScript</li>
                    <li>Hooks遵循Vue 3组合式函数规范</li>
                    <li>状态管理使用Pinia setup语法</li>
                    <li>样式使用SCSS和CSS变量</li>
                    <li>支持自动导入和别名路径</li>
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
.examples-index {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;

    .examples-header {
        text-align: center;
        margin-bottom: 48px;

        h1 {
            font-size: 36px;
            color: var(--app-text-color);
            margin-bottom: 12px;
            font-weight: 600;
        }

        p {
            font-size: 18px;
            color: var(--app-text-secondary);
            line-height: 1.6;
        }
    }

    .examples-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 24px;
        margin-bottom: 48px;

        .example-card {
            background: var(--app-bg-color);
            border: 1px solid var(--app-border-color);
            border-radius: 12px;
            padding: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 16px;

            &:hover {
                border-color: var(--el-color-primary);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                transform: translateY(-2px);
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
                    font-size: 18px;
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

                .card-features {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;

                    .feature-tag {
                        background: var(--el-color-primary-light-9);
                        color: var(--el-color-primary);
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                        font-weight: 500;
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

            &:hover .card-arrow {
                color: var(--el-color-primary);
                transform: translateX(4px);
            }
        }
    }

    .examples-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 32px;

        .info-section {
            h2 {
                font-size: 20px;
                color: var(--app-text-color);
                margin-bottom: 16px;
                font-weight: 600;
            }

            p {
                color: var(--app-text-secondary);
                line-height: 1.6;
                margin-bottom: 16px;
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
    .examples-index {
        padding: 16px;

        .examples-grid {
            grid-template-columns: 1fr;
            gap: 16px;

            .example-card {
                padding: 20px;
            }
        }

        .examples-info {
            grid-template-columns: 1fr;
            gap: 24px;
        }
    }
}
</style>
