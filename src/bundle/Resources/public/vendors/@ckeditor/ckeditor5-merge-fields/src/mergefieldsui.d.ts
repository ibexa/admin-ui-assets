/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module merge-fields/mergefieldsui
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { ContextualBalloon } from 'ckeditor5/src/ui.js';
import { Widget } from 'ckeditor5/src/widget.js';
import MergeFieldsEditing from './mergefieldsediting.js';
import '../theme/mergefields.css';
import '../theme/insert-dropdown.css';
/**
 * The merge fields UI feature.
 */
export default class MergeFieldsUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly ["Mention", typeof MergeFieldsEditing, typeof ContextualBalloon, typeof Widget];
    /**
     * @inheritDoc
     */
    static get pluginName(): "MergeFieldsUI";
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
    destroy(): void;
}
