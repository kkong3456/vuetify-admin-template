module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap:false,
  chainWebpack:(config)=>{
    config.plugins.delete('prefetch')
  }
}
