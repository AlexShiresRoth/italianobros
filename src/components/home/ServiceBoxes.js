import React, { useContext } from "react"
import styled from "styled-components"
import { ContentContext } from "../RootLayout"
import { Link } from "gatsby"

const Section = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns:repeat(2,1fr);
  grid-template-rows: repeat(2,1fr);
  @media screen and (max-width:760px){
    display:none;
  }
`
const Box = styled.div`
  height:20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  &:last-child {
    grid-column-start:1;
    grid-column-end:3;
  }
`
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #ceb862;
  opacity: 0.3;
  z-index: 2;
`
const Image = styled.img`
  object-fit: cover;
  position: absolute;
  top: 0;
  display: block;
  height: 100%;
  width: 100%;
  opacity: 0.7;
  z-index: 1;
`
const HeadingLink = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  z-index: 3;
  text-transform: uppercase;
  border: 2px solid #fff;
  padding: 1rem;
  transition: all 0.3s ease;
  min-width:20rem;
  text-align:center;
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

const ServiceBoxes = () => {
  const { serviceLinks, pageContent } = useContext(ContentContext)

  console.log("page!", pageContent)
  const services = serviceLinks.map((item, i) => {
    return (
      <Box key={i}>
        <Overlay />
        <Image src={item.img} />

        <HeadingLink>
          <Link to={item.to}>{item.title}</Link>
        </HeadingLink>
      </Box>
    )
  })
  return <Section>{services}</Section>
}

ServiceBoxes.propTypes = {}

export default ServiceBoxes
