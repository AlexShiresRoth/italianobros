import React, { createRef, useEffect, useRef, useState } from "react"

const MobileGallery = ({ layoutStyles, sliderImgs, reset }) => {
  let timeID

  const scrollRef = useRef()

  const sliderRef = createRef()

  const [scrollAmt, setScrollAmt] = useState(0)

  const [currentIndex, setIndex] = useState(1)

  const [imageWidth, setImageWidth] = useState(null)

  const [scrollWidth, setScrollWidth] = useState(0)

  const [max, setMax] = useState(0)

  const [shifting, setShifting] = useState(false)

  const [sliderWidth, setSliderWidth] = useState(0)

  const [loading, loadData] = useState(true)

  //Scrolling needs to update where progress is
  //if progress gets to  end, reset and scroll to begininning without a transition
  const handleMobileSwipe = e => {
    // console.log("scrolllll")
    if (!sliderRef.current) return
    const element = sliderRef.current
    const progress = sliderRef.current.scrollLeft
    const totalWidth = element.scrollWidth - element.clientWidth
    // console.log(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    const moved = Math.floor((progress / totalWidth) * 100)
    // console.log(progress)
    if (Math.floor(progress) <= 0) {
      setScrollAmt(totalWidth)
      return false
    }
    if (progress > totalWidth) {
      setScrollAmt(0)
      return false
    }
    setScrollAmt(moved)
  }

  useEffect(() => {
    if (scrollAmt) {
      const index = Math.floor((scrollAmt * (sliderImgs.length - 2)) / 100)
      console.log("index!", index + 1)
      setIndex(index + 1)
    }
  }, [scrollAmt])

  const handleInitialSliderWidth = length => {
    const newWidth = length * 100
    setSliderWidth(newWidth)
  }

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

  return (
    <>
      <div className={layoutStyles.overlay} />

      <div
        className={layoutStyles.slider}
        ref={sliderRef}
        onScroll={e => handleMobileSwipe(e)}
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

export default MobileGallery
