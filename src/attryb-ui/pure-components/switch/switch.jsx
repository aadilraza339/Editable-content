import React from "react"

/**
 * Primary UI component for user interaction
 */
const Switch = ({
  value = false,
  size = "md",
  onClick = () => null,
  children,
  ...rest
}) => {
  return (
    <div className="Switch" data-size={size} onClick={onClick} {...rest}>
      {children}
      <div className="SwitchToggle" data-state={value}>
        <div className="SwitchToggleBtn"></div>
      </div>
    </div>
  )
}

export default Switch
