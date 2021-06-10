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
  border-top: 5px solid #ceb86266;
  width: 100%;
`

const Inner = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`
const Column = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`
const TextBox = styled.div`
  width: 80%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Image = styled.img`
  object-fit: cover;
  width: 100%;
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
      <Inner>
        <Column style={{ flex: "1.2" }}>
          <Image src="https://images.prismic.io/italiano-bros/5bda5480-8af2-4041-8ccc-bd38bc757b58_IMG_4183.jpg?auto=compress,format" />
        </Column>
        <Column>
          <TextBox>
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
          </TextBox>
        </Column>
      </Inner>
    </Section>
  )
}

export default Services
