/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module document-outline/documentoutline/ui/documentoutlineitemview
 */
import { View } from 'ckeditor5/src/ui.js';
import { type Locale } from 'ckeditor5/src/utils.js';
/**
 * An item of the document outline.
 */
export default class DocumentOutlineItemView extends View {
    /**
     * The textual content of the item.
     *
     * @observable
     */
    text: string;
    /**
     * The level of heading nesting in the document.
     *
     * @observable
     */
    level: number;
    /**
     * Indicates whether the given item is currently active.
     *
     * @observable
     */
    isActive: boolean;
    /**
     * Indicates whether the heading doesn't have any text.
     *
     * @observable
     */
    isEmpty: boolean;
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, showEmptyHeadingText?: boolean);
}
/**
 * Fired whenever an item in the document outline is clicked.
 *
 * @eventName ~DocumentOutlineItemView#click
 */
export type DocumentOutlineItemViewClickEvent = {
    name: 'click';
    args: [];
};
