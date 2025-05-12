/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { LocaleTranslate } from 'ckeditor5/src/utils.js';
/**
 * @module collaboration-core/config
 * @publicApi
 */
/**
 * The locale configuration.
 *
 * ```ts
 * ClassicEditor
 * 	.create( {
 * 		locale: {
 * 			// The localization configuration.
 * 		}
 * 	} )
 * 	.then( ... )
 * 	.catch( ... );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor configuration options}.
 */
export interface LocaleConfig {
    /**
     * A function that formats date to the custom format. It is used in dates in annotations (balloons) displaying
     * comments and suggestions details.
     *
     * The default formatting can be changed by setting a custom formatting function to `config.locale.dateTimeFormat`.
     *
     * ```ts
     * import { DateTime } from 'luxon';
     *
     * ClassicEditor
     * 	.create( document.querySelector( '#editor' ), {
     * 		toolbar: {
     * 			items: [ 'bold', 'italic', '|', 'comment' ]
     * 		},
     * 		sidebar: {
     * 			container: document.querySelector( '#sidebar' )
     * 		},
     * 		locale: {
     * 			dateTimeFormat: date => DateTime.fromJSDate( date ).toFormat( 'dd/LL/yyyy' )
     * 		}
     * 	} )
     * 	.catch( error => console.error( error ) );
     * ```
     *
     * @returns The generated date.
     */
    dateTimeFormat?: (date: Date, t?: LocaleTranslate) => string;
}
/**
 * The configuration of the Users features.
 *
 * ```ts
 * ClassicEditor
 * 	.create( {
 * 		users: ... // Users configuration.
 * 	} )
 * 	.then( ... )
 * 	.catch( ... );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 */
export interface UsersConfig {
    /**
     * User ID value that will be used for the anonymous user.
     */
    anonymousUserId?: string;
    /**
     * Number of defined colors that are randomly assigned to users.
     */
    colorsCount?: number;
    /**
     * A callback function that customizes the way user initials are generated.
     *
     * If provided, this function will be called with the user's full name as the argument, and
     * it should return a string representing the user's initials.
     *
     * Example usage:
     * ```ts
     * ClassicEditor
     * 	.create( {
     * 		users: {
     * 			getInitialsCallback: ( name: string ) => {
     *     			// Custom logic to generate initials.
     *     			return name.split( ' ' )[ 0 ].charAt( 0 ) + name.split( ' ' )[ 1 ].charAt( 0 );
     * 			}
     * 		}
     * 	} )
     * 	.then( ... )
     * 	.catch( ... );
     * ```
     */
    getInitialsCallback?: (name: string) => string;
}
/**
 * The configuration of the real-time collaboration features.
 *
 * ```ts
 * ClassicEditor
 * 	.create( {
 * 		collaboration: ... // Collaboration features configuration.
 * 	} )
 * 	.then( ... )
 * 	.catch( ... );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 */
export interface RealTimeCollaborationConfig {
    /**
     * The channel ID is a unique ID that identifies the data loaded in the editor instance or used by
     * the context instance.
     *
     * If specified for the editor, it is the document ID.
     *
     * If you are using multiple editors instances at the same time, each of them should use a different
     * channel ID to connect to a specific document.
     *
     * If specified for context, it is the ID for all the data related to context instance.
     * This ID will be used for data that is not related to an editor instance, for example comments
     * outside the editor.
     *
     * In the case of context, the ID can be an ID of a subpage or a form, or a different entity accordingly
     * to your application.
     *
     * The channel ID can be used to recognize entity to which piece of data belongs in integrations that use `Context`
     * and context plugins. For example, if you are preparing a custom integration using the comments API,
     * you can use the channel ID to recognize whether the comment was added to an editor instance
     * (and which one) or to the context.
     *
     * ```ts
     * ClassicEditor
     * 	.create( {
     * 		collaboration: {
     * 			channelId: 'your-channel-id'
     * 		}
     * 	} )
     * 	.then( ... )
     * 	.catch( ... );
     * ```
     */
    channelId?: string;
}
