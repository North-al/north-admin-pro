<template>
    <div class="breadcrumb-demo">
        <div class="demo-header">
            <h1>面包屑组件 (Breadcrumb)</h1>
            <p>用于显示当前页面路径的导航组件，支持响应式设计</p>
        </div>

        <div class="demo-section">
            <h2>基础用法</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <Breadcrumb :items="basicItems" />
                </div>
                <div class="demo-code">
                    <h4>代码示例</h4>
                    <pre><code>&lt;template&gt;
  &lt;Breadcrumb :items="breadcrumbItems" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
const breadcrumbItems = [
  { title: '首页', path: '/' },
  { title: '组件示例', path: '/examples/components' },
  { title: '面包屑组件', path: '/examples/components/breadcrumb' }
]
&lt;/script&gt;</code></pre>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h2>长路径示例</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <Breadcrumb :items="longItems" />
                </div>
                <div class="demo-code">
                    <h4>代码示例</h4>
                    <pre><code>const longItems = [
  { title: '首页', path: '/' },
  { title: '系统管理', path: '/system' },
  { title: '用户管理', path: '/system/users' },
  { title: '角色管理', path: '/system/users/roles' },
  { title: '权限设置', path: '/system/users/roles/permissions' },
  { title: '详细配置', path: '/system/users/roles/permissions/config' }
]</code></pre>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h2>响应式测试</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <div class="responsive-test">
                        <p>调整浏览器窗口大小查看响应式效果：</p>
                        <ul>
                            <li>宽度 > 600px：正常显示</li>
                            <li>宽度 < 600px：完全隐藏面包屑</li>
                        </ul>
                        <Breadcrumb :items="responsiveItems" />
                    </div>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h2>API 文档</h2>
            <div class="demo-card">
                <div class="api-docs">
                    <h4>Props</h4>
                    <table class="api-table">
                        <thead>
                            <tr>
                                <th>属性名</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>items</code></td>
                                <td><code>BreadcrumbItem[]</code></td>
                                <td><code>[]</code></td>
                                <td>面包屑项目列表</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4>BreadcrumbItem 类型定义</h4>
                    <pre><code>interface BreadcrumbItem {
  title: string    // 显示文本
  path: string     // 路由路径
}</code></pre>

                    <h4>特性</h4>
                    <ul>
                        <li>✅ 自动处理路由跳转</li>
                        <li>✅ 响应式设计，小屏幕自动隐藏</li>
                        <li>✅ 支持主题切换</li>
                        <li>✅ 最后一项不可点击（当前页面）</li>
                        <li>✅ 使用CSS媒体查询控制显示</li>
                    </ul>

                    <h4>样式变量</h4>
                    <pre><code>// 可自定义的CSS变量
--app-text-color          // 主文本颜色
--app-text-secondary      // 次要文本颜色
--app-text-placeholder    // 分隔符颜色
--app-border-color        // 边框颜色
--el-color-primary        // 主题色（悬停效果）</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Breadcrumb from '~/components/Breadcrumb.vue'

    // 基础示例
    const basicItems = [
        { title: '首页', path: '/' },
        { title: '组件示例', path: '/examples/components' },
        { title: '面包屑组件', path: '/examples/components/breadcrumb' }
    ]

    // 长路径示例
    const longItems = [
        { title: '首页', path: '/' },
        { title: '系统管理', path: '/system' },
        { title: '用户管理', path: '/system/users' },
        { title: '角色管理', path: '/system/users/roles' },
        { title: '权限设置', path: '/system/users/roles/permissions' },
        { title: '详细配置', path: '/system/users/roles/permissions/config' }
    ]

    // 响应式测试示例
    const responsiveItems = [
        { title: '首页', path: '/' },
        { title: '响应式测试', path: '/examples/responsive' },
        { title: '面包屑响应式', path: '/examples/responsive/breadcrumb' }
    ]
</script>

<style lang="scss" scoped>
    .breadcrumb-demo {
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;

        .demo-header {
            margin-bottom: 32px;
            text-align: center;

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

        .demo-section {
            margin-bottom: 48px;

            h2 {
                font-size: 24px;
                color: var(--app-text-color);
                margin-bottom: 16px;
                border-bottom: 2px solid var(--el-color-primary);
                padding-bottom: 8px;
            }
        }

        .demo-card {
            background: var(--app-bg-color);
            border: 1px solid var(--app-border-color);
            border-radius: 8px;
            overflow: hidden;

            .demo-preview {
                padding: 24px;
                border-bottom: 1px solid var(--app-border-color);
                background: var(--app-bg-secondary);

                .responsive-test {
                    p {
                        margin-bottom: 12px;
                        color: var(--app-text-color);
                        font-weight: 500;
                    }

                    ul {
                        margin-bottom: 20px;
                        padding-left: 20px;
                        color: var(--app-text-secondary);

                        li {
                            margin-bottom: 4px;
                        }
                    }
                }
            }

            .demo-code {
                padding: 24px;

                h4 {
                    margin-bottom: 12px;
                    color: var(--app-text-color);
                    font-size: 16px;
                }

                pre {
                    background: var(--app-bg-secondary);
                    padding: 16px;
                    border-radius: 6px;
                    overflow-x: auto;
                    font-size: 14px;
                    line-height: 1.5;

                    code {
                        color: var(--app-text-color);
                        font-family: 'Courier New', monospace;
                    }
                }
            }

            .api-docs {
                padding: 24px;

                h4 {
                    margin-bottom: 16px;
                    margin-top: 24px;
                    color: var(--app-text-color);
                    font-size: 16px;

                    &:first-child {
                        margin-top: 0;
                    }
                }

                .api-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 24px;

                    th,
                    td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid var(--app-border-color);
                    }

                    th {
                        background: var(--app-bg-secondary);
                        font-weight: 600;
                        color: var(--app-text-color);
                    }

                    td {
                        color: var(--app-text-secondary);

                        code {
                            background: var(--app-bg-secondary);
                            padding: 2px 6px;
                            border-radius: 4px;
                            font-family: 'Courier New', monospace;
                            color: var(--el-color-primary);
                            font-size: 13px;
                        }
                    }
                }

                ul {
                    color: var(--app-text-secondary);
                    line-height: 1.6;
                    padding-left: 20px;

                    li {
                        margin-bottom: 6px;
                    }
                }

                pre {
                    background: var(--app-bg-secondary);
                    padding: 16px;
                    border-radius: 6px;
                    overflow-x: auto;
                    font-size: 14px;
                    line-height: 1.5;
                    margin-bottom: 16px;

                    code {
                        color: var(--app-text-color);
                        font-family: 'Courier New', monospace;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .breadcrumb-demo {
            padding: 16px;

            .demo-card .demo-preview,
            .demo-card .demo-code,
            .demo-card .api-docs {
                padding: 16px;
            }
        }
    }
</style>
