import React, { useContext } from "react"
import { Link } from "gatsby"

import GalleryImgs from "./GalleryImgs"

import layoutStyles from "./gallerystyles/Gallery.module.scss"
import { ContentContext } from "../RootLayout"

const Gallery = () => {
  const { pageContent } = useContext(ContentContext)

  if (!pageContent) {
    return <p>Loading...</p>
  }

  const { data } = pageContent

  const imgs = [
    data["mainpage-section2"][0].image1,
    data["mainpage-section2"][0].image2,
    data["mainpage-section2"][0].image3,
  ]

  return (
    <section className={layoutStyles.gallery__section}>
      <GalleryImgs imgs={imgs} />
      <div className={layoutStyles.container}>
        <div className={layoutStyles.heading}>
          <h3 className={layoutStyles.gallery__h3}>
            {data["mainpage-section2"][0]["mainpage-section2-heading2"][0].text}
          </h3>
          <hr className={layoutStyles.gallery__hr} />
        </div>
        <p className={layoutStyles.paragraph}>
          {data["mainpage-section2"][0].paragraph[0].text}
        </p>
        <div className={layoutStyles.button__container}>
          <Link to={"/OurWork"} style={{ textDecoration: "none" }}>
            <button className={layoutStyles.button}>Learn more</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Gallery
