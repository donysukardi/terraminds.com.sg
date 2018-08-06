import React, { Component } from "react"
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'

import Heading from '../components/Heading'
import Layout from "../components/Layout"

class PageTemplate extends Component {
  render() {
    const { data: { wordpressPage }, location } = this.props
    const currentPage = wordpressPage
    const { acf } = currentPage
    const { heading, testimonials } = acf
    
    return (
      <Layout location={location}>
        <Helmet title={currentPage.title}>
        </Helmet>
        <Heading {...heading} />
        <section className="section section--page">
          <div className="wrapper-read wrapper@lap-and-up">
            <ul className="list list--divider">
              {testimonials.map((entry, idx) => {
                return (
                  <li key={idx} className="list__item">
                    <div className="list__item-content">
                      <ul className="layout">
                        <li className="layout__item u-1/3@phab-and-up">
                          {entry.image && <div className="item__img">
                            <Img
                              style={{maxHeight: "360px"}}
                              {...entry.image.localFile.childImageSharp}
                            />
                          </div>}
                          <h3 className="item__header">{entry.parent_name}</h3>
                          <div className="item__subheader" dangerouslySetInnerHTML={{ __html: entry.children_names }} />
                        </li>
                        <li className="layout__item u-2/3@phab-and-up" dangerouslySetInnerHTML={{ __html: entry.testimonial }} />
                      </ul>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      slug
      date(formatString: "MMMM DD, YYYY")
      template
      acf {
        heading {
          ...Heading
        }
        testimonials {
          parent_name
          children_names
          testimonial
          image{
            localFile {
              childImageSharp {
                fluid(maxWidth: 360, traceSVG: { color: "#aed7df" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
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
  }
`
