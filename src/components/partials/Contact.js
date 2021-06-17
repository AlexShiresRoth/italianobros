import React, { useState } from "react"
import { Modal } from "./Modal"
import ContactForm from "./ContactForm"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  top: 100%;
  z-index: ${props => (props.toggled ? -999 : 0)};
  min-height: ${props => (props.toggled ? "50vh" : 0)};
  max-height: ${props => (props.toggled ? "100vh" : 0)};
  opacity: ${props => (props.toggled ? 1 : 0)};
  transform: translateY(${props => (props.toggled ? "0" : "-100vh")});
  transition: all 0.3s ease;
  background-color: #fbfbfb;
  @media screen and (max-width: 760px) {
    margin-top: 0;
  }
`
const Inner = styled.div`
  width: 90%;
  display: grid;
  z-index: -999;
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
const Expander = styled.div`
  display: none;
  @media screen and (max-width: 760px) {
    display: block;
    width: 90%;
    padding: 1rem 0;
    & h2 {
      color: #fff;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 400;
      font-family: Cormorant Garamond;
    }
  }
`
const ColumnLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  width: 100%;
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
    display: ${props => (props.toggled ? "flex" : "none")};
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
  color: #707070;
  margin: 0.8rem;
`

const Contact = ({ onClick, toggled }) => {
  const [messageStatus, setStatus] = useState("hidden")
  const [response, setResponse] = useState(null)
  const [openModal, setModal] = useState(false)
  //will display a modal once user sends email
  const modalClose = () => {
    if (openModal) {
      setModal(false)
      onClick()
    }
  }

  return (
    <>
      <Modal
        status={messageStatus}
        onClick={modalClose}
        modalCase={openModal}
        closeContact={onClick}
        response={response}
      />
      <MobileContainer>
        <Expander onClick={() => onClick(!toggled)}>
          <h2>{toggled ? "Close" : "Contact Us"}</h2>
        </Expander>
      </MobileContainer>
      <Container toggled={toggled}>
        <Inner toggled={toggled}>
          <ColumnLeft>
            <ColumnInner>
              <HeadingTwo>Broad Vision.</HeadingTwo>
              <HeadingTwo>Careful Thought.</HeadingTwo>
              <HeadingTwo>Handcrafted Design.</HeadingTwo>
            </ColumnInner>
          </ColumnLeft>

          <ColumnRight toggled={toggled}>
            <ContactForm
              setModal={setModal}
              setResponse={setResponse}
              setStatus={setStatus}
            />
          </ColumnRight>
        </Inner>
      </Container>
    </>
  )
}

export default Contact
