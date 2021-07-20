import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ContentContext } from "../RootLayout"
import { Link } from "gatsby"
import { useInView } from "react-intersection-observer"

const Section = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 4rem 0 2rem 0;
  background: #ceb86211;
  @media screen and (max-width: 760px) {
    flex-direction: column;
    margin-top: 0.5rem;
    & a {
      width: 100%;
      margin: 0.5rem 0;
      border-radius: 20px;
    }
  }
`
const Inner = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  @media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    background: #ceb86211;
  }
`
const Box = styled.div`
  display: block;
  position: relative;
  height: 20rem;
  background: #666;
  overflow: hidden;

  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background: #ceb86266;
  }
  @media screen and (max-width: 760px) {
    flex: 1;
    background: transparent;
    min-width: 100%;
    width: 100%;
    height: 12rem;
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
    opacity: 0.7;
  }
`
const HeadingLink = styled.h2`
  font-size: 2rem;
  letter-spacing: 1.8px;
  z-index: 3;
  text-transform: uppercase;
  padding: 1rem;
  transition: all 1s ease;
  min-width: 20rem;
  text-align: center;
  font-family: Cormorant Garamond;
  color: #fff;
  opacity: 0;
  & a {
    text-decoration: none;
    color: #fff;
    transition: all 0.5s ease-in-out;
    &:hover {
      color: #ceb862;
    }
  }
  @media screen and (max-width: 760px) {
    font-size: 1.8rem;
    min-width: 1rem;
  }
`

const linkClass = { textDecoration: "none", minWidth: "33.33%" }

const ServiceBoxes = () => {
  const { serviceLinks } = useContext(ContentContext)
  const [isSeen, setVisible] = useState(false)
  const { ref, inView, entry } = useInView({
    threshold: 0.3,
  })

  useEffect(() => {
    if (inView) setVisible(true)
  }, [inView])

  const services = serviceLinks
    .map((item, i) => {
      return (
        <Link to={item.to} style={linkClass} key={i}>
          <Box>
            <Image src={item.img} />
            <InnerBox>
              <HeadingLink style={{ opacity: `${inView ? 1 : 0}` }}>
                {item.title}
              </HeadingLink>
            </InnerBox>
          </Box>
        </Link>
      )
    })
    .slice(0, 3)
  return (
    <Section ref={ref}>
      <Inner>{services}</Inner>
    </Section>
  )
}

ServiceBoxes.propTypes = {}

export default ServiceBoxes
