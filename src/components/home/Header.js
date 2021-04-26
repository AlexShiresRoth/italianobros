import React, { useContext } from "react"
import { Link } from "gatsby"

import layoutStyles from "./headerstyles/Header.module.scss"
import wideScreenLayoutStyles from "./headerstyles/HeaderDesktop.module.scss"
import { ContentContext } from "../RootLayout"

const Header = () => {
  const { pageContent } = useContext(ContentContext)

  if (!pageContent) {
    return <p>please wait...</p>
  }
  return (
    <header className={layoutStyles.header__section}>
      <div className={layoutStyles.overlay} />
      <div className={layoutStyles.herobox}>
        <h1
          className={`${layoutStyles.heading} ${wideScreenLayoutStyles.desktop__heading}`}
        >
          {pageContent.data["mainpage-header"][0]["mainpage-slogan"][0].text}
        </h1>
        <Link to={"/Services"}>
          <button
            className={`${layoutStyles.button} ${wideScreenLayoutStyles.desktop__button}`}
          >
            Learn More
          </button>
        </Link>
      </div>
    </header>
  )
}

export default Header
