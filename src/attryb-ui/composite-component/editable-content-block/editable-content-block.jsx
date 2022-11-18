
import React, { useEffect, useRef, useState, useCallback } from "react"
// import { motion } from "framer-motion"


import { useClickOutside } from "../../hooks"
import useKeyPress from '../../hooks/useKeyPress/useKeyPress.jsx'
import EditableContentBlockFooter from "./editable-content-block-footer"
import { motion } from "framer-motion"

const EditableContentBlock = ({
  formatting = "plain",
  maxCharsLimit = 0,
  manualSave = false,
  allowEmpty = false,
  editMode = false,
  children,
  responseCallback = () => {
    
  },
  ...rest
}) => {
  const thisEl = useRef(null)
  /**
   * Holds the reference to the child div which is contentEditable=true
   */
  const childEl = useRef(null)
  /**
   * Reference to the div displaying characters count in the component footer
   */
  const charsEl = useRef(null)
  /**
   * Custom hook that provides the state of esc key press along with
   * event object as second argument
   */
  const escPress = useKeyPress("Escape")
  /**
   * Stores the error state of the component.
   */
  const [error, setError] = useState({
    status: false,
    message: ""
  })
  /**
   * Stores the initial children HTML this content block was loaded with
   * Useful when we need to revert back to default content when press Esc
   */
  const [initialHTMLFormChildren, setInitialHTMLFromChildren] = useState("")
  /**
   * Returns the count of characters in content editable div's text
   */
  const getCharsCount = () => {
    return childEl?.current?.innerText?.length ?? 0
  }
  /**
   * Tells if the content is empty or not in editable div
   */
  const isInnerTextEmpty = useCallback(() => {
    const refCurrent = childEl?.current
    return refCurrent?.innerText?.trim()?.length === 0
  }, [childEl])

  const isListContentEmpty = useCallback(() => {
    const refCurrent = childEl?.current
    const componentHasLi = refCurrent?.querySelector("li")
    return refCurrent?.innerText?.trim()?.length === 0 && !!componentHasLi
  }, [childEl])

  /**
   * The main function which takes the editMode state from prop and evaluates
   * the final change in edit state of this component based on conditions from
   * other state attributes of this component
   */
  const getEvaluatedEditState = useCallback(
    // eslint-disable-next-line indent
    currentEditState => {
      /**
       * If component is already in edit mode, keeps the component in edit mode
       * We don't want to toggle the edit mode on each and every outside click
       */
      if (currentEditState) return true
      /**
       * Don't close the component on outside click if manual saving is enabled.
       * Outside click saving is automatic saving. Manual saving is when user
       * has to press "save" button on component's footer
       */
      if (!currentEditState && manualSave) return true
      /**
       * Don't close the component on outside click if there's an error
       */

      if (error.status) return true
      /**
       * Don't close the component on outside click if empty content is NOT allowed AND
       * the content is exactly empty for now
       */
      if (!allowEmpty && isInnerTextEmpty()) return true

      /**
       * If no conditions are met above, simply return the current state as it is.
       */
      return currentEditState
    },
    [allowEmpty, error?.status, manualSave, isInnerTextEmpty]
  )

  /**
   * Tells if the character limit has been exceeded or not
   */
  const isMaxCharsLimitReached = useCallback(() => {
    if (maxCharsLimit === 0) return false

    return getCharsCount() >= maxCharsLimit
  }, [maxCharsLimit])
  /**
   * Gets the innerHTML of first child of the div wrapper inserted as
   * children of this component
   */
  const getFirstChildHTML = html => {
    if (!html) return ""

    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = html

    const firstChild = tempDiv?.childNodes[0]
    return firstChild?.innerHTML ?? ""
  }
  /**
   * Holds the procedure(s) to execute when saving the component
   * i.e giving the updated response back to the parent component
   */
  const saveContent = useCallback(() => {
    /**
     * If we are not allowing empty text then we will not exit
     * edit mode when the text is empty
     */
    if (error.status) return
    const response = {
      innerHTML: getFirstChildHTML(childEl?.current?.innerHTML ?? ""),
      data: [childEl?.current?.innerText ?? ""],
      formatting: formatting
    }

    if (response?.innerHTML !== initialHTMLFormChildren) {
      responseCallback(response)
      setInitialHTMLFromChildren(response?.innerHTML)
    }
  }, [error?.status, formatting, responseCallback, initialHTMLFormChildren])
  /**
   * handling outside click
   */
  const onOutsideClick = (isOutside, event) => {
    // if (!event?.currentTarget) return
    if (isOutside) saveContent()
    return
  }

  useClickOutside([thisEl], onOutsideClick)
  /**
   * Checks if character count is visible or not in component's footer
   */
  const isCharCountVisible = useCallback(() => {
    return maxCharsLimit > 0 && !error.status
  }, [error?.status, maxCharsLimit])

  const preventInputOnLimitReach = (event, limitReached) => {
    if (event?.key != "Backspace" && limitReached) {
      event?.nativeEvent?.preventDefault()
    }
  }
  /**
   * Resets the error state of the component
   */
  const resetErrors = useCallback(() => {
    if (!error?.status) return

    setError({
      status: false,
      message: ""
    })
  }, [error?.status])
  /**
   * Updates the error state of the component when character
   * limit is reached/crossed
   */
  const charLimitExceedError = () => {
    setError({
      status: true,
      message: "Max. characters limit reached"
    })
  }
  const emptyContentError = () => {
    setError({
      status: true,
      message: "Empty content is not allowed"
    })
  }
  /**
   * Handles all the input (keydown event) change on the div with
   * editable-content=true
   */
  const inputChangeHandler = useCallback(
    event => {
      if (charsEl?.current) {
        charsEl.current.innerText = `${getCharsCount()?.toLocaleString()}/${maxCharsLimit?.toLocaleString()}`
      }

      if (isMaxCharsLimitReached()) return charLimitExceedError()
      if (isInnerTextEmpty() && !allowEmpty) return emptyContentError()

      /**
       * TODO: Still has some bugs. Need to fix. User can keep on typing
       * even after passing the max. chars limit
       */
      preventInputOnLimitReach(event, isMaxCharsLimitReached())

      if (!isCharCountVisible) return

      resetErrors()
    },
    [
      isCharCountVisible,
      isInnerTextEmpty,
      charsEl,
      maxCharsLimit,
      isMaxCharsLimitReached,
      resetErrors,
      allowEmpty
    ]
  )

  useEffect(() => {
    /**
     * When component first renders, set the initialHTML state with the
     * innerHTML of children prop as passed by parent component
     */
    if (!childEl?.current) return
    setInitialHTMLFromChildren(childEl?.current?.innerHTML)
  }, [])

  /**
   * Handles the case when user presses `Esc` key while in edit mode
   */
  useEffect(() => {
    /**
     * Do nothing if there's no Esc event object
     */
    if (!escPress?.event) return
    /**
     * Do nothing if the Esc key is released and the target of that esc key
     * is not same as the editable div of this component
     */
    if (
      escPress.state === false ||
      escPress?.event?.target !== childEl?.current
    )
      return

    /**
     * If no initialHTML exist, simply returs
     */
    if (!initialHTMLFormChildren) return
    /**
     * We want to reset error state of the component when user pressed Esc key
     * Max. char check is the only check which turns the error state ON of this
     * component
     */
    if (isMaxCharsLimitReached()) resetErrors()

    /**
     * Resets the content with the initial content. Basically "Undo"
     * changes when press Esc key
     */
    if (childEl?.current) childEl.current.innerHTML = initialHTMLFormChildren
  }, [
    escPress,
    isMaxCharsLimitReached,
    initialHTMLFormChildren,
    error,
    resetErrors
  ])

  useEffect(() => {
    /**
     * If edit mode is enabled focus on the editable div.
     * This shows the cursor when click on the component
     */
    if (editMode) childEl?.current?.focus()
    /**
     * If manual save is diabled, simply save the content on
     * edit mode toggle
     */
    if (!manualSave) saveContent()
  }, [editMode, manualSave, saveContent])

  return (
    <motion.div
      ref={thisEl}
      data-testid="editable-content-block"
      animate={
        getEvaluatedEditState(editMode)
          ? { boxShadow: "0 .17rem 1rem 0 rgba(23, 43, 77, 0.24)" }
          : { boxShadow: "none" }
      }
      transition={{ type: "spring", stiffness: 500, damping: 12 }}
      className="EditableContentBlock"
      /**
       * Use to style the error state of the component
       */
      data-error={error.status}
      data-empty={
        formatting === "plain" ? isInnerTextEmpty() : isListContentEmpty()
      }
      data-editing={getEvaluatedEditState(editMode)}
      {...rest}
    >
      <div
        ref={childEl}
        className="EditableContent"
        data-contenttype={formatting}
        contentEditable={getEvaluatedEditState(editMode)}
        suppressContentEditableWarning={true}
        data-gramm_editor={false}
        spellCheck="false"
        onKeyUp={inputChangeHandler}
      >
        {children}
      </div>

      {/* Determining the visibilty of the footer of editable card */}
      <EditableContentBlockFooter
        editMode={getEvaluatedEditState(editMode)}
        manualSave={manualSave}
        charCountVisibility={isCharCountVisible()}
        charCount={getCharsCount()}
        error={error}
        charsEl={charsEl}
        maxChars={maxCharsLimit}
        onClick={saveContent}
      />
    </motion.div>
  )
}

export default EditableContentBlock
