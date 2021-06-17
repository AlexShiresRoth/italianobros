import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  width: 100%;
  @media screen and (max-width: 760px) {
    display: none;
  }
`
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Heading = styled.h2`
  font-size: 1.5rem;
  color: #707070;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 1rem;
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
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
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

const ViewAllServices = () => {
  return (
    <Section>
      <Inner>
        <Link to={"/Services"}>
          <FancyButton>View All Services</FancyButton>
        </Link>
      </Inner>
    </Section>
  )
}

ViewAllServices.propTypes = {}

export default ViewAllServices
