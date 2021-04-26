import React from "react"

import layoutStyles from "./gallerystyles/Gallery.module.scss"

const GalleryImgs = ({ imgs }) => {
  const imgMap = imgs.map((img, i) => {
    return (
      <img
        key={i}
        className={layoutStyles.gallery__img__grid__image}
        src={img.url}
        alt={img.title}
      />
    )
  })
  return <div className={layoutStyles.gallery__img__grid}>{imgMap}</div>
}

export default GalleryImgs
