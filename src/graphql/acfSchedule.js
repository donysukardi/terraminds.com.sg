import { graphql } from 'gatsby'

export const scheduleFrag = graphql`
  fragment Schedule on acf_8 {
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
`
  