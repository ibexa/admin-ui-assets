/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module code-block/codeblockediting
 */
import { Plugin, type Editor } from 'ckeditor5/src/core';
import { ShiftEnter } from 'ckeditor5/src/enter';
/**
 * The editing part of the code block feature.
 *
 * Introduces the `'codeBlock'` command and the `'codeBlock'` model element.
 */
export default class CodeBlockEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "CodeBlockEditing";
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof ShiftEnter];
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
}
