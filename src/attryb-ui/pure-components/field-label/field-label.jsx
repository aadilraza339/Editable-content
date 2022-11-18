import React from "react"

const FieldLabel = ({
  name,
  forFieldValue = "",
  maxCharsLimit = 0,
  children,
  ...rest
}) => {
  return (
    <label htmlFor={name} className="FieldLabel" data-name={name} {...rest}>
      <div className="label-text">{children}</div>
      {maxCharsLimit > 0 ? (
        <div
          className="chars"
          data-filled={forFieldValue?.length >= maxCharsLimit}
        >
          {forFieldValue?.length.toLocaleString()}/
          {maxCharsLimit.toLocaleString()}
        </div>
      ) : null}
    </label>
  )
}

export default FieldLabel
