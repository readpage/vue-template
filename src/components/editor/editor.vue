<template>
  <div class="u-editor" :class="{ active: active }">
    <div
      ref="editorRef"
      class="rich-input"
      contenteditable="true"
      :placeholder="placeholder"
      @focus="onFocus"
      @input="onInput"
      @blur="onBlur"
      @keydown.enter="keyDown"
      @paste="pasteFn"
      v-html="text"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { UToast, isEmpty } from 'undraw-ui';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

defineOptions({
  name: 'UEditor'
})

interface Props {
  placeholder?: string
  modelValue: string
  minHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  minHeight: 30
})

const range = ref<Range>()
const editorRef = ref<HTMLDivElement>()
const text = ref()
const isLocked = ref(false)
const active = ref(false)

const minHeight = computed(() => props.minHeight + 'px')

const padding = computed(() => (props.minHeight == 30 ? '4px 10px' : '8px 12px'))

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'input', event: Event): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'submit'): void
}>()

watch(
  () => props.modelValue,
  val => {
    if (val == '<br>') {
      clear()
    }
    if (!isLocked.value) text.value = val
  }
)

function onFocus(event: Event) {
  emit('focus', event)
  isLocked.value = true
  active.value = true
}

function focus() {
  nextTick(() => {
    editorRef.value?.focus()
  })
}

function onBlur(event: Event) {
  // 记录光标
  range.value = getRange(document.getSelection())
  emit('blur', event)
  if (!editorRef.value?.innerHTML) active.value = false
  isLocked.value = false
}

// 获取光标
function getRange(v: Selection | null) {
  try {
    return v ? v.getRangeAt(0) : undefined
  } catch (e) {}
  return undefined
}

function onInput(event: Event) {
  const { innerHTML } = event.target as HTMLDivElement
  emit('update:modelValue', innerHTML)
  emit('input', event)
}

// 光标处追加内容
function addText(val: string) {
  let selection = window.getSelection()
  if (selection) {
    selection.removeAllRanges()
    // 为空初始化光标
    if (!range.value) {
      editorRef.value?.focus()
      range.value = selection.getRangeAt(0)
    }
    // 删除选中内容
    range.value.deleteContents()

    // 添加内容
    range.value.insertNode(range.value.createContextualFragment(val))

    range.value.collapse(false)
    selection.addRange(range.value)

    emit('update:modelValue', editorRef.value?.innerHTML || '')
    const event = editorRef.value as unknown as Event
    emit('input', event)
  }
}

// 清空内容
function clear() {
  if (editorRef.value) {
    editorRef.value.innerHTML = ''
    emit('update:modelValue', editorRef.value.innerHTML)
    active.value = false
  }
}

// 键盘事件
const keyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key == 'Enter') {
    //用户点击了ctrl+enter触发
    // console.log('ctrl+enter')
    if (isEmpty(props.modelValue.replace(/&nbsp;|<br>| /g, ''))) {
      UToast({ message: '内容不能为空', type: 'info' })
    } else {
      emit('submit')
    }
  } else {
    //用户点击了enter触发
    // console.log('enter')
  }
}

// 粘贴事件
function pasteFn(event: ClipboardEvent) {
  const clipboardData = event.clipboardData
  if (clipboardData) {
    const text = clipboardData.getData('text/plain')
    const file = clipboardData.items.length > 0 ? clipboardData.items[0].getAsFile() : null
    if (text) {
      event.preventDefault() // 阻止默认的粘贴行为
      document.execCommand('insertText', false, text) // 插入纯文本
    } else if (file) {
      console.log(file)
      event.preventDefault() // 阻止默认的粘贴行为
      // 处理粘贴的文件，例如上传到服务器
      // emit('paste', event, file)
    }
  }
}

onMounted(() => {
  editorRef.value?.addEventListener('keyup', (event: Event) => {
    const el = event.target as HTMLDivElement
    if (el.innerHTML == '<br>') {
      el.innerHTML = ''
    }
  })
})

defineExpose({
  addText,
  clear,
  focus
})
</script>

<style lang="scss" scoped>
@use './style/editor.scss' with (
  $minHeight: v-bind(minHeight),
  $padding: v-bind(padding)
);
</style>
