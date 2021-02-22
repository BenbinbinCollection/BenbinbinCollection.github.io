const feed_options = {
  canonical_base: 'https://benbinbincollection.github.io/',
};

module.exports = {
  title: 'Collection',
  description: '一个收集我日常所读和所思的博客',
  theme: 'casper',
  plugins: [
    "@kawarimidoll/tailwind",
    '@maginapp/vuepress-plugin-katex',
    [
      'vuepress-plugin-medium-zoom',
      {
        selector: '.post-full img',
      }
    ],
    ['feed', feed_options]
  ],
  head: [
    ["link", { rel: "icon", href: "/images/ben.png" }],
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }]
  ],
  markdown: {
    anchor: {
      permalink: false,
      permalinkBefore: false
    },
    extendMarkdown: md => {
      md.use(require("markdown-it-footnote"));
    }
  },
  themeConfig: {
    cover: '/images/home-bg/data-crop-filter.png',
    logo: '/images/Collection.png',
    nav: [{
      text: '主页',
      link: '/'
    }, {
      text: '文章列表',
      link: '/posts'
    }, {
      text: '可视化',
      link: '/category/data-vis'
    }],

    footer: [
      {
        text: '关于',
        link: '/about.html'
      },
      {
        text: '导航页',
        link: 'https://benbinbin.github.io/'
      },
      {
        text: 'Github',
        link: 'https://github.com/BenbinbinCollection'
      },
      {
        text: 'RSS',
        link: './rss.xml'
      },
    ],
    social: {
      github: 'https://github.com/BenbinbinCollection/BenbinbinCollection.github.io',
      twitter: 'https://twitter.com/Benbinbin_fun',
    }
  },
}