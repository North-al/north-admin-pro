<template>
    <div class="css-vars-demo">
        <div class="demo-header">
            <h1>CSS 变量管理Hook (useCssVar)</h1>
            <p>使用 Element Plus 颜色选择器直接修改项目主题变量，修改后立即应用到整个界面</p>
            <div class="theme-info">
                <el-tag type="info">当前主题: {{ currentTheme }}</el-tag>
                <el-tag type="success">共 {{ totalVariablesCount }} 个变量</el-tag>
                <span class="theme-desc">变量将设置到 [data-theme="{{ currentTheme }}"] 选择器下</span>
            </div>
            <div class="demo-actions">
                <el-button @click="resetAllVars" type="danger" size="small">
                    <el-icon><Refresh /></el-icon>
                    重置所有变量
                </el-button>
                <el-button @click="exportCurrentVars" type="primary" size="small">
                    <el-icon><Download /></el-icon>
                    导出当前配置
                </el-button>
            </div>
        </div>

        <div class="demo-content">
            <!-- Element Plus 主色调 -->
            <el-card shadow="never">
                <el-button type="primary">primary</el-button>
                <el-button type="success">success</el-button>
                <el-button type="danger">danger</el-button>
                <el-button type="warning">warning</el-button>
                <el-button type="info">info</el-button>
                <el-button type="default">default</el-button>
            </el-card>

            <div class="demo-section">
                <h2>Element Plus 主色调</h2>
                <div class="color-grid">
                    <div class="color-item">
                        <div class="color-info">
                            <label class="color-label">主色</label>
                            <div class="color-controls">
                                <el-color-picker v-model="primaryColor" :predefine="predefineColors" />
                                <el-input
                                    v-model="primaryColor"
                                    size="small"
                                    class="color-input"
                                    placeholder="#409eff" />
                            </div>
                            <small class="color-var">--el-color-primary</small>
                        </div>
                    </div>
                    <div class="color-item">
                        <div class="color-info">
                            <label class="color-label">成功色</label>
                            <div class="color-controls">
                                <el-color-picker v-model="successColor" :predefine="predefineColors" />
                                <el-input
                                    v-model="successColor"
                                    size="small"
                                    class="color-input"
                                    placeholder="#67c23a" />
                            </div>
                            <small class="color-var">--el-color-success</small>
                        </div>
                    </div>
                    <div class="color-item">
                        <div class="color-info">
                            <label class="color-label">警告色</label>
                            <div class="color-controls">
                                <el-color-picker v-model="warningColor" :predefine="predefineColors" />
                                <el-input
                                    v-model="warningColor"
                                    size="small"
                                    class="color-input"
                                    placeholder="#e6a23c" />
                            </div>
                            <small class="color-var">--el-color-warning</small>
                        </div>
                    </div>
                    <div class="color-item">
                        <div class="color-info">
                            <label class="color-label">危险色</label>
                            <div class="color-controls">
                                <el-color-picker v-model="dangerColor" :predefine="predefineColors" />
                                <el-input
                                    v-model="dangerColor"
                                    size="small"
                                    class="color-input"
                                    placeholder="#f56c6c" />
                            </div>
                            <small class="color-var">--el-color-danger</small>
                        </div>
                    </div>
                    <div class="color-item">
                        <div class="color-info">
                            <label class="color-label">信息色</label>
                            <div class="color-controls">
                                <el-color-picker v-model="infoColor" :predefine="predefineColors" />
                                <el-input v-model="infoColor" size="small" class="color-input" placeholder="#909399" />
                            </div>
                            <small class="color-var">--el-color-info</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 应用主题变量 -->
            <div class="demo-section">
                <h2>应用主题变量</h2>
                <div class="vars-container">
                    <!-- 使用折叠面板组织变量 -->
                    <el-collapse>
                        <el-collapse-item title="全局基础色彩" name="global">
                            <div class="vars-grid">
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="appBgColor" :predefine="predefineColors" />
                                            <el-input v-model="appBgColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--app-bg-color</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">主文本色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="appTextColor" :predefine="predefineColors" />
                                            <el-input v-model="appTextColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--app-text-color</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">次要文本色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="appTextSecondary" :predefine="predefineColors" />
                                            <el-input v-model="appTextSecondary" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--app-text-secondary</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">占位符文本色</label>
                                        <div class="var-controls">
                                            <el-color-picker
                                                v-model="appTextPlaceholder"
                                                :predefine="predefineColors" />
                                            <el-input v-model="appTextPlaceholder" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--app-text-placeholder</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">边框色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="appBorderColor" :predefine="predefineColors" />
                                            <el-input v-model="appBorderColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--app-border-color</small>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>

                        <el-collapse-item title="侧边栏主题" name="sidebar">
                            <div class="vars-grid">
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="sidebarBgColor" :predefine="predefineColors" />
                                            <el-input v-model="sidebarBgColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--sidebar-bg-color</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">文本色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="sidebarTextColor" :predefine="predefineColors" />
                                            <el-input v-model="sidebarTextColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--sidebar-text-color</small>
                                    </div>
                                </div>

                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">激活文本色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="sidebarTextActive" :predefine="predefineColors" />
                                            <el-input v-model="sidebarTextActive" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--sidebar-text-active</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">悬停背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="sidebarHoverBg" :predefine="predefineColors" />
                                            <el-input v-model="sidebarHoverBg" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--sidebar-hover-bg</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">激活背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="sidebarActiveBg" :predefine="predefineColors" />
                                            <el-input v-model="sidebarActiveBg" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--sidebar-active-bg</small>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>

                        <el-collapse-item title="顶部导航" name="header">
                            <div class="vars-grid">
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="headerBgColor" :predefine="predefineColors" />
                                            <el-input v-model="headerBgColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--header-bg-color</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">边框色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="headerBorderColor" :predefine="predefineColors" />
                                            <el-input v-model="headerBorderColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--header-border-color</small>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>

                        <el-collapse-item title="内容区域" name="content">
                            <div class="vars-grid">
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="contentBgColor" :predefine="predefineColors" />
                                            <el-input v-model="contentBgColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--content-bg-color</small>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>

                        <el-collapse-item title="标签页" name="tags">
                            <div class="vars-grid">
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="tagsBgColor" :predefine="predefineColors" />
                                            <el-input v-model="tagsBgColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--tags-bg-color</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">边框色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="tagsBorderColor" :predefine="predefineColors" />
                                            <el-input v-model="tagsBorderColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--tags-border-color</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">标签项背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="tagsItemBg" :predefine="predefineColors" />
                                            <el-input v-model="tagsItemBg" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--tags-item-bg</small>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>

                        <el-collapse-item title="卡片组件" name="card">
                            <div class="vars-grid">
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="cardBgColor" :predefine="predefineColors" />
                                            <el-input v-model="cardBgColor" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--card-bg-color</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">边框色</label>
                                        <div class="var-controls">
                                            <el-color-picker
                                                v-model="cardBorderColorVar"
                                                :predefine="predefineColors" />
                                            <el-input v-model="cardBorderColorVar" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--card-border-color</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">阴影</label>
                                        <div class="var-controls">
                                            <el-color-picker v-model="cardShadow" :predefine="predefineColors" />
                                            <el-input v-model="cardShadow" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--card-shadow</small>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>

                        <el-collapse-item title="滚动条" name="scrollbar">
                            <div class="vars-grid">
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">轨道背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker
                                                v-model="scrollbarTrackBg"
                                                show-alpha
                                                :predefine="predefineColors" />
                                            <el-input v-model="scrollbarTrackBg" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--scrollbar-track-bg</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">滑块背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker
                                                v-model="scrollbarThumbBg"
                                                show-alpha
                                                :predefine="predefineColors" />
                                            <el-input v-model="scrollbarThumbBg" size="small" class="color-input" />
                                        </div>
                                        <small class="var-name">--scrollbar-thumb-bg</small>
                                    </div>
                                </div>
                                <div class="var-item">
                                    <div class="var-info">
                                        <label class="var-label">滑块悬停背景色</label>
                                        <div class="var-controls">
                                            <el-color-picker
                                                v-model="scrollbarThumbHoverBg"
                                                show-alpha
                                                :predefine="predefineColors" />
                                            <el-input
                                                v-model="scrollbarThumbHoverBg"
                                                size="small"
                                                class="color-input" />
                                        </div>
                                        <small class="var-name">--scrollbar-thumb-hover-bg</small>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>

                    <div class="more-vars-info">
                        <el-alert
                            title="完整变量列表"
                            type="success"
                            description="这里展示了所有主要的主题变量。还有输入框、表格、滚动条、设置面板等组件变量，可以根据需要添加。"
                            show-icon
                            :closable="false" />
                    </div>
                </div>
            </div>

            <!-- 自定义元素变量 -->
            <div class="demo-section">
                <h2>自定义元素变量</h2>
                <div class="custom-demo">
                    <div ref="demoElement" class="demo-element">
                        <h4>演示元素</h4>
                        <p>这个元素使用自定义的 CSS 变量</p>
                        <div class="var-controls">
                            <label>背景色：</label>
                            <el-color-picker v-model="demoElementBg" :predefine="predefineColors" />
                            <el-input
                                v-model="demoElementBg"
                                size="small"
                                style="width: 120px; margin-left: 8px"
                                placeholder="#f0f0f0" />
                        </div>
                    </div>

                    <div ref="cardElement" class="demo-card">
                        <h4>演示卡片</h4>
                        <p>这个卡片的边框颜色可以自定义</p>
                        <div class="var-controls">
                            <label>边框色：</label>
                            <el-color-picker v-model="cardBorderColor" :predefine="predefineColors" />
                            <el-input
                                v-model="cardBorderColor"
                                size="small"
                                style="width: 120px; margin-left: 8px"
                                placeholder="#e0e0e0" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 使用说明 -->
            <div class="demo-section">
                <h2>使用说明</h2>
                <div class="usage-info">
                    <el-alert
                        title="主题感知"
                        type="success"
                        :description="`变量会根据当前主题 (${currentTheme}) 自动设置到对应的 [data-theme=&quot;${currentTheme}&quot;] 选择器下，确保只影响当前主题。`"
                        show-icon
                        :closable="false" />
                    <el-alert
                        title="实时生效"
                        type="info"
                        description="修改颜色后会立即应用到整个项目界面，包括侧边栏、顶部导航、按钮等所有组件。"
                        show-icon
                        :closable="false" />
                    <el-alert
                        title="临时修改"
                        type="warning"
                        description="这些修改仅在当前会话中有效，刷新页面后会恢复默认值。如需永久修改，请导出配置并应用到对应的主题 SCSS 文件中。"
                        show-icon
                        :closable="false" />
                </div>
            </div>

            <!-- API 文档 -->
            <div class="demo-section">
                <h2>API 文档</h2>
                <div class="api-docs">
                    <h4>useCssVar Hook</h4>
                    <table class="api-table">
                        <thead>
                            <tr>
                                <th>Hook</th>
                                <th>参数</th>
                                <th>返回值</th>
                                <th>说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>useCssVar</code></td>
                                <td><code>(prop, target?, options?)</code></td>
                                <td><code>Ref&lt;string&gt;</code></td>
                                <td>响应式 CSS 变量</td>
                            </tr>
                            <tr>
                                <td><code>useThemeCssVar</code></td>
                                <td><code>(prop, initialValue?)</code></td>
                                <td><code>Ref&lt;string&gt;</code></td>
                                <td>主题感知的 CSS 变量</td>
                            </tr>
                            <tr>
                                <td><code>useCurrentTheme</code></td>
                                <td><code>()</code></td>
                                <td><code>Ref&lt;string&gt;</code></td>
                                <td>获取当前主题</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4>参数说明</h4>
                    <ul>
                        <li><strong>prop</strong>: CSS 变量名（支持响应式）</li>
                        <li><strong>target</strong>: 目标元素（字符串选择器、DOM 元素、模板引用等）</li>
                        <li>
                            <strong>options</strong>: 配置选项
                            <ul>
                                <li><code>initialValue</code>: 初始值</li>
                                <li><code>observe</code>: 是否观察变化</li>
                                <li><code>themeAware</code>: 是否主题感知</li>
                            </ul>
                        </li>
                    </ul>

                    <h4>代码示例</h4>
                    <pre><code>&lt;script setup&gt;
