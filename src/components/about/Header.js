import React from "react"

import layoutStyles from "./styles/Header.module.scss"
const Header = () => {
  return (
    <header
      className={layoutStyles.about__header}
      style={{ backgroundPosition: "top" }}
    ></header>
  )
}

export default Header
