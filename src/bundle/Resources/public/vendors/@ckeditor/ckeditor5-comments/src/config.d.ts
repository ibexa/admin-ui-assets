/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/config
 * @publicApi
 */
import type { EditorConfig, PartialBy } from 'ckeditor5/src/core.js';
import type CommentView from './comments/ui/view/commentview.js';
import type BaseCommentThreadView from './comments/ui/view/basecommentthreadview.js';
/**
 * The configuration of the comments feature.
 *
 * ```ts
 * ClassicEditor.create( {
 * 	comments: ... // Comments feature configuration.
 * } )
 * .then( ... )
 * .catch( ... );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 */
export interface CommentsConfig {
    /**
     * Specifies whether comment markers should be preserved on copy-paste and cut-and-paste actions.
     *
     * The following values are available:
     *
     * * `'default'` - the comments will be preserved on cut-paste and drag and drop actions only.
     * * `'always'` - the markers will be preserved on all clipboard actions (cut, copy, drag and drop).
     * * `'never'` - the markers will be ignored by clipboard.
     *
     * Defaults to `'default'`.
     */
    copyMarkers?: CommentsClipboardCopyConfig;
    /**
     * The total number of comments shown when the thread view is collapsed.
     *
     * The comments are displayed in the following way:
     *
     * * The first comment is displayed.
     * * Some comments may be hidden (collapsed).
     * * An appropriate number of the most recent comments is displayed.
     *
     * For example, if this parameter is set to 3, when collapsed,
     * the thread view will display the first comment and two most recent comments.
     *
     * Defaults to `2`.
     */
    maxCommentsWhenCollapsed?: number;
    /**
     * The maximum total weight of a thread before the thread becomes collapsed when it is not active:
     *
     * * Thread weight is a sum of the weight of its comments.
     * * Comment weight is equal to the comment length.
     * * The minimal comment weight is 200.
     *
     * Defaults to `500`.
     */
    maxThreadTotalWeight?: number;
    /**
     * The maximum number of characters displayed in a comment when the thread view is collapsed.
     * Longer comments will be trimmed.
     *
     * Defaults to `140`.
     */
    maxCommentCharsWhenCollapsed?: number;
    /**
     * A view class to be used to create comment views.
     *
     * {@link module:comments/comments/ui/view/commentview~CommentView} is used by default when this property is not set.
     */
    CommentView?: typeof CommentView;
    /**
     * A view class to be used to create comment thread views
     * (used as annotations - in sidebar balloons or in inline annotations).
     *
     * {@link module:comments/comments/ui/view/commentthreadview~CommentThreadView} is used by default
     *  when this property is not set.
     */
    CommentThreadView?: typeof BaseCommentThreadView;
    /**
     * Configuration for the comments editor.
     *
     * By using this property, you can customize the editor instance used in the comments
     * reply field (e.g. by adding plugins or changing features configuration).
     *
     * To use the default configuration (allows only for text input, no formatting), you can pass `{}`
     * to the comments editor configuration.
     *
     * ```ts
     * ClassicEditor.create( element, {
     * 	comments: {
     * 		editorConfig: {}
     * 	}
     * } );
     * ```
     *
     * To provide a better experience, you may add more plugins, that will extend the default editor configuration.
     *
     * ```ts
     * import { Autoformat, List, Bold, Italic } from 'ckeditor5';
     *
     * ClassicEditor
     * 	.create( {
     * 		comments: {
     * 			editorConfig: {
     * 				extraPlugins: [ Autoformat, Bold, Italic, List ]
     * 			}
     * 		}
     * 	} )
     * ```
     *
     * Importing plugins may not be possible in some scenarios (e.g. when using a build created by the online builder tool).
     * In that case, it is possible to get the plugin constructors from the editor builtin plugins.
     *
     * ```ts
     * const extraCommentsPlugins = ClassicEditor.builtinPlugins.filter( plugin => {
     * 	return [ 'Bold', 'Italic', Autoformat, List ].includes( plugin.pluginName );
     * } );
     *
     *
     * ClassicEditor
     * 	.create( {
     * 		comments: {
     * 			editorConfig: {
     * 				extraPlugins: extraCommentsPlugins
     * 			}
     * 		}
     * 	} )
     * 	.then( ... )
     * 	.catch( ... );
     * ```
     */
    editorConfig?: EditorConfig;
    /**
     * A function that takes a `Date` object, formats it to a desired string and returns it.
     * It should be used when displaying the comment creation date.
     */
    formatDateTime?: (date: Date) => string;
}
/**
 * The configuration of the sidebar feature.
 *
 * ```ts
 * ClassicEditor
 * 	.create( {
 * 		sidebar: {
 * 			// Sidebar feature configuration.
 * 		}
 * 	} )
 * .then( ... )
 * .catch( ... );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor configuration options}.
 */
export interface SidebarConfig {
    /**
     * DOM element into which the sidebar will be inserted.
     */
    container?: HTMLElement;
    /**
     * Changes how the annotations are positioned inside the sidebar.
     *
     * If set to `true`, the top annotation in the sidebar will never be scrolled
     * above the top edge of the sidebar (which would make it hidden).
     *
     * On the other hand, with this setting enabled, if there is not enough space,
     * annotations will not be positioned exactly next to their linked elements
     * when selected.
     *
     * @default false
     */
    preventScrollOutOfView?: boolean;
}
export type CommentThreadConfig = PartialBy<Required<Omit<CommentsConfig, 'CommentThreadView'>>, 'copyMarkers'>;
export type CommentViewConfig = Required<Pick<CommentsConfig, 'maxCommentCharsWhenCollapsed' | 'formatDateTime' | 'editorConfig'>> & {
    /**
     * Defines whether the comment is created by the system.
     */
    isSystemComment?: boolean;
};
/**
 * Specifies whether comment markers should be preserved on copy-paste and cut-paste actions.
 *
 * Following values are available:
 *
 * * `'default'` - the comments will be preserved on cut-paste and drag and drop actions only.
 * * `'always'` - the markers will be preserved on all clipboard actions (cut, copy, drag and drop).
 * * `'never'` - the markers will be ignored by clipboard.
 */
export type CommentsClipboardCopyConfig = 'default' | 'always' | 'never';
