import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Home from "../components/home/Home"
import { graphql } from "gatsby"

const IndexPage = () => (
  <Layout>
    <SEO title="Home Italiano Bros. Enterprise" />

    <Home />
  </Layout>
)

export default IndexPage
