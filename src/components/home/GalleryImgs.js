import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import GalleryImg from "./GalleryImg"

const spin = keyframes`
  100% {
    transform:rotate(360deg);
  }
`

const ImageGrid = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  & video {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    @media screen and (max-width: 760px) {
      object-position: bottom;
    }
  }
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
    width: 90%;
  }
`
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem;
`

const FancyButton = styled.button`
  background-color: #ceb862;
  color: #fff;
  padding: 1rem 1.5rem;
  font-weight: 700;
  border: 0;
  min-width: 25rem;
  position: relative;
  z-index: 1;
  font-size: 1.4rem;
  letter-spacing: 1.3px;
  border: 2px solid #ceb862;
  box-shadow: 0 1px 10px #22222205;
  border-radius: 2px;
  transition: all 1s ease-in-out;
  &:hover {
    cursor: pointer;
    color: #fff;
    &::after {
      top: 0;
      left: 0;
    }
  }

  @media screen and (max-width: 760px) {
    min-width: 12rem;
    width: 15rem;
    margin-top: 0rem;
    font-size: 1rem;
  }
`

const LoadingSpinner = styled.div`
  display:block;
  height:2.6rem;
  width:2.6rem'
  border-radius:100%;
  border:2px solid transparent;
  border-top:2px solid #707070;
  animation: ${spin} .2s linear infinite;
`

const GalleryImgs = ({ isSeen }) => {
  const { allInstagramContent } = useStaticQuery(graphql`
    query InstagramPosts {
      allInstagramContent {
        edges {
          node {
            id
            caption
            permalink
            media_type
            localImage {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  width: 500
                  height: 500
                )
              }
            }
          }
        }
      }
    }
  `)

  const [amount, extend] = useState(18)
  const [max, setMax] = useState(0)

  const [loading, setLoading] = useState(false)

  const handleShowImgs = current => {
    if (current >= max) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      extend(prevAmount => prevAmount + 6)
    }, 1500)

    return () => clearTimeout()
  }

  useEffect(() => {
    if (allInstagramContent) {
      setMax(allInstagramContent.edges.length)
    }
  }, [allInstagramContent])

  if (!allInstagramContent) {
    return <p>Loading...</p>
  }

  const imgMap = allInstagramContent.edges
    .map((item, i) => {
      return <GalleryImg item={item} i={i} isSeen={isSeen} />
    })
    .slice(0, amount)

  return (
    <>
      <MobileImageGrid>{imgMap}</MobileImageGrid>
      <ImageGrid>{imgMap}</ImageGrid>
      {amount < max && !loading ? (
        <BtnContainer>
          <FancyButton onClick={e => handleShowImgs(amount)}>
            Show More
          </FancyButton>
        </BtnContainer>
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}

export default GalleryImgs
