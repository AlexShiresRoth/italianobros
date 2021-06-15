import React, { Fragment } from "react"

import About from "./About"
import Gallery from "./Gallery"
import Header from "./Header"
import ImagesContainer from "./ImagesContainer"
import Services from "./Services"
import ContactSection from "./ContactSection"
import ServiceBoxes from "./ServiceBoxes"
const Home = () => {
  return (
    <Fragment>
      <Header />
      <Services />
      <Gallery />
      <ImagesContainer />
      <ServiceBoxes />
      <About />
      <ContactSection />
    </Fragment>
  )
}

export default Home
