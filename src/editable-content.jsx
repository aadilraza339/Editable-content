import React,{useState} from 'react'
import { EditableContentBlock } from './attryb-ui'
import DOMPurify from "dompurify";

export default function EditableContent() {
    const [editMode, setEditMode] = useState(false)
  return ( 
    <EditableContentBlock
                editMode={editMode}

                maxCharsLimit={400}
                manualSave={false}
                allowEmpty={true}
                onClick={() => {
                    console.log("on clicking...")
                    setEditMode(true)
                }}
                onBlur={(event) => {
                    // const relatedTarget =
                    //     event?.relatedTarget 
                    // if (relatedTarget) relatedTarget.click()
                    setEditMode(false)
                }}
                responseCallback={(
                    res
                ) => {
                    console.log({ saving: res })
                    // if (res?.innerHTML) setListContent(res?.innerHTML)
                }}
            >
                {/* 
                            This is the children of Editable Content Block
                            We always set HTML here through "dangerouslySetInnerHTML"
                            and also sanitize the html string before passing as an arg
                            to the above function
                        */}
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(""),
                    }}
                />
            </EditableContentBlock>

  )
}
