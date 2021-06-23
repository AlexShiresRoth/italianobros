import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import ImageSlider from "./ImageSlider"
import MobileGallery from "./MobileGallery"

const Slider = ({ sliderImgs }) => {
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

  if (sliderImgs.length === 0) {
    return (
      <div>
        <p>Loading images...</p>
      </div>
    )
  }

  return <MobileGallery sliderImgs={sliderImgs} reset={reset} />
}

Slider.propTypes = {}

export default Slider
