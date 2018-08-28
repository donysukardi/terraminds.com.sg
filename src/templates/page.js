import React, { Component } from "react"
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import PageBuilder from '../components/PageBuilder'
import AboutLayout from '../components/AboutLayout'
import CallToAction from '../components/CallToAction'
import Heading from '../components/Heading'
import Schedule from '../components/Schedule'
import Programmes from "../components/Programmes"
import Layout from "../components/Layout"

class PageTemplate extends Component {
  render() {
    const { data: { wordpressPage, allWordpressAcfOptions }, location } = this.props
    const { programmes } = allWordpressAcfOptions.edges[0].node
    const page = wordpressPage
    const { slug, template, acf, bg } = page
    const { heading, schedule, schedule_title: scheduleTitle, call_to_action: callToAction } = acf

    const showSchedule = !!schedule
    const isProgramme = template === "page-templates/page_programme.php"
    const defaultTemplate = !template || isProgramme

    const content = slug === 'about' ? <AboutLayout bg={bg.localFile.childImageSharp.resize.src} html={page.content} /> : defaultTemplate ?
          <section className="section section--page">
            <div className="wrapper-read text-short" dangerouslySetInnerHTML={{ __html: page.content }} />
          </section>
        : <div dangerouslySetInnerHTML={{ __html: page.content }} />

    const title = page.title.replace("&#8211;", "-")

    const hasPageBuilder = page.acf &&
              page.acf.page_builder_post_page && !!page.acf.page_builder_post_page.length

    return (
      <Layout
        activeRoute={isProgramme && 'programmes'}
        location={location}
      >
        <Helmet title={title}>
          <meta property="og:url"         content={location.pathname} />
          <meta property="og:type"        content="article" />
          <meta property="og:title"       content={page.title} />
          <meta property="og:description" content={page.excerpt.replace(/<(?:.|\n)*?>/gm, '')} />
          {page.featured_media && <meta property="og:image"       content={page.featured_media.localFile.childImageSharp.fluid.src} />}
        </Helmet>
        <Heading {...heading} />
        
        {!hasPageBuilder && content}
        {hasPageBuilder && <section className="section section--page">
          <div className="wrapper-read text-short">
            <PageBuilder pageBuilder={page.acf.page_builder_post_page} />
          </div>
        </section>}
        {showSchedule && <Schedule title={scheduleTitle} schedules={schedule} />}
        <CallToAction {...callToAction} />
        <Programmes slug={slug} programmes={programmes}/>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      excerpt
      content
      slug
      date(formatString: "MMMM DD, YYYY")
      template
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 800, traceSVG: { color: "#aed7df" }) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      bg: featured_media {
        localFile {
          childImageSharp {
            resize(width: 1920) {
              src
            }
          }
        }
      }
      acf {
        heading {
          ...Heading
        }
        call_to_action {
          ...CallToAction
        }
        page_builder_post_page {
          __typename
          ... on WordPressAcf_text_block {
            ...ACFTextBlock
          }
          ... on WordPressAcf_gallery {
            ...ACFGallery
          }
          ... on WordPressAcf_call_to_action {
            ...ACFCallToAction
          }
          ... on WordPressAcf_highlight {
            ...ACFHighlight
          }
          ... on WordPressAcf_video {
            ...ACFVideo
          }
          ... on WordPressAcf_testimonials {
            ...ACFTestimonials
          }
        }
        schedule_title
        schedule{
          name
          age
          url
          subjects {
            subject
          }
          schedule{
            day
            time
          }

          day
          times {
            time
          }

        }
      }
    }
    site {
      id
      siteMetadata {
        title
        subtitle
      }
    }
    allWordpressAcfOptions{
      ...ACFOptions
    }
  }
`
