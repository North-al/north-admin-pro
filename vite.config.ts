import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import * as path from 'path'

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
    }
})
