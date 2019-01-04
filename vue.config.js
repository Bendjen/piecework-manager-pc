module.exports = {
  configureWebpack: config => {
    config.externals = {
      '@antv/data-set': 'DataSet',
      '@antv/g2': 'G2',
      '@antv/g2-plugin-slide': 'Slide',
      'dayjs': 'dayjs',
      'file-saver': 'FileSaver',
      'store': 'store',
      // 'vue': 'Vue',
      // 'vue-router': 'Router',
    }
  },
  baseUrl: process.env.NODE_ENV === 'production' ? '' : '/'
}