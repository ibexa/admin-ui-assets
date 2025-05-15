/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module remove-format/removeformatediting
 */
import { Plugin } from 'ckeditor5/src/core.js';
/**
 * The remove format editing plugin.
 *
 * It registers the {@link module:remove-format/removeformatcommand~RemoveFormatCommand removeFormat} command.
 */
export default class RemoveFormatEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "RemoveFormatEditing";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    init(): void;
}
