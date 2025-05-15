/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { type EventInfo } from 'ckeditor5/src/utils.js';
import type { ElementApi, Editor, EditorConfig } from 'ckeditor5/src/core.js';
import type { RevisionViewerEditor } from '@ckeditor/ckeditor5-revision-history';
/**
 * The abstract editor type handler. It should be extended by the particular editor type handler.
 */
export default class AbstractEditorHandler {
    /**
     * Maps placeholder names to placeholder elements and moved elements.
     */
    private _placeholderMap;
    /**
     * The wrapper element that holds the fullscreen mode layout.
     */
    private _wrapper;
    /**
     * The document object in which the editor is located.
     */
    private _document;
    /**
     * Data of the annotations UIs that were active before entering the fullscreen mode.
     */
    private _annotationsUIsData;
    /**
     * The pagination body collection that is used in the fullscreen mode.
     * If we don't move pagination lines to the fullscreen container, they won't be visible.
     */
    private _paginationBodyCollection;
    /**
     * A callback that hides the document outline header when the source editing mode is enabled.
     * Document outline element itself is hidden by source editing plugin.
     */
    private _sourceEditingCallback;
    /**
     * A map of elements that were hidden when entering the fullscreen mode.
     * It is used to restore their previous visibility when leaving the fullscreen mode and avoid showing elements
     * that were hidden before entering the fullscreen mode.
     */
    private _hiddenElements;
    /**
     * A map matching the ancestors of the editable element with their scroll positions before entering fullscreen mode.
     */
    private _savedAncestorsScrollPositions;
    /**
     * A callback that shows the revision viewer, stored to restore the original one after exiting the fullscreen mode.
     */
    protected _showRevisionViewerCallback: ((config?: EditorConfig) => Promise<RevisionViewerEditor | null>) | null;
    /**
     * A callback that closes the revision viewer, stored to restore the original one after exiting the fullscreen mode.
     */
    protected _closeRevisionViewerCallback: ((viewerEditor?: RevisionViewerEditor) => Promise<unknown>) | null;
    /**
     * An editor instance. It should be set by the particular editor type handler.
     */
    protected _editor: Editor & Partial<ElementApi>;
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * Moves the given element to the fullscreen mode container, leaving a placeholder in its place.
     */
    moveToFullscreen(elementToMove: HTMLElement, placeholderName: string): void;
    /**
     * Returns a single moved element to its original place.
     */
    restoreMovedElementLocation(placeholderName: string): void;
    /**
     * Returns the fullscreen mode container element.
     */
    getWrapper(): HTMLElement;
    /**
     * Enables the fullscreen mode. It executes the editor-specific enable handler and then the configured callback.
     */
    enable(): void;
    /**
     * Disables the fullscreen mode by restoring all moved elements and destroying the fullscreen container.
     */
    disable(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * A function that moves the editor UI elements to the fullscreen mode. It should be set by the particular editor type handler.
     *
     * Returns the fullscreen mode container element so it can be further customized via
     * `fullscreen.onEnterCallback` configuration property.
     */
    protected _defaultOnEnter(): HTMLElement;
    /**
     * Destroys the fullscreen mode container.
     */
    private _destroyContainer;
    /**
     * Checks if the PresenceListUI plugin is available and moves its elements to fullscreen mode.
     */
    private _generatePresenceListContainer;
    /**
     * Checks if the DocumentOutlineUI plugin is available and moves its elements to fullscreen mode.
     */
    private _generateDocumentOutlineContainer;
    /**
     * Restores the default value of documentOutlineContainer, which is modified in fullscreen mode.
     */
    private _restoreDocumentOutlineDefaultContainer;
    /**
     * Stores the current state of the annotations UIs to restore it when leaving fullscreen mode.
     */
    private _overrideAnnotationsUIs;
    /**
     * Restores the saved state of the annotations UIs.
     */
    private _restoreAnnotationsUIs;
    /**
     * Modifies the revision history viewer callbacks to display the viewer in the fullscreen mode.
     */
    private _overrideRevisionHistoryCallbacks;
    /**
     * Resets the revision history viewer callbacks to their original values.
     */
    private _restoreRevisionHistoryCallbacks;
    /**
     * Adds an event listener when the dialog opens to adjust its position in fullscreen mode,
     * utilizing the empty space on the right side of the editable element.
     */
    private _registerFullscreenDialogPositionAdjustments;
    /**
     * Removes an event listener that adjusts the dialog's position in fullscreen mode.
     */
    private _unregisterFullscreenDialogPositionAdjustments;
    /**
     * Stores a bound reference to the _updateDialogPosition method, allowing it to be attached and detached from change event.
     */
    updateDialogPositionCallback: (_evt: EventInfo, _name: string, isOpen: boolean) => void;
    /**
     * If dialog is open, adjust its positioning.
     */
    private _updateDialogPosition;
    /**
     * Adjusts the dialog position to utilize the empty space on the right side of the editable.
     * The new dialog position should be on the right side of the fullscreen view with a 30px margin.
     * Only dialogs with the position set to "editor-top-side" should have their position changed.
     */
    private _setNewDialogPosition;
    /**
     * Saves the scroll positions of all ancestors of the given element.
     */
    private _saveAncestorsScrollPositions;
}
