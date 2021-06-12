import React, { useContext } from "react"
import { Link } from "gatsby"
import { ContentContext } from "../RootLayout"
import styled from "styled-components"

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`

const Inner = styled.div`
  display: flex;
  justify-content: center;
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
  width: 90%;
  padding: 4.5rem;
  display: ${props => (props.textBox ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  opacity: ${props => (props.toggled ? 0 : 1)};
  transform: translateX(${props => (props.toggled ? "50vw" : "0vw")});
  max-width: ${props => (props.toggled ? "0%" : "60rem")};
`
const Heading = styled.h3`
  font-size: 2.5rem;
  color: #707070;
  max-width: 80rem;
  text-transform: uppercase;
`

const Divider = styled.hr`
  height: 5px;
  background: #ceb862;
  border: 0;
  width: 6rem;
  margin: 1rem 0;
`

const Par = styled.p`
  font-size: 1.25rem;
  color: #707070;
  line-height: 2;
  letter-spacing: 1.3px;
  font-family: "Work Sans";
  margin: 1rem 0;
  text-align: center;
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
`
const About = _ => {
  const { pageContent } = useContext(ContentContext)

  if (!pageContent) {
    return <p>Loading...</p>
  }

  const { data } = pageContent

  const paragraph =
    data["mainpage-section3"][0]["mainpage-section3-paragraph3"][0].text
  const heading =
    data["mainpage-section3"][0]["mainpage-section3-heading"][0].text

  return (
    <Section>
      <Inner>
        <Column>
          <TextBox>
            <Heading>{heading}</Heading>
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
      </Inner>
    </Section>
  )
}

export default About
