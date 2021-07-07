const { createPage } = require('@vuepress/core')

const createHomePage = (options, app) => {
  let posts = [];

  return {
    name: 'vuepress-plugin-createHomePage',
    async onInitialized(app) {
      // extract the latest 10 posts show in homepage
      const mdReg = /\.md$/
      app.pages.forEach((page) => {
        let folder = '';
        if (page.filePathRelative) {
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
          })
        }
      })

      posts.sort((postA, postB) => {
        const timeA = postA.date || postA.createdTime;
        const timeB = postB.date || postB.createdTime;

        if (timeA && timeB) {
          return new Date(timeA) - new Date(timeB);
        } else {
          return 0;
        }
      });
      posts.forEach(post => {
        console.log(post.title);
        console.log((new Date(post.createdTime)).toLocaleString())
      })

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
    // extendsPageData: (page, app) => {
    //   // add data to each folder navigation pages
    //   if (page.frontmatter.folder) {
    //     return {
    //       postsData: postFolders[page.frontmatter.folder]
    //     }
    //   } else {
    //     return {}
    //   }
    // },
  }
}

module.exports = createHomePage