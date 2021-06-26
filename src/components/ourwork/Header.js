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
      className={layoutStyles.ourwork__header}
      style={{
        backgroundImage: `url(${pageContent.data["header-img"].url})`,
      }}
    >
      {" "}
    </header>
  )
}

export default Header
