import React, { useContext } from "react"
import { ContentContext } from "../RootLayout"
import layoutStyles from "./styles/Header.module.scss"
const Header = () => {
  const { pageContent } = useContext(ContentContext)
  if (!pageContent) {
    return <p>Loading...</p>
  }

  return (
    <header
      className={layoutStyles.about__header}
      style={{
        background: `url(${pageContent.data["header-image"].url})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    ></header>
  )
}

export default Header
