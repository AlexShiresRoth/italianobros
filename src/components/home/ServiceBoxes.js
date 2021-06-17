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
`
const InnerBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem;
  z-index: 2;
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
`
const HeadingLink = styled.h2`
  font-size: 1.8rem;
  z-index: 3;
  text-transform: uppercase;
  border: 2px solid #fff;
  padding: 1rem;
  transition: all 0.3s ease;
  min-width: 20rem;
  text-align: center;
  color: #fff;
  &:hover {
    cursor: pointer;
    background: #fff;
    color: #ceb862;
    & a {
      color: #ceb862;
    }
  }
  & a {
    text-decoration: none;
    color: #fff;
    transition: all 0.5s ease-in-out;
    &:hover {
      color: #ceb862;
    }
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
