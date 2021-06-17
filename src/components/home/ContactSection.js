import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import ContactForm from "../partials/ContactForm"

const Section = styled.section`
  width: 100%;
  display: flex;
  min-height: 50vh;
  position: relative;
  justify-content: center;
  @media screen and (max-width: 760px) {
    display: none;
  }
`
const Inner = styled.div`
  width: 100%;
  display: grid;
  z-index: 1;
  grid-template-columns: repeat(2, 1fr);
  transition: all 0.3s ease;
  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`

const MobileContainer = styled.div`
  display: none;
  @media screen and (max-width: 760px) {
    display: flex;
    justify-content: center;
    background-color: #ceb862;
    width: 100%;
  }
`

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  width: 100%;
  background-image: url("https://images.prismic.io/italiano-bros/e49910b2-dd40-4e68-9186-9bc9fa5b84c0_a24a9fb2-2c8c-4820-b8e8-6b2085f9c6cc_IMG_3978.png?auto=compress,format");
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 760px) {
    display: none;
  }
`
const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #ceb862;
  @media screen and (max-width: 760px) {
    display: flex;
  }
`

const ColumnInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 50%;
`
const HeadingTwo = styled.h2`
  font-size: 2.5rem;
  color: #fff;
  margin: 0.8rem;
`

const ContactSection = _ => {
  const [messageStatus, setStatus] = useState("hidden")
  const [response, setResponse] = useState(null)
  const [openModal, setModal] = useState(false)
  //will display a modal once user sends email

  return (
    <Section>
      <Inner>
        <ColumnLeft>
          <ColumnInner>
            <HeadingTwo>Broad Vision.</HeadingTwo>
            <HeadingTwo>Careful Thought.</HeadingTwo>
            <HeadingTwo>Handcrafted Design.</HeadingTwo>
          </ColumnInner>
        </ColumnLeft>

        <ColumnRight>
          <ContactForm
            setModal={setModal}
            setResponse={setResponse}
            setStatus={setStatus}
          />
        </ColumnRight>
      </Inner>
    </Section>
  )
}

ContactSection.propTypes = {}

export default ContactSection