import &#123; useCssVar, useThemeCssVar, useCurrentTheme &#125; from '~/hooks'

const &#123; setCssVar, getCssVar, resetCssVars &#125; = useCssVar()

// 基础用法 - 全局 CSS 变量
const primaryColor = useCssVar('--el-color-primary')

// 主题感知 - 根据当前主题设置到对应的 [data-theme] 选择器
const bgColor = useThemeCssVar('--app-bg-color', '#ffffff')

// 指定元素
const el = useTemplateRef('el')
const color = useCssVar('--color', el, &#123; initialValue: '#eee' &#125;)

// 字符串选择器
const headerColor = useCssVar('--header-color', '[data-theme="dark"]')

// 获取当前主题
const currentTheme = useCurrentTheme()
&lt;/script&gt;</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useCssVar, useThemeCssVar, useCurrentTheme } from '~/hooks'

    // 示例元素引用
    const demoElement = ref<HTMLElement>()
    const cardElement = ref<HTMLElement>()

    // 获取当前主题
    const currentTheme = useCurrentTheme()

    // 使用主题感知的 CSS 变量 - 会根据当前主题设置到对应的 [data-theme] 选择器
    const primaryColor = useThemeCssVar('--el-color-primary', '#409eff')
    const successColor = useThemeCssVar('--el-color-success', '#67c23a')
    const warningColor = useThemeCssVar('--el-color-warning', '#e6a23c')
    const dangerColor = useThemeCssVar('--el-color-danger', '#f56c6c')
    const infoColor = useThemeCssVar('--el-color-info', '#909399')

    // 全局基础色彩
    const appBgColor = useThemeCssVar('--app-bg-color', '#fafbfc')
    const appTextColor = useThemeCssVar('--app-text-color', '#1d2129')
    const appTextSecondary = useThemeCssVar('--app-text-secondary', '#4e5969')
    const appTextPlaceholder = useThemeCssVar('--app-text-placeholder', '#86909c')
    const appBorderColor = useThemeCssVar('--app-border-color', '#e5e6eb')

    // 侧边栏主题
    const sidebarBgColor = useThemeCssVar('--sidebar-bg-color', '#ffffff')
    const sidebarTextColor = useThemeCssVar('--sidebar-text-color', '#1d2129')
    const sidebarTextActive = useThemeCssVar('--sidebar-text-active', '#165dff')
    const sidebarHoverBg = useThemeCssVar('--sidebar-hover-bg', '#f2f3f5')
    const sidebarActiveBg = useThemeCssVar('--sidebar-active-bg', '#e8f3ff')

    // 顶部导航
    const headerBgColor = useThemeCssVar('--header-bg-color', '#ffffff')
    const headerBorderColor = useThemeCssVar('--header-border-color', '#e5e6eb')

    // 内容区域
    const contentBgColor = useThemeCssVar('--content-bg-color', '#fafbfc')

    // 标签页
    const tagsBgColor = useThemeCssVar('--tags-bg-color', '#ffffff')
    const tagsBorderColor = useThemeCssVar('--tags-border-color', '#e5e6eb')
    const tagsItemBg = useThemeCssVar('--tags-item-bg', '#f7f8fa')

    // 卡片组件
    const cardBgColor = useThemeCssVar('--card-bg-color', '#ffffff')
    const cardBorderColorVar = useThemeCssVar('--card-border-color', '#e5e6eb')
    const cardShadow = useThemeCssVar('--card-shadow', '0 2px 8px rgba(0, 0, 0, 0.06)')

    // 滚动条
    const scrollbarTrackBg = useThemeCssVar('--scrollbar-track-bg', 'rgba(0, 0, 0, 0.04)')
    const scrollbarThumbBg = useThemeCssVar('--scrollbar-thumb-bg', 'rgba(0, 0, 0, 0.15)')
    const scrollbarThumbHoverBg = useThemeCssVar('--scrollbar-thumb-hover-bg', 'rgba(0, 0, 0, 0.25)')

    // 针对特定元素的 CSS 变量
    const demoElementBg = useCssVar('--demo-bg', demoElement, { initialValue: '#f0f0f0' })
    const cardBorderColor = useCssVar('--card-border', cardElement, { initialValue: '#e0e0e0' })

    // 计算总变量数量
    const totalVariablesCount = computed(() => 28)

    // 预定义颜色
    const predefineColors = [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#409eff',
        '#67c23a',
        '#e6a23c',
        '#f56c6c',
        '#909399',
        '#ffffff',
        '#000000'
    ]

    // 重置所有变量到当前主题的默认值
    const resetAllVars = () => {
        // 清除当前主题选择器下的所有自定义变量
        const theme = currentTheme.value
        const themeElement = document.querySelector(`[data-theme="${theme}"]`) as HTMLElement

        if (themeElement) {
            // 清除内联样式中的 CSS 变量
            const style = themeElement.style
            const cssVarNames: string[] = []

            for (let i = 0; i < style.length; i++) {
                const propertyName = style.item(i)
                if (propertyName.startsWith('--')) {
                    cssVarNames.push(propertyName)
                }
            }

            cssVarNames.forEach(name => {
                style.removeProperty(name)
            })
        }

        // 重新获取默认值
        const computedStyle = getComputedStyle(document.documentElement)

        // Element Plus 颜色
        primaryColor.value = computedStyle.getPropertyValue('--el-color-primary').trim() || '#409eff'
        successColor.value = computedStyle.getPropertyValue('--el-color-success').trim() || '#67c23a'
        warningColor.value = computedStyle.getPropertyValue('--el-color-warning').trim() || '#e6a23c'
        dangerColor.value = computedStyle.getPropertyValue('--el-color-danger').trim() || '#f56c6c'
        infoColor.value = computedStyle.getPropertyValue('--el-color-info').trim() || '#909399'

        // 全局基础色彩
        appBgColor.value = computedStyle.getPropertyValue('--app-bg-color').trim() || '#fafbfc'
        appTextColor.value = computedStyle.getPropertyValue('--app-text-color').trim() || '#1d2129'
        appTextSecondary.value = computedStyle.getPropertyValue('--app-text-secondary').trim() || '#4e5969'
        appTextPlaceholder.value = computedStyle.getPropertyValue('--app-text-placeholder').trim() || '#86909c'
        appBorderColor.value = computedStyle.getPropertyValue('--app-border-color').trim() || '#e5e6eb'

        // 侧边栏主题
        sidebarBgColor.value = computedStyle.getPropertyValue('--sidebar-bg-color').trim() || '#ffffff'
        sidebarTextColor.value = computedStyle.getPropertyValue('--sidebar-text-color').trim() || '#1d2129'
        sidebarTextActive.value = computedStyle.getPropertyValue('--sidebar-text-active').trim() || '#165dff'
        sidebarHoverBg.value = computedStyle.getPropertyValue('--sidebar-hover-bg').trim() || '#f2f3f5'
        sidebarActiveBg.value = computedStyle.getPropertyValue('--sidebar-active-bg').trim() || '#e8f3ff'

        // 顶部导航
        headerBgColor.value = computedStyle.getPropertyValue('--header-bg-color').trim() || '#ffffff'
        headerBorderColor.value = computedStyle.getPropertyValue('--header-border-color').trim() || '#e5e6eb'

        // 内容区域
        contentBgColor.value = computedStyle.getPropertyValue('--content-bg-color').trim() || '#fafbfc'

        // 标签页
        tagsBgColor.value = computedStyle.getPropertyValue('--tags-bg-color').trim() || '#ffffff'
        tagsBorderColor.value = computedStyle.getPropertyValue('--tags-border-color').trim() || '#e5e6eb'
        tagsItemBg.value = computedStyle.getPropertyValue('--tags-item-bg').trim() || '#f7f8fa'

        // 卡片组件
        cardBgColor.value = computedStyle.getPropertyValue('--card-bg-color').trim() || '#ffffff'
        cardBorderColorVar.value = computedStyle.getPropertyValue('--card-border-color').trim() || '#e5e6eb'
        cardShadow.value = computedStyle.getPropertyValue('--card-shadow').trim() || '0 2px 8px rgba(0, 0, 0, 0.06)'

        // 滚动条
        scrollbarTrackBg.value = computedStyle.getPropertyValue('--scrollbar-track-bg').trim() || 'rgba(0, 0, 0, 0.04)'
        scrollbarThumbBg.value = computedStyle.getPropertyValue('--scrollbar-thumb-bg').trim() || 'rgba(0, 0, 0, 0.15)'
        scrollbarThumbHoverBg.value =
            computedStyle.getPropertyValue('--scrollbar-thumb-hover-bg').trim() || 'rgba(0, 0, 0, 0.25)'

        // 自定义元素变量
        demoElementBg.value = '#f0f0f0'
        cardBorderColor.value = '#e0e0e0'
    }

    // 导出当前配置
    const exportCurrentVars = () => {
        const config = {
            theme: currentTheme.value,
            elementPlusColors: {
                'el-color-primary': primaryColor.value,
                'el-color-success': successColor.value,
                'el-color-warning': warningColor.value,
                'el-color-danger': dangerColor.value,
                'el-color-info': infoColor.value
            },
            globalColors: {
                'app-bg-color': appBgColor.value,
                'app-text-color': appTextColor.value,
                'app-text-secondary': appTextSecondary.value,
                'app-text-placeholder': appTextPlaceholder.value,
                'app-border-color': appBorderColor.value
            },
            sidebarTheme: {
                'sidebar-bg-color': sidebarBgColor.value,
                'sidebar-text-color': sidebarTextColor.value,
                'sidebar-text-active': sidebarTextActive.value,
                'sidebar-hover-bg': sidebarHoverBg.value,
                'sidebar-active-bg': sidebarActiveBg.value
            },
            headerTheme: {
                'header-bg-color': headerBgColor.value,
                'header-border-color': headerBorderColor.value
            },
            contentTheme: {
                'content-bg-color': contentBgColor.value
            },
            tagsTheme: {
                'tags-bg-color': tagsBgColor.value,
                'tags-border-color': tagsBorderColor.value,
                'tags-item-bg': tagsItemBg.value
            },
            cardTheme: {
                'card-bg-color': cardBgColor.value,
                'card-border-color': cardBorderColorVar.value,
                'card-shadow': cardShadow.value
            },
            scrollbarTheme: {
                'scrollbar-track-bg': scrollbarTrackBg.value,
                'scrollbar-thumb-bg': scrollbarThumbBg.value,
                'scrollbar-thumb-hover-bg': scrollbarThumbHoverBg.value
            },
            customVars: {
                'demo-bg': demoElementBg.value,
                'card-border': cardBorderColor.value
            }
        }

        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'css-vars-config.json'
        a.click()
        URL.revokeObjectURL(url)
    }
