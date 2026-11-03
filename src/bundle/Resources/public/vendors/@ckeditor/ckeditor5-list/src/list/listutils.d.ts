/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module list/list/listutils
 */
import type { Element, Model, Position } from 'ckeditor5/src/engine';
import { Plugin } from 'ckeditor5/src/core';
/**
 * A set of helpers related to document lists.
 */
export default class ListUtils extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "ListUtils";
    /**
     * Checks whether the given list-style-type is supported by numbered or bulleted list.
     */
    getListTypeFromListStyleType(listStyleType: string): 'bulleted' | 'numbered' | null;
    /**
     * Returns an array with all `listItem` elements in the model selection.
     *
     * It returns all the items even if only a part of the list is selected, including items that belong to nested lists.
     * If no list is selected, it returns an empty array.
     * The order of the elements is not specified.
     */
    getSelectedListItems(model: Model): Array<Element>;
    /**
     * Returns an array with all `listItem` elements that represent the same list.
     *
     * It means that values of `listIndent`, `listType`, `listStyle`, `listReversed` and `listStart` for all items are equal.
     *
     * Additionally, if the `position` is inside a list item, that list item will be returned as well.
     *
     * @param position Starting position.
     * @param direction Walking direction.
     */
    getSiblingNodes(position: Position, direction: 'forward' | 'backward'): Array<Element>;
}
