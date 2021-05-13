import React, { createRef, useEffect, useRef, useState } from "react"
import style from "./MobileGallery.module.scss"
const MobileGallery = ({ layoutStyles, sliderImgs, reset }) => {
  let timeID

  const [currentIndex, setIndex] = useState(1)

  const [max, setMax] = useState(0)

  const indexChange = () => {
    //once transition is complete allow for next slide
    setIndex(prevIndex => prevIndex + 1)

    if (currentIndex >= max) {
      console.log("MAXREACH", currentIndex)
      setIndex(1)
    }
    if (currentIndex <= 0) {
      setIndex(sliderImgs.length - 2)
    }
  }

  useEffect(() => {
    timeID = setTimeout(() => {
      indexChange()
    }, 5000)
  }, [currentIndex])

  useEffect(() => {
    if (sliderImgs.length > 0) {
      setMax(sliderImgs.length - 1)
    }
  }, [sliderImgs])

  return (
    <>
      <div className={layoutStyles.overlay} />

      <div className={layoutStyles.slider}>
        <div className={layoutStyles.inner}>
          {sliderImgs.map((img, i) => {
            return (
              <div
                className={
                  currentIndex === i
                    ? layoutStyles.imgContainer
                    : style.imgContainer__hidden
                }
                key={i}
              >
                <img src={img.url} alt="work" />
              </div>
            )
          })}
        </div>
      </div>

      <div className={layoutStyles.index_marker}>
        {sliderImgs.map((_, i) => {
          return (
            <span
              key={i}
              onPointerDown={e => setIndex(i)}
              className={currentIndex === i ? layoutStyles.active : ""}
              style={{
                display:
                  i === 0 || i === sliderImgs.length - 1 ? "none" : "block",
                transition:
                  currentIndex >= sliderImgs.length - 1
                    ? "all 0s"
                    : "all 1.3s ease",
              }}
            ></span>
          )
        })}
      </div>
    </>
  )
}

export default MobileGallery
