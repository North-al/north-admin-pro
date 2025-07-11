<template>
    <div class="context-menu-demo">
        <div class="demo-header">
            <h1>右键菜单组件 (ContextMenu)</h1>
            <p>可定制的右键上下文菜单组件，支持图标、分割线和禁用状态</p>
        </div>

        <div class="demo-section">
            <h2>基础用法</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <div class="context-demo-area" @contextmenu="showBasicMenu">
                        <p>在这里右键点击查看基础菜单</p>
                    </div>
                    <ContextMenu
                        :visible="basicMenuVisible"
                        :x="basicMenuX"
                        :y="basicMenuY"
                        :items="basicMenuItems"
                        @command="handleBasicCommand"
                        @close="basicMenuVisible = false" />
                </div>
                <div class="demo-code">
                    <h4>代码示例</h4>
                    <pre><code>&lt;template&gt;
  &lt;div @contextmenu="showMenu"&gt;
    右键点击这里
  &lt;/div&gt;
  &lt;ContextMenu
    :visible="visible"
    :x="x"
    :y="y"
    :items="items"
    @command="handleCommand"
    @close="visible = false" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
const visible = ref(false)
const x = ref(0)
const y = ref(0)
const items = [
  { key: 'copy', label: '复制', icon: 'Copy' },
  { key: 'paste', label: '粘贴', icon: 'Paste' },
  { key: 'delete', label: '删除', icon: 'Delete' }
]

const showMenu = (e) => {
  e.preventDefault()
  x.value = e.clientX
  y.value = e.clientY
  visible.value = true
}

const handleCommand = (key) => {
  console.log('点击了:', key)
  visible.value = false
}
&lt;/script&gt;</code></pre>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h2>高级用法</h2>
            <div class="demo-card">
                <div class="demo-preview">
                    <div class="context-demo-area advanced" @contextmenu="showAdvancedMenu">
                        <p>在这里右键点击查看高级菜单</p>
                        <p class="hint">包含分割线、禁用项和不同图标</p>
                    </div>
                    <ContextMenu
                        :visible="advancedMenuVisible"
                        :x="advancedMenuX"
                        :y="advancedMenuY"
                        :items="advancedMenuItems"
                        @command="handleAdvancedCommand"
                        @close="advancedMenuVisible = false" />
                </div>
                <div class="demo-code">
                    <h4>代码示例</h4>
                    <pre><code>const items = [
  { key: 'refresh', label: '刷新', icon: 'Refresh' },
  { key: 'edit', label: '编辑', icon: 'Edit' },
  { key: 'copy', label: '复制', icon: 'Copy', divided: true },
  { key: 'paste', label: '粘贴', icon: 'Paste', disabled: true },
  { key: 'delete', label: '删除', icon: 'Delete', divided: true },
  { key: 'properties', label: '属性', icon: 'Setting' }
]</code></pre>
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
                                <td><code>visible</code></td>
                                <td><code>boolean</code></td>
                                <td><code>false</code></td>
                                <td>是否显示菜单</td>
                            </tr>
                            <tr>
                                <td><code>x</code></td>
                                <td><code>number</code></td>
                                <td><code>0</code></td>
                                <td>菜单X坐标</td>
                            </tr>
                            <tr>
                                <td><code>y</code></td>
                                <td><code>number</code></td>
                                <td><code>0</code></td>
                                <td>菜单Y坐标</td>
                            </tr>
                            <tr>
                                <td><code>items</code></td>
                                <td><code>ContextMenuItem[]</code></td>
                                <td><code>[]</code></td>
                                <td>菜单项列表</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4>Events</h4>
                    <table class="api-table">
                        <thead>
                            <tr>
                                <th>事件名</th>
                                <th>参数</th>
                                <th>说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>command</code></td>
                                <td><code>key: string</code></td>
                                <td>菜单项点击事件</td>
                            </tr>
                            <tr>
                                <td><code>close</code></td>
                                <td><code>-</code></td>
                                <td>菜单关闭事件</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4>ContextMenuItem 类型定义</h4>
                    <pre><code>interface ContextMenuItem {
  key: string        // 唯一标识
  label: string      // 显示文本
  icon?: string      // 图标名称（Element Plus图标）
  disabled?: boolean // 是否禁用
  divided?: boolean  // 是否显示分割线
}</code></pre>

                    <h4>特性</h4>
                    <ul>
                        <li>✅ 支持Element Plus图标</li>
                        <li>✅ 支持分割线和禁用状态</li>
                        <li>✅ 自动处理点击外部关闭</li>
                        <li>✅ 使用Teleport渲染到body</li>
                        <li>✅ 支持主题切换</li>
                        <li>✅ 响应式设计</li>
                        <li>✅ 支持键盘ESC关闭</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ContextMenu, { type ContextMenuItem } from '~/components/ContextMenu.vue'

    // 基础菜单
    const basicMenuVisible = ref(false)
    const basicMenuX = ref(0)
    const basicMenuY = ref(0)
    const basicMenuItems: ContextMenuItem[] = [
        { key: 'copy', label: '复制', icon: 'Copy' },
        { key: 'paste', label: '粘贴', icon: 'Paste' },
        { key: 'delete', label: '删除', icon: 'Delete' }
    ]

    const showBasicMenu = (e: MouseEvent) => {
        e.preventDefault()
        basicMenuX.value = e.clientX
        basicMenuY.value = e.clientY
        basicMenuVisible.value = true
    }

    const handleBasicCommand = (key: string) => {
        ElMessage.success(`点击了基础菜单项: ${key}`)
        basicMenuVisible.value = false
    }

    // 高级菜单
    const advancedMenuVisible = ref(false)
    const advancedMenuX = ref(0)
    const advancedMenuY = ref(0)
    const advancedMenuItems: ContextMenuItem[] = [
        { key: 'refresh', label: '刷新', icon: 'Refresh' },
        { key: 'edit', label: '编辑', icon: 'Edit' },
        { key: 'copy', label: '复制', icon: 'Copy', divided: true },
        { key: 'paste', label: '粘贴', icon: 'Paste', disabled: true },
        { key: 'delete', label: '删除', icon: 'Delete', divided: true },
        { key: 'properties', label: '属性', icon: 'Setting' }
    ]

    const showAdvancedMenu = (e: MouseEvent) => {
        e.preventDefault()
        advancedMenuX.value = e.clientX
        advancedMenuY.value = e.clientY
        advancedMenuVisible.value = true
    }

    const handleAdvancedCommand = (key: string) => {
        ElMessage.success(`点击了高级菜单项: ${key}`)
        advancedMenuVisible.value = false
    }
</script>

<style lang="scss" scoped>
    .context-menu-demo {
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

                .context-demo-area {
                    padding: 40px;
                    border: 2px dashed var(--app-border-color);
                    border-radius: 8px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    user-select: none;

                    &:hover {
                        border-color: var(--el-color-primary);
                    }

                    p {
                        margin: 0;
                        color: var(--app-text-secondary);
                        font-size: 16px;

                        &.hint {
                            margin-top: 8px;
                            font-size: 14px;
                            color: var(--app-text-placeholder);
                        }
                    }

                    &.advanced {
                        background: linear-gradient(135deg, var(--app-bg-color) 0%, var(--app-bg-secondary) 100%);
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
        .context-menu-demo {
            padding: 16px;

            .demo-card .demo-preview,
            .demo-card .demo-code,
            .demo-card .api-docs {
                padding: 16px;
            }

            .demo-preview .context-demo-area {
                padding: 24px;
            }
        }
    }
</style>
