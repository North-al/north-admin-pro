import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import * as path from 'path'
import { elementPlusOptimizeDeps } from './build/element-plus'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
                {
                    // add any other imports you were relying on
                }
            ],
            dts: 'src/typings/auto-imports.d.ts',
            dirs: ['src/stores'],
            vueTemplate: true,
            eslintrc: {
                enabled: true, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            dts: 'src/typings/components.d.ts',
            extensions: ['vue'], // extensions: ['vue']
            deep: true,
            include: [/\.vue$/, /\.vue\?vue/],
            exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
        })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `@use "~/styles/el-dark.scss" as *;`
            }
        }
    },
    build: {
        cssCodeSplit: true,
        // 预加载一些组件、模块等
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('vue')) {
                            return 'vue'
                        }
                        if (id.includes('element-plus')) {
                            return 'element-plus'
                        }
                        if (id.includes('pinia')) {
                            return 'pinia'
                        }
                        return 'vendor'
                    }

                    // 将 src/components 下的组件打包到 components 中
                    if (id.includes('src/components')) {
                        return 'components'
                    }

                    if (id.includes('src/hooks') || id.includes('src/utils')) {
                        return 'hooks-utils'
                    }
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        }
    },
    optimizeDeps: {
        include: ['vue', 'vue-router', 'pinia', 'element-plus', 'element-plus/es', ...elementPlusOptimizeDeps()]
    }
})
