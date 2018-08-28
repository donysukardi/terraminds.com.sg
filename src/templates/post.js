import React, { Component } from "react"
import { Helmet } from 'react-helmet'
import PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'

import PageBuilder from '../components/PageBuilder'
import Heading from '../components/Heading'
import PostIcons from "../components/PostIcons"
import BlogNav from "../components/BlogNav"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import Sharer from '../components/Sharer'

class PostTemplate extends Component {
  render() {
    const { data, location } = this.props
    const post = data.wordpressPost
    const nextPost = data.nextPost
    const prevPost = data.prevPost
    const categories = data.allWordpressCategory.edges
    const author = post.author
    const siteUrl = data.site.siteMetadata.siteUrl
    const description = post.excerpt.replace(/<(?:.|\n)*?>/gm, '')

    const hasPageBuilder = false
      // post.acf &&
      //        post.acf.page_builder_post_post && !!post.acf.page_builder_post_post.length

    return (
      <Layout
        activeRoute="blog"
        location={location}
      >
        <Helmet title={post.title}>
          <meta name="description"        content={description} />
          <meta property="og:url"         content={location.pathname} />
          <meta property="og:type"        content="article" />
          <meta property="og:title"       content={post.title} />
          <meta property="og:description" content={description} />
          <meta property="og:image"       content={post.featured_media.localFile.childImageSharp.fluid.src} />
        </Helmet>
        <div className="wrapper-small">
          <BlogNav categories={categories} />
        </div>
        <Heading title_2={post.title} title_template="blog" />
        <section className="section section--page post--single">
          <div className="wrapper-read text-short">
            <div className="content-col">
              <div className="mb+">
                <div className="author media">
                  <img className="media__img mr-" src={author.avatar_urls.wordpress_96} alt="" />
                  <div className="media__body">
                    <div className="">{author.name || author.slug}</div>
                    <PostIcons node={{ date: post.date }} />
                  </div>
                </div>
                <div className="mt">
                  <PostIcons node={{ categories: post.categories, tags: post.tags }} />
                </div>
              </div>
              {post.featured_media && <div className="post__featured-img-wrapper">
                <Img className="post__featured-img" {...post.featured_media.localFile.childImageSharp} />
              </div>}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              {hasPageBuilder && <PageBuilder pageBuilder={post.acf.page_builder_post_post} />}
              <section className="section section--small">
                <div className="wrapper">
                  <h2 className="title-boxed">
                    <span className="title-boxed__text">Share This Post</span>
                  </h2>
                  <Sharer title={post.title} summary={description} img={post.featured_media.localFile.childImageSharp.fluid.src} siteUrl={siteUrl} slug={post.slug} />
                </div>
              </section>
              <div className="post-navigation-wrapper">
                {prevPost && <div className="post-adj post-previous">
                  <Link className="linky u-1/1" to={`/${prevPost.slug}`}>
                    <div className="post-adj-content">
                      <div className="post-adj-caption mb--"><svg className="post-adj-icon" width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path d="M1331 672q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg> Previous Post</div>
                      <Img className="post__featured-img" {...prevPost.featured_media.localFile.childImageSharp} />
                      <div className="post-adj-title mt-" dangerouslySetInnerHTML={{__html: prevPost.title}} />
                    </div>
                  </Link>
                </div>}
                {nextPost && <div className="post-adj post-next">
                  <Link className="linky u-1/1" to={`/${nextPost.slug}`}>
                    <div className="post-adj-content">
                      <div className="post-adj-caption mb--">Next Post <svg className="post-adj-icon" width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path d="M1299 1088q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg></div>
                      <Img className="post__featured-img" {...nextPost.featured_media.localFile.childImageSharp} />
                      <div className="post-adj-title mt-" dangerouslySetInnerHTML={{__html: nextPost.title}} />
                    </div>
                  </Link>
                </div>}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

// acf {
//   page_builder_post_post {
//     __typename
//     ... on WordPressAcf_text_block {
//       ...ACFTextBlock
//     }
//   }
// }

export const pageQuery = graphql`
  query($id: String!, $includeNext:Boolean!, $includePrev:Boolean!, $nextId:String!, $prevId:String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      excerpt
      slug
      tags {
        name
        slug
      }
      categories {
        name
        slug
      }
      author{
        slug
        name
        avatar_urls {
          wordpress_96
        }
      }
      
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 800, traceSVG: { color: "#aed7df" }) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      ...PostIcons
    }
    prevPost:wordpressPost(id:{eq:$prevId }) @include(if: $includePrev) {
      title
      slug
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 200, traceSVG: { color: "#aed7df" }) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
    nextPost:wordpressPost(id:{eq:$nextId }) @include(if: $includeNext) {
      title
      slug
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 200, traceSVG: { color: "#aed7df" }) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
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
    site {
      siteMetadata {
        title
        subtitle
        siteUrl
      }
    }
  }
`
