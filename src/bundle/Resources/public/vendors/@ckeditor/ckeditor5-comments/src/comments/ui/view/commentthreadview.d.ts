/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/view/commentthreadview
 * @publicApi
 */
import { type Locale } from 'ckeditor5/src/utils.js';
import { LateFocusButtonView, type User } from 'ckeditor5-collaboration/src/collaboration-core.js';
import { type View, type ViewWithFocusCycler, type TemplateDefinition, type ViewCollection } from 'ckeditor5/src/ui.js';
import BaseCommentThreadView from './basecommentthreadview.js';
import type { CommentThread } from '../../commentsrepository.js';
import type { CommentThreadConfig } from '../../../config.js';
declare const CommentThreadView_base: import("ckeditor5/src/utils.js").Mixed<typeof BaseCommentThreadView, import("@ckeditor/ckeditor5-collaboration-core/src/utils/confirmmixin.js").ConfirmApi>;
/**
 * The default view for comment thread.
 */
export default class CommentThreadView extends /* #__PURE__ -- @preserve */ CommentThreadView_base implements ViewWithFocusCycler {
    isConfirm: boolean;
    cancelConfirm: () => void;
    showConfirm: (key: string, element: unknown) => Promise<void>;
    /**
     * The locale instance.
     */
    readonly locale: Locale;
    /**
     * A property used by the template.
     *
     * It works as a visual indicator for the user that an action is about to be performed.
     * The value of this property is used in setting the CSS class.
     * The property is used when the user interacts with the view.
     *
     * @observable
     */
    actionIndicator: string | null;
    /**
     * View collection which holds all comment thread children elements.
     *
     * These views are:
     *
     * * {@link ~CommentThreadView#commentThreadHeaderView `commentThreadHeaderView`} (added at the beginning when the comment thread is
     * resolved),
     * * {@link ~CommentThreadView#commentsListView `commentsListView`},
     * * {@link ~CommentThreadView#commentThreadInputView `commentThreadInputView`}.
     *
     * @readonly
     */
    readonly commentThreadChildren: ViewCollection<View>;
    /**
     * `ConfirmView` uses this element as a container for confirmation dialog.
     *
     * The element is set after `view#render()` is called.
     *
     * @member {HTMLElement|null} #containerElement
     */
    containerElement: HTMLElement | null;
    /**
     * Resolve button view. Resolve button fires the 'resolveCommentThread' event when submitted.
     *
     * @readonly
     */
    readonly resolveButton: LateFocusButtonView;
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, model: CommentThread, localUser: User, config: CommentThreadConfig);
    /**
     * Returns a template definition that will be passed to {@link module:ui/view~View#setTemplate}.
     *
     * Overwrite this method if you want to set a custom template for the comment thread view.
     *
     * The default template looks as follows:
     *
     * ```ts
     * const bind = this.bindTemplate;
     *
     * {
     * 	tag: 'div',
     *
     * 	attributes: {
     * 		class: [
     * 			'ck',
     * 			'ck-thread',
     * 			'ck-reset_all-excluded',
     * 			'ck-rounded-corners',
     * 			bind.if( 'isActive', 'ck-thread--active' ),
     * 			bind.if( 'isUnlinked', 'ck-thread--unlinked' ),
     * 			bind.if( 'isConfirm', 'ck-thread--remove-confirmation' ),
     * 			bind.to( 'actionIndicator', value => value ? `ck-thread--${ value }` : '' )
     * 		],
     * 		'data-thread-id': this._model.id,
     * 		// Needed for managing focus after adding new comment.
     * 		tabindex: 0,
     * 		role: 'listitem',
     * 		'aria-label': bind.to( 'ariaLabel' ),
     * 		'aria-describedby': this.ariaDescriptionView.id
     * 	},
     *
     * 	children: [
     * 		{
     * 			tag: 'div',
     * 			attributes: {
     * 				class: 'ck-thread__container'
     * 			},
     * 			children: this.commentThreadChildren
     * 		}
     * 	]
     * };
     * ```
     *
     * See the {@glink features/collaboration/annotations/annotations-custom-view Annotation custom view guide} to learn more about
     * the possible annotation customizations.
     *
     * @returns The definition of a comment thread view's template.
     */
    getTemplate(): TemplateDefinition;
    /**
     * @inheritDoc
     */
    render(): void;
}
export {};
