import React, { useContext } from "react"
import Header from "./Header"
import AboutInfo from "./AboutInfo"
import { ContentContext } from "../RootLayout"
const AboutLayout = () => {
  const { pageContent } = useContext(ContentContext)

  if (!pageContent) {
    return <p>Loading...</p>
  }
  console.log(pageContent.data)
  const guy = pageContent.data["guy-italiano"][0]
  const marc = pageContent.data["marc-italiano"][0]
  const employees = [
    {
      name: guy.name[0].text,
      content: guy.text[0].text,
      image: guy["profile-image"].url,
      positionOne: "left",
      positionTwo: "right",
    },
    {
      name: marc.name[0].text,
      content: marc.paragraph2[0].text,
      image: marc["profile-image"].url,
      positionOne: "left",
      positionTwo: "right",
    },
  ]
  return (
    <>
      <Header />
      <AboutInfo employees={employees} />
    </>
  )
}

export default AboutLayout
