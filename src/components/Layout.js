import React from "react"
import PropTypes from "prop-types"
import { Helmet } from 'react-helmet'
import { graphql, Link, StaticQuery } from "gatsby"
import ScrollToTop from '../components/ScrollToTop'
import Logo from '../components/Logo'
import Menu from './Menu'
import '../main.css'

class Layout extends React.Component {
  render() {
    const { isHeaderTinted, children, menu, year, activeRoute, location } = this.props
    const [headerMenu, footerMenu] =
      menu[0].node.slug === 'header-menu' ? [menu[0].node, menu[1].node] : [menu[1].node, menu[0].node];    

    const containerCls = `container${!isHeaderTinted ? ' backdrop' : ''}`
    const headerCls = `header${isHeaderTinted ? ' header--tinted' : ''}`
    const isBlog = activeRoute === 'blog'
    
    return (
      <div className={containerCls}>
        <Helmet defaultTitle={`Terra Minds`} titleTemplate={`%s | Terra Minds`}>
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Terra Minds" />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-chrome-192x192.png" />
          <link rel="manifest" href="/favicons/manifest.json" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#fff" />
          <meta name="application-name" content="Terra Minds" />
          <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Terra Minds" />
          <link rel="icon" type="image/png" sizes="228x228" href="/favicons/coast-228x228.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="230x230" href="/favicons/favicon-230x230.png" />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <link rel="yandex-tableau-widget" href="/favicons/yandex-browser-manifest.json" />
          <meta name="msapplication-TileColor" content="#fff" />
          <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
          <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
          <meta property="twitter:image" content="/favicons/twitter.png" />
          <meta property="og:image" content="/favicons/open-graph.png" />
          <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)" href="/favicons/apple-touch-startup-image-320x460.png" />
          <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" href="/favicons/apple-touch-startup-image-640x920.png" />
          <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="/favicons/apple-touch-startup-image-640x1096.png" />
          <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="/favicons/apple-touch-startup-image-750x1294.png" />
          <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)" href="/favicons/apple-touch-startup-image-1182x2208.png" />
          <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)" href="/favicons/apple-touch-startup-image-1242x2148.png" />
          <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)" href="/favicons/apple-touch-startup-image-748x1024.png" />
          <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)" href="/favicons/apple-touch-startup-image-768x1004.png" />
          <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" href="/favicons/apple-touch-startup-image-1496x2048.png" />
          <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" href="/favicons/apple-touch-startup-image-1536x2008.png" />
        </Helmet>
        <header className={headerCls}>
          <Link className="header__logo-wrapper" to="/">
            <Logo className="header__logo" />
          </Link>
          <div className="header__nav">
            <Menu location={location} activeRoute={activeRoute} menu={headerMenu} />
          </div>
        </header>
        <main className="main">
          {children}
        </main>
        {isBlog && <ScrollToTop />}
        <section className="footer-nav">
          <div className="wrapper">
            <nav className="nav">
              <ul className="nav__list">
                {footerMenu.items.map(item => (
                  <li key={item.object_slug} className="nav__item">
                    <Link className="nav__link" to={`/${item.object_slug}`} dangerouslySetInnerHTML={{ __html: item.title }} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
        <footer className="footer">
          <Link className="footer__logo-wrapper" to="/">
            <Logo className="footer__logo" />
          </Link>
          <div className="footer__info">
            <div className="footer__info-section">
              Office: 73 Ubi Road 1 #09-62 Oxley Bizhub<br> Singapore 408733<br>Lesson location: 1 Marine Parade Central #02-03  (Above McDonalds)<br> Singapore 449408
            </div>
            <div className="footer__info-section">
              Tel: <a href="tel:+6569268757" className="link-silent">+65 6926 8757</a> / <a href="tel:+6598336282" className="link-silent">+65 9833 6282</a><br />
              Email:  <a href="mailto: info@terraminds.com.sg" className="link-silent"> info@terraminds.com.sg</a>
            </div>
          </div>
          <div className="footer__copyright">
            © {year} Terra Minds Learning Centre.
          </div>
        </footer>
      </div>
    )
  }
}

Layout.propTypes = {
  isHeaderTinted: PropTypes.bool,
  children: PropTypes.node,
  menu: PropTypes.array,
  year: PropTypes.string,
}

const LayoutWithOptions = props => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressWpApiMenusMenusItems {
          edges{
            node{
              slug
              count
              items {
                title
                object_slug
                order
                wordpress_children {
                  title
                  object_slug
                  wordpress_children{
                    title
                    object_slug
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Layout {...props} menu={data.allWordpressWpApiMenusMenusItems.edges} />}
  />
)

export default LayoutWithOptions
