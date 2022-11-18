import React from "react"

const Button = ({
  type = "button",
  variant = "solid",
  state = "default",
  colorScheme = "primary",
  size = "md",
  isPressed = false,
  loadingIcon = "",
  onClick,
  children,
  ...rest
}) => {
  const statesWithNoClick = ["disabled", "loading"]

  const getLoaderIcon = () => {
    if (typeof loadingIcon !== "string") return loadingIcon
    return <img className="LoadingIcon" src={loadingIcon} alt="Loading" />
  }

  const onClickHandler = event => {
    if (statesWithNoClick.includes(state)) return
    if (onClick) onClick(event)
  }

  return (
    <button
      type={type}
      data-variant={variant}
      data-state={state}
      data-colorscheme={colorScheme}
      data-size={size}
      data-pressed={isPressed}
      className="Button"
      onClick={event => onClickHandler(event)}
      {...rest}
    >
      {state === "loading" ? getLoaderIcon() : children}
    </button>
  )
}

export default Button
