export const escapeHTML = (string) => {
    const stringTempNode = document.createElement('div');
    stringTempNode.appendChild(document.createTextNode(string));
    return stringTempNode.innerHTML;
};
export const escapeHTMLAttribute = (value) => {
    if (value === null || value === undefined) {
        return '';
    }
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};
