/**
 * It turns out that there are bugs with contenteditable and innerText linebreaks.
 * Chrome and FireFox reports too many linebreaks.
 * Browsers make up their own HTML for contenteditable linebreaks.
 * Some use div, some use p tags, others prefer br. Chrome mixes and matches divs
 * and br elements. No wonder innerText returns the wrong result — it's hard to
 * parse unpredictable HTML!
 * Therefore, making a function to manually parse inner text
 *
 * Read more: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content#differences_in_markup_generation
 */
export const standardizeInnerText = (targetChildNodes) => {
    let standardizedInnerText = ""
    let isOnFreshLine = true

    /**
     * Recursive function to navigate childNodes and build linebreaks with text
     */
    // eslint-disable-next-line no-unused-vars
    const parseChildNodesForValueAndLines = (childNodes) => {
        for (let i = 0; i < childNodes?.length; i++) {
            const childNode = childNodes[i]

            if (childNode.nodeName === "BR") {
                /**
                 * BRs are always line breaks which means the next loop is on a fresh line
                 */
                standardizedInnerText += "\n"
                isOnFreshLine = true
                continue
            }
            /**
             * We may or may not need to create a new line
             */
            if (childNode.nodeName === "DIV" && isOnFreshLine === false) {
                /**
                 * Divs create new lines for themselves if they aren't already on one
                 */
                standardizedInnerText += "\n"
            }

            /**
             * Whether we created a new line or not, we'll use it for this content
             * so the next loop will not be on a fresh line:
             */
            isOnFreshLine = false

            /**
             * Add the text content if this is a text node:
             */
            if (childNode.nodeType === 3 && childNode.textContent) {
                standardizedInnerText += childNode.textContent
            }

            /**
             * If this node has children, get into them as well:
             */
            parseChildNodesForValueAndLines(childNode.childNodes)
        }
    }

    parseChildNodesForValueAndLines(targetChildNodes)
    return standardizedInnerText
}