</script>

<style lang="scss" scoped>
    .css-vars-demo {
        padding: 24px;
        max-width: 1400px;
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
                margin-bottom: 16px;
            }

            .theme-info {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                margin-bottom: 16px;

                .theme-desc {
                    font-size: 14px;
                    color: var(--app-text-secondary);
                }
            }

            .demo-actions {
                display: flex;
                justify-content: center;
                gap: 12px;
            }
        }

        .demo-content {
            .demo-section {
                margin-bottom: 48px;

                h2 {
                    font-size: 24px;
                    color: var(--app-text-color);
                    margin-bottom: 16px;
                    border-bottom: 2px solid var(--el-color-primary);
                    padding-bottom: 8px;
                }

                h3 {
                    font-size: 18px;
                    color: var(--app-text-color);
                    margin-bottom: 12px;
                }
            }
        }

        // Element Plus 主色调样式
        .color-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }

        .color-item {
            background: var(--app-bg-color);
            border: 1px solid var(--app-border-color);
            border-radius: 8px;
            padding: 20px;
            transition: all 0.3s ease;

            &:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                transform: translateY(-2px);
            }

            .color-info {
                .color-label {
                    display: block;
                    font-weight: 500;
                    color: var(--app-text-color);
                    margin-bottom: 12px;
                    font-size: 16px;
                }

                .color-controls {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 8px;
                    align-items: center;

                    .color-input {
                        flex: 1;
                    }
                }

                .color-var {
                    font-family: 'Courier New', monospace;
                    color: var(--app-text-secondary);
                    font-size: 12px;
                }
            }
        }

        // 应用主题变量样式
        .vars-container {
            // 折叠面板样式优化
            :deep(.el-collapse) {
                border: none;

                .el-collapse-item {
                    margin-bottom: 16px;
                    border: 1px solid var(--app-border-color);
                    border-radius: 8px;
                    overflow: hidden;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    .el-collapse-item__header {
                        background: var(--app-bg-color);
                        border: none;
                        padding: 16px 20px;
                        font-weight: 600;
                        color: var(--app-text-color);
                        font-size: 16px;

                        &:hover {
                            background: var(--app-hover-bg);
                        }

                        .el-collapse-item__arrow {
                            color: var(--el-color-primary);
                        }
                    }

                    .el-collapse-item__wrap {
                        border: none;

                        .el-collapse-item__content {
                            padding: 20px;
                            background: var(--content-bg-color, var(--app-bg-color));
                        }
                    }
                }
            }

            .vars-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 16px;
            }

            .var-item {
                background: var(--card-bg-color, var(--app-bg-color));
                border: 1px solid var(--card-border-color, var(--app-border-color));
                border-radius: 8px;
                padding: 16px;
                transition: all 0.3s ease;
                box-shadow: var(--card-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));

                &:hover {
                    border-color: var(--el-color-primary);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .var-info {
                    .var-label {
                        display: block;
                        font-size: 14px;
                        color: var(--app-text-color);
                        margin-bottom: 12px;
                        font-weight: 500;
                    }

                    .var-controls {
                        display: flex;
                        gap: 10px;
                        margin-bottom: 10px;
                        align-items: center;

                        .color-input {
                            flex: 1;
                            min-width: 0;
                        }

                        .el-color-picker {
                            flex-shrink: 0;
                        }
                    }

                    .var-name {
                        font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
                        color: var(--app-text-secondary);
                        font-size: 12px;
                        background: var(--app-hover-bg);
                        padding: 4px 8px;
                        border-radius: 4px;
                        display: inline-block;
                    }
                }
            }

            .more-vars-info {
                margin-top: 20px;
            }
        }

        // 使用说明样式
        .usage-info {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        // 自定义元素样式
        .custom-demo {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;

            .demo-element {
                background: var(--demo-bg, #f0f0f0);
                padding: 20px;
                border-radius: 8px;
                border: 1px solid var(--app-border-color);
                transition: background-color 0.3s ease;

                h4 {
                    margin-bottom: 8px;
                    color: var(--app-text-color);
                }

                p {
                    margin-bottom: 12px;
                    color: var(--app-text-secondary);
                }

                .var-controls {
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    label {
                        font-size: 14px;
                        color: var(--app-text-color);
                    }
                }
            }

            .demo-card {
                background: var(--app-bg-color);
                padding: 20px;
                border-radius: 8px;
                border: 2px solid var(--card-border, #e0e0e0);
                transition: border-color 0.3s ease;

                h4 {
                    margin-bottom: 8px;
                    color: var(--app-text-color);
                }

                p {
                    margin-bottom: 12px;
                    color: var(--app-text-secondary);
                }

                .var-controls {
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    label {
                        font-size: 14px;
                        color: var(--app-text-color);
                    }
                }
            }
        }

        // API 文档样式
        .api-docs {
            background: var(--app-bg-color);
            border: 1px solid var(--app-border-color);
            border-radius: 8px;
            padding: 24px;

            h4 {
                color: var(--app-text-color);
                margin-bottom: 16px;
                font-size: 18px;
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
                    background: var(--app-bg-secondary, #f5f5f5);
                    font-weight: 600;
                    color: var(--app-text-color);
                }

                td {
                    color: var(--app-text-secondary);

                    code {
                        background: var(--app-bg-secondary, #f5f5f5);
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-family: 'Courier New', monospace;
                        color: var(--el-color-primary);
                        font-size: 13px;
                    }
                }
            }

            pre {
                background: var(--app-bg-secondary, #f5f5f5);
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
    }

    @media (max-width: 768px) {
        .css-vars-demo {
            padding: 16px;

            .color-grid {
                grid-template-columns: 1fr;
            }

            .vars-grid {
                grid-template-columns: 1fr !important;
            }

            .demo-actions {
                flex-direction: column;
                gap: 8px;
            }
        }
    }
</style>
