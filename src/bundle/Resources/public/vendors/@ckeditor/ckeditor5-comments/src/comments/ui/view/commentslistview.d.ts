/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/view/commentslistview
 */
import { View, FocusCycler, type ViewCollection, type FocusableView } from 'ckeditor5/src/ui.js';
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5/src/utils.js';
import type { CommentThread } from '../../commentsrepository.js';
import type CommentView from './commentview.js';
import type { CommentThreadConfig } from '../../../config.js';
/**
 * A view representing the list of comments. It should be used as a part of the comment thread view.
 */
export default class CommentsListView extends View implements FocusableView {
    locale: Locale;
    /**
     * Informs whether the list contains any comment view that is in the editing mode.
     *
     * @observable
     */
    hasDirtyComment: boolean;
    /**
     * Number of comments in the list.
     *
     * @observable
     */
    length: number;
    /**
     * Informs whether the comments list view is in the active state ("highlighted").
     * Comment list view is in that state when it is focused or it was activated by the user in any different way.
     *
     * @observable
     */
    isActive: boolean;
    /**
     * View collection which holds all comment views to be displayed.
     * It may also contain collapsed count view if the comments list view is collapsed and some comment views are hidden.
     *
     * @readonly
     */
    readonly visibleViews: ViewCollection;
    /**
     * View collection which holds all comment views created for given comment thread.
     *
     * @readonly
     */
    readonly commentViews: ViewCollection<CommentView>;
    /**
     * Comment view used to display information that comment has been resolved.
     *
     * @readonly
     */
    resolvedCommentView: CommentView | null;
    /**
     * Tracks information about DOM focus in the comments list.
     */
    readonly focusTracker: FocusTracker;
    /**
     * Instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * Helps cycling over focusable {@link #commentViews} in the list.
     */
    readonly focusCycler: FocusCycler;
    /**
     * @param locale The localization service instance.
     * @param model The model on which the view will base.
     * @param config Additional view configuration.
     */
    constructor(locale: Locale, model: CommentThread, config: CommentThreadConfig);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * Focuses the view.
     */
    focus(direction?: 1 | -1): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Refreshes the list of the visible views.
     *
     * When doing so, it performs a minimal amount of changes, so that views are not re-added, which might cause undesirable effects
     * like focus loss or glitches due to CSS animations.
     *
     * The comments list may be collapsed or expanded:
     *
     * * it is expanded, if it {@link ~#isActive is active},
     * * it is expanded, if {@link module:comments/comments/commentsrepository~CommentThread#weight comment thread weight}
     * is lower than allowed (`config.comments.maxThreadTotalWeight`),
     * * it is expanded, if it {@link ~#hasDirtyComment has any comments in edit mode},
     * * it is collapsed, if neither of above is true.
     *
     * When comments list is in collapsed state, it displays at most `config.comments.maxCommentsWhenCollapsed` comment views:
     *
     * * first comment view,
     * * {@link ~#_collapsedCommentsView collapsed comments counter} (if there are any hidden views),
     * * appropriate number of the comments from the bottom of the thread.
     *
     * All the comments are also {@link module:comments/comments/ui/view/basecommentview~BaseCommentView#collapse set to collapsed state}.
     *
     * When comments list in in expanded state, it displays all comment views for all comments. All the comments are also
     * {@link module:comments/comments/ui/view/basecommentview~BaseCommentView#expand set to expanded state}.
     */
    refreshVisibleViews(): void;
}
