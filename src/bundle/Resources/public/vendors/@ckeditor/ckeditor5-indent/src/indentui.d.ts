/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Plugin } from 'ckeditor5/src/core';
/**
 * The indent UI feature.
 *
 * This plugin registers the `'indent'` and `'outdent'` buttons.
 *
 * **Note**: In order for the commands to work, at least one of the compatible features is required. Read more in
 * the {@link module:indent/indent~Indent indent feature} API documentation.
 */
export default class IndentUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "IndentUI";
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Defines a UI button.
     */
    private _defineButton;
}
