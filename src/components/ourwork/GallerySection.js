import React, { useEffect, useState } from "react"
import { useContext } from "react"
import ImageGrid from "./ImageGrid"
import layoutStyles from "./styles/GallerySection.module.scss"
import { ContentContext } from "../../components/RootLayout"

const GallerySection = () => {
  const { pageContent } = useContext(ContentContext)
  const [reduced, setReduced] = useState(false)
  const [images, setImages] = useState([])
  const [imagesArray, setArray] = useState([])

  const reduceImageArray = () => {
    let shortArr = images.slice(0, 6)
    setReduced(true)
    setArray(shortArr)
  }

  const addMoreImages = imgs => {
    let imagesFull = imgs.slice(6, imgs.length)

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
    if (images) reduceImageArray(images)
  }, [images])

  useEffect(() => {
    if (pageContent) {
      const workImgs = pageContent.data.images.map(src => src.image.url)
      console.log("workimgs", workImgs)
      setImages(workImgs)
    }
  }, [pageContent])

  if (!pageContent) {
    return <p>Loading...</p>
  }

  console.log(pageContent.data)
  return (
    <section className={layoutStyles.gallery__section}>
      <div className={layoutStyles.heading}>
        <h2>{pageContent.data.heading[0].text}</h2>
        <p>{pageContent.data.paragraph[0].text}</p>
      </div>
      <ImageGrid images={imagesArray} />
      <button
        className={layoutStyles.button}
        onClick={() => addMoreImages(images)}
      >
        {reduced ? `Show More` : `Show Less`}
      </button>
    </section>
  )
}

export default GallerySection
