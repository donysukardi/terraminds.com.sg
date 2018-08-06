import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

class Programmes extends React.Component {
  render() {
    const { programmes, slug } = this.props
    const show = programmes.some(x => x.page.post_name === slug)

    return (
      show ? <div className="wrapper-full">
        <ul className="list programme-strip tabs--strips">
          {programmes.map(programme => {
            const src = programme.image.localFile.childImageSharp.fluid.src
            const style = src ? {
              backgroundImage: `url("${src}")`
            } : {}
            return (
              programme.page.post_name !== slug && <li className="list__item" key={programme.page.post_name}>
                <Link className="list__item-content tabs__item programme" to={programme.page.post_name}>
                  <div className="panel-highlight tabs__content programme__panel">
                    <div className="panel__bg" style={style} />
                    <div className="panel__body">
                      <h3 className="panel__title">
                        {programme.menu_title || programme.page.post_title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div> : null
    )
  }
}

Programmes.propTypes = {
  programmes: PropTypes.array,
  slug: PropTypes.string,
}

export default Programmes
