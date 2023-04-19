import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import externalGlobals from 'rollup-plugin-external-globals'
import { resolve } from 'path'

const project = 'vue-template'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [DefineOptions(), vue()],
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
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:9000',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // }
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
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        // css文件名
        assetFileNames: `assets/[name].[ext]`
      },
      plugins: [
          //此项只会在打包的文件中使用，未打包状态下的dev模式中不会走这里
          externalGlobals({
            // 如果您想过滤掉包导入，例如import ElementPlus from 'element-plus'
            //其中key就是你引入的时候的名字，value就是引入的那个第三方库的全局变量名字
            vue: 'Vue',
            'element-plus': 'ElementPlus',
            'element-plus/dist/index.css': 'element-plus/dist/index.css'
          })
      ]
    }
  }
})
