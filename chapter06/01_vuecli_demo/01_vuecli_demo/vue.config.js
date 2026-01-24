const { defineConfig } = require('@vue/cli-service');
const path = require('path');
function resolve(dir){
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  outputDir: 'build',
  assetsDir: 'static',
  publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '/',
  // transpileDependencies配置node_modules包里面的内容是否使用bable编译
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      // .set('views', resolve('src/views'))
      // .set('network', resolve('src/network'))
      // .set('common', resolve('src/common'))
      // .set('store', resolve('src/store'))
  }
})
