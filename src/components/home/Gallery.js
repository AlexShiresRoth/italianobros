import React, { useContext } from "react"
import { Link } from "gatsby"

import layoutStyles from "./gallerystyles/Gallery.module.scss"
import { ContentContext } from "../RootLayout"
import styled from "styled-components"

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(https://res.cloudinary.com/snackmanproductions/image/upload/v1623280780/italianobros/gallery/IMG_4183_bixkkp.jpg);
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
  min-height:60vh;
`
const Container = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: no-wrap;
`
const Column = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  transition: all .5s ease;
  
  overflow:hidden;
   background: #fbfbfb;
  &:hover{
    flex:1.2;
  }
`

const Image = styled.img`
  object-fit: contain;
  max-width: 100%;
`
const TextContent = styled.div`
  width: 70%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
`

const Gallery = () => {
  const { pageContent } = useContext(ContentContext)

  if (!pageContent) {
    return <p>Loading...</p>
  }

  const { data } = pageContent

  const imgs = [
    data["mainpage-section2"][0].image1,
    data["mainpage-section2"][0].image2,
    data["mainpage-section2"][0].image3,
  ]
  console.log(imgs)
  return (
    <Section bgImg={imgs[0].url}>
      <Container>
       
        <Column>
          <TextContent>
            <div className={layoutStyles.heading}>
              <h3 className={layoutStyles.gallery__h3}>
                {
                  data["mainpage-section2"][0]["mainpage-section2-heading2"][0]
                    .text
                }
              </h3>
              <hr className={layoutStyles.gallery__hr} />
            </div>
            <p className={layoutStyles.paragraph}>
              {data["mainpage-section2"][0].paragraph[0].text}
            </p>
            <div className={layoutStyles.button__container}>
              <Link to={"/OurWork"} style={{ textDecoration: "none" }}>
                <button className={layoutStyles.button}>Learn more</button>
              </Link>
            </div>
          </TextContent>
        </Column>
      </Container>
    </Section>
  )
}

export default Gallery
