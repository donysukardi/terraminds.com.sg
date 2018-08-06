import React from "react"
import { graphql, Link } from "gatsby"
import ClockIcon from "react-icons/lib/fa/clock-o"
import TagIcon from "react-icons/lib/fa/tag"
import OpenIcon from "react-icons/lib/fa/folder-open"
import { cLink, tLink } from '../utils/links'

export default ({ node, className = `` }) => {
  const categories = node.categories && node.categories.filter(x => x.slug !== 'uncategorized')

  return (
    <div className="post__info">
      {node.date && <div className="post__info--item post__date">
        <ClockIcon size={14} style={{ position: `relative`, bottom: 1 }} />
        {` `}
        {node.date}
      </div>}
      {categories && !!categories.length && 
        <div className="post__info--item post__category-item">
          <OpenIcon size={14} style={{ position: `relative`, bottom: 1, marginRight: '6px' }} />
          <ul className="post__category-list">
            {categories.map(category => (
              <li key={category.slug}>
                <Link to={cLink(category.slug)} className="post__info--item post__category">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>}
      {node.tags && !!node.tags.length &&
        <div className="post__info--item post__category-item">
          <TagIcon size={14} style={{ position: `relative`, bottom: 1, marginRight: '6px' }} />
          <ul className="post__category-list">
            {node.tags.map(tag => (
              <li key={tag.slug}>
                <Link to={tLink(tag.slug)} className="post__info--item post__category">
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>}
    </div>
  )
}

export const query = graphql`
  fragment PostIcons on wordpress__POST {
    date(formatString: "MMMM DD, YYYY")
    tags {
      name
      slug
    }
    categories {
      name
      slug
    }
  }
`
