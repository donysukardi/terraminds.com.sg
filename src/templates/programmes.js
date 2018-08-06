import React, { Component } from "react"
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'

import Heading from '../components/Heading'
import Layout from "../components/Layout"

class PageTemplate extends Component {
  render() {
    const { data: { wordpressPage, allWordpressAcfOptions }, location } = this.props
    const { programmes } = allWordpressAcfOptions.edges[0].node
    const currentPage = wordpressPage
    const { acf } = currentPage
    const { heading } = acf
    
    return (
      <Layout location={location}>
        <Helmet title={currentPage.title}>
        </Helmet>
        <Heading {...heading} />
        <section className="section section--page">
          <div className="wrapper-read text-short">
            <ul className="list flex--2@phab-and-up list--divider">
              {programmes.map(programme => (
                programme.published && <li className="list__item" key={programme.page.post_name}>
                  <Link to={programme.page.post_name} className="list__item-content programme">
                    <div className="item__header panel-title programme__panel">
                      <Img
                        alt=""
                        className="panel__img"
                        {...programme.image.localFile.childImageSharp}
                      />
                      <div className="panel__body">
                        <h3 className="panel__title">{programme.page.post_title}</h3>
                      </div>
                    </div>
                    <div className="item__copy">{programme.copy}</div>
                  </Link>
                </li>
              ))}
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
      date(formatString: "MMMM DD, YYYY")
      template
      acf {
        heading {
          ...Heading
        }
        call_to_action {
          ...CallToAction
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
