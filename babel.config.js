const plugins = [
  [
    'component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }
  ],
  [
    'import',
    {
      libraryName: 'ty-pc',
      camel2DashComponentName: false
    }
  ]
]

// 生产环境移除console
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}

module.exports = {
  plugins,
  presets: ['@vue/cli-plugin-babel/preset']
}
