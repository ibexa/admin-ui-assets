/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/view/commentinputview
 */
import { View, FocusCycler, ButtonView, type FocusableView, type ViewCollection } from 'ckeditor5/src/ui.js';
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5/src/utils.js';
import { type EditorConfig, type DataApi } from 'ckeditor5/src/core.js';
import CommentEditor from '../commenteditor/commenteditor.js';
/**
 * A view for the comment input section that includes a comment editor.
 */
export default class CommentInputView extends View {
    /**
     * Comment editor.
     */
    editor: CommentEditor & DataApi | null;
    /**
     * The input value (comment editor content).
     *
     * @observable
     */
    value: string;
    /**
     * When set to `true` it is not possible to submit the commit.
     *
     * @observable
     */
    disabledSubmit: boolean;
    /**
     * Specifies whether the buttons should be visible (`true`) or hidden (`false`).
     *
     * @observable
     */
    showButtons: boolean;
    /**
     * The comment editor placeholder.
     *
     * @observable
     */
    placeholder: string;
    /**
     * The submit button label.
     *
     * @observable
     */
    submitLabel: string;
    element: HTMLElement;
    /**
     * Keystroke handler for the view.
     */
    keystrokes: KeystrokeHandler;
    /**
     * Focus tracker for the view.
     */
    focusTracker: FocusTracker;
    /**
     * Collection of focusable sub-views in the input component.
     */
    focusables: ViewCollection<FocusableView>;
    /**
     * Helps providing keyboard navigation between {@link #focusables}.
     */
    focusCycler: FocusCycler;
    /**
     * Button view for the button which submits the comment.
     */
    submitButtonView: ButtonView;
    /**
     * Button view for the button which cancels comment input.
     */
    cancelButtonView: ButtonView;
    constructor(locale: Locale, editorConfig?: EditorConfig);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * Creates the comment editor instance.
     *
     * @returns Promise resolved after the editor instance is initialized.
     */
    createEditor(): Promise<CommentEditor | undefined>;
    /**
     * Focuses the view.
     */
    focus(direction?: 1 | -1): void;
    /**
     * @inheritDoc
     */
    destroy(): Promise<void>;
}
/**
 * An event fired when a user successfully submits a comment. The event carries the comment content.
 */
export type CommentInputSubmitEvent = {
    name: 'submit';
    args: [cotnent: string];
};
