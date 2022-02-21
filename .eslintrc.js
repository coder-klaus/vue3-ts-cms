module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'max-len': ['error', 120],
    'no-console': import.meta.env.MODE === 'production' ? 'error' : 'warn',
    'no-debugger': import.meta.env.MODE === 'production' ? 'error' : 'warn',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off'
  }
}
