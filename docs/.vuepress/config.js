const { path } = require('@vuepress/utils')

module.exports = {
  // open: true,
  lang: 'zh-CN',
  base: "/",
  title: "Collection",
  description: 'A blog to collect my daily reading and thinking.',
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.13.5/dist/katex.min.css' }],
  ],
  bundler: '@vuepress/vite',
  bundlerConfig: {
    viteOptions: {
      css: {
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer')
          ]
        }
      },
    }
  },
  // bundler: '@vuepress/webpack',
  // bundlerConfig: {
  //   postcss: {
  //     postcssOptions: {
  //       plugins: {
  //         tailwindcss: {},
  //         autoprefixer: {},
  //       },
  //     },
  //   },
  // },
  plugins: [
    require('./plugins/addTime.js'),
    [require('./plugins/createHomePage.js'),
    {
      cards: [
        {
          name: "vis",
          image: "vis.svg"
        },
        {
          name: "posts",
          image: "posts.svg"
        },
      ]
    }],
    [require('./plugins/generateListPages.js'),
    {
      postClassifications: ['vis']
    }],
    [require('./plugins/generateFolderPages.js'),
    {
      postFolders: ['vis']
    }],
  ],
  theme: path.resolve(__dirname, './theme/index.js'),
  themeConfig: {
    navbar: false,
    sidebar: false,
    contributors: false,
    lastUpdatedText: '更新时间',
    themePlugins: {
      backToTop: false,
      nprogress: false,
    }
  },
  markdown: {
    links: {
      externalIcon: false
    }
  },
  extendsMarkdown: (md) => {
    md.use(require('@neilsustc/markdown-it-katex'), { output: 'html' });
    md.use(require('markdown-it-mark'));
    md.use(require('markdown-it-sub'));
    md.use(require('markdown-it-sup'));
  },
  define: {
    __BASE__: "/",
    __HOME_PAGE_TITLE__: "COLLECTION",
    __HOME_PAGE_ICON__: "home_icon.png",
    __HOME_DESCRIPTION__: "一个收集我日常所读和所思的博客",
    __HOME_PAGE_COLOR__: '#292d31',
    __AVATAR__: 'avatar.png',
    __CLASSIFICATIONS__: ['All', 'Vis'],
    __FOLDERS__: ['Vis'],
    __FOOTER_AVATAR_LINK__: '/about.html',
    __AUTHOR__: 'Benbinbin',
    __FOOTER_LICENSE__: 'CC-BY-SA-4.0',
    __FOOTER_LICENSE_LINK__: 'https://creativecommons.org/licenses/by-sa/4.0/deed.en',
    __SOCIAL_MEDIA__: [
      {
        name: 'email',
        logo: 'email.svg',
        url: 'mailto:benthomsonbin@gmail.com'
      },
      {
        name: 'github',
        logo: 'github.svg',
        url: 'https://github.com/Benbinbin'
      },
      {
        name: 'juejin',
        logo: 'juejin.svg',
        url: 'https://juejin.cn/user/3175045314389278/posts'
      },
      {
        name: 'dribbble',
        logo: 'dribbble.svg',
        url: 'https://dribbble.com/BinBinDesign'
      },
      {
        name: 'twitter',
        logo: 'twitter.svg',
        url: 'https://twitter.com/Benbinbin_fun'
      },
      {
        name: 'weibo',
        logo: 'weibo.svg',
        url: 'https://weibo.com/binbindesign'
      },
    ],
  },
}