import React, { createRef, useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import layoutStyles from "./headerstyles/Header.module.scss"
import wideScreenLayoutStyles from "./headerstyles/HeaderDesktop.module.scss"
import { ContentContext } from "../RootLayout"

const Header = () => {
  const { pageContent } = useContext(ContentContext)

  const scrollRef = createRef()

  const [sliderImgs, setImgs] = useState([])

  const [scrollWidth, setScrollWidth] = useState(0)

  const [current, changeIndex] = useState(0)

  const handleWindowResize = () => setScrollWidth(window.innerWidth)

  const handleScrolling = ref => {
    console.log("scroll this width", scrollWidth)
    if (scrollWidth) {
      ref.style.transition = "all 0.3s ease"
      ref.style.transform = `translate3d(${scrollWidth}px,0px,0px)`
      console.log(ref.style)
    }
  }

  useEffect(() => {
    if (scrollWidth && sliderImgs.length > 0) {
      const index = Math.floor((scrollWidth * sliderImgs.length) / scrollWidth)
      console.log("index", scrollWidth, sliderImgs.length, index)
      changeIndex(index)
    }
  }, [scrollWidth, sliderImgs])

  useEffect(() => {
    if (pageContent) {
      const imgs = pageContent.data["mainpage-header"].map(img => ({
        url: img.image.url,
      }))
      console.log("imgs", imgs)
      setImgs(imgs)
    }
  }, [pageContent])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => handleWindowResize())
    }
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      setScrollWidth(-scrollRef.current.scrollWidth)
    }
  }, [scrollRef])

  if (!pageContent) {
    return <p>please wait...</p>
  }

  return (
    <header className={layoutStyles.header__section}>
      <div className={layoutStyles.overlay} />

      <div className={layoutStyles.slider}>
        <div className={layoutStyles.inner} ref={scrollRef}>
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
              onPointerDown={e => changeIndex(i)}
              className={current === i ? layoutStyles.active : ""}
            ></span>
          )
        })}
      </div>
      <div className={layoutStyles.herobox}>
        <button onPointerDown={e => handleScrolling(scrollRef.current)}>
          click
        </button>
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
