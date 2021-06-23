import React, { createRef, useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import { ArrowLeft, ArrowRight } from "react-feather"
import { ContentContext } from "../RootLayout"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"

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
    padding: 0;
    height: auto;
    min-height: 60vh;
    overflow: hidden;
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
    width: 100%;
  }
`
const Column = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: ${props => (props.toggled ? 0 : "0.8")};
  transition: all 1.2s ease-in-out;
  position: relative;
  @media screen and (max-width: 760px) {
    width: 95%;
    &:nth-child(1) {
      display: flex;
      background: #ceb86211;
    }
    &:nth-child(2) {
      z-index: 0;
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
  position: absolute;
  display: flex;
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
    &:hover {
      box-shadow: 0 1px 30px transparent;
    }
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

const Heading = styled.h3`
  font-size: 3.5rem;
  color: #707070;
  max-width: 80rem;
  text-transform: uppercase;
  transition: all 1s ease-in-out;
  @media screen and (max-width: 760px) {
    font-size: 1.9rem;
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

const Services = () => {
  const { pageContent } = useContext(ContentContext)
  const [isToggled, toggleBox] = useState(false)
  const [textBoxHidden, hideTextBox] = useState(false)
  const [beenVisited, setVisit] = useState(false)
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  })

  const handleTransition = () =>
    isToggled ? hideTextBox(true) : hideTextBox(false)

  useEffect(() => {
    if (inView) setVisit(true)
  }, [inView])

  if (!pageContent) {
    return (
      <Section>
        <p>Loading...</p>
      </Section>
    )
  }

  const { data } = pageContent

  const img = `https://images.prismic.io/italiano-bros/e49910b2-dd40-4e68-9186-9bc9fa5b84c0_a24a9fb2-2c8c-4820-b8e8-6b2085f9c6cc_IMG_3978.png?auto=compress,format`

  return (
    <Section style={{ opacity: beenVisited ? 1 : 0 }}>
      <Inner ref={ref} bgImg={img}>
        <Column style={{ flex: "1.2" }}>
          <Image src={img} />
        </Column>
        <Column
          toggled={isToggled}
          onTransitionEnd={e => handleTransition()}
          style={{
            backgroundColor: "#fff",
            opacity: beenVisited ? 1 : 0,
            transform: `translateX(${beenVisited ? "0" : "40vw"})`,
          }}
        >
          <TextBox toggled={isToggled} textBox={textBoxHidden}>
            <SubHeading>
              {data["mainpage-section1"][0]["mainpage-heading1"][0].text}
            </SubHeading>
            <Heading>Services</Heading>
            <Divider />

            <Par>
              {data["mainpage-section1"][0]["mainpage-paragraph"][0].text}
            </Par>
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
