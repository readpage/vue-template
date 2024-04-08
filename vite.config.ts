import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import transformerDirectives from '@unocss/transformer-directives'
import { resolve } from 'path'
import pkg from './package.json'

const project = 'vue-template'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    UnoCSS({
      transformers: [transformerDirectives()]
    }),
    vue()
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve('src')
      }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  // 打包
  build: {
    // 打包输出目录
    outDir: project,
    minify: true, //是否进行压缩
    chunkSizeWarningLimit: 1000, // 设置警告阈值为 1000 kb
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: `assets/js/[name]-[hash].js`,
        chunkFileNames: `assets/js/[name]-[hash].js`,
        assetFileNames: `assets/css/[name]-[hash].[ext]`,
        banner: `/*! Version: v${pkg.version} */`,
        manualChunks(id) {
          // 最小化拆分包
          if (id.includes('node_modules/.pnpm')) {
            return id.split('node_modules/.pnpm')[1].split('/')[3]
          }
          if (id.includes('iconpark.js')) {
            // 需要单独分割那些资源 就写判断逻辑就行
            return 'iconpark'
          }
          if (id.includes('.svg')) {
            // 需要单独分割那些资源 就写判断逻辑就行
            return 'svg/svg'
          }
          // if (id.includes('style.css')) {
          //   // 需要单独分割那些资源 就写判断逻辑就行
          //   return 'src/style.css'
          // }
          // if (id.includes('HelloWorld.vue')) {
          //   // 单独分割hello world.vue文件
          //   return 'src/components/HelloWorld.vue'
          // }
        }
      }
    }
  }
})
