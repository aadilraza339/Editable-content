export const getUniformWhitespace = function (impureText) {
    return impureText.replace(/\s+/g, " ").trim()
}
