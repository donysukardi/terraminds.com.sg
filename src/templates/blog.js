import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'

import BlogNav from "../components/BlogNav"
import Heading from '../components/Heading'

import Layout from "../components/Layout"
import PostIcons from "../components/PostIcons"

const buildPath = (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `${pathPrefix}`

class Home extends Component {
  render() {
    const { data, pageContext, location } = this.props
    const { group, index, first, last, pageCount, pathPrefix, additionalContext } = pageContext
    const previousUrl = buildPath(index - 1, pathPrefix)
    const nextUrl = buildPath(index + 1, pathPrefix)

    const { type, category, tag } = additionalContext
    const categories = data.allWordpressCategory.edges
    const title = type === 'Category' ? (category.slug === 'all' ? {
      title_1: 'Blog',
      title_2: 'All Posts',
      title_template: 'blog'
    }: {
      title_1: 'Category',
      title_2: category.name,
      title_template: 'blog'
    }) : {
      title_1: 'Tag',
      title_2: tag.name,
      title_template: 'blog'
    }
    
    return (
      <Layout
        activeRoute="blog"
        location={location}
      >
        <Helmet title={title.title_2}>
        </Helmet>
        <div className="wrapper-small">
          <BlogNav activeRoute={category && category.slug} categories={categories} />
        </div>
        <Heading {...title} />
        <section className="section section--page">
          <div className="wrapper-small">
            <div className="mb">
              {group.map(({ node }) => (
                <div key={node.slug} className="post simple-card">
                  <div className="post__heading--wrapper">
                    <Link to={`/${node.slug}`} className="linky"><h3 className="post__heading">{node.title}</h3></Link>
                    <PostIcons node={node} />
                  </div>
                  <Link className="linky" to={`/${node.slug}`}>
                    {node.featured_media && <div className="post__featured-img-wrapper">
                      <Img className="post__featured-img" {...node.featured_media.localFile.childImageSharp} />
                    </div>}
                  </Link>
                  <Link className="linky" to={`/${node.slug}`}>
                    <div className="post__content" dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                  </Link>
                  <div className="more-link">
                    <Link to={`/${node.slug}`}>Continue reading</Link>
                  </div>
                </div>
              ))}

              {!group.length && <div className="post simple-card">
                <div className="post__content">
                  No post found.
                </div>
              </div>}

              {!!pageCount && <div className="pagination-info">
                <div className="pagination-feeds mv">
                    Page <span>{index}</span> of <span>{pageCount}</span>
                </div>
                <div className="pagination-nav">
                  {!first && <Link to={previousUrl} className="btn">Prev</Link>}
                  {!last && <Link to={nextUrl} className="btn">Next</Link>}
                </div>
              </div>}

            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default Home

// Set here the ID of the home page.
export const pageQuery = graphql`
  query {
    allWordpressCategory(filter: {name: {ne: "Uncategorized"}}) {
      edges {
        node {
          name
          slug
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
  }
`
