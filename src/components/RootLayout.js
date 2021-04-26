import Prismic from "@prismicio/client"

import React, { useEffect, useState } from "react"

export const ContentContext = React.createContext({
  pageContent: {},
  setPageContent: () => {},
})

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
      value={{ pageContent: content, setPageContent: () => {} }}
    >
      {children}
    </ContentContext.Provider>
  )
}
