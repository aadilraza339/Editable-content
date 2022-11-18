export const findListObjectIndex = (list, target) => {
    if (!list?.length) return -1
    if (!target || !Object.keys(target)?.length) return -1
  
    return list.findIndex(item => item?._id === target?._id)
  }
  