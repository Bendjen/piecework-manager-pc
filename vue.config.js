module.exports = {
  configureWebpack: config => {
    config.externals = {
      '@antv/data-set': 'DataSet',
      '@antv/g2': 'G2',
      'dayjs': 'dayjs',
      'file-saver': 'FileSaver',
      'store': 'store',
      // 'vue': 'Vue',
      // 'vue-router': 'Router',
    }
    baseUrl = '';
  }
}