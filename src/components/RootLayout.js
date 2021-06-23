import Prismic from "@prismicio/client"

import React, { useEffect, useState } from "react"

export const ContentContext = React.createContext({
  pageContent: {},
  setPageContent: () => {},
  serviceLinks: [],
})

const serviceLinks = [
  {
    to: "/Services#venetian-plaster",
    title: "Plaster Finishes",
    img:
      "https://images.prismic.io/italiano-bros/1c04e2b9-c567-4bb9-9b5d-7007f9b4265b_vp3_ljljot.jpg?auto=compress,format",
  },
  {
    to: "/Services#plaster-mouldings",
    title: "Mouldings",
    img:
      "https://images.prismic.io/italiano-bros/d586c3d9-0fae-40da-b276-13526f57d87d_plaster+walls.jpg?auto=compress,format",
  },
  {
    to: "/Services#stucco",
    title: "Stucco",
    img:
      "https://images.prismic.io/italiano-bros/c2321391-3bcb-47bc-8b1e-6e53298c3087_surfside+color.jpg?auto=compress,format",
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

const Client = Prismic.client(apiEndpoint)

export const RootLayout = ({ children }) => {
  const [content, setContent] = useState(null)

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
      value={{ pageContent: content, setPageContent: () => {}, serviceLinks }}
    >
      {children}
    </ContentContext.Provider>
  )
}
