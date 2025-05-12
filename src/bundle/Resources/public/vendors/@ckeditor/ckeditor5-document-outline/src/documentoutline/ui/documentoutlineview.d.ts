/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module document-outline/documentoutline/ui/documentoutlineview
 */
import { View, type ViewCollection } from 'ckeditor5/src/ui.js';
import { type Locale, type diffToChanges } from 'ckeditor5/src/utils.js';
import type { OutlineItemDefinition } from '../documentoutlineutils.js';
import DocumentOutlineItemView from './documentoutlineitemview.js';
/**
 * The document outline panel.
 */
export default class DocumentOutlineView extends View {
    /**
     * A collection of document outline items.
     */
    readonly items: ViewCollection<DocumentOutlineItemView>;
    /**
     * Indicates which item is active at the moment.
     *
     * @observable
     */
    activeItemIndex: number;
    /**
     * The element that contains the document outline.
     *
     */
    documentOutlineContainer?: HTMLElement;
    /**
     * Creates an instance of the {@link module:documentoutline/ui/documentoutlineview~DocumentOutlineView} class.
     *
     * @param locale The localization services instance.
     * @param showEmptyHeadingText Indicates whether the display of a placeholder for empty heading is enabled in the editor.
     * @param containerElement The element that contains the document outline.
     */
    constructor(locale: Locale, showEmptyHeadingText?: boolean, containerElement?: HTMLElement);
    /**
     * If a heading was added or deleted in the editor, insert or delete it in the document outline.
     */
    sync(changesInItems: ReturnType<typeof diffToChanges<OutlineItemDefinition>>): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
/**
 * Fired whenever an item in the document outline is clicked.
 *
 * @eventName ~DocumentOutlineView#itemSelected
 * @param itemIndex Index of selected item.
 */
export type DocumentOutlineViewItemSelectedEvent = {
    name: 'itemSelected';
    args: [itemIndex: number];
};
