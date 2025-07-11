<template>
    <div class="hooks-index">
        <div class="page-header">
            <h1>功能示例</h1>
            <p>项目中的自定义Hooks和工具函数使用示例</p>
        </div>

        <div class="hooks-grid">
            <div class="hook-card" @click="navigateTo('/examples/hooks/mouse')">
                <div class="card-icon">
                    <el-icon><Mouse /></el-icon>
                </div>
                <div class="card-content">
                    <h3>鼠标位置Hook</h3>
                    <p>获取和跟踪鼠标位置信息的Hook</p>
                    <div class="card-tags">
                        <span class="tag">鼠标事件</span>
                        <span class="tag">位置跟踪</span>
                        <span class="tag">响应式</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="hook-card" @click="navigateTo('/examples/hooks/context-menu')">
                <div class="card-icon">
                    <el-icon><Menu /></el-icon>
                </div>
                <div class="card-content">
                    <h3>右键菜单Hook</h3>
                    <p>管理右键菜单位置和状态的Hook</p>
                    <div class="card-tags">
                        <span class="tag">菜单管理</span>
                        <span class="tag">位置计算</span>
                        <span class="tag">边界检测</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="hook-card" @click="navigateTo('/examples/hooks/fullscreen')">
                <div class="card-icon">
                    <el-icon><FullScreen /></el-icon>
                </div>
                <div class="card-content">
                    <h3>全屏功能Hook</h3>
                    <p>提供全屏切换、状态检测等功能</p>
                    <div class="card-tags">
                        <span class="tag">全屏控制</span>
                        <span class="tag">状态管理</span>
                        <span class="tag">跨浏览器</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="hook-card disabled">
                <div class="card-icon">
                    <el-icon><Monitor /></el-icon>
                </div>
                <div class="card-content">
                    <h3>窗口尺寸Hook</h3>
                    <p>监听窗口尺寸变化的Hook（开发中）</p>
                    <div class="card-tags">
                        <span class="tag">窗口监听</span>
                        <span class="tag">尺寸变化</span>
                        <span class="tag">开发中</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="hook-card disabled">
                <div class="card-icon">
                    <el-icon><Clock /></el-icon>
                </div>
                <div class="card-content">
                    <h3>定时器Hook</h3>
                    <p>管理定时器和倒计时的Hook（开发中）</p>
                    <div class="card-tags">
                        <span class="tag">定时器</span>
                        <span class="tag">倒计时</span>
                        <span class="tag">开发中</span>
                    </div>
                </div>
                <div class="card-arrow">
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>
        </div>

        <div class="hooks-info">
            <div class="info-card">
                <h2>Hook开发规范</h2>
                <ul>
                    <li>使用Vue 3 Composition API</li>
                    <li>遵循use前缀命名规范</li>
                    <li>支持TypeScript类型定义</li>
                    <li>提供清晰的参数和返回值类型</li>
                    <li>处理组件卸载时的清理工作</li>
                </ul>
            </div>

            <div class="info-card">
                <h2>使用指南</h2>
                <ul>
                    <li>点击Hook卡片查看详细示例</li>
                    <li>每个Hook都包含使用示例和API文档</li>
                    <li>支持在线预览和交互测试</li>
                    <li>可以直接复制代码到项目中使用</li>
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
    .hooks-index {
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

        .hooks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 48px;

            .hook-card {
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
                    background: var(--el-color-success-light-9);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;

                    .el-icon {
                        font-size: 24px;
                        color: var(--el-color-success);
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
                    color: var(--el-color-success);
                    transform: translateX(4px);
                }
            }
        }

        .hooks-info {
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
        .hooks-index {
            padding: 16px;

            .hooks-grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }

            .hooks-info {
                grid-template-columns: 1fr;
                gap: 16px;
            }
        }
    }
</style>
