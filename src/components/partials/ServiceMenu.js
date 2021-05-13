import React from "react"
import { Link } from "gatsby"

import layoutStyles from "./navstyles/ServiceMenu.module.scss"

//fix hash route
export const ServiceMenu = ({ toggled }) => {
  return (
    <div
      className={
        toggled
          ? layoutStyles.service__menu
          : layoutStyles.service__menu__hidden
      }
    >
      <div className={layoutStyles.background}></div>
      <ul className={layoutStyles.sm__list}>
        <Link
          to={"/Services#venetian-plaster"}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <li className={layoutStyles.sm__li}>Venetian Plaster</li>
        </Link>

        <Link
          to={"/Services#plaster-mouldings"}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <li className={layoutStyles.sm__li}> Plaster Mouldings</li>
        </Link>

        <Link
          to={"/Services#stucco"}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <li className={layoutStyles.sm__li}>Stucco</li>
        </Link>

        <Link
          to={"/Services#drywall"}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <li className={layoutStyles.sm__li}>Drywall</li>
        </Link>

        <Link
          to={"/Services#concrete"}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <li className={layoutStyles.sm__li}>Concrete</li>
        </Link>
      </ul>
    </div>
  )
}
