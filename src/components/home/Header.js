import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import layoutStyles from "./headerstyles/Header.module.scss"
import wideScreenLayoutStyles from "./headerstyles/HeaderDesktop.module.scss"
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
  height: 40rem;
  overflow: hidden;
  position: relative;
`

const Heading = styled.h1`
  font-family: mencken-std, sans-serif;
  font-weight: 700;
  font-style: italic;
  max-width: 70%;
  color: #eee;
  font-size: 4.3rem;
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
          <button
            className={`${layoutStyles.button} ${wideScreenLayoutStyles.desktop__button}`}
          >
            Learn More
          </button>
        </Link>
      </HeroBox>
    </HeaderSection>
  )
}

export default Header
