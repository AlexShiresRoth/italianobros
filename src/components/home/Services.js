import React, { useContext } from "react"
import { Link } from "gatsby"

import layoutStyles from "./servicestyles/Services.module.scss"
import { ContentContext } from "../RootLayout"

const Services = () => {
  const { pageContent } = useContext(ContentContext)

  if (!pageContent) {
    return (
      <section className={layoutStyles.services__section}>
        <p>Loading...</p>
      </section>
    )
  }

  const { data } = pageContent

  return (
    <section className={layoutStyles.services__section}>
      <div className={layoutStyles.container}>
        <div className={layoutStyles.heading}>
          <h3 className={layoutStyles.services__h3}>
            {data["mainpage-section1"][0]["mainpage-heading1"][0].text}
          </h3>
          <hr className={layoutStyles.services__hr} />
        </div>
        <div className={layoutStyles.paragraph__section}>
          <p className={layoutStyles.paragraph}>
            {data["mainpage-section1"][0]["mainpage-paragraph"][0].text}
          </p>
        </div>
        <div className={layoutStyles.button__container}>
          <Link
            to={"/Services"}
            style={{ textDecoration: "none", alignSelf: "center" }}
          >
            <button className={layoutStyles.button}>Learn More</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services
