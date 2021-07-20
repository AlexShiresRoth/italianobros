import React from "react"
import { Link } from "gatsby"

import layoutStyles from "../footerstyles/Footer.module.scss"
import wideScreenLayoutStyles from "../footerstyles/FooterDesktop.module.scss"

const FooterLinks = ({ isMobile }) => {
  const styles = {
    textDecoration: "none",
    fontSize: "1.1rem",
  }
  const stylesWide = {
    textDecoration: "none",
    fontSize: "1.5rem",
  }
  const links = [
    { title: "Home", path: "/" },
    { title: "Services", path: "/Services" },
    { title: "Our Work", path: "/OurWork" },
    { title: "About", path: "/About" },
    { title: "Contact", path: "/Location" },
  ]

  const linksMap = links.map((link, i) => {
    return (
      <Link to={`${link.path}`} style={isMobile ? styles : stylesWide} key={i}>
        <li
          key={i}
          className={
            isMobile
              ? layoutStyles.f__right__li
              : wideScreenLayoutStyles.f__desktop__right__li
          }
        >
          {link.title}
        </li>
      </Link>
    )
  })
  return <>{linksMap}</>
}

export default FooterLinks
