<template>
  <Child title="发送" @submit="submit" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Child from './components/child.vue'

const submit = (v: string) => {
  console.log(v)
}
</script>

<style lang="scss" scoped></style>
