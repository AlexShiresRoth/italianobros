import React from "react"
import layoutStyles from "./servicestyles/ServicesList.module.scss"
export const ReadMoreButton = ({ content, read, reduced, contentSize }) => {
  return (
    <div>
      <p>
        {reduced ? content.substring(0, 350) : content}
        {""}...
      </p>
      <button className={layoutStyles.btn__readmore} onClick={contentSize}>
        {read}
      </button>
    </div>
  )
}
