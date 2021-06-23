import React, { useEffect, useState } from "react"
import styled from "styled-components"

const Slider = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
`

const ImageContainer = styled.div`
  width: 100vw;
  height: 100%;
  max-width: 100%;
  scroll-snap-align: center;
  position: absolute;
  z-index: 2;
  opacity: 1;
  top: 0;
  left: 0;
  transition: all 1.4s ease-in-out;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${({ active }) =>
    !active &&
    `
      opacity:0;
      z-index:0;
  `}
`
const Inner = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
`

const IndexMarker = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  margin: 1.5rem 0rem;
  z-index: 2;
  & span {
    margin: 0 1rem;
    height: 15px;
    width: 15px;
    border: 2px solid #eee;
    border-radius: 500px;
    display: block;
  }
  & .active {
    background: #eee;
  }
}

`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.418);
  height: 100%;
  width: 100%;
  z-index: 1;
`

const MobileGallery = ({ sliderImgs, reset }) => {
  let timeID

  const [currentIndex, setIndex] = useState(1)

  const [max, setMax] = useState(0)

  const indexChange = () => {
    //once transition is complete allow for next slide

    if (currentIndex >= max) {
      setIndex(1)
    }
    if (currentIndex <= 0) {
      setIndex(sliderImgs.length - 2)
    }
  }

  useEffect(() => {
    timeID = setTimeout(() => {
      setIndex(prevIndex => prevIndex + 1)
    }, 7000)

    return () => clearTimeout(timeID)
  }, [currentIndex])

  useEffect(() => {
    indexChange()
  }, [currentIndex])

  useEffect(() => {
    if (sliderImgs.length > 0) {
      setMax(sliderImgs.length - 1)
    }
  }, [sliderImgs])

  return (
    <>
      <Overlay />

      <Slider>
        <Inner>
          {sliderImgs.map((img, i) => {
            return (
              <ImageContainer
                key={i}
                active={currentIndex === i ? true : false}
              >
                <img src={img.url} alt="work" />
              </ImageContainer>
            )
          })}
        </Inner>
      </Slider>
    </>
  )
}

export default MobileGallery
