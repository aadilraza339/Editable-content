const switchScrollDisable = (flag) => {
    const classSelector = "disable-scroll"
    const attributeHook = "data-disable-dropdownscroll"
    Array.from(document.querySelectorAll("*")).forEach((el) => {
        if (el.hasAttribute(attributeHook))
            return flag
                ? el.classList.add(classSelector)
                : el.classList.remove(classSelector)
    })
}

export const disableScroll = () => switchScrollDisable(true)

export const enableScroll = () => switchScrollDisable(false)
