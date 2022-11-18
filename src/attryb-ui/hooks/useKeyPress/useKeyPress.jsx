// Custok hook for storing state of key press
import { useState, useEffect } from "react"

// Custok hook for storing state of key press
const useKeyPress = targetKey => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = event => {
    event.stopPropagation()

    if (event.key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = event => {
    event.stopPropagation()

    if (event.key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)

    const cleanUp = () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }

    return cleanUp
  })

  return keyPressed
}

export default useKeyPress
