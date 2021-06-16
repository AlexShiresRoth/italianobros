import React, { useContext, useEffect, useState } from "react"

import layoutStyles from "./servicestyles/ServicesList.module.scss"

import ServicesListItem from "./ServicesListItem"
import ServicesListItemDesktop from "./ServicesListItemDesktop"
import { ContentContext } from "../RootLayout"

const ServiceList = () => {
  const { pageContent } = useContext(ContentContext)

  const [content, setContent] = useState([])

  const [loading, setLoading] = useState(true)

  const [isMobile, setMobile] = useState(false)

  const [servicesArray, setArraySize] = useState([])

  const [reduced, setReduced] = useState(true)

  const [read, setMore] = useState("Read More")

  const [service, setCurrent] = useState([])

  const [serviceTitle, setTitle] = useState("Venetian Plaster")

  const [animation, setAnimation] = useState(false)

  const [location, setLocation] = useState("")

  const handleWindowResize = () => {
    setMobile(window.innerWidth < 600)
  }

  const changeContentSize = () =>
    reduced
      ? (setReduced(false), setMore("Show Less"))
      : (setReduced(true), setMore("Read More"))

  //Set which content to render based on title
  const renderService = (title, index, arr) => {
    console.log(title, index, arr)
    setCurrent(arr[index])
    setTitle(title)
  }

  const getPathName = arr => {
    return arr.map((data, i) => {
      console.log("path data", data.id)
      if (window.location.href.match(data.id) || location.match(data.id)) {
        return renderService(data.title, i, arr)
      }
    })
  }

  const loadPageContent = () => {
    const vpData = pageContent.data["venetian-plaster"][0]
    const dryWall = pageContent.data["drywall"][0]
    const stucco = pageContent.data["stucco"][0]
    const concrete = pageContent.data["architectural-concrete"][0]
    const plaster = pageContent.data["plaster-mouldings"][0]
    setContent([
      {
        title: vpData.heading[0].text,
        content: vpData.paragraph[0].text,
        images: [
          vpData.image1.url,
          vpData.image2.url,
          vpData.image3.url,
          vpData.image4.url,
        ],
        id: "venetian-plaster",
        button: true,
        display1: "left",
        display2: "right",
      },
      {
        title: dryWall.heading[0].text,
        content: dryWall.paragraph[0].text,
        images: [dryWall.image1.url, dryWall.image2.url],
        id: "drywall",
        button: true,
        display1: "left",
        display2: "right",
      },
      {
        title: stucco.heading[0].text,
        content: stucco.paragraph[0].text,
        images: [
          stucco.image1.url,
          stucco.image2.url,
          stucco.image3.url,
          stucco.image4.url,
        ],
        id: "stucco",
        button: true,
        display1: "left",
        display2: "right",
      },
      {
        title: concrete.heading[0].text,
        content: concrete.paragraph[0].text,
        images: [
          concrete.image1.url,
          concrete.image2.url,
          concrete.image3.url,
          concrete.image4.url,
        ],
        id: "concrete",
        button: true,
        display1: "left",
        display2: "right",
      },
      {
        title: plaster.heading[0].text,
        content: plaster.paragraph[0].text,
        images: [
          plaster.image1.url,
          plaster.image2.url,
          plaster.image3.url,
          plaster.image4.url,
        ],
        id: "plaster-mouldings",
        button: true,
        display1: "left",
        display2: "right",
      },
    ])
  }

  useEffect(() => {
    if (!pageContent) setLoading(true)
    else {
      setLoading(false)
      loadPageContent()
    }
  }, [pageContent])

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleWindowResize()
      window.addEventListener("resize", () => handleWindowResize())
    }
    return () =>
      window.removeEventListener("resize", () => handleWindowResize())
  }, [])

  useEffect(() => {
    if (content.length > 0) {
      getPathName(content)
      setLocation(window.location.href)
      setCurrent(content[0])
      setArraySize(content)
    }
  }, [content])

  if (!pageContent || loading || !content) {
    return <p>Loading...</p>
  }

  const { data } = pageContent

  const servicesData = data["services-section1"][0]

  const heading = servicesData["services-heading1"][0].text
  const paragraph = servicesData["paragraph"][0].text

  return (
    <div className={layoutStyles.servicesList__section}>
      <div className={layoutStyles.heading}>
        <h2>{heading}</h2>
        <p>{paragraph}</p>
      </div>

      {isMobile ? (
        <ServicesListItem
          services={servicesArray}
          contentSize={changeContentSize}
          read={read}
          reduced={reduced}
          styles={layoutStyles}
        />
      ) : (
        <div className={layoutStyles.container__column}>
          <div className={layoutStyles.panel}>
            {content.map((title, i) => {
              return (
                <button
                  key={i}
                  className={
                    serviceTitle.toLowerCase() === title.title.toLowerCase()
                      ? `${layoutStyles.button} ${layoutStyles.active__button}`
                      : layoutStyles.button
                  }
                  onClick={() =>
                    renderService(title.title.toLowerCase(), i, content)
                  }
                >
                  {title.title}
                </button>
              )
            })}
          </div>
          <ServicesListItemDesktop
            service={service}
            contentSize={changeContentSize}
            read={read}
            reduced={reduced}
            styles={layoutStyles}
            animate={animation}
          />
        </div>
      )}
    </div>
  )
}

export default ServiceList
