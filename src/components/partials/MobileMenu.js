import React from "react"
import styled from "styled-components"

import { NavLink } from "./NavLink"
import layoutStyles from "./navstyles/MobileMenu.module.scss"

const Menu = styled.div`
  display: none;
  max-height: 0;
  transition: all 0.3s ease;
  z-index: -1;
  background: #fbfbfb;
  width: 100%;
  margin-top: 1rem;
  position: relative;
  @media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    max-height: ${props => (props.toggled ? "100vh" : 0)};
    transform: translateY(${props => (props.toggled ? 0 : "-100vh")});
  }
`
const MenuBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 4rem 0;
`
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  background: #f9f9f9;
  width: 100%;
`
//need to add toggle effect
const MobileMenu = ({ toggled }) => {
  return (
    <Menu toggled={toggled}>
      <MenuBody toggled={toggled}>
        <List toggled={toggled}>
          <NavLink />
        </List>
      </MenuBody>
      <Footer>
        <a
          href="https://www.facebook.com/italianobros.enterprise/"
          target="_blank"
          className={layoutStyles.mb__anchor}
        >
          <img
            src={
              "https://res.cloudinary.com/snackmanproductions/image/upload/v1568330392/italianobros/icons/Facebook_kcgpqx.png"
            }
            alt="facebook"
            className={layoutStyles.mb__img}
          />
        </a>

        <a
          href="https://www.instagram.com/italianobros.enterprise/"
          target="_blank"
          className={layoutStyles.mb__anchor}
        >
          <img
            href="https://www.instagram.com/italianobros.enterprise/"
            src={
              "https://res.cloudinary.com/snackmanproductions/image/upload/v1568330393/italianobros/icons/Instagram_hp37l4.png"
            }
            alt="Instagram"
            className={layoutStyles.mb__img}
          />
        </a>
      </Footer>
    </Menu>
  )
}

export default MobileMenu
