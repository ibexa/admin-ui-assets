/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Plugin } from "@ckeditor/ckeditor5-core";
import { DomEmitterMixin, EventInfo, Rect, ResizeObserver, createElement, delay, env, getRangeFromMouseEvent, global, toUnit, uid } from "@ckeditor/ckeditor5-utils";
import { DomEventObserver, ModelLiveRange, ModelRange, PointerObserver, ViewDataTransfer } from "@ckeditor/ckeditor5-engine";
import { mapValues, throttle } from "es-toolkit/compat";
import { Widget, isWidget } from "@ckeditor/ckeditor5-widget";
import { View } from "@ckeditor/ckeditor5-ui";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/utils/plaintexttohtml
*/
/**
* Converts plain text to its HTML-ized version.
*
* @param text The plain text to convert.
* @returns HTML generated from the plain text.
*/
function plainTextToHtml(text) {
	text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r?\n\r?\n/g, "</p><p>").replace(/\r?\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/^\s/, "&nbsp;").replace(/\s$/, "&nbsp;").replace(/\s\s/g, " &nbsp;");
	if (text.includes("</p><p>") || text.includes("<br>")) text = `<p>${text}</p>`;
	return text;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/clipboardobserver
*/
/**
* Clipboard events observer.
*
* Fires the following events:
*
* * {@link module:engine/view/document~ViewDocument#event:clipboardInput},
* * {@link module:engine/view/document~ViewDocument#event:paste},
* * {@link module:engine/view/document~ViewDocument#event:copy},
* * {@link module:engine/view/document~ViewDocument#event:cut},
* * {@link module:engine/view/document~ViewDocument#event:drop},
* * {@link module:engine/view/document~ViewDocument#event:dragover},
* * {@link module:engine/view/document~ViewDocument#event:dragging},
* * {@link module:engine/view/document~ViewDocument#event:dragstart},
* * {@link module:engine/view/document~ViewDocument#event:dragend},
* * {@link module:engine/view/document~ViewDocument#event:dragenter},
* * {@link module:engine/view/document~ViewDocument#event:dragleave}.
*
* **Note**: This observer is not available by default (ckeditor5-engine does not add it on its own).
* To make it available, it needs to be added to {@link module:engine/view/document~ViewDocument} by using
* the {@link module:engine/view/view~EditingView#addObserver `View#addObserver()`} method. Alternatively, you can load the
* {@link module:clipboard/clipboard~Clipboard} plugin which adds this observer automatically (because it uses it).
*/
var ClipboardObserver = class extends DomEventObserver {
	domEventType = [
		"paste",
		"copy",
		"cut",
		"drop",
		"dragover",
		"dragstart",
		"dragend",
		"dragenter",
		"dragleave"
	];
	constructor(view) {
		super(view);
		const viewDocument = this.document;
		this.listenTo(viewDocument, "paste", handleInput("clipboardInput"), { priority: "low" });
		this.listenTo(viewDocument, "drop", handleInput("clipboardInput"), { priority: "low" });
		this.listenTo(viewDocument, "dragover", handleInput("dragging"), { priority: "low" });
		function handleInput(type) {
			return (evt, data) => {
				data.preventDefault();
				const targetRanges = data.dropRange ? [data.dropRange] : null;
				const dataTransfer = data.dataTransfer;
				const eventInfo = new EventInfo(viewDocument, type);
				let content = "";
				if (dataTransfer.getData("text/html")) content = dataTransfer.getData("text/html");
				else if (dataTransfer.getData("text/plain")) content = plainTextToHtml(dataTransfer.getData("text/plain"));
				viewDocument.fire(eventInfo, {
					dataTransfer,
					content,
					method: evt.name,
					targetRanges,
					target: data.target,
					domEvent: data.domEvent
				});
				if (eventInfo.stop.called) data.stopPropagation();
			};
		}
	}
	onDomEvent(domEvent) {
		const nativeDataTransfer = "clipboardData" in domEvent ? domEvent.clipboardData : domEvent.dataTransfer;
		const cacheFiles = domEvent.type == "drop" || domEvent.type == "paste";
		const evtData = { dataTransfer: new ViewDataTransfer(nativeDataTransfer, { cacheFiles }) };
		if (domEvent.type == "drop" || domEvent.type == "dragover") {
			const domRange = getRangeFromMouseEvent(domEvent);
			evtData.dropRange = domRange && this.view.domConverter.domRangeToView(domRange);
		}
		this.fire(domEvent.type, domEvent, evtData);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/utils/normalizeclipboarddata
*/
/**
* Removes some popular browser quirks out of the clipboard data (HTML).
* Removes all HTML comments. These are considered an internal thing and it makes little sense if they leak into the editor data.
*
* @param data The HTML data to normalize.
* @returns Normalized HTML.
* @internal
*/
function normalizeClipboardData(data) {
	return data.replace(/<span(?: class="Apple-converted-space"|)>(\s+)<\/span>/g, (fullMatch, spaces) => {
		if (spaces.length == 1) return " ";
		return spaces;
	}).replace(/<!--[\s\S]*?-->/g, "");
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
const smallPaddingElements = ["figcaption", "li"];
const listElements = ["ol", "ul"];
/**
* Converts {@link module:engine/view/item~ViewItem view item} and all of its children to plain text.
*
* @param converter The converter instance.
* @param viewItem View item to convert.
* @returns Plain text representation of `viewItem`.
*/
function viewToPlainText(converter, viewItem) {
	if (viewItem.is("$text") || viewItem.is("$textProxy")) return viewItem.data;
	if (viewItem.is("element", "img") && viewItem.hasAttribute("alt")) return viewItem.getAttribute("alt");
	if (viewItem.is("element", "br")) return "\n";
	/**
	* Item is a document fragment, attribute element or container element. It doesn't
	* have it's own text value, so we need to convert its children elements.
	*/
	let text = "";
	let prev = null;
	for (const child of viewItem.getChildren()) {
		text += newLinePadding(child, prev) + viewToPlainText(converter, child);
		prev = child;
	}
	if (viewItem.is("rawElement")) {
		const tempElement = document.implementation.createHTMLDocument("").createElement("div");
		viewItem.render(tempElement, converter);
		text += domElementToPlainText(tempElement);
	}
	return text;
}
/**
* Recursively converts DOM element and all of its children to plain text.
*/
function domElementToPlainText(element) {
	let text = "";
	if (element.nodeType === Node.TEXT_NODE) return element.textContent;
	else if (element.tagName === "BR") return "\n";
	for (const child of element.childNodes) text += domElementToPlainText(child);
	return text;
}
/**
* Returns new line padding to prefix the given elements with.
*/
function newLinePadding(element, previous) {
	if (!previous) return "";
	if (element.is("element", "li") && !element.isEmpty && element.getChild(0).is("containerElement")) return "\n\n";
	if (listElements.includes(element.name) && listElements.includes(previous.name))
 /**
	* Because `<ul>` and `<ol>` are ViewAttributeElements, two consecutive lists will not have any padding between
	* them (see the `if` statement below). To fix this, we need to make an exception for this case.
	*/
	return "\n\n";
	if (!element.is("containerElement") && !previous.is("containerElement")) return "";
	if (smallPaddingElements.includes(element.name) || smallPaddingElements.includes(previous.name)) return "\n";
	if (element.is("element") && element.getCustomProperty("dataPipeline:transparentRendering") || previous.is("element") && previous.getCustomProperty("dataPipeline:transparentRendering")) return "";
	return "\n\n";
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/clipboardmarkersutils
*/
/**
* Part of the clipboard logic. Responsible for collecting markers from selected fragments
* and restoring them with proper positions in pasted elements.
*
* @internal
*/
var ClipboardMarkersUtils = class extends Plugin {
	/**
	* Map of marker names that can be copied.
	*
	* @internal
	*/
	_markersToCopy = /* @__PURE__ */ new Map();
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ClipboardMarkersUtils";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* Registers marker name as copyable in clipboard pipeline.
	*
	* @param markerName Name of marker that can be copied.
	* @param config Configuration that describes what can be performed on specified marker.
	* @internal
	*/
	_registerMarkerToCopy(markerName, config) {
		this._markersToCopy.set(markerName, config);
	}
	/**
	* Performs copy markers on provided selection and paste it to fragment returned from `getCopiedFragment`.
	*
	* 	1. Picks all markers in provided selection.
	* 	2. Inserts fake markers to document.
	* 	3. Gets copied selection fragment from document.
	* 	4. Removes fake elements from fragment and document.
	* 	5. Inserts markers in the place of removed fake markers.
	*
	* Due to selection modification, when inserting items, `getCopiedFragment` must *always* operate on `writer.model.document.selection'.
	* Do not use any other custom selection object within callback, as this will lead to out-of-bounds exceptions in rare scenarios.
	*
	* @param action Type of clipboard action.
	* @param selection Selection to be checked.
	* @param getCopiedFragment	Callback that performs copy of selection and returns it as fragment.
	* @internal
	*/
	_copySelectedFragmentWithMarkers(action, selection, getCopiedFragment = (writer) => writer.model.getSelectedContent(writer.model.document.selection)) {
		return this.editor.model.change((writer) => {
			const oldSelection = writer.model.document.selection;
			writer.setSelection(selection);
			const sourceSelectionInsertedMarkers = this._insertFakeMarkersIntoSelection(writer, writer.model.document.selection, action);
			const fragment = getCopiedFragment(writer);
			const fakeMarkersRangesInsideRange = this._removeFakeMarkersInsideElement(writer, fragment);
			for (const [markerName, elements] of Object.entries(sourceSelectionInsertedMarkers)) {
				fakeMarkersRangesInsideRange[markerName] ||= writer.createRangeIn(fragment);
				for (const element of elements) writer.remove(element);
			}
			fragment.markers.clear();
			for (const [markerName, range] of Object.entries(fakeMarkersRangesInsideRange)) fragment.markers.set(markerName, range);
			writer.setSelection(oldSelection);
			return fragment;
		});
	}
	/**
	* Performs paste of markers on already pasted element.
	*
	* 	1. Inserts fake markers that are present in fragment element (such fragment will be processed in `getPastedDocumentElement`).
	* 	2. Calls `getPastedDocumentElement` and gets element that is inserted into root model.
	* 	3. Removes all fake markers present in transformed element.
	* 	4. Inserts new markers with removed fake markers ranges into pasted fragment.
	*
	* There are multiple edge cases that have to be considered before calling this function:
	*
	* 	* `markers` are inserted into the same element that must be later transformed inside `getPastedDocumentElement`.
	* 	* Fake marker elements inside `getPastedDocumentElement` can be cloned, but their ranges cannot overlap.
	* 	* If `duplicateOnPaste` is `true` in marker config then associated marker ID is regenerated before pasting.
	*
	* @param markers Object that maps marker name to corresponding range.
	* @param getPastedDocumentElement Getter used to get target markers element.
	* @internal
	*/
	_pasteMarkersIntoTransformedElement(markers, getPastedDocumentElement) {
		const pasteMarkers = this._getPasteMarkersFromRangeMap(markers);
		return this.editor.model.change((writer) => {
			const sourceFragmentFakeMarkers = this._insertFakeMarkersElements(writer, pasteMarkers);
			const transformedElement = getPastedDocumentElement(writer);
			const removedFakeMarkers = this._removeFakeMarkersInsideElement(writer, transformedElement);
			for (const element of Object.values(sourceFragmentFakeMarkers).flat()) writer.remove(element);
			for (const [markerName, range] of Object.entries(removedFakeMarkers)) if (!writer.model.markers.has(markerName)) writer.addMarker(markerName, {
				usingOperation: true,
				affectsData: true,
				range
			});
			return transformedElement;
		});
	}
	/**
	* Pastes document fragment with markers to document.
	* If `duplicateOnPaste` is `true` in marker config then associated markers IDs
	* are regenerated before pasting to avoid markers duplications in content.
	*
	* @param fragment Document fragment that should contain already processed by pipeline markers.
	* @internal
	*/
	_pasteFragmentWithMarkers(fragment) {
		const pasteMarkers = this._getPasteMarkersFromRangeMap(fragment.markers);
		fragment.markers.clear();
		for (const copyableMarker of pasteMarkers) fragment.markers.set(copyableMarker.name, copyableMarker.range);
		return this.editor.model.insertContent(fragment);
	}
	/**
	* In some situations we have to perform copy on selected fragment with certain markers. This function allows to temporarily bypass
	* restrictions on markers that we want to copy.
	*
	* This function executes `executor()` callback. For the duration of the callback, if the clipboard pipeline is used to copy
	* content, markers with the specified name will be copied to the clipboard as well.
	*
	* @param markerName Which markers should be copied.
	* @param executor Callback executed.
	* @param config Optional configuration flags used to copy (such like partial copy flag).
	* @internal
	*/
	_forceMarkersCopy(markerName, executor, config = {
		allowedActions: "all",
		copyPartiallySelected: true,
		duplicateOnPaste: true
	}) {
		const before = this._markersToCopy.get(markerName);
		this._markersToCopy.set(markerName, config);
		executor();
		if (before) this._markersToCopy.set(markerName, before);
		else this._markersToCopy.delete(markerName);
	}
	/**
	* Checks if marker can be copied.
	*
	* @param markerName Name of checked marker.
	* @param action Type of clipboard action. If null then checks only if marker is registered as copyable.
	* @internal
	*/
	_isMarkerCopyable(markerName, action) {
		const config = this._getMarkerClipboardConfig(markerName);
		if (!config) return false;
		if (!action) return true;
		const { allowedActions } = config;
		return allowedActions === "all" || allowedActions.includes(action);
	}
	/**
	* Checks if marker has any clipboard copy behavior configuration.
	*
	* @param markerName Name of checked marker.
	*/
	_hasMarkerConfiguration(markerName) {
		return !!this._getMarkerClipboardConfig(markerName);
	}
	/**
	* Returns marker's configuration flags passed during registration.
	*
	* @param markerName Name of marker that should be returned.
	* @internal
	*/
	_getMarkerClipboardConfig(markerName) {
		const [markerNamePrefix] = markerName.split(":");
		return this._markersToCopy.get(markerNamePrefix) || null;
	}
	/**
	* First step of copying markers. It looks for markers intersecting with given selection and inserts `$marker` elements
	* at positions where document markers start or end. This way `$marker` elements can be easily copied together with
	* the rest of the content of the selection.
	*
	* @param writer An instance of the model writer.
	* @param selection Selection to be checked.
	* @param action Type of clipboard action.
	*/
	_insertFakeMarkersIntoSelection(writer, selection, action) {
		const copyableMarkers = this._getCopyableMarkersFromSelection(writer, selection, action);
		return this._insertFakeMarkersElements(writer, copyableMarkers);
	}
	/**
	* Returns array of markers that can be copied in specified selection.
	*
	* If marker cannot be copied partially (according to `copyPartiallySelected` configuration flag) and
	* is not present entirely in any selection range then it will be skipped.
	*
	* @param writer An instance of the model writer.
	* @param selection  Selection which will be checked.
	* @param action Type of clipboard action. If null then checks only if marker is registered as copyable.
	*/
	_getCopyableMarkersFromSelection(writer, selection, action) {
		const selectionRanges = Array.from(selection.getRanges());
		const markersInRanges = new Set(selectionRanges.flatMap((selectionRange) => Array.from(writer.model.markers.getMarkersIntersectingRange(selectionRange))));
		const isSelectionMarkerCopyable = (marker) => {
			if (!this._isMarkerCopyable(marker.name, action)) return false;
			const { copyPartiallySelected } = this._getMarkerClipboardConfig(marker.name);
			if (!copyPartiallySelected) {
				const markerRange = marker.getRange();
				return selectionRanges.some((selectionRange) => selectionRange.containsRange(markerRange, true));
			}
			return true;
		};
		return Array.from(markersInRanges).filter(isSelectionMarkerCopyable).map((copyableMarker) => {
			return {
				name: action === "dragstart" ? this._getUniqueMarkerName(copyableMarker.name) : copyableMarker.name,
				range: copyableMarker.getRange()
			};
		});
	}
	/**
	* Picks all markers from markers map that can be pasted.
	* If `duplicateOnPaste` is `true`, it regenerates their IDs to ensure uniqueness.
	* If marker is not registered, it will be kept in the array anyway.
	*
	* @param markers Object that maps marker name to corresponding range.
	* @param action Type of clipboard action. If null then checks only if marker is registered as copyable.
	*/
	_getPasteMarkersFromRangeMap(markers, action = null) {
		const { model } = this.editor;
		return (markers instanceof Map ? Array.from(markers.entries()) : Object.entries(markers)).flatMap(([markerName, range]) => {
			if (!this._hasMarkerConfiguration(markerName)) return [{
				name: markerName,
				range
			}];
			if (this._isMarkerCopyable(markerName, action)) {
				const copyMarkerConfig = this._getMarkerClipboardConfig(markerName);
				const isInGraveyard = model.markers.has(markerName) && model.markers.get(markerName).getRange().root.rootName === "$graveyard";
				if (copyMarkerConfig.duplicateOnPaste || isInGraveyard) markerName = this._getUniqueMarkerName(markerName);
				return [{
					name: markerName,
					range
				}];
			}
			return [];
		});
	}
	/**
	* Inserts specified array of fake markers elements to document and assigns them `type` and `name` attributes.
	* Fake markers elements are used to calculate position of markers on pasted fragment that were transformed during
	* steps between copy and paste.
	*
	* @param writer An instance of the model writer.
	* @param markers Array of markers that will be inserted.
	*/
	_insertFakeMarkersElements(writer, markers) {
		const mappedMarkers = {};
		const sortedMarkers = markers.flatMap((marker) => {
			const { start, end } = marker.range;
			return [{
				position: start,
				marker,
				type: "start"
			}, {
				position: end,
				marker,
				type: "end"
			}];
		}).sort(({ position: posA }, { position: posB }) => posA.isBefore(posB) ? 1 : -1);
		for (const { position, marker, type } of sortedMarkers) {
			const fakeMarker = writer.createElement("$marker", {
				"data-name": marker.name,
				"data-type": type
			});
			if (!mappedMarkers[marker.name]) mappedMarkers[marker.name] = [];
			mappedMarkers[marker.name].push(fakeMarker);
			writer.insert(fakeMarker, position);
		}
		return mappedMarkers;
	}
	/**
	* Removes all `$marker` elements from the given document fragment.
	*
	* Returns an object where keys are marker names, and values are ranges corresponding to positions
	* where `$marker` elements were inserted.
	*
	* If the document fragment had only one `$marker` element for given marker (start or end) the other boundary is set automatically
	* (to the end or start of the document fragment, respectively).
	*
	* @param writer An instance of the model writer.
	* @param rootElement The element to be checked.
	*/
	_removeFakeMarkersInsideElement(writer, rootElement) {
		const fakeMarkersRanges = this._getAllFakeMarkersFromElement(writer, rootElement).reduce((acc, fakeMarker) => {
			const position = fakeMarker.markerElement && writer.createPositionBefore(fakeMarker.markerElement);
			let prevFakeMarker = acc[fakeMarker.name];
			let skipAssign = false;
			if (prevFakeMarker?.start && prevFakeMarker?.end) {
				if (this._getMarkerClipboardConfig(fakeMarker.name).duplicateOnPaste) acc[this._getUniqueMarkerName(fakeMarker.name)] = acc[fakeMarker.name];
				else skipAssign = true;
				prevFakeMarker = null;
			}
			if (!skipAssign) acc[fakeMarker.name] = {
				...prevFakeMarker,
				[fakeMarker.type]: position
			};
			if (fakeMarker.markerElement) writer.remove(fakeMarker.markerElement);
			return acc;
		}, {});
		return mapValues(fakeMarkersRanges, (range) => new ModelRange(range.start || writer.createPositionFromPath(rootElement, [0]), range.end || writer.createPositionAt(rootElement, "end")));
	}
	/**
	* Returns array that contains list of fake markers with corresponding `$marker` elements.
	*
	* For each marker, there can be two `$marker` elements or only one (if the document fragment contained
	* only the beginning or only the end of a marker).
	*
	* @param writer An instance of the model writer.
	* @param rootElement The element to be checked.
	*/
	_getAllFakeMarkersFromElement(writer, rootElement) {
		const foundFakeMarkers = Array.from(writer.createRangeIn(rootElement)).flatMap(({ item }) => {
			if (!item.is("element", "$marker")) return [];
			return [{
				markerElement: item,
				name: item.getAttribute("data-name"),
				type: item.getAttribute("data-type")
			}];
		});
		const prependFakeMarkers = [];
		const appendFakeMarkers = [];
		for (const fakeMarker of foundFakeMarkers) {
			if (fakeMarker.type === "end") {
				if (!foundFakeMarkers.some((otherFakeMarker) => otherFakeMarker.name === fakeMarker.name && otherFakeMarker.type === "start")) prependFakeMarkers.push({
					markerElement: null,
					name: fakeMarker.name,
					type: "start"
				});
			}
			if (fakeMarker.type === "start") {
				if (!foundFakeMarkers.some((otherFakeMarker) => otherFakeMarker.name === fakeMarker.name && otherFakeMarker.type === "end")) appendFakeMarkers.unshift({
					markerElement: null,
					name: fakeMarker.name,
					type: "end"
				});
			}
		}
		return [
			...prependFakeMarkers,
			...foundFakeMarkers,
			...appendFakeMarkers
		];
	}
	/**
	* When copy of markers occurs we have to make sure that pasted markers have different names
	* than source markers. This functions helps with assigning unique part to marker name to
	* prevent duplicated markers error.
	*
	* @param name Name of marker
	*/
	_getUniqueMarkerName(name) {
		const parts = name.split(":");
		const newId = uid().substring(1, 6);
		if (parts.length === 3) return `${parts.slice(0, 2).join(":")}:${newId}`;
		return `${parts.join(":")}:${newId}`;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/clipboardpipeline
*/
/**
* The clipboard pipeline feature. It is responsible for intercepting the `paste` and `drop` events and
* passing the pasted content through a series of events in order to insert it into the editor's content.
* It also handles the `cut` and `copy` events to fill the native clipboard with the serialized editor's data.
*
* # Input pipeline
*
* The behavior of the default handlers (all at a `low` priority):
*
* ## Event: `paste` or `drop`
*
* 1. Translates the event data.
* 2. Fires the {@link module:engine/view/document~ViewDocument#event:clipboardInput `view.Document#clipboardInput`} event.
*
* ## Event: `view.Document#clipboardInput`
*
* 1. If the `data.content` event field is already set (by some listener on a higher priority), it takes this content and fires the event
*    from the last point.
* 2. Otherwise, it retrieves `text/html` or `text/plain` from `data.dataTransfer`.
* 3. Normalizes the raw data by applying simple filters on string data.
* 4. Processes the raw data to {@link module:engine/view/documentfragment~ViewDocumentFragment `view.DocumentFragment`} with the
*    {@link module:engine/controller/datacontroller~DataController#htmlProcessor `DataController#htmlProcessor`}.
* 5. Fires the {@link module:clipboard/clipboardpipeline~ClipboardPipeline#event:inputTransformation
*   `ClipboardPipeline#inputTransformation`} event with the view document fragment in the `data.content` event field.
*
* ## Event: `ClipboardPipeline#inputTransformation`
*
* 1. Converts {@link module:engine/view/documentfragment~ViewDocumentFragment `view.DocumentFragment`} from the `data.content` field to
*    {@link module:engine/model/documentfragment~ModelDocumentFragment `model.DocumentFragment`}.
* 2. Fires the {@link module:clipboard/clipboardpipeline~ClipboardPipeline#event:contentInsertion `ClipboardPipeline#contentInsertion`}
*    event with the model document fragment in the `data.content` event field.
*    **Note**: The `ClipboardPipeline#contentInsertion` event is fired within a model change block to allow other handlers
*    to run in the same block without post-fixers called in between (i.e., the selection post-fixer).
*
* ## Event: `ClipboardPipeline#contentInsertion`
*
* 1. Calls {@link module:engine/model/model~Model#insertContent `model.insertContent()`} to insert `data.content`
*    at the current selection position.
*
* # Output pipeline
*
* The behavior of the default handlers (all at a `low` priority):
*
* ## Event: `copy`, `cut` or `dragstart`
*
* 1. Retrieves the selected {@link module:engine/model/documentfragment~ModelDocumentFragment `model.DocumentFragment`} by calling
*    {@link module:engine/model/model~Model#getSelectedContent `model#getSelectedContent()`}.
* 2. Converts the model document fragment to {@link module:engine/view/documentfragment~ViewDocumentFragment `view.DocumentFragment`}.
* 3. Fires the {@link module:engine/view/document~ViewDocument#event:clipboardOutput `view.Document#clipboardOutput`} event
*    with the view document fragment in the `data.content` event field.
*
* ## Event: `view.Document#clipboardOutput`
*
* 1. Processes `data.content` to HTML and plain text with the
*    {@link module:engine/controller/datacontroller~DataController#htmlProcessor `DataController#htmlProcessor`}.
* 2. Updates the `data.dataTransfer` data for `text/html` and `text/plain` with the processed data.
* 3. For the `cut` method, calls {@link module:engine/model/model~Model#deleteContent `model.deleteContent()`}
*    on the current selection.
*
* Read more about the clipboard integration in the {@glink framework/deep-dive/clipboard clipboard deep-dive} guide.
*/
var ClipboardPipeline = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ClipboardPipeline";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [ClipboardMarkersUtils];
	}
	/**
	* @inheritDoc
	*/
	init() {
		this.editor.editing.view.addObserver(ClipboardObserver);
		this._setupPasteDrop();
		this._setupCopyCut();
	}
	/**
	* Fires Clipboard `'outputTransformation'` event for given parameters.
	*
	* @internal
	*/
	_fireOutputTransformationEvent(dataTransfer, selection, method) {
		const clipboardMarkersUtils = this.editor.plugins.get("ClipboardMarkersUtils");
		this.editor.model.enqueueChange({ isUndoable: method === "cut" }, () => {
			const documentFragment = clipboardMarkersUtils._copySelectedFragmentWithMarkers(method, selection);
			this.fire("outputTransformation", {
				dataTransfer,
				content: documentFragment,
				method
			});
		});
	}
	/**
	* The clipboard paste pipeline.
	*/
	_setupPasteDrop() {
		const editor = this.editor;
		const model = editor.model;
		const view = editor.editing.view;
		const viewDocument = view.document;
		const clipboardMarkersUtils = this.editor.plugins.get("ClipboardMarkersUtils");
		this.listenTo(viewDocument, "clipboardInput", (evt, data) => {
			if (data.method == "paste" && !editor.model.canEditAt(editor.model.document.selection)) evt.stop();
		}, { priority: "highest" });
		this.listenTo(viewDocument, "clipboardInput", (evt, data) => {
			const dataTransfer = data.dataTransfer;
			const eventInfo = new EventInfo(this, "inputTransformation");
			const sourceEditorId = dataTransfer.getData("application/ckeditor5-editor-id") || null;
			const content = typeof data.content == "string" ? this.editor.data.htmlProcessor.toView(normalizeClipboardData(data.content)) : data.content;
			this.fire(eventInfo, {
				content,
				dataTransfer,
				sourceEditorId,
				extraContent: data.extraContent,
				targetRanges: data.targetRanges,
				method: data.method
			});
			if (eventInfo.stop.called) evt.stop();
			view.scrollToTheSelection();
		}, { priority: "low" });
		this.listenTo(this, "inputTransformation", (evt, data) => {
			if (data.content.isEmpty) return;
			const modelFragment = this.editor.data.toModel(data.content, "$clipboardHolder");
			if (modelFragment.childCount == 0) return;
			evt.stop();
			model.change(() => {
				this.fire("contentInsertion", {
					content: modelFragment,
					method: data.method,
					sourceEditorId: data.sourceEditorId,
					dataTransfer: data.dataTransfer,
					targetRanges: data.targetRanges
				});
			});
		}, { priority: "low" });
		this.listenTo(this, "contentInsertion", (evt, data) => {
			data.resultRange = clipboardMarkersUtils._pasteFragmentWithMarkers(data.content);
		}, { priority: "low" });
	}
	/**
	* The clipboard copy/cut pipeline.
	*/
	_setupCopyCut() {
		const editor = this.editor;
		const modelDocument = editor.model.document;
		const viewDocument = editor.editing.view.document;
		const onCopyCut = (evt, data) => {
			const dataTransfer = data.dataTransfer;
			data.preventDefault();
			this._fireOutputTransformationEvent(dataTransfer, modelDocument.selection, evt.name);
		};
		this.listenTo(viewDocument, "copy", onCopyCut, { priority: "low" });
		this.listenTo(viewDocument, "cut", (evt, data) => {
			if (!editor.model.canEditAt(editor.model.document.selection)) data.preventDefault();
			else onCopyCut(evt, data);
		}, { priority: "low" });
		this.listenTo(this, "outputTransformation", (evt, data) => {
			const content = editor.data.toView(data.content, { isClipboardPipeline: true });
			viewDocument.fire("clipboardOutput", {
				dataTransfer: data.dataTransfer,
				content,
				method: data.method
			});
		}, { priority: "low" });
		this.listenTo(viewDocument, "clipboardOutput", (evt, data) => {
			if (!data.content.isEmpty) {
				data.dataTransfer.setData("text/html", this.editor.data.htmlProcessor.toData(data.content));
				data.dataTransfer.setData("text/plain", viewToPlainText(editor.data.htmlProcessor.domConverter, data.content));
				data.dataTransfer.setData("application/ckeditor5-editor-id", this.editor.id);
			}
			if (data.method == "cut") editor.model.deleteContent(modelDocument.selection);
		}, { priority: "low" });
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/lineview
*/
/* istanbul ignore file -- @preserve */
const toPx = /* #__PURE__ */ toUnit("px");
/**
* The horizontal drop target line view.
*
* @internal
*/
var LineView = class extends View {
	/**
	* @inheritDoc
	*/
	constructor() {
		super();
		const bind = this.bindTemplate;
		this.set({
			isVisible: false,
			left: null,
			top: null,
			width: null
		});
		this.setTemplate({
			tag: "div",
			attributes: {
				class: [
					"ck",
					"ck-clipboard-drop-target-line",
					bind.if("isVisible", "ck-hidden", (value) => !value)
				],
				style: {
					left: bind.to("left", (left) => toPx(left)),
					top: bind.to("top", (top) => toPx(top)),
					width: bind.to("width", (width) => toPx(width))
				}
			}
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/dragdroptarget
*/
/**
* Part of the Drag and Drop handling. Responsible for finding and displaying the drop target.
*
* @internal
*/
var DragDropTarget = class extends Plugin {
	/**
	* A delayed callback removing the drop marker.
	*
	* @internal
	*/
	removeDropMarkerDelayed = delay(() => this.removeDropMarker(), 40);
	/**
	* A throttled callback updating the drop marker.
	*/
	_updateDropMarkerThrottled = throttle((targetRange) => this._updateDropMarker(targetRange), 40);
	/**
	* A throttled callback reconverting the drop parker.
	*/
	_reconvertMarkerThrottled = throttle(() => {
		if (this.editor.model.markers.has("drop-target")) this.editor.editing.reconvertMarker("drop-target");
	}, 0);
	/**
	* The horizontal drop target line view.
	*/
	_dropTargetLineView = new LineView();
	/**
	* DOM Emitter.
	*/
	_domEmitter = new (DomEmitterMixin())();
	/**
	* Map of document scrollable elements.
	*/
	_scrollables = /* @__PURE__ */ new Map();
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "DragDropTarget";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	init() {
		this._setupDropMarker();
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		this._domEmitter.stopListening();
		for (const { resizeObserver } of this._scrollables.values()) resizeObserver.destroy();
		this._updateDropMarkerThrottled.cancel();
		this.removeDropMarkerDelayed.cancel();
		this._reconvertMarkerThrottled.cancel();
		return super.destroy();
	}
	/**
	* Finds the drop target range and updates the drop marker.
	*
	* @return The updated drop target range or null if no valid range was found.
	* @internal
	*/
	updateDropMarker(targetViewElement, targetViewRanges, clientX, clientY, blockMode, draggedRange) {
		this.removeDropMarkerDelayed.cancel();
		const targetRange = findDropTargetRange(this.editor, targetViewElement, targetViewRanges, clientX, clientY, blockMode, draggedRange);
		/* istanbul ignore next -- @preserve */
		if (!targetRange) return null;
		if (draggedRange && draggedRange.containsRange(targetRange)) {
			this.removeDropMarker();
			return null;
		}
		if (targetRange && !this.editor.model.canEditAt(targetRange)) {
			this.removeDropMarker();
			return null;
		}
		this._updateDropMarkerThrottled(targetRange);
		return targetRange;
	}
	/**
	* Finds the final drop target range.
	*
	* @internal
	*/
	getFinalDropRange(targetViewElement, targetViewRanges, clientX, clientY, blockMode, draggedRange) {
		const targetRange = findDropTargetRange(this.editor, targetViewElement, targetViewRanges, clientX, clientY, blockMode, draggedRange);
		this.removeDropMarker();
		return targetRange;
	}
	/**
	* Removes the drop target marker.
	*
	* @internal
	*/
	removeDropMarker() {
		const model = this.editor.model;
		this.removeDropMarkerDelayed.cancel();
		this._updateDropMarkerThrottled.cancel();
		this._dropTargetLineView.isVisible = false;
		if (model.markers.has("drop-target")) model.change((writer) => {
			writer.removeMarker("drop-target");
		});
	}
	/**
	* Creates downcast conversion for the drop target marker.
	*/
	_setupDropMarker() {
		const editor = this.editor;
		editor.ui.view.body.add(this._dropTargetLineView);
		editor.conversion.for("editingDowncast").markerToHighlight({
			model: "drop-target",
			view: { classes: ["ck-clipboard-drop-target-range"] }
		});
		editor.conversion.for("editingDowncast").markerToElement({
			model: "drop-target",
			view: (data, { writer }) => {
				if (editor.model.schema.checkChild(data.markerRange.start, "$text")) {
					this._dropTargetLineView.isVisible = false;
					return this._createDropTargetPosition(writer);
				} else if (data.markerRange.isCollapsed) this._updateDropTargetLine(data.markerRange);
				else this._dropTargetLineView.isVisible = false;
			}
		});
	}
	/**
	* Updates the drop target marker to the provided range.
	*
	* @param targetRange The range to set the marker to.
	*/
	_updateDropMarker(targetRange) {
		const editor = this.editor;
		const markers = editor.model.markers;
		editor.model.change((writer) => {
			if (markers.has("drop-target")) {
				if (!markers.get("drop-target").getRange().isEqual(targetRange)) writer.updateMarker("drop-target", { range: targetRange });
			} else writer.addMarker("drop-target", {
				range: targetRange,
				usingOperation: false,
				affectsData: false
			});
		});
	}
	/**
	* Creates the UI element for vertical (in-line) drop target.
	*/
	_createDropTargetPosition(writer) {
		return writer.createUIElement("span", { class: "ck ck-clipboard-drop-target-position" }, function(domDocument) {
			const domElement = this.toDomElement(domDocument);
			domElement.append("⁠", domDocument.createElement("span"), "⁠");
			return domElement;
		});
	}
	/**
	* Updates the horizontal drop target line.
	*/
	_updateDropTargetLine(range) {
		const editing = this.editor.editing;
		const nodeBefore = range.start.nodeBefore;
		const nodeAfter = range.start.nodeAfter;
		const nodeParent = range.start.parent;
		const viewElementBefore = nodeBefore ? editing.mapper.toViewElement(nodeBefore) : null;
		const domElementBefore = viewElementBefore ? editing.view.domConverter.mapViewToDom(viewElementBefore) : null;
		const viewElementAfter = nodeAfter ? editing.mapper.toViewElement(nodeAfter) : null;
		const domElementAfter = viewElementAfter ? editing.view.domConverter.mapViewToDom(viewElementAfter) : null;
		const viewElementParent = editing.mapper.toViewElement(nodeParent);
		if (!viewElementParent) return;
		const domElementParent = editing.view.domConverter.mapViewToDom(viewElementParent);
		const domScrollableRect = this._getScrollableRect(viewElementParent);
		const { scrollX, scrollY } = global.window;
		const rectBefore = domElementBefore ? new Rect(domElementBefore) : null;
		const rectAfter = domElementAfter ? new Rect(domElementAfter) : null;
		const rectParent = new Rect(domElementParent).excludeScrollbarsAndBorders();
		const above = rectBefore ? rectBefore.bottom : rectParent.top;
		const below = rectAfter ? rectAfter.top : rectParent.bottom;
		const parentStyle = global.window.getComputedStyle(domElementParent);
		const top = above <= below ? (above + below) / 2 : below;
		if (domScrollableRect.top < top && top < domScrollableRect.bottom) {
			const left = rectParent.left + parseFloat(parentStyle.paddingLeft);
			const right = rectParent.right - parseFloat(parentStyle.paddingRight);
			const leftClamped = Math.max(left + scrollX, domScrollableRect.left);
			const rightClamped = Math.min(right + scrollX, domScrollableRect.right);
			this._dropTargetLineView.set({
				isVisible: true,
				left: leftClamped,
				top: top + scrollY,
				width: rightClamped - leftClamped
			});
		} else this._dropTargetLineView.isVisible = false;
	}
	/**
	* Finds the closest scrollable element rect for the given view element.
	*/
	_getScrollableRect(viewElement) {
		const rootName = viewElement.root.rootName;
		let domScrollable;
		if (this._scrollables.has(rootName)) domScrollable = this._scrollables.get(rootName).domElement;
		else {
			domScrollable = findScrollableElement(this.editor.editing.view.domConverter.mapViewToDom(viewElement));
			this._domEmitter.listenTo(domScrollable, "scroll", this._reconvertMarkerThrottled, { usePassive: true });
			const resizeObserver = new ResizeObserver(domScrollable, this._reconvertMarkerThrottled);
			this._scrollables.set(rootName, {
				domElement: domScrollable,
				resizeObserver
			});
		}
		return new Rect(domScrollable).excludeScrollbarsAndBorders();
	}
};
/**
* Returns fixed selection range for given position and target element.
*/
function findDropTargetRange(editor, targetViewElement, targetViewRanges, clientX, clientY, blockMode, draggedRange) {
	const model = editor.model;
	const mapper = editor.editing.mapper;
	let modelElement = getClosestMappedModelElement(editor, targetViewElement);
	while (modelElement) {
		if (!blockMode) {
			if (model.schema.checkChild(modelElement, "$text")) {
				if (targetViewRanges) {
					const targetViewPosition = targetViewRanges[0].start;
					const targetModelPosition = mapper.toModelPosition(targetViewPosition);
					if (!draggedRange || Array.from(draggedRange.getItems({ shallow: true })).some((item) => model.schema.checkChild(targetModelPosition, item))) {
						if (model.schema.checkChild(targetModelPosition, "$text")) return model.createRange(targetModelPosition);
						else if (targetViewPosition) return findDropTargetRangeForElement(editor, getClosestMappedModelElement(editor, targetViewPosition.parent), clientX, clientY);
					}
				}
			} else if (model.schema.isInline(modelElement)) return findDropTargetRangeForElement(editor, modelElement, clientX, clientY);
		}
		if (model.schema.isBlock(modelElement)) return findDropTargetRangeForElement(editor, modelElement, clientX, clientY);
		else if (model.schema.checkChild(modelElement, "$block")) {
			const childNodes = Array.from(modelElement.getChildren()).filter((node) => node.is("element") && !shouldIgnoreElement(editor, node));
			let startIndex = 0;
			let endIndex = childNodes.length;
			if (endIndex == 0) return model.createRange(model.createPositionAt(modelElement, "end"));
			while (startIndex < endIndex - 1) {
				const middleIndex = Math.floor((startIndex + endIndex) / 2);
				if (findElementSide(editor, childNodes[middleIndex], clientX, clientY) == "before") endIndex = middleIndex;
				else startIndex = middleIndex;
			}
			return findDropTargetRangeForElement(editor, childNodes[startIndex], clientX, clientY);
		}
		modelElement = modelElement.parent;
	}
	return null;
}
/**
* Returns true for elements which should be ignored.
*/
function shouldIgnoreElement(editor, modelElement) {
	const mapper = editor.editing.mapper;
	const domConverter = editor.editing.view.domConverter;
	const viewElement = mapper.toViewElement(modelElement);
	if (!viewElement) return true;
	const domElement = domConverter.mapViewToDom(viewElement);
	return global.window.getComputedStyle(domElement).float != "none";
}
/**
* Returns target range relative to the given element.
*/
function findDropTargetRangeForElement(editor, modelElement, clientX, clientY) {
	const model = editor.model;
	return model.createRange(model.createPositionAt(modelElement, findElementSide(editor, modelElement, clientX, clientY)));
}
/**
* Resolves whether drop marker should be before or after the given element.
*/
function findElementSide(editor, modelElement, clientX, clientY) {
	const mapper = editor.editing.mapper;
	const domConverter = editor.editing.view.domConverter;
	const viewElement = mapper.toViewElement(modelElement);
	const domElement = domConverter.mapViewToDom(viewElement);
	const rect = new Rect(domElement);
	if (editor.model.schema.isInline(modelElement)) return clientX < (rect.left + rect.right) / 2 ? "before" : "after";
	else return clientY < (rect.top + rect.bottom) / 2 ? "before" : "after";
}
/**
* Returns the closest model element for the specified view element.
*/
function getClosestMappedModelElement(editor, element) {
	const mapper = editor.editing.mapper;
	const view = editor.editing.view;
	const targetModelElement = mapper.toModelElement(element);
	if (targetModelElement) return targetModelElement;
	const viewPosition = view.createPositionBefore(element);
	const viewElement = mapper.findMappedViewAncestor(viewPosition);
	return mapper.toModelElement(viewElement);
}
/**
* Returns the closest scrollable ancestor DOM element.
*
* It is assumed that `domNode` is attached to the document.
*/
function findScrollableElement(domNode) {
	let domElement = domNode;
	do {
		domElement = domElement.parentElement;
		const overflow = global.window.getComputedStyle(domElement).overflowY;
		if (overflow == "auto" || overflow == "scroll") break;
	} while (domElement.tagName != "BODY");
	return domElement;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/dragdropblocktoolbar
*/
/**
* Integration of a block Drag and Drop support with the block toolbar.
*
* @internal
*/
var DragDropBlockToolbar = class extends Plugin {
	/**
	* Whether current dragging is started by block toolbar button dragging.
	*/
	_isBlockDragging = false;
	/**
	* DOM Emitter.
	*/
	_domEmitter = new (DomEmitterMixin())();
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "DragDropBlockToolbar";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		this.listenTo(editor, "change:isReadOnly", (evt, name, isReadOnly) => {
			if (isReadOnly) {
				this.forceDisabled("readOnlyMode");
				this._isBlockDragging = false;
			} else this.clearForceDisabled("readOnlyMode");
		});
		if (env.isAndroid) this.forceDisabled("noAndroidSupport");
		if (editor.plugins.has("BlockToolbar")) {
			const element = editor.plugins.get("BlockToolbar").buttonView.element;
			this._domEmitter.listenTo(element, "dragstart", (evt, data) => this._handleBlockDragStart(data));
			this._domEmitter.listenTo(global.document, "dragover", (evt, data) => this._handleBlockDragging(data));
			this._domEmitter.listenTo(global.document, "drop", (evt, data) => this._handleBlockDragging(data));
			this._domEmitter.listenTo(global.document, "dragend", () => this._handleBlockDragEnd(), { useCapture: true });
			if (this.isEnabled) element.setAttribute("draggable", "true");
			this.on("change:isEnabled", (evt, name, isEnabled) => {
				element.setAttribute("draggable", isEnabled ? "true" : "false");
			});
		}
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		this._domEmitter.stopListening();
		return super.destroy();
	}
	/**
	* The `dragstart` event handler.
	*/
	_handleBlockDragStart(domEvent) {
		if (!this.isEnabled) return;
		const model = this.editor.model;
		const selection = model.document.selection;
		const view = this.editor.editing.view;
		const blocks = Array.from(selection.getSelectedBlocks());
		const draggedRange = model.createRange(model.createPositionBefore(blocks[0]), model.createPositionAfter(blocks[blocks.length - 1]));
		model.change((writer) => writer.setSelection(draggedRange));
		this._isBlockDragging = true;
		view.focus();
		view.getObserver(ClipboardObserver).onDomEvent(domEvent);
	}
	/**
	* The `dragover` and `drop` event handler.
	*/
	_handleBlockDragging(domEvent) {
		if (!this.isEnabled || !this._isBlockDragging) return;
		const clientX = domEvent.clientX + (this.editor.locale.contentLanguageDirection == "ltr" ? 100 : -100);
		const clientY = domEvent.clientY;
		const target = document.elementFromPoint(clientX, clientY);
		const view = this.editor.editing.view;
		if (!target || !target.closest(".ck-editor__editable")) return;
		view.getObserver(ClipboardObserver).onDomEvent({
			...domEvent,
			type: domEvent.type,
			dataTransfer: domEvent.dataTransfer,
			target,
			clientX,
			clientY,
			preventDefault: () => domEvent.preventDefault(),
			stopPropagation: () => domEvent.stopPropagation()
		});
	}
	/**
	* The `dragend` event handler.
	*/
	_handleBlockDragEnd() {
		this._isBlockDragging = false;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/dragdrop
*/
/**
* The drag and drop feature. It works on top of the {@link module:clipboard/clipboardpipeline~ClipboardPipeline}.
*
* Read more about the clipboard integration in the {@glink framework/deep-dive/clipboard clipboard deep-dive} guide.
*
* @internal
*/
var DragDrop = class extends Plugin {
	/**
	* The live range over the original content that is being dragged.
	*/
	_draggedRange;
	/**
	* The UID of current dragging that is used to verify if the drop started in the same editor as the drag start.
	*
	* **Note**: This is a workaround for broken 'dragend' events (they are not fired if the source text node got removed).
	*/
	_draggingUid;
	/**
	* The reference to the model element that currently has a `draggable` attribute set (it is set while dragging).
	*/
	_draggableElement;
	/**
	* A delayed callback removing draggable attributes.
	*/
	_clearDraggableAttributesDelayed = delay(() => this._clearDraggableAttributes(), 40);
	/**
	* Whether the dragged content can be dropped only in block context.
	*/
	_blockMode = false;
	/**
	* DOM Emitter.
	*/
	_domEmitter = new (DomEmitterMixin())();
	/**
	* The DOM element used to generate dragged preview image.
	*/
	_previewContainer;
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "DragDrop";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			ClipboardPipeline,
			Widget,
			DragDropTarget,
			DragDropBlockToolbar
		];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const view = editor.editing.view;
		this._draggedRange = null;
		this._draggingUid = "";
		this._draggableElement = null;
		view.addObserver(ClipboardObserver);
		view.addObserver(PointerObserver);
		this._setupDragging();
		this._setupContentInsertionIntegration();
		this._setupClipboardInputIntegration();
		this._setupDraggableAttributeHandling();
		this.listenTo(editor, "change:isReadOnly", (evt, name, isReadOnly) => {
			if (isReadOnly) this.forceDisabled("readOnlyMode");
			else this.clearForceDisabled("readOnlyMode");
		});
		this.on("change:isEnabled", (evt, name, isEnabled) => {
			if (!isEnabled) this._finalizeDragging(false);
		});
		if (env.isAndroid) this.forceDisabled("noAndroidSupport");
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		if (this._draggedRange) {
			this._draggedRange.detach();
			this._draggedRange = null;
		}
		if (this._previewContainer) this._previewContainer.remove();
		this._domEmitter.stopListening();
		this._clearDraggableAttributesDelayed.cancel();
		return super.destroy();
	}
	/**
	* Drag and drop events handling.
	*/
	_setupDragging() {
		const editor = this.editor;
		const model = editor.model;
		const view = editor.editing.view;
		const viewDocument = view.document;
		const dragDropTarget = editor.plugins.get(DragDropTarget);
		this.listenTo(viewDocument, "dragstart", (evt, data) => {
			if (data.target?.is("editableElement")) {
				data.preventDefault();
				return;
			}
			this._prepareDraggedRange(data.target);
			if (!this._draggedRange) {
				data.preventDefault();
				return;
			}
			this._draggingUid = uid();
			const canEditAtDraggedRange = this.isEnabled && editor.model.canEditAt(this._draggedRange);
			data.dataTransfer.effectAllowed = canEditAtDraggedRange ? "copyMove" : "copy";
			data.dataTransfer.setData("application/ckeditor5-dragging-uid", this._draggingUid);
			const draggedSelection = model.createSelection(this._draggedRange.toRange());
			this.editor.plugins.get("ClipboardPipeline")._fireOutputTransformationEvent(data.dataTransfer, draggedSelection, "dragstart");
			const { dataTransfer, domTarget, domEvent } = data;
			const { clientX } = domEvent;
			this._updatePreview({
				dataTransfer,
				domTarget,
				clientX
			});
			data.stopPropagation();
			if (!canEditAtDraggedRange) {
				this._draggedRange.detach();
				this._draggedRange = null;
				this._draggingUid = "";
			}
		}, { priority: "low" });
		this.listenTo(viewDocument, "dragend", (evt, data) => {
			this._finalizeDragging(!data.dataTransfer.isCanceled && data.dataTransfer.dropEffect == "move");
		}, { priority: "low" });
		this._domEmitter.listenTo(global.document, "dragend", () => {
			this._blockMode = false;
		}, { useCapture: true });
		this.listenTo(viewDocument, "dragenter", () => {
			if (!this.isEnabled) return;
			view.focus();
		});
		this.listenTo(viewDocument, "dragleave", () => {
			dragDropTarget.removeDropMarkerDelayed();
		});
		this.listenTo(viewDocument, "dragging", (evt, data) => {
			if (!this.isEnabled) {
				data.dataTransfer.dropEffect = "none";
				return;
			}
			const { clientX, clientY } = data.domEvent;
			if (!dragDropTarget.updateDropMarker(data.target, data.targetRanges, clientX, clientY, this._blockMode, this._draggedRange)) {
				data.dataTransfer.dropEffect = "none";
				return;
			}
			if (!this._draggedRange) data.dataTransfer.dropEffect = "copy";
			if (!env.isGecko) {
				if (data.dataTransfer.effectAllowed == "copy") data.dataTransfer.dropEffect = "copy";
				else if (["all", "copyMove"].includes(data.dataTransfer.effectAllowed)) data.dataTransfer.dropEffect = "move";
			}
			evt.stop();
		}, { priority: "low" });
	}
	/**
	* Integration with the `clipboardInput` event.
	*/
	_setupClipboardInputIntegration() {
		const editor = this.editor;
		const viewDocument = editor.editing.view.document;
		const dragDropTarget = editor.plugins.get(DragDropTarget);
		this.listenTo(viewDocument, "clipboardInput", (evt, data) => {
			if (data.method != "drop") return;
			const { clientX, clientY } = data.domEvent;
			const targetRange = dragDropTarget.getFinalDropRange(data.target, data.targetRanges, clientX, clientY, this._blockMode, this._draggedRange);
			if (!targetRange) {
				this._finalizeDragging(false);
				evt.stop();
				return;
			}
			if (this._draggedRange && this._draggingUid != data.dataTransfer.getData("application/ckeditor5-dragging-uid")) {
				this._draggedRange.detach();
				this._draggedRange = null;
				this._draggingUid = "";
			}
			if (getFinalDropEffect(data.dataTransfer) == "move" && this._draggedRange && this._draggedRange.containsRange(targetRange, true)) {
				this._finalizeDragging(false);
				evt.stop();
				return;
			}
			data.targetRanges = [editor.editing.mapper.toViewRange(targetRange)];
		}, { priority: "high" });
	}
	/**
	* Integration with the `contentInsertion` event of the clipboard pipeline.
	*/
	_setupContentInsertionIntegration() {
		const clipboardPipeline = this.editor.plugins.get(ClipboardPipeline);
		clipboardPipeline.on("contentInsertion", (evt, data) => {
			if (!this.isEnabled || data.method !== "drop") return;
			const ranges = data.targetRanges.map((viewRange) => this.editor.editing.mapper.toModelRange(viewRange));
			this.editor.model.change((writer) => writer.setSelection(ranges));
		}, { priority: "high" });
		clipboardPipeline.on("contentInsertion", (evt, data) => {
			if (!this.isEnabled || data.method !== "drop") return;
			const isMove = getFinalDropEffect(data.dataTransfer) == "move";
			const isSuccess = !data.resultRange || !data.resultRange.isCollapsed;
			this._finalizeDragging(isSuccess && isMove);
		}, { priority: "lowest" });
	}
	/**
	* Adds listeners that add the `draggable` attribute to the elements while the mouse button is down so the dragging could start.
	*/
	_setupDraggableAttributeHandling() {
		const editor = this.editor;
		const view = editor.editing.view;
		const viewDocument = view.document;
		this.listenTo(viewDocument, "pointerdown", (evt, data) => {
			if (env.isAndroid || !data) return;
			this._clearDraggableAttributesDelayed.cancel();
			let draggableElement = findDraggableWidget(data.target);
			if (env.isBlink && !editor.isReadOnly && !draggableElement && !viewDocument.selection.isCollapsed) {
				const selectedElement = viewDocument.selection.getSelectedElement();
				if (!selectedElement || !isWidget(selectedElement)) draggableElement = viewDocument.selection.editableElement;
			}
			if (draggableElement) {
				view.change((writer) => {
					writer.setAttribute("draggable", "true", draggableElement);
				});
				this._draggableElement = editor.editing.mapper.toModelElement(draggableElement);
			}
		});
		this.listenTo(viewDocument, "pointerup", () => {
			if (!env.isAndroid) this._clearDraggableAttributesDelayed();
		});
	}
	/**
	* Removes the `draggable` attribute from the element that was used for dragging.
	*/
	_clearDraggableAttributes() {
		const editing = this.editor.editing;
		editing.view.change((writer) => {
			if (this._draggableElement && this._draggableElement.root.rootName != "$graveyard") writer.removeAttribute("draggable", editing.mapper.toViewElement(this._draggableElement));
			this._draggableElement = null;
		});
	}
	/**
	* Deletes the dragged content from its original range and clears the dragging state.
	*
	* @param moved Whether the move succeeded.
	*/
	_finalizeDragging(moved) {
		const editor = this.editor;
		const model = editor.model;
		editor.plugins.get(DragDropTarget).removeDropMarker();
		this._clearDraggableAttributes();
		if (editor.plugins.has("WidgetToolbarRepository")) editor.plugins.get("WidgetToolbarRepository").clearForceDisabled("dragDrop");
		this._draggingUid = "";
		if (this._previewContainer) {
			this._previewContainer.remove();
			this._previewContainer = void 0;
		}
		if (!this._draggedRange) return;
		if (moved && this.isEnabled) model.change((writer) => {
			const selection = model.createSelection(this._draggedRange);
			model.deleteContent(selection, { doNotAutoparagraph: true });
			const selectionParent = selection.getFirstPosition().parent;
			if (selectionParent.isEmpty && !model.schema.checkChild(selectionParent, "$text") && model.schema.checkChild(selectionParent, "paragraph")) writer.insertElement("paragraph", selectionParent, 0);
		});
		this._draggedRange.detach();
		this._draggedRange = null;
	}
	/**
	* Sets the dragged source range based on event target and document selection.
	*/
	_prepareDraggedRange(target) {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;
		const draggableWidget = target ? findDraggableWidget(target) : null;
		if (draggableWidget) {
			const modelElement = editor.editing.mapper.toModelElement(draggableWidget);
			this._draggedRange = ModelLiveRange.fromRange(model.createRangeOn(modelElement));
			this._blockMode = model.schema.isBlock(modelElement);
			if (editor.plugins.has("WidgetToolbarRepository")) editor.plugins.get("WidgetToolbarRepository").forceDisabled("dragDrop");
			return;
		}
		if (selection.isCollapsed && !selection.getFirstPosition().parent.isEmpty) return;
		const blocks = Array.from(selection.getSelectedBlocks());
		const draggedRange = selection.getFirstRange();
		if (blocks.length == 0) {
			this._draggedRange = ModelLiveRange.fromRange(draggedRange);
			return;
		}
		const blockRange = getRangeIncludingFullySelectedParents(model, blocks);
		if (blocks.length > 1) {
			this._draggedRange = ModelLiveRange.fromRange(blockRange);
			this._blockMode = true;
		} else if (blocks.length == 1) {
			const touchesBlockEdges = draggedRange.start.isTouching(blockRange.start) && draggedRange.end.isTouching(blockRange.end);
			this._draggedRange = ModelLiveRange.fromRange(touchesBlockEdges ? blockRange : draggedRange);
			this._blockMode = touchesBlockEdges;
		}
		model.change((writer) => writer.setSelection(this._draggedRange.toRange()));
	}
	/**
	* Updates the dragged preview image.
	*/
	_updatePreview({ dataTransfer, domTarget, clientX }) {
		const view = this.editor.editing.view;
		const editable = view.document.selection.editableElement;
		const domEditable = view.domConverter.mapViewToDom(editable);
		const computedStyle = global.window.getComputedStyle(domEditable);
		if (!this._previewContainer) {
			this._previewContainer = createElement(global.document, "div", { style: "position: fixed; left: -999999px;" });
			global.document.body.appendChild(this._previewContainer);
		} else if (this._previewContainer.firstElementChild) this._previewContainer.removeChild(this._previewContainer.firstElementChild);
		const preview = createElement(global.document, "div");
		preview.className = "ck ck-content ck-clipboard-preview";
		const domRect = new Rect(domEditable);
		const domEditablePaddingLeft = parseFloat(computedStyle.paddingLeft);
		const domEditablePaddingRight = parseFloat(computedStyle.paddingRight);
		const editableWidth = parseFloat(computedStyle.width) - domEditablePaddingLeft - domEditablePaddingRight;
		if (!domEditable.contains(domTarget)) {
			if (!env.isiOS) {
				const offsetLeft = domRect.left - clientX + domEditablePaddingLeft;
				preview.style.width = `${editableWidth + offsetLeft}px`;
				preview.style.paddingLeft = `${offsetLeft}px`;
			} else {
				preview.style.width = `${editableWidth}px`;
				preview.style.backgroundColor = "var(--ck-color-base-background)";
			}
		} else if (env.isiOS) {
			preview.style.maxWidth = `${editableWidth}px`;
			preview.style.padding = "10px";
			preview.style.minWidth = "200px";
			preview.style.minHeight = "20px";
			preview.style.boxSizing = "border-box";
			preview.style.backgroundColor = "var(--ck-color-base-background)";
		} else return;
		view.domConverter.setContentOf(preview, dataTransfer.getData("text/html"));
		dataTransfer.setDragImage(preview, 0, 0);
		this._previewContainer.appendChild(preview);
	}
};
/**
* Returns the drop effect that should be a result of dragging the content.
* This function is handling a quirk when checking the effect in the 'drop' DOM event.
*/
function getFinalDropEffect(dataTransfer) {
	if (env.isGecko) return dataTransfer.dropEffect;
	return ["all", "copyMove"].includes(dataTransfer.effectAllowed) ? "move" : "copy";
}
/**
* Returns a widget element that should be dragged.
*/
function findDraggableWidget(target) {
	if (target.is("editableElement")) return null;
	if (target.hasClass("ck-widget__selection-handle")) return target.findAncestor(isWidget);
	if (isWidget(target)) return target;
	const ancestor = target.findAncestor((node) => isWidget(node) || node.is("editableElement"));
	if (isWidget(ancestor)) return ancestor;
	return null;
}
/**
* Recursively checks if common parent of provided elements doesn't have any other children. If that's the case,
* it returns range including this parent. Otherwise, it returns only the range from first to last element.
*
* Example:
*
* <blockQuote>
*   <paragraph>[Test 1</paragraph>
*   <paragraph>Test 2</paragraph>
*   <paragraph>Test 3]</paragraph>
* <blockQuote>
*
* Because all elements inside the `blockQuote` are selected, the range is extended to include the `blockQuote` too.
* If only first and second paragraphs would be selected, the range would not include it.
*/
function getRangeIncludingFullySelectedParents(model, elements) {
	const firstElement = elements[0];
	const lastElement = elements[elements.length - 1];
	const parent = firstElement.getCommonAncestor(lastElement);
	const startPosition = model.createPositionBefore(firstElement);
	const endPosition = model.createPositionAfter(lastElement);
	if (parent && parent.is("element") && !model.schema.isLimit(parent)) {
		const parentRange = model.createRangeOn(parent);
		const touchesStart = startPosition.isTouching(parentRange.start);
		const touchesEnd = endPosition.isTouching(parentRange.end);
		if (touchesStart && touchesEnd) return getRangeIncludingFullySelectedParents(model, [parent]);
	}
	return model.createRange(startPosition, endPosition);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/pasteplaintext
*/
/**
* The plugin detects the user's intention to paste plain text.
*
* For example, it detects the <kbd>Ctrl/Cmd</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd> keystroke.
*/
var PastePlainText = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "PastePlainText";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [ClipboardPipeline];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const model = editor.model;
		const view = editor.editing.view;
		const selection = model.document.selection;
		view.addObserver(ClipboardObserver);
		editor.plugins.get(ClipboardPipeline).on("contentInsertion", (evt, data) => {
			if (!isUnformattedInlineContent(data.content, model)) return;
			model.change((writer) => {
				const textAttributes = Array.from(selection.getAttributes()).filter(([key]) => model.schema.getAttributeProperties(key).isFormatting);
				if (!selection.isCollapsed) model.deleteContent(selection, { doNotAutoparagraph: true });
				textAttributes.push(...selection.getAttributes());
				const range = writer.createRangeIn(data.content);
				for (const item of range.getItems()) for (const attribute of textAttributes) if (model.schema.checkAttribute(item, attribute[0])) writer.setAttribute(attribute[0], attribute[1], item);
			});
		});
	}
};
/**
* Returns true if specified `documentFragment` represents the unformatted inline content.
*/
function isUnformattedInlineContent(documentFragment, model) {
	let range = model.createRangeIn(documentFragment);
	if (documentFragment.childCount == 1) {
		const child = documentFragment.getChild(0);
		if (child.is("element") && model.schema.isBlock(child) && !model.schema.isObject(child) && !model.schema.isLimit(child)) range = model.createRangeIn(child);
	}
	for (const child of range.getItems()) {
		if (!model.schema.isInline(child)) return false;
		if (Array.from(child.getAttributeKeys()).find((key) => model.schema.getAttributeProperties(key).isFormatting)) return false;
	}
	return true;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/clipboard
*/
/**
* The clipboard feature.
*
* Read more about the clipboard integration in the {@glink framework/deep-dive/clipboard clipboard deep-dive} guide.
*
* This is a "glue" plugin which loads the following plugins:
* * {@link module:clipboard/clipboardpipeline~ClipboardPipeline}
* * {@link module:clipboard/dragdrop~DragDrop}
* * {@link module:clipboard/pasteplaintext~PastePlainText}
*/
var Clipboard = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "Clipboard";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			ClipboardMarkersUtils,
			ClipboardPipeline,
			DragDrop,
			PastePlainText
		];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const t = this.editor.t;
		editor.accessibility.addKeystrokeInfos({ keystrokes: [
			{
				label: t("Copy selected content"),
				keystroke: "CTRL+C"
			},
			{
				label: t("Paste content"),
				keystroke: "CTRL+V"
			},
			{
				label: t("Paste content as plain text"),
				keystroke: "CTRL+SHIFT+V"
			}
		] });
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { Clipboard, ClipboardMarkersUtils, ClipboardObserver, ClipboardPipeline, DragDrop, DragDrop as _DragDrop, DragDropBlockToolbar, DragDropBlockToolbar as _DragDropBlockToolbar, DragDropTarget, DragDropTarget as _DragDropTarget, PastePlainText, LineView as _ClipboardLineView, normalizeClipboardData as _normalizeClipboardData, plainTextToHtml, viewToPlainText };
//# sourceMappingURL=index.js.map