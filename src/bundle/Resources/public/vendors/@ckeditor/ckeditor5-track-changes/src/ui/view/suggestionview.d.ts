/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/ui/view/suggestionview
 * @publicApi
 */
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5/src/utils.js';
import { View, type TemplateDefinition, type FocusableView, ViewCollection, FocusCycler } from 'ckeditor5/src/ui.js';
import { LateFocusButtonView, UserView } from 'ckeditor5-collaboration/src/collaboration-core.js';
import type Suggestion from '../../suggestion.js';
/**
 * A view displaying a detailed information about the suggestion as well as controls to accept or discard it.
 *
 * This view can be replaced by other view by overwriting the
 * {@link module:track-changes/trackchangesconfig~TrackChangesConfig#SuggestionView} configuration.
 */
export default class SuggestionView extends View implements FocusableView {
    /**
     * A suggestion description explaining what has been changed. To be presented to the user.
     *
     * @observable
     */
    description: string;
    /**
     * A user view for the suggestion author.
     */
    userView: UserView;
    /**
     * A button view for the button that accepts the suggestion.
     */
    acceptButton: LateFocusButtonView;
    /**
     * A button view for the button that discards the suggestion.
     */
    discardButton: LateFocusButtonView;
    /**
     * A collection of focusable child views.
     */
    readonly focusables: ViewCollection<FocusableView>;
    /**
     * Tracks information about DOM focus in the suggestion.
     */
    readonly focusTracker: FocusTracker;
    /**
     * Instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * Helps cycling over focusable views in the suggestion.
     */
    readonly focusCycler: FocusCycler;
    /**
     * Suggestion creation date.
     *
     * @observable
     */
    authoredAt: Date | null;
    constructor(locale: Locale, model: Suggestion, config: SuggestionConfig);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * Returns a template definition that will be passed to {@link module:ui/view~View#setTemplate}.
     *
     * Overwrite this method if you want to set a custom template for the suggestion view.
     *
     * The template looks as follows:
     *
     * ```ts
     * const bind = this.bindTemplate;
     * const suggestionContentElements = [
     * 	{
     * 		tag: 'div',
     *
     * 		attributes: {
     * 			class: [ 'ck-suggestion__info', 'ck-annotation__info' ]
     * 		},
     *
     * 		children: [
     * 			{
     * 				tag: 'span',
     *
     * 				children: [
     * 					{
     * 						text: this.userView.name
     * 					}
     * 				],
     *
     * 				attributes: {
     * 					class: [ 'ck-suggestion__info-name', 'ck-annotation__info-name' ]
     * 				}
     * 			},
     * 			{
     * 				tag: 'time',
     *
     * 				attributes: {
     * 					datetime: bind.to( 'authoredAt' ),
     * 					class: [ 'ck-comment__info-time', 'ck-annotation__info-time' ]
     * 				},
     *
     * 				children: [
     * 					{
     * 						text: bind.to( 'authoredAt', value => this._config.formatDateTime( value ) )
     * 					}
     * 				]
     * 			}
     * 		]
     * 	},
     * 	{
     * 		tag: 'div',
     *
     * 		attributes: {
     * 			class: [ 'ck-suggestion__actions', 'ck-annotation__actions' ]
     * 		},
     *
     * 		children: [
     * 			this.acceptButton,
     * 			this.discardButton
     * 		]
     * 	},
     * 	{
     * 		tag: 'div',
     *
     * 		attributes: {
     * 			class: [ 'ck-annotation__content-wrapper' ]
     * 		}
     * 	}
     * ];
     *
     * if ( this._model.isExternal ) {
     * 	suggestionContentElements.push( {
     * 		tag: 'div',
     *
     * 		attributes: {
     * 			class: [ 'ck-comment__external' ]
     * 		},
     *
     * 		children: [ {
     * 			text: this.getExternalSuggestionNote()
     * 		} ]
     * 	} );
     * }
     *
     * return {
     * 	tag: 'div',
     *
     * 	attributes: {
     * 		class: [
     * 			'ck-suggestion',
     * 			'ck-annotation'
     * 		],
     * 		tabindex: -1
     * 	},
     *
     * 	children: [
     * 		this.userView,
     * 		{
     * 			tag: 'div',
     *
     * 			attributes: {
     * 				class: [ 'ck-suggestion__main', 'ck-annotation__main' ],
     * 				role: 'presentation'
     * 			},
     *
     * 			children: suggestionContentElements
     * 		}
     * 	]
     * };
     * ```
     */
    getTemplate(): TemplateDefinition;
    /**
     * @inheritDoc
     */
    focus(): void;
    /**
     * Gets the translated notification text which indicates that the author name comes from an external source.
     */
    getUserViewNotificationText(): string | null;
    /**
     * Gets the translated note which indicates that the suggestion comes from an external source.
     */
    getExternalSuggestionNote(): string;
}
export interface SuggestionConfig {
    formatDateTime: (date: Date | string) => string;
}
