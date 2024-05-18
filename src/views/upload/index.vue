<template>
  <div>
    <el-upload ref="uploadRef" style="width: 200px" drag :http-request="upload">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        <em>导入</em>
      </div>
      <!-- <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template> -->
    </el-upload>
    <el-button @click="download()">下载</el-button>
    <el-progress style="width: 400px" :percentage="percentage" :color="customColors" />
    <el-button @click="task()">切换</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios'
import { UploadInstance, UploadRequestOptions } from 'element-plus'

const uploadRef = ref<UploadInstance>()

// 使用上传文件之前的钩子来进行自定义文件上传
function upload(param: UploadRequestOptions) {
  // uploadRef.value!.clearFiles()
  const file = param.file
  const formData = new FormData()
  formData.append('file', file)
  axios({
    method: 'post',
    url: '/api/file/upload',
    data: formData
  }).then(res => {
    console.log(res.data)
  })
}

const percentage = ref(0)
const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#6f7ad3', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#5cb87a', percentage: 100 }
]

function download() {
  axios({
    url: '/api/file/download?filePath=/upload/test2.xlsx',
    method: 'get',
    responseType: 'blob',
    onDownloadProgress: progressEvent => {
      // 获取到已下载的大小
      const loaded = progressEvent.loaded
      // 获取到文件总大小
      const total = progressEvent.total
      // 计算下载进度
      const percent = total ? parseFloat(((loaded / total) * 100).toFixed(2)) : 100
      percentage.value = percent
      // 打印下载进度
      console.log(loaded, total, '下载进度：' + percent + '%')
    }
  }).then(res => {
    // 从响应头中获取Content-Disposition
    const contentDisposition = res.headers['content-disposition']
    if (contentDisposition) {
      let filename = contentDisposition.split('filename=')[1]
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', decodeURIComponent(filename))
      document.body.appendChild(link)
      link.click()
    }
  })
}

/**
 * 定时器 支持(多次)执行切换开启/关闭
 * @param fn 执行的函数
 * @param interval 执行间隔 秒(s)
 * @returns
 * 用法:
 * (1) 定义函数初始化
 * const task = interval(() => {
 * console.log('定时器正在运行...')
 * })
 *
 * 执行:
 * task() 开启， 再次执行task() 关闭
 */
const interval = (fn: (...args: any) => void, interval = 1000) => {
  let timer: any = null
  const _interval = (...args: any) => {
    if (!timer) {
      timer = setInterval(() => {
        fn.apply(this, args)
      }, interval)
    } else {
      _interval.close()
    }
  }
  _interval.close = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }
  return _interval
}

const task = interval(() => {
  console.log('定时器正在运行...')
})
</script>

<style lang="scss" scoped></style>
