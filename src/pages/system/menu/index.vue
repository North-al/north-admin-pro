<script setup lang="ts">
    // 菜单管理页面
</script>

<template>
    <div class="page-container">
        <el-card>
            <template #header>
                <div class="card-header">
                    <h2>菜单管理</h2>
                    <el-button type="primary" :icon="'Plus'">新增菜单</el-button>
                </div>
            </template>

            <div class="content">
                <p>这是菜单管理页面，用于测试二级菜单的面包屑导航。</p>
                <p>当前路径：<code>/system/menu</code></p>
                <p>面包屑应该显示：系统管理 / 菜单管理</p>

                <el-divider />

                <div class="demo-info">
                    <h3>面包屑导航测试</h3>
                    <ul>
                        <li>✅ 显示完整的导航路径</li>
                        <li>✅ 支持点击上级菜单导航</li>
                        <li>✅ 当前页面不可点击</li>
                        <li>✅ 标题来自路由meta配置</li>
                        <li>🎯 这个页面有"New"徽章</li>
                    </ul>
                </div>
            </div>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
    .page-container {
        padding: 20px;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
            margin: 0;
        }
    }

    .content {
        line-height: 1.6;

        code {
            background: var(--el-color-info-light-9);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }

        ul {
            margin: 16px 0;
            padding-left: 20px;

            li {
                margin: 8px 0;
            }
        }
    }

    .demo-info {
        margin-top: 20px;
    }
</style>
