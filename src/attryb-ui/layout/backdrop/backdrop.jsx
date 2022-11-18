import React from "react"

const Backdrop = ({ onClick, children }) => {
  return (
    <div className="Backdrop" onClick={onClick}>
      {children}
    </div>
  )
}

export default Backdrop
