<script setup lang="ts">
    import zh from 'element-plus/es/locale/lang/zh-cn'
    import en from 'element-plus/es/locale/lang/en'
    import { useFullscreen } from './hooks'
    import { fetchCompanyInfo } from './api/modules/user'

    const { init, dispose } = useFullscreen()
    onMounted(() => {
        init()

        fetchCompanyInfo({
            page: 1,
            limit: 1,
            module: 'home',
            langCode: 'zh-CN'
        }).then(res => {
            console.log(res.data.total)
        })
    })

    onUnmounted(() => {
        dispose()
    })
</script>

<template>
    <el-config-provider :locale="zh">
        <router-view></router-view>
    </el-config-provider>
</template>

<style scoped lang="scss"></style>
