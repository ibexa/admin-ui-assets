/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { View, type FocusableView } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
/**
 * A view displaying the context of a comment thread. The context is a piece of text from editor content
 * that comment was created on. It gives users a better understanding of what is discussed in the thread.
 */
export default class CommentThreadHeaderContextView extends View implements FocusableView {
    /**
     * The text of the content, it corresponds to some of the content in the editor.
     */
    contextValue: string;
    constructor(locale: Locale);
    /**
     * @inheritDoc
     */
    focus(): void;
}
