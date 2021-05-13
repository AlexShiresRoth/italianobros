import React, { Fragment } from "react"
import { Link } from "gatsby"
import NavMenu from "./NavMenu"
import Contact from "./Contact"
import MobileMenu from "./MobileMenu"
import DesktopNavMenu from "./DesktopNavMenu"

import layoutStyles from "./navstyles/Nav.module.scss"
import wideScreenLayoutStyles from "./navstyles/NavDesktop.module.scss"

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
      contactToggled: false,
      serviceToggle: false,
      isMobile: false,
    }
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.renderServicesHoverMenu = this.renderServicesHoverMenu.bind(this)
    this.removeServicesHoverMenu = this.removeServicesHoverMenu.bind(this)
    this.contactToggle = this.contactToggle.bind(this)
  }

  //handles when service menus are toggled to stop background scrolling
  handleScrolling = () => {
    if (this.state.toggled || this.state.contactToggled) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "scroll"
    }
  }
  // if nav menu is open on resize to different media query, close out
  handleWindowResizeWithToggledMenu() {
    if (this.state.toggled && !this.state.isMobile) {
      this.setState({ toggled: !this.state.toggled })
    }
  }
  toggleNav = () => {
    this.state.toggled
      ? this.setState({ toggled: false })
      : this.setState({ toggled: true, contactToggled: false })
    console.log(this.state.toggled)
  }

  contactToggle = () => {
    this.state.contactToggled
      ? this.setState({ contactToggled: false })
      : this.setState({ contactToggled: true, toggled: false })
  }
  renderServicesHoverMenu() {
    if (!this.state.serviceToggle) {
      this.setState({ serviceToggle: true })
    }
  }
  removeServicesHoverMenu() {
    if (this.state.serviceToggle) {
      this.setState({ serviceToggle: false })
    }
  }
  //sets state to mobile view
  handleWindowResize = () => {
    this.setState({
      isMobile: window.innerWidth < 860,
    })
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize)
    this.handleWindowResize()
    this.handleScrolling()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize)
    this.handleScrolling()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.toggled !== prevState.toggled ||
      this.state.contactToggled !== prevState.contactToggled
    ) {
      this.handleScrolling()
    }
    if (this.state.isMobile !== prevState.isMobile) {
      this.handleWindowResizeWithToggledMenu()
    }
  }

  render() {
    return (
      <Fragment>
        <nav
          className={
            this.state.isMobile
              ? layoutStyles.navbar__container
              : wideScreenLayoutStyles.dt__navbar__container
          }
        >
          <div
            className={
              this.state.isMobile
                ? layoutStyles.nb__top
                : wideScreenLayoutStyles.dt__top
            }
          >
            {this.state.isMobile ? (
              <NavMenu onClick={this.toggleNav} toggled={this.state.toggled} />
            ) : null}
            <div
              className={
                this.state.isMobile
                  ? layoutStyles.none
                  : wideScreenLayoutStyles.dt__top__tier
              }
            ></div>

            {!this.state.isMobile ? (
              <DesktopNavMenu
                isMobile={this.state.isMobile}
                serviceToggle={this.state.serviceToggle}
                renderServicesHoverMenu={this.renderServicesHoverMenu}
                removeServicesHoverMenu={this.removeServicesHoverMenu}
                contactToggle={this.contactToggle}
                contactToggled={this.state.contactToggled}
              />
            ) : null}

            <div
              className={
                this.state.isMobile
                  ? layoutStyles.nb__logo__nav
                  : wideScreenLayoutStyles.dt__logo__nav
              }
            >
              {this.state.isMobile ? (
                <Link to="/">
                  <img
                    src={
                      "https://res.cloudinary.com/snackmanproductions/image/upload/v1568323268/italianobros/logos/Black_s394t0.png"
                    }
                    alt="italiano bros logo"
                    className={layoutStyles.nb__image}
                  />
                </Link>
              ) : null}
            </div>
            <div />
          </div>
          <Contact
            onClick={this.contactToggle}
            toggled={this.state.contactToggled}
            isMobile={this.state.isMobile}
          />
          {this.state.isMobile ? (
            <MobileMenu toggled={this.state.toggled} />
          ) : null}
        </nav>
      </Fragment>
    )
  }
}
