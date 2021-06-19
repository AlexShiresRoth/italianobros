import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import { ArrowDown } from "react-feather"
import { ContentContext } from "../RootLayout"
import Slider from "./slider/Slider"
import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  0%{
    opacity:0;
    transform:translateY(30vh);
  }
  100% {
    opacity:1;
    transform: translateY(0vh);
  }
`

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${props => props.datatype});
  background-size: cover;
  background-position: 50% 0vh;
  background-repeat: no-repeat;
  min-height: 95vh;
  overflow: hidden;
  position: relative;
`

const Heading = styled.h1`
  font-family: Cormorant Garamond;
  font-weight: 400;
  max-width: 70%;
  color: #eee;
  font-size: 6rem;
  text-shadow: 0 1px 20px #99999933;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out forwards;
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
  font-size: 1.2rem;
  border: 2px solid #ceb862;
  border-radius: 2px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 1.5s ease-in-out forwards;
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
    min-width: 15rem;
    margin-top: 2rem;
    background-color: #ceb862;
    font-weight: 400;
    padding: 1rem;
    font-size: 1.1rem;
  }
`
const ScrollDown = styled.div`
  position: absolute;
  bottom: 5%;
  left: 0;
  z-index: 3;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & svg {
    color: #fff;
  }
`
const Text = styled.h3`
  color: #fff;
  font-style: italic;
  font-weight: 100;
  font-family: Cormorant Garamond;
  font-size: 1rem;
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
      <Slider sliderImgs={sliderImgs} />
      <HeroBox>
        <Heading>
          {pageContent.data["mainpage-header"][0]["mainpage-slogan"][0].text}
        </Heading>
        <Link to={"/Services"}>
          <FancyButton>View Our Services</FancyButton>
        </Link>
      </HeroBox>
      <ScrollDown>
        <Items>
          <Text>Scroll</Text>
          <ArrowDown size={20} />
        </Items>
      </ScrollDown>
    </HeaderSection>
  )
}

export default Header
