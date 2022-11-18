import React from "react"

const InputField = ({
  name = "",
  state = "default",
  placeholder = "",
  preFilledValue = "",
  maxCharsLimit = 0,
  ...rest
}) => {
  return (
    <input
      role="input"
      className="InputField"
      autoComplete="off"
      id={name}
      name={name}
      type="text"
      placeholder={placeholder}
      value={preFilledValue}
      data-state={state}
      disabled={state === "disabled"}
      maxLength={maxCharsLimit ? maxCharsLimit : undefined}
      {...rest}
    />
  )
}

export default InputField
