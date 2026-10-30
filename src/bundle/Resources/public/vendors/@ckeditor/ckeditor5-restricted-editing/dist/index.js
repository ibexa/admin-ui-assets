/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { Collection, count, first, getCode, parseKeystroke } from "@ckeditor/ckeditor5-utils";
import { Matcher } from "@ckeditor/ckeditor5-engine";
import { IconContentLock, IconContentUnlock } from "@ckeditor/ckeditor5-icons";
import { ButtonView, MenuBarMenuListItemButtonView, MenuBarMenuListItemView, MenuBarMenuListView, MenuBarMenuView, UIModel, addListToDropdown, addToolbarToDropdown, createDropdown } from "@ckeditor/ckeditor5-ui";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Returns a single "restricted-editing-exception" marker at a given position. Contrary to
* {@link module:engine/model/markercollection~MarkerCollection#getMarkersAtPosition}, it returns a marker also when the position is
* equal to one of the marker's start or end positions.
*
* @internal
*/
function getMarkerAtPosition(editor, position) {
	for (const marker of editor.model.markers) if (isPositionInRangeBoundaries(getExceptionRange(marker, editor.model), position)) {
		if (marker.name.startsWith("restrictedEditingException:")) return marker;
	}
}
/**
* Checks if the position is fully contained in the range. Positions equal to range start or end are considered "in".
*
* @internal
*/
function isPositionInRangeBoundaries(range, position) {
	return range.containsPosition(position) || range.end.isEqual(position) || range.start.isEqual(position);
}
/**
* Checks if the selection is fully contained in the marker. Positions on marker boundaries are considered "in".
*
* ```xml
* <marker>[]foo</marker> -> true
* <marker>f[oo]</marker> -> true
* <marker>f[oo</marker> ba]r -> false
* <marker>foo</marker> []bar -> false
* ```
*
* @internal
*/
function isSelectionInMarker(selection, model, marker) {
	if (!marker) return false;
	const markerRange = getExceptionRange(marker, model);
	if (selection.isCollapsed) return isPositionInRangeBoundaries(markerRange, selection.focus);
	return markerRange.containsRange(selection.getFirstRange(), true);
}
/**
* Returns the marker range asjusted to the inside of exception wrapper element if needed.
*
* @internal
*/
function getExceptionRange(marker, model) {
	const markerRange = marker.getRange();
	const wrapperElement = markerRange.getContainedElement();
	if (wrapperElement && wrapperElement.is("element", "restrictedEditingException")) return model.createRangeIn(wrapperElement);
	return markerRange;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The command that allows navigation across the exceptions in the edited document.
*/
var RestrictedEditingModeNavigationCommand = class extends Command {
	/**
	* The direction of the command.
	*/
	_direction;
	/**
	* Creates an instance of the command.
	*
	* @param editor The editor instance.
	* @param direction The direction that the command works.
	*/
	constructor(editor, direction) {
		super(editor);
		this.affectsData = false;
		this._direction = direction;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Executes the command.
	*
	* @fires execute
	*/
	execute() {
		const position = getNearestExceptionRange(this.editor.model, this._direction);
		if (!position) return;
		this.editor.model.change((writer) => {
			writer.setSelection(position);
		});
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @returns Whether the command should be enabled.
	*/
	_checkEnabled() {
		return !!getNearestExceptionRange(this.editor.model, this._direction);
	}
};
/**
* Returns the range of the exception marker closest to the last position of the model selection.
*/
function getNearestExceptionRange(model, direction) {
	const selectionPosition = model.document.selection.getFirstPosition();
	const markerRanges = [];
	for (const marker of model.markers.getMarkersGroup("restrictedEditingException")) {
		const markerRange = getExceptionRange(marker, model);
		const isMarkerRangeTouching = selectionPosition.isTouching(markerRange.start) && selectionPosition.hasSameParentAs(markerRange.start) || selectionPosition.isTouching(markerRange.end) && selectionPosition.hasSameParentAs(markerRange.end);
		if (markerRange.containsPosition(selectionPosition) || isMarkerRangeTouching) continue;
		if (direction === "forward" && markerRange.start.isAfter(selectionPosition)) markerRanges.push(markerRange);
		else if (direction === "backward" && markerRange.end.isBefore(selectionPosition)) markerRanges.push(markerRange);
	}
	if (!markerRanges.length) return;
	return markerRanges.sort((rangeA, rangeB) => {
		if (direction === "forward") return rangeA.start.isAfter(rangeB.start) ? 1 : -1;
		else return rangeA.start.isBefore(rangeB.start) ? 1 : -1;
	}).shift();
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
const HIGHLIGHT_CLASS = "restricted-editing-exception_selected";
/**
* Adds a visual highlight style to a restricted editing exception that the selection is anchored to.
*
* The highlight is turned on by adding the `.restricted-editing-exception_selected` class to the
* exception in the view:
*
* * The class is removed before the conversion starts, as callbacks added with the `'highest'` priority
* to {@link module:engine/conversion/downcastdispatcher~DowncastDispatcher} events.
* * The class is added in the view post-fixer, after other changes in the model tree are converted to the view.
*
* This way, adding and removing the highlight does not interfere with conversion.
*
* @internal
*/
function setupExceptionHighlighting(editor) {
	const view = editor.editing.view;
	const model = editor.model;
	const highlightedMarkers = /* @__PURE__ */ new Set();
	view.document.registerPostFixer((writer) => {
		const modelSelection = model.document.selection;
		const marker = getMarkerAtPosition(editor, modelSelection.anchor);
		if (!marker) return false;
		const modelWrapperElement = marker.getRange().getContainedElement();
		if (modelWrapperElement && modelWrapperElement.is("element", "restrictedEditingException")) {
			const viewElement = editor.editing.mapper.toViewElement(modelWrapperElement);
			writer.addClass(HIGHLIGHT_CLASS, viewElement);
			highlightedMarkers.add(viewElement);
		} else for (const viewElement of editor.editing.mapper.markerNameToElements(marker.name)) {
			writer.addClass(HIGHLIGHT_CLASS, viewElement);
			highlightedMarkers.add(viewElement);
		}
		return false;
	});
	editor.conversion.for("editingDowncast").add((dispatcher) => {
		dispatcher.on("insert", removeHighlight, { priority: "highest" });
		dispatcher.on("remove", removeHighlight, { priority: "highest" });
		dispatcher.on("attribute", removeHighlight, { priority: "highest" });
		dispatcher.on("cleanSelection", removeHighlight);
		function removeHighlight() {
			view.change((writer) => {
				for (const item of highlightedMarkers.values()) {
					writer.removeClass(HIGHLIGHT_CLASS, item);
					highlightedMarkers.delete(item);
				}
			});
		}
	});
}
/**
* A post-fixer that prevents removing a collapsed marker from the document.
*
* @internal
*/
function resurrectCollapsedMarkerPostFixer(editor) {
	return (writer) => {
		let changeApplied = false;
		for (const { name, data } of editor.model.document.differ.getChangedMarkers()) if (name.startsWith("restrictedEditingException") && data.newRange && data.newRange.root.rootName == "$graveyard") {
			writer.updateMarker(name, { range: writer.createRange(writer.createPositionAt(data.oldRange.start)) });
			changeApplied = true;
		}
		return changeApplied;
	};
}
/**
* A post-fixer that extends a marker when the user types on its boundaries.
*
* @internal
*/
function extendMarkerOnTypingPostFixer(editor) {
	return (writer) => {
		let changeApplied = false;
		const schema = editor.model.schema;
		for (const change of editor.model.document.differ.getChanges()) if (change.type == "insert" && schema.checkChild("$block", change.name)) {
			changeApplied = _tryExtendMarkerStart(editor, change.position, change.length, writer) || changeApplied;
			changeApplied = _tryExtendMarkedEnd(editor, change.position, change.length, writer) || changeApplied;
		}
		return changeApplied;
	};
}
/**
* A view highlight-to-marker conversion helper.
*
* @param config Conversion configuration.
* @internal
*/
function upcastHighlightToMarker(config) {
	return (dispatcher) => dispatcher.on("element", (evt, data, conversionApi) => {
		const { writer } = conversionApi;
		const matcherResult = new Matcher(config.view).match(data.viewItem);
		if (!matcherResult) return;
		const match = matcherResult.match;
		match.name = true;
		if (!conversionApi.consumable.test(data.viewItem, match)) return;
		let position = data.modelCursor;
		let wrapperElement = null;
		if (config.useWrapperElement) {
			if (!conversionApi.schema.checkChild(position, "restrictedEditingException")) return;
			wrapperElement = writer.createElement("restrictedEditingException");
			writer.insert(wrapperElement, position);
			position = writer.createPositionAt(wrapperElement, 0);
		}
		const { modelRange: convertedChildrenRange } = conversionApi.convertChildren(data.viewItem, position);
		conversionApi.consumable.consume(data.viewItem, match);
		const markerName = config.model();
		const fakeMarkerStart = writer.createElement("$marker", { "data-name": markerName });
		const fakeMarkerEnd = writer.createElement("$marker", { "data-name": markerName });
		if (wrapperElement) {
			writer.insert(fakeMarkerStart, writer.createPositionBefore(wrapperElement));
			writer.insert(fakeMarkerEnd, writer.createPositionAfter(wrapperElement));
		} else {
			writer.insert(fakeMarkerEnd, convertedChildrenRange.end);
			writer.insert(fakeMarkerStart, convertedChildrenRange.start);
		}
		data.modelRange = writer.createRange(writer.createPositionBefore(fakeMarkerStart), writer.createPositionAfter(fakeMarkerEnd));
		data.modelCursor = data.modelRange.end;
	});
}
/**
* Extend marker if change detected on marker's start position.
*/
function _tryExtendMarkerStart(editor, position, length, writer) {
	const markerAtStart = getMarkerAtPosition(editor, position.getShiftedBy(length));
	if (markerAtStart && markerAtStart.getStart().isEqual(position.getShiftedBy(length))) {
		writer.updateMarker(markerAtStart, { range: writer.createRange(markerAtStart.getStart().getShiftedBy(-length), markerAtStart.getEnd()) });
		return true;
	}
	return false;
}
/**
* Extend marker if change detected on marker's end position.
*/
function _tryExtendMarkedEnd(editor, position, length, writer) {
	const markerAtEnd = getMarkerAtPosition(editor, position);
	if (markerAtEnd && markerAtEnd.getEnd().isEqual(position)) {
		writer.updateMarker(markerAtEnd, { range: writer.createRange(markerAtEnd.getStart(), markerAtEnd.getEnd().getShiftedBy(length)) });
		return true;
	}
	return false;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/restrictededitingmodeediting
*/
const COMMAND_FORCE_DISABLE_ID = "RestrictedEditingMode";
/**
* The restricted editing mode editing feature.
*
* * It introduces the exception marker group that renders to `<span>` elements with the `restricted-editing-exception` CSS class.
* * It registers the `'goToPreviousRestrictedEditingException'` and `'goToNextRestrictedEditingException'` commands.
* * It also enables highlighting exception markers that are selected.
*/
var RestrictedEditingModeEditing = class extends Plugin {
	/**
	* Command names that are enabled outside the non-restricted regions.
	*/
	_alwaysEnabled;
	/**
	* Commands allowed in non-restricted areas.
	*
	* Commands always enabled combine typing feature commands: `'input'`, `'insertText'`, `'delete'`, and `'deleteForward'` with
	* commands defined in the feature configuration.
	*/
	_allowedInException;
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "RestrictedEditingModeEditing";
	}
	/**
	* @inheritDoc
	* @internal
	*/
	static get licenseFeatureCode() {
		return "RED";
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
	static get isPremiumPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		editor.config.define("restrictedEditing", {
			allowedCommands: [
				"bold",
				"italic",
				"link",
				"unlink"
			],
			allowedAttributes: [
				"bold",
				"italic",
				"linkHref"
			]
		});
		this._alwaysEnabled = /* @__PURE__ */ new Set(["undo", "redo"]);
		this._allowedInException = /* @__PURE__ */ new Set([
			"input",
			"insertText",
			"delete",
			"deleteForward"
		]);
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const editingView = editor.editing.view;
		editor.config.get("restrictedEditing.allowedCommands").forEach((commandName) => this._allowedInException.add(commandName));
		this._setupSchema();
		this._setupConversion();
		this._setupCommandsToggling();
		this._setupRestrictions();
		editor.commands.add("goToPreviousRestrictedEditingException", new RestrictedEditingModeNavigationCommand(editor, "backward"));
		editor.commands.add("goToNextRestrictedEditingException", new RestrictedEditingModeNavigationCommand(editor, "forward"));
		this.listenTo(editingView.document, "tab", (evt, data) => {
			const commandName = !data.shiftKey ? "goToNextRestrictedEditingException" : "goToPreviousRestrictedEditingException";
			if (editor.commands.get(commandName).isEnabled) {
				editor.execute(commandName);
				data.preventDefault();
				data.stopPropagation();
			}
			evt.stop();
		}, { context: "$capture" });
		this.listenTo(editingView.document, "keydown", getSelectAllHandler(editor), { priority: "high" });
		editingView.change((writer) => {
			for (const root of editingView.document.roots) writer.addClass("ck-restricted-editing_mode_restricted", root);
		});
		editor.data.on("set", () => {
			editor.model.change((writer) => {
				for (const marker of editor.model.markers.getMarkersGroup("restrictedEditingException")) writer.removeMarker(marker.name);
			});
		}, { priority: "high" });
	}
	/**
	* Makes the given command always enabled in the restricted editing mode (regardless
	* of selection location).
	*
	* To enable some commands in non-restricted areas of the content use
	* {@link module:restricted-editing/restrictededitingconfig~RestrictedEditingConfig#allowedCommands} configuration option.
	*
	* @param commandName Name of the command to enable.
	*/
	enableCommand(commandName) {
		this.editor.commands.get(commandName).clearForceDisabled(COMMAND_FORCE_DISABLE_ID);
		this._alwaysEnabled.add(commandName);
	}
	/**
	* Registers block exception wrapper in the schema.
	*/
	_setupSchema() {
		this.editor.model.schema.register("restrictedEditingException", {
			allowWhere: "$block",
			allowContentOf: "$container",
			isLimit: true
		});
	}
	/**
	* Sets up the restricted mode editing conversion:
	*
	* * ucpast & downcast converters,
	* * marker highlighting in the edting area,
	* * marker post-fixers.
	*/
	_setupConversion() {
		const editor = this.editor;
		const doc = editor.model.document;
		let markerNumber = 0;
		editor.conversion.for("upcast").add(upcastHighlightToMarker({
			view: {
				name: "span",
				classes: "restricted-editing-exception"
			},
			model: () => {
				markerNumber++;
				return `restrictedEditingException:inline:${markerNumber}`;
			}
		}));
		editor.conversion.for("upcast").add(upcastHighlightToMarker({
			view: {
				name: "div",
				classes: "restricted-editing-exception"
			},
			model: () => {
				markerNumber++;
				return `restrictedEditingException:block:${markerNumber}`;
			},
			useWrapperElement: true
		}));
		editor.conversion.for("downcast").elementToElement({
			model: "restrictedEditingException",
			view: {
				name: "div",
				classes: "restricted-editing-exception"
			}
		});
		editor.conversion.for("downcast").add((dispatcher) => {
			dispatcher.on("addMarker:restrictedEditingException:inline", (evt, data, conversionApi) => {
				if (!data.item) return;
				if (data.item.is("selection") || !conversionApi.schema.isInline(data.item)) return;
				if (!conversionApi.consumable.consume(data.item, evt.name)) return;
				const viewWriter = conversionApi.writer;
				const viewElement = viewWriter.createAttributeElement("span", { class: "restricted-editing-exception" }, {
					id: data.markerName,
					priority: -10
				});
				const viewRange = conversionApi.mapper.toViewRange(data.range);
				const rangeAfterWrap = viewWriter.wrap(viewRange, viewElement);
				for (const element of rangeAfterWrap.getItems()) if (element.is("attributeElement") && element.isSimilar(viewElement)) {
					conversionApi.mapper.bindElementToMarker(element, data.markerName);
					break;
				}
			});
		});
		editor.conversion.for("downcast").markerToHighlight({
			model: "restrictedEditingException:inline",
			view: () => {
				return {
					name: "span",
					classes: "restricted-editing-exception",
					priority: -10
				};
			}
		});
		editor.conversion.for("editingDowncast").markerToElement({
			model: "restrictedEditingException:inline",
			view: (markerData, { writer }) => {
				return writer.createUIElement("span", { class: "restricted-editing-exception restricted-editing-exception_collapsed" });
			}
		});
		editor.conversion.for("dataDowncast").markerToElement({
			model: "restrictedEditingException:inline",
			view: (markerData, { writer }) => {
				return writer.createEmptyElement("span", { class: "restricted-editing-exception" });
			}
		});
		doc.registerPostFixer(extendMarkerOnTypingPostFixer(editor));
		doc.registerPostFixer(resurrectCollapsedMarkerPostFixer(editor));
		doc.registerPostFixer(ensureNewMarkerIsFlatPostFixer(editor));
		setupExceptionHighlighting(editor);
	}
	/**
	* Setups additional editing restrictions beyond command toggling:
	*
	* * delete content range trimming
	* * disabling input command outside exception marker
	* * restricting clipboard holder to text only
	* * restricting text attributes in content
	*/
	_setupRestrictions() {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;
		const viewDoc = editor.editing.view.document;
		const clipboard = editor.plugins.get("ClipboardPipeline");
		this.listenTo(model, "deleteContent", restrictDeleteContent(editor), { priority: "high" });
		const insertTextCommand = editor.commands.get("insertText");
		if (insertTextCommand) this.listenTo(insertTextCommand, "execute", disallowInputExecForWrongRange(editor), { priority: "high" });
		this.listenTo(clipboard, "contentInsertion", (evt, data) => {
			if (!isRangeInsideSingleMarker(editor, selection.getFirstRange())) evt.stop();
			const marker = getMarkerAtPosition(editor, selection.focus);
			if (marker && marker.name.startsWith("restrictedEditingException:inline:")) {
				const allowedAttributes = editor.config.get("restrictedEditing.allowedAttributes");
				model.change((writer) => {
					const content = writer.createDocumentFragment();
					const textNodes = Array.from(writer.createRangeIn(data.content).getItems()).filter((node) => node.is("$textProxy"));
					for (const item of textNodes) {
						for (const attr of item.getAttributeKeys()) if (!allowedAttributes.includes(attr)) writer.removeAttribute(attr, item);
						writer.append(item, content);
					}
					data.content = content;
				});
			}
		});
		this.listenTo(viewDoc, "clipboardOutput", (evt, data) => {
			if (data.method == "cut" && !isRangeInsideSingleMarker(editor, selection.getFirstRange())) evt.stop();
		}, { priority: "high" });
		model.schema.addChildCheck((context) => {
			if (context.startsWith("$clipboardHolder")) return false;
		}, "restrictedEditingException");
	}
	/**
	* Sets up the command toggling which enables or disables commands based on the user selection.
	*/
	_setupCommandsToggling() {
		const doc = this.editor.model.document;
		this._disableCommands();
		this.listenTo(doc.selection, "change", this._checkCommands.bind(this));
		this.listenTo(doc, "change:data", this._checkCommands.bind(this));
	}
	/**
	* Checks if commands should be enabled or disabled based on the current selection.
	*/
	_checkCommands() {
		const editor = this.editor;
		const selection = editor.model.document.selection;
		if (selection.rangeCount > 1) {
			this._disableCommands();
			return;
		}
		const marker = getMarkerAtPosition(editor, selection.focus);
		this._disableCommands();
		if (isSelectionInMarker(selection, editor.model, marker)) this._enableCommands(marker);
	}
	/**
	* Enables commands in non-restricted regions.
	*/
	_enableCommands(marker) {
		const editor = this.editor;
		const selection = editor.model.document.selection;
		for (const [commandName, command] of editor.commands) {
			if (!command.affectsData || this._alwaysEnabled.has(commandName)) continue;
			if (!marker.name.startsWith("restrictedEditingException:block:") && !this._allowedInException.has(commandName)) continue;
			if (isDeleteCommandOnMarkerBoundaries(commandName, selection, getExceptionRange(marker, editor.model))) continue;
			command.clearForceDisabled(COMMAND_FORCE_DISABLE_ID);
		}
	}
	/**
	* Disables commands outside non-restricted regions.
	*/
	_disableCommands() {
		const editor = this.editor;
		for (const [commandName, command] of editor.commands) {
			if (!command.affectsData || this._alwaysEnabled.has(commandName)) continue;
			command.forceDisabled(COMMAND_FORCE_DISABLE_ID);
		}
	}
};
/**
* Helper for handling Ctrl+A keydown behaviour.
*/
function getSelectAllHandler(editor) {
	return (eventInfo, domEventData) => {
		if (getCode(domEventData) != parseKeystroke("Ctrl+A")) return;
		const model = editor.model;
		const selection = editor.model.document.selection;
		const marker = getMarkerAtPosition(editor, selection.focus);
		if (!marker) return;
		const selectionRange = selection.getFirstRange();
		const markerRange = getExceptionRange(marker, editor.model);
		if (markerRange.containsRange(selectionRange, true) || selection.isCollapsed) {
			eventInfo.stop();
			domEventData.preventDefault();
			domEventData.stopPropagation();
			model.change((writer) => {
				writer.setSelection(markerRange);
			});
		}
	};
}
/**
* Additional rule for enabling "delete" and "deleteForward" commands if selection is on range boundaries:
*
* Does not allow to enable command when selection focus is:
* - is on marker start - "delete" - to prevent removing content before marker
* - is on marker end - "deleteForward" - to prevent removing content after marker
*/
function isDeleteCommandOnMarkerBoundaries(commandName, selection, markerRange) {
	if (commandName == "delete" && selection.isCollapsed && markerRange.start.isTouching(selection.focus)) return true;
	if (commandName == "deleteForward" && selection.isCollapsed && markerRange.end.isTouching(selection.focus)) return true;
	return false;
}
/**
* Ensures that model.deleteContent() does not delete outside exception markers ranges.
*
* The enforced restrictions are:
* - only execute deleteContent() inside exception markers
* - restrict passed selection to exception marker
*/
function restrictDeleteContent(editor) {
	return (evt, args) => {
		const [selection] = args;
		const marker = getMarkerAtPosition(editor, selection.focus) || getMarkerAtPosition(editor, selection.anchor);
		if (!marker) {
			evt.stop();
			return;
		}
		if (selection.isCollapsed) return;
		const allowedToDelete = getExceptionRange(marker, editor.model).getIntersection(selection.getFirstRange());
		if (selection.is("documentSelection")) editor.model.change((writer) => {
			writer.setSelection(allowedToDelete);
		});
		else selection.setTo(allowedToDelete);
	};
}
/**
* Ensures that input command is executed with a range that is inside exception marker.
*
* This restriction is due to fact that using native spell check changes text outside exception marker.
*/
function disallowInputExecForWrongRange(editor) {
	return (evt, args) => {
		const [options] = args;
		const { range } = options;
		if (!range) return;
		if (!isRangeInsideSingleMarker(editor, range)) evt.stop();
	};
}
function isRangeInsideSingleMarker(editor, range) {
	const markerAtStart = getMarkerAtPosition(editor, range.start);
	const markerAtEnd = getMarkerAtPosition(editor, range.end);
	return markerAtStart && markerAtEnd && markerAtEnd === markerAtStart;
}
/**
* Checks if new marker range is flat. Non-flat ranges might appear during upcast conversion in nested structures, ie tables.
*
* Note: This marker fixer only consider case which is possible to create using StandardEditing mode plugin.
* Markers created by developer in the data might break in many other ways.
*
* See https://github.com/ckeditor/ckeditor5/issues/6003.
*/
function ensureNewMarkerIsFlatPostFixer(editor) {
	return (writer) => {
		let changeApplied = false;
		const changedMarkers = editor.model.document.differ.getChangedMarkers();
		for (const { data, name } of changedMarkers) {
			if (!name.startsWith("restrictedEditingException")) continue;
			const newRange = data.newRange;
			if (!data.oldRange && !newRange.isFlat) {
				const start = newRange.start;
				const end = newRange.end;
				const startIsHigherInTree = start.path.length > end.path.length;
				const fixedStart = startIsHigherInTree ? newRange.start : writer.createPositionAt(end.parent, 0);
				const fixedEnd = startIsHigherInTree ? writer.createPositionAt(start.parent, "end") : newRange.end;
				writer.updateMarker(name, { range: writer.createRange(fixedStart, fixedEnd) });
				changeApplied = true;
			}
		}
		return changeApplied;
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/restrictededitingmodeui
*/
/**
* The restricted editing mode UI feature.
*
* It introduces the `'restrictedEditing'` dropdown that offers tools to navigate between exceptions across
* the document.
*/
var RestrictedEditingModeUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "RestrictedEditingModeUI";
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
		const t = editor.t;
		editor.ui.componentFactory.add("restrictedEditing", (locale) => {
			const dropdownView = createDropdown(locale);
			const listItems = new Collection();
			this._getButtonDefinitions().forEach(({ commandName, label, keystroke }) => {
				listItems.add(this._getButtonDefinition(commandName, label, keystroke));
			});
			addListToDropdown(dropdownView, listItems, { role: "menu" });
			dropdownView.buttonView.set({
				label: t("Navigate editable regions"),
				icon: IconContentLock,
				tooltip: true,
				isEnabled: true,
				isOn: false
			});
			this.listenTo(dropdownView, "execute", (evt) => {
				const { _commandName } = evt.source;
				editor.execute(_commandName);
				editor.editing.view.focus();
			});
			return dropdownView;
		});
		editor.ui.componentFactory.add("menuBar:restrictedEditing", (locale) => {
			const menuView = new MenuBarMenuView(locale);
			const listView = new MenuBarMenuListView(locale);
			listView.set({
				ariaLabel: t("Navigate editable regions"),
				role: "menu"
			});
			menuView.buttonView.set({
				label: t("Navigate editable regions"),
				icon: IconContentLock
			});
			menuView.panelView.children.add(listView);
			this._getButtonDefinitions().forEach(({ commandName, label, keystroke }) => {
				const listItemView = new MenuBarMenuListItemView(locale, menuView);
				const buttonView = this._createMenuBarButton(label, commandName, keystroke);
				buttonView.delegate("execute").to(menuView);
				listItemView.children.add(buttonView);
				listView.items.add(listItemView);
			});
			return menuView;
		});
	}
	/**
	* Creates a button for restricted editing command to use in menu bar.
	*/
	_createMenuBarButton(label, commandName, keystroke) {
		const editor = this.editor;
		const command = editor.commands.get(commandName);
		const view = new MenuBarMenuListItemButtonView(editor.locale);
		view.set({
			label,
			keystroke,
			isEnabled: true,
			isOn: false
		});
		view.bind("isEnabled").to(command);
		this.listenTo(view, "execute", () => {
			editor.execute(commandName);
			editor.editing.view.focus();
		});
		return view;
	}
	/**
	* Returns a definition of the navigation button to be used in the dropdown.
	*
	* @param commandName The name of the command that the button represents.
	* @param label The translated label of the button.
	* @param keystroke The button keystroke.
	*/
	_getButtonDefinition(commandName, label, keystroke) {
		const command = this.editor.commands.get(commandName);
		const definition = {
			type: "button",
			model: new UIModel({
				label,
				withText: true,
				keystroke,
				withKeystroke: true,
				role: "menuitem",
				_commandName: commandName
			})
		};
		definition.model.bind("isEnabled").to(command, "isEnabled");
		return definition;
	}
	/**
	* Returns definitions for UI buttons.
	*
	* @internal
	*/
	_getButtonDefinitions() {
		const t = this.editor.locale.t;
		return [{
			commandName: "goToPreviousRestrictedEditingException",
			label: t("Previous editable region"),
			keystroke: "Shift+Tab"
		}, {
			commandName: "goToNextRestrictedEditingException",
			label: t("Next editable region"),
			keystroke: "Tab"
		}];
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/restrictededitingmode
*/
/**
* The restricted editing mode plugin.
*
* This is a "glue" plugin which loads the following plugins:
*
* * The {@link module:restricted-editing/restrictededitingmodeediting~RestrictedEditingModeEditing restricted mode editing feature}.
* * The {@link module:restricted-editing/restrictededitingmodeui~RestrictedEditingModeUI restricted mode UI feature}.
*/
var RestrictedEditingMode = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "RestrictedEditingMode";
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
		return [RestrictedEditingModeEditing, RestrictedEditingModeUI];
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/restrictededitingexceptioncommand
*/
/**
* The command that toggles exceptions from the restricted editing on text.
*/
var RestrictedEditingExceptionCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	refresh() {
		const model = this.editor.model;
		const doc = model.document;
		this.value = !!doc.selection.getAttribute("restrictedEditingException");
		this.isEnabled = model.schema.checkAttributeInSelection(doc.selection, "restrictedEditingException");
	}
	/**
	* @inheritDoc
	*/
	execute(options = {}) {
		const model = this.editor.model;
		const selection = model.document.selection;
		const valueToSet = options.forceValue === void 0 ? !this.value : options.forceValue;
		model.change((writer) => {
			const ranges = model.schema.getValidRanges(selection.getRanges(), "restrictedEditingException");
			if (selection.isCollapsed) {
				if (valueToSet) writer.setSelectionAttribute("restrictedEditingException", valueToSet);
				else {
					const isSameException = (value) => {
						return value.item.getAttribute("restrictedEditingException") === this.value;
					};
					const focus = selection.focus;
					const exceptionStart = focus.getLastMatchingPosition(isSameException, { direction: "backward" });
					const exceptionEnd = focus.getLastMatchingPosition(isSameException);
					writer.removeSelectionAttribute("restrictedEditingException");
					if (!(focus.isEqual(exceptionStart) || focus.isEqual(exceptionEnd))) writer.removeAttribute("restrictedEditingException", writer.createRange(exceptionStart, exceptionEnd));
				}
			} else for (const range of ranges) if (valueToSet) writer.setAttribute("restrictedEditingException", valueToSet, range);
			else writer.removeAttribute("restrictedEditingException", range);
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/restrictededitingexceptionblockcommand
*/
/**
* The command that toggles exception blocks for the restricted editing.
*/
var RestrictedEditingExceptionBlockCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	refresh() {
		this.value = this._getValue();
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Wraps or unwraps the selected blocks with non-restricted area.
	*
	* @fires execute
	* @param options Command options.
	* @param options.forceValue If set, it will force the command behavior. If `true`, the command will apply a block exception,
	* otherwise the command will remove the block exception. If not set, the command will act basing on its current value.
	*/
	execute(options = {}) {
		const model = this.editor.model;
		const schema = model.schema;
		const selection = model.document.selection;
		const blocks = Array.from(selection.getSelectedBlocks());
		const value = options.forceValue === void 0 ? !this.value : options.forceValue;
		model.change((writer) => {
			if (!value) {
				const blocksToUnwrap = blocks.map((block) => {
					return findExceptionContentBlock(block);
				}).filter((exception) => !!exception);
				this._removeException(writer, blocksToUnwrap);
			} else {
				const blocksToWrap = blocks.filter((block) => {
					return findException(block) || checkCanBeWrapped(schema, block);
				});
				this._applyException(writer, blocksToWrap);
			}
		});
	}
	/**
	* Checks the command's {@link #value}.
	*/
	_getValue() {
		const selection = this.editor.model.document.selection;
		const firstBlock = first(selection.getSelectedBlocks());
		return !!(firstBlock && findException(firstBlock));
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @returns Whether the command should be enabled.
	*/
	_checkEnabled() {
		if (this.value) return true;
		const selection = this.editor.model.document.selection;
		const schema = this.editor.model.schema;
		const firstBlock = first(selection.getSelectedBlocks());
		if (!firstBlock) return false;
		return checkCanBeWrapped(schema, firstBlock);
	}
	/**
	* Unwraps the exception from given blocks.
	*
	* If blocks which are supposed to be unwrapped are in the middle of an exception,
	* start it or end it, then the exception will be split (if needed) and the blocks
	* will be moved out of it, so other exception blocks remained wrapped.
	*/
	_removeException(writer, blocks) {
		getRangesOfBlockGroups(writer, blocks).reverse().forEach((groupRange) => {
			if (groupRange.start.isAtStart && groupRange.end.isAtEnd) {
				writer.unwrap(groupRange.start.parent);
				return;
			}
			if (groupRange.start.isAtStart) {
				const positionBefore = writer.createPositionBefore(groupRange.start.parent);
				writer.move(groupRange, positionBefore);
				return;
			}
			if (!groupRange.end.isAtEnd) writer.split(groupRange.end);
			const positionAfter = writer.createPositionAfter(groupRange.end.parent);
			writer.move(groupRange, positionAfter);
		});
	}
	/**
	* Applies the exception to given blocks.
	*/
	_applyException(writer, blocks) {
		const schema = this.editor.model.schema;
		const exceptionsToMerge = [];
		getRangesOfBlockGroups(writer, blocks).reverse().forEach((groupRange) => {
			let exception = findException(groupRange.start);
			if (!exception) {
				exception = writer.createElement("restrictedEditingException");
				writer.wrap(groupRange, exception);
			}
			exceptionsToMerge.push(exception);
		});
		exceptionsToMerge.reverse();
		if (exceptionsToMerge.length) {
			const previousSibling = exceptionsToMerge.at(0).previousSibling;
			const nextSibling = exceptionsToMerge.at(-1).nextSibling;
			if (previousSibling?.is("element", "restrictedEditingException")) exceptionsToMerge.unshift(previousSibling);
			if (nextSibling?.is("element", "restrictedEditingException")) exceptionsToMerge.push(nextSibling);
		}
		exceptionsToMerge.reduce((currentException, nextException) => {
			if (currentException.nextSibling == nextException) {
				writer.merge(writer.createPositionAfter(currentException));
				return currentException;
			}
			return nextException;
		});
		schema.removeDisallowedAttributes(blocks, writer);
	}
};
function findException(elementOrPosition) {
	return elementOrPosition.findAncestor("restrictedEditingException", { includeSelf: true });
}
function findExceptionContentBlock(element) {
	let node = element;
	while (node.parent) {
		if (node.parent.name == "restrictedEditingException") return node;
		node = node.parent;
	}
	return null;
}
/**
* Returns a minimal array of ranges containing groups of subsequent blocks.
*
* content:         abcdefgh
* blocks:          [ a, b, d, f, g, h ]
* output ranges:   [ab]c[d]e[fgh]
*/
function getRangesOfBlockGroups(writer, blocks) {
	let startPosition;
	let i = 0;
	const ranges = [];
	while (i < blocks.length) {
		const block = blocks[i];
		const nextBlock = blocks[i + 1];
		if (!startPosition) startPosition = writer.createPositionBefore(block);
		if (!nextBlock || block.nextSibling != nextBlock) {
			ranges.push(writer.createRange(startPosition, writer.createPositionAfter(block)));
			startPosition = null;
		}
		i++;
	}
	return ranges;
}
/**
* Checks whether exception can wrap the block.
*/
function checkCanBeWrapped(schema, block) {
	const parentContext = schema.createContext(block.parent);
	if (!schema.checkChild(parentContext, "restrictedEditingException")) return false;
	if (!schema.checkChild(parentContext.push("restrictedEditingException"), block)) return false;
	return true;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/restrictededitingexceptionautocommand
*/
/**
* The command that toggles exceptions from the restricted editing on text or on blocks.
*/
var RestrictedEditingExceptionAutoCommand = class extends Command {
	/**
	* The inline exception command.
	*/
	_inlineCommand;
	/**
	* The block exception command.
	*/
	_blockCommand;
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		this._inlineCommand = editor.commands.get("restrictedEditingException");
		this._blockCommand = editor.commands.get("restrictedEditingExceptionBlock");
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.value = this._inlineCommand.value || this._blockCommand.value;
		this.isEnabled = this._inlineCommand.isEnabled || this._blockCommand.isEnabled;
	}
	/**
	* @inheritDoc
	*/
	execute() {
		const editor = this.editor;
		if (this._inlineCommand.value) editor.execute("restrictedEditingException");
		else if (this._blockCommand.value) editor.execute("restrictedEditingExceptionBlock");
		else if (this._inlineCommand.isEnabled && !this._blockCommand.isEnabled) editor.execute("restrictedEditingException");
		else if (this._blockCommand.isEnabled && !this._inlineCommand.isEnabled) editor.execute("restrictedEditingExceptionBlock");
		else {
			const schema = editor.model.schema;
			const selection = editor.model.document.selection;
			const selectedElement = selection.getSelectedElement();
			if (selection.isCollapsed || selectedElement && schema.isObject(selectedElement) && schema.isBlock(selectedElement) || count(selection.getSelectedBlocks()) > 1) editor.execute("restrictedEditingExceptionBlock");
			else editor.execute("restrictedEditingException");
		}
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/standardeditingmodeediting
*/
/**
* The standard editing mode editing feature.
*
* * It introduces the `restrictedEditingException` text attribute that is rendered as
* a `<span>` element with the `restricted-editing-exception` CSS class.
* * It registers the `'restrictedEditingException'` command.
*/
var StandardEditingModeEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "StandardEditingModeEditing";
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
		const schema = editor.model.schema;
		schema.extend("$text", { allowAttributes: ["restrictedEditingException"] });
		schema.register("restrictedEditingException", {
			allowWhere: "$container",
			allowContentOf: "$container"
		});
		schema.addChildCheck((context) => {
			for (const item of context) if (item.name == "restrictedEditingException") return false;
		}, "restrictedEditingException");
		schema.addAttributeCheck((context) => {
			for (const item of context) if (item.name == "restrictedEditingException") return false;
		}, "restrictedEditingException");
		editor.model.document.registerPostFixer((writer) => {
			const changes = editor.model.document.differ.getChanges();
			const unwrap = /* @__PURE__ */ new Set();
			const remove = /* @__PURE__ */ new Set();
			const merge = /* @__PURE__ */ new Set();
			let changed = false;
			for (const entry of changes) if (entry.type == "insert") {
				const range = writer.createRange(entry.position, entry.position.getShiftedBy(entry.length));
				for (const child of range.getItems()) if (child.is("element", "restrictedEditingException")) {
					if (!schema.checkChild(writer.createPositionBefore(child), child)) unwrap.add(child);
					else if (child.isEmpty) remove.add(child);
					else merge.add(child);
				} else if (child.is("$textProxy") && child.hasAttribute("restrictedEditingException") && !schema.checkAttribute(child, "restrictedEditingException")) {
					writer.removeAttribute("restrictedEditingException", child);
					changed = true;
				}
			} else if (entry.type == "remove") {
				const parent = entry.position.parent;
				if (parent.is("element", "restrictedEditingException") && parent.isEmpty) remove.add(parent);
				for (const child of parent.getChildren()) if (child.is("element", "restrictedEditingException")) merge.add(child);
			}
			for (const child of unwrap) {
				writer.unwrap(child);
				changed = true;
			}
			for (const child of remove) {
				writer.remove(child);
				changed = true;
			}
			for (const child of merge) {
				if (child.root.rootName == "$graveyard") continue;
				const nodeBefore = child.previousSibling;
				const nodeAfter = child.nextSibling;
				if (nodeBefore && nodeBefore.is("element", "restrictedEditingException")) writer.merge(writer.createPositionBefore(child));
				if (nodeAfter && nodeAfter.is("element", "restrictedEditingException")) writer.merge(writer.createPositionAfter(child));
			}
			return changed;
		});
		editor.conversion.for("upcast").elementToAttribute({
			model: "restrictedEditingException",
			view: {
				name: "span",
				classes: "restricted-editing-exception"
			}
		}).elementToElement({
			model: "restrictedEditingException",
			view: {
				name: "div",
				classes: "restricted-editing-exception"
			}
		});
		registerFallbackUpcastConverter(editor);
		editor.conversion.for("downcast").attributeToElement({
			model: "restrictedEditingException",
			view: (modelAttributeValue, { writer }) => {
				if (modelAttributeValue) return writer.createAttributeElement("span", { class: "restricted-editing-exception" }, { priority: -10 });
			}
		}).elementToElement({
			model: "restrictedEditingException",
			view: {
				name: "div",
				classes: "restricted-editing-exception"
			}
		});
		editor.commands.add("restrictedEditingException", new RestrictedEditingExceptionCommand(editor));
		editor.commands.add("restrictedEditingExceptionBlock", new RestrictedEditingExceptionBlockCommand(editor));
		editor.commands.add("restrictedEditingExceptionAuto", new RestrictedEditingExceptionAutoCommand(editor));
		editor.editing.view.change((writer) => {
			for (const root of editor.editing.view.document.roots) writer.addClass("ck-restricted-editing_mode_standard", root);
		});
	}
};
/**
* Fallback upcast converter for empty exception span inside a table cell.
*/
function registerFallbackUpcastConverter(editor) {
	const matcher = new Matcher({
		name: "span",
		classes: "restricted-editing-exception"
	});
	editor.conversion.for("upcast").add((dispatcher) => dispatcher.on("element:span", (evt, data, conversionApi) => {
		const matcherResult = matcher.match(data.viewItem);
		if (!matcherResult) return;
		const match = matcherResult.match;
		if (!conversionApi.consumable.test(data.viewItem, match)) return;
		const modelText = conversionApi.writer.createText(" ", { restrictedEditingException: true });
		if (!conversionApi.safeInsert(modelText, data.modelCursor)) return;
		conversionApi.consumable.consume(data.viewItem, match);
		data.modelRange = conversionApi.writer.createRange(data.modelCursor, data.modelCursor.getShiftedBy(modelText.offsetSize));
		data.modelCursor = data.modelRange.end;
	}, { priority: "low" }));
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/standardeditingmodeui
*/
/**
* The standard editing mode UI feature.
*
* It introduces the `'restrictedEditingException'` button that marks text as unrestricted for editing.
*/
var StandardEditingModeUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "StandardEditingModeUI";
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
		const componentFactory = editor.ui.componentFactory;
		componentFactory.add("restrictedEditingException:dropdown", (locale) => {
			const dropdownView = createDropdown(locale);
			const t = locale.t;
			const buttons = [componentFactory.create("restrictedEditingException:inline"), componentFactory.create("restrictedEditingException:block")];
			for (const button of buttons) button.set({
				withText: true,
				tooltip: false
			});
			addToolbarToDropdown(dropdownView, buttons, {
				enableActiveItemFocusOnDropdownOpen: true,
				isVertical: true,
				ariaLabel: t("Enable editing")
			});
			dropdownView.buttonView.set({
				label: t("Enable editing"),
				icon: IconContentUnlock,
				tooltip: true
			});
			dropdownView.extendTemplate({ attributes: { class: "ck-restricted-editing-dropdown" } });
			dropdownView.bind("isEnabled").toMany(buttons, "isEnabled", (...areEnabled) => {
				return areEnabled.some((isEnabled) => isEnabled);
			});
			this.listenTo(dropdownView, "execute", () => {
				editor.editing.view.focus();
			});
			return dropdownView;
		});
		componentFactory.add("restrictedEditingException:inline", () => {
			const button = this._createButton("restrictedEditingException", ButtonView);
			button.set({ tooltip: true });
			return button;
		});
		componentFactory.add("restrictedEditingException:block", () => {
			const button = this._createButton("restrictedEditingExceptionBlock", ButtonView);
			button.set({ tooltip: true });
			return button;
		});
		componentFactory.add("menuBar:restrictedEditingException:inline", () => {
			return this._createButton("restrictedEditingException", MenuBarMenuListItemButtonView);
		});
		componentFactory.add("menuBar:restrictedEditingException:block", () => {
			return this._createButton("restrictedEditingExceptionBlock", MenuBarMenuListItemButtonView);
		});
		componentFactory.add("restrictedEditingException:auto", () => {
			const button = this._createButton("restrictedEditingExceptionAuto", ButtonView);
			button.set({ tooltip: true });
			return button;
		});
		componentFactory.add("menuBar:restrictedEditingException:auto", () => {
			return this._createButton("restrictedEditingExceptionAuto", MenuBarMenuListItemButtonView);
		});
		componentFactory.add("restrictedEditingException", () => {
			return componentFactory.create("restrictedEditingException:inline");
		});
		componentFactory.add("menuBar:restrictedEditingException", () => {
			return componentFactory.create("menuBar:restrictedEditingException:inline");
		});
	}
	/**
	* Creates a button for restricted editing exception command to use either in toolbar or in menu bar.
	*/
	_createButton(commandName, ButtonClass) {
		const editor = this.editor;
		const locale = editor.locale;
		const command = this.editor.commands.get(commandName);
		const view = new ButtonClass(locale);
		const t = locale.t;
		view.icon = IconContentUnlock;
		view.isToggleable = true;
		view.bind("isOn", "isEnabled").to(command, "value", "isEnabled");
		if (commandName == "restrictedEditingExceptionAuto") view.bind("label").to(command, "value", (value) => {
			return value ? t("Disable editing") : t("Enable editing");
		});
		else if (commandName == "restrictedEditingExceptionBlock") view.bind("label").to(command, "value", (value) => {
			return value ? t("Disable block editing") : t("Enable block editing");
		});
		else view.bind("label").to(command, "value", (value) => {
			return value ? t("Disable inline editing") : t("Enable inline editing");
		});
		this.listenTo(view, "execute", () => {
			editor.execute(commandName);
			editor.editing.view.focus();
		});
		return view;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/standardeditingmode
*/
/**
* The standard editing mode plugin.
*
* This is a "glue" plugin that loads the following plugins:
*
* * The {@link module:restricted-editing/standardeditingmodeediting~StandardEditingModeEditing standard mode editing feature}.
* * The {@link module:restricted-editing/standardeditingmodeui~StandardEditingModeUI standard mode UI feature}.
*/
var StandardEditingMode = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "StandardEditingMode";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	static get requires() {
		return [StandardEditingModeEditing, StandardEditingModeUI];
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { RestrictedEditingExceptionAutoCommand, RestrictedEditingExceptionBlockCommand, RestrictedEditingExceptionCommand, RestrictedEditingMode, RestrictedEditingModeEditing, RestrictedEditingModeNavigationCommand, RestrictedEditingModeUI, StandardEditingMode, StandardEditingModeEditing, StandardEditingModeUI, extendMarkerOnTypingPostFixer as _extendRestrictedEditingMarkerOnTypingPostFixer, getMarkerAtPosition as _getRestrictedEditingMarkerAtPosition, isPositionInRangeBoundaries as _isRestrictedEditingPositionInRangeBoundaries, isSelectionInMarker as _isRestrictedEditingSelectionInMarker, resurrectCollapsedMarkerPostFixer as _resurrectRestrictedEditingCollapsedMarkerPostFixer, setupExceptionHighlighting as _setupRestrictedEditingExceptionHighlighting, upcastHighlightToMarker as _upcastRestrictedEditingHighlightToMarker };
//# sourceMappingURL=index.js.map