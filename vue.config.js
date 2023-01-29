const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const defaultSettings = require('./src/settings.js')

const { title } = defaultSettings
function resolvePath(dir) {
  return path.resolve(__dirname, dir)
}

/**
 * vue 脚手架配置
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    port: 9100,
    open: true, // 浏览器自动打开页面
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack(_config) {
    _config.name = title
    // 入口文件
    if (process.env.NODE_ENV === 'production') {
      // 打包生产.gz 压缩包
      _config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },
  chainWebpack(_config) {
    _config.plugins.delete('preload').delete('prefetch') // TODO: need test

    // set preserveWhitespace
    _config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // 修改 html-webpack-plugin 中的 options 变量，用于 index.html
    _config.plugin('html').tap((args) => {
      args[0].title = title // 修改此项目的浏览器标签标题
      return args
    })

    _config.when(process.env.NODE_ENV === 'development', (_config_) =>
      _config_.devtool('cheap-source-map')
    )
    _config.when(process.env.NODE_ENV !== 'development', (_config_) => {
      _config_
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      _config_.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs', // 打包后的文件名
            test: /[\\/]node_modules[\\/]/, // 匹配对应文件
            priority: 10, // 优先级配置，优先匹配优先级更高的规则，不设置的规则优先级默认为0
            chunks: 'initial' // 打包规则
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 31,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          },
          tyPc: {
            name: 'chunk-tyPc',
            priority: 25,
            test: /[\\/]node_modules[\\/]_?ty-pc(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolvePath('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    })
  },
  css: {
    loaderOptions: {
      sass: {
        // 导入全局样式变量
        data: '@import "~@/assets/styles/variable.scss";'
      }
    }
  }
}

module.exports = config
