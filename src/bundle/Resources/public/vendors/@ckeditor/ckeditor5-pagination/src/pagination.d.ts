/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module pagination/pagination
 * @publicApi
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import PaginationEditing from './paginationediting.js';
import PaginationUI from './paginationui.js';
/**
 * The pagination feature.
 */
export default class Pagination extends Plugin {
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
    readonly totalPages: number;
    /**
     * @inheritDoc
     */
    static get pluginName(): "Pagination";
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
    static get requires(): readonly [typeof PaginationEditing, typeof PaginationUI];
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Scroll the editor content to a desired page.
     *
     * @param pageNumber The page number (counting from 1).
     */
    scrollToPage(pageNumber: number): void;
}
/**
 * The configuration of the pagination feature. It is used by the pagination feature from the `@ckeditor/ckeditor5-pagination` package.
 *
 * ```ts
 * ClassicEditor
 * 	.create( editorElement, {
 * 		pagination: {
 * 			// A4
 * 			pageWidth: '21cm',
 * 			pageHeight: '29.7cm',
 *
 * 			pageMargins: {
 * 				top: '20mm',
 * 				bottom: '20mm',
 * 				left: '12mm',
 * 				right: '12mm'
 * 			}
 * 		}
 * 	} )
 * 	.then( ... )
 * 	.catch( ... );
 * ```
 *
 * **NOTE:** The configuration of the plugin must match the {@link module:export-pdf/exportpdf~ExportPdfConfig export to PDF} or
 * {@link module:export-word/exportword~ExportWordConfig export to Word} feature configuration.
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 */
export interface PaginationConfig {
    /**
     * The page width.
     */
    pageWidth: string;
    /**
     * The page height.
     */
    pageHeight: string;
    /**
     * The page margins.
     */
    pageMargins: PaginationMarginsConfig;
    /**
     * The pagination feature is by default enabled only in browsers that are using the Blink engine
     * (Chrome, Chromium, newer Edge, newer Opera). This is due to some existing incompatibilities in Firefox and Safari;
     * we will be working on them in the future.
     *
     * This behavior can be modified by setting this configuration value to `true`.
     *
     * @default false
     */
    enableOnUnsupportedBrowsers?: boolean;
}
/**
 * The configuration of the pagination feature page margins.
 */
export interface PaginationMarginsConfig {
    /**
     * The top margin.
     */
    top: string;
    /**
     * The bottom margin.
     */
    bottom: string;
    /**
     * The left margin.
     */
    left: string;
    /**
     * The right margin.
     */
    right: string;
}
/**
 * The configuration required by the pagination plugin is missing.
 * Follow the instructions provided in {@glink features/pagination/pagination#configuration Pagination feature documentation}
 * to initialize the plugin properly.
 *
 * @error pagination-config-not-found
 * @param {module:core/editor/editorconfig~EditorConfig} config Configuration of the editor.
 */
