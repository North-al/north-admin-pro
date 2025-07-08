<script setup lang="ts">
    interface Props {
        collapsed: boolean
    }

    defineProps<Props>()
    const router = useRouter()
    const route = useRoute()

    // 菜单数据 - 这里可以从路由配置或API获取
    const menuItems = ref([
        {
            path: '/dashboard',
            title: '仪表板',
            icon: 'odometer',
            children: [
                {
                    path: '/dashboard',
                    title: '分析页',
                    icon: 'data-analysis'
                },
                {
                    path: '/workplace',
                    title: '工作台',
                    icon: 'monitor'
                },
                {
                    path: '/e-commerce',
                    title: '电子商务',
                    icon: 'shopping-cart'
                }
            ]
        },
        {
            path: '/model-center',
            title: '模板中心',
            icon: 'folder',
            children: [
                {
                    path: '/model/list',
                    title: '模板列表',
                    icon: 'document'
                },
                {
                    path: '/model/category',
                    title: '分类管理',
                    icon: 'collection'
                }
            ]
        },
        {
            path: '/design-center',
            title: '设计中心',
            icon: 'edit',
            children: [
                {
                    path: '/design/canvas',
                    title: '画布设计',
                    icon: 'picture'
                },
                {
                    path: '/design/assets',
                    title: '素材库',
                    icon: 'files'
                }
            ]
        },
        {
            path: '/function-demo',
            title: '功能示例',
            icon: 'cpu'
        },
        {
            path: '/system',
            title: '系统管理',
            icon: 'setting',
            children: [
                {
                    path: '/system/user',
                    title: '用户管理',
                    icon: 'user'
                },
                {
                    path: '/system/role',
                    title: '角色管理',
                    icon: 'avatar'
                },
                {
                    path: '/system/menu',
                    title: '菜单管理',
                    icon: 'menu'
                }
            ]
        },
        {
            path: '/document-manage',
            title: '文章管理',
            icon: 'document'
        },
        {
            path: '/result-page',
            title: '结果页面',
            icon: 'checked'
        },
        {
            path: '/exception-page',
            title: '异常页面',
            icon: 'warning'
        },
        {
            path: '/operation-manage',
            title: '运维管理',
            icon: 'tools'
        },
        {
            path: '/help-center',
            title: '帮助中心',
            icon: 'question'
        },
        {
            path: '/update-log',
            title: '更新日志',
            icon: 'notebook',
            badge: 'v2.6.1'
        }
    ])

    // 当前激活的菜单
    const activeMenu = computed(() => route.path)

    // 处理菜单点击
    const handleMenuClick = (path: string) => {
        if (path !== route.path) {
            router.push(path)
        }
    }
</script>

<template>
    <div class="sidebar-menu" :data-theme="$attrs['data-theme']">
        <el-menu
            :default-active="activeMenu"
            :collapse="collapsed"
            :unique-opened="true"
            background-color="transparent"
            text-color="#8b949e"
            active-text-color="#58a6ff"
            :collapse-transition="false"
            mode="vertical">
            <template v-for="item in menuItems" :key="item.path">
                <!-- 有子菜单的情况 -->
                <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </template>

                    <el-menu-item
                        v-for="child in item.children"
                        :key="child.path"
                        :index="child.path"
                        @click="handleMenuClick(child.path)">
                        <el-icon>
                            <component :is="child.icon" />
                        </el-icon>
                        <span>{{ child.title }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <!-- 没有子菜单的情况 -->
                <el-menu-item v-else :index="item.path" @click="handleMenuClick(item.path)">
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.title }}</span>
                    <el-badge v-if="item.badge" :value="item.badge" class="menu-badge" />
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
    /* 侧边栏菜单样式已移至主题文件和全局样式 */
</style>
