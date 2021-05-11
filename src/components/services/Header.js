import React, { useContext } from "react"
import { ContentContext } from "../RootLayout"

import layoutStyles from "./headerstyles/Header.module.scss"

const Header = () => {
  const { pageContent } = useContext(ContentContext)
  if (!pageContent) {
    return <p>Loading...</p>
  }
  console.log(pageContent.data["services-heading-image"])
  return (
    <header
      className={layoutStyles.header__section}
      style={{
        backgroundImage: `url(${pageContent.data["services-heading-image"].url})`,
      }}
    ></header>
  )
}

export default Header
