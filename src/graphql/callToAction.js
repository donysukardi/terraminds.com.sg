import { graphql } from 'gatsby'
import { acfMediaSizesFrag } from './acfMediaSizes'

export const callToActionFrag = graphql`
  fragment CallToAction on callToAction_4 {
    show
    copy
    button_text
    button_link
    image_template
    images {
      source_url
      media_details{
        ...MediaSizes
      }
    }
  }
`