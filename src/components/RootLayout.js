import Prismic from "@prismicio/client"
import axios from "axios"

import React, { useContext, useEffect, useMemo, useState } from "react"

export const ContentContext = React.createContext({
  pageContent: {},
  setPageContent: () => {},
  serviceLinks: [],
  instaContent: [],
  setInstaContent: () => {},
})

const serviceLinks = [
  {
    to: "/Services#plaster-finishes",
    title: "Plaster Finishes",
    img:
      "https://images.prismic.io/italiano-bros/82f4bc1c-7935-41d3-9d31-d6c8eeed769f_IMG_1198.jpg?auto=compress,format",
  },
  {
    to: "/Services#mouldings",
    title: "Mouldings",
    img:
      "https://images.prismic.io/italiano-bros/4338e961-15e1-42d5-860d-5c14a9322148_IMG_0862.jpg?auto=compress,format",
  },
  {
    to: "/Services#stucco",
    title: "Stucco",
    img:
      "https://images.prismic.io/italiano-bros/2d535066-47b9-4719-aa8d-1c28f0781b6f_IMG_3885%2B.jpeg?auto=compress,format",
  },
  {
    to: "/Services#drywall",
    title: "Drywall",
    img:
      "https://images.prismic.io/italiano-bros/3dbd8c8a-adb8-44de-bde5-426363077e73_IMG_0898.jpg?auto=compress,format",
  },
  {
    to: "/Services#concrete",
    title: "Concrete",
    img:
      "https://images.prismic.io/italiano-bros/9047b74e-104a-4545-819d-c124881610a0_James+Concrete+images.PNG?auto=compress,format",
  },
]

const apiEndpoint = "https://italiano-bros.cdn.prismic.io/api/v2"
const token =
  "IGQVJWYlQ2ai1ZARW5FRkd0TXlFak9XU3Uwc0FTUUhoUU40M0ZA6cGx5bWdPRVQ0QlI0MllWN2VHQW0wY3JfbjlzMmZAwVVdUdWEzV215NzJzSVpocC12eTBwS2lEVkdNclhmeHJaWlBtNzBlaXNDWC1INAZDZD"

const Client = Prismic.client(apiEndpoint)

export const RootLayout = ({ children }) => {
  const [content, setContent] = useState(null)
  const [insta, setInsta] = useState(null)
  const { setInstaContent } = useContext(ContentContext)

  const fetchInsta = async () => {
    try {
      const res = await axios.get(
        `https://graph.instagram.com/v11.0/4421706784515534/media/?fields=media_url,permalink,media_type,caption&access_token=${token}`
      )
      // console.log("res.data", res.data)
      setInsta(res.data)
      return res.data
    } catch (error) {
      console.error("error:", error)
    }
  }

  const instaData = useMemo(() => fetchInsta(), [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query([
        Prismic.Predicates.at("document.type", "mainpage"),
      ])
      if (response) {
        setContent(response.results[0])
      }
    }
    fetchData()
  }, [])

  return (
    <ContentContext.Provider
      value={{
        pageContent: content,
        setPageContent: () => {},
        serviceLinks,
        instaContent: insta,
        setInstaContent: () => {},
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}
