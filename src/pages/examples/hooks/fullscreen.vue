<template>
    <div class="fullscreen-demo">
        <div class="demo-header">
            <h1>全屏功能Hook (useFullscreen)</h1>
            <p>提供全屏切换、全屏状态检测等功能，支持整个页面或指定DOM元素全屏</p>
        </div>

        <div class="demo-section">
            <h2>基础用法</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <div class="fullscreen-demo-area">
                        <h4>全屏状态</h4>
                        <div class="status-info">
                            <div class="status-item">
                                <span class="label">浏览器支持:</span>
                                <span class="value" :class="{ supported: isSupported, unsupported: !isSupported }">
                                    {{ isSupported ? '✅ 支持' : '❌ 不支持' }}
                                </span>
                            </div>
                            <div class="status-item">
                                <span class="label">当前状态:</span>
                                <span class="value" :class="{ active: isFullscreen, inactive: !isFullscreen }">
                                    {{ isFullscreen ? '🔳 全屏中' : '🔲 非全屏' }}
                                </span>
                            </div>
                        </div>
                        <div class="demo-actions">
                            <el-button @click="toggleFullscreen()" type="primary" size="small">
                                {{ isFullscreen ? '退出全屏' : '整页全屏' }}
                            </el-button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                    <h4>代码示例</h4>
                    <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;支持状态: &#123;&#123; isSupported &#125;&#125;&lt;/p&gt;
    &lt;p&gt;全屏状态: &#123;&#123; isFullscreen &#125;&#125;&lt;/p&gt;
    &lt;button @click="toggleFullscreen()"&gt;切换全屏&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useFullscreen } from '~/hooks'

const &#123; isSupported, isFullscreen, toggleFullscreen &#125; = useFullscreen()
&lt;/script&gt;</code></pre>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h2>指定元素全屏</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <div class="element-fullscreen-demo">
                        <h4>元素全屏示例</h4>
                        <div ref="demoElement" class="demo-element">
                            <div class="element-content">
                                <h3>这是一个可以全屏的元素</h3>
                                <p>点击下方按钮可以让这个元素进入全屏模式</p>
                                <div class="element-info">
                                    <p>📱 在全屏模式下，只有这个元素会占满整个屏幕</p>
                                    <p>⌨️ 按 ESC 键可以退出全屏</p>
                                    <p>🎯 这对于视频播放、图片查看等场景很有用</p>
                                </div>
                            </div>
                        </div>
                        <div class="demo-actions">
                            <el-button @click="toggleElementFullscreen" type="success" size="small">
                                元素全屏
                            </el-button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                    <h4>代码示例</h4>
                    <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;div ref="targetElement" class="my-element"&gt;
      &lt;h3&gt;可全屏的内容&lt;/h3&gt;
      &lt;p&gt;这个元素可以单独全屏&lt;/p&gt;
    &lt;/div&gt;
    &lt;button @click="toggleElementFullscreen"&gt;元素全屏&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useFullscreen } from '~/hooks'

const targetElement = ref()
const &#123; toggleFullscreen &#125; = useFullscreen()

const toggleElementFullscreen = () => &#123;
  toggleFullscreen(targetElement.value)
