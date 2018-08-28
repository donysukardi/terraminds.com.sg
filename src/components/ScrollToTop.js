import React from 'react'

const ArrowUpIcon = props => (
	<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 640 640'
shapeRendering='geometricPrecision' textRendering='geometricPrecision'
imageRendering='optimizeQuality' fillRule='evenodd' clipRule='evenodd' {...props}>
    <defs />
    <path className='fil0' d='M0 320l0 0 0.0826782 0c0,88.4184 35.7997,168.415 93.6508,226.267 57.8511,57.8511 137.848,93.6508 226.255,93.6508l0 0.0826782 0.0118112 0 0 0 0 -0.0826782c88.4184,0 168.415,-35.7997 226.267,-93.6508 57.8511,-57.8511 93.6508,-137.848 93.6508,-226.255l0.0826782 0 0 -0.0118112 0 0 -0.0826782 0c0,-88.4184 -35.7997,-168.415 -93.6508,-226.267 -57.8511,-57.8511 -137.848,-93.6508 -226.255,-93.6508l0 -0.0826782 -0.0118112 0 0 0 0 0.0826782c-88.4184,0 -168.415,35.7997 -226.267,93.6508 -57.8511,57.8511 -93.6508,137.848 -93.6508,226.255l-0.0826782 0 0 0.0118112zm221.247 53.4337c-10.2285,9.945 -26.5633,9.70878 -36.5083,-0.50788 -9.945,-10.2167 -9.72059,-26.5633 0.50788,-36.5083l117.285 -113.742 18.0002 18.5081 -18.012 -18.5908c10.2639,-9.945 26.646,-9.69697 36.6028,0.566936 0.295279,0.295279 0.566936,0.60237 0.838593,0.90946l114.875 112.348c10.2285,9.945 10.4529,26.2917 0.50788,36.5083 -9.93319,10.2167 -26.2799,10.4529 -36.5083,0.50788l-98.3752 -96.2138 -99.2138 96.2138z'
    id='Layer_x0020_1' />
</svg>
)

class ScrollToTop extends React.Component {
	handleClick = e => {
		e.preventDefault();
		window.scrollTo({
	    top: 0,
	    behavior: "smooth"
		})
	}

	render() {
		return <button type="button" className="scroll-to-top-btn" onClick={this.handleClick}><ArrowUpIcon /></button>
	}
}

export default ScrollToTop;