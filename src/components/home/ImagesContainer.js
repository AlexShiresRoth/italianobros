import React, { useContext } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { ArrowRight } from "react-feather"
import { ContentContext } from "../RootLayout"
import GalleryImgs from "./GalleryImgs"
import { Link } from "gatsby"
const Section = styled.section`
  padding: 4rem 0;
  background: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const Heading = styled.button`
  font-size: 1.8rem;
  color: #707070;
  font-weight: 100;
  font-family: mencken-std, sans-serif;
  text-transform: uppercase;
  margin-bottom: 1rem;
  align-content: center;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background: #ceb862;
    color: #fff;
    border: 2px solid #ceb862;
    box-shadow: 0 1px 30px #66666633;
  }
`

const ImagesContainer = props => {
  const { pageContent } = useContext(ContentContext)
  if (!pageContent) {
    return <p>Loading...</p>
  }
  const { data } = pageContent
  console.log(data)
  const imgs = [
    data["mainpage-section2"][0].image1,
    data["mainpage-section2"][0].image2,
    data["mainpage-section2"][0].image3,
    data["mainpage-section2"][0].image4,
    data["mainpage-section2"][0].image5,
    data["mainpage-section2"][0].image6,
  ]

  return (
    <Section>
      <Link to="/OurWork" style={{ textDecoration: "none" }}>
        <Heading>
          View The Gallery <ArrowRight />
        </Heading>
      </Link>
      <GalleryImgs imgs={imgs} />
    </Section>
  )
}

ImagesContainer.propTypes = {}

export default ImagesContainer
