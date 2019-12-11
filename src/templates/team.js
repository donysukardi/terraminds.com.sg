import React, { Component } from "react"
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Heading from '../components/Heading'
import Layout from "../components/Layout"

class PageTemplate extends Component {
  render() {
    const { data: { wordpressPage }, location } = this.props
    const currentPage = wordpressPage
    const { acf } = currentPage
    const img = currentPage.featured_media.media_details.sizes.large.source_url
    const caption = currentPage.featured_media.caption
    const { heading, teachers, overview, founder_write_up: founderWriteUp } = acf
    
    return (
      <Layout location={location}>
        <Helmet title={currentPage.title}>
        </Helmet>
        <Heading {...heading} />
        <section className="section section--page">
          <div className="wrapper">
            <div className="flex flex--large">
              <div className="flex__item u-2/5@lap-and-up mb" dangerouslySetInnerHTML={{ __html: overview }} />    
              <div className="flex__item u-3/5@lap-and-up">
                <figure>
                  <img src={img} alt="" />
                  <figcaption dangerouslySetInnerHTML={{__html: caption}} />
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section className="section--founder section--highlight">
          <div className="wrapper">
            <h2 className="section-heading">Meet the founder</h2>
            <div className="col-2@lap-and-up col--large"  dangerouslySetInnerHTML={{ __html: founderWriteUp }} />    
          </div>
        </section>
        <section className="section--teachers">
          <div className="wrapper">
            <h2 className="section-heading">Meet the teachers</h2>
              
            <ul className="list  list--21 list--divider">
              {teachers.map(entry => (
                <li key={entry.name} className="list__item" >
                  <div className="list__item-content">
                    <h3 className="item__header">{entry.name}</h3>
                    <div className="item__copy">
                      {entry.qualifications.map(qualification => (
                        <div key={qualification.primary} className="item__group">
                          <span dangerouslySetInnerHTML={{ __html: qualification.primary }} />
                          {qualification.secondary && <div className="item__sub" dangerouslySetInnerHTML={{ __html: qualification.secondary }} />}
                        </div>
                      ))}
                     </div> 
                  </div>
                </li>
              ))}
            </ul>

            <section className="section--hiring d d--h-top-left">
              <p className="">
                If you are interested to join our team, <span className="nowrap">email us your resume at</span> <a href="mailto:hire@terraminds.com.sg">hire@terraminds.com.sg</a>
              </p>
            </section>
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

      featured_media {
        caption
        media_details {
          sizes{
            large{
              source_url
            }
          }
        }
      }

      acf {
        heading {
          ...Heading
        }
        overview
        founder_write_up
        teachers {
          name
          qualifications {
            primary
            secondary
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

        
