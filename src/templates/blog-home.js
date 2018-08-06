import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'

import ClockIcon from "react-icons/lib/fa/clock-o"

import { cLink } from '../utils/links'

import BlogNav from "../components/BlogNav"
import Layout from "../components/Layout"

class Home extends Component {
  render() {
    const { data, pageContext, location } = this.props
    const { recentPosts, featuredCategories } = pageContext
    
    const categories = data.allWordpressCategory.edges
    
    return (
      <Layout
        activeRoute="blog"
        location={location}
      >
        <Helmet title="Blog">
        </Helmet>
        <div className="wrapper-small">
          <BlogNav activeRoute="main" categories={categories} />
        </div>
        <section className="section section--page">
          <div className="wrapper">
            <div className="mb">
              {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
              <div className="recent-posts-grid mb+">
                {recentPosts.map(({ node }, idx) => (
                  <div key={node.slug} className="simple-card">
                    <Link className="linky" to={`/${node.slug}`}>
                      {idx === 0 && node.featured_media && <div className="post__img-wrapper">
                        <Img className="post__img" {...node.featured_media.localFile.childImageSharp} />
                      </div>}
                      {idx > 0 && node.secondary_media && <div className="post__img-wrapper">
                        <Img className="post__img" {...node.secondary_media.localFile.childImageSharp} />
                      </div>}
                    </Link>
                    <div className="post__heading--wrapper">
                      <Link to={`/${node.slug}`} className="linky"><h3 className="post__heading">{node.title}</h3></Link>
                    </div>
                    <div className="post__info--item post__date">
                      <ClockIcon size={14} style={{ position: `relative`, bottom: 1 }} />
                      {` `}
                      {node.date}
                    </div>
                  </div>
                ))}
                <div className="view-all"><Link to={cLink('all')}>View All</Link></div>
              </div>
              <div className="featured-categories">
              {featuredCategories.map(({ slug, name, posts }) => (
                !!posts.length && (
                  <div className="featured-category" key={slug}>
                    <h2 className="title-boxed">
                      <span className="title-boxed__text">{name}</span>
                    </h2>
                    <div className="featured-category-grid">
                      {posts.map(({ node }) => (
                        <div key={node.slug} className="simple-card">
                          <Link className="linky" to={`/${node.slug}`}>
                            {node.secondary_media && <div className="post__img-wrapper">
                              <Img className="post__img" {...node.secondary_media.localFile.childImageSharp} />
                            </div>}
                          </Link>
                          <div className="post__heading--wrapper">
                            <Link to={`/${node.slug}`} className="linky"><h3 className="post__heading">{node.title}</h3></Link>
                          </div>
                          <div className="post__info--item post__date">
                            <ClockIcon size={14} style={{ position: `relative`, bottom: 1 }} />
                            {` `}
                            {node.date}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="view-all"><Link to={cLink(slug)}>View All</Link></div>
                  </div>
                )
              ))}
              </div>
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
