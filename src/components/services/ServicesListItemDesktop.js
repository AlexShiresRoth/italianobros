import React from "react"

import { ReadMoreButton } from "./ReadMoreButton"

const ServicesListItemDesktop = ({
  service,
  contentSize,
  read,
  reduced,
  styles,
  animate,
}) => {
  if (!service) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.container__column} id={service.id}>
      <div
        className={`${styles.servicesList__item} ${animate ? "fadeIn" : ""}`}
      >
        <div className={styles.servicesList__item__heading}>
          <h1>{service.title}</h1>
          <hr />
        </div>
        {service.button ? (
          <div className={styles.paragraph}>
            <ReadMoreButton
              contentSize={contentSize}
              read={read}
              content={service.content}
              reduced={reduced}
            />
          </div>
        ) : (
          <div className={styles.paragraph}>
            <p>
              {service.content}
              {""}
            </p>
          </div>
        )}
        <div className={styles.services__image__grid}>
          {service?.images.map((img, i) => {
            return (
              <figure className={styles.services__image} key={i}>
                <img src={img} alt={img} className={styles.services__img} />
              </figure>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServicesListItemDesktop
