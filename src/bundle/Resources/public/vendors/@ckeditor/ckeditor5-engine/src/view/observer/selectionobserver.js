/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module engine/view/observer/selectionobserver
 */
/* global setInterval, clearInterval */
import Observer from './observer.js';
import MutationObserver from './mutationobserver.js';
import FocusObserver from './focusobserver.js';
import { env } from '@ckeditor/ckeditor5-utils';
import { debounce } from 'es-toolkit/compat';
/**
 * Selection observer class observes selection changes in the document. If a selection changes on the document this
 * observer checks if the DOM selection is different from the {@link module:engine/view/document~Document#selection view selection}.
 * The selection observer fires {@link module:engine/view/document~Document#event:selectionChange} event only if
 * a selection change was the only change in the document and the DOM selection is different from the view selection.
 *
 * This observer also manages the {@link module:engine/view/document~Document#isSelecting} property of the view document.
 *
 * Note that this observer is attached by the {@link module:engine/view/view~View} and is available by default.
 */
export default class SelectionObserver extends Observer {
    /**
     * Instance of the mutation observer. Selection observer calls
     * {@link module:engine/view/observer/mutationobserver~MutationObserver#flush} to ensure that the mutations will be handled
     * before the {@link module:engine/view/document~Document#event:selectionChange} event is fired.
     */
    mutationObserver;
    /**
     * Instance of the focus observer. Focus observer calls
     * {@link module:engine/view/observer/focusobserver~FocusObserver#flush} to mark the latest focus change as complete.
     */
    focusObserver;
    /**
     * Reference to the view {@link module:engine/view/documentselection~DocumentSelection} object used to compare
     * new selection with it.
     */
    selection;
    /**
     * Reference to the {@link module:engine/view/view~View#domConverter}.
     */
    domConverter;
    /**
     * A set of documents which have added `selectionchange` listener to avoid adding a listener twice to the same
     * document.
     */
    _documents = new WeakSet();
    /**
     * Fires debounced event `selectionChangeDone`. It uses `es-toolkit#debounce` method to delay function call.
     */
    _fireSelectionChangeDoneDebounced;
    /**
     * When called, starts clearing the {@link #_loopbackCounter} counter in time intervals. When the number of selection
     * changes exceeds a certain limit within the interval of time, the observer will not fire `selectionChange` but warn about
     * possible infinite selection loop.
     */
    _clearInfiniteLoopInterval;
    /**
     * Unlocks the `isSelecting` state of the view document in case the selection observer did not record this fact
     * correctly (for whatever reason). It is a safeguard (paranoid check), that returns document to the normal state
     * after a certain period of time (debounced, postponed by each selectionchange event).
     */
    _documentIsSelectingInactivityTimeoutDebounced;
    /**
     * Private property to check if the code does not enter infinite loop.
     */
    _loopbackCounter = 0;
    /**
     * A set of DOM documents that have a pending selection change.
     * Pending selection change is recorded while selection change event is detected on non focused editable.
     */
    _pendingSelectionChange = new Set();
    constructor(view) {
        super(view);
        this.mutationObserver = view.getObserver(MutationObserver);
        this.focusObserver = view.getObserver(FocusObserver);
        this.selection = this.document.selection;
        this.domConverter = view.domConverter;
        this._fireSelectionChangeDoneDebounced = debounce(data => {
            this.document.fire('selectionChangeDone', data);
        }, 200);
        this._clearInfiniteLoopInterval = setInterval(() => this._clearInfiniteLoop(), 1000);
        this._documentIsSelectingInactivityTimeoutDebounced = debounce(() => (this.document.isSelecting = false), 5000);
        this.view.document.on('change:isFocused', (evt, name, isFocused) => {
            if (isFocused && this._pendingSelectionChange.size) {
                // @if CK_DEBUG_TYPING // if ( ( window as any ).logCKETyping ) {
                // @if CK_DEBUG_TYPING // 	console.info( ..._buildLogMessage( this, 'SelectionObserver',
                // @if CK_DEBUG_TYPING // 		'Flush pending selection change'
                // @if CK_DEBUG_TYPING // 	) );
                // @if CK_DEBUG_TYPING // }
                // Iterate over a copy of set because it is modified in selection change handler.
                for (const domDocument of Array.from(this._pendingSelectionChange)) {
                    this._handleSelectionChange(domDocument);
                }
                this._pendingSelectionChange.clear();
            }
        });
    }
    /**
     * @inheritDoc
     */
    observe(domElement) {
        const domDocument = domElement.ownerDocument;
        const startDocumentIsSelecting = () => {
            this.document.isSelecting = true;
            // Let's activate the safety timeout each time the document enters the "is selecting" state.
            this._documentIsSelectingInactivityTimeoutDebounced();
        };
        const endDocumentIsSelecting = () => {
            if (!this.document.isSelecting) {
                return;
            }
            // Make sure that model selection is up-to-date at the end of selecting process.
            // Sometimes `selectionchange` events could arrive after the `mouseup` event and that selection could be already outdated.
            this._handleSelectionChange(domDocument);
            this.document.isSelecting = false;
            // The safety timeout can be canceled when the document leaves the "is selecting" state.
            this._documentIsSelectingInactivityTimeoutDebounced.cancel();
        };
        // The document has the "is selecting" state while the user keeps making (extending) the selection
        // (e.g. by holding the mouse button and moving the cursor). The state resets when they either released
        // the mouse button or interrupted the process by pressing or releasing any key.
        this.listenTo(domElement, 'selectstart', startDocumentIsSelecting, { priority: 'highest' });
        this.listenTo(domElement, 'keydown', endDocumentIsSelecting, { priority: 'highest', useCapture: true });
        this.listenTo(domElement, 'keyup', endDocumentIsSelecting, { priority: 'highest', useCapture: true });
        // Add document-wide listeners only once. This method could be called for multiple editing roots.
        if (this._documents.has(domDocument)) {
            return;
        }
        // This listener is using capture mode to make sure that selection is upcasted before any other
        // handler would like to check it and update (for example table multi cell selection).
        this.listenTo(domDocument, 'mouseup', endDocumentIsSelecting, { priority: 'highest', useCapture: true });
        this.listenTo(domDocument, 'selectionchange', () => {
            // @if CK_DEBUG_TYPING // if ( ( window as any ).logCKETyping ) {
            // @if CK_DEBUG_TYPING // 	_debouncedLine();
            // @if CK_DEBUG_TYPING // 	const domSelection = domDocument.defaultView!.getSelection();
            // @if CK_DEBUG_TYPING // 	console.group( ..._buildLogMessage( this, 'SelectionObserver',
            // @if CK_DEBUG_TYPING // 		'selectionchange'
            // @if CK_DEBUG_TYPING // 	) );
            // @if CK_DEBUG_TYPING // 	console.info( ..._buildLogMessage( this, 'SelectionObserver',
            // @if CK_DEBUG_TYPING // 		'DOM Selection:',
            // @if CK_DEBUG_TYPING // 		{ node: domSelection!.anchorNode, offset: domSelection!.anchorOffset },
            // @if CK_DEBUG_TYPING // 		{ node: domSelection!.focusNode, offset: domSelection!.focusOffset }
            // @if CK_DEBUG_TYPING // 	) );
            // @if CK_DEBUG_TYPING // }
            // The Renderer is disabled while composing on non-android browsers, so we can't update the view selection
            // because the DOM and view tree drifted apart. Position mapping could fail because of it.
            if (this.document.isComposing && !env.isAndroid) {
                // @if CK_DEBUG_TYPING // if ( ( window as any ).logCKETyping ) {
                // @if CK_DEBUG_TYPING // 	console.info( ..._buildLogMessage( this, 'SelectionObserver',
                // @if CK_DEBUG_TYPING //		'Selection change ignored (isComposing)'
                // @if CK_DEBUG_TYPING //	) );
                // @if CK_DEBUG_TYPING // 	console.groupEnd();
                // @if CK_DEBUG_TYPING // }
                return;
            }
            this._handleSelectionChange(domDocument);
            // @if CK_DEBUG_TYPING // if ( ( window as any ).logCKETyping ) {
            // @if CK_DEBUG_TYPING // 	console.groupEnd();
            // @if CK_DEBUG_TYPING // }
            // Defer the safety timeout when the selection changes (e.g. the user keeps extending the selection
            // using their mouse).
            this._documentIsSelectingInactivityTimeoutDebounced();
        });
        // Update the model DocumentSelection just after the Renderer and the SelectionObserver are locked.
        // We do this synchronously (without waiting for the `selectionchange` DOM event) as browser updates
        // the DOM selection (but not visually) to span the text that is under composition and could be replaced.
        this.listenTo(this.view.document, 'compositionstart', () => {
            // @if CK_DEBUG_TYPING // if ( ( window as any ).logCKETyping ) {
            // @if CK_DEBUG_TYPING // 	const domSelection = domDocument.defaultView!.getSelection();
            // @if CK_DEBUG_TYPING // 	console.group( ..._buildLogMessage( this, 'SelectionObserver',
            // @if CK_DEBUG_TYPING // 		'update selection on compositionstart'
            // @if CK_DEBUG_TYPING // 	) );
            // @if CK_DEBUG_TYPING // 	console.info( ..._buildLogMessage( this, 'SelectionObserver',
            // @if CK_DEBUG_TYPING // 		'DOM Selection:',
            // @if CK_DEBUG_TYPING // 		{ node: domSelection!.anchorNode, offset: domSelection!.anchorOffset },
            // @if CK_DEBUG_TYPING // 		{ node: domSelection!.focusNode, offset: domSelection!.focusOffset }
            // @if CK_DEBUG_TYPING // 	) );
            // @if CK_DEBUG_TYPING // }
            this._handleSelectionChange(domDocument);
            // @if CK_DEBUG_TYPING // if ( ( window as any ).logCKETyping ) {
            // @if CK_DEBUG_TYPING // 	console.groupEnd();
            // @if CK_DEBUG_TYPING // }
        }, { priority: 'lowest' });
        this._documents.add(domDocument);
    }
    /**
     * @inheritDoc
     */
    stopObserving(domElement) {
        this.stopListening(domElement);
    }
    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        clearInterval(this._clearInfiniteLoopInterval);
        this._fireSelectionChangeDoneDebounced.cancel();
        this._documentIsSelectingInactivityTimeoutDebounced.cancel();
    }
    /* istanbul ignore next -- @preserve */
    _reportInfiniteLoop() {
        // @if CK_DEBUG //		throw new Error(
        // @if CK_DEBUG //			'Selection change observer detected an infinite rendering loop.\n\n' +
        // @if CK_DEBUG //	 		'⚠️⚠️ Report this error on https://github.com/ckeditor/ckeditor5/issues/11658.'
        // @if CK_DEBUG //		);
    }
    /**
     * Selection change listener. {@link module:engine/view/observer/mutationobserver~MutationObserver#flush Flush} mutations, check if
     * a selection changes and fires {@link module:engine/view/document~Document#event:selectionChange} event on every change
     * and {@link module:engine/view/document~Document#event:selectionChangeDone} when a selection stop changing.
     *
     * @param domDocument DOM document.
     */
    _handleSelectionChange(domDocument) {
        if (!this.isEnabled) {
            return;
        }
        const domSelection = domDocument.defaultView.getSelection();
        if (this.checkShouldIgnoreEventFromTarget(domSelection.anchorNode)) {
            return;
        }
        // Ensure the mutation event will be before selection event on all browsers.
        this.mutationObserver.flush();
        const newViewSelection = this.domConverter.domSelectionToView(domSelection);
        // Do not convert selection change if the new view selection has no ranges in it.
        //
        // It means that the DOM selection is in some way incorrect. Ranges that were in the DOM selection could not be
        // converted to the view. This happens when the DOM selection was moved outside of the editable element.
        if (newViewSelection.rangeCount == 0) {
            this.view.hasDomSelection = false;
            return;
        }
        this.view.hasDomSelection = true;
        // Mark the latest focus change as complete (we got new selection after the focus so the selection is in the focused element).
        this.focusObserver.flush();
        // Ignore selection change as the editable is not focused.
        if (!this.view.document.isFocused) {
            // @if CK_DEBUG_TYPING // if ( ( window as any ).logCKETyping ) {
            // @if CK_DEBUG_TYPING // 	console.info( ..._buildLogMessage( this, 'SelectionObserver',
            // @if CK_DEBUG_TYPING // 		'Ignore selection change while editable is not focused'
            // @if CK_DEBUG_TYPING // 	) );
            // @if CK_DEBUG_TYPING // }
            this._pendingSelectionChange.add(domDocument);
            return;
        }
        this._pendingSelectionChange.delete(domDocument);
        if (this.selection.isEqual(newViewSelection) && this.domConverter.isDomSelectionCorrect(domSelection)) {
            return;
        }
        // Ensure we are not in the infinite loop (#400).
        // This counter is reset each second. 60 selection changes in 1 second is enough high number
        // to be very difficult (impossible) to achieve using just keyboard keys (during normal editor use).
        if (++this._loopbackCounter > 60) {
            // Selection change observer detected an infinite rendering loop.
            // Most probably you try to put the selection in the position which is not allowed
            // by the browser and browser fixes it automatically what causes `selectionchange` event on
            // which a loopback through a model tries to re-render the wrong selection and again.
            this._reportInfiniteLoop();
            return;
        }
        if (this.selection.isSimilar(newViewSelection)) {
            // If selection was equal and we are at this point of algorithm, it means that it was incorrect.
            // Just re-render it, no need to fire any events, etc.
            this.view.forceRender();
        }
        else {
            const data = {
                oldSelection: this.selection,
                newSelection: newViewSelection,
                domSelection
            };
            // @if CK_DEBUG_TYPING // if ( ( window as any ).logCKETyping ) {
            // @if CK_DEBUG_TYPING // 	console.info( ..._buildLogMessage( this, 'SelectionObserver',
            // @if CK_DEBUG_TYPING // 		'Fire selection change:',
            // @if CK_DEBUG_TYPING // 		newViewSelection.getFirstRange()
            // @if CK_DEBUG_TYPING // 	) );
            // @if CK_DEBUG_TYPING // }
            // Prepare data for new selection and fire appropriate events.
            this.document.fire('selectionChange', data);
            // Call `#_fireSelectionChangeDoneDebounced` every time when `selectionChange` event is fired.
            // This function is debounced what means that `selectionChangeDone` event will be fired only when
            // defined int the function time will elapse since the last time the function was called.
            // So `selectionChangeDone` will be fired when selection will stop changing.
            this._fireSelectionChangeDoneDebounced(data);
        }
    }
    /**
     * Clears `SelectionObserver` internal properties connected with preventing infinite loop.
     */
    _clearInfiniteLoop() {
        this._loopbackCounter = 0;
    }
}
