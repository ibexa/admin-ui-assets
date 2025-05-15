/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/view/basecommentthreadview
 * @publicApi
 */
import { FocusCycler, View, type FocusableView, type ViewCollection } from 'ckeditor5/src/ui.js';
import { type Locale, FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils.js';
import CommentThreadInputView from './commentthreadinputview.js';
import CommentsListView from './commentslistview.js';
import CommentThreadHeaderView from './commentthreadheaderview.js';
import { AriaDescriptionView, type User } from 'ckeditor5-collaboration/src/collaboration-core.js';
import type { CommentThread } from '../../commentsrepository.js';
import type { CommentThreadConfig } from '../../../config.js';
/**
 * An abstract comment thread view class that should be used as a base for comment thread view implementations.
 * It provides some behaviors, flags and building blocks to use when creating a custom comment thread view class.
 *
 * For the usage examples check the {@glink features/collaboration/annotations/annotations-custom-view Custom annotation view} guide.
 */
export default class BaseCommentThreadView extends View {
    locale: Locale;
    /**
     * Informs whether the comment thread view is in active state ("highlighted").
     * A comment thread view is in this state when it is focused or was activated by the user in any other way.
     *
     * @observable
     */
    isActive: boolean;
    /**
     * Informs whether the comment thread view is in unlinked state.
     * A comment thread view is in this state when its corresponding target has been removed from the content.
     *
     * @observable
     */
    isUnlinked: boolean;
    /**
     * Informs whether the comment thread has any changes that have not been saved.
     *
     * @observable
     */
    isDirty: boolean;
    /**
     * The number of comments.
     *
     * @observable
     */
    readonly length: number;
    /**
     * The list of comment views. It should be used as a part of the view template.
     *
     * @readonly
     */
    readonly commentsListView: CommentsListView;
    /**
     * The comment thread header. It should be used as a part of the view template.
     * This header is used only for resolved comment threads.
     *
     * @readonly
     */
    readonly commentThreadHeaderView: CommentThreadHeaderView;
    /**
     * The comment input area view. It should be used as a part of the view template.
     *
     * @readonly
     */
    readonly commentThreadInputView: CommentThreadInputView;
    /**
     * A helper view that provides an ARIA description for the comment thread used by
     * assistive technologies.
     */
    readonly ariaDescriptionView: AriaDescriptionView;
    /**
     * An accessible thread label text exposed to assistive technologies.
     */
    ariaLabel: string;
    /**
     * The collection of focusable views in the comment thread.
     */
    readonly focusables: ViewCollection<FocusableView>;
    /**
     * Tracks information about DOM focus in the thread.
     */
    readonly focusTracker: FocusTracker;
    /**
     * Instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * Helps cycling over focusable views in the thread.
     */
    readonly focusCycler: FocusCycler;
    /**
     * @param locale The localization service instance.
     * @param model The model on which the view will base.
     * @param localUser The current local user.
     * @param config Additional view configuration.
     */
    constructor(locale: Locale, model: CommentThread, localUser: User, config: CommentThreadConfig);
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
}
/**
 * Fired when a user created a first comment in the comment thread. Then the comment thread is submitted and saved.
 *
 * @eventName ~BaseCommentThreadView#submitCommentThread
 */
export type UISubmitCommentThreadEvent = {
    name: 'submitCommentThread';
    args: [];
};
/**
 * Fired when a user performed an action that should lead to removing the comment thread.
 *
 * This event is not fired by default by any component created by `BaseCommentThreadView`.
 * If you create a view class extending `BaseCommentThreadView`, you should provide
 * a UI element that will fire this event.
 *
 * This event is fired by default when an empty comment thread view (with no comments)
 * loses focus.
 *
 * @eventName ~BaseCommentThreadView#removeCommentThread
 */
export type UIRemoveCommentThreadEvent = {
    name: 'removeCommentThread';
    args: [];
};
/**
 * Fired when a user performed an action that should lead to resolve the comment thread.
 *
 * @eventName ~BaseCommentThreadView#resolveCommentThread
 */
export type UIResolveCommentThreadEvent = {
    name: 'resolveCommentThread';
    args: [id: string];
};
