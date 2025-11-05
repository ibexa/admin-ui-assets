"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHTML = void 0;
const escapeHTML = (string) => {
    const stringTempNode = document.createElement('div');
    stringTempNode.appendChild(document.createTextNode(string));
    return stringTempNode.innerHTML;
};
exports.escapeHTML = escapeHTML;
