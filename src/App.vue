<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import {} from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { AMenu } from './api';
const locale = zhCn

</script>
<style lang="scss">

</style>
