const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const outputDirectory = path.resolve(__dirname, 'dist/')

module.exports = {
  outputDir: outputDirectory,
  // publicPath: '/static/',
  lintOnSave: true,
  // filenameHashing: false,
  runtimeCompiler: true,
  // chainWebpack: config => {
  //   config.optimization.delete('splitChunks')
  // },
  configureWebpack: {
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000 // Check for changes every second
    },
    mode: 'development',
    // mode: 'production',
    /* resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      }
    }, */
    plugins: [
      new CopyPlugin([
        { from: 'src/assets/img', to: outputDirectory + '/img' },
        { from: 'src/assets/svg', to: outputDirectory + '/svg' },
        { from: 'src/assets/fonts', to: outputDirectory + '/fonts' }
      ]),
      new HtmlWebpackPlugin({
        entry: 'src/main.js',
        template: 'src/views/index.html',
        inject: true,
        chunks: ['chunk-vendors', 'chunk-common', 'index'],
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        entry: 'src/video.js',
        template: 'src/views/video.html',
        inject: true,
        chunks: ['chunk-vendors', 'chunk-common', 'video'],
        filename: 'video.html'
      })
    ]
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/views/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    video: {
      entry: 'src/video.js',
      template: 'src/views/video.html',
      filename: 'video.html',
      title: 'Video Page',
      chunks: ['chunk-vendors', 'chunk-common', 'video']
    }
  }
}
