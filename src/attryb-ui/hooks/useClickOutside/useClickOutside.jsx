import { useCallback, useEffect } from "react"
import { checkIntersection } from "../../utils/index.jsx"

const useClickOutside = (refs, handler) => {
  const isClickedOutside = useCallback(
    event => {
      if (!refs?.length) return false

      const intersections = refs?.map(ref => {
        if (!ref?.current) return false
        const { clientWidth, clientHeight, offsetLeft, offsetTop } =
          ref?.current ?? {}

        const { clientX, clientY } = event ?? {}

        if (!clientX || !clientY) return false

        return checkIntersection(
          offsetTop,
          offsetLeft,
          clientHeight,
          clientWidth,
          clientX,
          clientY
        )
      })
      return !intersections.includes(true)
    },
    [refs]
  )

  useEffect(() => {
    if (!refs?.length) return

    const listener = event => {
      handler(isClickedOutside(event), event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [refs, handler, isClickedOutside])
}

export default useClickOutside
