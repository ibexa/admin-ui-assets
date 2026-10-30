/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { EventInfo, ObservableMixin, count, env, isInsideCombinedSymbol, isInsideEmojiSequence, isInsideSurrogatePair, keyCodes } from "@ckeditor/ckeditor5-utils";
import { BubblingEventInfo, FocusObserver, ModelLiveRange, MouseObserver, Observer, TouchObserver, ViewDocumentDomEventData, _tryFixingModelRange } from "@ckeditor/ckeditor5-engine";
import { debounce, escapeRegExp } from "es-toolkit/compat";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Change buffer allows to group atomic changes (like characters that have been typed) into
* {@link module:engine/model/batch~Batch batches}.
*
* Batches represent single undo steps, hence changes added to one single batch are undone together.
*
* The buffer has a configurable limit of atomic changes that it can accommodate. After the limit was
* exceeded (see {@link ~TypingChangeBuffer#input}), a new batch is created in {@link ~TypingChangeBuffer#batch}.
*
* To use the change buffer you need to let it know about the number of changes that were added to the batch:
*
* ```ts
* const buffer = new ChangeBuffer( model, LIMIT );
*
* // Later on in your feature:
* buffer.batch.insert( pos, insertedCharacters );
* buffer.input( insertedCharacters.length );
* ```
*/
var TypingChangeBuffer = class {
	/**
	* The model instance.
	*/
	model;
	/**
	* The maximum number of atomic changes which can be contained in one batch.
	*/
	limit;
	/**
	* Whether the buffer is locked. A locked buffer cannot be reset unless it gets unlocked.
	*/
	_isLocked;
	/**
	* The number of atomic changes in the buffer. Once it exceeds the {@link #limit},
	* the {@link #batch batch} is set to a new one.
	*/
	_size;
	/**
	* The current batch instance.
	*/
	_batch = null;
	/**
	* The callback to document the change event which later needs to be removed.
	*/
	_changeCallback;
	/**
	* The callback to document selection `change:attribute` and `change:range` events which resets the buffer.
	*/
	_selectionChangeCallback;
	/**
	* Creates a new instance of the change buffer.
	*
	* @param limit The maximum number of atomic changes which can be contained in one batch.
	*/
	constructor(model, limit = 20) {
		this.model = model;
		this._size = 0;
		this.limit = limit;
		this._isLocked = false;
		this._changeCallback = (evt, batch) => {
			if (batch.isLocal && batch.isUndoable && batch !== this._batch) this._reset(true);
		};
		this._selectionChangeCallback = () => {
			this._reset();
		};
		this.model.document.on("change", this._changeCallback);
		this.model.document.selection.on("change:range", this._selectionChangeCallback);
		this.model.document.selection.on("change:attribute", this._selectionChangeCallback);
	}
	/**
	* The current batch to which a feature should add its operations. Once the {@link #size}
	* is reached or exceeds the {@link #limit}, the batch is set to a new instance and the size is reset.
	*/
	get batch() {
		if (!this._batch) this._batch = this.model.createBatch({ isTyping: true });
		return this._batch;
	}
	/**
	* The number of atomic changes in the buffer. Once it exceeds the {@link #limit},
	* the {@link #batch batch} is set to a new one.
	*/
	get size() {
		return this._size;
	}
	/**
	* The input number of changes into the buffer. Once the {@link #size} is
	* reached or exceeds the {@link #limit}, the batch is set to a new instance and the size is reset.
	*
	* @param changeCount The number of atomic changes to input.
	*/
	input(changeCount) {
		this._size += changeCount;
		if (this._size >= this.limit) this._reset(true);
	}
	/**
	* Whether the buffer is locked. A locked buffer cannot be reset unless it gets unlocked.
	*/
	get isLocked() {
		return this._isLocked;
	}
	/**
	* Locks the buffer.
	*/
	lock() {
		this._isLocked = true;
	}
	/**
	* Unlocks the buffer.
	*/
	unlock() {
		this._isLocked = false;
	}
	/**
	* Destroys the buffer.
	*/
	destroy() {
		this.model.document.off("change", this._changeCallback);
		this.model.document.selection.off("change:range", this._selectionChangeCallback);
		this.model.document.selection.off("change:attribute", this._selectionChangeCallback);
	}
	/**
	* Resets the change buffer.
	*
	* @param ignoreLock Whether internal lock {@link #isLocked} should be ignored.
	*/
	_reset(ignoreLock = false) {
		if (!this.isLocked || ignoreLock) {
			this._batch = null;
			this._size = 0;
		}
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/inserttextcommand
*/
/**
* The insert text command. Used by the {@link module:typing/input~Input input feature} to handle typing.
*/
var InsertTextCommand = class extends Command {
	/**
	* Typing's change buffer used to group subsequent changes into batches.
	*/
	_buffer;
	/**
	* Creates an instance of the command.
	*
	* @param undoStepSize The maximum number of atomic changes
	* which can be contained in one batch in the command buffer.
	*/
	constructor(editor, undoStepSize) {
		super(editor);
		this._buffer = new TypingChangeBuffer(editor.model, undoStepSize);
		this._isEnabledBasedOnSelection = false;
	}
	/**
	* The current change buffer.
	*/
	get buffer() {
		return this._buffer;
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this._buffer.destroy();
	}
	/**
	* Executes the input command. It replaces the content within the given range with the given text.
	* Replacing is a two step process, first the content within the range is removed and then the new text is inserted
	* at the beginning of the range (which after the removal is a collapsed range).
	*
	* @fires execute
	* @param options The command options.
	*/
	execute(options = {}) {
		const model = this.editor.model;
		const doc = model.document;
		const text = options.text || "";
		const textInsertions = text.length;
		let selection = doc.selection;
		if (options.selection) selection = options.selection;
		else if (options.range) selection = model.createSelection(options.range);
		if (!model.canEditAt(selection)) return;
		const resultRange = options.resultRange;
		model.enqueueChange(this._buffer.batch, (writer) => {
			this._buffer.lock();
			const selectionAttributes = Array.from(doc.selection.getAttributes());
			model.deleteContent(selection);
			if (text) model.insertContent(writer.createText(text, selectionAttributes), selection);
			if (resultRange) writer.setSelection(resultRange);
			else if (!selection.is("documentSelection")) writer.setSelection(selection);
			this._buffer.unlock();
			this._buffer.input(textInsertions);
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/inserttextobserver
*/
const TYPING_INPUT_TYPES = ["insertText", "insertReplacementText"];
const TYPING_INPUT_TYPES_ANDROID = [...TYPING_INPUT_TYPES, "insertCompositionText"];
/**
* Text insertion observer introduces the {@link module:engine/view/document~ViewDocument#event:insertText} event.
*/
var InsertTextObserver = class extends Observer {
	/**
	* Instance of the focus observer. Insert text observer calls
	* {@link module:engine/view/observer/focusobserver~FocusObserver#flush} to mark the latest focus change as complete.
	*/
	focusObserver;
	/**
	* @inheritDoc
	*/
	constructor(view) {
		super(view);
		this.focusObserver = view.getObserver(FocusObserver);
		const typingInputTypes = env.isAndroid ? TYPING_INPUT_TYPES_ANDROID : TYPING_INPUT_TYPES;
		const viewDocument = view.document;
		viewDocument.on("beforeinput", (evt, data) => {
			if (!this.isEnabled) return;
			const { data: text, targetRanges, inputType, domEvent, isComposing } = data;
			if (!typingInputTypes.includes(inputType)) return;
			this.focusObserver.flush();
			const eventInfo = new EventInfo(viewDocument, "insertText");
			viewDocument.fire(eventInfo, new ViewDocumentDomEventData(view, domEvent, {
				text,
				selection: view.createSelection(targetRanges),
				isComposing
			}));
			if (eventInfo.stop.called) evt.stop();
		});
		if (!env.isAndroid) viewDocument.on("compositionend", (evt, { data, domEvent }) => {
			if (!this.isEnabled) return;
			if (!data) return;
			viewDocument.fire("insertText", new ViewDocumentDomEventData(view, domEvent, {
				text: data,
				isComposing: true
			}));
		}, { priority: "low" });
	}
	/**
	* @inheritDoc
	*/
	observe() {}
	/**
	* @inheritDoc
	*/
	stopObserving() {}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/input
*/
/**
* Handles text input coming from the keyboard or other input methods.
*/
var Input = class extends Plugin {
	/**
	* The queue of `insertText` command executions that are waiting for the DOM to get updated after beforeinput event.
	*/
	_typingQueue;
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "Input";
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
		const model = editor.model;
		const view = editor.editing.view;
		const mapper = editor.editing.mapper;
		const modelSelection = model.document.selection;
		this._typingQueue = new TypingQueue(editor);
		view.addObserver(InsertTextObserver);
		const insertTextCommand = new InsertTextCommand(editor, editor.config.get("typing.undoStep") || 20);
		editor.commands.add("insertText", insertTextCommand);
		editor.commands.add("input", insertTextCommand);
		this.listenTo(view.document, "beforeinput", () => {
			this._typingQueue.flush("next beforeinput");
		}, { priority: "high" });
		this.listenTo(view.document, "insertText", (evt, data) => {
			const { text, selection: viewSelection } = data;
			if (view.document.selection.isFake && viewSelection && view.document.selection.isSimilar(viewSelection)) data.preventDefault();
			if (viewSelection && Array.from(viewSelection.getRanges()).some((range) => !range.isCollapsed)) data.preventDefault();
			if (!insertTextCommand.isEnabled) {
				data.preventDefault();
				return;
			}
			let modelRanges;
			if (viewSelection) modelRanges = Array.from(viewSelection.getRanges()).filter((viewRange) => {
				return viewRange.root.is("rootElement");
			}).map((viewRange) => mapper.toModelRange(viewRange)).map((modelRange) => _tryFixingModelRange(modelRange, model.schema) || modelRange);
			if (!modelRanges || !modelRanges.length) modelRanges = Array.from(modelSelection.getRanges());
			let insertText = text;
			if (env.isAndroid) {
				const selectedText = Array.from(modelRanges[0].getItems()).reduce((rangeText, node) => {
					return rangeText + (node.is("$textProxy") ? node.data : "");
				}, "");
				if (selectedText) {
					if (selectedText.length <= insertText.length) {
						if (insertText.startsWith(selectedText)) {
							insertText = insertText.substring(selectedText.length);
							modelRanges[0].start = modelRanges[0].start.getShiftedBy(selectedText.length);
						}
					} else if (selectedText.startsWith(insertText)) {
						modelRanges[0].start = modelRanges[0].start.getShiftedBy(insertText.length);
						insertText = "";
					}
				}
				if (insertText.length == 0 && modelRanges[0].isCollapsed) return;
			}
			const commandData = {
				text: insertText,
				selection: model.createSelection(modelRanges)
			};
			this._typingQueue.push(commandData, Boolean(data.isComposing));
			if (data.domEvent.defaultPrevented) this._typingQueue.flush("beforeinput default prevented");
		});
		if (env.isAndroid) this.listenTo(view.document, "keydown", (evt, data) => {
			if (modelSelection.isCollapsed || data.keyCode != 229 || !view.document.isComposing) return;
			deleteSelectionContent(model, insertTextCommand);
		});
		else this.listenTo(view.document, "compositionstart", () => {
			if (modelSelection.isCollapsed) return;
			deleteSelectionContent(model, insertTextCommand);
		}, { priority: "high" });
		this.listenTo(view.document, "mutations", (evt, { mutations }) => {
			if (this._typingQueue.hasAffectedElements()) for (const { node } of mutations) {
				const viewElement = findMappedViewAncestor(node, mapper);
				const modelElement = mapper.toModelElement(viewElement);
				if (this._typingQueue.isElementAffected(modelElement)) {
					this._typingQueue.flush("mutations");
					return;
				}
			}
		});
		this.listenTo(view.document, "compositionend", () => {
			this._typingQueue.flush("before composition end");
		}, { priority: "high" });
		this.listenTo(view.document, "compositionend", () => {
			this._typingQueue.flush("after composition end");
			const mutations = [];
			if (this._typingQueue.hasAffectedElements()) for (const element of this._typingQueue.flushAffectedElements()) {
				const viewElement = mapper.toViewElement(element);
				if (!viewElement) continue;
				mutations.push({
					type: "children",
					node: viewElement
				});
			}
			if (mutations.length || !env.isAndroid) view.document.fire("mutations", { mutations });
		}, { priority: "lowest" });
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this._typingQueue.destroy();
	}
};
/**
* The queue of `insertText` command executions that are waiting for the DOM to get updated after beforeinput event.
*/
var TypingQueue = class {
	/**
	* The editor instance.
	*/
	editor;
	/**
	* Debounced queue flush as a safety mechanism for cases of mutation observer not triggering.
	*/
	flushDebounced = debounce(() => this.flush("timeout"), 50);
	/**
	* The queue of `insertText` command executions that are waiting for the DOM to get updated after beforeinput event.
	*/
	_queue = [];
	/**
	* Whether there is any composition enqueued or plain typing only.
	*/
	_isComposing = false;
	/**
	* A set of model elements. The typing happened in those elements. It's used for mutations check.
	*/
	_affectedElements = /* @__PURE__ */ new Set();
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		this.editor = editor;
	}
	/**
	* Destroys the helper object.
	*/
	destroy() {
		this.flushDebounced.cancel();
		this._affectedElements.clear();
		while (this._queue.length) this.shift();
	}
	/**
	* Returns the size of the queue.
	*/
	get length() {
		return this._queue.length;
	}
	/**
	* Push next insertText command data to the queue.
	*/
	push(commandData, isComposing) {
		const commandLiveData = { text: commandData.text };
		if (commandData.selection) {
			commandLiveData.selectionRanges = [];
			for (const range of commandData.selection.getRanges()) {
				commandLiveData.selectionRanges.push(ModelLiveRange.fromRange(range));
				this._affectedElements.add(range.start.parent);
			}
		}
		this._queue.push(commandLiveData);
		this._isComposing ||= isComposing;
		this.flushDebounced();
	}
	/**
	* Shift the first item from the insertText command data queue.
	*/
	shift() {
		const commandLiveData = this._queue.shift();
		const commandData = { text: commandLiveData.text };
		if (commandLiveData.selectionRanges) {
			const ranges = commandLiveData.selectionRanges.map((liveRange) => detachLiveRange(liveRange)).filter((range) => !!range);
			if (ranges.length) commandData.selection = this.editor.model.createSelection(ranges);
		}
		return commandData;
	}
	/**
	* Applies all queued insertText command executions.
	*
	* @param reason Used only for debugging.
	*/
	flush(reason) {
		const editor = this.editor;
		const model = editor.model;
		const view = editor.editing.view;
		this.flushDebounced.cancel();
		if (!this._queue.length) return;
		const buffer = editor.commands.get("insertText").buffer;
		model.enqueueChange(buffer.batch, () => {
			buffer.lock();
			while (this._queue.length) {
				const commandData = this.shift();
				editor.execute("insertText", commandData);
			}
			buffer.unlock();
			if (!this._isComposing) this._affectedElements.clear();
			this._isComposing = false;
		});
		view.scrollToTheSelection();
	}
	/**
	* Returns `true` if the given model element is related to recent typing.
	*/
	isElementAffected(element) {
		return this._affectedElements.has(element);
	}
	/**
	* Returns `true` if there are any affected elements in the queue.
	*/
	hasAffectedElements() {
		return this._affectedElements.size > 0;
	}
	/**
	* Returns an array of typing-related elements and clears the internal list.
	*/
	flushAffectedElements() {
		const result = Array.from(this._affectedElements);
		this._affectedElements.clear();
		return result;
	}
};
/**
* Deletes the content selected by the document selection at the start of composition.
*/
function deleteSelectionContent(model, insertTextCommand) {
	if (!insertTextCommand.isEnabled) return;
	const buffer = insertTextCommand.buffer;
	buffer.lock();
	model.enqueueChange(buffer.batch, () => {
		model.deleteContent(model.document.selection);
	});
	buffer.unlock();
}
/**
* Detaches a ModelLiveRange and returns the static range from it.
*/
function detachLiveRange(liveRange) {
	const range = liveRange.toRange();
	liveRange.detach();
	if (range.root.rootName == "$graveyard") return null;
	return range;
}
/**
* For the given `viewNode`, finds and returns the closest ancestor of this node that has a mapping to the model.
*/
function findMappedViewAncestor(viewNode, mapper) {
	let node = viewNode.is("$text") ? viewNode.parent : viewNode;
	while (!mapper.toModelElement(node)) node = node.parent;
	return node;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/deletecommand
*/
/**
* The delete command. Used by the {@link module:typing/delete~Delete delete feature} to handle the <kbd>Delete</kbd> and
* <kbd>Backspace</kbd> keys.
*/
var DeleteCommand = class extends Command {
	/**
	* The directionality of the delete describing in what direction it should
	* consume the content when the selection is collapsed.
	*/
	direction;
	/**
	* Delete's change buffer used to group subsequent changes into batches.
	*/
	_buffer;
	/**
	* Creates an instance of the command.
	*
	* @param direction The directionality of the delete describing in what direction it
	* should consume the content when the selection is collapsed.
	*/
	constructor(editor, direction) {
		super(editor);
		this.direction = direction;
		this._buffer = new TypingChangeBuffer(editor.model, editor.config.get("typing.undoStep"));
		this._isEnabledBasedOnSelection = false;
	}
	/**
	* The current change buffer.
	*/
	get buffer() {
		return this._buffer;
	}
	/**
	* Executes the delete command. Depending on whether the selection is collapsed or not, deletes its content
	* or a piece of content in the {@link #direction defined direction}.
	*
	* @fires execute
	* @param options The command options.
	* @param options.unit See {@link module:engine/model/utils/modifyselection~modifySelection}'s options.
	* @param options.sequence A number describing which subsequent delete event it is without the key being released.
	* See the {@link module:engine/view/document~ViewDocument#event:delete} event data.
	* @param options.selection Selection to remove. If not set, current model selection will be used.
	*/
	execute(options = {}) {
		const model = this.editor.model;
		const doc = model.document;
		model.enqueueChange(this._buffer.batch, (writer) => {
			this._buffer.lock();
			const selection = writer.createSelection(options.selection || doc.selection);
			if (!model.canEditAt(selection)) return;
			const sequence = options.sequence || 1;
			const doNotResetEntireContent = selection.isCollapsed;
			if (selection.isCollapsed) model.modifySelection(selection, {
				direction: this.direction,
				unit: options.unit,
				treatEmojiAsSingleUnit: true
			});
			if (this._shouldEntireContentBeReplacedWithParagraph(sequence)) {
				this._replaceEntireContentWithParagraph(writer);
				return;
			}
			if (this._shouldReplaceFirstBlockWithParagraph(selection, sequence)) {
				this.editor.execute("paragraph", { selection });
				return;
			}
			if (selection.isCollapsed) return;
			let changeCount = 0;
			selection.getFirstRange().getMinimalFlatRanges().forEach((range) => {
				changeCount += count(range.getWalker({
					singleCharacters: true,
					ignoreElementEnd: true,
					shallow: true
				}));
			});
			model.deleteContent(selection, {
				doNotResetEntireContent,
				direction: this.direction
			});
			this._buffer.input(changeCount);
			writer.setSelection(selection);
			this._buffer.unlock();
		});
	}
	/**
	* If the user keeps <kbd>Backspace</kbd> or <kbd>Delete</kbd> key pressed, the content of the current
	* editable will be cleared. However, this will not yet lead to resetting the remaining block to a paragraph
	* (which happens e.g. when the user does <kbd>Ctrl</kbd> + <kbd>A</kbd>, <kbd>Backspace</kbd>).
	*
	* But, if the user pressed the key in an empty editable for the first time,
	* we want to replace the entire content with a paragraph if:
	*
	* * the current limit element is empty,
	* * the paragraph is allowed in the limit element,
	* * the limit doesn't already have a paragraph inside.
	*
	* See https://github.com/ckeditor/ckeditor5-typing/issues/61.
	*
	* @param sequence A number describing which subsequent delete event it is without the key being released.
	*/
	_shouldEntireContentBeReplacedWithParagraph(sequence) {
		if (sequence > 1) return false;
		const model = this.editor.model;
		const selection = model.document.selection;
		const limitElement = model.schema.getLimitElement(selection);
		if (!(selection.isCollapsed && selection.containsEntireContent(limitElement))) return false;
		if (!model.schema.checkChild(limitElement, "paragraph")) return false;
		const limitElementFirstChild = limitElement.getChild(0);
		if (limitElementFirstChild && limitElementFirstChild.is("element", "paragraph")) return false;
		return true;
	}
	/**
	* The entire content is replaced with the paragraph. Selection is moved inside the paragraph.
	*
	* @param writer The model writer.
	*/
	_replaceEntireContentWithParagraph(writer) {
		const model = this.editor.model;
		const selection = model.document.selection;
		const limitElement = model.schema.getLimitElement(selection);
		const paragraph = writer.createElement("paragraph");
		writer.remove(writer.createRangeIn(limitElement));
		writer.insert(paragraph, limitElement);
		writer.setSelection(paragraph, 0);
	}
	/**
	* Checks if the selection is inside an empty element that is the first child of the limit element
	* and should be replaced with a paragraph.
	*
	* @param selection The selection.
	* @param sequence A number describing which subsequent delete event it is without the key being released.
	*/
	_shouldReplaceFirstBlockWithParagraph(selection, sequence) {
		const model = this.editor.model;
		if (sequence > 1 || this.direction != "backward") return false;
		if (!selection.isCollapsed) return false;
		const position = selection.getFirstPosition();
		const limitElement = model.schema.getLimitElement(position);
		const limitElementFirstChild = limitElement.getChild(0);
		if (position.parent != limitElementFirstChild) return false;
		if (!selection.containsEntireContent(limitElementFirstChild)) return false;
		if (!model.schema.checkChild(limitElement, "paragraph")) return false;
		if (limitElementFirstChild.name == "paragraph") return false;
		return true;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/deleteobserver
*/
const DELETE_CHARACTER = "character";
const DELETE_WORD = "word";
const DELETE_CODE_POINT = "codePoint";
const DELETE_SELECTION = "selection";
const DELETE_BACKWARD = "backward";
const DELETE_FORWARD = "forward";
const DELETE_EVENT_TYPES = {
	deleteContent: {
		unit: DELETE_SELECTION,
		direction: DELETE_BACKWARD
	},
	deleteContentBackward: {
		unit: DELETE_CODE_POINT,
		direction: DELETE_BACKWARD
	},
	deleteWordBackward: {
		unit: DELETE_WORD,
		direction: DELETE_BACKWARD
	},
	deleteHardLineBackward: {
		unit: DELETE_SELECTION,
		direction: DELETE_BACKWARD
	},
	deleteSoftLineBackward: {
		unit: DELETE_SELECTION,
		direction: DELETE_BACKWARD
	},
	deleteContentForward: {
		unit: DELETE_CHARACTER,
		direction: DELETE_FORWARD
	},
	deleteWordForward: {
		unit: DELETE_WORD,
		direction: DELETE_FORWARD
	},
	deleteHardLineForward: {
		unit: DELETE_SELECTION,
		direction: DELETE_FORWARD
	},
	deleteSoftLineForward: {
		unit: DELETE_SELECTION,
		direction: DELETE_FORWARD
	}
};
/**
* Delete observer introduces the {@link module:engine/view/document~ViewDocument#event:delete} event.
*
* @internal
*/
var DeleteObserver = class extends Observer {
	/**
	* @inheritDoc
	*/
	constructor(view) {
		super(view);
		const document = view.document;
		let sequence = 0;
		document.on("keydown", () => {
			sequence++;
		});
		document.on("keyup", () => {
			sequence = 0;
		});
		document.on("beforeinput", (evt, data) => {
			if (!this.isEnabled) return;
			const { targetRanges, domEvent, inputType } = data;
			const deleteEventSpec = DELETE_EVENT_TYPES[inputType];
			if (!deleteEventSpec) return;
			const deleteData = {
				direction: deleteEventSpec.direction,
				unit: deleteEventSpec.unit,
				sequence
			};
			if (deleteData.unit == DELETE_SELECTION) deleteData.selectionToRemove = view.createSelection(targetRanges[0]);
			if (inputType === "deleteContentBackward") {
				if (env.isAndroid) deleteData.sequence = 1;
				if (shouldUseTargetRanges(targetRanges)) {
					deleteData.unit = DELETE_SELECTION;
					deleteData.selectionToRemove = view.createSelection(targetRanges);
				}
			}
			const eventInfo = new BubblingEventInfo(document, "delete", targetRanges[0]);
			document.fire(eventInfo, new ViewDocumentDomEventData(view, domEvent, deleteData));
			if (eventInfo.stop.called) evt.stop();
		});
		if (env.isBlink) enableChromeWorkaround(this);
	}
	/**
	* @inheritDoc
	*/
	observe() {}
	/**
	* @inheritDoc
	*/
	stopObserving() {}
};
/**
* Enables workaround for the issue https://github.com/ckeditor/ckeditor5/issues/11904.
*/
function enableChromeWorkaround(observer) {
	const view = observer.view;
	const document = view.document;
	let pressedKeyCode = null;
	let beforeInputReceived = false;
	document.on("keydown", (evt, { keyCode }) => {
		pressedKeyCode = keyCode;
		beforeInputReceived = false;
	});
	document.on("keyup", (evt, { keyCode, domEvent }) => {
		const selection = document.selection;
		const shouldFireDeleteEvent = observer.isEnabled && keyCode == pressedKeyCode && isDeleteKeyCode(keyCode) && !selection.isCollapsed && !beforeInputReceived;
		pressedKeyCode = null;
		if (shouldFireDeleteEvent) {
			const targetRange = selection.getFirstRange();
			const eventInfo = new BubblingEventInfo(document, "delete", targetRange);
			const deleteData = {
				unit: DELETE_SELECTION,
				direction: getDeleteDirection(keyCode),
				selectionToRemove: selection
			};
			document.fire(eventInfo, new ViewDocumentDomEventData(view, domEvent, deleteData));
		}
	});
	document.on("beforeinput", (evt, { inputType }) => {
		const deleteEventSpec = DELETE_EVENT_TYPES[inputType];
		if (isDeleteKeyCode(pressedKeyCode) && deleteEventSpec && deleteEventSpec.direction == getDeleteDirection(pressedKeyCode)) beforeInputReceived = true;
	}, { priority: "high" });
	document.on("beforeinput", (evt, { inputType, data }) => {
		if (pressedKeyCode == keyCodes.delete && inputType == "insertText" && data == "") evt.stop();
	}, { priority: "high" });
	function isDeleteKeyCode(keyCode) {
		return keyCode == keyCodes.backspace || keyCode == keyCodes.delete;
	}
	function getDeleteDirection(keyCode) {
		return keyCode == keyCodes.backspace ? DELETE_BACKWARD : DELETE_FORWARD;
	}
}
/**
* Verifies whether the given target ranges cover more than a single character and should be used instead of a single code-point deletion.
*/
function shouldUseTargetRanges(targetRanges) {
	if (targetRanges.length != 1 || targetRanges[0].isCollapsed) return false;
	const walker = targetRanges[0].getWalker({
		direction: "backward",
		singleCharacters: true,
		ignoreElementEnd: true
	});
	let count = 0;
	for (const { nextPosition, item } of walker) {
		if (nextPosition.parent.is("$text")) {
			const data = nextPosition.parent.data;
			const offset = nextPosition.offset;
			if (isInsideSurrogatePair(data, offset) || isInsideCombinedSymbol(data, offset) || isInsideEmojiSequence(data, offset)) continue;
			count++;
		} else if (item.is("containerElement") || item.is("emptyElement")) count++;
		if (count > 1) return true;
	}
	return false;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/delete
*/
/**
* The delete and backspace feature. Handles keys such as <kbd>Delete</kbd> and <kbd>Backspace</kbd>, other
* keystrokes and user actions that result in deleting content in the editor.
*/
var Delete = class extends Plugin {
	/**
	* Whether pressing backspace should trigger undo action
	*/
	_undoOnBackspace;
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "Delete";
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
		const view = editor.editing.view;
		const viewDocument = view.document;
		const modelDocument = editor.model.document;
		view.addObserver(DeleteObserver);
		this._undoOnBackspace = false;
		const deleteForwardCommand = new DeleteCommand(editor, "forward");
		editor.commands.add("deleteForward", deleteForwardCommand);
		editor.commands.add("forwardDelete", deleteForwardCommand);
		editor.commands.add("delete", new DeleteCommand(editor, "backward"));
		this.listenTo(viewDocument, "delete", (evt, data) => {
			if (!viewDocument.isComposing) data.preventDefault();
			const { direction, sequence, selectionToRemove, unit } = data;
			const commandName = direction === "forward" ? "deleteForward" : "delete";
			const commandData = { sequence };
			if (unit == "selection") {
				const modelRanges = Array.from(selectionToRemove.getRanges()).map((viewRange) => editor.editing.mapper.toModelRange(viewRange)).map((modelRange) => _tryFixingModelRange(modelRange, editor.model.schema) || modelRange);
				commandData.selection = editor.model.createSelection(modelRanges);
			} else commandData.unit = unit;
			editor.execute(commandName, commandData);
			view.scrollToTheSelection();
		}, { priority: "low" });
		this.listenTo(viewDocument, "keydown", (evt, data) => {
			if (viewDocument.isComposing || data.keyCode != keyCodes.backspace || !modelDocument.selection.isCollapsed) return;
			const ancestorLimit = editor.model.schema.getLimitElement(modelDocument.selection);
			const limitStartPosition = editor.model.createPositionAt(ancestorLimit, 0);
			if (limitStartPosition.isTouching(modelDocument.selection.getFirstPosition())) {
				data.preventDefault();
				const modelRange = editor.model.schema.getNearestSelectionRange(limitStartPosition, "forward");
				if (!modelRange) return;
				const viewSelection = view.createSelection(editor.editing.mapper.toViewRange(modelRange));
				const targetRange = viewSelection.getFirstRange();
				const eventInfo = new BubblingEventInfo(document, "delete", targetRange);
				const deleteData = {
					unit: "selection",
					direction: "backward",
					selectionToRemove: viewSelection
				};
				viewDocument.fire(eventInfo, new ViewDocumentDomEventData(view, data.domEvent, deleteData));
			}
		});
		if (this.editor.plugins.has("UndoEditing")) {
			this.listenTo(viewDocument, "delete", (evt, data) => {
				if (this._undoOnBackspace && data.direction == "backward" && data.sequence == 1 && data.unit == "codePoint") {
					this._undoOnBackspace = false;
					editor.execute("undo");
					data.preventDefault();
					evt.stop();
				}
			}, { context: "$capture" });
			this.listenTo(modelDocument, "change", () => {
				this._undoOnBackspace = false;
			});
		}
	}
	/**
	* If the next user action after calling this method is pressing backspace, it would undo the last change.
	*
	* Requires {@link module:undo/undoediting~UndoEditing} plugin. If not loaded, does nothing.
	*/
	requestUndoOnBackspace() {
		if (this.editor.plugins.has("UndoEditing")) this._undoOnBackspace = true;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/typing
*/
/**
* The typing feature. It handles typing.
*
* This is a "glue" plugin which loads the {@link module:typing/input~Input} and {@link module:typing/delete~Delete}
* plugins.
*/
var Typing = class extends Plugin {
	static get requires() {
		return [Input, Delete];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "Typing";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Returns the last text line from the given range.
*
* "The last text line" is understood as text (from one or more text nodes) which is limited either by a parent block
* or by inline elements (e.g. `<softBreak>`).
*
* ```ts
* const rangeToCheck = model.createRange(
* 	model.createPositionAt( paragraph, 0 ),
* 	model.createPositionAt( paragraph, 'end' )
* );
*
* const { text, range } = getLastTextLine( rangeToCheck, model );
* ```
*
* For model below, the returned `text` will be "Foo bar baz" and `range` will be set on whole `<paragraph>` content:
*
* ```xml
* <paragraph>Foo bar baz<paragraph>
* ```
*
* However, in below case, `text` will be set to "baz" and `range` will be set only on "baz".
*
* ```xml
* <paragraph>Foo<softBreak></softBreak>bar<softBreak></softBreak>baz<paragraph>
* ```
*/
function getLastTextLine(range, model) {
	let start = range.start;
	return {
		text: Array.from(range.getWalker({ ignoreElementEnd: false })).reduce((rangeText, { item }) => {
			if (!(item.is("$text") || item.is("$textProxy"))) {
				start = model.createPositionAfter(item);
				return "";
			}
			return rangeText + item.data;
		}, ""),
		range: model.createRange(start, range.end)
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/textwatcher
*/
const TextWatcherBase = /* #__PURE__ */ ObservableMixin();
/**
* The text watcher feature.
*
* Fires the {@link module:typing/textwatcher~TextWatcher#event:matched:data `matched:data`},
* {@link module:typing/textwatcher~TextWatcher#event:matched:selection `matched:selection`} and
* {@link module:typing/textwatcher~TextWatcher#event:unmatched `unmatched`} events on typing or selection changes.
*/
var TextWatcher = class extends TextWatcherBase {
	/**
	* The editor's model.
	*/
	model;
	/**
	* The function used to match the text.
	*
	* The test callback can return 3 values:
	*
	* * `false` if there is no match,
	* * `true` if there is a match,
	* * an object if there is a match and we want to pass some additional information to the {@link #event:matched:data} event.
	*/
	testCallback;
	/**
	* Whether there is a match currently.
	*/
	_hasMatch;
	/**
	* Creates a text watcher instance.
	*
	* @param testCallback See {@link module:typing/textwatcher~TextWatcher#testCallback}.
	*/
	constructor(model, testCallback) {
		super();
		this.model = model;
		this.testCallback = testCallback;
		this._hasMatch = false;
		this.set("isEnabled", true);
		this.on("change:isEnabled", () => {
			if (this.isEnabled) this._startListening();
			else {
				this.stopListening(model.document.selection);
				this.stopListening(model.document);
			}
		});
		this._startListening();
	}
	/**
	* Flag indicating whether there is a match currently.
	*/
	get hasMatch() {
		return this._hasMatch;
	}
	/**
	* Starts listening to the editor for typing and selection events.
	*/
	_startListening() {
		const document = this.model.document;
		this.listenTo(document.selection, "change:range", (evt, { directChange }) => {
			if (!directChange) return;
			if (!document.selection.isCollapsed) {
				if (this.hasMatch) {
					this.fire("unmatched");
					this._hasMatch = false;
				}
				return;
			}
			this._evaluateTextBeforeSelection("selection");
		});
		this.listenTo(document, "change:data", (evt, batch) => {
			if (batch.isUndo || !batch.isLocal) return;
			this._evaluateTextBeforeSelection("data", { batch });
		});
	}
	/**
	* Checks the editor content for matched text.
	*
	* @fires matched:data
	* @fires matched:selection
	* @fires unmatched
	*
	* @param suffix A suffix used for generating the event name.
	* @param data Data object for event.
	*/
	_evaluateTextBeforeSelection(suffix, data = {}) {
		const model = this.model;
		const selection = model.document.selection;
		const rangeBeforeSelection = model.createRange(model.createPositionAt(selection.focus.parent, 0), selection.focus);
		const { text, range } = getLastTextLine(rangeBeforeSelection, model);
		const testResult = this.testCallback(text);
		if (!testResult && this.hasMatch) this.fire("unmatched");
		this._hasMatch = !!testResult;
		if (testResult) {
			const eventData = Object.assign(data, {
				text,
				range
			});
			if (typeof testResult == "object") Object.assign(eventData, testResult);
			this.fire(`matched:${suffix}`, eventData);
		}
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/twostepcaretmovement
*/
/**
* This plugin enables the two-step caret (phantom) movement behavior for
* {@link module:typing/twostepcaretmovement~TwoStepCaretMovement#registerAttribute registered attributes}
* on arrow right (<kbd>→</kbd>) and left (<kbd>←</kbd>) key press.
*
* Thanks to this (phantom) caret movement the user is able to type before/after as well as at the
* beginning/end of an attribute.
*
* **Note:** This plugin support right–to–left (Arabic, Hebrew, etc.) content by mirroring its behavior
* but for the sake of simplicity examples showcase only left–to–right use–cases.
*
* # Forward movement
*
* ## "Entering" an attribute:
*
* When this plugin is enabled and registered for the `a` attribute and the selection is right before it
* (at the attribute boundary), pressing the right arrow key will not move the selection but update its
* attributes accordingly:
*
* * When enabled:
*
* ```xml
* foo{}<$text a="true">bar</$text>
* ```
*
* 	<kbd>→</kbd>
*
* ```xml
* foo<$text a="true">{}bar</$text>
* ```
*
* * When disabled:
*
* ```xml
* foo{}<$text a="true">bar</$text>
* ```
*
* 	<kbd>→</kbd>
*
* ```xml
* foo<$text a="true">b{}ar</$text>
* ```
*
*
* ## "Leaving" an attribute:
*
* * When enabled:
*
* ```xml
* <$text a="true">bar{}</$text>baz
* ```
*
* 	<kbd>→</kbd>
*
* ```xml
* <$text a="true">bar</$text>{}baz
* ```
*
* * When disabled:
*
* ```xml
* <$text a="true">bar{}</$text>baz
* ```
*
* 	<kbd>→</kbd>
*
* ```xml
* <$text a="true">bar</$text>b{}az
* ```
*
* # Backward movement
*
* * When enabled:
*
* ```xml
* <$text a="true">bar</$text>{}baz
* ```
*
* 	<kbd>←</kbd>
*
* ```xml
* <$text a="true">bar{}</$text>baz
* ```
*
* * When disabled:
*
* ```xml
* <$text a="true">bar</$text>{}baz
* ```
*
* 	<kbd>←</kbd>
*
* ```xml
* <$text a="true">ba{}r</$text>b{}az
* ```
*
* # Multiple attributes
*
* * When enabled and many attributes starts or ends at the same position:
*
* ```xml
* <$text a="true" b="true">bar</$text>{}baz
* ```
*
* 	<kbd>←</kbd>
*
* ```xml
* <$text a="true" b="true">bar{}</$text>baz
* ```
*
* * When enabled and one procedes another:
*
* ```xml
* <$text a="true">bar</$text><$text b="true">{}bar</$text>
* ```
*
* 	<kbd>←</kbd>
*
* ```xml
* <$text a="true">bar{}</$text><$text b="true">bar</$text>
* ```
*
*/
var TwoStepCaretMovement = class extends Plugin {
	/**
	* A set of attributes to handle.
	*/
	attributes;
	/**
	* The current UID of the overridden gravity, as returned by
	* {@link module:engine/model/writer~ModelWriter#overrideSelectionGravity}.
	*/
	_overrideUid;
	/**
	* A flag indicating that the automatic gravity restoration should not happen upon the next
	* gravity restoration.
	* {@link module:engine/model/selection~ModelSelection#event:change:range} event.
	*/
	_isNextGravityRestorationSkipped = false;
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "TwoStepCaretMovement";
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
	constructor(editor) {
		super(editor);
		this.attributes = /* @__PURE__ */ new Set();
		this._overrideUid = null;
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const model = editor.model;
		const view = editor.editing.view;
		const locale = editor.locale;
		const modelSelection = model.document.selection;
		this.listenTo(view.document, "arrowKey", (evt, data) => {
			if (!modelSelection.isCollapsed) return;
			if (data.shiftKey || data.altKey || data.ctrlKey) return;
			const arrowRightPressed = data.keyCode == keyCodes.arrowright;
			const arrowLeftPressed = data.keyCode == keyCodes.arrowleft;
			if (!arrowRightPressed && !arrowLeftPressed) return;
			const contentDirection = locale.contentLanguageDirection;
			let isMovementHandled;
			if (contentDirection === "ltr" && arrowRightPressed || contentDirection === "rtl" && arrowLeftPressed) isMovementHandled = this._handleForwardMovement(data);
			else isMovementHandled = this._handleBackwardMovement(data);
			if (isMovementHandled === true) evt.stop();
		}, {
			context: "$text",
			priority: "highest"
		});
		this.listenTo(modelSelection, "change:range", (evt, data) => {
			if (this._isNextGravityRestorationSkipped) {
				this._isNextGravityRestorationSkipped = false;
				return;
			}
			if (!this._isGravityOverridden) return;
			if (!data.directChange && isBetweenDifferentAttributes(modelSelection.getFirstPosition(), this.attributes)) return;
			this._restoreGravity();
		});
		this._enableClickingAfterNode();
		this._enableInsertContentSelectionAttributesFixer();
		this._handleDeleteContentAfterNode();
	}
	/**
	* Registers a given attribute for the two-step caret movement.
	*
	* @param attribute Name of the attribute to handle.
	*/
	registerAttribute(attribute) {
		this.attributes.add(attribute);
	}
	/**
	* Updates the document selection and the view according to the two–step caret movement state
	* when moving **forwards**. Executed upon `keypress` in the {@link module:engine/view/view~EditingView}.
	*
	* @internal
	* @param eventData Data of the key press.
	* @returns `true` when the handler prevented caret movement.
	*/
	_handleForwardMovement(eventData) {
		const attributes = this.attributes;
		const model = this.editor.model;
		const selection = model.document.selection;
		const position = selection.getFirstPosition();
		if (this._isGravityOverridden) return false;
		if (position.isAtStart && hasAnyAttribute(selection, attributes)) return false;
		if (isBetweenDifferentAttributes(position, attributes)) {
			if (eventData) preventCaretMovement(eventData);
			if (hasAnyAttribute(selection, attributes) && isBetweenDifferentAttributes(position, attributes, true)) clearSelectionAttributes(model, attributes);
			else this._overrideGravity();
			return true;
		}
		return false;
	}
	/**
	* Updates the document selection and the view according to the two–step caret movement state
	* when moving **backwards**. Executed upon `keypress` in the {@link module:engine/view/view~EditingView}.
	*
	* @internal
	* @param eventData Data of the key press.
	* @returns `true` when the handler prevented caret movement
	*/
	_handleBackwardMovement(eventData) {
		const attributes = this.attributes;
		const model = this.editor.model;
		const selection = model.document.selection;
		const position = selection.getFirstPosition();
		if (this._isGravityOverridden) {
			if (eventData) preventCaretMovement(eventData);
			this._restoreGravity();
			if (isBetweenDifferentAttributes(position, attributes, true)) clearSelectionAttributes(model, attributes);
			else setSelectionAttributesFromTheNodeBefore(model, attributes, position);
			return true;
		} else {
			if (position.isAtStart) {
				if (hasAnyAttribute(selection, attributes)) {
					if (eventData) preventCaretMovement(eventData);
					setSelectionAttributesFromTheNodeBefore(model, attributes, position);
					return true;
				}
				return false;
			}
			if (!hasAnyAttribute(selection, attributes) && isBetweenDifferentAttributes(position, attributes, true)) {
				if (eventData) preventCaretMovement(eventData);
				setSelectionAttributesFromTheNodeBefore(model, attributes, position);
				return true;
			}
			if (isStepAfterAnyAttributeBoundary(position, attributes)) {
				if (position.isAtEnd && !hasAnyAttribute(selection, attributes) && isBetweenDifferentAttributes(position, attributes)) {
					if (eventData) preventCaretMovement(eventData);
					setSelectionAttributesFromTheNodeBefore(model, attributes, position);
					return true;
				}
				this._isNextGravityRestorationSkipped = true;
				this._overrideGravity();
				return false;
			}
		}
		return false;
	}
	/**
	* Starts listening to {@link module:engine/view/document~ViewDocument#event:mousedown} and
	* {@link module:engine/view/document~ViewDocument#event:selectionChange} and puts the selection before/after a 2-step node
	* if clicked at the beginning/ending of the 2-step node.
	*
	* The purpose of this action is to allow typing around the 2-step node directly after a click.
	*
	* See https://github.com/ckeditor/ckeditor5/issues/1016.
	*/
	_enableClickingAfterNode() {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;
		const document = editor.editing.view.document;
		editor.editing.view.addObserver(MouseObserver);
		editor.editing.view.addObserver(TouchObserver);
		let touched = false;
		let clicked = false;
		this.listenTo(document, "touchstart", () => {
			clicked = false;
			touched = true;
		});
		this.listenTo(document, "mousedown", () => {
			clicked = true;
		});
		this.listenTo(document, "selectionChange", () => {
			const attributes = this.attributes;
			if (!clicked && !touched) return;
			clicked = false;
			touched = false;
			if (!selection.isCollapsed) return;
			if (!hasAnyAttribute(selection, attributes)) return;
			const position = selection.getFirstPosition();
			if (!isBetweenDifferentAttributes(position, attributes)) return;
			if (position.isAtStart || isBetweenDifferentAttributes(position, attributes, true)) clearSelectionAttributes(model, attributes);
			else if (!this._isGravityOverridden) this._overrideGravity();
		});
	}
	/**
	* Starts listening to {@link module:engine/model/model~Model#event:insertContent} and corrects the model
	* selection attributes if the selection is at the end of a two-step node after inserting the content.
	*
	* The purpose of this action is to improve the overall UX because the user is no longer "trapped" by the
	* two-step attribute of the selection, and they can type a "clean" (`linkHref`–less) text right away.
	*
	* See https://github.com/ckeditor/ckeditor5/issues/6053.
	*/
	_enableInsertContentSelectionAttributesFixer() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const attributes = this.attributes;
		this.listenTo(model, "insertContent", () => {
			const position = selection.getFirstPosition();
			if (hasAnyAttribute(selection, attributes) && isBetweenDifferentAttributes(position, attributes)) clearSelectionAttributes(model, attributes);
		}, { priority: "low" });
	}
	/**
	* Starts listening to {@link module:engine/model/model~Model#deleteContent} and checks whether
	* removing a content right after the tow-step attribute.
	*
	* If so, the selection should not preserve the two-step attribute. However, if
	* the {@link module:typing/twostepcaretmovement~TwoStepCaretMovement} plugin is active and
	* the selection has the two-step attribute due to overridden gravity (at the end), the two-step attribute should stay untouched.
	*
	* The purpose of this action is to allow removing the link text and keep the selection outside the link.
	*
	* See https://github.com/ckeditor/ckeditor5/issues/7521.
	*/
	_handleDeleteContentAfterNode() {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;
		const view = editor.editing.view;
		let isBackspace = false;
		let shouldPreserveAttributes = false;
		this.listenTo(view.document, "delete", (evt, data) => {
			isBackspace = data.direction === "backward";
		}, { priority: "high" });
		this.listenTo(model, "deleteContent", () => {
			if (!isBackspace) return;
			const position = selection.getFirstPosition();
			shouldPreserveAttributes = hasAnyAttribute(selection, this.attributes) && !isStepAfterAnyAttributeBoundary(position, this.attributes);
		}, { priority: "high" });
		this.listenTo(model, "deleteContent", () => {
			if (!isBackspace) return;
			isBackspace = false;
			if (shouldPreserveAttributes) return;
			editor.model.enqueueChange(() => {
				const position = selection.getFirstPosition();
				if (hasAnyAttribute(selection, this.attributes) && isBetweenDifferentAttributes(position, this.attributes)) {
					if (position.isAtStart || isBetweenDifferentAttributes(position, this.attributes, true)) clearSelectionAttributes(model, this.attributes);
					else if (!this._isGravityOverridden) this._overrideGravity();
				}
			});
		}, { priority: "low" });
	}
	/**
	* `true` when the gravity is overridden for the plugin.
	*/
	get _isGravityOverridden() {
		return !!this._overrideUid;
	}
	/**
	* Overrides the gravity using the {@link module:engine/model/writer~ModelWriter model writer}
	* and stores the information about this fact in the {@link #_overrideUid}.
	*
	* A shorthand for {@link module:engine/model/writer~ModelWriter#overrideSelectionGravity}.
	*/
	_overrideGravity() {
		this._overrideUid = this.editor.model.change((writer) => {
			return writer.overrideSelectionGravity();
		});
	}
	/**
	* Restores the gravity using the {@link module:engine/model/writer~ModelWriter model writer}.
	*
	* A shorthand for {@link module:engine/model/writer~ModelWriter#restoreSelectionGravity}.
	*/
	_restoreGravity() {
		this.editor.model.change((writer) => {
			writer.restoreSelectionGravity(this._overrideUid);
			this._overrideUid = null;
		});
	}
};
/**
* Checks whether the selection has any of given attributes.
*/
function hasAnyAttribute(selection, attributes) {
	for (const observedAttribute of attributes) if (selection.hasAttribute(observedAttribute)) return true;
	return false;
}
/**
* Applies the given attributes to the current selection using using the
* values from the node before the current position. Uses
* the {@link module:engine/model/writer~ModelWriter model writer}.
*/
function setSelectionAttributesFromTheNodeBefore(model, attributes, position) {
	const nodeBefore = position.nodeBefore;
	model.change((writer) => {
		if (nodeBefore) {
			const attributes = [];
			const isInlineObject = model.schema.isObject(nodeBefore) && model.schema.isInline(nodeBefore);
			for (const [key, value] of nodeBefore.getAttributes()) if (model.schema.checkAttribute("$text", key) && (!isInlineObject || model.schema.getAttributeProperties(key).copyFromObject !== false)) attributes.push([key, value]);
			writer.setSelectionAttribute(attributes);
		} else writer.removeSelectionAttribute(attributes);
	});
}
/**
* Removes 2-SCM attributes from the selection.
*/
function clearSelectionAttributes(model, attributes) {
	model.change((writer) => {
		writer.removeSelectionAttribute(attributes);
	});
}
/**
* Prevents the caret movement in the view by calling `preventDefault` on the event data.
*
* @alias data.preventDefault
*/
function preventCaretMovement(data) {
	data.preventDefault();
}
/**
* Checks whether the step before `isBetweenDifferentAttributes()`.
*/
function isStepAfterAnyAttributeBoundary(position, attributes) {
	return isBetweenDifferentAttributes(position.getShiftedBy(-1), attributes);
}
/**
* Checks whether the given position is between different values of given attributes.
*/
function isBetweenDifferentAttributes(position, attributes, isStrict = false) {
	const { nodeBefore, nodeAfter } = position;
	for (const observedAttribute of attributes) {
		const attrBefore = nodeBefore ? nodeBefore.getAttribute(observedAttribute) : void 0;
		const attrAfter = nodeAfter ? nodeAfter.getAttribute(observedAttribute) : void 0;
		if (isStrict && (attrBefore === void 0 || attrAfter === void 0)) continue;
		if (attrAfter !== attrBefore) return true;
	}
	return false;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/texttransformation
*/
const TRANSFORMATIONS = {
	copyright: {
		from: "(c)",
		to: "©"
	},
	registeredTrademark: {
		from: "(r)",
		to: "®"
	},
	trademark: {
		from: "(tm)",
		to: "™"
	},
	oneHalf: {
		from: /(^|[^/a-z0-9])(1\/2)([^/a-z0-9])$/i,
		to: [
			null,
			"½",
			null
		]
	},
	oneThird: {
		from: /(^|[^/a-z0-9])(1\/3)([^/a-z0-9])$/i,
		to: [
			null,
			"⅓",
			null
		]
	},
	twoThirds: {
		from: /(^|[^/a-z0-9])(2\/3)([^/a-z0-9])$/i,
		to: [
			null,
			"⅔",
			null
		]
	},
	oneForth: {
		from: /(^|[^/a-z0-9])(1\/4)([^/a-z0-9])$/i,
		to: [
			null,
			"¼",
			null
		]
	},
	threeQuarters: {
		from: /(^|[^/a-z0-9])(3\/4)([^/a-z0-9])$/i,
		to: [
			null,
			"¾",
			null
		]
	},
	lessThanOrEqual: {
		from: "<=",
		to: "≤"
	},
	greaterThanOrEqual: {
		from: ">=",
		to: "≥"
	},
	notEqual: {
		from: "!=",
		to: "≠"
	},
	arrowLeft: {
		from: "<-",
		to: "←"
	},
	arrowRight: {
		from: "->",
		to: "→"
	},
	horizontalEllipsis: {
		from: "...",
		to: "…"
	},
	enDash: {
		from: /(^| )(--)( )$/,
		to: [
			null,
			"–",
			null
		]
	},
	emDash: {
		from: /(^| )(---)( )$/,
		to: [
			null,
			"—",
			null
		]
	},
	quotesPrimary: {
		from: buildQuotesRegExp("\""),
		to: [
			null,
			"“",
			null,
			"”"
		]
	},
	quotesSecondary: {
		from: buildQuotesRegExp("'"),
		to: [
			null,
			"‘",
			null,
			"’"
		]
	},
	quotesPrimaryEnGb: {
		from: buildQuotesRegExp("'"),
		to: [
			null,
			"‘",
			null,
			"’"
		]
	},
	quotesSecondaryEnGb: {
		from: buildQuotesRegExp("\""),
		to: [
			null,
			"“",
			null,
			"”"
		]
	},
	quotesPrimaryPl: {
		from: buildQuotesRegExp("\""),
		to: [
			null,
			"„",
			null,
			"”"
		]
	},
	quotesSecondaryPl: {
		from: buildQuotesRegExp("'"),
		to: [
			null,
			"‚",
			null,
			"’"
		]
	}
};
const TRANSFORMATION_GROUPS = {
	symbols: [
		"copyright",
		"registeredTrademark",
		"trademark"
	],
	mathematical: [
		"oneHalf",
		"oneThird",
		"twoThirds",
		"oneForth",
		"threeQuarters",
		"lessThanOrEqual",
		"greaterThanOrEqual",
		"notEqual",
		"arrowLeft",
		"arrowRight"
	],
	typography: [
		"horizontalEllipsis",
		"enDash",
		"emDash"
	],
	quotes: ["quotesPrimary", "quotesSecondary"]
};
const DEFAULT_TRANSFORMATIONS = [
	"symbols",
	"mathematical",
	"typography",
	"quotes"
];
/**
* The text transformation plugin.
*/
var TextTransformation = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [Delete, Input];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "TextTransformation";
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
	constructor(editor) {
		super(editor);
		editor.config.define("typing", { transformations: { include: DEFAULT_TRANSFORMATIONS } });
	}
	/**
	* @inheritDoc
	*/
	init() {
		const modelSelection = this.editor.model.document.selection;
		modelSelection.on("change:range", () => {
			const anchor = modelSelection.anchor;
			const isInCodeBlock = !!anchor && anchor.parent.is("element", "codeBlock");
			const isInInlineCode = modelSelection.hasAttribute("code");
			this.isEnabled = !(isInCodeBlock || isInInlineCode);
		});
		this._enableTransformationWatchers();
	}
	/**
	* Create new TextWatcher listening to the editor for typing and selection events.
	*/
	_enableTransformationWatchers() {
		const editor = this.editor;
		const model = editor.model;
		const deletePlugin = editor.plugins.get("Delete");
		const normalizedTransformations = normalizeTransformations(editor.config.get("typing.transformations"));
		const testCallback = (text) => {
			for (const normalizedTransformation of normalizedTransformations) if (normalizedTransformation.from.test(text)) return { normalizedTransformation };
		};
		const watcher = new TextWatcher(editor.model, testCallback);
		watcher.on("matched:data", (evt, data) => {
			if (!data.batch.isTyping) return;
			const { from, to } = data.normalizedTransformation;
			const matches = from.exec(data.text);
			const replaces = to(matches.slice(1));
			const matchedRange = data.range;
			let changeIndex = matches.index;
			model.enqueueChange((writer) => {
				for (let i = 1; i < matches.length; i++) {
					const match = matches[i];
					const replaceWith = replaces[i - 1];
					if (replaceWith == null) {
						changeIndex += match.length;
						continue;
					}
					const replacePosition = matchedRange.start.getShiftedBy(changeIndex);
					const replaceRange = model.createRange(replacePosition, replacePosition.getShiftedBy(match.length));
					const attributes = getTextAttributesAfterPosition(replacePosition);
					model.insertContent(writer.createText(replaceWith, attributes), replaceRange);
					changeIndex += replaceWith.length;
				}
				model.enqueueChange(() => {
					deletePlugin.requestUndoOnBackspace();
				});
			});
		});
		watcher.bind("isEnabled").to(this);
	}
};
/**
* Normalizes the configuration `from` parameter value.
* The normalized value for the `from` parameter is a RegExp instance. If the passed `from` is already a RegExp instance,
* it is returned unchanged.
*/
function normalizeFrom(from) {
	if (typeof from == "string") return new RegExp(`(${escapeRegExp(from)})$`);
	return from;
}
/**
* Normalizes the configuration `to` parameter value.
* The normalized value for the `to` parameter is a function that takes an array and returns an array. See more in the
* configuration description. If the passed `to` is already a function, it is returned unchanged.
*/
function normalizeTo(to) {
	if (typeof to == "string") return () => [to];
	else if (to instanceof Array) return () => to;
	return to;
}
/**
* For given `position` returns attributes for the text that is after that position.
* The text can be in the same text node as the position (`foo[]bar`) or in the next text node (`foo[]<$text bold="true">bar</$text>`).
*/
function getTextAttributesAfterPosition(position) {
	return (position.textNode ? position.textNode : position.nodeAfter).getAttributes();
}
/**
* Returns a RegExp pattern string that detects a sentence inside a quote.
*
* @param quoteCharacter The character to create a pattern for.
*/
function buildQuotesRegExp(quoteCharacter) {
	return new RegExp(`(^|\\s)(${quoteCharacter})([^${quoteCharacter}]*)(${quoteCharacter})$`);
}
/**
* Reads text transformation config and returns normalized array of transformations objects.
*/
function normalizeTransformations(config) {
	const extra = config.extra || [];
	const remove = config.remove || [];
	const isNotRemoved = (transformation) => !remove.includes(transformation);
	return expandGroupsAndRemoveDuplicates(config.include.concat(extra).filter(isNotRemoved)).filter(isNotRemoved).map((transformation) => typeof transformation == "string" && TRANSFORMATIONS[transformation] ? TRANSFORMATIONS[transformation] : transformation).filter((transformation) => typeof transformation === "object").map((transformation) => ({
		from: normalizeFrom(transformation.from),
		to: normalizeTo(transformation.to)
	}));
}
/**
* Reads definitions and expands named groups if needed to transformation names.
* This method also removes duplicated named transformations if any.
*/
function expandGroupsAndRemoveDuplicates(definitions) {
	const definedTransformations = /* @__PURE__ */ new Set();
	for (const transformationOrGroup of definitions) if (typeof transformationOrGroup == "string" && TRANSFORMATION_GROUPS[transformationOrGroup]) for (const transformation of TRANSFORMATION_GROUPS[transformationOrGroup]) definedTransformations.add(transformation);
	else definedTransformations.add(transformationOrGroup);
	return Array.from(definedTransformations);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Returns a model range that covers all consecutive nodes with the same `attributeName` and its `value`
* that intersect the given `position`.
*
* It can be used e.g. to get the entire range on which the `linkHref` attribute needs to be changed when having a
* selection inside a link.
*
* @param position The start position.
* @param attributeName The attribute name.
* @param value The attribute value.
* @param model The model instance.
* @returns The link range.
*/
function findAttributeRange(position, attributeName, value, model) {
	return model.createRange(findAttributeRangeBound(position, attributeName, value, true, model), findAttributeRangeBound(position, attributeName, value, false, model));
}
/**
* Walks forward or backward (depends on the `lookBack` flag), node by node, as long as they have the same attribute value
* and returns a position just before or after (depends on the `lookBack` flag) the last matched node.
*
* @param position The start position.
* @param attributeName The attribute name.
* @param value The attribute value.
* @param lookBack Whether the walk direction is forward (`false`) or backward (`true`).
* @returns The position just before the last matched node.
*/
function findAttributeRangeBound(position, attributeName, value, lookBack, model) {
	let node = position.textNode || (lookBack ? position.nodeBefore : position.nodeAfter);
	let lastNode = null;
	while (node && node.getAttribute(attributeName) == value) {
		lastNode = node;
		node = lookBack ? node.previousSibling : node.nextSibling;
	}
	return lastNode ? model.createPositionAt(lastNode, lookBack ? "before" : "after") : position;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/utils/inlinehighlight
*/
/**
* Adds a visual highlight style to an attribute element in which the selection is anchored.
* Together with two-step caret movement, they indicate that the user is typing inside the element.
*
* Highlight is turned on by adding the given class to the attribute element in the view:
*
* * The class is removed before the conversion has started, as callbacks added with the `'highest'` priority
* to {@link module:engine/conversion/downcastdispatcher~DowncastDispatcher} events.
* * The class is added in the view post fixer, after other changes in the model tree were converted to the view.
*
* This way, adding and removing the highlight does not interfere with conversion.
*
* Usage:
*
* ```ts
* import { inlineHighlight } from '@ckeditor/ckeditor5-typing/src/utils/inlinehighlight';
*
* // Make `ck-link_selected` class be applied on an `a` element
* // whenever the corresponding `linkHref` attribute element is selected.
* inlineHighlight( editor, 'linkHref', 'a', 'ck-link_selected' );
* ```
*
* @param editor The editor instance.
* @param attributeName The attribute name to check.
* @param tagName The tagName of a view item.
* @param className The class name to apply in the view.
*/
function inlineHighlight(editor, attributeName, tagName, className) {
	const view = editor.editing.view;
	const highlightedElements = /* @__PURE__ */ new Set();
	view.document.registerPostFixer((writer) => {
		const selection = editor.model.document.selection;
		let changed = false;
		if (selection.hasAttribute(attributeName)) {
			const modelRange = findAttributeRange(selection.getFirstPosition(), attributeName, selection.getAttribute(attributeName), editor.model);
			const viewRange = editor.editing.mapper.toViewRange(modelRange);
			for (const item of viewRange.getItems()) if (item.is("element", tagName) && !item.hasClass(className)) {
				writer.addClass(className, item);
				highlightedElements.add(item);
				changed = true;
			}
		}
		return changed;
	});
	editor.conversion.for("editingDowncast").add((dispatcher) => {
		dispatcher.on("insert", removeHighlight, { priority: "highest" });
		dispatcher.on("remove", removeHighlight, { priority: "highest" });
		dispatcher.on("attribute", removeHighlight, { priority: "highest" });
		dispatcher.on("selection", removeHighlight, { priority: "highest" });
		function removeHighlight() {
			view.change((writer) => {
				for (const item of highlightedElements.values()) {
					writer.removeClass(className, item);
					highlightedElements.delete(item);
				}
			});
		}
	});
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { Delete, DeleteCommand, Input, InsertTextCommand, InsertTextObserver, TextTransformation, TextWatcher, TwoStepCaretMovement, Typing, TypingChangeBuffer, DeleteObserver as _DeleteObserver, findAttributeRange, findAttributeRangeBound, getLastTextLine, inlineHighlight };
//# sourceMappingURL=index.js.map