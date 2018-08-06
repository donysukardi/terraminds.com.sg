import { graphql } from 'gatsby'

export const acfMediaSizesFrag = graphql`
  fragment MediaSizes on mediaDetails_2 {
    sizes {
      full {
        source_url
      }
      wide {
        source_url
      }
      full {
        source_url
      }
      wordpress_1by1 {
        source_url
      }
      wordpress_2by1 {
        source_url
      }
      wordpress_1by2 {
        source_url
      }
    }
  }
`