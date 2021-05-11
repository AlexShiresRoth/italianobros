import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import ImageSlider from "./ImageSlider"
import MobileGallery from "./MobileGallery"

const Slider = ({ sliderImgs, layoutStyles }) => {
  const [isMobile, setMobile] = useState(true)
  const [isReset, reset] = useState(false)

  const handleResize = () => {
    setMobile(window.innerWidth < 650)
    reset(true)
    console.log("window", window.innerWidth)
    return () => clearTimeout()
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobile(window.innerWidth < 650)
    }
  }, [])

  if (isMobile) {
    return (
      <MobileGallery
        layoutStyles={layoutStyles}
        sliderImgs={sliderImgs}
        reset={reset}
      />
    )
  }
  return (
    <ImageSlider
      layoutStyles={layoutStyles}
      sliderImgs={sliderImgs}
      reset={reset}
    />
  )
}

Slider.propTypes = {}

export default Slider
