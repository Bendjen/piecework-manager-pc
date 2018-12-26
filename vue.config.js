module.exports = {
  configureWebpack: config => {
    config.externals = {
      'viser-vue': 'ViserVue',
    }
    baseUrl = '';
  }
}