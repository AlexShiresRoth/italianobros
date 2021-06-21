import React from "react"
import styled from "styled-components"

const ImageGrid = styled.div`
  width: 90%;
  display: flex;
  gap: 1rem;
  height: 30vh;
  max-height: 25rem;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`
const MobileImageGrid = styled.div`
  display: none;
  flex-wrap: wrap;
  width: 90%;
  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`
const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
  width: 200px;
  transition: all 0.3s ease-in-out;
  &:hover {
    flex: 1.3;
  }
  @media screen and (max-width: 1000px) {
    flex: none;
    height: 20rem;
    width: 95%;
    margin: 0.5rem 0;
    &:hover {
      flex: none;
    }
  }
`

const Image = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 760px) {
    object-position: bottom;
  }
`

const GalleryImgs = ({ imgs, isSeen }) => {
  const imgMap = imgs.map((img, i) => {
    return (
      <ImageContainer
        style={{
          transform: `translateY(${isSeen ? "0vh" : "30vh"})`,
          transition: `all ${1 + `.${i}`}s ease-in-out`,
        }}
      >
        <Image key={i} src={img.url} alt={img.title} />
      </ImageContainer>
    )
  })
  return (
    <>
      <MobileImageGrid>{imgMap}</MobileImageGrid>
      <ImageGrid>{imgMap}</ImageGrid>
    </>
  )
}

export default GalleryImgs
