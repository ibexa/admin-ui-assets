/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module alignment/alignmentediting
 */
import { Plugin, type Editor } from 'ckeditor5/src/core';
/**
 * The alignment editing feature. It introduces the {@link module:alignment/alignmentcommand~AlignmentCommand command} and adds
 * the `alignment` attribute for block elements in the {@link module:engine/model/model~Model model}.
 */
export default class AlignmentEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "AlignmentEditing";
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
}
