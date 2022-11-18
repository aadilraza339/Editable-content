/* eslint-disable no-unused-vars */
import React from "react"

const ListItem = ({
  active,
  cursor,
  disabled,
  data = {},
  children,
  onClick = () => null,
  ...rest
}) => {
  return (
    <div
      className="ListItem"
      data-active={active}
      data-cursor={cursor}
      data-disabled={disabled}
      onClick={() => {
        if (data) onClick(data)
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

export default ListItem
