import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
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
  background-image: url(${props => props.bgImg});
  background-size: cover;
  background-position: center;
  overflow: hidden;
  @media screen and (max-width: 760px) {
    background-image: none;
    height: auto;
    min-height: 30vh;
    margin-top: -2rem;
  }
`

const Inner = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  @media screen and (max-width: 760px) {
    flex-direction: column-reverse;
    position: relative;
    align-items: center;
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
  transition: all 1.2s ease-in-out;
  position: relative;
  @media screen and (max-width: 760px) {
    width: 95%;
    &:nth-child(1) {
      display: flex;
    }
    &:nth-child(2) {
      z-index: 2;
      background-color: transparent !important;
    }
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
  transform: translateX(${props => (props.toggled ? "-50vw" : "0vw")});
  max-width: ${props => (props.toggled ? "0%" : "60rem")};
  &:hover {
    box-shadow: 0 1px 30px #66666622;
  }
  @media screen and (max-width: 760px) {
    padding: 3rem 0;

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
    font-size: 1.5rem;
    text-align: left;
  }
`
const Heading = styled.h3`
  font-size: 2.5rem;
  color: #707070;
  max-width: 80rem;
  text-transform: uppercase;

  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
    text-align: left;
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
    font-size: 1.1rem;
  }
`
const ButtonContainer = styled.div`
  margin-top: 1rem;
  @media screen and (max-width: 760px) {
    display: flex;
    justify-content: flex-end;
  }
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
    height: 2.8rem;
    min-width: 13rem;
    color: #fff;
    background: #ceb862;
  }
`
const Image = styled.img`
  object-fit: contain;
  width: 90%;
  @media screen and (max-width: 760px) {
  }
`
const About = _ => {
  const { pageContent } = useContext(ContentContext)
  const [isSeen, setVisible] = useState(false)
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) setVisible(true)
  }, [inView])

  if (!pageContent) {
    return <p>Loading...</p>
  }

  const { data } = pageContent

  const paragraph =
    data["mainpage-section3"][0]["mainpage-section3-paragraph3"][0].text
  const heading =
    data["mainpage-section3"][0]["mainpage-section3-heading"][0].text
  const marc = data["marc-italiano"][0]
  return (
    <Section>
      <Inner ref={ref}>
        <Column
          style={{
            transform: `translateX(${isSeen ? 0 : "-40vw"})`,
            opacity: isSeen ? 1 : 0,
          }}
        >
          <TextBox>
            <SubHeading>{heading}</SubHeading>
            <Heading>Our History</Heading>
            <Divider />
            <Par>{paragraph}</Par>

            <ButtonContainer>
              <Link
                to={"/About"}
                style={{ textDecoration: "none", alignSelf: "center" }}
              >
                <Button>Discover our history</Button>
              </Link>
            </ButtonContainer>
          </TextBox>
        </Column>
        <Column
          style={{
            transform: `translateX(${isSeen ? 0 : "40vw"})`,
            opacity: isSeen ? 1 : 0,
          }}
        >
          <Image src={marc["profile-image"].url} />{" "}
        </Column>
      </Inner>
    </Section>
  )
}

export default About
