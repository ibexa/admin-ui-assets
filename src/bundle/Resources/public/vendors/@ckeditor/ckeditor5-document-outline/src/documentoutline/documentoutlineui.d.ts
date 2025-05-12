/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module document-outline/documentoutline/documentoutlineui
 * @publicApi
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import DocumentOutlineView from './ui/documentoutlineview.js';
import '../../theme/documentoutline.css';
/**
 * Provides the UI for the document outline feature.
 */
export default class DocumentOutlineUI extends Plugin {
    /**
     * The representation of the document outline view.
     */
    view: DocumentOutlineView;
    /**
     * @inheritDoc
     */
    static get pluginName(): "DocumentOutlineUI";
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
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    afterInit(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
