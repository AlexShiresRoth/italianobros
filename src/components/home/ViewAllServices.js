import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"
import { useInView } from "react-intersection-observer"

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  width: 100%;
  background: #ceb86211;
  overflow: hidden;
  @media screen and (max-width: 760px) {
    padding: 4rem;
    background: #ceb86211;
  }
`
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FancyButton = styled.button`
  background-color: #ceb862;
  color: #fff;
  padding: 1rem 1.5rem;
  font-weight: 700;
  border: 0;
  min-width: 25rem;
  position: relative;
  z-index: 1;
  font-size: 1.4rem;
  letter-spacing: 1.3px;
  border: 2px solid #ceb862;
  box-shadow: 0 1px 10px #22222205;
  border-radius: 2px;
  transition: all 1s ease-in-out;
  &:hover {
    cursor: pointer;
    color: #fff;
    &::after {
      top: 0;
      left: 0;
    }
  }

  @media screen and (max-width: 760px) {
    min-width: 12rem;
    width: 15rem;
    margin-top: 0rem;
    font-size: 1rem;
  }
`

const ViewAllServices = () => {
  const [isSeen, setVisible] = useState(false)
  const { ref, inView, entry } = useInView({
    threshold: 0.3,
  })

  useEffect(() => {
    if (inView) setVisible(true)
  }, [inView])

  return (
    <Section>
      <Inner ref={ref}>
        <Link to={"/Services"}>
          <FancyButton
            style={{ transform: `translateY(${isSeen ? "0vh" : "40vh"})` }}
          >
            View All Services
          </FancyButton>
        </Link>
      </Inner>
    </Section>
  )
}

ViewAllServices.propTypes = {}

export default ViewAllServices
