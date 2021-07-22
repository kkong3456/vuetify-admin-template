/* eslint no-param-reassign:
  ["error",{"props":true,"ignorePropertyModificationsFor":["options"]}]
*/
module.exports = {
  devServer:{
    host:'localhost',
  },
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap:false,
  chainWebpack:(config)=>{
    config.plugins.delete('prefetch')
    config.module.rule('eslint').use('eslint-loader')
      .tap((options)=>{
        options.fix=true;
        return options;
      })
  }
}
