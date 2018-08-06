process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const Img = require(`gatsby-image`)
const _ = require(`lodash`)
const Promise = require(`bluebird`)
const fs = require(`fs`)
const path = require(`path`)
const slash = require(`slash`)
const createPaginatedPages = require("gatsby-paginate")
const cLink = slug => `/blog/c/${slug}`
const tLink = slug => `/blog/t/${slug}`

const PAGE_SIZE = 10
const FEATURED_POSTS_SIZE = 3

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for Wordpress pages (route : /{slug})
// Will create pages for Wordpress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Wordpress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create Page pages.
        const pageTemplate = path.resolve(`./src/templates/page.js`)
        // We want to create a detailed page for each
        // page node. We'll just use the Wordpress Slug for the slug.
        // The Page ID is prefixed with 'PAGE_'
        _.each(result.data.allWordpressPage.edges, edge => {

          if(['home', 'blog'].includes(edge.node.slug)) {
            return;
          }
          
          const templatePath = `./src/templates/${edge.node.slug}.js`
          
          let template = fs.existsSync(templatePath)
            ? path.resolve(templatePath)
            : pageTemplate

          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.slug}/`,
            component: slash(template),
            context: {
              id: edge.node.id,
            },
          })
        })
      })
      // ==== END PAGES ====

      // ==== POSTS (WORDPRESS NATIVE AND ACF) ====
      .then(() => {
        graphql(
          `
            {
              allWordpressAcfOptions{
                edges{
                  node{
                    featured_categories {
                      name
                      slug
                    }
                  }
                }
              }

              allWordpressTag {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }

              allWordpressCategory(filter: {name: {ne: "Uncategorized"}}) {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }

              allWordpressPost(sort: { fields: [date], order:DESC }) {
                edges {
                  node {
                    id
                    title
                    excerpt
                    slug
                    date(formatString: "MMMM DD, YYYY")
                    tags {
                      name
                      slug
                    }
                    categories {
                      name
                      slug
                    }
                    featured_media {
                      localFile {
                        childImageSharp {
                          fluid(maxWidth: 800, traceSVG: { color: "#aed7df" }) {
                            tracedSVG
                            aspectRatio
                            src
                            srcSet
                            srcWebp
                            srcSetWebp
                            sizes
                          }
                        }
                      }
                    }
                    secondary_media: featured_media {
                      localFile {
                        childImageSharp {
                          fluid(maxWidth: 400, maxHeight: 200, traceSVG: { color: "#aed7df" }) {
                            tracedSVG
                            aspectRatio
                            src
                            srcSet
                            srcWebp
                            srcSetWebp
                            sizes
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }

          const featuredCategories = result.data.allWordpressAcfOptions.edges[0].node.featured_categories
          const posts = result.data.allWordpressPost.edges
          const categoryPosts = {}

          // Create pages for all posts
          createPaginatedPages({
            edges: posts,
            createPage: createPage,
            pageTemplate: path.resolve(`./src/templates/blog.js`),
            pageLength: PAGE_SIZE,
            pathPrefix: cLink('all'),
            context: {
              type: 'Category',
              category: {
                slug: 'all',
                name: 'All'
              }
            },
            buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `${pathPrefix}` // This is optional and this is the default
          })

          // Create category pages
          const categories = result.data.allWordpressCategory.edges
          _.each(categories, edge => {
            const slug = edge.node.slug
            const allPosts = posts.filter(x => x.node.categories && x.node.categories.some(y => y.slug === slug))
            categoryPosts[slug] = allPosts

            if(allPosts.length) {
              createPaginatedPages({
                edges: allPosts,
                createPage: createPage,
                pageTemplate: path.resolve(`./src/templates/blog.js`),
                pageLength: PAGE_SIZE,
                pathPrefix: cLink(slug),
                context: {
                  type: 'Category',
                  category: edge.node
                },
                buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `${pathPrefix}` // This is optional and this is the default
              })
            } else {
              createPage({
                // Each page is required to have a `path` as well
                // as a template component. The `context` is
                // optional but is often necessary so the template
                // can query data specific to each page.
                path: `${cLink(slug)}/`,
                component: path.resolve(`./src/templates/blog.js`),
                context: {
                  group: [],
                  index: 1,
                  first: true,
                  last: true,
                  pageCount: 1,
                  pathPrefix: cLink(slug),
                  additionalContext: {
                    type: 'Category',
                    category: edge.node
                  },
                },
              })
            }
          })

          // Create tag pages
          const tags = result.data.allWordpressTag.edges
          _.each(tags, edge => {
            const slug = edge.node.slug
            const allPosts = posts.filter(x => x.node.tags && x.node.tags.some(y => y.slug === slug))
            if(allPosts.length) {
              createPaginatedPages({
                edges: allPosts,
                createPage: createPage,
                pageTemplate: path.resolve(`./src/templates/blog.js`),
                pageLength: PAGE_SIZE,
                pathPrefix: tLink(slug),
                context: {
                  type: 'Tag',
                  tag: edge.node
                },
                buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `${pathPrefix}` // This is optional and this is the default
              })
            } else {
              createPage({
                // Each page is required to have a `path` as well
                // as a template component. The `context` is
                // optional but is often necessary so the template
                // can query data specific to each page.
                path: `${tLink(slug)}/`,
                component: path.resolve(`./src/templates/blog.js`),
                context: {
                  group: [],
                  index: 1,
                  first: true,
                  last: true,
                  pageCount: 1,
                  pathPrefix: tLink(slug),
                  additionalContext: {
                    type: 'Tag',
                    tag: edge.node
                  },
                },
              })
            }
          })

          // Create Blog home
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/blog/`,
            component: path.resolve(`./src/templates/blog-home.js`),
            context: {
              recentPosts: posts.slice(0, FEATURED_POSTS_SIZE),
              featuredCategories: featuredCategories.map(x => ({
                slug: x.slug,
                name: x.name,
                posts: categoryPosts[x.slug].slice(0, FEATURED_POSTS_SIZE)
              }))
            },
          })

          // Create posts
          const postTemplate = path.resolve(`./src/templates/post.js`)
          // We want to create a detailed page for each
          // post node. We'll just use the Wordpress Slug for the slug.
          // The Post ID is prefixed with 'POST_'
          _.each(posts, (edge, idx) => {
            const includeNext = (idx < posts.length - 2)
            const includePrev = (idx > 0)

            createPage({
              path: edge.node.slug,
              component: slash(postTemplate),
              context: {
                id: edge.node.id,
                includeNext: includeNext,
                includePrev: includePrev,
                nextId: includeNext && posts[idx+1] ? posts[idx+1].node.id : "",
                prevId: includePrev && posts[idx-1] ? posts[idx-1].node.id : ""
              },
            })
          })

          resolve()
        })
      })
    // ==== END POSTS ====
  })
}
