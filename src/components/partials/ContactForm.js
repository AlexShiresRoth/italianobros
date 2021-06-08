import React, { useState } from "react"
import axios from "axios"
import styled from "styled-components"
const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 90%;
  gap: 1rem;
  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
    padding: 1rem 0;
  }
`
const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
`
const Input = styled.input`
  background: #c2ac54;
  border: 0;
  padding: 1rem 0;
  color: #eee;
  text-indent: 10px;
  border-radius: 2px;
  transition: all 0.3s ease;
  &:focus {
    outline: 1px solid transparent;
  }
  &:hover {
    box-shadow: 0 0 0 2px #eee;
  }
  &::placeholder {
    color: #eee;
  }
  @media screen and (max-width: 760px) {
    background: #ffffff25;
  }
`
const Button = styled.button`
  background: #fff;
  padding: 1rem 2rem;
  border: 0px solid #eee;
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 1px 20px #c2ac5444;
  transition: all 0.3s ease;
  color: #ceb862;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 3px #ffffff33;
  }
`

const ContactForm = ({ setStatus, setResponse, setModal }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  const { firstName, lastName, email, phone, message } = data

  const handleInputs = event => {
    console.log(event?.target.name)
    setData({
      ...data,
      [event?.target.name]: event?.target.value,
    })
  }

  const formSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const body = JSON.stringify({ ...data })
    await axios({
      method: "POST",
      url: `https://asrserver.herokuapp.com/api/send-email`,
      headers: {
        "Access-Control-Allow-Origin": "https://www.italianobrosenterprise.com",
        "Content-Type": "application/json",
      },
      data: body,
    })
      .then(res => {
        setData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        })
        //save the response for the modal
        setResponse(res)
        //status pertains to alert type on modal
        setStatus("success")
        //Open the modal
        setModal(true)
        //change submit button text back
        setLoading(false)
        console.log(res)
      })
      .catch(err => {
        setStatus("error")
        setModal(true)
        console.log("error", err)
      })
  }

  const inputs = [
    {
      title: "firstName",
      label: "First Name",
      placeholder: "Enter First Name",
      type: "text",
      value: firstName,
    },
    {
      title: "lastName",
      label: "Last Name",
      placeholder: "Enter Last Name",
      type: "text",
      value: lastName,
    },
    {
      title: "email",
      label: "Email",
      placeholder: "Enter Your Email",
      type: "email",
      value: email,
    },
    {
      title: "phone",
      label: "Phone #",
      placeholder: "Enter your phone #",
      type: "tel",
      value: phone,
    },
    {
      title: "message",
      label: "Message",
      placeholder: "Enter your message",
      type: "text",
      value: message,
    },
  ]

  const renderInputs = inputs.map((input, i) => {
    return (
      <InputColumn key={i}>
        <Label htmlFor={input.title}>{input.label}</Label>
        <Input
          name={input.title}
          id={input.title}
          type={input.type}
          placeholder={input.placeholder}
          value={input.value}
          onChange={e => handleInputs(e)}
          required={true}
        />
      </InputColumn>
    )
  })

  return (
    <Form onSubmit={formSubmit}>
      {renderInputs}
      <InputColumn>
        <Button onSubmit={formSubmit} disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </Button>
      </InputColumn>
    </Form>
  )
}

export default ContactForm
