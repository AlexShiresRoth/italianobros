import React, { Fragment } from "react"

import About from "./About"
import Gallery from "./Gallery"
import Header from "./Header"
import ImagesContainer from "./ImagesContainer"
import Services from "./Services"
import ServiceBoxes from "./ServiceBoxes"
import ViewAllServices from "./ViewAllServices"
const Home = () => {
  return (
    <Fragment>
      <Header />
      <Services />
      <ServiceBoxes />
      <ViewAllServices />
      <Gallery />
      <ImagesContainer />
      <About />
    </Fragment>
  )
}

export default Home
