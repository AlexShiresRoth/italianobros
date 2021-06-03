import React from "react"
import { Link } from "gatsby"

import { ServiceMenu } from "./ServiceMenu"
import wideScreenLayoutStyles from "./navstyles/NavDesktop.module.scss"
import styled from "styled-components"

const TopTier = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const Inner = styled.div`
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
const Grouping = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  object-fit: contain;
  width: 100%;
`
const Item = styled.div`
  & a {
    text-decoration: none;
  }
`
const List = styled.ul`
  list-style: none;
  display: flex;
`

const ListItem = styled.li`
  color: #666;
  font-size: 1.2rem;
  margin: 0 1rem;
  transition: all 0.3s ease;
  &:hover {
    color: #ceb862;
  }
`

const DesktopNavMenu = ({
  renderServicesHoverMenu,
  removeServicesHoverMenu,
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
      bottom:-110%;
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
                  onMouseEnter={e => renderServicesHoverMenu()}
                  onMouseLeave={e => removeServicesHoverMenu()}
                >
                  <Link to={linkObj.path} activeClassName="active">
                    <ListItem>{linkObj.text}</ListItem>
                  </Link>
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
          <button
            className={wideScreenLayoutStyles.dt__button}
            onClick={contactToggle}
          >
            {!contactToggled ? `Get A Quote` : `Close`}
          </button>
        </Inner>
      </TopTier>
    </>
  )
}

export default DesktopNavMenu
