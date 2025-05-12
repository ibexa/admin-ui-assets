/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/view/basecommentview
 * @publicApi
 */
import { View, ViewCollection, type FocusableView, FocusCycler } from 'ckeditor5/src/ui.js';
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5/src/utils.js';
import { AriaDescriptionView } from 'ckeditor5-collaboration/src/collaboration-core.js';
import type { Comment } from '../../commentsrepository.js';
import type { CommentViewConfig } from '../../../config.js';
/**
 * An abstract comment view class that should be used as a base for comment view implementations.
 *
 * It provides some behaviors, flags and building blocks to use when creating a custom comment view class.
 */
export default class BaseCommentView extends View implements FocusableView {
    locale: Locale;
    /**
     * Informs whether the comment view is in the editing mode.
     *
     * @observable
     */
    isEditMode: boolean;
    /**
     * Flag indicating whether the comment view displays an actual comment (`false`) or is a system message (`true`).
     * System message comment should not include any UI elements which allow for editing the comment as it is not an actual comment.
     *
     * @readonly
     */
    isSystemComment: boolean;
    /**
     * Stores the currently displayed sub-view.
     *
     * This is a collection that always includes one view: comment content view or comment input view.
     * Depending whether the comment is in editing mode or not, one of the views is in the collection.
     * When the comment mode changes, the content of this collection also changes.
     *
     * By default, the comment is in the "content mode" and this view collection stores the comment content view.
     */
    readonly visibleView: ViewCollection;
    /**
     * A helper view that provides an ARIA description for the comment used by
     * assistive technologies.
     */
    readonly ariaDescriptionView: AriaDescriptionView;
    /**
     * An accessible label text used by assistive technologies describing the comment.
     */
    ariaLabel: string;
    /**
     * A collection of child views that can receive focus and contribute to the (shift) tab key navigation.
     */
    readonly focusables: ViewCollection<FocusableView>;
    /**
     * Tracks information about DOM focus in the comment view.
     */
    readonly focusTracker: FocusTracker;
    /**
     * Instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * Helps cycling over focusable {@link #focusables} in the comment.
     */
    readonly focusCycler: FocusCycler;
    /**
     * @param locale The localization service instance.
     * @param model The model on which the view will base.
     * @param config Additional view configuration.
     */
    constructor(locale: Locale, model: Comment, config: CommentViewConfig);
    /**
     * Expands the view.
     */
    expand(): void;
    /**
     * Collapses the view.
     */
    collapse(): void;
    /**
     * Focuses the view.
     */
    focus(): void;
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    destroy(): Promise<void>;
    /**
     * Switches the comment to the editing mode.
     */
    switchToEditMode(): void;
    /**
     * Switches the comment back from the editing mode to the content display mode.
     */
    switchToDisplayMode(): void;
    /**
     * Gets the translated note which indicates that the comment comes from an external source.
     */
    getExternalCommentNote(): string;
    /**
     * Gets the translated notification text which indicates that author name comes from an external source.
     */
    getUserViewNotificationText(): string | null;
}
/**
 * Fired when a user performed an action that should lead to creating a new comment in the comment thread.
 *
 * This event is fired by default when the comment input field of the comment thread is submitted.
 *
 * @eventName ~BaseCommentView#addComment
 * @param content The content of the new comment.
 */
export type UIAddCommentEvent = {
    name: 'addComment';
    args: [content: string];
};
/**
 * Fired when a user performed an action that should lead to updating the comment content.
 *
 * This event is fired by default when the comment input field of a comment is submitted.
 *
 * @param commentId The ID of the updated comment.
 * @param commentContent The updated comment content.
 * @eventName ~BaseCommentView#updateComment
 */
export type UIUpdateCommentEvent = {
    name: 'updateComment';
    args: [commentId: string, commentContent: string];
};
/**
 * Fired when a user performed an action that should lead to removing a comment.
 *
 * This event is not fired by default by any component created by {@link module:comments/comments/ui/view/basecommentview~BaseCommentView}.
 * If you create a view class extending {@link module:comments/comments/ui/view/basecommentview~BaseCommentView} you should provide
 * a UI element that will fire this event.
 *
 * @param commentId The ID of the removed comment.
 * @eventName ~BaseCommentView#removeComment
 */
export type UIRemoveCommentEvent = {
    name: 'removeComment';
    args: [commentId: string];
};
