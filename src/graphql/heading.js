import { graphql } from 'gatsby'

export const headingFrag = graphql`
  fragment Heading on heading_4 {
    title_template
    title_1
    title_2
  }
`