import React from "react"

const FieldGroup = ({
  name,
  flexDirection = "column",
  gap = "0.33rem",
  margin = "0rem",
  padding = "0rem",
  children,
  ...rest
}) => {
  const sx = {
    ...rest["style"],
    display: "flex",
    flexDirection: flexDirection,
    gap: gap,
    margin: margin,
    padding: padding
  }

  return (
    <div className="FieldGroup" data-name={name} {...rest} style={sx}>
      {children}
    </div>
  )
}

export default FieldGroup
