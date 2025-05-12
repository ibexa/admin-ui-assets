/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * The configuration of the revision history feature.
 *
 * ```ts
 * ClassicEditor
 *  	.create( {
 *			revisionHistory: ... // Revision history feature configuration.
 *		} )
 *		.then( ... )
 *		.catch( ... );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 */
export interface RevisionHistoryConfig {
    /**
     * The DOM element that contains the DOM structure for the editor.
     *
     * This element will be hidden when the user opens the revision history.
     */
    editorContainer: HTMLElement;
    /**
     * DOM element which contains the DOM structure for revision history viewer.
     *
     * This element should be hidden (using CSS) when the editor is initialized.
     * This element will be shown when the user opens the revision history viewer.
     */
    viewerContainer: HTMLElement;
    /**
     * The DOM element for the revision history viewer editor instance.
     *
     * This element will be used to initialize the revision history viewer editor instance and will be replaced by it. It should be empty.
     */
    viewerEditorElement: HTMLElement;
    /**
     * The DOM element for the revision history viewer sidebar container.
     *
     * This element will be used as a container for the revision history viewer. The sidebar content will be inserted into it.
     */
    viewerSidebarContainer: HTMLElement;
    /**
     * Tells the feature whether it should resume updating previously unsaved revision or should save the previously unsaved revision
     * and create a new revision for the changes that will be introduced after the editor is initialized.
     *
     * By default, the previously unsaved revision is resumed after the editor is initialized.
     *
     * Note that only unsaved revision can be resumed.
     *
     * Note that for real-time collaboration, the unsaved revision will be always resumed if the real-time editing session is still active.
     * In other words, even if this is set to `false`, the unsaved revision will be resumed, if the editing session did not end since the
     * editor was re-initialized. Keep in mind that [the editing session is active a long time]
     * (https://ckeditor.com/docs/cs/latest/guides/collaboration/data.html#temporary-and-permanent-data) after the last user
     * leaves the document.
     */
    resumeUnsavedRevision: boolean;
    /**
     * Indicates if the names for revisions should be required. Defaults to `false`.
     *
     * If set to `true`, the user will have to provide a name when saving a new revision.
     * If they try to change the existing revision name to an empty string,
     * the revision name will be reverted to the previous value.
     *
     * It will still be possible to save a revision without a name using the feature API
     * and to load the existing nameless revisions.
     */
    requireRevisionName?: boolean;
}
