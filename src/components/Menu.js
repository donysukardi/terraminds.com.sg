import React from "react";
import { Link } from "gatsby"
import FacebookIcon from '../components/FacebookIcon'

class Menu extends React.Component {
	state = {
		supportsHover: false,
		activeSubMenu: null
	}

	handleMenuClick = (slug, e) => {
    e.preventDefault()
    if(!this.state.supportsHover) {
	    e.persist()
	    this.setState(state => {
	    	if(slug === state.activeSubMenu) {
	    		return null
	    	} else {
	    		return {
	    			activeSubMenu: slug
	    		}
	    	}
	    })
	  }
  }

  handleDocClick = e => {
  	const menu = document.querySelector('.nav')
  	const el = document.querySelector('.menu-open')
    if (el && !el.contains(e.target)) {
      this.setState({
      	activeSubMenu: null
      })
    }

    if(!menu.contains(e.target)) {
    	e.stopPropagation()
    	e.preventDefault()
    }
  }

  handleMouseMove = () => {
  	this.setState({
  		supportsHover: true
  	})
  	this.removeEventHandlers()
  }

  handleTouchStart = () => {
  	this.removeEventHandlers()
  }

  componentDidMount() {
  	document.addEventListener('mousemove', this.handleMouseMove)
  	document.addEventListener('touchstart', this.handleTouchStart)
  }

  removeEventHandlers = () => {
  	document.removeEventListener('mousemove', this.handleMouseMove)
  	document.removeEventListener('touchstart', this.handleTouchStart)
  }

  componentWillUnmount() {
    this.removeEventHandlers()
    document.removeEventListener('click', this.handleDocClick)
  }

  componentDidUpdate(prevProps, prevState) {
  	const routeChanged = (this.props.location.pathname !== prevProps.location.pathname)
      	|| (this.props.location.key  !== prevProps.location.key)
    if(
      !this.state.supportsHover) {
      	if(routeChanged)  {
		      this.setState({
		      	activeSubMenu: null
		      })
	  		} else if(this.state.activeSubMenu !== prevState.activeSubMenu) {
	  			if(this.state.activeSubMenu) {
	  				document.addEventListener('click', this.handleDocClick)
	  			} else {
	  				document.removeEventListener('click', this.handleDocClick)
	  			}
	  		}
    }
  }

	render() {
		const { activeRoute, menu } = this.props;
		const key = this.state.supportsHover ? this.props.location.key : 0;

		return (
			<nav key={key} className={`nav${this.state.supportsHover ? ' supports-hover' : ''}`}>
				<ul className="nav__list">
					{menu.items.map(item => {
						const hasSubMenu =
							item.wordpress_children && !!item.wordpress_children.length;
						const extraProps = hasSubMenu
							? { onClick: this.handleMenuClick.bind(this, item.object_slug) }
							: {};
						const wideDropdownMenu =
							hasSubMenu && item.wordpress_children.length > 6;
						const dropdownCls = `nav-dropdown-list${
							wideDropdownMenu ? " nav-dropdown-list--wide" : ""
						}${
							this.state.activeSubMenu === item.object_slug ? " menu-open" : ""
						}`;

						return (
							<li className="nav__item" key={item.title}>
								<Link
									{...extraProps}
									to={`/${item.object_slug}`}
									className={`nav__link${
										activeRoute === item.object_slug ? " nav__link--active" : ""
									}${item.object_slug === "contact" ? " nav__link-btn" : ""}`}
									activeClassName="nav__link--active"
									dangerouslySetInnerHTML={{ __html: item.title }}
								/>
								{hasSubMenu && (
									<ul className={dropdownCls}>
										{item.wordpress_children.map(child => {
											const hasSubSubMenu =
												child.wordpress_children &&
												!!child.wordpress_children.length;
											const subSubMenuCls =
												hasSubSubMenu &&
												child.wordpress_children.every(x => x.title.length <= 5)
													? "sub-sub-menu--compact"
													: "";
											return (
												<li key={child.title}>
													<Link
														to={`/${child.object_slug}`}
														className={
															child.object_slug === item.object_slug
																? "menu-link--all"
																: ""
														}
													>
														<span
															dangerouslySetInnerHTML={{ __html: child.title }}
														/>
													</Link>
													{hasSubSubMenu && (
														<ul className={`sub-sub-menu ${subSubMenuCls}`}>
															{child.wordpress_children.map(x => (
																<li key={x.title}>
																	<Link to={`/${x.object_slug}`}>
																		<span
																			dangerouslySetInnerHTML={{
																				__html: x.title
																			}}
																		/>
																	</Link>
																</li>
															))}
														</ul>
													)}
												</li>
											);
										})}
									</ul>
								)}
							</li>
						);
					})}
					<li className="nav__item nav__item--social">
						<a
							className="nav__link-btn"
							href="http://facebook.com/terraminds.com.sg"
						>
							<FacebookIcon className="nav__link-img" />
						</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Menu;
