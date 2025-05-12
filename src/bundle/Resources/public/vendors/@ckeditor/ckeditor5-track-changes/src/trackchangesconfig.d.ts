/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/trackchangesconfig
 * @publicApi
 */
import type SuggestionThreadView from './ui/view/suggestionthreadview.js';
import type SuggestionView from './ui/view/suggestionview.js';
/**
 * The configuration of the track changes feature.
 *
 * Example:
 *
 * ```ts
 * ClassicEditor
 * 	.create( {
 * 		// Track changes feature configuration.
 * 		trackChanges: {
 * 		// Do not allow users to comment suggestions (default is `false`).
 * 		disableComments: true,
 * 		// Do not track styling and formatting changes (default is `default`).
 * 		trackFormatChanges: 'never',
 * 		// Merges suggestion changes inside a block. (default is `true`).
 * 		mergeNestedSuggestions: true
 * 		}
 * 	} )
 * 	.then( ... )
 * 	.catch( ... );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 */
export interface TrackChangesConfig {
    /**
     * A property that specifies if the comments for suggestions are enabled or disabled.
     * When the option is set to `true`, the comment thread UI for suggestions will be hidden
     * and commenting suggestions will be disabled.
     *
     * Suggestion thread views will be marked with the additional `ck-suggestion--disabled-comments` class when the suggestion comments
     * are disabled.
     *
     * @default false
     */
    disableComments?: boolean;
    /**
     * A property that specifies whether formatting changes should be tracked.
     *
     * Formatting changes are all changes other than insertions and deletions, including: styling, structure, widgets properties, etc.
     *
     * By default, formatting changes are tracked. However, if you make a formatting change inside your own insertion suggestion, it
     * is immediately applied, without creating a suggestion.
     *
     * Possible values are:
     *
     * * `'default'` - format changes are tracked, but when made inside your own insertion suggestion, they will be immediately applied.
     * * `'always'` - format changes will always be tracked, even inside your own insertion suggestion.
     * * `'never'` - format changes will never be tracked (suggestions for such changes will not be created).
     *
     * @default 'default'
     */
    trackFormatChanges?: 'never' | 'default' | 'always';
    /**
     * Specifies whether suggestions on an object (e.g. image, table) should be automatically merged
     * with suggestions inside the object (e.g. image caption, table cell).
     *
     * For example, when set to `true`, creating a table and writing some text inside the table will result in one suggestion.
     * When set to `false`, it will be two separate suggestions, one for the inserted table and one for the inserted text.
     *
     * Keep in mind that only suggestions from the same author and of the same type are merged this way.
     *
     * @default true
     */
    mergeNestedSuggestions?: boolean;
    /**
     * A view class to be used to create suggestion thread views.
     *
     * {@link module:track-changes/ui/view/suggestionthreadview~SuggestionThreadView} is used by default
     *  when this property is not set.
     */
    SuggestionThreadView?: typeof SuggestionThreadView;
    /**
     * A view class to be used to create the suggestion view.
     *
     * {@link module:track-changes/ui/view/suggestionview~SuggestionView} is used by default when this property is not set.
     */
    SuggestionView?: typeof SuggestionView;
    /**
     * Configuration of the track changes preview feature.
     */
    preview?: TrackChangesPreviewConfig;
}
interface TrackChangesPreviewConfig {
    /**
     * A callback function that allows for modifying the structure of the
     * {@link modle:track-changes/trackchangespreview~TrackChangesPreview track changes preview} container.
     *
     * The callback receives the container element (`.ck-track-changes-preview`) and an array of root elements.
     *
     * * If the editor only has one root, there's only one element in the array.
     * * If the editor has multiple roots, the there's one element per root. They are ordered either by `order`
     * root attribute or, if it's not present, by DOM order.
     *
     * The callback should append all array elements to the container, but can also add custom classes, elements in between etc.
     *
     * The default callback simply appends all elements to the container in the order they are provided.
     */
    renderFunction?: (container: HTMLElement, elements: Array<HTMLElement>) => void;
}
export {};
