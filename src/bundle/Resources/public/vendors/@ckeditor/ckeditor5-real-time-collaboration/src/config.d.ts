/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { User } from 'ckeditor5-collaboration/src/collaboration-core.js';
/**
 * @module real-time-collaboration/config
 * @publicApi
 */
/**
 * The configuration of the real-time collaboration features.
 *
 * ```ts
 * ClassicEditor
 * 	.create( {
 * 		presenceList: ... // Collaboration presence list configuration.
 * 	} )
 * 	.then( ... )
 * 	.catch( ... );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 */
export interface PresenceListConfig {
    /**
     * Indicates a number of displayed users at which the presence list will switch to a dropdown view.
     * If the number is 8, then 7 users will still be displayed inline, while 8+ users will be displayed in the dropdown.
     *
     * The number must be greater than `0`.
     *
     * @default 6
     */
    collapseAt?: number;
    /**
     * DOM element that will hold the feature’s UI.
     */
    container?: HTMLElement;
    /**
     * Determines if the local user avatar should be displayed in the presence list (`true`) or not (`false`).
     *
     * @default true
     */
    displayMe?: boolean;
    /**
     * Callback function that will be invoked after a click on a presence list member.
     */
    onClick?: (user: User, element: HTMLElement) => void;
}
