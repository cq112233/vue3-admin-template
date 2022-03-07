
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  devServer: {
    hot: true,
    proxy: {
      '/api': {
        // 这里最好有一个 /
        target: 'http://localhost:8011/', // 服务器端接口地址
        ws: true, // 如果要代理 websockets，配置这个参数
        // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/gateway': {
        target: 'http://newapi.zhihuishitang.net',
        changeOrigin: true
      },
      '/report': {
        target: 'https://test-api-report.zhihuishitang.net',
        changeOrigin: true
      },
      '/attendance': {
        target: 'http://192.168.1.235:8500',
        changeOrigin: true
      }
    },
    // 静态资源目录
    contentBase: './public',
    // gzip 压缩
    compress: true,
    // 端口号
    port: 8080,
    // 热更新，不需要刷新浏览器 大大提高开发速度    hot 跟 hotOnly  hotOnly 热替换失败不会自动刷新便于找到问题
    // hotOnly: true,
    // 开启
    open: false
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @use "@/theme/${process.env.organization}/elementPlus/index.scss" as *;
        `
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  chainWebpack: (config) => {
    // 合并环境变量
    config.plugin('define').tap((args) => {
      args[0]['process.env'].SELF_CONFIG = JSON.stringify(process.env)
      return args
    })
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    // 添加要替换的 loader
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]' // icon图标使用时的命名
      })
      .end()

    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          hoistUseStatements: true,
          resources: [`./src/theme/${process.env.organization}/custom/index.scss`, './src/theme/variables.scss']
        })
        .end()
    })
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '*': resolve(''),
        Assets: resolve('src/assets')
      },
      extensions: ['.ts', '.tsx', '.js', '.json', '.vue', '.css', '.less', 'scss', '.html'],
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src/components/common'),
        path.resolve(__dirname, 'src/components/global')
      ]
    },
    module: {
      rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass'
        })]
      })
    ]
  }
}
