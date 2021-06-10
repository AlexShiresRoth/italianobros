import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import NavMenu from "./NavMenu"
import Contact from "./Contact"
import MobileMenu from "./MobileMenu"
import DesktopNavMenu from "./DesktopNavMenu"
import styled from "styled-components"

const NavContainer = styled.nav`
  width: 100%;
  height: 5.2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #fff;
  box-shadow: 0 1px 30px #66666622;
  @media screen and (max-width: 760px) {
    align-items: center;
    padding-bottom: 0;
    height: auto;
    padding: 1rem 0 0 0;
    min-height: 6rem;
  }
`
const MobileGrouping = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
`

const LogoContainer = styled.div`
  display: none;
  @media screen and (max-width: 760px) {
    display: flex;
    justify-content: center;
    flex: 1;
    & img {
      max-width: 8rem;
      object-fit: contain;
    }
  }
`

const Nav = () => {
  const [toggled, setToggled] = useState(false)
  const [contactToggled, contactToggle] = useState(false)
  const [serviceToggled, setServiceToggle] = useState(false)
  const [isMobile, setMobile] = useState(false)

  //handles when service menus are toggled to stop background scrolling

  // if nav menu is open on resize to different media query, close out
  const handleWindowResizeWithToggledMenu = () => {
    if (toggled && !isMobile) {
      setToggled(!toggled)
    }
  }

  //sets state to mobile view
  const handleWindowResize = () => setMobile(window.innerWidth < 860)

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize)
    handleWindowResize()
  }, [])

  useEffect(() => {
    if (toggled) {
      //close the contact form and open pages menu
      contactToggle(false)
    }
  }, [toggled])

  useEffect(() => {
    if (contactToggled) {
      //close the pages menu and open form
      setToggled(false)
    }
  }, [contactToggled])

  useEffect(() => {
    handleWindowResizeWithToggledMenu()
  }, [isMobile])

  return (
    <NavContainer>
      <MobileGrouping>
        <NavMenu onClick={setToggled} toggled={toggled} />
        <LogoContainer>
          <Link to="/">
            <img
              src={
                "https://res.cloudinary.com/snackmanproductions/image/upload/v1568323268/italianobros/logos/Black_s394t0.png"
              }
              alt="italiano bros logo"
            />
          </Link>
        </LogoContainer>
      </MobileGrouping>
      <DesktopNavMenu
        isMobile={isMobile}
        serviceToggled={serviceToggled}
        setServiceToggle={setServiceToggle}
        contactToggle={contactToggle}
        contactToggled={contactToggled}
      />
      <MobileMenu toggled={toggled} />

      <Contact onClick={contactToggle} toggled={contactToggled} />
    </NavContainer>
  )
}

export default Nav
