import React, { useContext, useState } from "react"
import { Link } from "gatsby"
import { ArrowLeft, ArrowRight } from "react-feather"
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
  background-image: url(${props => props.bgImg});
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 760px) {
    background-image: none;
    height: auto;
  }
`

const Inner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 760px) {
    flex-direction: column-reverse;
    position: relative;
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
    &:nth-child(2) {
      height: 50vh;
      display: flex;
      position: relative;
    }
    &:nth-child(1) {
      position: absolute;
      top: 0%;
      z-index: 2;
      background-color: transparent !important;
    }
  }
`
const Image = styled.img`
  object-fit: contain;
  width: 100%;
  display: none;
  @media screen and (max-width: 760px) {
    display: block;
  }
`

const TextBox = styled.div`
  width: 90%;
  padding: 4.5rem;
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
  @media screen and (max-width: 760px) {
    padding: 0;
    align-items: center;

    justify-content: center;
  }
`
const Heading = styled.h3`
  font-size: 2.5rem;
  color: #707070;
  max-width: 80rem;
  text-transform: uppercase;
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
    color: #fff;
  }
`

const Divider = styled.hr`
  height: 5px;
  background: #ceb862;
  border: 0;
  width: 6rem;
  margin: 1rem 0;
  @media screen and (max-width: 760px) {
    height: 3px;
  }
`

const Par = styled.p`
  font-size: 1.25rem;
  color: #707070;
  line-height: 2;
  letter-spacing: 1.3px;
  font-family: "Work Sans";
  margin: 1rem 0;
  @media screen and (max-width: 760px) {
    display: none;
  }
`
const ButtonContainer = styled.div`
  margin-top: 1rem;
`

const Button = styled.button`
  border: 3px solid #ceb862;
  background: transparent;
  transition: all 0.2s;
  text-transform: uppercase;
  font-weight: 500;
  height: 3.2rem;
  min-width: 15rem;
  transition: all 0.3s ease-in-out;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    color: #fff;
    background: #ceb862;
  }
  @media screen and (max-width: 760px) {
    height: 2.5rem;
    min-width: 11rem;
    color: #eee;
  }
`

const HideToggler = styled.div`
  position: absolute;
  bottom: 0%;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  z-index: 2;
  @media screen and (max-width: 760px) {
    display: none;
  }
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
  const img =
    "https://images.prismic.io/italiano-bros/5bda5480-8af2-4041-8ccc-bd38bc757b58_IMG_4183.jpg?auto=compress,format"
  return (
    <Section bgImg={img}>
      <Inner>
        <Column
          style={{ background: "#fbfbfb" }}
          toggled={isToggled}
          onTransitionEnd={e => handleTransition()}
        >
          <TextBox toggled={isToggled} textBox={textBoxHidden}>
            <Heading>
              {
                data["mainpage-section2"][0]["mainpage-section2-heading2"][0]
                  .text
              }
            </Heading>
            <Divider />

            <Par>{data["mainpage-section2"][0].paragraph[0].text}</Par>
            <ButtonContainer>
              <Link to={"/OurWork"} style={{ textDecoration: "none" }}>
                <Button>View Gallery</Button>
              </Link>
            </ButtonContainer>
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
        <Column style={{ flex: "1.2" }}>
          <Image src={img}></Image>
        </Column>
      </Inner>
    </Section>
  )
}

export default Gallery
