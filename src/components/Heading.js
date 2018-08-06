import React from 'react'
import PropTypes from 'prop-types'

class Heading extends React.Component {
	render() {
		const {
      title_1: title1,
      title_2: title2,
      title_template: titleTemplate
    } = this.props;

    const titleCls = titleTemplate === 'blog' ? 'title--blog title--tilt-below' : titleTemplate === 'horizontal' ? 'title--tilt-horizontal'
      : (title2 && title2.length >= title1.length) ? 'title--tilt-below-big' : 'title--tilt-below';

		return (
			<div className="wrapper">
        <h1 className={`title ${titleCls}`}>
          <span className="title__text">
            <span className="title__primary" dangerouslySetInnerHTML={{__html: title1 }} />
            {!!title2 && <span className=" title__secondary" dangerouslySetInnerHTML={{__html: title2 }} />}
          </span>
        </h1>
      </div>
		)
	}
}

Heading.propTypes = {
  title_1: PropTypes.string,
  title_2: PropTypes.string,
  title_template: PropTypes.string,
}

export default Heading

