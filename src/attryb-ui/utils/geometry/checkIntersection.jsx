export const checkIntersection = (top, left, height, width, x, y) => {
    if (
      top === undefined ||
      left === undefined ||
      height === undefined ||
      width === undefined ||
      x === undefined ||
      y === undefined
    )
      return false
    return x > left && x < left + width && y > top && y < top + height
  }
  