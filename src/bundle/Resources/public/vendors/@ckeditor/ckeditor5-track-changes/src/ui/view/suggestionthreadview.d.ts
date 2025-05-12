/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/ui/view/suggestionthreadview
 * @publicApi
 */
import { default as BaseSuggestionThreadView, type SuggestionThreadConfig } from './basesuggestionthreadview.js';
import { type TemplateDefinition, type ViewWithFocusCycler } from 'ckeditor5/src/ui.js';
import { type User } from 'ckeditor5-collaboration/src/collaboration-core.js';
import { type Locale } from 'ckeditor5/src/utils.js';
import type Suggestion from '../../suggestion.js';
import type SuggestionView from './suggestionview.js';
/**
 * The default view for a suggestion thread.
 *
 * This view can be replaced by other view by overwriting the
 * {@link module:track-changes/trackchangesconfig~TrackChangesConfig#SuggestionThreadView} configuration.
 */
export default class SuggestionThreadView extends BaseSuggestionThreadView implements ViewWithFocusCycler {
    /**
     * The suggestion thread view type.
     *
     * This value is not equal to the suggestion (model) type. It is evaluated based on the type of the first suggestion for
     * the suggestion thread view template purposes.
     *
     * @observable
     */
    type: 'format' | 'replace' | 'deletion' | 'insertion' | '';
    /**
     * A suggestion description explaining what has been changed. To be presented to the user.
     *
     * @observable
     */
    description: string;
    /**
     * A view displaying a detailed information about the suggestion as well as controls to accept or discard it.
     */
    suggestionView: SuggestionView;
    constructor(locale: Locale, model: Suggestion, localUser: User, config: SuggestionThreadConfig);
    /**
     * Returns a template definition that will be passed to {@link module:ui/view~View#setTemplate}.
     *
     * Overwrite this method if you want to set a custom template for the suggestion thread view.
     *
     * The template looks as follows:
     *
     * ```ts
     * const bind = this.bindTemplate;
     * const suggestionThreadChildren = [
     * 	this.suggestionView
     * ];
     *
     * if ( this.commentsListView ) {
     * 	suggestionThreadChildren.push( this.commentsListView );
     * }
     *
     * if ( this.commentThreadInputView ) {
     * 	suggestionThreadChildren.push( this.commentThreadInputView );
     * }
     *
     * suggestionThreadChildren.push( this.ariaDescriptionView );
     *
     * return {
     * 	tag: 'div',
     * 	attributes: {
     * 		class: [
     * 			'ck',
     * 			'ck-rounded-corners',
     * 			'ck-suggestion-wrapper',
     * 			bind.if( 'isActive', 'ck-suggestion-wrapper--active' ),
     * 			bind.to( 'type', value => `ck-suggestion-${ value }` ),
     * 			this._config.disableComments && 'ck-suggestion--disabled-comments'
     * 		],
     * 		'data-suggestion-id': this._model.id,
     * 		'data-thread-id': this._model.commentThread!.id,
     * 		'data-author-id': this._model.author.id,
     * 		// Needed for managing focus after adding new comment.
     * 		tabindex: 0,
     * 		role: 'listitem',
     * 		'aria-label': bind.to( 'ariaLabel' ),
     * 		'aria-describedby': this.ariaDescriptionView.id
     * 	},
     * 	children: suggestionThreadChildren
     * };
     * ```
     */
    getTemplate(): TemplateDefinition;
    /**
     * @inheritDoc
     */
    render(): void;
}
