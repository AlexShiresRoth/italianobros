import React, { useContext } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { ContentContext } from "../RootLayout"

const ServiceMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  transition: all 0.3s ease;
  z-index: 1;
`

const Hidden = styled.div`
  max-height: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  transition: all 0.3s ease;
`
const BGContainer = styled.div`
  width: 200vw;
  background-color: #fff;
  position: absolute;
  display: flex;
  height: 100%;
  z-index: 0;
  top: 0%;
  left: 0;
  transform: translateX(-100vw);
  border-top: 1px solid #eee;
  box-shadow: 0 30px 30px rgba(92, 90, 90, 0.137);
`
const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: nowrap;
  height: auto;
  z-index: 1;
`
const ListItem = styled.li`
  margin: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  transition: all 0.2s ease;
  list-style: none;
  text-decoration: none;
  color: #707070;
  font-size: 1.2rem;
  height: 100%;
  font-family: Cormorant Garamond;
  &:hover {
    color: #ceb862;
    cursor: pointer;
  }
`

//fix hash route
export const ServiceMenu = ({ toggled }) => {
  const { serviceLinks } = useContext(ContentContext)

  const listItems = serviceLinks.map((item, i) => {
    return (
      <Link
        to={item.to}
        key={i}
        style={{ textDecoration: "none", width: "100%" }}
      >
        <ListItem>{item.title}</ListItem>
      </Link>
    )
  })

  return toggled ? (
    <ServiceMenuContainer>
      <BGContainer />
      <List>{listItems}</List>
    </ServiceMenuContainer>
  ) : (
    <Hidden>
      <BGContainer />
      <List>{listItems}</List>
    </Hidden>
  )
}
