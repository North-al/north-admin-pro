<script setup lang="ts">
    // 页面组件，标题通过路由meta配置
</script>

<template>
    <div class="page-container">
        <el-card>
            <template #header>
                <div class="card-header">
                    <h2>用户管理</h2>
                    <el-button type="primary" :icon="'Plus'">新增用户</el-button>
                </div>
            </template>

            <div class="content">
                <p>这是用户管理页面，用于测试二级菜单的面包屑导航。</p>
                <p>当前路径：<code>/system/user</code></p>
                <p>面包屑应该显示：系统管理 / 用户管理</p>

                <el-divider />

                <div class="demo-info">
                    <h3>面包屑导航优化说明</h3>
                    <ul>
                        <li>✅ 自动根据路由层级生成面包屑</li>
                        <li>✅ 支持点击上级菜单进行导航</li>
                        <li>✅ 当前页面标题不可点击</li>
                        <li>✅ 避免了误导性的"首页"显示</li>
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
