import React, { useContext } from "react"
import { Link } from "gatsby"

import layoutStyles from "./servicestyles/Services.module.scss"
import { ContentContext } from "../RootLayout"
import styled from "styled-components"

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  margin: -2rem 0;
  z-index: 10;
  padding: 3rem;
  box-shadow: 0 1px 10px #66666666;
  background: #fff;
  display: flex;
  flex-direction: column;
  max-width: 60%;
`

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
    <Section>
      <Container>
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
      </Container>
    </Section>
  )
}

export default Services
