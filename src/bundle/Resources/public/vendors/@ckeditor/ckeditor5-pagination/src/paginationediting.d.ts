/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module pagination/paginationediting
 */
import { Plugin } from 'ckeditor5/src/core.js';
import PaginationLookup from './paginationlookup.js';
import PaginationRenderer from './paginationrenderer.js';
import '../theme/pagination.css';
/**
 * The pagination editing plugin.
 */
export default class PaginationEditing extends Plugin {
    /**
     * The current page number.
     *
     * @observable
     * @default 1
     * @readonly
     */
    readonly pageNumber: number;
    /**
     * The total page count.
     *
     * @observable
     * @default 1
     * @readonly
     */
    totalPages: number;
    /**
     * @inheritDoc
     */
    static get pluginName(): "PaginationEditing";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof PaginationLookup, typeof PaginationRenderer];
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Scroll the editor content to a desired page.
     *
     * @param pageNumber The page number (counting from 1).
     */
    scrollToPage(pageNumber: number): void;
    /**
     * Moves the selection to the beginning of a specific page.
     *
     * Also see {@link #scrollToPage}.
     *
     * @param pageNumber The page number (counting from 1).
     */
    moveSelectionToPage(pageNumber: number): void;
    /**
     * Scrolls the document and moves the user selection to the next page.
     */
    goToNextPage(): void;
    /**
     * Scrolls the document and moves the user selection to the previous page.
     */
    goToPreviousPage(): void;
}
