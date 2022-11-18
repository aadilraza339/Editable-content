import React, { useRef } from "react"
import PropTypes from "prop-types"
import purify from "dompurify"
import { standardizeInnerText } from "../../utils"

const EditableContent = ({ editable, htmlString, onChangeCallback }) => {
    const elRef = useRef(null)

    const onInputChangeHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const target = event?.target
        const content = {
            html: target?.innerHTML,
            text: standardizeInnerText(target?.childNodes),
        }

        onChangeCallback(content, event)
    }

    return (
        <div
            data-testid="editable-content"
            /**
             * Reference of this element
             */
            ref={elRef}
            /**
             * To be used by CSS for styling the edit and non-edit state of the component
             */
            data-edit={editable}
            className="EditableContent"
            /**
             * Sets wether the content inside of this div will be editable or not
             */
            contentEditable={editable}
            /**
             * Flag to supress warning throen by React when we use `contentEditable` on HTML tag
             */
            suppressContentEditableWarning={true}
            /**
             * There's no better way to set provided string as innerHTML in React, but leaves
             * the component vulnerable to XSS attacks! To overcome this and for further
             * security we are sanitizing the content for malicious code before passing it down
             */
            dangerouslySetInnerHTML={{ __html: purify.sanitize(htmlString) }}
            /**
             * Disabling browser extensions like grammarly as it adds to bad UX while editing
             */
            data-gramm_editor={false}
            /**
             * Disabling spell check as it adds to bad UX while editing
             */
            spellCheck="false"
            /**
             * Handles on input changes. If content is filled, reset error state
             */
            onInput={onInputChangeHandler}></div>
    )
}

EditableContent.propTypes = {
    /**
     * Flag to decide wether content of this component will be editable or not
     */
    editable: PropTypes.bool,
    /**
     * The text that will be shown as content of this component
     */
    htmlString: PropTypes.string.isRequired,
    /**
     * Callback called whenever content is saved in 'content' state or in case of manual save, whenever the save button is pressed\n Returns `content` and `event` as argument in the fucntion reference provided.
     */
    onChangeCallback: PropTypes.func,
}

EditableContent.defaultProps = {
    htmlString: "",
    editable: true,
    onChangeCallback: () => {},
}

export default EditableContent
