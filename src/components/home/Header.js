import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Link } from "gatsby"
import layoutStyles from "./headerstyles/Header.module.scss"
import wideScreenLayoutStyles from "./headerstyles/HeaderDesktop.module.scss"
import { ContentContext } from "../RootLayout"
import { ChevronRight, ChevronLeft } from "react-feather"

const Header = () => {
  const { pageContent } = useContext(ContentContext)

  const [timeID, setTime] = useState(null)

  const scrollRef = useRef()

  const sliderRef = createRef()

  const [sliderImgs, setImgs] = useState([])

  const [currentIndex, setIndex] = useState(1)

  const [imageWidth, setImageWidth] = useState(null)

  const [scrollWidth, setScrollWidth] = useState(0)

  const [max, setMax] = useState(0)

  const [shifting, setShifting] = useState(false)

  const [sliderWidth, setSliderWidth] = useState(0)

  const [loading, loadData] = useState(true)

  const [restarted, setRestart] = useState(null)

  const [scrollAmt, setScrollAmt] = useState(0)

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

  const handleResize = () => {
    // clearInterval(timeID)
    loadData(true)
    setIndex(1)
    setScrollWidth(0)
  }

  //a positive integer scrolls to the right
  const handleTimedSlide = () => handleIndexChange(1)

  const cancelOnHover = () => {
    clearInterval(timeID)
    setTime(null)
    setRestart(null)
    console.log("hovering", timeID)
  }
  const restartOnHover = () => setRestart(true)

  const handleIndexChange = val => {
    // Val will either be 1 or null
    //if slide is in transition, disable index change in order to prevent transitionend from not being triggered
    if (shifting) return
    //appear to be moving right
    if (val) {
      //set state of slide to be transitioning
      setShifting(true)
      //activate transition
      scrollRef.current.style.transition = "all 0.5s ease"
      //index determines where in sequence
      setIndex(prevState => prevState + 1)
      //scroll width determines size of slide
      setScrollWidth(prevWidth => prevWidth - imageWidth)
    }

    //appear to be moving left
    if (!val) {
      //set state of slide to be transitioning
      setShifting(true)
      //activate transition
      scrollRef.current.style.transition = "all 0.5s ease"
      //index determines where in sequence
      setIndex(prevState => prevState - 1)
      //scroll width determines size of slide
      setScrollWidth(prevState => prevState + imageWidth)
    }
  }

  //update scroll point on index change
  const handleScroll = () => {
    scrollRef.current.style.transform = `translate3d(${scrollWidth}px, 0,0)`
  }

  //Scrolling needs to update where progress is
  //if progress gets to  end, reset and scroll to begininning without a transition
  const handleMobileSwipe = e => {
    console.log("scrolllll")
    if (!sliderRef.current) return
    const element = sliderRef.current
    const progress = sliderRef.current.scrollLeft
    const totalWidth = element.scrollWidth - element.clientWidth
    // console.log(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    const moved = Math.floor((progress / totalWidth) * 100)
    console.log(progress)
    if (Math.floor(progress) <= 0) {
      setScrollWidth(totalWidth)
      return false
    }
    if (progress > totalWidth) {
      setScrollWidth(0)
      return false
    }
    setScrollWidth(moved)
  }

  useEffect(() => {
    if (scrollWidth) {
      const index = Math.floor((scrollWidth * (sliderImgs.length - 2)) / 100)
      console.log("index!", index)
      setIndex(index + 1)
    }
  }, [scrollWidth])

  //retrieve image data from context
  useEffect(() => {
    if (pageContent) {
      const imgs = pageContent.data["mainpage-header"].map(img => ({
        url: img.image.url,
      }))

      setImgs([imgs[imgs.length - 1], ...imgs, imgs[0]])
    }
  }, [pageContent])

  useEffect(() => {
    setMax(sliderImgs.length - 1)
  }, [sliderImgs])

  //set initial image width
  useEffect(() => {
    if (sliderRef.current && imageWidth === null)
      setImageWidth(sliderRef.current.clientWidth)
  }, [sliderRef, imageWidth, sliderWidth])

  // once image width has updated, update the scrollwidth
  useEffect(() => {
    if (imageWidth) setScrollWidth(-imageWidth)
  }, [imageWidth, sliderWidth])

  //Resizing window handle
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (scrollRef.current && sliderRef.current) {
      handleScroll()
    }
  }, [currentIndex, scrollRef, sliderRef])

  useEffect(() => {
    if (sliderImgs.length > 0 && scrollRef.current) {
      handleInitialSliderWidth(sliderImgs.length)
      loadData(false)
    }
  }, [sliderImgs, scrollRef])

  // useEffect(() => {
  //   if (!loading && scrollRef.current) {
  //     let interval = setInterval(() => {
  //       handleTimedSlide()
  //     }, 7000)

  //     setTime(interval)
  //   }
  // }, [loading, scrollRef, restarted])

  if (!pageContent) {
    return <p>please wait...</p>
  }

  return (
    <header className={layoutStyles.header__section}>
      <div className={layoutStyles.buttons}>
        <button
          onPointerDown={e => {
            handleIndexChange(0)
          }}
          onMouseEnter={() => cancelOnHover()}
          onMouseLeave={() => restartOnHover()}
        >
          <ChevronLeft size={55} />
        </button>
        <button
          onPointerDown={e => {
            handleIndexChange(1)
          }}
          onMouseEnter={() => cancelOnHover()}
          onMouseLeave={() => restartOnHover()}
        >
          <ChevronRight size={55} />
        </button>
      </div>
      <div className={layoutStyles.overlay} />

      <div
        className={layoutStyles.slider}
        ref={sliderRef}
        onScroll={e => handleMobileSwipe(e)}
        onTransitionEnd={e => console.log("does this have a tranaition")}
      >
        <div
          className={layoutStyles.inner}
          ref={scrollRef}
          onTransitionEnd={() => endTransition()}
          style={{ minWidth: `${sliderWidth}vw` }}
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
                    : "all .3s ease",
              }}
            ></span>
          )
        })}
      </div>
      <div className={layoutStyles.herobox}>
        <h1
          className={`${layoutStyles.heading} ${wideScreenLayoutStyles.desktop__heading}`}
        >
          {pageContent.data["mainpage-header"][0]["mainpage-slogan"][0].text}
        </h1>
        <Link to={"/Services"}>
          <button
            className={`${layoutStyles.button} ${wideScreenLayoutStyles.desktop__button}`}
          >
            Learn More
          </button>
        </Link>
      </div>
    </header>
  )
}

export default Header
