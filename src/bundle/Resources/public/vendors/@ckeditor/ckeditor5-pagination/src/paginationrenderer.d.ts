/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module pagination/paginationrenderer
 */
import { Plugin } from 'ckeditor5/src/core.js';
import LinesRepository from './ui/linesrepository.js';
/**
 * The pagination renderer plugin. This plugin renders pagination lines (with numbers) over
 * the editing root of the editor.
 */
export default class PaginationRenderer extends Plugin {
    /**
     * The current page number.
     *
     * @observable
     * @default 1
     * @readonly
     */
    pageNumber: number;
    /**
     * A repository of UI elements (lines) that represent page breaks rendered over the editing root.
     */
    linesRepository: LinesRepository;
    /**
     * @inheritDoc
     */
    static get pluginName(): "PaginationRenderer";
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
     * Finds a scrollable ancestor for the editing root and sets up the scroll listener and resize observer.
     */
    setupScrollableAncestor(): void;
}
