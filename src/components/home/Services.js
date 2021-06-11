import React, { useContext, useState } from "react"
import { Link } from "gatsby"
import { ArrowLeft, ArrowRight } from "react-feather"
import layoutStyles from "./servicestyles/Services.module.scss"
import { ContentContext } from "../RootLayout"
import styled from "styled-components"

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 0px solid #fbfbfb;
  width: 100%;
  height: 100vh;
  background-image: url(https://images.prismic.io/italiano-bros/b4b4ad37-986d-4595-b751-ed377fc86b5f_IMG_1402.jpg);
  background-size: cover;
  background-position: center;
`

const Inner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`
const Column = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: ${props => (props.toggled ? 0 : 0.8)};
  transition: all 0.5s ease-in-out;
  position: relative;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`
const TextBox = styled.div`
  width: 80%;
  padding: 4rem;
  display: ${props => (props.textBox ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  opacity: ${props => (props.toggled ? 0 : 1)};
  transform: translateX(${props => (props.toggled ? "50vw" : "0vw")});
  max-width: ${props => (props.toggled ? "0%" : "60rem")};
  &:hover {
    box-shadow: 0 1px 30px #66666622;
  }
`

const HideToggler = styled.div`
  position: absolute;
  bottom: 0%;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  z-index: 2;
  // background: #ceb86211;
`
const ToggleButton = styled.button`
  background: transparent;
  margin-right: 2rem;
  padding: 1rem;
  min-width: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px solid transparent;
  color: ${props => (props.toggled ? "#fff" : "#707070")};
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 30px ${props => (props.toggled ? "#ffffff00" : "#eee")};
  }
`

const Services = () => {
  const { pageContent } = useContext(ContentContext)

  const [isToggled, toggleBox] = useState(false)
  const [textBoxHidden, hideTextBox] = useState(false)
  const handleTransition = () =>
    isToggled ? hideTextBox(true) : hideTextBox(false)
  if (!pageContent) {
    return (
      <section className={layoutStyles.services__section}>
        <p>Loading...</p>
      </section>
    )
  }

  console.log("toggled", isToggled)

  const { data } = pageContent

  return (
    <Section>
      <Inner>
        <Column style={{ flex: "1.2" }}></Column>
        <Column
          style={{ backgroundColor: "#fff" }}
          toggled={isToggled}
          onTransitionEnd={e => handleTransition()}
        >
          <TextBox toggled={isToggled} textBox={textBoxHidden}>
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
          <HideToggler>
            <ToggleButton
              onClick={e => toggleBox(!isToggled)}
              toggled={isToggled}
            >
              {!isToggled ? (
                <>
                  View Full Image <ArrowRight size={20} />
                </>
              ) : (
                <>
                  <ArrowLeft size={20} /> Show Text{" "}
                </>
              )}
            </ToggleButton>
          </HideToggler>
        </Column>
      </Inner>
    </Section>
  )
}

export default Services
