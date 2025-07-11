<template>
    <div class="mouse-hook-demo">
        <div class="demo-header">
            <h1>鼠标位置Hook (useMouse)</h1>
            <p>获取和跟踪鼠标位置信息的Hook，支持多种坐标系统</p>
        </div>

        <div class="demo-section">
            <h2>基础用法</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <div class="mouse-demo-area">
                        <h4>实时鼠标位置</h4>
                        <div class="position-grid">
                            <div class="position-item">
                                <span class="label">Client X:</span>
                                <span class="value">{{ mousePosition.clientX }}</span>
                            </div>
                            <div class="position-item">
                                <span class="label">Client Y:</span>
                                <span class="value">{{ mousePosition.clientY }}</span>
                            </div>
                            <div class="position-item">
                                <span class="label">Page X:</span>
                                <span class="value">{{ mousePosition.pageX }}</span>
                            </div>
                            <div class="position-item">
                                <span class="label">Page Y:</span>
                                <span class="value">{{ mousePosition.pageY }}</span>
                            </div>
                            <div class="position-item">
                                <span class="label">Screen X:</span>
                                <span class="value">{{ mousePosition.screenX }}</span>
                            </div>
                            <div class="position-item">
                                <span class="label">Screen Y:</span>
                                <span class="value">{{ mousePosition.screenY }}</span>
                            </div>
                        </div>
                        <div class="demo-actions">
                            <el-button @click="mousePosition.reset()" type="primary" size="small"> 重置位置 </el-button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                    <h4>代码示例</h4>
                    <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;鼠标位置: &#65371;&#65371; mousePosition.x &#65373;&#65373;, &#65371;&#65371; mousePosition.y &#65373;&#65373;&lt;/p&gt;
    &lt;p&gt;页面坐标: &#65371;&#65371; mousePosition.pageX &#65373;&#65373;, &#65371;&#65371; mousePosition.pageY &#65373;&#65373; &lt;/p&gt;
    &lt;p&gt;屏幕坐标: &#65371;&#65371; mousePosition.screenX &#65373;&#65373;, &#65371;&#65371; mousePosition.screenY &#65373;&#65373;&lt;/p&gt;
    &lt;button @click="mousePosition.reset"&gt;重置位置&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useMouse } from '~/hooks'

const mousePosition = useMouse()
&lt;/script&gt;</code></pre>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h2>自定义配置</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <div class="mouse-demo-area">
                        <h4>禁用鼠标跟踪</h4>
                        <p>这个示例禁用了自动鼠标跟踪，只能手动更新位置</p>
                        <div class="position-grid">
                            <div class="position-item">
                                <span class="label">X:</span>
                                <span class="value">{{ staticMouse.x }}</span>
                            </div>
                            <div class="position-item">
                                <span class="label">Y:</span>
                                <span class="value">{{ staticMouse.y }}</span>
                            </div>
                        </div>
                        <div class="demo-actions">
                            <el-button @click="updateStaticPosition" type="success" size="small">
                                手动更新位置
                            </el-button>
                            <el-button @click="staticMouse.reset()" size="small"> 重置 </el-button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                    <h4>代码示例</h4>
                    <pre><code>&lt;script setup&gt;
import { useMouse } from '~/hooks'

// 禁用自动跟踪
const { x, y, updatePosition, reset } = useMouse({
  touch: false,  // 禁用自动鼠标跟踪
  initialValue: { x: 100, y: 100 }  // 设置初始值
})

