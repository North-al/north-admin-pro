<script setup lang="ts">
    // 页面组件，标题通过路由meta配置
</script>

<template>
    <div class="page-container">
        <el-card>
            <template #header>
                <h2>三级菜单页面</h2>
            </template>

            <div class="content">
                <p>这是一个三级菜单页面，用于测试面包屑导航功能。</p>
                <p>当前路径：<code>/example/level1/level2</code></p>
                <p>面包屑应该显示：多级菜单示例 / 二级菜单 / 三级菜单页面</p>

                <el-divider />

                <h3>面包屑功能说明</h3>
                <ul>
                    <li>✅ 根据路由层级自动生成面包屑</li>
                    <li>✅ 支持点击跳转到上级页面</li>
                    <li>✅ 当前页面不可点击</li>
                    <li>✅ 顶级页面可以设置不显示面包屑</li>
                    <li>✅ 避免了强制显示"首页"的问题</li>
                </ul>
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
</style>
