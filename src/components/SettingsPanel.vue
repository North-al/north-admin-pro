<template>
    <el-drawer
        v-model="visible"
        title="系统设置"
        :size="300"
        direction="rtl"
        :before-close="handleClose"
        class="settings-panel">
        <div class="settings-content">
            <!-- 主题设置 -->
            <div class="settings-section">
                <h3 class="section-title">
                    <el-icon><PartlyCloudy /></el-icon>
                    主题模式
                </h3>

                <div class="theme-options">
                    <div
                        v-for="option in themeOptions"
                        :key="option.value"
                        class="theme-option"
                        :class="{ active: currentTheme === option.value }"
                        @click="setTheme(option.value)">
                        <div class="theme-preview">
                            <div class="preview-sidebar" :style="{ background: option.preview.sidebar }"></div>
                            <div class="preview-content">
                                <div class="preview-header" :style="{ background: option.preview.header }"></div>
                                <div class="preview-main" :style="{ background: option.preview.content }"></div>
                            </div>
                        </div>
                        <div class="theme-info">
                            <div class="theme-name">{{ option.label }}</div>
                        </div>
                        <el-icon v-if="currentTheme === option.value" class="theme-check">
                            <Check />
                        </el-icon>
                    </div>
                </div>
            </div>

            <!-- 布局设置 -->
            <div class="settings-section">
                <h3 class="section-title">
                    <el-icon><Grid /></el-icon>
                    布局设置
                </h3>

                <div class="setting-item">
                    <div class="setting-label">
                        <span>侧边栏折叠</span>
                    </div>
                    <el-switch v-model="sidebarCollapsed" @change="toggleSidebar" />
                </div>

                <div class="setting-item">
                    <div class="setting-label">
                        <span>全屏模式</span>
                    </div>
                    <el-button
                        size="small"
                        :type="isFullscreen ? 'danger' : 'primary'"
                        @click="() => toggleFullscreen()">
                        {{ isFullscreen ? '退出全屏' : '进入全屏' }}
                    </el-button>
                </div>
            </div>

            <!-- 其他设置 -->
            <div class="settings-section">
                <h3 class="section-title">
                    <el-icon><Setting /></el-icon>
                    其他设置
                </h3>

                <div class="setting-item">
                    <div class="setting-label">
                        <span>重置设置</span>
                    </div>
                    <el-button size="small" type="danger" @click="handleResetSettings"> 重置 </el-button>
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
    import { useSettings } from '../hooks/useSettings'
    import { useTheme } from '../hooks/useTheme'
    import { useFullscreen } from '../hooks/useFullscreen'

    const {
        settingsPanelOpen,
        sidebarCollapsed,
        themeOptions,
        toggleSidebar,
        closeSettingsPanel,
        toggleFullscreen,
        resetSettings,
        setTheme
    } = useSettings()

    const { currentTheme } = useTheme()
    const { isFullscreen } = useFullscreen()

    // 面板显示状态
    const visible = computed({
        get: () => settingsPanelOpen.value,
        set: (value: boolean) => {
            if (!value) {
                closeSettingsPanel()
            }
        }
    })

    // 关闭面板
    const handleClose = () => {
        closeSettingsPanel()
    }

    // 重置设置
    const handleResetSettings = () => {
        ElMessageBox.confirm('确定要重置所有设置吗？这将恢复所有设置为默认值。', '重置设置', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                resetSettings()
                ElMessage.success('设置已重置')
            })
            .catch(() => {
                // 用户取消
            })
    }
</script>

<style scoped>
    /* 设置面板适配主题 */
    .settings-panel {
        background: var(--settings-bg-color);
    }

    .settings-content {
        padding: 0;
        background: var(--settings-bg-color);
    }

    .settings-section {
        padding: 20px;
        border-bottom: 1px solid var(--app-border-color);
    }

    .settings-section:last-child {
        border-bottom: none;
    }

    .section-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 600;
        color: var(--app-text-color);
        margin-bottom: 16px;
    }

    .section-title .el-icon {
        font-size: 16px;
        color: var(--app-text-secondary);
    }

    .theme-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .theme-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        border: 1px solid var(--app-border-color);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        background: var(--card-bg-color);
    }

    .theme-option:hover {
        border-color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
    }

    .theme-option.active {
        border-color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
    }

    .theme-preview {
        width: 40px;
        height: 28px;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        border: 1px solid var(--app-border-color);
        flex-shrink: 0;
    }

    .preview-sidebar {
        width: 14px;
        height: 100%;
    }

    .preview-content {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .preview-header {
        height: 10px;
        width: 100%;
    }

    .preview-main {
        flex: 1;
        width: 100%;
    }

    .theme-info {
        flex: 1;
    }

    .theme-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--app-text-color);
    }

    .theme-check {
        position: absolute;
        top: 6px;
        right: 6px;
        font-size: 14px;
        color: var(--el-color-primary);
    }

    .setting-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
    }

    .setting-item:not(:last-child) {
        border-bottom: 1px solid var(--app-border-color);
    }

    .setting-label {
        flex: 1;
    }

    .setting-label span {
        display: block;
        font-size: 13px;
        color: var(--app-text-color);
    }

    /* 响应式 */
    @media (max-width: 768px) {
        .settings-panel :deep(.el-drawer) {
            width: 100% !important;
        }

        .settings-section {
            padding: 16px;
        }
    }
</style>
