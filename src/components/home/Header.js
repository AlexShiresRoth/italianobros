import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import layoutStyles from "./headerstyles/Header.module.scss"
import { ContentContext } from "../RootLayout"
import Slider from "./slider/Slider"
import styled from "styled-components"

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${props => props.datatype});
  background-size: cover;
  background-position: 50% 0vh;
  background-repeat: no-repeat;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
`

const Heading = styled.h1`
  font-family: mencken-std, sans-serif;
  font-weight: 700;
  font-style: italic;
  max-width: 70%;
  color: #eee;
  font-size: 5rem;
  text-shadow: 0 1px 20px #99999933;
  text-align: center;

  @media screen and (max-width: 760px) {
    font-size: 2.5rem;
    line-height: 1.5;
  }
`

const HeroBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  z-index: 20;
`

const FancyButton = styled.button`
  background-color: transparent;
  color: #fff;
  padding: 1rem 1.5rem;
  margin-top: 4rem;
  border: 0;
  min-width: 14rem;
  position: relative;
  z-index: 1;
  font-size:1.2rem;
  border: 2px solid #ceb862;
  border-radius:2px;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    background-color: #ceb862;
    color: #fff;
    &::after {
      top: 0;
      left: 0;
    }
  }

  @media screen and (max-width: 760px) {
    width: 15rem;
    margin-top: 1rem;
  }
`

const Header = () => {
  const { pageContent } = useContext(ContentContext)

  const [sliderImgs, setImgs] = useState([])

  //retrieve image data from context
  useEffect(() => {
    if (pageContent) {
      const imgs = pageContent.data["mainpage-header"].map(img => ({
        url: img.image.url,
      }))

      setImgs([imgs[imgs.length - 1], ...imgs, imgs[0]])
    }
  }, [pageContent])

  if (!pageContent) {
    return <p>please wait...</p>
  }

  return (
    <HeaderSection datatype={sliderImgs[0]}>
      <Slider sliderImgs={sliderImgs} layoutStyles={layoutStyles} />
      <HeroBox>
        <Heading>
          {pageContent.data["mainpage-header"][0]["mainpage-slogan"][0].text}
        </Heading>
        <Link to={"/Services"}>
          <FancyButton>Learn More</FancyButton>
        </Link>
      </HeroBox>
    </HeaderSection>
  )
}

export default Header
