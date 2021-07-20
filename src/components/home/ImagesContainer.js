import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { ArrowRight } from "react-feather"
import { ContentContext } from "../RootLayout"
import GalleryImgs from "./GalleryImgs"
import { Link } from "gatsby"
import { useInView } from "react-intersection-observer"

const Section = styled.section`
  padding: 4rem 0;
  background: #ceb86211;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media screen and (max-width: 760px) {
    min-height: 100vh;
    padding-top: 2rem;
  }
`
const Heading = styled.button`
  font-size: 1.8rem;
  color: #707070;
  background: transparent;
  font-family: "Cormorant Garamond", sans-serif;
  text-transform: uppercase;
  margin-bottom: 1rem;
  align-content: center;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1.2s ease-in-out;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`

const ImagesContainer = ({ instaData }) => {
  const { pageContent } = useContext(ContentContext)
  const [isSeen, setVisible] = useState(false)

  const { ref, inView, entry } = useInView({
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) setVisible(true)
  }, [inView])

  if (!pageContent) {
    return <p>Loading...</p>
  }
  const { data } = pageContent

  console.log(data)

  return (
    <Section ref={ref}>
      <Link to="/OurWork" style={{ textDecoration: "none" }}>
        <Heading
          style={{ transform: `translateY(${isSeen ? "0vh" : "40vh"})` }}
        >
          View The Gallery <ArrowRight />
        </Heading>
      </Link>
      <GalleryImgs isSeen={isSeen} instaData={instaData} />
    </Section>
  )
}

ImagesContainer.propTypes = {}

export default ImagesContainer
