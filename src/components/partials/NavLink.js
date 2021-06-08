import React from "react"
import { Link } from "gatsby"

import layoutStyles from "./navstyles/NavLink.module.scss"

export const NavLink = _ => {
  const Links = [
    { path: "/", title: "Home" },
    { path: "/Services", title: "Services" },
    { path: "/OurWork", title: "Our Work" },
    { path: "/About", title: "About" },
    { path: "/Location", title: "Contact" },
  ]

  const LinksMap = Links.map(({ path, title }) => (
    <Link
      to={path}
      style={{ textDecoration: "none" }}
      key={Math.floor(Math.random() + Math.random() * 10000)}
      activeClassName={layoutStyles.active}
    >
      <li className={layoutStyles.mb__anchor}>{title}</li>
    </Link>
  ))

  return <>{LinksMap}</>
}
