<template>
  <div style="padding: 10px">
    <Editor v-model="content" placeholder="请输入内容" />
    <span>{{ content }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Editor from '@/components/editor/editor.vue'

const content = ref('')
</script>

<style lang="scss">
:root {
  --u-color-white: #ffffff;
  --u-color-black: #000000;

  // 背景
  --u-bg-color: #ffffff;
  --u-bg-color-overlay: #f7f7f7;
  --u-bg-color-secondary: #f2f3f5;

  // 边框
  --u-border-color: #f0f0f0;
  --u-border-color-light: #e4e7ed;
  --u-border-color-dark: #d4d7de;

  // 填充
  --u-fill-color: #f0f2f5;
  --u-fill-color-light: #dcdfe6;
  --u-fill-color-dark: #ebedf0;

  // 文本
  --u-text-color: #303133;
  --u-text-color-regular: #606266;
  --u-text-color-secondary: #909399;
  --u-text-color-placeholder: #a8abb2;
  --u-text-color-disabled: #c0c4cc;
  --u-text-color-dark: #000000;

  // 阴影
  --u-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
  --u-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, 0.12);
  --u-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, 0.12);
  --u-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, 0.08), 0px 12px 32px rgba(0, 0, 0, 0.12),
    0px 8px 16px -8px rgba(0, 0, 0, 0.16);

  // 主题
  --u-color-primary: #409eff;
  --u-color-primary-light-3: #79bbff;
  --u-color-primary-light-5: #a0cfff;
  --u-color-primary-light-7: #c6e2ff;
  --u-color-primary-light-8: #d9ecff;
  --u-color-primary-light-9: #020508;
  --u-color-primary-dark-2: #337ecc;
  --u-color-success: #67c23a;
  --u-color-success-light-3: #95d475;
  --u-color-success-light-5: #b3e19d;
  --u-color-success-light-7: #d1edc4;
  --u-color-success-light-8: #e1f3d8;
  --u-color-success-light-9: #f0f9eb;
  --u-color-success-dark-2: #50cf97;
  --u-color-warning: #e6a23c;
  --u-color-warning-light-3: #eebe77;
  --u-color-warning-light-5: #f3d19e;
  --u-color-warning-light-7: #f8e3c5;
  --u-color-warning-light-8: #0e0801;
  --u-color-warning-light-9: #fdf6ec;
  --u-color-warning-dark-2: #b88230;
  --u-color-danger: #f56c6c;
  --u-color-danger-light-3: #f89898;
  --u-color-danger-light-5: #fab6b6;
  --u-color-danger-light-7: #fcd3d3;
  --u-color-danger-light-8: #fde2e2;
  --u-color-danger-light-9: #fef0f0;
  --u-color-danger-dark-2: #c45656;
  --u-color-error: #f56c6c;
  --u-color-error-light-3: #f89898;
  --u-color-error-light-5: #fab6b6;
  --u-color-error-light-7: #fcd3d3;
  --u-color-error-light-8: #fde2e2;
  --u-color-error-light-9: #fef0f0;
  --u-color-error-dark-2: #c45656;
  --u-color-info: #909399;
  --u-color-info-light-3: #b1b3b8;
  --u-color-info-light-5: #c8c9cc;
  --u-color-info-light-7: #dedfe0;
  --u-color-info-light-8: #e9e9eb;
  --u-color-info-light-9: #f4f4f5;
  --u-color-info-dark-2: #73767a;
}
html.dark {
  --u-bg-color: #141414;
  --u-bg-color-overlay: #1d1e1f;
  --u-bg-color-secondary: #303030;

  --u-text-color: #e5eaf3;
  --u-text-color-regular: #cfd3dc;
  --u-text-color-secondary: #a3a6ad;
  --u-text-color-placeholder: #8d9095;
  --u-text-color-disabled: #6c6e72;
  --u-text-color-dark: #ffffff;

  --u-border-color: #4c4d4f;
  --u-border-color-light: #414243;
  --u-border-color-dark: #58585b;

  --u-fill-color: #303030;
  --u-fill-color-dark: #39393a;
  --u-fill-color-light: #262727;

  --u-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.36), 0px 8px 20pxrgba (0, 0, 0, 0.72);
  --u-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, 0.72);
  --u-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, 0.72);
  --u-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, 0.72), 0px 12px 32px #000000, 0px 8px 16px -8px #000000;

  --u-color-primary: #409eff;
  --u-color-primary-light-3: #3375b9;
  --u-color-primary-light-5: #2a598a;
  --u-color-primary-light-7: #213d5b;
  --u-color-primary-light-8: #1d3043;
  --u-color-primary-light-9: #18222c;
  --u-color-primary-dark-2: #66b1ff;
  --u-color-success: #67c23a;
  --u-color-success-light-3: #4e8e2f;
  --u-color-success-light-5: #3e6b27;
  --u-color-success-light-7: #2d481f;
  --u-color-success-light-8: #25371c;
  --u-color-success-light-9: #1c2518;
  --u-color-success-dark-2: #54e3b6;
  --u-color-warning: #e6a23c;
  --u-color-warning-light-3: #a77730;
  --u-color-warning-light-5: #7d5b28;
  --u-color-warning-light-7: #533f20;
  --u-color-warning-light-8: #3e301c;
  --u-color-warning-light-9: #292218;
  --u-color-warning-dark-2: #ebb563;
  --u-color-danger: #f56c6c;
  --u-color-danger-light-3: #b25252;
  --u-color-danger-light-5: #854040;
  --u-color-danger-light-7: #582e2e;
  --u-color-danger-light-8: #412626;
  --u-color-danger-light-9: #2b1d1d;
  --u-color-danger-dark-2: #f78989;
  --u-color-error: #f56c6c;
  --u-color-error-light-3: #b25252;
  --u-color-error-light-5: #854040;
  --u-color-error-light-7: #582e2e;
  --u-color-error-light-8: #412626;
  --u-color-error-light-9: #2b1d1d;
  --u-color-error-dark-2: #f78989;
  --u-color-info: #909399;
  --u-color-info-light-3: #6b6d71;
  --u-color-info-light-5: #525457;
  --u-color-info-light-7: #393a3c;
  --u-color-info-light-8: #080816;
  --u-color-info-light-9: #202121;
  --u-color-info-dark-2: #a6a9ad;
}
</style>
