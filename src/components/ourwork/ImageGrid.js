import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

import layoutStyles from "./styles/ImageGrid.module.scss"

const ImageGrid = ({ images }) => {
  const imageArray = images.map((image, i) => {
    return (
      <div className={layoutStyles.grid__item} key={i}>
        <GatsbyImage
          image={image}
          alt="custom concrete, venetian plaster and mouldings"
          src={image}
          className={layoutStyles.grid__image}
          loading="lazy"
          quality="60"
          layout="fullWidth"
        />
      </div>
    )
  })

  return <div className={layoutStyles.image__grid}>{imageArray}</div>
}

export default ImageGrid
