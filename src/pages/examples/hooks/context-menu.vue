<template>
    <div class="context-menu-hook-demo">
        <div class="demo-header">
            <h1>右键菜单Hook (useContextMenu)</h1>
            <p>管理右键菜单位置和状态的Hook，支持边界检测和自动定位</p>
        </div>

        <div class="demo-section">
            <h2>基础用法</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <div class="context-demo-area" @contextmenu="basicContextMenu.showMenu">
                        <h4>右键点击测试基础功能</h4>
                        <div class="menu-info">
                            <div class="info-item">
                                <span class="label">菜单显示:</span>
                                <span class="value">{{ basicContextMenu.show ? '是' : '否' }}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">菜单位置:</span>
                                <span class="value">{{ basicContextMenu.x }}, {{ basicContextMenu.y }}</span>
                            </div>
                        </div>
                        <div class="demo-actions">
                            <el-button @click="basicContextMenu.hideMenu()" size="small">
                                隐藏菜单
                            </el-button>
                            <el-button @click="showMenuAtCenter" size="small" type="primary">
                                在中心显示
                            </el-button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                    <h4>代码示例</h4>
                    <pre><code>&lt;template&gt;
  &lt;div @contextmenu="contextMenu.showMenu"&gt;
    右键点击这里
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useContextMenu } from '~/hooks'

const contextMenu = useContextMenu()

// 也可以手动显示菜单
const showMenuAtCenter = () => {
  contextMenu.showMenu({
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight / 2
  })
}
&lt;/script&gt;</code></pre>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h2>边界检测</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <div class="boundary-demo">
                        <h4>边界检测测试</h4>
                        <p>在页面边缘右键点击，菜单会自动调整位置避免超出边界</p>
                        <div class="boundary-areas">
                            <div class="boundary-area top-left" @contextmenu="boundaryContextMenu.showMenu">
                                左上角
                            </div>
                            <div class="boundary-area top-right" @contextmenu="boundaryContextMenu.showMenu">
                                右上角
                            </div>
                            <div class="boundary-area bottom-left" @contextmenu="boundaryContextMenu.showMenu">
                                左下角
                            </div>
                            <div class="boundary-area bottom-right" @contextmenu="boundaryContextMenu.showMenu">
                                右下角
                            </div>
                        </div>
                        <div class="menu-info">
                            <div class="info-item">
                                <span class="label">计算后位置:</span>
                                <span class="value">{{ boundaryContextMenu.x }}, {{ boundaryContextMenu.y }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                    <h4>代码示例</h4>
                    <pre><code>&lt;script setup&gt;
import { useContextMenu } from '~/hooks'

// 配置菜单尺寸用于边界检测
const contextMenu = useContextMenu({
  menuWidth: 200,   // 菜单宽度
  menuHeight: 300,  // 菜单高度
  margin: 10        // 边距
})

// Hook会自动计算位置，确保菜单不超出边界
&lt;/script&gt;</code></pre>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h2>API 文档</h2>
            <div class="demo-card">
                <div class="api-docs">
                    <h4>参数 (UseContextMenuOptions)</h4>
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
                                <td><code>margin</code></td>
                                <td><code>number</code></td>
                                <td><code>10</code></td>
                                <td>菜单的最小边距</td>
                            </tr>
                            <tr>
                                <td><code>menuWidth</code></td>
                                <td><code>number</code></td>
                                <td><code>200</code></td>
                                <td>菜单宽度（用于边界检测）</td>
                            </tr>
                            <tr>
                                <td><code>menuHeight</code></td>
                                <td><code>number</code></td>
                                <td><code>300</code></td>
                                <td>菜单高度（用于边界检测）</td>
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
                                <td><code>Ref&lt;number&gt;</code></td>
                                <td>菜单位置坐标</td>
                            </tr>
                            <tr>
                                <td><code>show</code></td>
                                <td><code>Ref&lt;boolean&gt;</code></td>
                                <td>菜单显示状态</td>
                            </tr>
                            <tr>
                                <td><code>showMenu</code></td>
                                <td><code>(event) =&gt; void</code></td>
                                <td>显示菜单</td>
                            </tr>
                            <tr>
                                <td><code>hideMenu</code></td>
                                <td><code>() =&gt; void</code></td>
                                <td>隐藏菜单</td>
                            </tr>
                            <tr>
                                <td><code>toggleMenu</code></td>
                                <td><code>(event) =&gt; void</code></td>
                                <td>切换菜单显示状态</td>
                            </tr>
                            <tr>
                                <td><code>calculatePosition</code></td>
                                <td><code>(x, y) =&gt; {x, y}</code></td>
                                <td>计算菜单位置（边界检测）</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4>特性</h4>
                    <ul>
                        <li>✅ 自动边界检测和位置调整</li>
                        <li>✅ 支持点击外部自动关闭</li>
                        <li>✅ 支持ESC键关闭</li>
                        <li>✅ 自动处理组件卸载清理</li>
                        <li>✅ TypeScript类型支持</li>
                        <li>✅ 可配置菜单尺寸和边距</li>
                    </ul>

                    <h4>使用场景</h4>
                    <ul>
                        <li>右键上下文菜单</li>
                        <li>下拉菜单定位</li>
                        <li>弹出框位置管理</li>
                        <li>工具提示定位</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useContextMenu } from '~/hooks'

// 基础用法
const basicContextMenu = useContextMenu()

// 边界检测用法
const boundaryContextMenu = useContextMenu({
    menuWidth: 200,
    menuHeight: 300,
    margin: 10
})

// 在中心显示菜单
const showMenuAtCenter = () => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    basicContextMenu.showMenu({ clientX: centerX, clientY: centerY })
}
</script>

<style lang="scss" scoped>
.context-menu-hook-demo {
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

            .context-demo-area {
                padding: 24px;
                border: 2px dashed var(--app-border-color);
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    border-color: var(--el-color-success);
                }

                h4 {
                    margin-bottom: 16px;
                    color: var(--app-text-color);
                    font-size: 16px;
                }

                .menu-info {
                    margin-bottom: 16px;
                }

                .demo-actions {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
            }

            .boundary-demo {
                h4 {
                    margin-bottom: 12px;
                    color: var(--app-text-color);
                    font-size: 16px;
                    text-align: center;
                }

                p {
                    margin-bottom: 20px;
                    color: var(--app-text-secondary);
                    text-align: center;
                    line-height: 1.6;
                }

                .boundary-areas {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: 20px;
                    height: 200px;

                    .boundary-area {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: var(--app-bg-color);
                        border: 2px dashed var(--app-border-color);
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        color: var(--app-text-secondary);
                        font-weight: 500;

                        &:hover {
                            border-color: var(--el-color-success);
                            color: var(--el-color-success);
                        }
                    }
                }

                .menu-info {
                    text-align: center;
                }
            }

            .info-item {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                background: var(--app-bg-color);
                border-radius: 6px;
                border: 1px solid var(--app-border-color);
                margin: 0 6px 8px 0;

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
        }
    }
}

@media (max-width: 768px) {
    .context-menu-hook-demo {
        padding: 16px;

        .demo-card .demo-preview,
        .demo-card .demo-code,
        .demo-card .api-docs {
            padding: 16px;
        }

        .boundary-areas {
            height: 150px !important;
        }
    }
}
</style>
