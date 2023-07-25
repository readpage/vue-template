<template>
  <div>
    <span class="text-[32px] bg-clip-text text-transparent bg-gradient-to-tr from-pink-500 to-violet-500">
      Hello world
    </span>
    <div class="space-x-4">
      <span>appStore: {{ count }}</span>
      <el-button @click="increment">increment</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { count } = storeToRefs(appStore)
const { increment } = appStore
</script>

<style lang="scss" scoped></style>
