import React, { Component } from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/Layout";

class PageTemplate extends Component {
  render() {
    const {
      data: { wordpressPage, allWordpressAcfOptions },
      location,
    } = this.props;
    const { programmes } = allWordpressAcfOptions.edges[0].node;
    const currentPage = wordpressPage;
    const { partners, announcements } = currentPage.acf;
    const bgImg =
      currentPage.featured_media.localFile.childImageSharp.resize.src;

    return (
      <Layout location={location} isHeaderTinted>
        <section className="hero">
          <div
            className="hero__img"
            style={{ backgroundImage: `url(${bgImg})` }}
          />
          <div className="hero__content">
            <div className="copy">
              <div className="wrapper">
                <div className="copy__content">
                  <div className="emblem">
                    <img
                      alt=""
                      src="https://terra.dsds.io/wp-content/uploads/2018/01/terramindsaward.png"
                    />
                  </div>
                  <div className="title-wrapper">
                    <h1 className="title title--left title--bare title--tilt-below title--tilt-below-rev copy__heading">
                      <div className="title__text">
                        <div className="title__primary">
                          Nurturing creativity
                        </div>
                        <div className="title__secondary">
                          through science and nature
                        </div>
                      </div>
                    </h1>
                    <div className="copy__body">
                      Discover a unique form of science tuition, science
                      enrichment and nature-based play &amp; learn experiences
                      for children
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
        <section className="section--news">
          <div className="wrapper mv">
            <ul className="announcement">
              {announcements.map((x) => {
                const isInternalLink = x.link.charAt(0) === "/";
                const LinkComponent = isInternalLink ? Link : "a";
                const linkProps = isInternalLink
                  ? { to: x.link }
                  : {
                      href: x.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    };

                return (
                  <li key={x.title} className="announcement__item">
                    <LinkComponent
                      className="announcement__link link-silent media"
                      {...linkProps}
                    >
                      <span className="announcement__tag btn media__img">
                        {x.tag}
                      </span>
                      <span className="announcement__title  media__body">
                        {x.title}
                      </span>
                    </LinkComponent>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="section--home-programmes relative z-2">
          <div className="wrapper">
            <div className="layout">
              <div className="section--programme-list layout__item u-1/2@lap-and-up">
                <ul className="list">
                  {programmes.map((programme) => (
                    <li
                      key={programme.page.post_name}
                      className="list__item u-1/2@phab-and-up u-1/1@lap-and-up"
                    >
                      <Link
                        to={programme.page.post_name}
                        className="list__item-content programme programme--home"
                      >
                        <div className="item__header programme__panel">
                          <Img
                            alt=""
                            className="panel__img"
                            {...programme.image.localFile.childImageSharp}
                          />
                        </div>
                        <div className="item__copy">
                          <h3 className="panel__title">
                            {programme.page.post_title}
                          </h3>
                          <div className="panel__description">
                            {programme.copy}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="section--facebook-feeds layout__item u-1/2@lap-and-up text-center">
                <iframe
                  title="Facebok Feeds"
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fterra.minds%2F&amp;tabs=timeline&amp;width=340&amp;height=700&amp;small_header=true&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=false&amp;appId=1080190808760749"
                  width="340"
                  height="700"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowtransparency="true"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="section--science">
          <div className="wrapper">
            <p className="mb">
              Terra Minds offers a wide variety of exciting and educationally
              enriching workshops that help students become more equipped for
              the future. Register now to help your child embark on an exciting
              new journey that will help set their educational foundation and
              build their teamwork skills!
            </p>
            <Link className="btn" to="contact">
              Register now
            </Link>
          </div>
        </section>

        <section className="section--why-terraminds">
          <div className="wrapper">
            <h2 className="section-heading text-center">Why Terra Minds?</h2>
            <ul className="flex list--321 flex--center  list--divider list--divider-small">
              <li className="list__item">
                <div
                  href=""
                  className="list__item-content flex--middle text-center mv+"
                >
                  <img
                    alt=""
                    src="//terra.dsds.io/wp-content/uploads/2016/02/steps.svg"
                    className="item__img img-icon"
                  />
                  <h3 className="item__header">Optimised learning</h3>
                  <div className="item__copy">
                    <div className="item__group">
                      Our courses help students build their logic and teamwork
                      skills to help ensure future educational success. Whether
                      your child is interested in art, science, technology or
                      math, we can open the door for your child’s next
                      educational adventure!
                    </div>
                  </div>
                  <div className="item__footer">
                    <Link to="programmes">View all programmes</Link>
                  </div>
                </div>
              </li>
              <li className="list__item">
                <div
                  href="team"
                  className="list__item-content flex--middle text-center mv+"
                >
                  <img
                    alt=""
                    src="//terra.dsds.io/wp-content/uploads/2016/02/avatar.svg"
                    className="item__img img-icon"
                  />
                  <h3 className="item__header">Reliable team</h3>
                  <div className="item__copy">
                    <div className="item__group">
                      Terra Minds offers you and your child excellent support
                      whether it is through our experienced customer service
                      team or through our extremely qualified and experienced
                      ex-MOE and Science-trained teachers.
                    </div>
                  </div>
                  <div className="item__footer">
                    <Link to="team">Meet our team</Link>
                  </div>
                </div>
              </li>
              <li className="list__item">
                <div className="list__item-content flex--middle text-center mv+">
                  <img
                    alt=""
                    src="//terra.dsds.io/wp-content/uploads/2016/02/smiley.svg"
                    className="item__img img-icon"
                  />
                  <h3 className="item__header">Happy customers</h3>
                  <div className="item__copy">
                    <div className="item__group">
                      <p>
                        We have worked with hundreds of happy parents and
                        students in the past! Read our testimonials to learn
                        more about our past successful partnerships.
                      </p>
                      <p>
                        <strong>
                          Terra Minds
                          <em> –</em>
                        </strong>{" "}
                        <em>We are on this journey together</em>
                      </p>
                    </div>
                  </div>
                  <div className="item__footer">
                    <Link to="testimonials">Read testimonials</Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="section--partnerships">
          <div className="wrapper">
            <p className="mb+">
              Terra Minds Learning Centre is proud to partner with the following
              education centres.
            </p>
            <ul className="flex flex--center flex--fit">
              {partners.map((x) => (
                <li key={x.name} className="flex__item flex-auto">
                  <div className="partner" title={x.name}>
                    <img
                      alt={x.name}
                      src={x.image.localFile.childImageSharp.resize.src}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section--collaboration">
          <div className="wrapper">
            <p>
              School or institution interested for collaboration such as
              carrying out Terra Minds’ programme at your facility,{" "}
              <Link to="contact">contact us for more information</Link>.
            </p>
          </div>
        </section>

        <section className="section--quote">
          <div className="wrapper">
            <h3>“Let children learn about, from, in and for nature”</h3>
          </div>
        </section>
      </Layout>
    );
  }
}

export default PageTemplate;

export const pageQuery = graphql`
  query {
    wordpressPage(slug: { eq: "home" }) {
      featured_media {
        localFile {
          childImageSharp {
            resize(width: 1920) {
              src
            }
          }
        }
      }
      acf {
        partners {
          name
          image {
            localFile {
              childImageSharp {
                resize(width: 150, traceSVG: { color: "#60C3D9" }) {
                  src
                }
              }
            }
          }
        }
        announcements {
          tag
          title
          link
        }
      }
    }
    site {
      id
      siteMetadata {
        title
        subtitle
      }
    }
    allWordpressAcfOptions {
      ...ACFOptions
    }
  }
`;