&#125;
&lt;/script&gt;</code></pre>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h2>API 文档</h2>
            <div class="demo-card">
                <div class="api-docs">
                    <h4>返回值</h4>
                    <table class="api-table">
                        <thead>
                            <tr>
                                <th>属性名</th>
                                <th>类型</th>
                                <th>说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>isSupported</code></td>
                                <td><code>Readonly&lt;Ref&lt;boolean&gt;&gt;</code></td>
                                <td>浏览器是否支持全屏功能</td>
                            </tr>
                            <tr>
                                <td><code>isFullscreen</code></td>
                                <td><code>Readonly&lt;Ref&lt;boolean&gt;&gt;</code></td>
                                <td>当前是否处于全屏状态</td>
                            </tr>
                            <tr>
                                <td><code>enterFullscreen</code></td>
                                <td><code>(element?: HTMLElement | Element) =&gt; Promise&lt;boolean&gt;</code></td>
                                <td>进入全屏模式</td>
                            </tr>
                            <tr>
                                <td><code>exitFullscreen</code></td>
                                <td><code>() =&gt; Promise&lt;boolean&gt;</code></td>
                                <td>退出全屏模式</td>
                            </tr>
                            <tr>
                                <td><code>toggleFullscreen</code></td>
                                <td><code>(element?: HTMLElement | Element) =&gt; Promise&lt;boolean&gt;</code></td>
                                <td>切换全屏状态</td>
                            </tr>
                            <tr>
                                <td><code>init</code></td>
                                <td><code>() =&gt; void</code></td>
                                <td>初始化全屏功能（通常在App.vue中调用）</td>
                            </tr>
                            <tr>
                                <td><code>dispose</code></td>
                                <td><code>() =&gt; void</code></td>
                                <td>清理全屏功能（通常在App.vue中调用）</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4>参数说明</h4>
                    <ul>
                        <li>
                            <strong>element</strong>:
                            可选参数，指定要全屏的DOM元素。如果不传入，默认对整个页面（document.documentElement）进行全屏
                        </li>
                        <li><strong>返回值</strong>: Promise&lt;boolean&gt;，表示操作是否成功</li>
                    </ul>

                    <h4>特性</h4>
                    <ul>
                        <li>✅ 支持整页全屏和指定元素全屏</li>
                        <li>✅ 自动检测浏览器兼容性</li>
                        <li>✅ 支持键盘ESC退出全屏</li>
                        <li>✅ 全局状态管理，避免重复初始化</li>
                        <li>✅ TypeScript类型支持</li>
                        <li>✅ 跨浏览器兼容（Chrome、Firefox、Safari、Edge）</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useFullscreen } from '~/hooks'

    const { isSupported, isFullscreen, toggleFullscreen } = useFullscreen()

    // 用于元素全屏的引用
    const demoElement = ref<HTMLElement>()

    // 切换指定元素全屏
    const toggleElementFullscreen = () => {
        if (demoElement.value) {
            toggleFullscreen(demoElement.value)
        }
    }
</script>

<style lang="scss" scoped>
    .fullscreen-demo {
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

                .fullscreen-demo-area,
                .element-fullscreen-demo {
                    h4 {
                        margin-bottom: 16px;
                        color: var(--app-text-color);
                        font-size: 16px;
                    }

                    .status-info {
                        margin-bottom: 20px;
                    }

                    .status-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px 0;

                        .label {
                            font-weight: 500;
                            color: var(--app-text-color);
                        }

                        .value {
                            font-family: 'Courier New', monospace;
                            font-weight: 600;

                            &.supported,
                            &.active {
                                color: var(--el-color-success);
                            }

                            &.unsupported,
                            &.inactive {
                                color: var(--app-text-secondary);
                            }
                        }
                    }

                    .demo-actions {
                        display: flex;
                        gap: 12px;
                        flex-wrap: wrap;
                    }
                }

                .demo-element {
                    background: linear-gradient(
                        135deg,
                        var(--el-color-primary-light-9),
                        var(--el-color-success-light-9)
                    );
                    border: 2px dashed var(--el-color-primary);
                    border-radius: 8px;
                    padding: 24px;
                    margin-bottom: 16px;
                    text-align: center;

                    .element-content {
                        h3 {
                            color: var(--app-text-color);
                            margin-bottom: 12px;
                        }

                        p {
                            color: var(--app-text-secondary);
                            margin-bottom: 16px;
                        }

                        .element-info {
                            text-align: left;

                            p {
                                margin-bottom: 8px;
                                font-size: 14px;
                            }
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
            }
        }
    }

    @media (max-width: 768px) {
        .fullscreen-demo {
            padding: 16px;

            .demo-card .demo-preview,
            .demo-card .demo-code,
            .demo-card .api-docs {
                padding: 16px;
            }
        }
    }
</style>
