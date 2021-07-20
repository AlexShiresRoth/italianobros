import React, { useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { Heart } from "react-feather"
import ReactPlayer from "react-player"
const ImageContainer = styled.a`
  flex: 1;
  transition: all 0.3s ease-in-out;
  position: relative;
  & img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in-out !important;
    @media screen and (max-width: 760px) {
      object-position: bottom;
    }
    &:hover {
      cursor: pointer;
      flex: 1.3;
      transform: scale(1.3);
    }
  }

  @media screen and (max-width: 1000px) {
    flex: none;
    width: 95%;
    margin: 0.5rem 0;
    &:hover {
      flex: none;
    }
  }
`
const CaptionContainer = styled.div`
  height: 100%;
  width: 100%;
  opacity: ${props => (props.isVisible ? ".5" : "0")};
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Caption = styled.h4`
  color: #fff;
  margin: 2rem;
  font-size: 1.5rem;
  line-height: 1.5;
  font-family: Work Sans;
  @medias screen and (max-width:760px) {
    font-size: 0.8rem;
  }
`

const RedirectContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  color: #ffffff77;
  margin: 2rem;
  z-index: 2;
  & svg {
    transition: all 0.3s ease-in-out;
    width: 2rem;
  }
  &:hover {
    & svg {
      stroke: red;
      fill: red;
      opacity: 0.8;
      transform: scale(1.2);
    }
  }
`

const GalleryImg = ({ isSeen, i, item }) => {
  const [captionVisibility, showCaption] = useState(false)

  return (
    <ImageContainer
      style={{
        transform: `translateY(${isSeen ? "0vh" : "30vh"})`,
        transition: `all ${1 + `.${i}`}s ease-in-out`,
      }}
      key={i}
      href={item.permalink}
      onMouseEnter={e => showCaption(true)}
      onMouseLeave={e => showCaption(false)}
    >
      <CaptionContainer isVisible={captionVisibility}>
        <Caption>{item.caption}</Caption>
      </CaptionContainer>
      {item.media_type !== "VIDEO" ? (
        <img src={item.media_url} alt={"image"} />
      ) : (
        <ReactPlayer
          url={item.media_url}
          height="100%"
          width="100%"
          controls={true}
        />
      )}
      <RedirectContainer>
        <Heart size={"2rem"} width={"10rem"} />
      </RedirectContainer>
    </ImageContainer>
  )
}

GalleryImg.propTypes = {}

export default GalleryImg
