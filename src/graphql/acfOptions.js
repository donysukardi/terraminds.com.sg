import { graphql } from 'gatsby'
import './acfMediaSizes'

export const acfOptionsFrag = graphql`
  fragment ACFOptions on wordpress__acf_optionsConnection {
    edges{
      node{
        programmes{
          page {
            post_title
            post_name
          }
          copy
          published
          menu_title
          image{
            localFile {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 360, traceSVG: { color: "#aed7df" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            media_details {
              ...MediaSizes
            }
          }
        }
        opening_hours{
          day
          hours
        }
      }
    }
  }
`