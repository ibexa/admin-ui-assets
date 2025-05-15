/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module document-outline/documentoutline
 * @publicApi
 */
import { Plugin } from 'ckeditor5/src/core.js';
import DocumentOutlineUtils from './documentoutline/documentoutlineutils.js';
import DocumentOutlineUI from './documentoutline/documentoutlineui.js';
/**
 * The document outline feature.
 * It allows for an easy access to a predefined list of headings in the document.
 */
export default class DocumentOutline extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof DocumentOutlineUtils, typeof DocumentOutlineUI];
    /**
     * @inheritDoc
     */
    static get pluginName(): "DocumentOutline";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    init(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
/**
 * The configuration of the {@link module:document-outline/documentoutline~DocumentOutline document outline feature}.
 *
 * ```ts
 * ClassicEditor
 * 	.create( editorElement, {
 * 		documentOutline:  ... // Document outline feature configuration.
 * 	} )
 * 	.then( /* ... *\/ )
 * 	.catch( /* ... *\/ );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 */
export interface DocumentOutlineConfig {
    /**
     * The container element for the document outline to render. This should be a reference to an existing
     * container element in the DOM.
     */
    container?: HTMLElement;
    /**
     * An array of {@glink framework/architecture/editing-engine#model model} element names considered
     * as headings in the document outline.
     *
     * The index of the heading in the array reflects the heading nesting level. It can be used e.g. for reducing
     * the number of visible headings.
     *
     * ```ts
     * ClassicEditor
     * 	.create( editorElement, {
     * 		plugins: [ DocumentOutline, /* ... *\/ ],
     * 		documentOutline: {
     * 			headings: [ 'heading1', 'heading2', /* ... *\/ ],
     * 			// ...
     * 		}
     * 	} )
     * 	.then( /* ... *\/ )
     * 	.catch( /* ... *\/ );
     * ```
     *
     * If this configuration is not defined, the feature will use the following defaults instead:
     *
     * 1. If the {@glink features/headings Headings feature} is loaded, it equals
     * * {@link module:heading/headingconfig~HeadingConfig#options `config.heading.options`}.
     * * `[ 'heading1', 'heading2', 'heading3' ]` if `config.heading.options` is not defined.
     * 2. If the {@glink features/html/general-html-support General HTML Support} feature is loaded, it equals
     * `[ 'htmlH1', 'htmlH2', 'htmlH3', 'htmlH4', 'htmlH5', 'htmlH6' ]`.
     *
     * **Note**: The Headings feature takes precedence over the General HTML Support feature when
     * both are loaded.
     */
    headings?: Array<string>;
    /**
     * Allows you to display a placeholder text: [Empty heading] for empty headings.
     *
     * By default, the display of a placeholder is disabled. To enable it, set this parameter to true.
     *
     * **Note**: This setting also affects Table of contents feature.
     */
    showEmptyHeadings?: boolean;
}
