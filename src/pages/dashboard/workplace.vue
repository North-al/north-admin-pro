<script setup lang="ts">
    // 工作台页面
</script>

<template>
    <div class="page-container">
        <el-card>
            <template #header>
                <h2>工作台</h2>
            </template>

            <div class="content">
                <p>这是工作台页面，用于测试单级菜单的面包屑导航。</p>
                <p>当前路径：<code>/workplace</code></p>
                <p>面包屑应该显示：工作台</p>

                <el-divider />

                <div class="demo-info">
                    <h3>面包屑测试说明</h3>
                    <ul>
                        <li>✅ 单级菜单显示当前页面标题</li>
                        <li>✅ 不会显示误导性的"首页"</li>
                        <li>✅ 标题来自路由meta配置</li>
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
