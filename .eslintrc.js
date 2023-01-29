module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],

        extensions: ['.js', '.jsx'] // ***2.解决引入问题
      }
    }
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/html-self-closing': 'off',
    // "consistent-return":"off",  // 返回类型一致性
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'vue/no-template-shadow': 'off',
    'no-param-reassign': 'off',
    'vue/multi-word-component-names': 'off',
    'prefer-const': 'off',
    'import/no-cycle': 'off',
    // 后面加的===
    'no-unused-vars': 'off',
    'prefer-regex-literals': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-syntax': 'off',
    'no-loss-of-precision': 'off',
    'no-array-constructor': 'off',
    'vars-on-top': 'off',
    'no-extend-native': 'off',
    'no-var': 'off',
    'block-scoped-var': 'off',
    'guard-for-in': 'off',
    radix: 'off',
    'no-nested-ternary': 'off',
    'no-self-assign': 'off',
    'prefer-rest-params': 'off',
    eqeqeq: ['off'],
    'no-shadow': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'array-callback-return': 'off',
    'default-case': 'off',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': 'off',
    'no-unused-expressions': 'off',
    'no-multi-assign': 'off',
    'no-useless-escape': 'off',
    'no-cond-assign': 'off',
    'import/no-mutable-exports': 'off',
    'no-void': 'off',
    'no-restricted-properties': 'off',
    'prefer-spread': 'off'
  }
}
