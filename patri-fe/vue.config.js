function applyVueSvgLoader(svgRule) {
  const svgVue = svgRule.oneOf('vue').resourceQuery(/vue/)

  svgVue.use('babel-loader').loader('babel-loader')
  svgVue
    .use('vue-svg-loader')
    .loader('vue-svg-loader')
    .options({
      svgo: {
        plugins: [{ removeViewBox: false }, { prefixIds: { prefixClassNames: false } }],
      },
    })

  const svgDefault = svgRule.oneOf('default')
  if (typeof svgRule.uses.entries() === 'object') {
    for (const [name, use] of Object.entries(svgRule.uses.entries())) {
      svgDefault.use(name).merge(use.toConfig())
    }
  }

  svgRule.uses.clear()
}

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  publicPath: process.env.PUBLIC_PATH || '/',
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData: `@import '@/styles/artifacts.scss';`,
      },
    },
  },
  chainWebpack(config) {
    config.devtool('source-map')

    config.resolve.alias.set('@@', __dirname)
    config.resolve.alias.set('lodash', 'lodash-es')

    if (config.module.has('eslint')) {
      config.module
        .rule('eslint')
        .test(/\.(vue|(j|t)sx?)$/)
        .use('eslint-loader')
        .tap((options) => ({ ...options, extensions: options.extensions }))
    }

    applyVueSvgLoader(config.module.rule('svg'))
  },
  pluginOptions: {
    storybook: {
      allowedPlugins: ['ignore-moment-locales'],
    },
  },
}
