// const CopyPlugin = require('copy-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const path = require('path')

// const outputDirectory = path.resolve(__dirname, 'dist/')
const outputDirectory = '/home/asat/projects/rs.lc/web/static'

module.exports = {
  outputDir: outputDirectory,
  publicPath: '/static/',
  lintOnSave: true,
  filenameHashing: false,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10 }))
  },
  configureWebpack: {
    /* watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000 // Check for changes every second
    },
    mode: 'development', */
    mode: 'production',
    /* resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      }
    }, */
  },
  pages: {
    main: {
      entry: 'src/main.js',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['index']
    }
  }
}
