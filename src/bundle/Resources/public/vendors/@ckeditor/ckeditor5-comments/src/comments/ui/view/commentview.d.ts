/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/view/commentview
 * @publicApi
 */
import { type Locale } from 'ckeditor5/src/utils.js';
import { ButtonView, type TemplateDefinition, type DropdownView, type FocusableView, type ViewCollection } from 'ckeditor5/src/ui.js';
import { UserView } from 'ckeditor5-collaboration/src/collaboration-core.js';
import BaseCommentView from './basecommentview.js';
import type { Comment } from '../../commentsrepository.js';
import type CommentInputView from './commentinputview.js';
import type { CommentViewConfig } from '../../../config.js';
declare const CommentView_base: import("ckeditor5/src/utils.js").Mixed<typeof BaseCommentView, import("@ckeditor/ckeditor5-collaboration-core/src/utils/confirmmixin.js").ConfirmApi>;
/**
 * The default view for comment.
 */
export default class CommentView extends /* #__PURE__ -- @preserve */ CommentView_base {
    locale: Locale;
    isConfirm: boolean;
    cancelConfirm: () => void;
    showConfirm: (key: string, element: unknown) => Promise<void>;
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
     * Comment editor placeholder value.
     *
     * @observable
     */
    placeholder: string;
    /**
     * Comment creation date.
     *
     * @observable
     */
    authoredAt: Date;
    /**
     * Comment resolved date.
     *
     * @observable
     */
    resolvedAt: Date | null;
    /**
     * Collection for UI elements that manage the comment.
     *
     * Elements that may be found in the action bar (depending on the comment view properties):
     *
     * * the resolve comment thread button (only if the comment is the first comment),
     * * a dropdown with actions ({@link ~CommentView#dropdown `dropdown`}).
     */
    actionBar: ViewCollection<FocusableView>;
    /**
     * View collection which holds all the comments dropdown elements.
     *
     * May include, depending on the view properties:
     *
     * * {@link ~CommentView#editButton `editButton`},
     * * {@link ~CommentView#removeButton `removeButton`}.
     */
    items: ViewCollection<ButtonView>;
    /**
     * Dropdown containing comment action buttons defined in {@link ~CommentView#items `items`}.
     */
    dropdown: DropdownView;
    /**
     * Edit button view. Edit button switches the comment to the editing mode.
     */
    editButton: ButtonView;
    /**
     * Remove button view. Remove button shows a confirmation box that fires the `removeComment` event when submitted.
     */
    removeButton: ButtonView;
    /**
     * User view for the comment. Presents the comment author.
     */
    userView: UserView;
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, model: Comment, config: CommentViewConfig);
    /**
     * Returns a template definition that will be passed to {@link module:ui/view~View#setTemplate}.
     *
     * Overwrite this method if you want to set a custom template for the comment view.
     *
     * The default template looks as follows:
     *
     * ```ts
     * const bind = this.bindTemplate;
     *
     * {
     * 	tag: 'li',
     *
     * 	attributes: {
     * 		class: [
     * 			'ck-comment__wrapper',
     * 			bind.if( 'isConfirm', 'ck-comment--remove-confirmation' )
     * 		],
     * 		tabindex: -1,
     * 		'aria-label': bind.to( 'ariaLabel' ),
     * 		'aria-describedby': this.ariaDescriptionView.id,
     * 		role: 'listitem'
     * 	},
     *
     * 	children: [
     * 		{
     * 			tag: 'div',
     *
     * 			attributes: {
     * 				class: [
     * 					'ck-comment',
     * 					'ck-annotation',
     * 					bind.if( 'isSystemComment', 'ck-comment--info' ),
     * 					bind.if( 'isEditMode', 'ck-comment--edit' ),
     * 					bind.to( 'actionIndicator', value => value ? `ck-comment--${ value }` : '' )
     * 				],
     * 				'data-author-id': this._model.author.id,
     * 				'data-comment-id': this._model.id,
     * 				role: 'group'
     * 			},
     *
     * 			children: [
     * 				this.userView,
     * 				{
     * 					tag: 'div',
     *
     * 					attributes: {
     * 						class: [ 'ck-comment__main', 'ck-annotation__main' ]
     * 					},
     *
     * 					children: [
     * 						{
     * 							tag: 'div',
     *
     * 							attributes: {
     * 								class: [ 'ck-comment__info', 'ck-annotation__info' ]
     * 							},
     *
     * 							children: [
     * 								{
     * 									tag: 'span',
     *
     * 									children: [
     * 										{
     * 											text: this.userView.name
     * 										}
     * 									],
     *
     * 									attributes: {
     * 										class: [ 'ck-comment__info-name', 'ck-annotation__info-name' ]
     * 									}
     * 								},
     * 								{
     * 									tag: 'time',
     *
     * 									attributes: {
     * 										datetime: bind.to( 'authoredAt' ),
     * 										class: [ 'ck-comment__info-time', 'ck-annotation__info-time' ]
     * 									},
     *
     * 									children: [
     * 										{
     * 											text: bind.to( 'authoredAt', value => this._config.formatDateTime( value ) )
     * 										}
     * 									]
     * 								}
     * 							]
     * 						},
     * 						{
     * 							tag: 'div',
     *
     * 							attributes: {
     * 								class: [
     * 									'ck-comment__actions',
     * 									'ck-annotation__actions',
     * 									bind.if( 'isEditMode', 'ck-comment__actions--hidden' ),
     * 									bind.if( 'isEditMode', 'ck-annotation__actions--hidden' )
     * 								]
     * 							},
     *
     * 							children: this.actionBar
     * 						},
     * 						{
     * 							tag: 'div',
     *
     * 							attributes: {
     * 								class: [ 'ck-annotation__content-wrapper' ]
     * 							},
     *
     * 							children: this.visibleView
     * 						},
     * 						this.ariaDescriptionView,
     * 						{
     * 							tag: 'div',
     *
     * 							attributes: {
     * 								class: [ 'ck-comment__external' ]
     * 							},
     *
     * 							children: [ {
     * 								text: this.getExternalCommentNote()
     * 							} ]
     * 						}
     * 					]
     * 				}
     *
     * 			]
     * 		}
     * 	]
     * }
     * ```
     *
     * @returns Definition of comment thread view's template.
     */
    getTemplate(): TemplateDefinition;
    /**
     * @inheritDoc
     */
    protected _createCommentInputView(): CommentInputView;
    /**
     * @inheritDoc
     */
    render(): void;
}
declare module 'ckeditor5/src/ui' {
    interface DropdownView {
        isVisible: boolean;
    }
}
export {};