// 手动更新位置
const updateManually = () => {
  updatePosition({
    clientX: Math.random() * 500,
    clientY: Math.random() * 300
  })
}
&lt;/script&gt;</code></pre>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h2>API 文档</h2>
            <div class="demo-card">
                <div class="api-docs">
                    <h4>参数 (UseMouseOptions)</h4>
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
                                <td><code>touch</code></td>
                                <td><code>boolean</code></td>
                                <td><code>true</code></td>
                                <td>是否监听鼠标移动事件</td>
                            </tr>
                            <tr>
                                <td><code>resetOnTouchEnds</code></td>
                                <td><code>boolean</code></td>
                                <td><code>false</code></td>
                                <td>触摸结束时是否重置位置</td>
                            </tr>
                            <tr>
                                <td><code>initialValue</code></td>
                                <td><code>Partial&lt;MousePosition&gt;</code></td>
                                <td><code>{}</code></td>
                                <td>初始位置值</td>
                            </tr>
                        </tbody>
                    </table>

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
                                <td><code>x, y</code></td>
                                <td><code>Readonly&lt;Ref&lt;number&gt;&gt;</code></td>
                                <td>鼠标位置 (等同于clientX, clientY)</td>
                            </tr>
                            <tr>
                                <td><code>clientX, clientY</code></td>
                                <td><code>Readonly&lt;Ref&lt;number&gt;&gt;</code></td>
                                <td>相对于视窗的位置</td>
                            </tr>
                            <tr>
                                <td><code>pageX, pageY</code></td>
                                <td><code>Readonly&lt;Ref&lt;number&gt;&gt;</code></td>
                                <td>相对于页面的位置</td>
                            </tr>
                            <tr>
                                <td><code>screenX, screenY</code></td>
                                <td><code>Readonly&lt;Ref&lt;number&gt;&gt;</code></td>
                                <td>相对于屏幕的位置</td>
                            </tr>
                            <tr>
                                <td><code>reset</code></td>
                                <td><code>() =&gt; void</code></td>
                                <td>重置位置到初始值</td>
                            </tr>
                            <tr>
                                <td><code>updatePosition</code></td>
                                <td><code>(event) =&gt; void</code></td>
                                <td>手动更新位置</td>
                            </tr>
                            <tr>
                                <td><code>getPositionFromEvent</code></td>
                                <td><code>(event) =&gt; MousePosition</code></td>
                                <td>从事件中获取位置信息</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4>MousePosition 类型定义</h4>
                    <pre><code>interface MousePosition {
  x: number         // 等同于clientX
  y: number         // 等同于clientY
  clientX: number   // 相对于视窗的X坐标
  clientY: number   // 相对于视窗的Y坐标
  pageX: number     // 相对于页面的X坐标
  pageY: number     // 相对于页面的Y坐标
  screenX: number   // 相对于屏幕的X坐标
  screenY: number   // 相对于屏幕的Y坐标
}</code></pre>

                    <h4>特性</h4>
                    <ul>
                        <li>✅ 支持鼠标和触摸事件</li>
                        <li>✅ 提供多种坐标系统</li>
                        <li>✅ 支持手动更新位置</li>
                        <li>✅ 自动处理组件卸载清理</li>
                        <li>✅ TypeScript类型支持</li>
                        <li>✅ 可配置初始值和行为</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useMouse } from '~/hooks'

    // 基础用法
    const mousePosition = useMouse()

    // 自定义配置 - 禁用自动跟踪
    const staticMouse = useMouse({
        touch: false,
        initialValue: { x: 100, y: 100 }
    })

    // 手动更新静态鼠标位置
    const updateStaticPosition = () => {
        const event = {
            clientX: Math.random() * 500,
            clientY: Math.random() * 300,
            pageX: Math.random() * 500,
            pageY: Math.random() * 300,
            screenX: Math.random() * 1000,
            screenY: Math.random() * 800
        } as MouseEvent
        staticMouse.updatePosition(event)
    }
</script>

<style lang="scss" scoped>
    .mouse-hook-demo {
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
                border-bottom: 2px solid var(--el-color-success);
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

                .mouse-demo-area {
                    h4 {
                        margin-bottom: 16px;
                        color: var(--app-text-color);
                        font-size: 16px;
                    }

                    p {
                        margin-bottom: 16px;
                        color: var(--app-text-secondary);
                        line-height: 1.6;
                    }

                    .position-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 12px;
                        margin-bottom: 20px;
                    }

                    .position-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px;
                        background: var(--app-bg-color);
                        border-radius: 6px;
                        border: 1px solid var(--app-border-color);

                        .label {
                            font-weight: 500;
                            color: var(--app-text-color);
                        }

                        .value {
                            font-family: 'Courier New', monospace;
                            color: var(--el-color-success);
                            font-weight: 600;
                        }
                    }

                    .demo-actions {
                        display: flex;
                        gap: 12px;
                        flex-wrap: wrap;
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
                            color: var(--el-color-success);
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
        .mouse-hook-demo {
            padding: 16px;

            .demo-card .demo-preview,
            .demo-card .demo-code,
            .demo-card .api-docs {
                padding: 16px;
            }

            .position-grid {
                grid-template-columns: 1fr !important;
            }
        }
    }
</style>
