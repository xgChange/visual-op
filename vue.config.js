const isProd = process.env.NODE_ENV === 'production'

const pages = {
  main: {
    entry: 'src/main.ts',
    template: 'public/index.html',
    filename: 'index.html',
    title: '管理系统'
  },
  subpage: {
    entry: 'src/subpage/main.ts',
    template: 'public/index.html',
    filename: 'subpage.html'
  }
}

module.exports = {
  publicPath: isProd ? './' : '/',
  productionSourceMap: !isProd,
  pages, // 配置多页面
  chainWebpack: config => {
    if (pages) {
      Object.keys(pages).forEach(page => {
        config.plugins.delete(`preload-${page}`)
        config.plugins.delete(`prefetch-${page}`)
      })
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/_variables.scss";`
      }
    }
  },
  devServer: {
    port: 8765
  }
}
