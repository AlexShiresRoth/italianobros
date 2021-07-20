import React, { useContext } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Home from "../components/home/Home"
import { ContentContext } from "../components/RootLayout"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const context = useContext(ContentContext)
  console.log("context", context)
  return (
    <Layout>
      <SEO title="Home Italiano Bros. Enterprise" />

      <Home instaData={data} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query myQuery {
    allInstagramContent {
      edges {
        node {
          caption
          media_url
          localImage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
          album {
            localImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`
