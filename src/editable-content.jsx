import React,{useEffect, useState} from 'react'
import { EditableContentBlock } from './attryb-ui'
import DOMPurify from "dompurify";

export default function EditableContent({title, setTitle}) {
    const [editMode, setEditMode] = useState(false)
    useEffect(()=>{
        console.log(editMode,"editModeeditMode===");

    },[editMode])

  return ( 
    <EditableContentBlock
                editMode={editMode}

                maxCharsLimit={0}
                manualSave={false}
                allowEmpty={true}
                onClick={() => {
                    console.log("on clicking...")
                    setEditMode(true)
                }}
                onBlur={(event) => {
                    console.log("blur....");
                    // const relatedTarget =
                    //     event?.relatedTarget 
                    // if (relatedTarget) relatedTarget.click()
                    setEditMode(false)
                }}
                responseCallback={(
                    res
                ) => {
                    console.log( res,"response call back")
                    if (res?.innerHTML) {
                        setTitle(res?.innerHTML)
                        // console.log( res,"response call back21212")
                    
                    }
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
                        __html: DOMPurify.sanitize(title),
                    }}
                />
            </EditableContentBlock>

  )
}
