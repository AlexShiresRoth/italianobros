import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import { ArrowLeft, ArrowRight } from "react-feather"
import { ContentContext } from "../RootLayout"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import axios from "axios"

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 0px solid #fbfbfb;
  width: 100%;
  height: 50rem;
  padding: 4rem 0;
  transition: all 1.2s ease-in-out;
  @media screen and (max-width: 760px) {
    background-image: none;
    height: auto;
    min-height: 60vh;
    margin-top: -2rem;
    overflow: hidden;
    padding: 0rem;
  }
`

const Inner = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  background-image: url(${props => props.bgImg});
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 760px) {
    flex-direction: column-reverse;
    position: relative;
    align-items: center;
    background-image: none;
  }
`
const Column = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: ${props => (props.toggled ? "0" : ".8")};
  transition: all 1.2s ease-in-out;

  @media screen and (max-width: 760px) {
    width: 95%;

    &:nth-child(1) {
      display: flex;
      margin-top: -1rem;
    }
    &:nth-child(2) {
      z-index: 0;
      margin-top: -3rem;
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
  min-width: 30rem;
  width: 90%;
  padding: 4.5rem;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  transition: all 1s ease-in-out;
  opacity: ${props => (props.toggled ? 0 : 1)};
  &:hover {
    box-shadow: 0 1px 30px #66666622;
  }
  @media screen and (max-width: 760px) {
    padding: 3rem 0;
    position: static;
    justify-content: center;
    min-width: 5rem;
    &:hover {
      box-shadow: 0 1px 30px transparent;
    }
  }
`
const Heading = styled.h3`
  font-size: 2.5rem;
  color: #707070;
  max-width: 80rem;
  text-transform: uppercase;
  transition: all 1s ease-in-out;
  @media screen and (max-width: 760px) {
    font-size: 1.9rem;
    text-align: left;
  }
`
const SubHeading = styled.h4`
  font-size: 1.2rem;
  color: #70707088;
  max-width: 80rem;
  text-transform: uppercase;
  margin: 0.5rem 0;
  transition: all 1s ease-in-out;
  @media screen and (max-width: 760px) {
    font-size: 0.9rem;
    text-align: left;
  }
`

const Divider = styled.hr`
  height: 5px;
  background: #ceb862;
  border: 0;
  width: 6rem;
  margin: 1rem 0;
  transition: all 1s ease-in-out;
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
  transition: all 1s ease-in-out;
  @media screen and (max-width: 760px) {
    font-size: 1.1rem;
  }
`

const HideToggler = styled.div`
  position: absolute;
  bottom: 0%;

  display: flex;
  justify-content: flex-start;
  width: 100%;
  z-index: 400;
  @media screen and (max-width: 760px) {
    display: none;
  }
`
const ToggleButton = styled.button`
  background: transparent;
  position: relative;
  z-index: 4;
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
  const [beenVisited, setVisit] = useState(false)

  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) setVisit(true)
  }, [inView])

  const handleTransition = () =>
    isToggled ? hideTextBox(true) : hideTextBox(false)

  if (!pageContent) {
    return <p>Loading...</p>
  }

  const { data } = pageContent
  const img =
    "https://images.prismic.io/italiano-bros/5bda5480-8af2-4041-8ccc-bd38bc757b58_IMG_4183.jpg?auto=compress,format"

  return (
    <Section>
      <Inner ref={ref} bgImg={img}>
        <Column
          style={{
            background: "#fff",
            opacity: beenVisited ? 1 : 0,
            transform: `translateX(${beenVisited ? "0" : "-40vw"})`,
          }}
          toggled={isToggled}
          onTransitionEnd={e => handleTransition()}
        >
          <TextBox toggled={isToggled} textBox={textBoxHidden}>
            <SubHeading>
              {
                data["mainpage-section2"][0]["mainpage-section2-heading2"][0]
                  .text
              }
            </SubHeading>
            <Heading>Our Work</Heading>
            <Divider />

            <Par>{data["mainpage-section2"][0].paragraph[0].text}</Par>
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
