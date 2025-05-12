/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module bookmark/bookmarkediting
 */
import { type Editor, Plugin } from 'ckeditor5/src/core.js';
import type { Element } from 'ckeditor5/src/engine.js';
import '../theme/bookmark.css';
/**
 * The bookmark editing plugin.
 */
export default class BookmarkEditing extends Plugin {
    /**
     * A collection of bookmarks elements in the document.
     */
    private _bookmarkElements;
    /**
     * @inheritDoc
     */
    static get pluginName(): "BookmarkEditing";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Returns the model element for the given bookmark ID if it exists.
     */
    getElementForBookmarkId(bookmarkId: string): Element | null;
    /**
     * Returns all unique bookmark names existing in the content.
     */
    getAllBookmarkNames(): Set<string>;
    /**
     * Defines the schema for the bookmark feature.
     */
    private _defineSchema;
    /**
     * Defines the converters for the bookmark feature.
     */
    private _defineConverters;
    /**
     * Creates a UI element for the `bookmark` representation in editing view.
     */
    private _createBookmarkUIElement;
    /**
     * Tracking the added or removed bookmark elements.
     */
    private _trackBookmarkElements;
}
