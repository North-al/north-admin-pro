<template>
    <div class="login-container">
        <div class="login-form-wrapper">
            <div class="login-form-header">
                <img src="/logo-black.png" alt="Logo" class="logo" />
                <h1 class="title">North Admin Pro</h1>
                <p class="subtitle">一个功能强大且美观的后台管理系统</p>
            </div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        placeholder="密码：任意"
                        show-password
                        @keyup.enter="handleLogin">
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="flex-between">
                        <el-checkbox v-model="rememberMe">记住我</el-checkbox>
                        <el-link type="primary">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">
                        登 录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import type { FormInstance, FormRules } from 'element-plus'

    const router = useRouter()
    const loginFormRef = ref<FormInstance>()
    const loading = ref(false)
    const rememberMe = ref(false)

    const loginForm = reactive({
        username: 'admin',
        password: 'password'
    })

    const loginRules = reactive<FormRules>({
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    })

    const handleLogin = () => {
        loginFormRef.value?.validate(valid => {
            if (valid) {
                loading.value = true
                // 模拟登录
                setTimeout(() => {
                    loading.value = false
                    // TODO: 保存token和用户信息
                    router.push('/')
                }, 1000)
            }
        })
    }
</script>

<style lang="scss" scoped>
    .login-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
    }

    .login-form-wrapper {
        width: 400px;
        padding: 40px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .login-form-header {
        text-align: center;
        margin-bottom: 30px;

        .logo {
            height: 40px;
        }

        .title {
            font-size: 24px;
            margin-top: 10px;
        }

        .subtitle {
            color: #888;
            font-size: 14px;
        }
    }

    .flex-between {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .login-btn {
        width: 100%;
    }
</style>
