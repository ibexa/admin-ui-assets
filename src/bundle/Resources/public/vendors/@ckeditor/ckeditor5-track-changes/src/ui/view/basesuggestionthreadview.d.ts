/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/ui/view/basesuggestionthreadview
 * @publicApi
 */
import { FocusCycler, View, ViewCollection, type FocusableView } from 'ckeditor5/src/ui.js';
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5/src/utils.js';
import type { EditorConfig } from 'ckeditor5/src/core.js';
import type Suggestion from '../../suggestion.js';
import type { CommentsListView, CommentThreadInputView, CommentView } from '@ckeditor/ckeditor5-comments';
import { AriaDescriptionView, type User } from 'ckeditor5-collaboration/src/collaboration-core.js';
import type { Description } from '../../suggestiondescriptionfactory.js';
import type SuggestionView from './suggestionview.js';
/**
 * An abstract suggestion thread view class that should be used as a base for suggestion thread view implementations.
 * It provides some behaviors, flags and building blocks to use when creating a custom suggestion thread view class.
 *
 * All events fired by {@link module:comments/comments/ui/view/basecommentview~BaseCommentView}
 * are delegated to {@link module:track-changes/ui/view/basesuggestionthreadview~BaseSuggestionThreadView}.
 * This means that {@link module:track-changes/ui/view/basesuggestionthreadview~BaseSuggestionThreadView} can also fire these
 * events to communicate with CKEditor 5 collaboration features.
 *
 * For the usage examples check the {@glink features/collaboration/annotations/annotations-custom-view
 * Annotations custom view} guide.
 */
export default abstract class BaseSuggestionThreadView extends View {
    /**
     * The list of comment views. It should be used as a part of the view template when present.
     */
    commentsListView: CommentsListView | null;
    /**
     * The comment input area view. It should be used as a part of the view template when present.
     */
    commentThreadInputView: CommentThreadInputView | null;
    /**
     * A helper view that provides an ARIA description for the comment thread used by
     * assistive technologies.
     */
    readonly ariaDescriptionView: AriaDescriptionView;
    /**
     * A boolean value that informs if the comment thread view is in the active state ("highlighted").
     * A comment thread view is in this state when it is focused or was activated by the user in any different way.
     *
     * @observable
     */
    isActive: boolean;
    /**
     * Suggestion creation date.
     *
     * @observable
     */
    authoredAt: Date | null;
    /**
     * Flag that indicates whether suggestion acceptation is possible.
     *
     * @observable
     */
    canAccept: boolean;
    /**
     * Flag that indicates whether suggestion discarding is possible.
     *
     * @observable
     */
    canDiscard: boolean;
    /**
     * Stores description entries generated for this suggestion that describe what is the suggested change.
     * They are used to create the final description presented in the suggestion view to the user.
     *
     * Note that one suggestion may include multiple changes.
     *
     * Most cases are simple and include just one description item:
     *
     *  ```ts
     * [
     *		{ type: 'insertion', content: '*Insert:* "Foo"' }
     * ]
     *	```
     *
     * This description item represents a suggestion for inserting the "Foo" text. The `type` property describes the performed action
     * while the `content` property contains additional information about the action and is optional.
     *
     * A more complex example is presented below:
     *
     * ```ts
     * [
     *		{ type: 'insertion', content: '*Insert:* 2 paragraphs' },
     *		{ type: 'insertion', content: '*Insert:* image' },
     *		{ type: 'replace', content: '*Replace:* "Foo" *with* "Bar"' }
     * ]
     * ```
     *
     * In this example, there are three description instances (or lines). Two new (empty) paragraphs were added,
     * an image was added and then "Foo" text was replaced by "Bar". The above structure could be rendered as:
     *
     *  ```html
     *	<p><strong>Insert:</strong> 2 paragraphs</p>
     *	<p><strong>Insert:</strong> image</p>
     *	<p><strong>Replace:</strong> "Foo" <strong>with</strong> "Bar"</p>
     *	```
     *
     * @observable
     */
    descriptionParts: Array<Description>;
    /**
     * Informs whether the suggestion thread has any changes that have not been saved.
     *
     * @observable
     */
    isDirty: boolean;
    /**
     * Informs whether the suggestion can be accepted or discarded.
     *
     * @observable
     */
    isEnabled: boolean;
    /**
     * The number of items in the view, where the suggestion itself counts as one.
     *
     * In other words, it is equal to the number of comments in the suggestion thread view plus one.
     *
     * @observable
     */
    readonly length: number;
    /**
     * An accessible thread label text exposed to assistive technologies.
     */
    ariaLabel: string;
    /**
     * A collection of focusable child views.
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
    constructor(locale: Locale, model: Suggestion, localUser: User, config: SuggestionThreadConfig);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * Focuses the view.
     */
    focus(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
/**
 * Fired when a user performed an action that should lead to accepting the suggestion.
 *
 * This event is not fired by default by any component created by `BaseSuggestionThreadView`.
 * If you create a view class extending `BaseSuggestionCommentView`, you should provide
 * a UI element that will fire this event.
 *
 * @eventName ~BaseSuggestionThreadView#acceptSuggestion
 */
export type AcceptSuggestionEvent = {
    name: 'acceptSuggestion';
    args: [
        id: string
    ];
};
/**
 * Fired when a user performed an action that should lead to discarding the suggestion.
 *
 * This event is not fired by default by any component created by `BaseSuggestionThreadView`.
 * If you create a view class extending `BaseSuggestionCommentView`, you should provide
 * a UI element that will fire this event.
 *
 * @eventName ~BaseSuggestionThreadView#discardSuggestion
 */
export type DiscardSuggestionEvent = {
    name: 'discardSuggestion';
    args: [
        id: string
    ];
};
/**
 * Config used for suggestion thread views.
 */
export interface SuggestionThreadConfig {
    disableComments: boolean;
    editorConfig: EditorConfig;
    maxCommentsWhenCollapsed: number;
    maxThreadTotalWeight: number;
    maxCommentCharsWhenCollapsed: number;
    formatDateTime: (date: Date | string) => string;
    CommentView: typeof CommentView;
    CommentsListView: typeof CommentsListView;
    CommentThreadInputView: typeof CommentThreadInputView;
    SuggestionView: typeof SuggestionView;
}
