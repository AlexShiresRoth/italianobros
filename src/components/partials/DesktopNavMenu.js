import React from "react"
import { Link } from "gatsby"

import { ServiceMenu } from "./ServiceMenu"
import wideScreenLayoutStyles from "./navstyles/NavDesktop.module.scss"

const DesktopNavMenu = props => {
  return (
    <div className={wideScreenLayoutStyles.dt__top__tier}>
      <ul className={wideScreenLayoutStyles.dt__ul}>
        <div className={wideScreenLayoutStyles.dt__nav__item}>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            activeClassName={wideScreenLayoutStyles.active}
          >
            <li className={wideScreenLayoutStyles.dt__li}>Home</li>
          </Link>
        </div>
        <div
          className={wideScreenLayoutStyles.dt__nav__item}
          onMouseEnter={() => props.renderServicesHoverMenu()}
          onMouseLeave={() => props.removeServicesHoverMenu()}
          style={{ position: "relative" }}
        >
          <Link
            to="/Services"
            style={{ textDecoration: "none" }}
            activeClassName={wideScreenLayoutStyles.active}
            className={wideScreenLayoutStyles.services_list}
          >
            <li className={wideScreenLayoutStyles.dt__li}>Services</li>
          </Link>

          <ServiceMenu toggled={props.serviceToggle} />
        </div>
        <div className={wideScreenLayoutStyles.dt__nav__item}>
          <Link
            to="/OurWork"
            style={{ textDecoration: "none" }}
            activeClassName={wideScreenLayoutStyles.active}
          >
            <li className={wideScreenLayoutStyles.dt__li}>Our Work</li>
          </Link>
        </div>
        <div className={wideScreenLayoutStyles.dt__nav__item}>
          <Link
            to="/About"
            style={{ textDecoration: "none" }}
            activeClassName={wideScreenLayoutStyles.active}
          >
            <li className={wideScreenLayoutStyles.dt__li}>About</li>
          </Link>
        </div>
        <div className={wideScreenLayoutStyles.dt__nav__item}>
          <Link
            to="/Location"
            style={{ textDecoration: "none" }}
            activeClassName={wideScreenLayoutStyles.active}
          >
            <li className={wideScreenLayoutStyles.dt__li}>Contact</li>
          </Link>
        </div>
      </ul>
      <div className={wideScreenLayoutStyles.dt__logo__nav}>
        <Link to="/">
          <img
            src={
              "https://res.cloudinary.com/snackmanproductions/image/upload/v1568323268/italianobros/logos/Black_s394t0.png"
            }
            alt="italiano bros logo"
            className={wideScreenLayoutStyles.dt__logo__nav}
          />
        </Link>
      </div>
      <div />
      <button
        className={wideScreenLayoutStyles.dt__button}
        onClick={props.contactToggle}
      >
        {!props.contactToggled ? `Get A Quote` : `Close`}
      </button>
    </div>
  )
}

export default DesktopNavMenu
