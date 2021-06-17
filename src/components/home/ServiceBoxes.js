import React, { useContext } from "react"
import styled from "styled-components"
import { ContentContext } from "../RootLayout"
import { Link } from "gatsby"

const Section = styled.section`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  flex-wrap: no-wrap;
  @media screen and (max-width: 760px) {
    display: none;
  }
`
const Box = styled.div`
  display: block;
  position: relative;
  min-width: 33.33%;
  flex: 4;
  background: #222;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background: #ceb862;
  }
  @media screen and (max-width: 760px) {
    flex: 1;
    background: transparent;
    min-width: 50%;
  }
`
const InnerBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem;
  z-index: 2;
  &:hover {
    cursor: pointer;
    background: #ceb862;
  }
  @media screen and (max-width: 760px) {
    padding: 1rem;
  }
`
const Image = styled.img`
  object-fit: cover;
  position: absolute;
  top: 0;
  opacity: 0.4;
  display: block;
  height: 100%;
  width: 100%;
  z-index: 1;
  @media screen and (max-width: 760px) {
    display: none;
  }
`
const HeadingLink = styled.h2`
  font-size: 2rem;
  letter-spacing: 1.8px;
  z-index: 3;
  text-transform: uppercase;
  padding: 1rem;
  transition: all 0.3s ease;
  min-width: 20rem;
  text-align: center;
  font-family: Cormorant Garamond;
  color: #fff;

  & a {
    text-decoration: none;
    color: #fff;
    transition: all 0.5s ease-in-out;
    &:hover {
      color: #ceb862;
    }
  }
  @media screen and (max-width: 760px) {
    font-size: 1rem;
    min-width: 1rem;
    color: #707070;
  }
`

const linkClass = { textDecoration: "none", minWidth: "33.33%" }

const ServiceBoxes = () => {
  const { serviceLinks, pageContent } = useContext(ContentContext)

  const services = serviceLinks
    .map((item, i) => {
      return (
        <Link to={item.to} style={linkClass}>
          <Box key={i}>
            <Image src={item.img} />
            <InnerBox>
              <HeadingLink>{item.title}</HeadingLink>
            </InnerBox>
          </Box>
        </Link>
      )
    })
    .slice(0, 3)
  return <Section>{services}</Section>
}

ServiceBoxes.propTypes = {}

export default ServiceBoxes
