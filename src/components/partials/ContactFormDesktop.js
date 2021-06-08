import React from "react"

import wideScreenLayoutStyles from "./contactstyles/ContactDesktop.module.scss"

const ContactFormDesktop = ({ inputs, handleInputs, formSubmit, loading }) => {
  const renderInputs = inputs.map((input, i) => {
    console.log(input.title)
    return (
      <div key={i} className={wideScreenLayoutStyles.cf__input__column}>
        <label
          className={wideScreenLayoutStyles.cf__dt__label}
          htmlFor={input.title}
        >
          {input.label}
        </label>
        <input
          className={wideScreenLayoutStyles.cf__dt__input}
          name={input.title}
          id={input.title}
          type={input.type}
          placeholder={input.placeholder}
          value={input.value}
          onChange={e => handleInputs(e)}
          required={true}
        />
      </div>
    )
  })

  return (
    <div className={wideScreenLayoutStyles.nb__dt__right}>
      <form
        className={wideScreenLayoutStyles.cf__dt__form}
        onSubmit={formSubmit}
      >
        {renderInputs}
        <button
          className={wideScreenLayoutStyles.cf__dt__button}
          onSubmit={formSubmit}
        >
          {loading ? "Sending..." : "Contact Us"}
        </button>
      </form>
    </div>
  )
}

export default ContactFormDesktop
