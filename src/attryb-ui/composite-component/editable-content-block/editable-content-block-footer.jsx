import React from "react"
// import { motion } from "framer-motion"
import { Button } from "../../pure-components"

const EditableContentBlockFooter = ({
  editMode,
  manualSave,
  charCountVisibility,
  charCount,
  error,
  charsEl,
  maxChars,
  onClick
}) => {
  return editMode && (manualSave || error?.status || charCountVisibility) ? (
    <div
      data-testid="editable-content-block-footer"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="EditableContentBlockFooter"
      data-twocols={Boolean(charCount) || error?.status}
      data-save={manualSave}
    >
      {error?.status ? (
        <div className="error-message">{error?.message}</div>
      ) : null}
      {charCountVisibility ? (
        <div className="message">
          <span>Characters:</span>
          <span ref={charsEl} className="chars">
            {charCount?.toLocaleString()}/{maxChars?.toLocaleString()}
          </span>
        </div>
      ) : null}

      {manualSave ? (
        <Button
          size="sm"
          state={error?.status ? "disabled" : "default"}
          onClick={onClick}
        >
          Save
        </Button>
      ) : null}
    </div>
  ) : null
}

export default EditableContentBlockFooter
