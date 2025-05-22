/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * Transforms `<a>` elements which are bookmarks by moving their children after the element.
 */
export default function transformBookmarks(documentFragment, writer) {
    const elementsToChange = [];
    for (const value of writer.createRangeIn(documentFragment)) {
        const element = value.item;
        if (element.is('element', 'a') &&
            !element.hasAttribute('href') &&
            (element.hasAttribute('id') || element.hasAttribute('name'))) {
            elementsToChange.push(element);
        }
    }
    for (const element of elementsToChange) {
        const index = element.parent.getChildIndex(element) + 1;
        const children = element.getChildren();
        writer.insertChild(index, children, element.parent);
    }
}
