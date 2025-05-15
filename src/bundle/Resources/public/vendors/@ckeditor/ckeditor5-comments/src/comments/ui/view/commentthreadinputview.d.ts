/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/view/commentthreadinputview
 */
import { type FocusableView, type FocusCycler, View } from 'ckeditor5/src/ui.js';
import CommentInputView from './commentinputview.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import type { EditorConfig } from 'ckeditor5/src/core.js';
import { UserView, type User } from 'ckeditor5-collaboration/src/collaboration-core.js';
/**
 * View that represents comment input area for a comment thread. Includes editor, user view and buttons.
 */
export default class CommentThreadInputView extends View implements FocusableView {
    /**
     * Specifies whether the comment input view should be visible (`true`) or hidden (`false`).
     *
     * @observable
     */
    showInput: boolean;
    /**
     * Comment input view.
     */
    commentInputView: CommentInputView;
    /**
     * Helps move focus between focusable elements.
     *
     * **Note:** This property is a proxy is exposed for parent views to discover and use focus cycling capabilities of the view
     * while in fact the actual implementation is in the {@link #commentInputView}.
     */
    focusCycler: FocusCycler;
    /**
     * User view for the input area. Presents the local user.
     */
    userView: UserView;
    /**
     * @param locale The localization service instance.
     * @param localUser Current local user.
     * @param editorConfig
     */
    constructor(locale: Locale, localUser: User, editorConfig: EditorConfig);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    destroy(): Promise<void>;
    /**
     * @inheritDoc
     */
    focus(direction?: 1 | -1): void;
}
