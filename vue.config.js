const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
  },
  configureWebpack: {
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000 // Check for changes every second
    },
    // mode: 'development',
    mode: 'production',
    /* resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      }
    }, */
    module: {
      /* rules: [{
        test: /\.(png|jpg|jpeg|webp|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }] */
    },
    plugins: [
      new CopyPlugin([
        { from: 'src/assets/img', to: outputDirectory + '/img' },
        { from: 'src/svg', to: outputDirectory + '/svg' },
        { from: 'src/assets/fonts', to: outputDirectory + '/fonts' }
      ]),
      new HtmlWebpackPlugin({
        entry: 'src/main.js',
        template: 'src/views/index.html',
        inject: true,
        chunks: ['chunk-vendors', 'chunk-common', 'index'],
        filename: 'index.html'
      }) // ,
      /* new HtmlWebpackPlugin({
        entry: 'src/video.js',
        template: 'src/views/video.html',
        inject: true,
        chunks: ['chunk-vendors', 'chunk-common', 'video'],
        filename: 'video.html'
      }) */
    ]
  },
  pages: {
    main: {
      entry: 'src/main.js',
      template: 'src/views/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    /* video: {
      entry: 'src/video.js',
      template: 'src/views/video.html',
      filename: 'video.html',
      title: 'Video Page',
      chunks: ['chunk-vendors', 'chunk-common', 'video']
    } */
  },
  css: {
    loaderOptions: {
      css: {
        url: (url, resourcePath) => {
          // Don't handle `.png` urls
          if (url.includes('.png')) {
            return false
          }

          return true
        }
      }
    }
  }
}
