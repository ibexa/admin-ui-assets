/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import ColorUI from '../ui/colorui.js';
import type { Editor } from 'ckeditor5/src/core.js';
/**
 * The font background color UI plugin. It introduces the `'fontBackgroundColor'` dropdown.
 */
export default class FontBackgroundColorUI extends ColorUI {
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    static get pluginName(): "FontBackgroundColorUI";
}
