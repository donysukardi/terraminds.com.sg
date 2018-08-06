import React from "react"
import { Link } from "gatsby"
import { cLink } from '../utils/links'

const BlogNav = ({
	categories,
	activeRoute
}) => (
	<ul className="blog-links">
    <li><Link className={activeRoute === 'main' ? 'nav__link--active' : ''} to={"/blog"}>Main</Link></li>
    <li><Link className={activeRoute === 'all' ? 'nav__link--active' : ''} to={cLink('all')}>All</Link></li>
    {categories.map(x => (
      <li key={x.node.slug}>
        <Link
        	to={cLink(x.node.slug)}
        	className={activeRoute === x.node.slug ? 'nav__link--active' : ''}
        	dangerouslySetInnerHTML={{ __html: x.node.name }}
        />
      </li>
    ))}
  </ul>
)

export default BlogNav