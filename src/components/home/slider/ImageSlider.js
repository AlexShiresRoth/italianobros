import React, { createRef, useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { ChevronRight, ChevronLeft } from "react-feather"

const ImageSlider = ({ sliderImgs, layoutStyles, reset }) => {
  let timeID
  const scrollRef = useRef()

  const sliderRef = createRef()

  const [currentIndex, setIndex] = useState(1)

  const [imageWidth, setImageWidth] = useState(null)

  const [scrollWidth, setScrollWidth] = useState(0)

  const [max, setMax] = useState(0)

  const [shifting, setShifting] = useState(false)

  const [sliderWidth, setSliderWidth] = useState(0)

  const [loading, loadData] = useState(true)

  const [paused, setPaused] = useState(false)

  const handleInitialSliderWidth = length => {
    const newWidth = length * 100
    setSliderWidth(newWidth)
  }

  const endTransition = () => {
    //once transition is complete allow for next slide

    setShifting(false)
    scrollRef.current.style.transition = "all 0s ease"
    console.log("transition ended", shifting)
    if (currentIndex >= max) {
      console.log("MAXREACH", currentIndex)
      setScrollWidth(-(1 * imageWidth))
      setIndex(1)
    }
    if (currentIndex <= 0) {
      console.log("at the begining")
      setScrollWidth(-(imageWidth * (sliderImgs.length - 1)) + imageWidth)
      setIndex(sliderImgs.length - 2)
    }
  }

  //a positive integer scrolls to the right
  const handleTimedSlide = () => handleIndexChange(1)

  const handleIndexChange = val => {
    console.log("indexxxx change", shifting)
    // Val will either be 1 or null
    //if slide is in transition, disable index change in order to prevent transitionend from not being triggered
    if (shifting) return

    if (!scrollRef || !scrollRef.current) return
    //appear to be moving right
    if (val) {
      //set state of slide to be transitioning
      setShifting(true)
      //activate transition
      scrollRef.current.style.transition = "all 1.3s ease"
      //index determines where in sequence
      setIndex(prevState => prevState + 1)
      //scroll width determines size of slide
      setScrollWidth(prevWidth => prevWidth - imageWidth)
      return false
    }

    //appear to be moving left
    if (!val) {
      //set state of slide to be transitioning
      setShifting(true)
      //activate transition
      scrollRef.current.style.transition = "all 1.3s ease"
      //index determines where in sequence
      setIndex(prevState => prevState - 1)
      //scroll width determines size of slide
      setScrollWidth(prevState => prevState + imageWidth)
      return false
    }
  }

  //update scroll point on index change
  const handleScroll = () => {
    if (scrollRef.current)
      scrollRef.current.style.transform = `translate3d(${scrollWidth}px, 0,0)`
  }

  //set initial image width
  useEffect(() => {
    if (sliderRef.current && imageWidth === null)
      setImageWidth(sliderRef.current.clientWidth)
  }, [sliderRef, imageWidth, sliderWidth])

  // once image width has updated, update the scrollwidth
  useEffect(() => {
    if (imageWidth) setScrollWidth(-imageWidth)
  }, [imageWidth])

  useEffect(() => {
    if (!loading && !shifting) {
      timeID = setTimeout(() => {
        console.log("is paused?", paused)
        if (!paused) handleTimedSlide()
      }, 7000)
    }
    return () => clearTimeout(timeID)
  }, [loading, paused, currentIndex, shifting])

  useEffect(() => {
    handleScroll()
  }, [currentIndex, scrollWidth])

  useEffect(() => {
    if (sliderImgs.length > 0 && scrollRef.current) {
      handleInitialSliderWidth(sliderImgs.length)
      loadData(false)
    }
  }, [sliderImgs, scrollRef])

  useEffect(() => {
    if (sliderImgs.length > 0) {
      setMax(sliderImgs.length - 1)
    }
  }, [sliderImgs])

  console.log("is loading?", scrollWidth, currentIndex, imageWidth)
  return (
    <>
      <div className={layoutStyles.buttons}>
        <button
          onPointerDown={e => {
            handleIndexChange(0)
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ChevronLeft size={55} />
        </button>
        <button
          onPointerDown={e => {
            handleIndexChange(1)
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ChevronRight size={55} />
        </button>
      </div>
      <div className={layoutStyles.overlay} />

      <div
        className={layoutStyles.slider}
        ref={sliderRef}
        onTouchEnd={e => endTransition()}
      >
        <div
          className={layoutStyles.inner}
          ref={scrollRef}
          onTransitionEnd={() => endTransition()}
          style={{
            minWidth: `${sliderWidth}vw`,
          }}
        >
          {sliderImgs.map((img, i) => {
            return (
              <div className={layoutStyles.imgContainer} key={i}>
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

ImageSlider.propTypes = {}

export default ImageSlider
