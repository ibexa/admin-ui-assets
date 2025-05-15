/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/view/commentthreadheaderview
 */
import { View, ButtonView, FocusCycler, type FocusableView, type ViewCollection } from 'ckeditor5/src/ui.js';
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5/src/utils.js';
import type { CommentThread } from '../../commentsrepository.js';
import CommentThreadHeaderContextView from './commentthreadheadercontextview.js';
export declare const MAX_CONTENT_LENGTH = 150;
/**
 * A view for the comment thread header.
 */
export default class CommentThreadHeaderView extends View implements FocusableView {
    locale: Locale;
    /**
     * Defines whether the context value exists.
     *
     * @observable
     */
    hasContext: boolean;
    /**
     * Context value to display in the header.
     *
     * @observable
     */
    contextValue: string;
    /**
     * Button view for the button which reopen the comment thread.
     */
    reopenButtonView: ButtonView;
    /**
     * The view that displays the context of the comment thread to the user, for instance,
     * the part of text the thread (first comment) relates to.
     */
    contextView: CommentThreadHeaderContextView;
    /**
     * The collection of focusable sub-views in the header.
     */
    readonly focusables: ViewCollection<FocusableView>;
    /**
     * Tracks information about DOM focus in the header view.
     */
    readonly focusTracker: FocusTracker;
    /**
     * Instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * Helps cycling over focusable {@link #commentThreadChildren} in the header view.
     */
    readonly focusCycler: FocusCycler;
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, model: CommentThread);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    focus(): void;
}
/**
 * Fired when a user performed an action that should lead to reopen the resolved comment thread.
 *
 * @eventName ~CommentThreadHeaderView#reopenCommentThread
 */
export type UIReopenCommentThreadEvent = {
    name: 'reopenCommentThread';
    args: [id: string];
};
