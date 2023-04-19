// 配置信息
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  settings: {},
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用该any类型。
    '@typescript-eslint/no-unused-vars': 'off', //禁止未使用的变量
    'vue/valid-template-root': 'off',
    'vue/no-v-html': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/multi-word-component-names': 'off',
    endOfLine: 'auto', // 添加忽略换行格式的检查。
    'vue/require-default-prop': 'off' // props 需要设置默认值
  }
}
