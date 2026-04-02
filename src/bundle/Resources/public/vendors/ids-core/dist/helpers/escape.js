export const escapeHTML = (string) => {
    const stringTempNode = document.createElement('div');
    stringTempNode.appendChild(document.createTextNode(string));
    return stringTempNode.innerHTML;
};
