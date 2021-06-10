import React, { Fragment, useContext } from "react"
import { Link } from "gatsby"

import layoutStyles from "./aboutstyles/About.module.scss"
import { ContentContext } from "../RootLayout"

const About = _ => {
  const { pageContent } = useContext(ContentContext)

  if (!pageContent) {
    return <p>Loading...</p>
  }

  const { data } = pageContent

  console.log(data["mainpage-section3"][0]["mainpage-section3-image"])

  const mainImg = data["mainpage-section3"][0]["mainpage-section3-image"].url
  const paragraph =
    data["mainpage-section3"][0]["mainpage-section3-paragraph3"][0].text
  const heading =
    data["mainpage-section3"][0]["mainpage-section3-heading"][0].text

  return (
    <Fragment>
      <section className={layoutStyles.about__section}>
        <div></div>
        <div className={layoutStyles.container}>
          <div className={layoutStyles.heading}>
            <h3 className={layoutStyles.about__h3}>{heading}</h3>
            <hr className={layoutStyles.about__hr} />
          </div>
          <div className={layoutStyles.paragraph__section}>
            <p className={layoutStyles.paragraph}>{paragraph}</p>
          </div>

          <div className={layoutStyles.button__container}>
            <Link
              to={"/About"}
              style={{ textDecoration: "none", alignSelf: "center" }}
            >
              <button className={layoutStyles.button}>
                Discover our history
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default About
