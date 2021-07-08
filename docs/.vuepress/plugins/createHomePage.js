const { createPage } = require('@vuepress/core')

const createHomePage = (options, app) => {
  let latestPosts = [];

  return {
    name: 'vuepress-plugin-createHomePage',
    async onInitialized(app) {

      const mdReg = /\.md$/
      let posts = [];
      app.pages.forEach((page) => {
        let folder = '';
        if (page.filePathRelative && page.frontmatter.show) {
          const firstElem = page.filePathRelative.split("/")[0]
          if (!mdReg.test(firstElem)) folder = firstElem;
          posts.push({
            key: page.key,
            folder: folder,
            title: page.title,
            path: page.path,
            pathRelative: page.htmlFilePathRelative,
            tags: page.frontmatter.tags || [],
            createdTime: page.frontmatter.createdTime || null,
            updatedTime: page.frontmatter.updatedTime || null,
            date: page.frontmatter.date || null,
            summary: page.frontmatter.summary || '',
            cover: page.frontmatter.cover || ''
          })
        }
      })

      posts.sort((postA, postB) => {
        const timeA = postA.date || postA.createdTime;
        const timeB = postB.date || postB.createdTime;

        if (timeA && timeB) {
          return new Date(timeB) - new Date(timeA);
        } else {
          return 0;
        }
      });

      // extract the latest 10 posts show in homepage
      latestPosts = posts.slice(0, 10);

      // if homepage doesn't exist
      if (app.pages.every((page) => page.path !== '/')) {
        // async create a homepage
        const homepage = await createPage(app, {
          path: '/',
          // set frontmatter
          frontmatter: {
            layout: 'HomeLayout',
            cards: options.cards || []
          },
        })

        // push the homepage to app.pages
        app.pages.push(homepage)
      }
    },
    extendsPageData: (page, app) => {
      // add latest 10 posts data homepage
      if (page.path === '/') {
        return {
          latestPosts: latestPosts,
        }
      } else {
        return {}
      }
    },
  }
}

module.exports = createHomePage