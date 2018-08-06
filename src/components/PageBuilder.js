import React, { Fragment } from 'react'
import Img from 'gatsby-image'

const Figure = ({ picture }) => (
  <figure>
    <Img
      {...picture.localFile.childImageSharp}
    />
    <figcaption dangerouslySetInnerHTML={{ __html: picture.caption }} />
  </figure>
)

const PageBuilder = ({
	pageBuilder
}) => (
	pageBuilder.map((layout, i) => {
        if (layout.__typename === `WordPressAcf_gallery`) {
          if(layout.gallery.length <= 1) {
            return (
              <div key={`${i} image-gallery`}>
                {layout.gallery.map((picture, idx) => {
                  return (
                    <Figure
                      key={idx}
                      picture={picture}
                    />
                  )
                })}
              </div>
            )
          } else {
            const half = Math.ceil(layout.gallery.length / 2.0)
            const galleries = [ layout.gallery.slice(0, half), layout.gallery.slice(half) ]
            return (
              <div key={`${i} image-gallery`}>
                <ul className="layout">
                  {galleries.map((gallery, i) => (
                    <li key={i} className="layout__item u-1/2@lap-and-up">
                      {gallery.map((picture, idx) => (
                        <Figure
                          key={idx}
                          picture={picture}
                        />
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
        }
        if (layout.__typename === `WordPressAcf_testimonials`) {
          const { heading, entries } = layout
          return (
            <div key={`${i}-testimonials`} className="mv+">
              <h2 className="title-boxed mb+"><span className="title-boxed__text" style={{ background: "#60C3D9" }}>{heading}</span></h2>
              {entries.map((x, tIdx) => {
                const writeUp = x.write_up.map((block, j) => {
                  if(block.acf_fc_layout === 'text_block') {
                    return <div key={j} dangerouslySetInnerHTML={{ __html: block.block }} />
                  }
                  if(block.acf_fc_layout === 'quote') {
                    return <p key={j}><span className="copy-highlight" dangerouslySetInnerHTML={{ __html: block.quote }} /></p>
                  }
                  return null
                })

                const avatar = <Fragment>
                  <h3 className="item__header">{x.primary_name}</h3>
                  <div className="item__subheader" dangerouslySetInnerHTML={{ __html: x.secondary_name }} />
                </Fragment>

                return (
                  x.photo ? <ul key={tIdx} className="layout mb+">
                    <li className="layout__item u-1/3@lap-and-up">
                      <div className="item__img">
                        <Img
                          className="fit-cover"
                          {...x.photo.localFile.childImageSharp}
                        />
                      </div>
                      {avatar}
                    </li>
                    <li className="layout__item u-2/3@lap-and-up">
                      {writeUp}
                    </li>
                  </ul> : <div key={tIdx} className="mb+">
                    {avatar}
                    {writeUp}
                  </div>
                )}
              )}
            </div>
          )
        }
        if (layout.__typename === `WordPressAcf_text_block`) {
          const content = layout.block
          return (
            <div key={`${i}-block`} className="content-block" dangerouslySetInnerHTML={{__html: content}} />
          )
        }
        if (layout.__typename === 'WordPressAcf_call_to_action') {
          const content = layout.block
          return (
            <div key={`${i}-cta`} className="content-block">
              <hr />
              <div dangerouslySetInnerHTML={{__html: content}} />
            </div>
          )
        }
        if (layout.__typename === `WordPressAcf_highlight`) {
          const content = layout.block
          return (
            <div key={`${i}-highlight`} className="content-block copy-highlight mb+" dangerouslySetInnerHTML={{__html: content}} />
          )
        }
        if (layout.__typename === `WordPressAcf_video`) {
          const { video_url, aspect_ratio } = layout
          const style = {
            paddingBottom: `${(100.0/aspect_ratio).toFixed(2)}%`
          }

          return (
            <div key={`${i}-video`} className="responsive-media text-center mv+" style={style}>
              <iframe title={`${i}-video`} src={video_url} frameBorder="0" className="responsive-media__media" allowFullScreen />
            </div>
          )
        }

        return null
      })
)

export default PageBuilder

export const ACFGallery = graphql`
	fragment ACFGallery on WordPressAcf_gallery {
	  gallery {
	    caption
	    localFile {
	      childImageSharp {
	        fluid(maxWidth: 680, traceSVG: { color: "#aed7df" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
	      }
	    }
	  }
	}
`

export const ACFTextBlock = graphql`
	fragment ACFTextBlock on WordPressAcf_text_block {
	  block
	}
`

export const ACFCallToAction = graphql`
	fragment ACFCallToAction on WordPressAcf_call_to_action {
	  block
	}
`
export const ACFHighlight = graphql`
	fragment ACFHighlight on WordPressAcf_highlight {
	  block
	}
`

export const ACFVideo = graphql`
	fragment ACFVideo on WordPressAcf_video {
	  video_url
	  aspect_ratio
	}
`

export const ACFTestimonials = graphql`
	fragment ACFTestimonials on WordPressAcf_testimonials {
	  heading
	  entries {
	    primary_name
	    secondary_name
	    photo {
	      localFile {
	        childImageSharp {
	          fluid(maxWidth: 360, traceSVG: { color: "#aed7df" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
	        }
	      }
	    }
	    write_up {
	      acf_fc_layout
	      block
	      quote
	    }
	  }
	}
`