import React, { useContext, useState } from "react"
import { Link } from "gatsby"
import { ArrowLeft, ArrowRight } from "react-feather"
import layoutStyles from "./gallerystyles/Gallery.module.scss"
import { ContentContext } from "../RootLayout"
import styled from "styled-components"

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("https://images.prismic.io/italiano-bros/5bda5480-8af2-4041-8ccc-bd38bc757b58_IMG_4183.jpg?auto=compress,format");
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  height: 100vh;
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
  transform: translateX(${props => (props.toggled ? "-50vw" : "0vw")});
  &:hover {
    box-shadow: 0 1px 30px #66666622;
  }
`

const HideToggler = styled.div`
  position: absolute;
  bottom: 0%;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  z-index: 2;
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

const Gallery = () => {
  const { pageContent } = useContext(ContentContext)
  const [isToggled, toggleBox] = useState(false)
  const [textBoxHidden, hideTextBox] = useState(false)
  const handleTransition = () =>
    isToggled ? hideTextBox(true) : hideTextBox(false)

  if (!pageContent) {
    return <p>Loading...</p>
  }

  const { data } = pageContent

  const imgs = [
    data["mainpage-section2"][0].image1,
    data["mainpage-section2"][0].image2,
    data["mainpage-section2"][0].image3,
  ]
  console.log(textBoxHidden)
  return (
    <Section bgImg={imgs[1].url}>
      <Inner>
        <Column
          style={{ background: "#fbfbfb" }}
          toggled={isToggled}
          onTransitionEnd={e => handleTransition()}
        >
          <TextBox toggled={isToggled} textBox={textBoxHidden}>
            <div className={layoutStyles.heading}>
              <h3 className={layoutStyles.gallery__h3}>
                {
                  data["mainpage-section2"][0]["mainpage-section2-heading2"][0]
                    .text
                }
              </h3>
              <hr className={layoutStyles.gallery__hr} />
            </div>
            <p className={layoutStyles.paragraph}>
              {data["mainpage-section2"][0].paragraph[0].text}
            </p>
            <div
              className={layoutStyles.button__container}
              style={{ marginTop: "2rem" }}
            >
              <Link to={"/OurWork"} style={{ textDecoration: "none" }}>
                <button className={layoutStyles.button}>Learn more</button>
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
                  <ArrowLeft size={20} /> View Full Image
                </>
              ) : (
                <>
                  Show Text <ArrowRight size={20} />
                </>
              )}
            </ToggleButton>
          </HideToggler>
        </Column>
        <Column style={{ flex: "1.2" }}></Column>
      </Inner>
    </Section>
  )
}

export default Gallery
