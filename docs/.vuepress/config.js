const name = 'vuepress-plugin-redirect'

const getEcosystem = (locale, ecosystem, plugins, themes, others) => ({
  text: ecosystem,
  items: [{
    text: plugins,
    items: [{
      text: 'vuepress-plugin-mathjax',
      link: `https://Shigma.github.io/vuepress-plugin-mathjax/${locale}`,
    }, {
      text: 'vuepress-plugin-migrate',
      link: `https://Shigma.github.io/vuepress-plugin-migrate/${locale}`,
    }, {
      text: 'vuepress-plugin-pangu',
      link: 'https://Shigma.github.io/markdown-it-pangu/',
    }, {
      text: 'vuepress-plugin-serve',
      link: `https://Shigma.github.io/vuepress-plugin-serve/${locale}`,
    }, {
      text: 'vuepress-plugin-ssr-mismatch-workaround',
      link: 'https://github.com/Shigma/vuepress-plugin-ssr-mismatch-workaround',
    }]
  }, {
    text: others,
    items: [{
      text: 'vuepress-mergeable',
      link: `https://Shigma.github.io/vuepress-mergeable/${locale}`,
    }]
  }],
})

const guideSidebar = () => [
  '',
  'config.html',
]

module.exports = ({ isProd }) => ({
  base: `/${name}/`,

  plugins: [
    '@vuepress/medium-zoom',
    '@vuepress/back-to-top',
    ['redirect', {
      locales: true,
    }],
    'serve',
    'ssr-mismatch-workaround',
  ],
  
  locales: {
    '/en/': {
      lang: 'en-US',
      title: name,
      description: 'A VuePress plugin that handles redirections',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: name,
      description: '一个用于处理重定向的 VuePress 插件',
    },
  },
  
  themeConfig: {
    repo: `Shigma/${name}`,
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/en/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          getEcosystem('', 'Ecosystem', 'Plugins', 'Themes', 'Others')
        ],
        sidebar: {
          '/en/': guideSidebar(),
        },
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
          getEcosystem('zh/', '生态系统', '插件', '主题', '其他')
        ],
        sidebar: {
          '/zh/': guideSidebar(),
        },
      },
    },
  },

  evergreen: !isProd,
})
