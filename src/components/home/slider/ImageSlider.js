import React, { createRef, useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { ChevronRight, ChevronLeft } from "react-feather"
import styled from "styled-components"

const Slider = styled.div`
  position: absolute;
  overflow: scroll;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 1;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    height: 0;
  }
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  height: 100%;
  width: 100%;
  opacity: 0.3;
  z-index: 2;
`
const Inner = styled.div`
  display: flex;
  height: 100%;
  min-width: 3000px;
  z-index: 2;
`

const ImgContainer = styled.div`
  width: 100vw;
  height: 100%;
  scroll-snap-align: center;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const IndexMarkers = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 40%;
  left: 0;
  margin: 1.5rem 0rem;
  z-index: 3;
  & span {
    margin: 2rem 1rem;
    height: 15px;
    width: 15px;
    border: 2px solid #eeeeee44;
    border-radius: 500px;
    display: block;
  }
  & .active {
    background: #eee;
  }
`

const ImageSlider = ({ sliderImgs, reset }) => {
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

  const [showArrows, setArrows] = useState(false)

  //set the width in the view port
  const handleInitialSliderWidth = (length, width) =>
    setSliderWidth(length * width)

  const endTransition = () => {
    //once transition is complete allow for next slide

    setShifting(false)
    scrollRef.current.style.transition = "all 0s ease"

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
    // Val will either be 1 or null
    //if slide is in transition, disable index change in order to prevent transitionend from not being triggered
    // if (shifting) return

    if (!scrollRef || !scrollRef.current) return
    //appear to be moving right
    if (val) {
      //set state of slide to be transitioning
      setShifting(true)
      //activate transition
      scrollRef.current.style.transition = "all 1.1s ease-in-out"
      //index determines where in sequence
      setIndex(prevState => prevState + 1)
      //scroll width determines size of slide
      setScrollWidth(prevWidth => prevWidth - imageWidth)
      return
    }

    //appear to be moving left
    if (!val) {
      //set state of slide to be transitioning
      setShifting(true)
      //activate transition
      scrollRef.current.style.transition = "all 1.1s ease-in-out"
      //index determines where in sequence
      setIndex(prevState => prevState - 1)
      //scroll width determines size of slide
      setScrollWidth(prevState => prevState + imageWidth)
      return
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
    if (!loading) {
      timeID = setTimeout(() => {
        if (!paused) handleTimedSlide()
      }, 4500)
    }
    return () => clearTimeout(timeID)
  }, [loading, paused, currentIndex])

  useEffect(() => {
    handleScroll()
  }, [currentIndex, scrollWidth])

  useEffect(() => {
    if (sliderImgs.length > 0) {
      handleInitialSliderWidth(sliderImgs.length, window.innerWidth)
    }
  }, [sliderImgs])

  useEffect(() => {
    if (sliderImgs.length > 0) {
      setMax(sliderImgs.length - 1)
      loadData(false)
    }
  }, [sliderImgs])

  return (
    <>
      <Overlay />

      <Slider ref={sliderRef} onTouchEnd={e => endTransition()}>
        <Inner
          ref={scrollRef}
          onTransitionEnd={() => endTransition()}
          style={{
            width: `${sliderWidth}px`,
          }}
        >
          {sliderImgs.map((img, i) => {
            return (
              <ImgContainer key={i}>
                <img src={img.url} alt="work" />
              </ImgContainer>
            )
          })}
        </Inner>
      </Slider>

      <IndexMarkers>
        {sliderImgs.map((_, i) => {
          return (
            <span
              key={i}
              onPointerDown={e => setIndex(i)}
              className={currentIndex === i ? "active" : ""}
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
      </IndexMarkers>
    </>
  )
}

ImageSlider.propTypes = {}

export default ImageSlider
