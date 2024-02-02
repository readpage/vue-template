import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import externalGlobals from 'rollup-plugin-external-globals'
import UnoCSS from 'unocss/vite'
import transformerDirectives from '@unocss/transformer-directives'
import { resolve } from 'path'
import pkg from './package.json'

const project = 'vue-template'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
          if (id.includes('node_modules')) {
            const match = id.split('node_modules/')[1].split('/')[0]
            const split = ['nprogress']
            if (split.includes(match)) {
              return match
            }
          }
          if (id.includes('iconpark.js')) {
            // 需要单独分割那些资源 就写判断逻辑就行
            return 'iconpark'
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
      },
      plugins: [
        //此项只会在打包的文件中使用，未打包状态下的dev模式中不会走这里
        externalGlobals({
          // 如果您想过滤掉包导入，例如import ElementPlus from 'element-plus'
          //其中key就是你引入的时候的名字，value就是引入的那个第三方库的全局变量名字
          vue: 'Vue',
          axios: 'axios',
          pinia: 'Pinia',
          'vue-router': 'VueRouter',
          'element-plus': 'ElementPlus',
          'element-plus/dist/index.css': 'element-plus/dist/index.css',
          'undraw-ui': 'UndrawUi',
          'undraw-ui/dist/style.css': 'undraw-ui/dist/style.css'
        }) as any
      ]
    }
  }
})
