import React, { createRef, useEffect, useRef, useState } from "react"
import style from "./MobileGallery.module.scss"
const MobileGallery = ({ layoutStyles, sliderImgs, reset }) => {
  let timeID

  const [currentIndex, setIndex] = useState(1)

  const [max, setMax] = useState(0)

  const indexChange = () => {
    //once transition is complete allow for next slide

    if (currentIndex >= max) {
      setIndex(1)
    }
    if (currentIndex <= 0) {
      setIndex(sliderImgs.length - 2)
    }
  }

  useEffect(() => {
    timeID = setTimeout(() => {
      setIndex(prevIndex => prevIndex + 1)
    }, 7000)
  }, [currentIndex])

  useEffect(() => {
    indexChange()
  }, [currentIndex])

  useEffect(() => {
    if (sliderImgs.length > 0) {
      setMax(sliderImgs.length - 1)
    }
  }, [sliderImgs])

  return (
    <>
      <div className={style.overlay} />

      <div className={style.slider}>
        <div className={style.inner}>
          {sliderImgs.map((img, i) => {
            return (
              <div
                className={
                  currentIndex === i
                    ? style.imgContainer
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

      <div className={style.index_marker}>
        {sliderImgs.map((_, i) => {
          return (
            <span
              key={i}
              onPointerDown={e => setIndex(i)}
              className={currentIndex === i ? style.active : ""}
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
