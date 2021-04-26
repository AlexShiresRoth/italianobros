import React, { useEffect, useState } from "react"
import { useContext } from "react"
import ImageGrid from "./ImageGrid"
import { images } from "./images"
import layoutStyles from "./styles/GallerySection.module.scss"
import { ContentContext } from "../../components/RootLayout"

const GallerySection = () => {
  const { pageContent } = useContext(ContentContext)
  const [reduced, setReduced] = useState(false)
  const [imagesArray, setArray] = useState([])

  const reduceImageArray = () => {
    let shortArr = images.slice(0, 6)
    setReduced(true)
    setArray(shortArr)
  }

  const addMoreImages = () => {
    let imagesFull = images.slice(6, images.length)

    if (reduced) {
      setArray(prevState => [...prevState, ...imagesFull])
      setReduced(false)
    }

    if (!reduced) {
      reduceImageArray()
      setReduced(true)
    }
  }

  useEffect(() => {
    reduceImageArray()
  }, [])

  return (
    <section className={layoutStyles.gallery__section}>
      <div className={layoutStyles.heading}>
        <h2>Best In Class</h2>
        <p>
          Being the forerunner in complete interior wall and exterior stucco
          systems for over 30 years, we give you our gallery of past projects
          &amp; experience.
        </p>
      </div>
      <ImageGrid images={imagesArray} />
      <button className={layoutStyles.button} onClick={addMoreImages}>
        {reduced ? `Show More` : `Show Less`}
      </button>
    </section>
  )
}

export default GallerySection
