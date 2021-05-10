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
import ImageSlider from "./ImageSlider"

const Header = () => {
  const { pageContent } = useContext(ContentContext)

  const [sliderImgs, setImgs] = useState([])

  //retrieve image data from context
  useEffect(() => {
    if (pageContent) {
      const imgs = pageContent.data["mainpage-header"].map(img => ({
        url: img.image.url,
      }))

      setImgs([imgs[imgs.length - 1], ...imgs, imgs[0]])
    }
  }, [pageContent])

  if (!pageContent) {
    return <p>please wait...</p>
  }

  return (
    <header className={layoutStyles.header__section}>
      <ImageSlider sliderImgs={sliderImgs} layoutStyles={layoutStyles} />
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
