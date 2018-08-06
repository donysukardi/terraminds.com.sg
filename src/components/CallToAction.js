import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const ratioWidthMapping = {
	'2:1': '1/1'
}

const ratioImgMapping = {
	'1:2': 'wordpress_1by2',
	'2:1': 'wordpress_2by1',
	'1:1': 'wordpress_1by1'
}

const twoColumns = [
	['1:2'],
	['1:2', '1:2'],
	['1:2', '1:1', '1:1']
]

const twoRows = [
	['2:1'],
	['2:1', '2:1'],
	['2:1', '1:1', '1:1']
]

const twoSquares = [
	['1:1'],
	['1:1', '1:1'],
]

const imgClassesMap = {
	'2c': twoColumns,
	'2r': twoRows,
	'2s': twoSquares
}

class CallToAction extends React.Component {
	render() {
		const {
			button_text,
			button_link,
			copy,
			image_template,
			images,
			show
		} = this.props

		if(!show) {
			return null
		}

		const imgClasses = imgClassesMap[image_template][images.length - 1]

		return (
			<section className="section section--highlight ng-scope">
		    <div className="wrapper">
		      <div className="cta layout">
		        <div className="cta__body layout__item u-1/2@phab-and-up">
		          <p dangerouslySetInnerHTML={{ __html: copy }} />
		          <Link className="btn" to={button_link}>
		            <span dangerouslySetInnerHTML={{ __html: button_text }} />
		          </Link>
		        </div>
		        <div className="layout__item u-1/2@phab-and-up">
		          <div className="cta__images">
		            {images.map((x, idx) => {
		            	const ratio = imgClasses[idx]
		            	const { source_url, media_details: { sizes } } = x
		            	const size = sizes && sizes[ratioImgMapping[ratio]]
		            	const src = size ? size.source_url : source_url
		            	const width = ratioWidthMapping[ratio] || '1/2'
		            	
		            	return (
				            <div key={idx} className={`cta__image u-${width}`}>
				              <div className={`aspect-ratio aspect-ratio--padded aspect-ratio--${ratio}`}>
				                <img className="aspect-ratio__content" src={src} alt="" />
				              </div>
				            </div>
		            	)
		            })}
		          </div>
		        </div>
		      </div>
		    </div>
		  </section>
		)
	}
}

CallToAction.propTypes = {
	button_text: PropTypes.string,
	button_link: PropTypes.string,
	copy: PropTypes.string,
	image_template: PropTypes.string,
	images: PropTypes.array,
	show: PropTypes.bool,
}

export default CallToAction