import React, { Fragment } from "react"

import About from "./About"
import Gallery from "./Gallery"
import Header from "./Header"
import ImagesContainer from "./ImagesContainer"
import Services from "./Services"
import ServiceBoxes from "./ServiceBoxes"
import ViewAllServices from "./ViewAllServices"
const Home = ({ instaData }) => {
  return (
    <Fragment>
      <Header />
      <Services />
      <ServiceBoxes />
      <ViewAllServices />
      <Gallery />
      <ImagesContainer instaData={instaData} />
      <About />
    </Fragment>
  )
}

export default Home
