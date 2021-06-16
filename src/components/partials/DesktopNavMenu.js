import React from "react"
import { Link } from "gatsby"
import { ServiceMenu } from "./ServiceMenu"
import styled from "styled-components"

const TopTier = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  height: 100%;
  z-index: 2;
  background: #fff;
  @media screen and (max-width: 760px) {
    display: none;
    max-height: 0;
  }
`
const Inner = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  max-width: 9rem;
`

const Logo = styled.img`
  object-fit: contain;
  width: 100%;
`
const Item = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & a {
    text-decoration: none;
  }
`
const List = styled.ul`
  list-style: none;
  display: flex;
  height: 100%;
`

const ListItem = styled.li`
  color: #666;
  font-size: 1.2rem;
  margin: 0 1rem;
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  font-family: Cormorant Garamond;
  &:after {
    content: " ";
    width: 0%;
    bottom: -125%;
    left: 0;
    position: absolute;
    text-align: center;
    border-bottom: 2px solid #ceb862;
    transition: all 0.3s ease;
  }
  &:hover {
    color: #ceb862;
    &::after {
      content: " ";
      width: 100%;
      right: 0;
    }
  }
`

const Button = styled.button`
  border: 1px solid #ceb862;
  background: transparent;
  transition: all 0.2s;
  text-transform: uppercase;
  font-weight: 500;
  height: 3.2rem;
  min-width: 13rem;
  position: relative;
  &:hover {
    cursor: pointer;
    background: #ceb862;
    color: #fff;
  }
`

const DesktopNavMenu = ({
  setServiceToggle,
  serviceToggled,
  contactToggle,
  contactToggled,
}) => {
  const links = [
    { path: "/", text: "Home", hoverable: false },
    { path: "/Services", text: "Services", hoverable: true },
    { path: "/OurWork", text: "Our Work", hoverable: false },
    { path: "/About", text: "About", hoverable: false },
    { path: "/Location", text: "Location", hoverable: false },
  ]

  return (
    <>
      <style>
        {`.active li {
      color:#CEB862;
      border-bottom:2px solid transparent;
      position:relative;
    }
      .active li::after{
        content:"";
        width:100%;
        bottom:-125%;
        left:0;
        position:absolute;
        border-bottom:2px solid #CEB862;
    }`}
      </style>
      <TopTier>
        <Inner>
          <List>
            {links.map((linkObj, key) => {
              return linkObj.hoverable ? (
                <Item
                  key={key}
                  onMouseEnter={e => setServiceToggle(true)}
                  onMouseLeave={e => setServiceToggle(false)}
                  style={{ position: serviceToggled ? "relative" : "" }}
                >
                  <Link to={linkObj.path} activeClassName="active">
                    <ListItem>{linkObj.text}</ListItem>
                  </Link>
                  <ServiceMenu toggled={serviceToggled} />
                </Item>
              ) : (
                <Item>
                  <Link to={linkObj.path} activeClassName="active">
                    <ListItem>{linkObj.text}</ListItem>
                  </Link>
                </Item>
              )
            })}
          </List>
          <LogoBox>
            <Logo
              src={
                "https://res.cloudinary.com/snackmanproductions/image/upload/v1568323268/italianobros/logos/Black_s394t0.png"
              }
              alt="italiano bros logo"
            />
          </LogoBox>

          <div />
          <Button onClick={() => contactToggle(!contactToggled)}>
            {!contactToggled ? `Contact Us` : `Close`}
          </Button>
        </Inner>
      </TopTier>
    </>
  )
}

export default DesktopNavMenu
