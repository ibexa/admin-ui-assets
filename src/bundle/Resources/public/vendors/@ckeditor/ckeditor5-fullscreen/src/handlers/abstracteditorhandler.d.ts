/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { type EventInfo } from 'ckeditor5/src/utils.js';
import type { ElementApi, Editor, EditorConfig } from 'ckeditor5/src/core.js';
/**
 * The abstract editor type handler.
 *
 * This class defines some actions and behaviors that are applied when fullscreen mode is toggled, and which are common
 * regardless of the editor type. Then, specific classes like `ClassicEditorHandler` or `DecoupledEditorHandler`
 * extend this class with actions specific for these editor types.
 *
 * Extend this class to provide fullscreen mode handling for unsupported editor types,
 * or if you wish to heavily customize the default behavior.
 *
 * The only method that is necessary to provide when extending this class is {@link #defaultOnEnter}. However, make sure to
 * familiarize yourself with the below full list of actions taken by `AbstractEditorHandler` to understand what is covered by default,
 * and what should be provided by you.
 *
 * When entering the fullscreen mode, the {@link #enable} method is called. It creates the properly styled container
 * and handles the editor features that need it, in the following order:
 *
 * 1. Saves the scroll positions of all ancestors of the editable element to restore them after leaving the fullscreen mode.
 * 2. Executes the {@link #defaultOnEnter} method to move the proper editor UI elements to the fullscreen mode.
 * **If you extend the abstract handler, you should override this method** to move the elements that are specific to your editor type, like:
 * 	editable, toolbar, menu bar.
 * 	Use {@link #moveToFullscreen} method for this purpose to ensure they are automatically cleaned up after leaving the fullscreen mode.
 * 3. Adds proper classes to the `<body>` and `<html>` elements to block page scrolling, adjust `z-index` etc.
 * 4. Changes the position of some dialogs to utilize the empty space on the right side of the editable element.
 *
 * Steps 5-11 are only executed if the corresponding features are used.
 *
 * 5. If presence list is used, moves it to the fullscreen mode container.
 * 6. If document outline is used, moves it to the fullscreen mode.
 * 7. If pagination is used, adjusts it's configuration for the changed view.
 * 8. If annotations are used, moves them to the fullscreen mode.
 * 9. If revision history is used, overrides the callbacks to show the revision viewer in the fullscreen mode.
 * 10. If source editing and document outline are both used, hides the document outline header.
 * 11. If custom container is used, hides all other elements in it to ensure they don't create an empty unscrollable space.
 *
 * Then finally:
 *
 * 12. Executes the configured {@link module:fullscreen/fullscreenconfig~FullscreenConfig#onEnterCallback
 * 	`config.fullscreen.onEnterCallback`} function.
 * 	By default, it returns the fullscreen mode container element so it can be further customized.
 *
 * When leaving the fullscreen mode, the {@link #disable} method is called. It does the following:
 *
 * 1. Execute the configured {@link module:fullscreen/fullscreenconfig~FullscreenConfig#onLeaveCallback
 * 	`config.fullscreen.onLeaveCallback`} function.
 * 2. Remove the classes added to the `<body>` and `<html>` elements.
 * 3. If document outline is used, restore its default container.
 * 4. If annotations are used, restore their original state (UI, filters etc).
 * 5. If revision history is used, restore the original callbacks.
 * 6. If source editing and document outline are both used, restore the document outline header.
 * 7. Restore all moved elements to their original place.
 * 8. Destroy the fullscreen mode container.
 * 9. If the editor has a toolbar, switch its behavior to the one configured in the
 * 	{@link module:ui/toolbar/toolbarview~ToolbarOptions#shouldGroupWhenFull} property.
 * 10. Restore the scroll positions of all ancestors of the editable element.
 * 11. If pagination is used, restore its default configuration.
 * 12. Restore default dialogs positions.
 *
 * This class is exported to allow for custom extensions.
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
    protected _showRevisionViewerCallback: ((config?: EditorConfig) => Promise<any>) | null;
    /**
     * A callback that closes the revision viewer, stored to restore the original one after exiting the fullscreen mode.
     */
    protected _closeRevisionViewerCallback: ((viewerEditor?: any) => Promise<unknown>) | null;
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
    defaultOnEnter(): HTMLElement;
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
     * Stores the current state of the annotations UIs to restore it when leaving fullscreen mode and switches the UI to the wide sidebar.
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
