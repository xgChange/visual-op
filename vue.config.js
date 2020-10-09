const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProd ? './' : '/',
  productionSourceMap: !isProd,
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
