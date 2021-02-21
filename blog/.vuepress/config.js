module.exports = {
  title: 'Collection',
  theme: 'gungnir',
  plugins: [
    "@kawarimidoll/tailwind",
  ],
  head: [
    ["link", { rel: "icon", href: "/images/ben.png" }],
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }]
  ],
  themeConfig: {
    personalInfo: {
      // 必须：名称，将在首页、移动端侧边栏和文章作者信息处显示
      name: "Ben",

      // 必须：头像，将在首页和移动端侧边栏显示
      avatar: "/images/Ben.png",

      // 必须：个人简介，将在首页显示
      description: 'A repo to collect my daily reading and thinking.',

      // 可选：社交平台账号，将在首页和移动端侧边栏显示
      sns: {
        github: 'BenbinbinCollection',  // Github
        twitter: 'Benbinbin_fun',  // 推特
        weibo: 'binbindesign',  // 新浪微博
        email: 'mebeansbin@gmail.com',  // 邮箱
      }
    },
    homeHeaderImages: [
      // 图 1
      {
        "path": "/images/home-bg/code.jpg",
        "mask": "rgba(40, 57, 101, .4)"
      },
      // 图 2
      {
        "path": "/images/home-bg/data.jpg",
        "mask": "rgb(251, 170, 152, .2)"
      },
      {
        "path": "/images/home-bg/data-vis.jpg",
        "mask": "rgb(251, 170, 152, .2)"
      },
      {
        "path": "/images/home-bg/drawing.jpg",
        "mask": "rgb(251, 170, 152, .2)"
      },
      {
        "path": "/images/home-bg/protein.jpg",
        "mask": "rgb(251, 170, 152, .2)"
      },
    ],
    footer: `
      &copy; <a href="https://github.com/BenbinbinCollection/" target="_blank">BenThomson</a> 2021
      <br>
      Powered by <a href="https://vuepress.vuejs.org" target="_blank">VuePress</a> &
      <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank">Gungnir</a>
    `,
    lastUpdated: true,
    katex: true,
    mermaid: true,
    chartjs: true,
    roughviz: true,
    mdPlus: {
      all: true
    },
    rss: {
      site_url: 'https://benbinbincollection.github.io/',
      copyright: 'BenThomson 2021',
      count: 20
    },
  },

  markdown: {
    // lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5']
  },

}