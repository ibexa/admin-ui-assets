/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { Delete } from "@ckeditor/ckeditor5-typing";
import { Enter } from "@ckeditor/ckeditor5-enter";
import { CKEditorError, FocusTracker, KeystrokeHandler, createElement, env, first, getCode, getLocalizedArrowKeyCodeDirection, global, parseKeystroke, toArray, uid } from "@ckeditor/ckeditor5-utils";
import { _normalizeFontSizeOptions } from "@ckeditor/ckeditor5-font";
import { ClipboardPipeline } from "@ckeditor/ckeditor5-clipboard";
import { ButtonView, CollapsibleView, FocusCycler, LabeledFieldView, MenuBarMenuListItemButtonView, MenuBarMenuView, SplitButtonView, SwitchButtonView, View, ViewCollection, addKeyboardHandlingForGrid, createDropdown, createLabeledInputNumber, focusChildOnDropdownOpen } from "@ckeditor/ckeditor5-ui";
import { IconBulletedList, IconListStyleArabicIndic, IconListStyleCircle, IconListStyleDecimal, IconListStyleDecimalLeadingZero, IconListStyleDisc, IconListStyleLowerLatin, IconListStyleLowerRoman, IconListStyleSquare, IconListStyleUpperLatin, IconListStyleUpperRoman, IconNumberedList, IconTodoList } from "@ckeditor/ckeditor5-icons";
import { pick } from "es-toolkit/compat";
import { DomEventObserver, Matcher, ModelTreeWalker, getViewFillerOffset } from "@ckeditor/ckeditor5-engine";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/list/utils/listwalker
*/
/**
* Document list blocks iterator.
*
* @internal
*/
var ListWalker = class {
	/**
	* The start list item block element.
	*/
	_startElement;
	/**
	* The reference indent. Initialized by the indent of the start block.
	*/
	_referenceIndent;
	/**
	* The iterating direction.
	*/
	_isForward;
	/**
	* Whether start block should be included in the result (if it's matching other criteria).
	*/
	_includeSelf;
	/**
	* Additional attributes that must be the same for each block.
	*/
	_sameAttributes;
	/**
	* Whether blocks with the same indent level as the start block should be included in the result.
	*/
	_sameIndent;
	/**
	* Whether blocks with a lower indent level than the start block should be included in the result.
	*/
	_lowerIndent;
	/**
	* Whether blocks with a higher indent level than the start block should be included in the result.
	*/
	_higherIndent;
	/**
	* Creates a document list iterator.
	*
	* @param startElement The start list item block element.
	* @param options.direction The iterating direction.
	* @param options.includeSelf Whether start block should be included in the result (if it's matching other criteria).
	* @param options.sameAttributes Additional attributes that must be the same for each block.
	* @param options.sameIndent Whether blocks with the same indent level as the start block should be included
	* in the result.
	* @param options.lowerIndent Whether blocks with a lower indent level than the start block should be included
	* in the result.
	* @param options.higherIndent Whether blocks with a higher indent level than the start block should be included
	* in the result.
	*/
	constructor(startElement, options) {
		this._startElement = startElement;
		this._referenceIndent = startElement.getAttribute("listIndent");
		this._isForward = options.direction == "forward";
		this._includeSelf = !!options.includeSelf;
		this._sameAttributes = toArray(options.sameAttributes || []);
		this._sameIndent = !!options.sameIndent;
		this._lowerIndent = !!options.lowerIndent;
		this._higherIndent = !!options.higherIndent;
	}
	/**
	* Performs only first step of iteration and returns the result.
	*
	* @param startElement The start list item block element.
	* @param options.direction The iterating direction.
	* @param options.includeSelf Whether start block should be included in the result (if it's matching other criteria).
	* @param options.sameAttributes Additional attributes that must be the same for each block.
	* @param options.sameIndent Whether blocks with the same indent level as the start block should be included
	* in the result.
	* @param options.lowerIndent Whether blocks with a lower indent level than the start block should be included
	* in the result.
	* @param options.higherIndent Whether blocks with a higher indent level than the start block should be included
	* in the result.
	*/
	static first(startElement, options) {
		const iterator = new this(startElement, options)[Symbol.iterator]();
		return first(iterator);
	}
	/**
	* Iterable interface.
	*/
	*[Symbol.iterator]() {
		const nestedItems = [];
		for (const { node } of new SiblingListBlocksIterator(this._getStartNode(), this._isForward ? "forward" : "backward")) {
			const indent = node.getAttribute("listIndent");
			if (indent < this._referenceIndent) {
				if (!this._lowerIndent) break;
				this._referenceIndent = indent;
			} else if (indent > this._referenceIndent) {
				if (!this._higherIndent) continue;
				if (!this._isForward) {
					nestedItems.push(node);
					continue;
				}
			} else {
				if (!this._sameIndent) {
					if (this._higherIndent) {
						if (nestedItems.length) {
							yield* nestedItems;
							nestedItems.length = 0;
						}
						break;
					}
					continue;
				}
				if (this._sameAttributes.some((attr) => node.getAttribute(attr) !== this._startElement.getAttribute(attr))) break;
			}
			if (nestedItems.length) {
				yield* nestedItems;
				nestedItems.length = 0;
			}
			yield node;
		}
	}
	/**
	* Returns the model element to start iterating.
	*/
	_getStartNode() {
		if (this._includeSelf) return this._startElement;
		return this._isForward ? this._startElement.nextSibling : this._startElement.previousSibling;
	}
};
/**
* Iterates sibling list blocks starting from the given node.
*
* @internal
*/
var SiblingListBlocksIterator = class {
	_node;
	_isForward;
	_previousNodesByIndent = [];
	_previous = null;
	_previousNodeIndent = null;
	/**
	* @param node The model node.
	* @param direction Iteration direction.
	*/
	constructor(node, direction = "forward") {
		this._node = node;
		this._isForward = direction === "forward";
	}
	[Symbol.iterator]() {
		return this;
	}
	next() {
		if (!isListItemBlock(this._node)) return {
			done: true,
			value: void 0
		};
		const nodeIndent = this._node.getAttribute("listIndent");
		let previousNodeInList = null;
		if (this._previous) {
			const previousNodeIndent = this._previousNodeIndent;
			if (nodeIndent > previousNodeIndent) this._previousNodesByIndent[previousNodeIndent] = this._previous;
			else if (nodeIndent < previousNodeIndent) {
				previousNodeInList = this._previousNodesByIndent[nodeIndent] || null;
				this._previousNodesByIndent.length = nodeIndent;
			} else previousNodeInList = this._previous;
		}
		const value = {
			node: this._node,
			previous: this._previous,
			previousNodeInList
		};
		this._previous = this._node;
		this._previousNodeIndent = nodeIndent;
		this._node = this._isForward ? this._node.nextSibling : this._node.previousSibling;
		return {
			value,
			done: false
		};
	}
};
/**
* The iterable protocol over the list elements.
*
* @internal
*/
var ListBlocksIterable = class {
	_listHead;
	/**
	* @param listHead The head element of a list.
	*/
	constructor(listHead) {
		this._listHead = listHead;
	}
	/**
	* List blocks iterator.
	*
	* Iterates over all blocks of a list.
	*/
	[Symbol.iterator]() {
		return new SiblingListBlocksIterator(this._listHead);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The list item ID generator.
*
* @internal
*/
var ListItemUid = class {
	/**
	* Returns the next ID.
	*
	* @internal
	*/
	/* istanbul ignore next: static function definition -- @preserve */
	static next() {
		return uid();
	}
};
/**
* Returns true if the given model node is a list item block.
*
* @internal
*/
function isListItemBlock(node) {
	return !!node && node.is("element") && node.hasAttribute("listItemId");
}
/**
* Returns an array with all elements that represents the same list item.
*
* It means that values for `listIndent`, and `listItemId` for all items are equal.
*
* @internal
* @param listItem Starting list item element.
* @param options.higherIndent Whether blocks with a higher indent level than the start block should be included
* in the result.
*/
function getAllListItemBlocks(listItem, options = {}) {
	return [...getListItemBlocks(listItem, {
		...options,
		direction: "backward"
	}), ...getListItemBlocks(listItem, {
		...options,
		direction: "forward"
	})];
}
/**
* Returns an array with elements that represents the same list item in the specified direction.
*
* It means that values for `listIndent` and `listItemId` for all items are equal.
*
* **Note**: For backward search the provided item is not included, but for forward search it is included in the result.
*
* @internal
* @param listItem Starting list item element.
* @param options.direction Walking direction.
* @param options.higherIndent Whether blocks with a higher indent level than the start block should be included in the result.
*/
function getListItemBlocks(listItem, options = {}) {
	const isForward = options.direction == "forward";
	const items = Array.from(new ListWalker(listItem, {
		...options,
		includeSelf: isForward,
		sameIndent: true,
		sameAttributes: "listItemId"
	}));
	return isForward ? items : items.reverse();
}
/**
* Returns a list items nested inside the given list item.
*
* @internal
*/
function getNestedListBlocks(listItem) {
	return Array.from(new ListWalker(listItem, {
		direction: "forward",
		higherIndent: true
	}));
}
/**
* Returns array of all blocks/items of the same list as given block (same indent, same type and properties).
*
* @internal
* @param listItem Starting list item element.
* @param options Additional list walker options to modify the range of returned list items.
*/
function getListItems(listItem, options) {
	const backwardBlocks = new ListWalker(listItem, {
		sameIndent: true,
		sameAttributes: "listType",
		...options
	});
	const forwardBlocks = new ListWalker(listItem, {
		sameIndent: true,
		sameAttributes: "listType",
		includeSelf: true,
		direction: "forward",
		...options
	});
	return [...Array.from(backwardBlocks).reverse(), ...forwardBlocks];
}
/**
* Check if the given block is the first in the list item.
*
* @internal
* @param listBlock The list block element.
*/
function isFirstBlockOfListItem(listBlock) {
	if (!ListWalker.first(listBlock, {
		sameIndent: true,
		sameAttributes: "listItemId"
	})) return true;
	return false;
}
/**
* Check if the given block is the last in the list item.
*
* @internal
*/
function isLastBlockOfListItem(listBlock) {
	if (!ListWalker.first(listBlock, {
		direction: "forward",
		sameIndent: true,
		sameAttributes: "listItemId"
	})) return true;
	return false;
}
/**
* Expands the given list of selected blocks to include the leading and tailing blocks of partially selected list items.
*
* @internal
* @param blocks The list of selected blocks.
* @param options.withNested Whether should include nested list items.
*/
function expandListBlocksToCompleteItems(blocks, options = {}) {
	blocks = toArray(blocks);
	const higherIndent = options.withNested !== false;
	const allBlocks = /* @__PURE__ */ new Set();
	for (const block of blocks) for (const itemBlock of getAllListItemBlocks(block, { higherIndent })) allBlocks.add(itemBlock);
	return sortBlocks(allBlocks);
}
/**
* Expands the given list of selected blocks to include all the items of the lists they're in.
*
* @internal
* @param blocks The list of selected blocks.
*/
function expandListBlocksToCompleteList(blocks) {
	blocks = toArray(blocks);
	const allBlocks = /* @__PURE__ */ new Set();
	for (const block of blocks) for (const itemBlock of getListItems(block)) allBlocks.add(itemBlock);
	return sortBlocks(allBlocks);
}
/**
* Splits the list item just before the provided list block.
*
* @internal
* @param listBlock The list block element.
* @param writer The model writer.
* @returns The array of updated blocks.
*/
function splitListItemBefore(listBlock, writer) {
	const blocks = getListItemBlocks(listBlock, { direction: "forward" });
	const id = ListItemUid.next();
	for (const block of blocks) writer.setAttribute("listItemId", id, block);
	return blocks;
}
/**
* Merges the list item with the parent list item.
*
* @internal
* @param listBlock The list block element.
* @param parentBlock The list block element to merge with.
* @param writer The model writer.
* @returns The array of updated blocks.
*/
function mergeListItemBefore(listBlock, parentBlock, writer) {
	const attributes = {};
	for (const [key, value] of parentBlock.getAttributes()) if (key.startsWith("list")) attributes[key] = value;
	const blocks = getListItemBlocks(listBlock, { direction: "forward" });
	for (const block of blocks) writer.setAttributes(attributes, block);
	return blocks;
}
/**
* Increases indentation of given list blocks.
*
* @internal
* @param blocks The block or iterable of blocks.
* @param writer The model writer.
* @param options Additional options.
* @param options.expand Whether should expand the list of blocks to include complete list items.
* @param options.indentBy The number of levels the indentation should change (could be negative).
* @param options.attributeNames List of attribute names to remove when a block leaves the list (when blockIndent < 0).
*/
function indentBlocks(blocks, writer, { expand, indentBy = 1, attributeNames }) {
	blocks = toArray(blocks);
	const allBlocks = expand ? expandListBlocksToCompleteItems(blocks) : blocks;
	for (const block of allBlocks) {
		const blockIndent = block.getAttribute("listIndent") + indentBy;
		if (blockIndent < 0) removeListAttributes(block, writer, attributeNames);
		else writer.setAttribute("listIndent", blockIndent, block);
	}
	return allBlocks;
}
/**
* Decreases indentation of given list of blocks. If the indentation of some blocks matches the indentation
* of surrounding blocks, they get merged together.
*
* @internal
* @param blocks The block or iterable of blocks.
* @param writer The model writer.
* @param options Additional options.
* @param options.attributeNames List of attribute names to remove when a block leaves the list (when blockIndent < 0).
*/
function outdentBlocksWithMerge(blocks, writer, { attributeNames }) {
	blocks = toArray(blocks);
	const allBlocks = expandListBlocksToCompleteItems(blocks);
	const visited = /* @__PURE__ */ new Set();
	const referenceIndent = Math.min(...allBlocks.map((block) => block.getAttribute("listIndent")));
	const parentBlocks = /* @__PURE__ */ new Map();
	for (const block of allBlocks) parentBlocks.set(block, ListWalker.first(block, { lowerIndent: true }));
	for (const block of allBlocks) {
		if (visited.has(block)) continue;
		visited.add(block);
		const blockIndent = block.getAttribute("listIndent") - 1;
		if (blockIndent < 0) {
			removeListAttributes(block, writer, attributeNames);
			continue;
		}
		if (block.getAttribute("listIndent") == referenceIndent && parentBlocks.get(block)) {
			const mergedBlocks = mergeListItemIfNotLast(block, parentBlocks.get(block), writer);
			for (const mergedBlock of mergedBlocks) visited.add(mergedBlock);
			if (mergedBlocks.length) continue;
		}
		writer.setAttribute("listIndent", blockIndent, block);
	}
	return sortBlocks(visited);
}
/**
* Removes all list attributes from the given blocks.
*
* @internal
* @param blocks The block or iterable of blocks.
* @param writer The model writer.
* @param attributeNames List of attribute names to remove.
* @returns Array of altered blocks.
*/
function removeListAttributes(blocks, writer, attributeNames) {
	blocks = toArray(blocks);
	for (const block of blocks) if (block.is("element", "listItem")) writer.rename(block, "paragraph");
	for (const block of blocks) for (const attributeKey of block.getAttributeKeys()) if (attributeNames.includes(attributeKey)) writer.removeAttribute(attributeKey, block);
	return blocks;
}
/**
* Checks whether the given blocks are related to a single list item.
*
* @internal
* @param blocks The list block elements.
*/
function isSingleListItem(blocks) {
	if (!blocks.length) return false;
	const firstItemId = blocks[0].getAttribute("listItemId");
	if (!firstItemId) return false;
	return !blocks.some((item) => item.getAttribute("listItemId") != firstItemId);
}
/**
* Modifies the indents of list blocks following the given list block so the indentation is valid after
* the given block is no longer a list item.
*
* @internal
* @param lastBlock The last list block that has become a non-list element.
* @param writer The model writer.
* @returns Array of altered blocks.
*/
function outdentFollowingItems(lastBlock, writer) {
	const changedBlocks = [];
	let currentIndent = Number.POSITIVE_INFINITY;
	for (const { node } of new SiblingListBlocksIterator(lastBlock.nextSibling)) {
		const indent = node.getAttribute("listIndent");
		if (indent == 0) break;
		if (indent < currentIndent) currentIndent = indent;
		const newIndent = indent - currentIndent;
		writer.setAttribute("listIndent", newIndent, node);
		changedBlocks.push(node);
	}
	return changedBlocks;
}
/**
* Returns the array of given blocks sorted by model indexes (document order).
*
* @internal
*/
function sortBlocks(blocks) {
	return Array.from(blocks).filter((block) => block.root.rootName !== "$graveyard").sort((a, b) => a.index - b.index);
}
/**
* Returns a selected block object. If a selected object is inline or when there is no selected
* object, `null` is returned.
*
* @internal
* @param model The instance of editor model.
* @returns Selected block object or `null`.
*/
function getSelectedBlockObject(model) {
	const selectedElement = model.document.selection.getSelectedElement();
	if (!selectedElement) return null;
	if (model.schema.isObject(selectedElement) && model.schema.isBlock(selectedElement)) return selectedElement;
	return null;
}
/**
* Checks whether the given block can be replaced by a listItem.
*
* Note that this is possible only when multiBlock = false option is set in feature config.
*
* @param block A block to be tested.
* @param schema The schema of the document.
* @internal
*/
function canBecomeSimpleListItem(block, schema) {
	return schema.checkChild(block.parent, "listItem") && schema.checkChild(block, "$text") && !schema.isObject(block);
}
/**
* Returns true if listType is of type `numbered` or `customNumbered`.
*
* @internal
*/
function isNumberedListType(listType) {
	return listType == "numbered" || listType == "customNumbered";
}
/**
* Checks if the given list item block is the first block of the first item in its list at the given indent.
*
* Walks back over previous siblings and returns:
* - `true` if it reaches a non-list block or a list block at a lower indent (a new list begins here),
* - `false` if it finds a same-indent block of the same `listItemId` (a continuation of the current item) or of the same
*   `listType` (the visible list already has earlier items),
* - `true` if it finds a same-indent block of a different `listType` and a different `listItemId` (a different list ends; ours
*   starts here),
* - `false` if the loop ends (it reaches the first non-list-item block, or no more previous siblings) while passing only
*   higher-indent blocks (those blocks live inside an intermediate skip-level `<li style="list-style-type:none">` wrapper
*   at our indent).
*
* For example, in the model:
*
* ```
* '  # aaa'
* '# bbb'
* ```
*
* `bbb` is preceded by a higher-indent block `aaa`, which in the view is rendered inside an intermediate
* skip-level wrapper at indent 0:
*
* ```html
* <ol>
*   <li style="list-style-type:none">
*     <ol>
*       <li>aaa</li>
*     </ol>
*   </li>
*   <li>bbb</li>
* </ol>
* ```
*
* So `bbb` is the second visible item in the outer list and the function returns `false`.
*/
function isFirstListItemInList(listItem) {
	const itemIndent = listItem.getAttribute("listIndent");
	const itemListType = listItem.getAttribute("listType");
	const itemListItemId = listItem.getAttribute("listItemId");
	let previous = listItem.previousSibling;
	let sawHigherIndent = false;
	while (isListItemBlock(previous)) {
		const previousIndent = previous.getAttribute("listIndent");
		if (previousIndent < itemIndent) return true;
		if (previousIndent === itemIndent) {
			if (previous.getAttribute("listItemId") === itemListItemId) return false;
			return previous.getAttribute("listType") !== itemListType;
		}
		sawHigherIndent = true;
		previous = previous.previousSibling;
	}
	return !sawHigherIndent;
}
/**
* Merges a given block to the given parent block if parent is a list item and there is no more blocks in the same item.
*/
function mergeListItemIfNotLast(block, parentBlock, writer) {
	if (getListItemBlocks(parentBlock, { direction: "forward" }).pop().index > block.index) return mergeListItemBefore(block, parentBlock, writer);
	return [];
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/list/listindentcommand
*/
/**
* The document list indent command. It is used by the {@link module:list/list~List list feature}.
*/
var ListIndentCommand = class extends Command {
	/**
	* Determines by how much the command will change the list item's indent attribute.
	*/
	_direction;
	/**
	* Creates an instance of the command.
	*
	* @param editor The editor instance.
	* @param indentDirection The direction of indent. If it is equal to `backward`, the command
	* will outdent a list item.
	*/
	constructor(editor, indentDirection) {
		super(editor);
		this._direction = indentDirection;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Indents or outdents (depending on the {@link #constructor}'s `indentDirection` parameter) selected list items.
	*
	* @fires execute
	* @fires afterExecute
	*/
	execute() {
		const editor = this.editor;
		const model = editor.model;
		const blocks = getSelectedListBlocks(model.document.selection);
		const attributeNames = editor.plugins.get("ListEditing").getListAttributeNames();
		model.change((writer) => {
			const changedBlocks = [];
			if (isSingleListItem(blocks) && !isFirstBlockOfListItem(blocks[0])) {
				if (this._direction == "forward") changedBlocks.push(...indentBlocks(blocks, writer, { attributeNames }));
				changedBlocks.push(...splitListItemBefore(blocks[0], writer));
			} else if (this._direction == "forward") changedBlocks.push(...indentBlocks(blocks, writer, {
				expand: true,
				attributeNames
			}));
			else changedBlocks.push(...outdentBlocksWithMerge(blocks, writer, { attributeNames }));
			for (const block of changedBlocks) {
				if (!block.hasAttribute("listType")) continue;
				const previousItemBlock = ListWalker.first(block, { sameIndent: true });
				if (previousItemBlock) writer.setAttribute("listType", previousItemBlock.getAttribute("listType"), block);
			}
			this._fireAfterExecute(changedBlocks);
		});
	}
	/**
	* Fires the `afterExecute` event.
	*
	* @param changedBlocks The changed list elements.
	*/
	_fireAfterExecute(changedBlocks) {
		this.fire("afterExecute", sortBlocks(new Set(changedBlocks)));
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @returns Whether the command should be enabled.
	*/
	_checkEnabled() {
		let blocks = getSelectedListBlocks(this.editor.model.document.selection);
		let firstBlock = blocks[0];
		if (!firstBlock) return false;
		if (this._direction == "backward") return true;
		if (isSingleListItem(blocks) && !isFirstBlockOfListItem(blocks[0])) return true;
		if (this.editor.config.get("list.enableSkipLevelLists")) return true;
		blocks = expandListBlocksToCompleteItems(blocks);
		firstBlock = blocks[0];
		const siblingItem = ListWalker.first(firstBlock, { sameIndent: true });
		if (!siblingItem) return false;
		if (siblingItem.getAttribute("listType") == firstBlock.getAttribute("listType")) return true;
		return false;
	}
};
/**
* Returns an array of selected blocks truncated to the first non list block element.
*/
function getSelectedListBlocks(selection) {
	const blocks = Array.from(selection.getSelectedBlocks());
	const firstNonListBlockIndex = blocks.findIndex((block) => !isListItemBlock(block));
	if (firstNonListBlockIndex != -1) blocks.length = firstNonListBlockIndex;
	return blocks;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The list command. It is used by the {@link module:list/list~List list feature}.
*/
var ListCommand = class extends Command {
	/**
	* The type of the list created by the command.
	*/
	type;
	/**
	* List Walker options that change the range of the list items to be changed when the selection is collapsed within a list item.
	*
	* In a multi-level list, when the selection is collapsed within a list item, instead of changing only the list items of the same list
	* type and current indent level, the entire list structure is changed (all list items at all indent levels of any list type).
	*/
	_listWalkerOptions;
	/**
	* Creates an instance of the command.
	*
	* @param editor The editor instance.
	* @param type List type that will be handled by this command.
	*/
	constructor(editor, type, options = {}) {
		super(editor);
		this.type = type;
		this._listWalkerOptions = options.multiLevel ? {
			higherIndent: true,
			lowerIndent: true,
			sameAttributes: []
		} : void 0;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.value = this._getValue();
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Executes the list command.
	*
	* @fires execute
	* @fires afterExecute
	* @param options Command options.
	* @param options.forceValue If set, it will force the command behavior. If `true`, the command will try to convert the
	* selected items and potentially the neighbor elements to the proper list items. If set to `false` it will convert selected elements
	* to paragraphs. If not set, the command will toggle selected elements to list items or paragraphs, depending on the selection.
	* @param options.additionalAttributes Additional attributes that are set for list items when the command is executed.
	*/
	execute(options = {}) {
		const model = this.editor.model;
		const document = model.document;
		const selectedBlockObject = getSelectedBlockObject(model);
		const blocks = Array.from(document.selection.getSelectedBlocks()).filter((block) => model.schema.checkAttribute(block, "listType") || canBecomeSimpleListItem(block, model.schema));
		const turnOff = options.forceValue !== void 0 ? !options.forceValue : this.value;
		model.change((writer) => {
			if (turnOff) {
				const lastBlock = blocks[blocks.length - 1];
				const attributeNames = this.editor.plugins.get("ListEditing").getListAttributeNames();
				const itemBlocks = getListItemBlocks(lastBlock, { direction: "forward" });
				const changedBlocks = [];
				if (itemBlocks.length > 1) changedBlocks.push(...splitListItemBefore(itemBlocks[1], writer));
				changedBlocks.push(...removeListAttributes(blocks, writer, attributeNames));
				changedBlocks.push(...outdentFollowingItems(lastBlock, writer));
				this._fireAfterExecute(changedBlocks);
			} else if ((selectedBlockObject || document.selection.isCollapsed) && isListItemBlock(blocks[0])) {
				const changedBlocks = getListItems(selectedBlockObject || blocks[0], this._listWalkerOptions);
				for (const block of changedBlocks) writer.setAttributes({
					...options.additionalAttributes,
					listType: this.type
				}, block);
				this._fireAfterExecute(changedBlocks);
			} else {
				const changedBlocks = [];
				for (const block of blocks) if (!block.hasAttribute("listType")) {
					if (!block.is("element", "listItem") && canBecomeSimpleListItem(block, model.schema)) writer.rename(block, "listItem");
					writer.setAttributes({
						...options.additionalAttributes,
						listIndent: 0,
						listItemId: ListItemUid.next(),
						listType: this.type
					}, block);
					changedBlocks.push(block);
				} else for (const node of expandListBlocksToCompleteItems(block, { withNested: false })) if (node.getAttribute("listType") != this.type) {
					writer.setAttributes({
						...options.additionalAttributes,
						listType: this.type
					}, node);
					changedBlocks.push(node);
				}
				this._fireAfterExecute(changedBlocks);
			}
		});
	}
	/**
	* Fires the `afterExecute` event.
	*
	* @param changedBlocks The changed list elements.
	*/
	_fireAfterExecute(changedBlocks) {
		this.fire("afterExecute", sortBlocks(new Set(changedBlocks)));
	}
	/**
	* Checks the command's {@link #value}.
	*
	* @returns The current value.
	*/
	_getValue() {
		const selection = this.editor.model.document.selection;
		const blocks = Array.from(selection.getSelectedBlocks());
		if (!blocks.length) return false;
		for (const block of blocks) if (block.getAttribute("listType") != this.type) return false;
		return true;
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @returns Whether the command should be enabled.
	*/
	_checkEnabled() {
		const model = this.editor.model;
		const schema = model.schema;
		const selection = model.document.selection;
		const blocks = Array.from(selection.getSelectedBlocks());
		if (!blocks.length) return false;
		if (this.value) return true;
		for (const block of blocks) if (schema.checkAttribute(block, "listType") || canBecomeSimpleListItem(block, schema)) return true;
		return false;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/list/listmergecommand
*/
/**
* The document list merge command. It is used by the {@link module:list/list~List list feature}.
*/
var ListMergeCommand = class extends Command {
	/**
	* Whether list item should be merged before or after the selected block.
	*/
	_direction;
	/**
	* Creates an instance of the command.
	*
	* @param editor The editor instance.
	* @param direction Whether list item should be merged before or after the selected block.
	*/
	constructor(editor, direction) {
		super(editor);
		this._direction = direction;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Merges list blocks together (depending on the {@link #constructor}'s `direction` parameter).
	*
	* @fires execute
	* @fires afterExecute
	* @param options Command options.
	* @param options.shouldMergeOnBlocksContentLevel When set `true`, merging will be performed together
	* with {@link module:engine/model/model~Model#deleteContent} to get rid of the inline content in the selection or take advantage
	* of the heuristics in `deleteContent()` that helps convert lists into paragraphs in certain cases.
	*/
	execute({ shouldMergeOnBlocksContentLevel = false } = {}) {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;
		const changedBlocks = [];
		const attributeNames = editor.plugins.get("ListEditing").getListAttributeNames();
		model.change((writer) => {
			const { firstElement, lastElement } = this._getMergeSubjectElements(selection, shouldMergeOnBlocksContentLevel);
			if (!firstElement || !lastElement) return;
			const firstIndent = firstElement.getAttribute("listIndent") || 0;
			const lastIndent = lastElement.getAttribute("listIndent");
			const lastElementId = lastElement.getAttribute("listItemId");
			if (firstIndent != lastIndent) {
				const nestedLastElementBlocks = getNestedListBlocks(lastElement);
				changedBlocks.push(...indentBlocks([lastElement, ...nestedLastElementBlocks], writer, {
					indentBy: firstIndent - lastIndent,
					expand: firstIndent < lastIndent,
					attributeNames
				}));
			}
			if (shouldMergeOnBlocksContentLevel) {
				let sel = selection;
				if (selection.isCollapsed) sel = writer.createSelection(writer.createRange(writer.createPositionAt(firstElement, "end"), writer.createPositionAt(lastElement, 0)));
				model.deleteContent(sel, { doNotResetEntireContent: selection.isCollapsed });
				const lastElementAfterDelete = sel.getLastPosition().parent;
				const nextSibling = lastElementAfterDelete.nextSibling;
				changedBlocks.push(lastElementAfterDelete);
				if (nextSibling && nextSibling !== lastElement && nextSibling.getAttribute("listItemId") == lastElementId) changedBlocks.push(...mergeListItemBefore(nextSibling, lastElementAfterDelete, writer));
			} else changedBlocks.push(...mergeListItemBefore(lastElement, firstElement, writer));
			this._fireAfterExecute(changedBlocks);
		});
	}
	/**
	* Fires the `afterExecute` event.
	*
	* @param changedBlocks The changed list elements.
	*/
	_fireAfterExecute(changedBlocks) {
		this.fire("afterExecute", sortBlocks(new Set(changedBlocks)));
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @returns Whether the command should be enabled.
	*/
	_checkEnabled() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedBlockObject = getSelectedBlockObject(model);
		if (selection.isCollapsed || selectedBlockObject) {
			const positionParent = selectedBlockObject || selection.getFirstPosition().parent;
			if (!isListItemBlock(positionParent)) return false;
			const siblingNode = this._direction == "backward" ? positionParent.previousSibling : positionParent.nextSibling;
			if (!siblingNode) return false;
			if (isSingleListItem([positionParent, siblingNode])) return false;
		} else {
			const lastPosition = selection.getLastPosition();
			const firstPosition = selection.getFirstPosition();
			if (lastPosition.parent === firstPosition.parent) return false;
			if (!isListItemBlock(lastPosition.parent)) return false;
		}
		return true;
	}
	/**
	* Returns the boundary elements the merge should be executed for. These are not necessarily selection's first
	* and last position parents but sometimes sibling or even further blocks depending on the context.
	*
	* @param selection The selection the merge is executed for.
	* @param shouldMergeOnBlocksContentLevel When `true`, merge is performed together with
	* {@link module:engine/model/model~Model#deleteContent} to remove the inline content within the selection.
	*/
	_getMergeSubjectElements(selection, shouldMergeOnBlocksContentLevel) {
		const model = this.editor.model;
		const selectedBlockObject = getSelectedBlockObject(model);
		let firstElement, lastElement;
		if (selection.isCollapsed || selectedBlockObject) {
			const positionParent = selectedBlockObject || selection.getFirstPosition().parent;
			const isFirstBlock = isFirstBlockOfListItem(positionParent);
			if (this._direction == "backward") {
				lastElement = positionParent;
				if (isFirstBlock && !shouldMergeOnBlocksContentLevel) {
					firstElement = ListWalker.first(positionParent, {
						sameIndent: true,
						lowerIndent: true
					});
					if (!firstElement && isListItemBlock(positionParent.previousSibling)) firstElement = positionParent.previousSibling;
				} else firstElement = positionParent.previousSibling;
			} else {
				firstElement = positionParent;
				lastElement = positionParent.nextSibling;
			}
		} else {
			firstElement = selection.getFirstPosition().parent;
			lastElement = selection.getLastPosition().parent;
		}
		return {
			firstElement,
			lastElement
		};
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The document list split command that splits the list item at the selection.
*
* It is used by the {@link module:list/list~List list feature}.
*/
var ListSplitCommand = class extends Command {
	/**
	* Whether list item should be split before or after the selected block.
	*/
	_direction;
	/**
	* Creates an instance of the command.
	*
	* @param editor The editor instance.
	* @param direction Whether list item should be split before or after the selected block.
	*/
	constructor(editor, direction) {
		super(editor);
		this._direction = direction;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Splits the list item at the selection.
	*
	* @fires execute
	* @fires afterExecute
	*/
	execute() {
		this.editor.model.change((writer) => {
			const changedBlocks = splitListItemBefore(this._getStartBlock(), writer);
			this._fireAfterExecute(changedBlocks);
		});
	}
	/**
	* Fires the `afterExecute` event.
	*
	* @param changedBlocks The changed list elements.
	*/
	_fireAfterExecute(changedBlocks) {
		this.fire("afterExecute", sortBlocks(new Set(changedBlocks)));
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @returns Whether the command should be enabled.
	*/
	_checkEnabled() {
		const selection = this.editor.model.document.selection;
		const block = this._getStartBlock();
		return selection.isCollapsed && isListItemBlock(block) && !isFirstBlockOfListItem(block);
	}
	/**
	* Returns the model element that is the main focus of the command (according to the current selection and command direction).
	*/
	_getStartBlock() {
		const positionParent = this.editor.model.document.selection.getFirstPosition().parent;
		return this._direction == "before" ? positionParent : positionParent.nextSibling;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listformatting/listitemboldintegration
*/
/**
* The list item bold integration plugin.
*/
var ListItemBoldIntegration = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListItemBoldIntegration";
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
		return [ListEditing];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const ListFormatting = editor.plugins.get("ListFormatting");
		const listEditing = editor.plugins.get(ListEditing);
		if (!editor.plugins.has("BoldEditing") || !this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		ListFormatting.registerFormatAttribute("bold", "listItemBold");
		listEditing.registerDowncastStrategy({
			scope: "item",
			attributeName: "listItemBold",
			setAttributeOnDowncast(writer, value, viewElement, options) {
				/* v8 ignore next -- Downcast callbacks are only registered for meaningful list marker formatting values. */
				if (value) {
					writer.addClass("ck-list-marker-bold", viewElement);
					if (env.isSafari && !(options && options.dataPipeline)) writer.setStyle("--ck-content-list-marker-dummy-bold", "0", viewElement);
				}
			}
		});
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		const editor = this.editor;
		const model = editor.model;
		if (!editor.plugins.has("BoldEditing") || !this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		model.schema.extend("$listItem", { allowAttributes: "listItemBold" });
		model.schema.setAttributeProperties("listItemBold", { isFormatting: true });
		model.schema.addAttributeCheck((context) => {
			if (!context.last.getAttribute("listItemId")) return false;
		}, "listItemBold");
		editor.conversion.for("upcast").attributeToAttribute({
			model: "listItemBold",
			view: {
				name: "li",
				classes: "ck-list-marker-bold"
			}
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listformatting/listitemitalicintegration
*/
/**
* The list item italic integration plugin.
*/
var ListItemItalicIntegration = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListItemItalicIntegration";
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
		return [ListEditing];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const ListFormatting = editor.plugins.get("ListFormatting");
		const listEditing = editor.plugins.get(ListEditing);
		if (!editor.plugins.has("ItalicEditing") || !this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		ListFormatting.registerFormatAttribute("italic", "listItemItalic");
		listEditing.registerDowncastStrategy({
			scope: "item",
			attributeName: "listItemItalic",
			setAttributeOnDowncast(writer, value, viewElement, options) {
				/* v8 ignore next -- Downcast callbacks are only registered for meaningful list marker formatting values. */
				if (value) {
					writer.addClass("ck-list-marker-italic", viewElement);
					if (env.isSafari && !(options && options.dataPipeline)) writer.setStyle("--ck-content-list-marker-dummy-italic", "0", viewElement);
				}
			}
		});
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		const editor = this.editor;
		const model = editor.model;
		if (!editor.plugins.has("ItalicEditing") || !this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		model.schema.extend("$listItem", { allowAttributes: "listItemItalic" });
		model.schema.setAttributeProperties("listItemItalic", { isFormatting: true });
		model.schema.addAttributeCheck((context) => {
			if (!context.last.getAttribute("listItemId")) return false;
		}, "listItemItalic");
		editor.conversion.for("upcast").attributeToAttribute({
			model: "listItemItalic",
			view: {
				name: "li",
				classes: "ck-list-marker-italic"
			}
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listformatting/listitemfontsizeintegration
*/
/**
* The list item font size integration plugin.
*/
var ListItemFontSizeIntegration = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListItemFontSizeIntegration";
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
		return [ListEditing];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const ListFormatting = editor.plugins.get("ListFormatting");
		const listEditing = editor.plugins.get(ListEditing);
		if (!editor.plugins.has("FontSizeEditing") || !this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		const normalizedFontSizeOptions = _normalizeFontSizeOptions(editor.config.get("fontSize.options"));
		ListFormatting.registerFormatAttribute("fontSize", "listItemFontSize");
		listEditing.registerDowncastStrategy({
			scope: "item",
			attributeName: "listItemFontSize",
			setAttributeOnDowncast(writer, value, viewElement, options) {
				/* v8 ignore next -- Downcast callbacks are only registered for meaningful list marker formatting values. */
				if (value) {
					const fontSizeOption = normalizedFontSizeOptions.find((option) => option.model == value);
					if (fontSizeOption && fontSizeOption.view && typeof fontSizeOption.view != "string") {
						if (fontSizeOption.view.styles) {
							writer.addClass("ck-list-marker-font-size", viewElement);
							writer.setStyle("--ck-content-list-marker-font-size", fontSizeOption.view.styles["font-size"], viewElement);
						} else if (fontSizeOption.view.classes) {
							writer.addClass(`ck-list-marker-font-size-${value}`, viewElement);
							if (env.isSafari && !(options && options.dataPipeline)) writer.setStyle("--ck-content-list-marker-dummy-font-size", "0", viewElement);
						}
					} else {
						writer.addClass("ck-list-marker-font-size", viewElement);
						writer.setStyle("--ck-content-list-marker-font-size", value, viewElement);
					}
				}
			}
		});
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		const editor = this.editor;
		const model = editor.model;
		if (!editor.plugins.has("FontSizeEditing") || !this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		model.schema.extend("$listItem", { allowAttributes: "listItemFontSize" });
		model.schema.setAttributeProperties("listItemFontSize", { isFormatting: true });
		model.schema.addAttributeCheck((context) => {
			if (!context.last.getAttribute("listItemId")) return false;
		}, "listItemFontSize");
		editor.conversion.for("upcast").elementToAttribute({
			model: {
				key: "listItemFontSize",
				value: (viewElement) => viewElement.getStyle("--ck-content-list-marker-font-size")
			},
			view: {
				name: "li",
				classes: "ck-list-marker-font-size",
				styles: { "--ck-content-list-marker-font-size": /.*/ }
			}
		});
		const fontSizeOptions = _normalizeFontSizeOptions(editor.config.get("fontSize.options"));
		for (const option of fontSizeOptions)
 /* v8 ignore next -- Normalized font size options used by the integration provide model and view values. */
		if (option.model && option.view) editor.conversion.for("upcast").elementToAttribute({
			model: {
				key: "listItemFontSize",
				value: option.model
			},
			view: {
				name: "li",
				classes: `ck-list-marker-font-size-${option.model}`
			}
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listformatting/listitemfontcolorintegration
*/
/**
* The list item font color integration plugin.
*/
var ListItemFontColorIntegration = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListItemFontColorIntegration";
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
		return [ListEditing];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const ListFormatting = editor.plugins.get("ListFormatting");
		const listEditing = editor.plugins.get(ListEditing);
		if (!editor.plugins.has("FontColorEditing") || !this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		ListFormatting.registerFormatAttribute("fontColor", "listItemFontColor");
		listEditing.registerDowncastStrategy({
			scope: "item",
			attributeName: "listItemFontColor",
			setAttributeOnDowncast(writer, value, viewElement) {
				/* v8 ignore next -- Downcast callbacks are only registered for meaningful list marker formatting values. */
				if (value) {
					writer.addClass("ck-list-marker-color", viewElement);
					writer.setStyle("--ck-content-list-marker-color", value, viewElement);
				}
			}
		});
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		const editor = this.editor;
		const model = editor.model;
		if (!editor.plugins.has("FontColorEditing") || !this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		model.schema.extend("$listItem", { allowAttributes: "listItemFontColor" });
		model.schema.setAttributeProperties("listItemFontColor", { isFormatting: true });
		model.schema.addAttributeCheck((context) => {
			if (!context.last.getAttribute("listItemId")) return false;
		}, "listItemFontColor");
		editor.conversion.for("upcast").attributeToAttribute({
			model: {
				key: "listItemFontColor",
				value: (viewElement) => {
					return viewElement.getStyle("--ck-content-list-marker-color");
				}
			},
			view: {
				name: "li",
				classes: "ck-list-marker-color",
				styles: { "--ck-content-list-marker-color": /.*/ }
			}
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listformatting/listitemfontfamilyintegration
*/
/**
* The list item font family integration plugin.
*/
var ListItemFontFamilyIntegration = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListItemFontFamilyIntegration";
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
		return [ListEditing];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const ListFormatting = editor.plugins.get("ListFormatting");
		const listEditing = editor.plugins.get(ListEditing);
		if (!editor.plugins.has("FontFamilyEditing") || !this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		ListFormatting.registerFormatAttribute("fontFamily", "listItemFontFamily");
		listEditing.registerDowncastStrategy({
			scope: "item",
			attributeName: "listItemFontFamily",
			setAttributeOnDowncast(writer, value, viewElement) {
				/* v8 ignore next -- Downcast callbacks are only registered for meaningful list marker formatting values. */
				if (value) {
					writer.addClass("ck-list-marker-font-family", viewElement);
					writer.setStyle("--ck-content-list-marker-font-family", value, viewElement);
				}
			}
		});
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		const editor = this.editor;
		const model = editor.model;
		if (!editor.plugins.has("FontFamilyEditing") || !this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		model.schema.extend("$listItem", { allowAttributes: "listItemFontFamily" });
		model.schema.setAttributeProperties("listItemFontFamily", { isFormatting: true });
		model.schema.addAttributeCheck((context) => {
			if (!context.last.getAttribute("listItemId")) return false;
		}, "listItemFontFamily");
		editor.conversion.for("upcast").attributeToAttribute({
			model: {
				key: "listItemFontFamily",
				value: (viewElement) => {
					return viewElement.getStyle("--ck-content-list-marker-font-family");
				}
			},
			view: {
				name: "li",
				classes: "ck-list-marker-font-family",
				styles: { "--ck-content-list-marker-font-family": /.*/ }
			}
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listformatting
*/
/**
* The list formatting plugin.
*
* It enables integration with formatting plugins to style the list marker.
* The list marker is styled based on the consistent formatting applied to the content of the list item.
*
* The list of supported formatting plugins includes:
* * Font color.
* * Font size.
* * Font family.
* * Bold.
* * Italic.
*/
var ListFormatting = class extends Plugin {
	/**
	* The list of loaded formatting.
	*/
	_loadedFormatting = {};
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListFormatting";
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
			ListItemBoldIntegration,
			ListItemItalicIntegration,
			ListItemFontSizeIntegration,
			ListItemFontColorIntegration,
			ListItemFontFamilyIntegration
		];
	}
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		editor.config.define("list.enableListItemMarkerFormatting", true);
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		if (!this.editor.config.get("list.enableListItemMarkerFormatting")) return;
		this._registerPostfixerForListItemFormatting();
	}
	/**
	* Registers a postfixer that ensures that the list item formatting attribute is consistent with the formatting
	* applied to the content of the list item.
	*/
	_registerPostfixerForListItemFormatting() {
		const model = this.editor.model;
		model.document.registerPostFixer((writer) => {
			const changes = model.document.differ.getChanges();
			const modifiedListItems = /* @__PURE__ */ new Set();
			let returnValue = false;
			for (const entry of changes) if (entry.type === "attribute") {
				if (entry.attributeKey == "listItemId" || entry.attributeKey == "listType" || this._isInlineOrSelectionFormatting(entry.attributeKey) || Object.values(this._loadedFormatting).includes(entry.attributeKey)) {
					if (isListItemBlock(entry.range.start.nodeAfter)) modifiedListItems.add(entry.range.start.nodeAfter);
					else if (isListItemBlock(entry.range.start.parent)) modifiedListItems.add(entry.range.start.parent);
				}
			} else {
				if (isListItemBlock(entry.position.nodeAfter)) modifiedListItems.add(entry.position.nodeAfter);
				if (isListItemBlock(entry.position.nodeBefore)) modifiedListItems.add(entry.position.nodeBefore);
				if (isListItemBlock(entry.position.parent)) modifiedListItems.add(entry.position.parent);
				if (entry.type == "insert" && entry.name != "$text") {
					const range = writer.createRangeIn(entry.position.nodeAfter);
					for (const item of range.getItems()) if (isListItemBlock(item)) modifiedListItems.add(item);
				}
			}
			for (const listItem of modifiedListItems) {
				const formats = getListItemConsistentFormat(model, listItem, Object.keys(this._loadedFormatting));
				for (const [formatAttributeName, formatValue] of Object.entries(formats)) {
					const listItemFormatAttributeName = this._loadedFormatting[formatAttributeName];
					if (formatValue && setFormattingToListItem(writer, listItem, listItemFormatAttributeName, formatValue)) returnValue = true;
					else if (!formatValue && removeFormattingFromListItem(writer, listItem, listItemFormatAttributeName)) returnValue = true;
				}
			}
			return returnValue;
		});
	}
	/**
	* Registers an integration between a default attribute (e.g., `fontFamily`) and a new attribute
	* intended specifically for list item elements (e.g., `listItemFontFamily`).
	*
	* These attributes are later used by the postfixer logic to determine whether to add the new attribute
	* to the list item element, based on whether there is a consistent default formatting attribute
	* applied within its content.
	*/
	registerFormatAttribute(formatAttribute, listItemFormatAttribute) {
		this._loadedFormatting[formatAttribute] = listItemFormatAttribute;
	}
	/**
	* Returns true if the given model attribute name is a supported inline formatting attribute.
	*/
	_isInlineOrSelectionFormatting(attributeKey) {
		return attributeKey.replace(/^selection:/, "") in this._loadedFormatting;
	}
};
/**
* Returns the consistent format of the list item element.
* If the list item contains multiple blocks, it checks only the first block.
*/
function getListItemConsistentFormat(model, listItem, attributeKeys) {
	if (isFirstBlockOfListItem(listItem)) return getSingleListItemConsistentFormat(model, listItem, attributeKeys);
	return getSingleListItemConsistentFormat(model, getAllListItemBlocks(listItem)[0], attributeKeys);
}
/**
* Returns the consistent format of a single list item element.
*/
function getSingleListItemConsistentFormat(model, listItem, attributeKeys) {
	if (!isNumberedOrBulletedList(listItem) || model.schema.isLimit(listItem)) return Object.fromEntries(attributeKeys.map((attributeKey) => [attributeKey]));
	if (listItem.isEmpty) return Object.fromEntries(attributeKeys.map((attributeKey) => [attributeKey, listItem.getAttribute(`selection:${attributeKey}`)]));
	const attributesToCheck = new Set(attributeKeys);
	const valuesMap = {};
	const walker = model.createRangeIn(listItem).getWalker({ ignoreElementEnd: true });
	for (const { item } of walker) {
		for (const attributeKey of attributesToCheck) if (model.schema.checkAttribute(item, attributeKey)) {
			const formatAttribute = item.getAttribute(attributeKey);
			if (formatAttribute === void 0) {
				attributesToCheck.delete(attributeKey);
				valuesMap[attributeKey] = void 0;
			} else if (valuesMap[attributeKey] === void 0) valuesMap[attributeKey] = formatAttribute;
			else if (valuesMap[attributeKey] !== formatAttribute) {
				attributesToCheck.delete(attributeKey);
				valuesMap[attributeKey] = void 0;
			}
		} else if (!(attributeKey in valuesMap)) valuesMap[attributeKey] = void 0;
		if (!attributesToCheck.size) break;
		if (model.schema.isLimit(item)) walker.jumpTo(model.createPositionAfter(item));
	}
	return valuesMap;
}
/**
* Adds the specified formatting attribute to the list item element.
*/
function setFormattingToListItem(writer, listItem, attributeKey, attributeValue) {
	const listItemBlocks = getAllListItemBlocks(listItem);
	let wasChanged = false;
	for (const listItem of listItemBlocks) if (!listItem.hasAttribute(attributeKey) || listItem.getAttribute(attributeKey) !== attributeValue) {
		writer.setAttribute(attributeKey, attributeValue, listItem);
		wasChanged = true;
	}
	return wasChanged;
}
/**
* Removes the specified formatting attribute from the list item element.
*/
function removeFormattingFromListItem(writer, listItem, attributeKey) {
	const listItemBlocks = getAllListItemBlocks(listItem);
	let wasChanged = false;
	for (const listItem of listItemBlocks) if (listItem.hasAttribute(attributeKey)) {
		writer.removeAttribute(attributeKey, listItem);
		wasChanged = true;
	}
	return wasChanged;
}
/**
* Checks if the given list type is a numbered or bulleted list.
*/
function isNumberedOrBulletedList(listItem) {
	return [
		"numbered",
		"bulleted",
		"customNumbered",
		"customBulleted"
	].includes(listItem.getAttribute("listType"));
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* A set of helpers related to document lists.
*/
var ListUtils = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListUtils";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* Expands the given list of selected blocks to include all the items of the lists they're in.
	*
	* @param blocks The list of selected blocks.
	*/
	expandListBlocksToCompleteList(blocks) {
		return expandListBlocksToCompleteList(blocks);
	}
	/**
	* Check if the given block is the first in the list item.
	*
	* @param listBlock The list block element.
	*/
	isFirstBlockOfListItem(listBlock) {
		return isFirstBlockOfListItem(listBlock);
	}
	/**
	* Returns true if the given model node is a list item block.
	*
	* @param node A model node.
	*/
	isListItemBlock(node) {
		return isListItemBlock(node);
	}
	/**
	* Expands the given list of selected blocks to include the leading and tailing blocks of partially selected list items.
	*
	* @param blocks The list of selected blocks.
	* @param options.withNested Whether should include nested list items.
	*/
	expandListBlocksToCompleteItems(blocks, options = {}) {
		return expandListBlocksToCompleteItems(blocks, options);
	}
	/**
	* Returns true if listType is of type `numbered` or `customNumbered`.
	*/
	isNumberedListType(listType) {
		return isNumberedListType(listType);
	}
	/**
	* Returns true if the given list item is the first item in the list.
	*/
	isFirstListItemInList(listItem) {
		return isFirstListItemInList(listItem);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Checks if view element is a list type (ul or ol).
*
* @internal
*/
function isListView(viewElement) {
	return viewElement.is("element", "ol") || viewElement.is("element", "ul");
}
/**
* Checks if view element is a list item (li).
*
* @internal
*/
function isListItemView(viewElement) {
	return viewElement.is("element", "li");
}
/**
* Calculates the indent value for a list item. Handles HTML compliant and non-compliant lists.
*
* Also, fixes non HTML compliant lists indents:
*
* ```
* before:                                     fixed list:
* OL                                          OL
* |-> LI (parent LIs: 0)                      |-> LI     (indent: 0)
*     |-> OL                                  |-> OL
*         |-> OL                                  |
*         |   |-> OL                              |
*         |       |-> OL                          |
*         |           |-> LI (parent LIs: 1)      |-> LI (indent: 1)
*         |-> LI (parent LIs: 1)                  |-> LI (indent: 1)
*
* before:                                     fixed list:
* OL                                          OL
* |-> OL                                      |
*     |-> OL                                  |
*          |-> OL                             |
*              |-> LI (parent LIs: 0)         |-> LI        (indent: 0)
*
* before:                                     fixed list:
* OL                                          OL
* |-> LI (parent LIs: 0)                      |-> LI         (indent: 0)
* |-> OL                                          |-> OL
*     |-> LI (parent LIs: 0)                          |-> LI (indent: 1)
* ```
*
* @internal
*/
function getIndent(listItem) {
	let indent = 0;
	let parent = listItem.parent;
	while (parent) {
		if (isListItemView(parent)) indent++;
		else {
			const previousSibling = parent.previousSibling;
			if (previousSibling && isListItemView(previousSibling)) indent++;
		}
		parent = parent.parent;
	}
	return indent;
}
/**
* Creates a list attribute element (ol or ul).
*
* @internal
*/
function createListElement(writer, indent, type, id = getViewElementIdForListType(type, indent)) {
	return writer.createAttributeElement(getViewElementNameForListType(type), null, {
		priority: 2 * indent / 100 - 100,
		id
	});
}
/**
* Creates a list item attribute element (li).
*
* @internal
*/
function createListItemElement(writer, indent, id) {
	return writer.createAttributeElement("li", null, {
		priority: (2 * indent + 1) / 100 - 100,
		id
	});
}
/**
* Returns a view element name for the given list type.
*
* @internal
*/
function getViewElementNameForListType(type) {
	return type == "numbered" || type == "customNumbered" ? "ol" : "ul";
}
/**
* Returns a view element ID for the given list type and indent.
*
* @internal
*/
function getViewElementIdForListType(type, indent) {
	return `list-${type}-${indent}`;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Based on the provided positions looks for the list head and stores it in the provided map.
*
* @internal
* @param position The search starting position.
* @param itemToListHead The map from list item element to the list head element.
* @param visited A set of elements that were already visited.
*/
function findAndAddListHeadToMap(position, itemToListHead, visited) {
	const previousNode = position.nodeBefore;
	if (!isListItemBlock(previousNode)) {
		const item = position.nodeAfter;
		if (isListItemBlock(item)) itemToListHead.add(item);
	} else {
		let listHead = previousNode;
		for (const { node } of new SiblingListBlocksIterator(listHead, "backward")) {
			listHead = node;
			if (visited.has(listHead)) return;
			visited.add(listHead);
			if (itemToListHead.has(previousNode)) return;
		}
		itemToListHead.add(listHead);
	}
}
/**
* Scans the list starting from the given list head element and fixes items' indentation.
*
* @internal
* @param listNodes The iterable of list nodes.
* @param writer The model writer.
* @returns Whether the model was modified.
*/
function fixListIndents(listNodes, writer) {
	let maxIndent = 0;
	let prevIndent = -1;
	let fixBy = null;
	let applied = false;
	for (const { node } of listNodes) {
		const itemIndent = node.getAttribute("listIndent");
		if (itemIndent > maxIndent) {
			let newIndent;
			if (fixBy === null) {
				fixBy = itemIndent - maxIndent;
				newIndent = maxIndent;
			} else {
				if (fixBy > itemIndent) fixBy = itemIndent;
				newIndent = itemIndent - fixBy;
			}
			if (newIndent > prevIndent + 1) newIndent = prevIndent + 1;
			writer.setAttribute("listIndent", newIndent, node);
			applied = true;
			prevIndent = newIndent;
		} else {
			fixBy = null;
			maxIndent = itemIndent + 1;
			prevIndent = itemIndent;
		}
	}
	return applied;
}
/**
* Scans the list starting from the given list head element and fixes items' types.
*
* @internal
* @param listNodes The iterable of list nodes.
* @param seenIds The set of already known IDs.
* @param writer The model writer.
* @returns Whether the model was modified.
*/
function fixListItemIds(listNodes, seenIds, writer) {
	const visited = /* @__PURE__ */ new Set();
	let applied = false;
	for (const { node } of listNodes) {
		if (visited.has(node)) continue;
		let listType = node.getAttribute("listType");
		let listItemId = node.getAttribute("listItemId");
		if (seenIds.has(listItemId)) listItemId = ListItemUid.next();
		seenIds.add(listItemId);
		if (node.is("element", "listItem")) {
			if (node.getAttribute("listItemId") != listItemId) {
				writer.setAttribute("listItemId", listItemId, node);
				applied = true;
			}
			continue;
		}
		for (const block of getListItemBlocks(node, { direction: "forward" })) {
			visited.add(block);
			if (block.getAttribute("listType") != listType) {
				listItemId = ListItemUid.next();
				listType = block.getAttribute("listType");
			}
			if (block.getAttribute("listItemId") != listItemId) {
				writer.setAttribute("listItemId", listItemId, block);
				applied = true;
			}
		}
	}
	return applied;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Returns a consuming upcast converter for skip-level list item wrappers. It detects intermediate `<li>` elements
* with `list-style-type:none` (generated by the skip-level downcast or by external sources) and consumes them
* without producing a model element, so they don't end up as empty list items in the model.
*
* The wrapper `<li>` is consumed, but its children (nested lists) are converted normally. Because `getIndent()`
* counts all ancestor `<li>` elements (including the consumed wrapper), nested items receive the correct indent
* values that reflect the skip-level gap.
*
* Only `<li>` elements whose sole meaningful content is a nested `<ul>`/`<ol>` are treated as intermediate wrappers.
* Anything else (text, paragraphs, custom elements, even an empty `<li>` with `list-style-type:none` carrying only
* attributes) falls through to the regular list item upcast, so its data and attributes can be preserved by GHS
* or other plugins.
*
* @internal
*/
function listItemSkipLevelConsumer() {
	return (evt, data, conversionApi) => {
		const viewItem = data.viewItem;
		if (viewItem.getStyle("list-style-type") !== "none") return;
		if (!isSkipLevelWrapper(viewItem)) return;
		if (!conversionApi.consumable.consume(viewItem, { name: true })) return;
		const { modelRange, modelCursor } = conversionApi.convertChildren(viewItem, data.modelCursor);
		data.modelRange = modelRange;
		data.modelCursor = modelCursor;
	};
}
/**
* Checks whether a `<li>` view element is a skip-level intermediate wrapper, i.e. its only child is a nested
* `<ul>`/`<ol>`. Any other content (text, `<br>`, `<p>`, custom elements, NBSP, etc.) disqualifies the element,
* so it is upcast as a regular list item.
*/
function isSkipLevelWrapper(viewItem) {
	let hasNestedList = false;
	for (const child of viewItem.getChildren()) {
		if (child.is("element", "ul") || child.is("element", "ol")) {
			hasNestedList = true;
			continue;
		}
		return false;
	}
	return hasNestedList;
}
/**
* Returns the upcast converter for list items. It's supposed to work after the block converters (content inside list items) are converted.
*
* @internal
*/
function listItemUpcastConverter() {
	return (evt, data, conversionApi) => {
		const { writer, schema } = conversionApi;
		if (!data.modelRange) return;
		const items = Array.from(data.modelRange.getItems({ shallow: true })).filter((item) => schema.checkAttribute(item, "listItemId"));
		if (!items.length) return;
		if (items.every((item) => item.hasAttribute("listItemId"))) return;
		const listItemId = data.viewItem.getAttribute("data-list-item-id") || ListItemUid.next();
		conversionApi.consumable.consume(data.viewItem, { attributes: "data-list-item-id" });
		const listIndent = getIndent(data.viewItem);
		let listType = data.viewItem.parent && data.viewItem.parent.is("element", "ol") ? "numbered" : "bulleted";
		const firstItemListType = items[0].getAttribute("listType");
		if (firstItemListType) listType = firstItemListType;
		const attributes = {
			listItemId,
			listIndent,
			listType
		};
		for (const item of items) if (!item.hasAttribute("listItemId")) writer.setAttributes(attributes, item);
		if (items.length > 1) {
			if (items[1].getAttribute("listItemId") != attributes.listItemId) conversionApi.keepEmptyElement(items[0]);
		}
	};
}
/**
* Returns a model document change:data event listener that triggers conversion of related items if needed.
*
* @internal
* @param model The editor model.
* @param editing The editing controller.
* @param attributeNames The list of all model list attributes (including registered strategies).
* @param listEditing The document list editing plugin.
*/
function reconvertItemsOnDataChange(model, editing, attributeNames, listEditing) {
	return () => {
		const changes = model.document.differ.getChanges();
		const itemsToRefresh = [];
		const itemToListHead = /* @__PURE__ */ new Set();
		const changedItems = /* @__PURE__ */ new Set();
		const visited = /* @__PURE__ */ new Set();
		for (const entry of changes) if (entry.type == "insert" && entry.name != "$text") {
			findAndAddListHeadToMap(entry.position, itemToListHead, visited);
			if (!entry.attributes.has("listItemId")) findAndAddListHeadToMap(entry.position.getShiftedBy(entry.length), itemToListHead, visited);
			else changedItems.add(entry.position.nodeAfter);
		} else if (entry.type == "remove" && entry.attributes.has("listItemId")) findAndAddListHeadToMap(entry.position, itemToListHead, visited);
		else if (entry.type == "attribute") {
			const item = entry.range.start.nodeAfter;
			if (attributeNames.includes(entry.attributeKey)) {
				findAndAddListHeadToMap(entry.range.start, itemToListHead, visited);
				if (entry.attributeNewValue === null) {
					findAndAddListHeadToMap(entry.range.start.getShiftedBy(1), itemToListHead, visited);
					if (doesItemBlockRequiresRefresh(item)) itemsToRefresh.push(item);
				} else changedItems.add(item);
			} else if (isListItemBlock(item)) {
				if (doesItemBlockRequiresRefresh(item)) itemsToRefresh.push(item);
			}
		}
		for (const listHead of itemToListHead.values()) itemsToRefresh.push(...collectListItemsToRefresh(listHead, changedItems));
		for (const item of new Set(itemsToRefresh)) editing.reconvertItem(item);
	};
	function collectListItemsToRefresh(listHead, changedItems) {
		const itemsToRefresh = [];
		const visited = /* @__PURE__ */ new Set();
		const stack = [];
		for (const { node, previous } of new SiblingListBlocksIterator(listHead)) {
			if (visited.has(node)) continue;
			const itemIndent = node.getAttribute("listIndent");
			if (previous && itemIndent < previous.getAttribute("listIndent")) stack.length = itemIndent + 1;
			stack[itemIndent] = {
				modelAttributes: getListModelAttributes(node),
				modelElement: node
			};
			fillStackForIntermediates(node, itemIndent, stack);
			const blocks = getListItemBlocks(node, { direction: "forward" });
			for (const block of blocks) {
				visited.add(block);
				if (doesItemBlockRequiresRefresh(block, blocks)) itemsToRefresh.push(block);
				else if (doesItemWrappingRequiresRefresh(block, stack, changedItems)) itemsToRefresh.push(block);
			}
		}
		return itemsToRefresh;
	}
	function getListModelAttributes(item) {
		return Object.fromEntries(Array.from(item.getAttributes()).filter(([key]) => attributeNames.includes(key)));
	}
	function fillStackForIntermediates(node, itemIndent, stack) {
		for (let i = itemIndent - 1; i >= 0; i--) {
			if (stack[i]) break;
			const siblingAtIndent = findSiblingListItemAt(node, i);
			let ancestorAtLowerIndent = null;
			if (!siblingAtIndent) {
				for (let k = i - 1; k >= 0; k--) if (stack[k]) {
					ancestorAtLowerIndent = stack[k].modelElement;
					break;
				}
			}
			const referenceItem = siblingAtIndent || ancestorAtLowerIndent || node;
			stack[i] = {
				modelAttributes: {
					...getListModelAttributes(referenceItem),
					listItemId: `list-item-skip-${i}`,
					listIndent: i
				},
				modelElement: referenceItem
			};
		}
	}
	function doesItemBlockRequiresRefresh(item, blocks) {
		const viewElement = editing.mapper.toViewElement(item);
		if (!viewElement) return false;
		if (isItemBlockInsideStructureSlot(viewElement)) return true;
		if (listEditing.fire("checkElement", {
			modelElement: item,
			viewElement
		})) return true;
		if (!item.is("element", "paragraph") && !item.is("element", "listItem")) return false;
		const useBogus = shouldUseBogusParagraph(item, attributeNames, blocks);
		if (useBogus && viewElement.is("element", "p")) return true;
		else if (!useBogus && viewElement.is("element", "span")) return true;
		return false;
	}
	function isItemBlockInsideStructureSlot(viewElement) {
		viewElement = viewElement.parent;
		while (viewElement.is("attributeElement") && [
			"ol",
			"ul",
			"li"
		].includes(viewElement.name)) viewElement = viewElement.parent;
		if (viewElement.getCustomProperty("$structureSlotParent") && !editing.mapper.toModelElement(viewElement)) return true;
		return false;
	}
	function doesItemWrappingRequiresRefresh(item, stack, changedItems) {
		if (changedItems.has(item)) return false;
		const viewElement = editing.mapper.toViewElement(item);
		let indent = stack.length - 1;
		for (let element = viewElement.parent; !element.is("editableElement"); element = element.parent) {
			const isListItemElement = isListItemView(element);
			const isListElement = isListView(element);
			if (!isListElement && !isListItemElement) continue;
			/* v8 ignore next -- Defensive guard for transient skip-level list stack gaps. */
			if (stack[indent]) {
				const eventName = `checkAttributes:${isListItemElement ? "item" : "list"}`;
				if (listEditing.fire(eventName, {
					viewElement: element,
					modelAttributes: stack[indent].modelAttributes,
					modelReferenceElement: stack[indent].modelElement
				})) break;
			}
			if (isListElement) {
				indent--;
				if (indent < 0) return false;
			}
		}
		return true;
	}
}
/**
* Returns the list item downcast converter.
*
* @internal
* @param attributeNames A list of attribute names that should be converted if they are set.
* @param strategies The strategies.
* @param model The model.
*/
function listItemDowncastConverter(attributeNames, strategies, model, { dataPipeline, enableSkipLevelLists }) {
	const consumer = createAttributesConsumer(attributeNames, strategies);
	return (evt, data, conversionApi) => {
		const { writer, mapper, consumable } = conversionApi;
		const listItem = data.item;
		if (!attributeNames.includes(data.attributeKey)) return;
		if (!consumer(listItem, consumable)) return;
		const options = {
			...conversionApi.options,
			dataPipeline,
			enableSkipLevelLists
		};
		const viewElement = findMappedViewElement(listItem, mapper, model, writer);
		removeCustomMarkerElements(viewElement, writer, mapper);
		unwrapListItemBlock(viewElement, writer);
		wrapListItemBlock(listItem, insertCustomMarkerElements(listItem, viewElement, strategies, writer, options), strategies, writer, options);
	};
}
/**
* The 'remove' downcast converter for custom markers.
*
* @internal
*/
function listItemDowncastRemoveConverter(schema) {
	return (evt, data, conversionApi) => {
		const { writer, mapper } = conversionApi;
		const elementName = evt.name.split(":")[1];
		if (!schema.checkAttribute(elementName, "listItemId")) return;
		const viewStart = mapper.toViewPosition(data.position);
		const modelEnd = data.position.getShiftedBy(data.length);
		const viewEnd = mapper.toViewPosition(modelEnd, { isPhantom: true });
		const viewElement = writer.createRange(viewStart, viewEnd).getTrimmed().end.nodeBefore;
		/* istanbul ignore next -- @preserve */
		if (!viewElement) return;
		removeCustomMarkerElements(viewElement, writer, mapper);
	};
}
/**
* Returns the bogus paragraph view element creator. A bogus paragraph is used if a list item contains only a single block or nested list.
*
* @internal
* @param attributeNames The list of all model list attributes (including registered strategies).
*/
function bogusParagraphCreator(attributeNames, { dataPipeline } = {}) {
	return (modelElement, { writer }) => {
		if (!shouldUseBogusParagraph(modelElement, attributeNames)) return null;
		if (!dataPipeline) return writer.createContainerElement("span", { class: "ck-list-bogus-paragraph" });
		const viewElement = writer.createContainerElement("p");
		writer.setCustomProperty("dataPipeline:transparentRendering", true, viewElement);
		return viewElement;
	};
}
/**
* Helper for mapping mode to view elements. It's using positions mapping instead of mapper.toViewElement( element )
* to find outermost view element. This is for cases when mapping is using inner view element like in the code blocks (pre > code).
*
* @internal
* @param element The model element.
* @param mapper The mapper instance.
* @param model The model.
* @param writer The view downcast writer.
*/
function findMappedViewElement(element, mapper, model, writer) {
	const modelRange = model.createRangeOn(element);
	const viewWalker = mapper.toViewRange(modelRange).getTrimmed().getWalker();
	for (const { item } of viewWalker) if (item.is("element") && item.getCustomProperty("listItemMarker")) viewWalker.jumpTo(writer.createPositionAfter(item));
	else if (item.is("element") && !item.getCustomProperty("listItemWrapper")) return item;
}
/**
* The model to view custom position mapping for cases when marker is injected at the beginning of a block.
*
* @internal
*/
function createModelToViewPositionMapper(strategies, view) {
	return (evt, data) => {
		if (data.modelPosition.offset > 0) return;
		const positionParent = data.modelPosition.parent;
		if (!isListItemBlock(positionParent)) return;
		if (!strategies.some((strategy) => strategy.scope == "itemMarker" && strategy.canInjectMarkerIntoElement && strategy.canInjectMarkerIntoElement(positionParent))) return;
		const viewElement = data.mapper.toViewElement(positionParent);
		const viewRange = view.createRangeIn(viewElement);
		const viewWalker = viewRange.getWalker();
		let positionAfterLastMarker = viewRange.start;
		for (const { item } of viewWalker) {
			if (item.is("element") && data.mapper.toModelElement(item) || item.is("$textProxy")) break;
			/* v8 ignore next -- Depends on custom marker internals in mapper position translation. */
			if (item.is("element") && item.getCustomProperty("listItemMarker")) {
				positionAfterLastMarker = view.createPositionAfter(item);
				viewWalker.skip(({ previousPosition }) => !previousPosition.isEqual(positionAfterLastMarker));
			}
		}
		data.viewPosition = positionAfterLastMarker;
	};
}
/**
* Removes a custom marker elements and item wrappers related to that marker.
*/
function removeCustomMarkerElements(viewElement, viewWriter, mapper) {
	while (viewElement.parent.is("attributeElement") && viewElement.parent.getCustomProperty("listItemWrapper")) viewWriter.unwrap(viewWriter.createRangeOn(viewElement), viewElement.parent);
	const markersToRemove = [];
	collectMarkersToRemove(viewWriter.createPositionBefore(viewElement).getWalker({ direction: "backward" }));
	collectMarkersToRemove(viewWriter.createRangeIn(viewElement).getWalker());
	for (const marker of markersToRemove) viewWriter.remove(marker);
	function collectMarkersToRemove(viewWalker) {
		for (const { item } of viewWalker) {
			if (item.is("element") && mapper.toModelElement(item)) break;
			if (item.is("element") && item.getCustomProperty("listItemMarker")) markersToRemove.push(item);
		}
	}
}
/**
* Inserts a custom marker elements and wraps first block of a list item if marker requires it.
*/
function insertCustomMarkerElements(listItem, viewElement, strategies, writer, { dataPipeline }) {
	let viewRange = writer.createRangeOn(viewElement);
	if (!isFirstBlockOfListItem(listItem)) return viewRange;
	for (const strategy of strategies) {
		if (strategy.scope != "itemMarker") continue;
		const markerElement = strategy.createElement(writer, listItem, { dataPipeline });
		if (!markerElement) continue;
		writer.setCustomProperty("listItemMarker", true, markerElement);
		if (strategy.canInjectMarkerIntoElement && strategy.canInjectMarkerIntoElement(listItem)) writer.insert(writer.createPositionAt(viewElement, 0), markerElement);
		else {
			writer.insert(viewRange.start, markerElement);
			viewRange = writer.createRange(writer.createPositionBefore(markerElement), writer.createPositionAfter(viewElement));
		}
		if (!strategy.createWrapperElement || !strategy.canWrapElement) continue;
		const wrapper = strategy.createWrapperElement(writer, listItem, { dataPipeline });
		writer.setCustomProperty("listItemWrapper", true, wrapper);
		if (strategy.canWrapElement(listItem)) viewRange = writer.wrap(viewRange, wrapper);
		else {
			viewRange = writer.wrap(writer.createRangeOn(markerElement), wrapper);
			viewRange = writer.createRange(viewRange.start, writer.createPositionAfter(viewElement));
		}
	}
	return viewRange;
}
/**
* Unwraps all ol, ul, and li attribute elements that are wrapping the provided view element.
*/
function unwrapListItemBlock(viewElement, viewWriter) {
	let attributeElement = viewElement.parent;
	while (attributeElement.is("attributeElement") && [
		"ul",
		"ol",
		"li"
	].includes(attributeElement.name)) {
		const parentElement = attributeElement.parent;
		viewWriter.unwrap(viewWriter.createRangeOn(viewElement), attributeElement);
		attributeElement = parentElement;
	}
}
/**
* Wraps the given list item with appropriate attribute elements for ul, ol, and li.
*
* For skip-level lists (where indent gaps exist, e.g. indent 0 → indent 2), this function
* generates intermediate wrapper pairs (ul/ol + li) at each missing level. These intermediate
* wrappers are invisible (`list-style-type: none` on the li). Scope `'list'` strategies are
* applied so the wrapper element (ul/ol) carries the same classes and styles as real list
* wrappers, while scope `'item'` strategies are skipped since there is no model element
* backing the intermediate level.
*/
function wrapListItemBlock(listItem, viewRange, strategies, writer, options) {
	if (!listItem.hasAttribute("listIndent")) return;
	const listItemIndent = listItem.getAttribute("listIndent");
	const enableSkipLevelLists = options.enableSkipLevelLists;
	let currentListItem = listItem;
	for (let indent = listItemIndent; indent >= 0; indent--) {
		const isIntermediate = currentListItem.getAttribute("listIndent") !== indent;
		if (isIntermediate) {
			const referenceItem = findSiblingListItemAt(listItem, indent) || currentListItem;
			const listType = referenceItem.getAttribute("listType");
			const listItemViewElement = createListItemElement(writer, indent, `list-item-skip-${indent}`);
			const listViewElement = createListElement(writer, indent, listType);
			writer.setStyle("list-style-type", "none", listItemViewElement);
			for (const strategy of strategies) if (strategy.scope == "list" && referenceItem.hasAttribute(strategy.attributeName)) strategy.setAttributeOnDowncast(writer, referenceItem.getAttribute(strategy.attributeName), listViewElement, options, referenceItem);
			viewRange = writer.wrap(viewRange, listItemViewElement);
			viewRange = writer.wrap(viewRange, listViewElement);
		} else {
			const listItemViewElement = createListItemElement(writer, indent, currentListItem.getAttribute("listItemId"));
			const listViewElement = createListElement(writer, indent, currentListItem.getAttribute("listType"));
			for (const strategy of strategies) if ((strategy.scope == "list" || strategy.scope == "item") && currentListItem.hasAttribute(strategy.attributeName)) strategy.setAttributeOnDowncast(writer, currentListItem.getAttribute(strategy.attributeName), strategy.scope == "list" ? listViewElement : listItemViewElement, options, currentListItem);
			viewRange = writer.wrap(viewRange, listItemViewElement);
			viewRange = writer.wrap(viewRange, listViewElement);
		}
		if (indent == 0) break;
		if (!isIntermediate) {
			const nextListItem = ListWalker.first(currentListItem, { lowerIndent: true });
			if (nextListItem) currentListItem = nextListItem;
			else if (!enableSkipLevelLists) break;
		}
	}
}
/**
* Walks forward from the given list item through model siblings to find the first list item block
* at exactly the specified indent level. Stops when it encounters a non-list block or a list item
* at a lower indent (which means we left the current subtree).
*/
function findSiblingListItemAt(listItem, targetIndent) {
	let node = listItem.nextSibling;
	while (node && isListItemBlock(node)) {
		const indent = node.getAttribute("listIndent");
		if (indent < targetIndent) return null;
		if (indent === targetIndent) return node;
		node = node.nextSibling;
	}
	return null;
}
function createAttributesConsumer(attributeNames, strategies) {
	const nonConsumingAttributes = strategies.filter((strategy) => strategy.consume === false).map((strategy) => strategy.attributeName);
	return (node, consumable) => {
		const events = [];
		for (const attributeName of attributeNames) if (node.hasAttribute(attributeName) && !nonConsumingAttributes.includes(attributeName)) events.push(`attribute:${attributeName}`);
		if (!events.every((event) => consumable.test(node, event) !== false)) return false;
		events.forEach((event) => consumable.consume(node, event));
		return true;
	};
}
function shouldUseBogusParagraph(item, attributeNames, blocks = getAllListItemBlocks(item)) {
	if (!isListItemBlock(item)) return false;
	for (const attributeKey of item.getAttributeKeys()) {
		if (attributeKey.startsWith("selection:") || attributeKey == "htmlEmptyBlock") continue;
		if (!attributeNames.includes(attributeKey)) return false;
	}
	return blocks.length < 2;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/list/listediting
*/
/**
* A list of base list model attributes.
*/
const LIST_BASE_ATTRIBUTES = [
	"listType",
	"listIndent",
	"listItemId"
];
/**
* The editing part of the document-list feature. It handles creating, editing and removing lists and list items.
*/
var ListEditing = class extends Plugin {
	/**
	* The list of registered downcast strategies.
	*/
	_downcastStrategies = [];
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListEditing";
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
			Enter,
			Delete,
			ListUtils,
			ClipboardPipeline,
			ListFormatting
		];
	}
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		editor.config.define("list.multiBlock", true);
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const model = editor.model;
		const multiBlock = editor.config.get("list.multiBlock");
		if (editor.plugins.has("LegacyListEditing"))
 /**
		* The `List` feature cannot be loaded together with the `LegacyList` plugin.
		*
		* @error list-feature-conflict
		* @param {string} conflictPlugin Name of the plugin.
		*/
		throw new CKEditorError("list-feature-conflict", this, { conflictPlugin: "LegacyListEditing" });
		model.schema.register("$listItem", { allowAttributes: LIST_BASE_ATTRIBUTES });
		if (multiBlock) {
			model.schema.extend("$container", { allowAttributesOf: "$listItem" });
			model.schema.extend("$block", { allowAttributesOf: "$listItem" });
			model.schema.extend("$blockObject", { allowAttributesOf: "$listItem" });
		} else model.schema.register("listItem", {
			inheritAllFrom: "$block",
			allowAttributesOf: "$listItem"
		});
		for (const attribute of LIST_BASE_ATTRIBUTES) model.schema.setAttributeProperties(attribute, { copyOnReplace: true });
		editor.commands.add("numberedList", new ListCommand(editor, "numbered"));
		editor.commands.add("bulletedList", new ListCommand(editor, "bulleted"));
		editor.commands.add("customNumberedList", new ListCommand(editor, "customNumbered", { multiLevel: true }));
		editor.commands.add("customBulletedList", new ListCommand(editor, "customBulleted", { multiLevel: true }));
		editor.commands.add("indentList", new ListIndentCommand(editor, "forward"));
		editor.commands.add("outdentList", new ListIndentCommand(editor, "backward"));
		editor.commands.add("splitListItemBefore", new ListSplitCommand(editor, "before"));
		editor.commands.add("splitListItemAfter", new ListSplitCommand(editor, "after"));
		if (multiBlock) {
			editor.commands.add("mergeListItemBackward", new ListMergeCommand(editor, "backward"));
			editor.commands.add("mergeListItemForward", new ListMergeCommand(editor, "forward"));
		}
		this._setupDeleteIntegration();
		this._setupEnterIntegration();
		this._setupTabIntegration();
		this._setupClipboardIntegration();
		this._setupAccessibilityIntegration();
		this._setupListItemIdConversionStrategy();
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		const commands = this.editor.commands;
		const indent = commands.get("indent");
		const outdent = commands.get("outdent");
		if (indent) indent.registerChildCommand(commands.get("indentList"), { priority: "high" });
		if (outdent) outdent.registerChildCommand(commands.get("outdentList"), { priority: "lowest" });
		this._setupModelPostFixing();
		this._setupConversion();
	}
	/**
	* Registers a downcast strategy.
	*
	* **Note**: Strategies must be registered in the `Plugin#init()` phase so that it can be applied
	* in the `ListEditing#afterInit()`.
	*
	* @param strategy The downcast strategy to register.
	*/
	registerDowncastStrategy(strategy) {
		this._downcastStrategies.push(strategy);
	}
	/**
	* Returns list of model attribute names that should affect downcast conversion.
	*/
	getListAttributeNames() {
		return [...LIST_BASE_ATTRIBUTES, ...this._downcastStrategies.map((strategy) => strategy.attributeName)];
	}
	/**
	* Attaches the listener to the {@link module:engine/view/document~ViewDocument#event:delete} event and handles backspace/delete
	* keys in and around document lists.
	*/
	_setupDeleteIntegration() {
		const editor = this.editor;
		const mergeBackwardCommand = editor.commands.get("mergeListItemBackward");
		const mergeForwardCommand = editor.commands.get("mergeListItemForward");
		this.listenTo(editor.editing.view.document, "delete", (evt, data) => {
			const selection = editor.model.document.selection;
			if (getSelectedBlockObject(editor.model)) return;
			editor.model.change(() => {
				const firstPosition = selection.getFirstPosition();
				if (selection.isCollapsed && data.direction == "backward") {
					if (!firstPosition.isAtStart) return;
					const positionParent = firstPosition.parent;
					if (!isListItemBlock(positionParent)) return;
					const previousBlock = ListWalker.first(positionParent, {
						sameAttributes: "listType",
						sameIndent: true
					});
					const hasNoMergeTarget = positionParent.getAttribute("listIndent") === 0 || !isListItemBlock(positionParent.previousSibling);
					if (!previousBlock && hasNoMergeTarget) {
						if (!isLastBlockOfListItem(positionParent)) editor.execute("splitListItemAfter");
						editor.execute("outdentList");
					} else {
						if (!mergeBackwardCommand || !mergeBackwardCommand.isEnabled) return;
						mergeBackwardCommand.execute({ shouldMergeOnBlocksContentLevel: shouldMergeOnBlocksContentLevel(editor.model, "backward") });
					}
					data.preventDefault();
					evt.stop();
				} else {
					if (selection.isCollapsed && !selection.getLastPosition().isAtEnd) return;
					if (!mergeForwardCommand || !mergeForwardCommand.isEnabled) return;
					mergeForwardCommand.execute({ shouldMergeOnBlocksContentLevel: shouldMergeOnBlocksContentLevel(editor.model, "forward") });
					data.preventDefault();
					evt.stop();
				}
			});
		}, { context: "li" });
	}
	/**
	* Attaches a listener to the {@link module:engine/view/document~ViewDocument#event:enter} event and handles enter key press
	* in document lists.
	*/
	_setupEnterIntegration() {
		const editor = this.editor;
		const model = editor.model;
		const commands = editor.commands;
		const enterCommand = commands.get("enter");
		this.listenTo(editor.editing.view.document, "enter", (evt, data) => {
			const doc = model.document;
			const positionParent = doc.selection.getFirstPosition().parent;
			if (doc.selection.isCollapsed && isListItemBlock(positionParent) && positionParent.isEmpty && !data.isSoft) {
				const isFirstBlock = isFirstBlockOfListItem(positionParent);
				const isLastBlock = isLastBlockOfListItem(positionParent);
				if (isFirstBlock && isLastBlock) {
					editor.execute("outdentList");
					data.preventDefault();
					evt.stop();
				} else if (isFirstBlock && !isLastBlock) {
					editor.execute("splitListItemAfter");
					data.preventDefault();
					evt.stop();
				} else if (isLastBlock) {
					editor.execute("splitListItemBefore");
					data.preventDefault();
					evt.stop();
				}
			}
		}, { context: "li" });
		this.listenTo(enterCommand, "afterExecute", () => {
			const splitCommand = commands.get("splitListItemBefore");
			splitCommand.refresh();
			if (!splitCommand.isEnabled) return;
			const positionParent = editor.model.document.selection.getLastPosition().parent;
			if (getAllListItemBlocks(positionParent).length === 2) splitCommand.execute();
		});
	}
	/**
	* Attaches a listener to the {@link module:engine/view/document~ViewDocument#event:tab} event and handles tab key and tab+shift keys
	* presses in document lists.
	*/
	_setupTabIntegration() {
		const editor = this.editor;
		this.listenTo(editor.editing.view.document, "tab", (evt, data) => {
			const commandName = data.shiftKey ? "outdentList" : "indentList";
			if (this.editor.commands.get(commandName).isEnabled) {
				editor.execute(commandName);
				data.stopPropagation();
				data.preventDefault();
				evt.stop();
			}
		}, { context: "li" });
	}
	/**
	* Registers the conversion helpers for the document-list feature.
	*/
	_setupConversion() {
		const editor = this.editor;
		const model = editor.model;
		const attributeNames = this.getListAttributeNames();
		const multiBlock = editor.config.get("list.multiBlock");
		const elementName = multiBlock ? "paragraph" : "listItem";
		const enableSkipLevelLists = !!editor.config.get("list.enableSkipLevelLists");
		editor.conversion.for("upcast").elementToElement({
			view: "li",
			model: (viewElement, { writer }) => writer.createElement(elementName, { listType: "" })
		}).elementToElement({
			view: "p",
			model: (viewElement, { writer }) => {
				if (viewElement.parent && viewElement.parent.is("element", "li")) return writer.createElement(elementName, { listType: "" });
				return null;
			},
			converterPriority: "high"
		}).add((dispatcher) => {
			dispatcher.on("element:p", (evt, data, conversionApi) => {
				const viewElement = data.viewItem;
				if (!viewElement.parent || !viewElement.parent.is("element", "li")) return;
				if (viewElement.isEmpty) return;
				if (!viewElement.getAttributeKeys().next().done) return;
				for (const sibling of viewElement.parent.getChildren()) {
					if (sibling === viewElement) continue;
					if (sibling.is("element", "ol") || sibling.is("element", "ul")) continue;
					return;
				}
				conversionApi.consumable.consume(viewElement, { name: true });
				const { modelRange, modelCursor } = conversionApi.convertChildren(viewElement, data.modelCursor);
				data.modelRange = modelRange;
				data.modelCursor = modelCursor;
			}, { priority: "highest" });
			if (enableSkipLevelLists) dispatcher.on("element:li", listItemSkipLevelConsumer(), { priority: "high" });
			dispatcher.on("element:li", listItemUpcastConverter());
		});
		if (!multiBlock) editor.conversion.for("downcast").elementToElement({
			model: "listItem",
			view: "p"
		});
		editor.conversion.for("editingDowncast").elementToElement({
			model: elementName,
			view: bogusParagraphCreator(attributeNames),
			converterPriority: "high"
		}).add((dispatcher) => {
			dispatcher.on("attribute", listItemDowncastConverter(attributeNames, this._downcastStrategies, model, { enableSkipLevelLists }));
			dispatcher.on("remove", listItemDowncastRemoveConverter(model.schema));
		});
		editor.conversion.for("dataDowncast").elementToElement({
			model: elementName,
			view: bogusParagraphCreator(attributeNames, { dataPipeline: true }),
			converterPriority: "high"
		}).add((dispatcher) => {
			dispatcher.on("attribute", listItemDowncastConverter(attributeNames, this._downcastStrategies, model, {
				dataPipeline: true,
				enableSkipLevelLists
			}));
		});
		const modelToViewPositionMapper = createModelToViewPositionMapper(this._downcastStrategies, editor.editing.view);
		editor.editing.mapper.on("modelToViewPosition", modelToViewPositionMapper);
		editor.data.mapper.on("modelToViewPosition", modelToViewPositionMapper);
		this.listenTo(model.document, "change:data", reconvertItemsOnDataChange(model, editor.editing, attributeNames, this), { priority: "high" });
		this.on("checkAttributes:item", (evt, { viewElement, modelAttributes }) => {
			if (viewElement.id != modelAttributes.listItemId) {
				evt.return = true;
				evt.stop();
			}
		});
		this.on("checkAttributes:list", (evt, { viewElement, modelAttributes }) => {
			if (viewElement.name != getViewElementNameForListType(modelAttributes.listType) || viewElement.id != getViewElementIdForListType(modelAttributes.listType, modelAttributes.listIndent)) {
				evt.return = true;
				evt.stop();
			}
		});
	}
	/**
	* Registers model post-fixers.
	*/
	_setupModelPostFixing() {
		const model = this.editor.model;
		const attributeNames = this.getListAttributeNames();
		model.document.registerPostFixer((writer) => modelChangePostFixer$1(model, writer, attributeNames, this));
		if (!this.editor.config.get("list.enableSkipLevelLists")) this.on("postFixer", (evt, { listNodes, writer }) => {
			evt.return = fixListIndents(listNodes, writer) || evt.return;
		}, { priority: "high" });
		this.on("postFixer", (evt, { listNodes, writer, seenIds }) => {
			evt.return = fixListItemIds(listNodes, seenIds, writer) || evt.return;
		}, { priority: "high" });
	}
	/**
	* Integrates the feature with the clipboard via {@link module:engine/model/model~Model#insertContent} and
	* {@link module:engine/model/model~Model#getSelectedContent}.
	*/
	_setupClipboardIntegration() {
		const model = this.editor.model;
		const clipboardPipeline = this.editor.plugins.get("ClipboardPipeline");
		this.listenTo(model, "insertContent", createModelIndentPasteFixer(model), { priority: "high" });
		this.listenTo(clipboardPipeline, "outputTransformation", (evt, data) => {
			model.change((writer) => {
				const allContentChildren = Array.from(data.content.getChildren());
				const lastItem = allContentChildren[allContentChildren.length - 1];
				if (allContentChildren.length > 1 && lastItem.is("element") && lastItem.isEmpty) {
					if (allContentChildren.slice(0, -1).every(isListItemBlock)) writer.remove(lastItem);
				}
				if (data.method == "copy" || data.method == "cut") {
					const allChildren = Array.from(data.content.getChildren());
					/* v8 ignore next -- Clipboard output normally reaches this cleanup only for selected single list items. */
					if (isSingleListItem(allChildren)) removeListAttributes(allChildren, writer, this.getListAttributeNames());
				}
			});
		});
	}
	/**
	* Informs editor accessibility features about keystrokes brought by the plugin.
	*/
	_setupAccessibilityIntegration() {
		const editor = this.editor;
		const t = editor.t;
		editor.accessibility.addKeystrokeInfoGroup({
			id: "list",
			label: t("Keystrokes that can be used in a list"),
			keystrokes: [{
				label: t("Increase list item indent"),
				keystroke: "Tab"
			}, {
				label: t("Decrease list item indent"),
				keystroke: "Shift+Tab"
			}]
		});
	}
	/**
	* Convert `listItemId` attribute to `data-list-item-id` attribute on the view element in both downcast pipelines.
	*/
	_setupListItemIdConversionStrategy() {
		this.registerDowncastStrategy({
			scope: "item",
			attributeName: "listItemId",
			setAttributeOnDowncast(writer, attributeValue, viewElement, options) {
				if (options && (options.skipListItemIds || options.isClipboardPipeline)) return;
				writer.setAttribute("data-list-item-id", attributeValue, viewElement);
			}
		});
	}
};
/**
* Post-fixer that reacts to changes on document and fixes incorrect model states (invalid `listItemId` and `listIndent` values).
*
* In the example below, there is a correct list structure.
* Then the middle element is removed so the list structure will become incorrect:
*
* ```xml
* <paragraph listType="bulleted" listItemId="a" listIndent=0>Item 1</paragraph>
* <paragraph listType="bulleted" listItemId="b" listIndent=1>Item 2</paragraph>   <--- this is removed.
* <paragraph listType="bulleted" listItemId="c" listIndent=2>Item 3</paragraph>
* ```
*
* The list structure after the middle element is removed:
*
* ```xml
* <paragraph listType="bulleted" listItemId="a" listIndent=0>Item 1</paragraph>
* <paragraph listType="bulleted" listItemId="c" listIndent=2>Item 3</paragraph>
* ```
*
* Should become:
*
* ```xml
* <paragraph listType="bulleted" listItemId="a" listIndent=0>Item 1</paragraph>
* <paragraph listType="bulleted" listItemId="c" listIndent=1>Item 3</paragraph>   <--- note that indent got post-fixed.
* ```
*
* @param model The data model.
* @param writer The writer to do changes with.
* @param attributeNames The list of all model list attributes (including registered strategies).
* @param ListEditing The document list editing plugin.
* @returns `true` if any change has been applied, `false` otherwise.
*/
function modelChangePostFixer$1(model, writer, attributeNames, listEditing) {
	const changes = model.document.differ.getChanges();
	const visited = /* @__PURE__ */ new Set();
	const itemToListHead = /* @__PURE__ */ new Set();
	const multiBlock = listEditing.editor.config.get("list.multiBlock");
	let applied = false;
	for (const entry of changes) {
		if (entry.type == "insert" && entry.name != "$text") {
			const item = entry.position.nodeAfter;
			if (!model.schema.checkAttribute(item, "listItemId")) {
				for (const attributeName of Array.from(item.getAttributeKeys())) if (attributeNames.includes(attributeName)) {
					writer.removeAttribute(attributeName, item);
					applied = true;
				}
			}
			findAndAddListHeadToMap(entry.position, itemToListHead, visited);
			if (!entry.attributes.has("listItemId")) findAndAddListHeadToMap(entry.position.getShiftedBy(entry.length), itemToListHead, visited);
			for (const { item: innerItem, previousPosition } of model.createRangeIn(item)) if (isListItemBlock(innerItem)) findAndAddListHeadToMap(previousPosition, itemToListHead, visited);
		} else if (entry.type == "remove") findAndAddListHeadToMap(entry.position, itemToListHead, visited);
		else if (entry.type == "attribute" && attributeNames.includes(entry.attributeKey)) {
			findAndAddListHeadToMap(entry.range.start, itemToListHead, visited);
			if (entry.attributeNewValue === null) findAndAddListHeadToMap(entry.range.start.getShiftedBy(1), itemToListHead, visited);
		}
		if (!multiBlock && entry.type == "attribute" && LIST_BASE_ATTRIBUTES.includes(entry.attributeKey)) {
			const element = entry.range.start.nodeAfter;
			if (entry.attributeNewValue === null && element && element.is("element", "listItem")) {
				writer.rename(element, "paragraph");
				applied = true;
			} else if (entry.attributeOldValue === null && element && element.is("element") && element.name != "listItem") {
				writer.rename(element, "listItem");
				applied = true;
			}
		}
	}
	const seenIds = /* @__PURE__ */ new Set();
	for (const listHead of itemToListHead.values()) applied = listEditing.fire("postFixer", {
		listNodes: new ListBlocksIterable(listHead),
		listHead,
		writer,
		seenIds
	}) || applied;
	return applied;
}
/**
* A fixer for pasted content that includes list items.
*
* It fixes indentation of pasted list items so the pasted items match correctly to the context they are pasted into.
*
* Example:
*
* ```xml
* <paragraph listType="bulleted" listItemId="a" listIndent="0">A</paragraph>
* <paragraph listType="bulleted" listItemId="b" listIndent="1">B^</paragraph>
* // At ^ paste:  <paragraph listType="numbered" listItemId="x" listIndent="0">X</paragraph>
* //              <paragraph listType="numbered" listItemId="y" listIndent="1">Y</paragraph>
* <paragraph listType="bulleted" listItemId="c" listIndent="2">C</paragraph>
* ```
*
* Should become:
*
* ```xml
* <paragraph listType="bulleted" listItemId="a" listIndent="0">A</paragraph>
* <paragraph listType="bulleted" listItemId="b" listIndent="1">BX</paragraph>
* <paragraph listType="bulleted" listItemId="y" listIndent="2">Y/paragraph>
* <paragraph listType="bulleted" listItemId="c" listIndent="2">C</paragraph>
* ```
*/
function createModelIndentPasteFixer(model) {
	return (evt, [content, selectable]) => {
		const items = (content.is("documentFragment") ? Array.from(content.getChildren()) : [content]).filter((item) => !model.schema.isInline(item));
		if (!items.length) return;
		const position = (selectable ? model.createSelection(selectable) : model.document.selection).getFirstPosition();
		let refItem;
		if (isListItemBlock(position.parent)) refItem = position.parent;
		else if (isListItemBlock(position.nodeBefore) && isListItemBlock(position.nodeAfter)) refItem = position.nodeBefore;
		else return;
		model.change((writer) => {
			const refType = refItem.getAttribute("listType");
			const refIndent = refItem.getAttribute("listIndent");
			const firstElementIndent = items[0].getAttribute("listIndent") || 0;
			const indentDiff = Math.max(refIndent - firstElementIndent, 0);
			for (const item of items) {
				const isListItem = isListItemBlock(item);
				if (refItem.is("element", "listItem") && item.is("element", "paragraph"))
 /**
				* When paragraphs or a plain text list is pasted into a simple list, convert
				* the `<paragraphs>' to `<listItem>' to avoid breaking the target list.
				*
				* See https://github.com/ckeditor/ckeditor5/issues/13826.
				*/
				writer.rename(item, "listItem");
				writer.setAttributes({
					listIndent: (isListItem ? item.getAttribute("listIndent") : 0) + indentDiff,
					listItemId: isListItem ? item.getAttribute("listItemId") : ListItemUid.next(),
					listType: refType
				}, item);
			}
		});
	};
}
/**
* Decides whether the merge should be accompanied by the model's `deleteContent()`, for instance, to get rid of the inline
* content in the selection or take advantage of the heuristics in `deleteContent()` that helps convert lists into paragraphs
* in certain cases.
*/
function shouldMergeOnBlocksContentLevel(model, direction) {
	const selection = model.document.selection;
	if (!selection.isCollapsed) return !getSelectedBlockObject(model);
	if (direction === "forward") return true;
	const positionParent = selection.getFirstPosition().parent;
	const previousSibling = positionParent.previousSibling;
	if (model.schema.isObject(previousSibling)) return false;
	if (previousSibling.isEmpty) return true;
	return isSingleListItem([positionParent, previousSibling]);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Helper method for creating toolbar and menu buttons and linking them with an appropriate command.
*
* @internal
* @param editor The editor instance to which the UI component will be added.
* @param commandName The name of the command.
* @param label The button label.
* @param icon The source of the icon.
*/
function createUIComponents(editor, commandName, label, icon) {
	editor.ui.componentFactory.add(commandName, () => {
		const buttonView = _createButton(ButtonView, editor, commandName, label, icon);
		buttonView.set({
			tooltip: true,
			isToggleable: true
		});
		return buttonView;
	});
	editor.ui.componentFactory.add(`menuBar:${commandName}`, () => {
		const buttonView = _createButton(MenuBarMenuListItemButtonView, editor, commandName, label, icon);
		buttonView.set({
			role: "menuitemcheckbox",
			isToggleable: true
		});
		return buttonView;
	});
}
/**
* Creates a button to use either in toolbar or in menu bar.
*/
function _createButton(ButtonClass, editor, commandName, label, icon) {
	const command = editor.commands.get(commandName);
	const view = new ButtonClass(editor.locale);
	view.set({
		label,
		icon
	});
	view.bind("isOn", "isEnabled").to(command, "value", "isEnabled");
	view.on("execute", () => {
		editor.execute(commandName);
		editor.editing.view.focus();
	});
	return view;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/list/listui
*/
/**
* The list UI feature. It introduces the `'numberedList'` and `'bulletedList'` buttons that
* allow to convert paragraphs to and from list items and indent or outdent them.
*/
var ListUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListUI";
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
		const t = this.editor.t;
		if (!this.editor.ui.componentFactory.has("numberedList")) createUIComponents(this.editor, "numberedList", t("Numbered List"), IconNumberedList);
		if (!this.editor.ui.componentFactory.has("bulletedList")) createUIComponents(this.editor, "bulletedList", t("Bulleted List"), IconBulletedList);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/list
*/
/**
* The list feature.
*
* This is a "glue" plugin that loads the {@link module:list/list/listediting~ListEditing  list
* editing feature} and {@link module:list/list/listui~ListUI list UI feature}.
*/
var List = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [ListEditing, ListUI];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "List";
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
* @module list/listproperties/liststartcommand
*/
/**
* The list start index command. It changes the `listStart` attribute of the selected list items,
* letting the user to choose the starting point of an ordered list.
* It is used by the {@link module:list/listproperties~ListProperties list properties feature}.
*/
var ListStartCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	refresh() {
		const value = this._getValue();
		this.value = value;
		this.isEnabled = value != null;
	}
	/**
	* Executes the command.
	*
	* @fires execute
	* @param options Execute options.
	* @param options.startIndex The list start index.
	*/
	execute({ startIndex = 1 } = {}) {
		const model = this.editor.model;
		const document = model.document;
		let blocks = Array.from(document.selection.getSelectedBlocks()).filter((block) => isListItemBlock(block) && isNumberedListType(block.getAttribute("listType")));
		blocks = expandListBlocksToCompleteList(blocks);
		model.change((writer) => {
			for (const block of blocks) writer.setAttribute("listStart", startIndex >= 0 ? startIndex : 1, block);
		});
	}
	/**
	* Checks the command's {@link #value}.
	*
	* @returns The current value.
	*/
	_getValue() {
		const document = this.editor.model.document;
		const block = first(document.selection.getSelectedBlocks());
		if (block && isListItemBlock(block) && isNumberedListType(block.getAttribute("listType"))) return block.getAttribute("listStart");
		return null;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listproperties/utils/style
*/
const LIST_STYLE_TO_LIST_TYPE = {};
const LIST_STYLE_TO_TYPE_ATTRIBUTE = {};
const TYPE_ATTRIBUTE_TO_LIST_STYLE = {};
const LIST_STYLE_TYPES = [
	{
		listStyle: "disc",
		typeAttribute: "disc",
		listType: "bulleted"
	},
	{
		listStyle: "circle",
		typeAttribute: "circle",
		listType: "bulleted"
	},
	{
		listStyle: "square",
		typeAttribute: "square",
		listType: "bulleted"
	},
	{
		listStyle: "decimal",
		typeAttribute: "1",
		listType: "numbered"
	},
	{
		listStyle: "decimal-leading-zero",
		typeAttribute: null,
		listType: "numbered"
	},
	{
		listStyle: "lower-roman",
		typeAttribute: "i",
		listType: "numbered"
	},
	{
		listStyle: "upper-roman",
		typeAttribute: "I",
		listType: "numbered"
	},
	{
		listStyle: "lower-alpha",
		typeAttribute: "a",
		listType: "numbered"
	},
	{
		listStyle: "upper-alpha",
		typeAttribute: "A",
		listType: "numbered"
	},
	{
		listStyle: "lower-latin",
		typeAttribute: "a",
		listType: "numbered"
	},
	{
		listStyle: "upper-latin",
		typeAttribute: "A",
		listType: "numbered"
	},
	{
		listStyle: "arabic-indic",
		typeAttribute: null,
		listType: "numbered"
	}
];
for (const { listStyle, typeAttribute, listType } of LIST_STYLE_TYPES) {
	LIST_STYLE_TO_LIST_TYPE[listStyle] = listType;
	LIST_STYLE_TO_TYPE_ATTRIBUTE[listStyle] = typeAttribute;
	if (typeAttribute) TYPE_ATTRIBUTE_TO_LIST_STYLE[typeAttribute] = listStyle;
}
/**
* Gets all the style types supported by given list type.
*
* @internal
*/
function getAllSupportedStyleTypes() {
	return LIST_STYLE_TYPES.map((x) => x.listStyle);
}
/**
* Checks whether the given list-style-type is supported by numbered or bulleted list.
*
* @internal
*/
function getListTypeFromListStyleType(listStyleType) {
	return LIST_STYLE_TO_LIST_TYPE[listStyleType] || null;
}
/**
* Converts `type` attribute of `<ul>` or `<ol>` elements to `list-style-type` equivalent.
*
* @internal
*/
function getListStyleTypeFromTypeAttribute(value) {
	return TYPE_ATTRIBUTE_TO_LIST_STYLE[value] || null;
}
/**
* Converts `list-style-type` style to `type` attribute of `<ul>` or `<ol>` elements.
*
* @internal
*/
function getTypeAttributeFromListStyleType(value) {
	return LIST_STYLE_TO_TYPE_ATTRIBUTE[value] || null;
}
/**
* Normalizes list style by converting aliases to their canonical form.
*
* @internal
* @param listStyle The list style value to normalize.
* @returns The canonical form of the list style.
*
* @example
* normalizeListStyle( 'lower-alpha' ); // Returns 'lower-latin'
* normalizeListStyle( 'upper-alpha' ); // Returns 'upper-latin'
* normalizeListStyle( 'disc' ); // Returns 'disc'
*/
function normalizeListStyle(listStyle) {
	switch (listStyle) {
		case "lower-alpha": return "lower-latin";
		case "upper-alpha": return "upper-latin";
		default: return listStyle;
	}
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listproperties/liststylecommand
*/
/**
* The list style command. It changes `listStyle` attribute of the selected list items,
* letting the user choose styles for the list item markers.
* It is used by the {@link module:list/listproperties~ListProperties list properties feature}.
*/
var ListStyleCommand = class extends Command {
	/**
	* The default type of the list style.
	*/
	defaultType;
	/**
	* The list of supported style types by this command.
	*/
	_supportedTypes;
	/**
	* Creates an instance of the command.
	*
	* @param editor The editor instance.
	* @param defaultType The list type that will be used by default if the value was not specified during
	* the command execution.
	* @param supportedTypes The list of supported style types by this command.
	*/
	constructor(editor, defaultType, supportedTypes) {
		super(editor);
		this.defaultType = defaultType;
		this._supportedTypes = supportedTypes;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.value = this._getValue();
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Executes the command.
	*
	* @fires execute
	* @param options.type The type of the list style, e.g. `'disc'` or `'square'`. If `null` is specified, the default
	* style will be applied.
	*/
	execute(options = {}) {
		const model = this.editor.model;
		const document = model.document;
		model.change((writer) => {
			this._tryToConvertItemsToList(options);
			let blocks = Array.from(document.selection.getSelectedBlocks()).filter((block) => block.hasAttribute("listType"));
			if (!blocks.length) return;
			blocks = expandListBlocksToCompleteList(blocks);
			for (const block of blocks) writer.setAttribute("listStyle", options.type || this.defaultType, block);
		});
	}
	/**
	* Checks if the given style type is supported by this plugin.
	*/
	isStyleTypeSupported(value) {
		if (!this._supportedTypes) return true;
		return this._supportedTypes.includes(value);
	}
	/**
	* Checks the command's {@link #value}.
	*
	* @returns The current value.
	*/
	_getValue() {
		const listItem = first(this.editor.model.document.selection.getSelectedBlocks());
		if (isListItemBlock(listItem)) return listItem.getAttribute("listStyle");
		return null;
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @returns Whether the command should be enabled.
	*/
	_checkEnabled() {
		const editor = this.editor;
		const numberedList = editor.commands.get("numberedList");
		const bulletedList = editor.commands.get("bulletedList");
		return numberedList.isEnabled || bulletedList.isEnabled;
	}
	/**
	* Check if the provided list style is valid. Also change the selection to a list if it's not set yet.
	*
	* @param options.type The type of the list style. If `null` is specified, the function does nothing.
	*/
	_tryToConvertItemsToList(options) {
		if (!options.type) return;
		const listType = getListTypeFromListStyleType(options.type);
		if (!listType) return;
		const editor = this.editor;
		const commandName = `${listType}List`;
		if (!editor.commands.get(commandName).value) editor.execute(commandName);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listproperties/listreversedcommand
*/
/**
* The list reversed command. It changes the `listReversed` attribute of the selected list items,
* letting the user to choose the order of an ordered list.
* It is used by the {@link module:list/listproperties~ListProperties list properties feature}.
*/
var ListReversedCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	refresh() {
		const value = this._getValue();
		this.value = value;
		this.isEnabled = value != null;
	}
	/**
	* Executes the command.
	*
	* @fires execute
	* @param options.reversed Whether the list should be reversed.
	*/
	execute(options = {}) {
		const model = this.editor.model;
		const document = model.document;
		let blocks = Array.from(document.selection.getSelectedBlocks()).filter((block) => isListItemBlock(block) && block.getAttribute("listType") == "numbered");
		blocks = expandListBlocksToCompleteList(blocks);
		model.change((writer) => {
			for (const block of blocks) writer.setAttribute("listReversed", !!options.reversed, block);
		});
	}
	/**
	* Checks the command's {@link #value}.
	*/
	_getValue() {
		const document = this.editor.model.document;
		const block = first(document.selection.getSelectedBlocks());
		if (isListItemBlock(block) && block.getAttribute("listType") == "numbered") return block.getAttribute("listReversed");
		return null;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Returns a converter that consumes the `style`, `reversed`, and `start` attributes.
* In `style`, it searches for the `list-style-type` definition.
* If not found, the `"default"` value will be used.
*
* @internal
* @param strategy
*/
function listPropertiesUpcastConverter(strategy) {
	return (evt, data, conversionApi) => {
		const { writer, schema, consumable } = conversionApi;
		if (consumable.test(data.viewItem, strategy.viewConsumables) === false) return;
		if (!data.modelRange) Object.assign(data, conversionApi.convertChildren(data.viewItem, data.modelCursor));
		let applied = false;
		for (const item of data.modelRange.getItems({ shallow: true })) {
			if (!schema.checkAttribute(item, strategy.attributeName)) continue;
			if (!strategy.appliesToListItem(item)) continue;
			if (item.hasAttribute(strategy.attributeName)) continue;
			writer.setAttribute(strategy.attributeName, strategy.getAttributeOnUpcast(data.viewItem), item);
			applied = true;
		}
		if (applied) consumable.consume(data.viewItem, strategy.viewConsumables);
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listproperties/listpropertiesutils
*/
/**
* A set of helpers related to document lists.
*/
var ListPropertiesUtils = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListPropertiesUtils";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* Gets all the style types supported by given list type.
	*/
	getAllSupportedStyleTypes() {
		return getAllSupportedStyleTypes();
	}
	/**
	* Checks whether the given list-style-type is supported by numbered or bulleted list.
	*/
	getListTypeFromListStyleType(listStyleType) {
		return getListTypeFromListStyleType(listStyleType);
	}
	/**
	* Converts `type` attribute of `<ul>` or `<ol>` elements to `list-style-type` equivalent.
	*/
	getListStyleTypeFromTypeAttribute(value) {
		return getListStyleTypeFromTypeAttribute(value);
	}
	/**
	* Converts `list-style-type` style to `type` attribute of `<ul>` or `<ol>` elements.
	*/
	getTypeAttributeFromListStyleType(value) {
		return getTypeAttributeFromListStyleType(value);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listproperties/utils/config
*/
/**
* Normalizes {@link module:list/listconfig~ListPropertiesConfig} in the configuration of the list properties feature.
* The structure of normalized list properties options looks as follows:
*
* ```ts
* {
* 	styles: {
* 		listTypes: [ 'bulleted', 'numbered' ],
* 		useAttribute: false
* 	},
* 	startIndex: true,
* 	reversed: true
* }
* ```
*
* @internal
* @param config The list properties {@link module:list/listconfig~ListPropertiesConfig config}.
* @returns An object with normalized list properties options.
*/
function getNormalizedConfig(config) {
	const { startIndex, reversed, styles } = config;
	return {
		styles: getNormalizedStylesConfig(styles),
		startIndex: startIndex || false,
		reversed: reversed || false
	};
}
/**
* Normalizes styles in the configuration of the list properties feature.
* The structure of normalized list properties options looks as follows:
*
* ```ts
* {
* 	listTypes: [ 'bulleted', 'numbered' ],
* 	useAttribute: false
* }
* ```
*
* @param styles The list properties styles.
* @returns An object with normalized list properties styles.
*/
function getNormalizedStylesConfig(styles) {
	const normalizedConfig = {
		listTypes: ["bulleted", "numbered"],
		useAttribute: false,
		listStyleTypes: {
			numbered: [
				"decimal",
				"decimal-leading-zero",
				"lower-roman",
				"upper-roman",
				"lower-latin",
				"upper-latin"
			],
			bulleted: [
				"disc",
				"circle",
				"square"
			]
		}
	};
	if (styles === true) return normalizedConfig;
	if (!styles) {
		normalizedConfig.listTypes = [];
		normalizedConfig.listStyleTypes = {};
	} else if (Array.isArray(styles) || typeof styles == "string") {
		normalizedConfig.listTypes = toArray(styles);
		normalizedConfig.listStyleTypes = pick(normalizedConfig.listStyleTypes, normalizedConfig.listTypes);
	} else {
		normalizedConfig.listTypes = styles.listTypes ? toArray(styles.listTypes) : normalizedConfig.listTypes;
		normalizedConfig.useAttribute = !!styles.useAttribute;
		if (styles.listStyleTypes) normalizedConfig.listStyleTypes = styles.listStyleTypes;
		else normalizedConfig.listStyleTypes = pick(normalizedConfig.listStyleTypes, normalizedConfig.listTypes);
	}
	return normalizedConfig;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listproperties/listpropertiesediting
*/
const DEFAULT_LIST_TYPE$1 = "default";
/**
* The document list properties engine feature.
*
* It registers the `'listStyle'`, `'listReversed'` and `'listStart'` commands if they are enabled in the configuration.
* Read more in {@link module:list/listconfig~ListPropertiesConfig}.
*/
var ListPropertiesEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [ListEditing, ListPropertiesUtils];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListPropertiesEditing";
	}
	/**
	* @inheritDoc
	* @internal
	*/
	static get licenseFeatureCode() {
		return "LP";
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
		editor.config.define("list.properties", {
			styles: true,
			startIndex: false,
			reversed: false
		});
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const model = editor.model;
		const listEditing = editor.plugins.get(ListEditing);
		const strategies = createAttributeStrategies$1(editor.config.get("list.properties"));
		for (const strategy of strategies) {
			strategy.addCommand(editor);
			model.schema.extend("$listItem", { allowAttributes: strategy.attributeName });
			listEditing.registerDowncastStrategy({
				scope: "list",
				attributeName: strategy.attributeName,
				setAttributeOnDowncast(writer, attributeValue, viewElement) {
					strategy.setAttributeOnDowncast(writer, attributeValue, viewElement);
				}
			});
		}
		editor.conversion.for("upcast").add((dispatcher) => {
			for (const strategy of strategies) {
				dispatcher.on("element:ol", listPropertiesUpcastConverter(strategy));
				dispatcher.on("element:ul", listPropertiesUpcastConverter(strategy));
			}
		});
		listEditing.on("checkAttributes:list", (evt, { viewElement, modelAttributes, modelReferenceElement }) => {
			for (const strategy of strategies) {
				if (!strategy.appliesToListItem(modelReferenceElement)) continue;
				if (strategy.getAttributeOnUpcast(viewElement) != modelAttributes[strategy.attributeName]) {
					evt.return = true;
					evt.stop();
				}
			}
		});
		this.listenTo(editor.commands.get("indentList"), "afterExecute", (evt, changedBlocks) => {
			model.change((writer) => {
				for (const node of changedBlocks) for (const strategy of strategies) if (strategy.appliesToListItem(node)) writer.setAttribute(strategy.attributeName, strategy.defaultValue, node);
			});
		});
		listEditing.on("postFixer", (evt, { listNodes, writer }) => {
			for (const { node } of listNodes) for (const strategy of strategies) {
				if (strategy.hasValidAttribute(node)) continue;
				if (strategy.appliesToListItem(node)) writer.setAttribute(strategy.attributeName, strategy.defaultValue, node);
				else writer.removeAttribute(strategy.attributeName, node);
				evt.return = true;
			}
		});
		listEditing.on("postFixer", (evt, { listNodes, writer }) => {
			for (const { node, previousNodeInList } of listNodes) {
				if (!previousNodeInList) continue;
				if (previousNodeInList.getAttribute("listType") != node.getAttribute("listType")) continue;
				for (const strategy of strategies) {
					const { attributeName } = strategy;
					if (!strategy.appliesToListItem(node)) continue;
					const value = previousNodeInList.getAttribute(attributeName);
					if (node.getAttribute(attributeName) != value) {
						writer.setAttribute(attributeName, value, node);
						evt.return = true;
					}
				}
			}
		});
	}
};
/**
* Creates an array of strategies for dealing with enabled listItem attributes.
*/
function createAttributeStrategies$1(enabledProperties) {
	const strategies = [];
	const normalizedConfig = getNormalizedConfig(enabledProperties);
	if (enabledProperties.styles) {
		const useAttribute = normalizedConfig.styles.useAttribute;
		strategies.push({
			attributeName: "listStyle",
			defaultValue: DEFAULT_LIST_TYPE$1,
			viewConsumables: { styles: "list-style-type" },
			addCommand(editor) {
				let supportedTypes = getAllSupportedStyleTypes();
				if (useAttribute) supportedTypes = supportedTypes.filter((styleType) => !!getTypeAttributeFromListStyleType(styleType));
				editor.commands.add("listStyle", new ListStyleCommand(editor, DEFAULT_LIST_TYPE$1, supportedTypes));
			},
			appliesToListItem(item) {
				return item.getAttribute("listType") == "numbered" || item.getAttribute("listType") == "bulleted";
			},
			hasValidAttribute(item) {
				if (!this.appliesToListItem(item)) return !item.hasAttribute("listStyle");
				if (!item.hasAttribute("listStyle")) return false;
				const value = item.getAttribute("listStyle");
				if (value == DEFAULT_LIST_TYPE$1) return true;
				return getListTypeFromListStyleType(value) == item.getAttribute("listType");
			},
			setAttributeOnDowncast(writer, listStyle, element) {
				if (listStyle && listStyle !== DEFAULT_LIST_TYPE$1) {
					if (useAttribute) {
						const value = getTypeAttributeFromListStyleType(listStyle);
						if (value) {
							writer.setAttribute("type", value, element);
							return;
						}
					} else {
						writer.setStyle("list-style-type", listStyle, element);
						return;
					}
				}
				writer.removeStyle("list-style-type", element);
				writer.removeAttribute("type", element);
			},
			getAttributeOnUpcast(listParent) {
				const style = listParent.getStyle("list-style-type");
				if (style) return normalizeListStyle(style);
				const attribute = listParent.getAttribute("type");
				if (attribute) return getListStyleTypeFromTypeAttribute(attribute);
				return DEFAULT_LIST_TYPE$1;
			}
		});
	}
	if (enabledProperties.reversed) strategies.push({
		attributeName: "listReversed",
		defaultValue: false,
		viewConsumables: { attributes: "reversed" },
		addCommand(editor) {
			editor.commands.add("listReversed", new ListReversedCommand(editor));
		},
		appliesToListItem(item) {
			return item.getAttribute("listType") == "numbered";
		},
		hasValidAttribute(item) {
			return this.appliesToListItem(item) == item.hasAttribute("listReversed");
		},
		setAttributeOnDowncast(writer, listReversed, element) {
			if (listReversed) writer.setAttribute("reversed", "reversed", element);
			else writer.removeAttribute("reversed", element);
		},
		getAttributeOnUpcast(listParent) {
			return listParent.hasAttribute("reversed");
		}
	});
	if (enabledProperties.startIndex) strategies.push({
		attributeName: "listStart",
		defaultValue: 1,
		viewConsumables: { attributes: "start" },
		addCommand(editor) {
			editor.commands.add("listStart", new ListStartCommand(editor));
		},
		appliesToListItem(item) {
			return isNumberedListType(item.getAttribute("listType"));
		},
		hasValidAttribute(item) {
			return this.appliesToListItem(item) == item.hasAttribute("listStart");
		},
		setAttributeOnDowncast(writer, listStart, element) {
			if (listStart == 0 || listStart > 1) writer.setAttribute("start", listStart, element);
			else writer.removeAttribute("start", element);
		},
		getAttributeOnUpcast(listParent) {
			const startAttributeValue = listParent.getAttribute("start");
			return startAttributeValue >= 0 ? startAttributeValue : 1;
		}
	});
	return strategies;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listproperties/ui/listpropertiesview
*/
/**
* The list properties view to be displayed in the list dropdown.
*
* Contains a grid of available list styles and, for numbered list, also the list start index and reversed fields.
*
* @internal
*/
var ListPropertiesView = class extends View {
	/**
	* A collection of the child views.
	*/
	children;
	/**
	* A view that renders the grid of list styles.
	*/
	stylesView = null;
	/**
	* A collapsible view that hosts additional list property fields ({@link #startIndexFieldView} and
	* {@link #reversedSwitchButtonView}) to visually separate them from the {@link #stylesView grid of styles}.
	*
	* **Note**: Only present when:
	* * the view represents **numbered** list properties,
	* * and the {@link #stylesView} is rendered,
	* * and either {@link #startIndexFieldView} or {@link #reversedSwitchButtonView} is rendered.
	*
	* @readonly
	*/
	additionalPropertiesCollapsibleView = null;
	/**
	* A labeled number field allowing the user to set the start index of the list.
	*
	* **Note**: Only present when the view represents **numbered** list properties.
	*
	* @readonly
	*/
	startIndexFieldView = null;
	/**
	* A switch button allowing the user to make the edited list reversed.
	*
	* **Note**: Only present when the view represents **numbered** list properties.
	*
	* @readonly
	*/
	reversedSwitchButtonView = null;
	/**
	* Tracks information about the DOM focus in the view.
	*/
	focusTracker = new FocusTracker();
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	keystrokes = new KeystrokeHandler();
	/**
	* A collection of views that can be focused in the properties view.
	*/
	focusables = new ViewCollection();
	/**
	* Helps cycling over {@link #focusables} in the view.
	*/
	focusCycler;
	/**
	* Creates an instance of the list properties view.
	*
	* @param locale The {@link module:core/editor/editor~Editor#locale} instance.
	* @param options Options of the view.
	* @param options.enabledProperties An object containing the configuration of enabled list property names.
	* Allows conditional rendering the sub-components of the properties view.
	* @param options.styleButtonViews A list of style buttons to be rendered
	* inside the styles grid. The grid will not be rendered when `enabledProperties` does not include the `'styles'` key.
	* @param options.styleGridAriaLabel An assistive technologies label set on the grid of styles (if the grid is rendered).
	*/
	constructor(locale, { enabledProperties, styleButtonViews, styleGridAriaLabel }) {
		super(locale);
		const elementCssClasses = ["ck", "ck-list-properties"];
		this.children = this.createCollection();
		this.focusCycler = new FocusCycler({
			focusables: this.focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				focusPrevious: "shift + tab",
				focusNext: "tab"
			}
		});
		if (styleButtonViews && styleButtonViews.length) {
			this.stylesView = this._createStylesView(styleButtonViews, styleGridAriaLabel);
			this.children.add(this.stylesView);
		} else elementCssClasses.push("ck-list-properties_without-styles");
		if (enabledProperties.startIndex || enabledProperties.reversed) {
			this._addNumberedListPropertyViews(enabledProperties);
			elementCssClasses.push("ck-list-properties_with-numbered-properties");
		}
		this.setTemplate({
			tag: "div",
			attributes: { class: elementCssClasses },
			children: this.children
		});
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		if (this.stylesView) {
			this.focusables.add(this.stylesView);
			this.focusTracker.add(this.stylesView.element);
			if (this.startIndexFieldView || this.reversedSwitchButtonView) {
				this.focusables.add(this.children.last.buttonView);
				this.focusTracker.add(this.children.last.buttonView.element);
			}
			for (const item of this.stylesView.children) this.stylesView.focusTracker.add(item.element);
			addKeyboardHandlingForGrid({
				keystrokeHandler: this.stylesView.keystrokes,
				focusTracker: this.stylesView.focusTracker,
				gridItems: this.stylesView.children,
				numberOfColumns: () => global.window.getComputedStyle(this.stylesView.element).getPropertyValue("grid-template-columns").split(" ").length,
				uiLanguageDirection: this.locale && this.locale.uiLanguageDirection
			});
		}
		if (this.startIndexFieldView) {
			this.focusables.add(this.startIndexFieldView);
			this.focusTracker.add(this.startIndexFieldView.element);
			const stopPropagation = (data) => data.stopPropagation();
			this.keystrokes.set("arrowright", stopPropagation);
			this.keystrokes.set("arrowleft", stopPropagation);
			this.keystrokes.set("arrowup", stopPropagation);
			this.keystrokes.set("arrowdown", stopPropagation);
		}
		if (this.reversedSwitchButtonView) {
			this.focusables.add(this.reversedSwitchButtonView);
			this.focusTracker.add(this.reversedSwitchButtonView.element);
		}
		this.keystrokes.listenTo(this.element);
	}
	/**
	* @inheritDoc
	*/
	focus() {
		this.focusCycler.focusFirst();
	}
	/**
	* @inheritDoc
	*/
	focusLast() {
		this.focusCycler.focusLast();
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this.focusTracker.destroy();
		this.keystrokes.destroy();
	}
	/**
	* Creates the list styles grid.
	*
	* @param styleButtons Buttons to be placed in the grid.
	* @param styleGridAriaLabel The assistive technology label of the grid.
	*/
	_createStylesView(styleButtons, styleGridAriaLabel) {
		const stylesView = new View(this.locale);
		stylesView.children = stylesView.createCollection();
		stylesView.children.addMany(styleButtons);
		stylesView.setTemplate({
			tag: "div",
			attributes: {
				"aria-label": styleGridAriaLabel,
				class: ["ck", "ck-list-styles-list"]
			},
			children: stylesView.children
		});
		stylesView.children.delegate("execute").to(this);
		stylesView.focus = function() {
			for (const child of this.children) if (child instanceof ButtonView && child.isOn) {
				child.focus();
				return;
			}
			this.children.first.focus();
		};
		stylesView.focusTracker = new FocusTracker();
		stylesView.keystrokes = new KeystrokeHandler();
		stylesView.render();
		stylesView.keystrokes.listenTo(stylesView.element);
		return stylesView;
	}
	/**
	* Renders {@link #startIndexFieldView} and/or {@link #reversedSwitchButtonView} depending on the configuration of the properties view.
	*
	* @param enabledProperties An object containing the configuration of enabled list property names
	* (see {@link #constructor}).
	*/
	_addNumberedListPropertyViews(enabledProperties) {
		const t = this.locale.t;
		const numberedPropertyViews = [];
		if (enabledProperties.startIndex) {
			this.startIndexFieldView = this._createStartIndexField();
			numberedPropertyViews.push(this.startIndexFieldView);
		}
		if (enabledProperties.reversed) {
			this.reversedSwitchButtonView = this._createReversedSwitchButton();
			numberedPropertyViews.push(this.reversedSwitchButtonView);
		}
		if (this.stylesView) {
			this.additionalPropertiesCollapsibleView = new CollapsibleView(this.locale, numberedPropertyViews);
			this.additionalPropertiesCollapsibleView.set({
				label: t("List properties"),
				isCollapsed: true
			});
			this.additionalPropertiesCollapsibleView.buttonView.bind("isEnabled").toMany(numberedPropertyViews, "isEnabled", (...areEnabled) => areEnabled.some((isEnabled) => isEnabled));
			this.additionalPropertiesCollapsibleView.buttonView.on("change:isEnabled", (evt, data, isEnabled) => {
				if (!isEnabled) this.additionalPropertiesCollapsibleView.isCollapsed = true;
			});
			this.children.add(this.additionalPropertiesCollapsibleView);
		} else this.children.addMany(numberedPropertyViews);
	}
	/**
	* Creates the list start index labeled field.
	*/
	_createStartIndexField() {
		const t = this.locale.t;
		const startIndexFieldView = new LabeledFieldView(this.locale, createLabeledInputNumber);
		startIndexFieldView.set({
			label: t("Start at"),
			class: "ck-numbered-list-properties__start-index"
		});
		startIndexFieldView.fieldView.set({
			min: 0,
			step: 1,
			value: 1,
			inputMode: "numeric"
		});
		startIndexFieldView.fieldView.on("input", () => {
			const inputElement = startIndexFieldView.fieldView.element;
			const startIndex = inputElement.valueAsNumber;
			if (Number.isNaN(startIndex)) {
				startIndexFieldView.errorText = t("Invalid start index value.");
				return;
			}
			if (!inputElement.checkValidity()) startIndexFieldView.errorText = t("Start index must be greater than 0.");
			else this.fire("listStart", { startIndex });
		});
		return startIndexFieldView;
	}
	/**
	* Creates the reversed list switch button.
	*/
	_createReversedSwitchButton() {
		const t = this.locale.t;
		const reversedButtonView = new SwitchButtonView(this.locale);
		reversedButtonView.set({
			withText: true,
			label: t("Reversed order"),
			class: "ck-numbered-list-properties__reversed-order"
		});
		reversedButtonView.delegate("execute").to(this, "listReversed");
		return reversedButtonView;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listproperties/listpropertiesui
*/
/**
* The list properties UI plugin. It introduces the extended `'bulletedList'` and `'numberedList'` toolbar
* buttons that allow users to control such aspects of list as the marker, start index or order.
*
* **Note**: Buttons introduced by this plugin override implementations from the {@link module:list/list/listui~ListUI}
* (because they share the same names).
*/
var ListPropertiesUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListPropertiesUI";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	init() {
		const editor = this.editor;
		const t = editor.locale.t;
		const propertiesConfig = editor.config.get("list.properties");
		const normalizedConfig = getNormalizedConfig(propertiesConfig);
		const stylesListTypes = normalizedConfig.styles.listTypes;
		if (stylesListTypes.includes("bulleted")) {
			const styleDefinitions = [
				{
					label: t("Toggle the disc list style"),
					tooltip: t("Disc"),
					type: "disc",
					icon: IconListStyleDisc
				},
				{
					label: t("Toggle the circle list style"),
					tooltip: t("Circle"),
					type: "circle",
					icon: IconListStyleCircle
				},
				{
					label: t("Toggle the square list style"),
					tooltip: t("Square"),
					type: "square",
					icon: IconListStyleSquare
				}
			];
			const buttonLabel = t("Bulleted List");
			const styleGridAriaLabel = t("Bulleted list styles toolbar");
			const commandName = "bulletedList";
			editor.ui.componentFactory.add(commandName, getDropdownViewCreator({
				editor,
				normalizedConfig,
				parentCommandName: commandName,
				buttonLabel,
				buttonIcon: IconBulletedList,
				styleGridAriaLabel,
				styleDefinitions
			}));
			editor.ui.componentFactory.add(`menuBar:${commandName}`, getMenuBarStylesMenuCreator({
				editor,
				normalizedConfig,
				parentCommandName: commandName,
				buttonLabel,
				styleGridAriaLabel,
				styleDefinitions
			}));
		}
		if (stylesListTypes.includes("numbered") || propertiesConfig.startIndex || propertiesConfig.reversed) {
			const styleDefinitions = [
				{
					label: t("Toggle the decimal list style"),
					tooltip: t("Decimal"),
					type: "decimal",
					icon: IconListStyleDecimal
				},
				{
					label: t("Toggle the decimal with leading zero list style"),
					tooltip: t("Decimal with leading zero"),
					type: "decimal-leading-zero",
					icon: IconListStyleDecimalLeadingZero
				},
				{
					label: t("Toggle the lower–roman list style"),
					tooltip: t("Lower–roman"),
					type: "lower-roman",
					icon: IconListStyleLowerRoman
				},
				{
					label: t("Toggle the upper–roman list style"),
					tooltip: t("Upper-roman"),
					type: "upper-roman",
					icon: IconListStyleUpperRoman
				},
				{
					label: t("Toggle the lower–latin list style"),
					tooltip: t("Lower-latin"),
					type: "lower-latin",
					icon: IconListStyleLowerLatin
				},
				{
					label: t("Toggle the upper–latin list style"),
					tooltip: t("Upper-latin"),
					type: "upper-latin",
					icon: IconListStyleUpperLatin
				},
				{
					label: t("Toggle the arabic-indic list style"),
					tooltip: t("Arabic-indic"),
					type: "arabic-indic",
					icon: IconListStyleArabicIndic
				}
			];
			const buttonLabel = t("Numbered List");
			const styleGridAriaLabel = t("Numbered list styles toolbar");
			const commandName = "numberedList";
			editor.ui.componentFactory.add(commandName, getDropdownViewCreator({
				editor,
				normalizedConfig,
				parentCommandName: commandName,
				buttonLabel,
				buttonIcon: IconNumberedList,
				styleGridAriaLabel,
				styleDefinitions
			}));
			if (stylesListTypes.includes("numbered")) editor.ui.componentFactory.add(`menuBar:${commandName}`, getMenuBarStylesMenuCreator({
				editor,
				normalizedConfig,
				parentCommandName: commandName,
				buttonLabel,
				styleGridAriaLabel,
				styleDefinitions
			}));
		}
	}
};
/**
* A helper that returns a function that creates a split button with a toolbar in the dropdown,
* which in turn contains buttons allowing users to change list styles in the context of the current selection.
*
* @param options.editor
* @param options.normalizedConfig List properties configuration.
* @param options.parentCommandName The name of the higher-order editor command associated with
* the set of particular list styles (e.g. "bulletedList" for "disc", "circle", and "square" styles).
* @param options.buttonLabel Label of the main part of the split button.
* @param options.buttonIcon The SVG string of an icon for the main part of the split button.
* @param options.styleGridAriaLabel The ARIA label for the styles grid in the split button dropdown.
* @param options.styleDefinitions Definitions of the style buttons.
* @returns A function that can be passed straight into {@link module:ui/componentfactory~ComponentFactory#add}.
*/
function getDropdownViewCreator({ editor, normalizedConfig, parentCommandName, buttonLabel, buttonIcon, styleGridAriaLabel, styleDefinitions }) {
	const parentCommand = editor.commands.get(parentCommandName);
	return (locale) => {
		const dropdownView = createDropdown(locale, SplitButtonView);
		const mainButtonView = dropdownView.buttonView;
		dropdownView.bind("isEnabled").to(parentCommand);
		dropdownView.class = "ck-list-styles-dropdown";
		mainButtonView.on("execute", () => {
			editor.execute(parentCommandName);
			editor.editing.view.focus();
		});
		mainButtonView.set({
			label: buttonLabel,
			icon: buttonIcon,
			tooltip: true,
			isToggleable: true
		});
		mainButtonView.bind("isOn").to(parentCommand, "value", (value) => !!value);
		dropdownView.once("change:isOpen", () => {
			const listPropertiesView = createListPropertiesView({
				editor,
				normalizedConfig,
				dropdownView,
				parentCommandName,
				styleGridAriaLabel,
				styleDefinitions
			});
			dropdownView.panelView.children.add(listPropertiesView);
		});
		dropdownView.on("execute", () => {
			editor.editing.view.focus();
		});
		return dropdownView;
	};
}
/**
* A helper that returns a function (factory) that creates individual buttons used by users to change styles
* of lists.
*
* @param options.editor
* @param options.listStyleCommand The instance of the `ListStylesCommand` class.
* @param options.parentCommandName The name of the higher-order command associated with a
* particular list style (e.g. "bulletedList" is associated with "square" and "numberedList" is associated with "roman").
* @returns A function that can be passed straight into {@link module:ui/componentfactory~ComponentFactory#add}.
*/
function getStyleButtonCreator({ editor, listStyleCommand, parentCommandName }) {
	const locale = editor.locale;
	const parentCommand = editor.commands.get(parentCommandName);
	return ({ label, type, icon, tooltip }) => {
		const button = new ButtonView(locale);
		button.set({
			label,
			icon,
			tooltip
		});
		button.bind("isOn").to(listStyleCommand, "value", (value) => value === type);
		button.on("execute", () => {
			if (parentCommand.value) {
				if (listStyleCommand.value === type) editor.execute(parentCommandName);
				else if (listStyleCommand.value !== type) editor.execute("listStyle", { type });
			} else editor.model.change(() => {
				editor.execute("listStyle", { type });
			});
		});
		return button;
	};
}
/**
* A helper that creates the properties view for the individual style dropdown.
*
* @param options.editor Editor instance.
* @param options.normalizedConfig List properties configuration.
* @param options.dropdownView Styles dropdown view that hosts the properties view.
* @param options.parentCommandName The name of the higher-order editor command associated with
* the set of particular list styles (e.g. "bulletedList" for "disc", "circle", and "square" styles).
* @param options.styleDefinitions Definitions of the style buttons.
* @param options.styleGridAriaLabel An assistive technologies label set on the grid of styles (if the grid is rendered).
*/
function createListPropertiesView({ editor, normalizedConfig, dropdownView, parentCommandName, styleDefinitions, styleGridAriaLabel }) {
	const locale = editor.locale;
	const enabledProperties = {
		...normalizedConfig,
		...parentCommandName != "numberedList" ? {
			startIndex: false,
			reversed: false
		} : null
	};
	const listType = parentCommandName.replace("List", "");
	let styleButtonViews = null;
	if (normalizedConfig.styles.listTypes.includes(listType)) {
		const listStyleCommand = editor.commands.get("listStyle");
		const styleButtonCreator = getStyleButtonCreator({
			editor,
			parentCommandName,
			listStyleCommand
		});
		const configuredListStylesTypes = normalizedConfig.styles.listStyleTypes;
		let filteredDefinitions = styleDefinitions;
		/* v8 ignore next -- Normalized config always provides listStyleTypes for enabled styles. */
		if (configuredListStylesTypes) {
			const allowedTypes = configuredListStylesTypes[listType];
			if (allowedTypes) filteredDefinitions = styleDefinitions.filter((def) => allowedTypes.includes(def.type));
		}
		const isStyleTypeSupported = getStyleTypeSupportChecker(listStyleCommand);
		styleButtonViews = filteredDefinitions.filter(isStyleTypeSupported).map(styleButtonCreator);
	}
	const listPropertiesView = new ListPropertiesView(locale, {
		styleGridAriaLabel,
		enabledProperties,
		styleButtonViews
	});
	if (normalizedConfig.styles.listTypes.includes(listType)) focusChildOnDropdownOpen(dropdownView, () => {
		return listPropertiesView.stylesView.children.find((child) => child.isOn);
	});
	if (enabledProperties.startIndex) {
		const listStartCommand = editor.commands.get("listStart");
		listPropertiesView.startIndexFieldView.bind("isEnabled").to(listStartCommand);
		listPropertiesView.startIndexFieldView.fieldView.bind("value").to(listStartCommand);
		listPropertiesView.on("listStart", (evt, data) => editor.execute("listStart", data));
	}
	if (enabledProperties.reversed) {
		const listReversedCommand = editor.commands.get("listReversed");
		listPropertiesView.reversedSwitchButtonView.bind("isEnabled").to(listReversedCommand);
		listPropertiesView.reversedSwitchButtonView.bind("isOn").to(listReversedCommand, "value", (value) => !!value);
		listPropertiesView.on("listReversed", () => {
			const isReversed = listReversedCommand.value;
			editor.execute("listReversed", { reversed: !isReversed });
		});
	}
	listPropertiesView.delegate("execute").to(dropdownView);
	return listPropertiesView;
}
/**
* A helper that creates the list style submenu for menu bar.
*
* @param editor Editor instance.
* @param normalizedConfig List properties configuration.
* @param parentCommandName Name of the list command.
* @param buttonLabel Label of the menu button.
* @param styleGridAriaLabel ARIA label of the styles grid.
*/
function getMenuBarStylesMenuCreator({ editor, normalizedConfig, parentCommandName, buttonLabel, styleGridAriaLabel, styleDefinitions }) {
	return (locale) => {
		const menuView = new MenuBarMenuView(locale);
		const listCommand = editor.commands.get(parentCommandName);
		const listStyleCommand = editor.commands.get("listStyle");
		const isStyleTypeSupported = getStyleTypeSupportChecker(listStyleCommand);
		const styleButtonCreator = getStyleButtonCreator({
			editor,
			parentCommandName,
			listStyleCommand
		});
		const configuredListStylesTypes = normalizedConfig.styles.listStyleTypes;
		let filteredDefinitions = styleDefinitions;
		/* v8 ignore next -- Normalized config always provides listStyleTypes for enabled styles. */
		if (configuredListStylesTypes) {
			const allowedTypes = configuredListStylesTypes[listCommand.type];
			if (allowedTypes) filteredDefinitions = styleDefinitions.filter((def) => allowedTypes.includes(def.type));
		}
		const styleButtonViews = filteredDefinitions.filter(isStyleTypeSupported).map(styleButtonCreator);
		const listPropertiesView = new ListPropertiesView(locale, {
			styleGridAriaLabel,
			enabledProperties: {
				...normalizedConfig,
				startIndex: false,
				reversed: false
			},
			styleButtonViews
		});
		listPropertiesView.delegate("execute").to(menuView);
		menuView.buttonView.set({
			label: buttonLabel,
			icon: parentCommandName === "bulletedList" ? IconBulletedList : IconNumberedList
		});
		menuView.panelView.children.add(listPropertiesView);
		menuView.bind("isEnabled").to(listCommand, "isEnabled");
		menuView.on("execute", () => {
			editor.editing.view.focus();
		});
		return menuView;
	};
}
function getStyleTypeSupportChecker(listStyleCommand) {
	if (typeof listStyleCommand.isStyleTypeSupported == "function") return (styleDefinition) => listStyleCommand.isStyleTypeSupported(styleDefinition.type);
	else return () => true;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listproperties
*/
/**
* The list properties feature.
*
* This is a "glue" plugin that loads the
* {@link module:list/listproperties/listpropertiesediting~ListPropertiesEditing list properties
* editing feature} and the {@link module:list/listproperties/listpropertiesui~ListPropertiesUI list properties UI feature}.
*/
var ListProperties = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [ListPropertiesEditing, ListPropertiesUI];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ListProperties";
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
* @module list/todolist/checktodolistcommand
*/
/**
* The check to-do command.
*
* The command is registered by the {@link module:list/todolist/todolistediting~TodoListEditing} as
* the `checkTodoList` editor command.
*/
var CheckTodoListCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		this.on("execute", () => {
			this.refresh();
		}, { priority: "highest" });
	}
	/**
	* Updates the command's {@link #value} and {@link #isEnabled} properties based on the current selection.
	*/
	refresh() {
		const selectedElements = this._getSelectedItems();
		this.value = this._getValue(selectedElements);
		this.isEnabled = !!selectedElements.length;
	}
	/**
	* Executes the command.
	*
	* @param options.forceValue If set, it will force the command behavior. If `true`, the command will apply
	* the attribute. Otherwise, the command will remove the attribute. If not set, the command will look for its current
	* value to decide what it should do.
	*/
	execute(options = {}) {
		this.editor.model.change((writer) => {
			const selectedElements = this._getSelectedItems();
			const value = options.forceValue === void 0 ? !this._getValue(selectedElements) : options.forceValue;
			for (const element of selectedElements) if (value) writer.setAttribute("todoListChecked", true, element);
			else writer.removeAttribute("todoListChecked", element);
		});
	}
	/**
	* Returns a value for the command.
	*/
	_getValue(selectedElements) {
		return selectedElements.every((element) => element.getAttribute("todoListChecked"));
	}
	/**
	* Gets all to-do list items selected by the {@link module:engine/model/selection~ModelSelection}.
	*/
	_getSelectedItems() {
		const model = this.editor.model;
		const schema = model.schema;
		const selectionRange = model.document.selection.getFirstRange();
		const startElement = selectionRange.start.parent;
		const elements = [];
		if (schema.checkAttribute(startElement, "todoListChecked")) elements.push(...getAllListItemBlocks(startElement));
		for (const item of selectionRange.getItems({ shallow: true })) if (schema.checkAttribute(item, "todoListChecked") && !elements.includes(item)) elements.push(...getAllListItemBlocks(item));
		return elements;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/todolist/todocheckboxchangeobserver
*/
/**
* Observes all to-do list checkboxes state changes.
*
* Note that this observer is not available by default. To make it available it needs to be added to
* {@link module:engine/view/view~EditingView} by {@link module:engine/view/view~EditingView#addObserver} method.
*
* @internal
*/
var TodoCheckboxChangeObserver = class extends DomEventObserver {
	/**
	* @inheritDoc
	*/
	domEventType = ["change"];
	/**
	* @inheritDoc
	*/
	onDomEvent(domEvent) {
		if (domEvent.target) {
			const viewTarget = this.view.domConverter.mapDomToView(domEvent.target);
			if (viewTarget && viewTarget.is("element", "input") && viewTarget.getAttribute("type") == "checkbox" && viewTarget.findAncestor({ classes: "todo-list__label" })) this.fire("todoCheckboxChange", domEvent);
		}
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/todolist/todolistediting
*/
const ITEM_TOGGLE_KEYSTROKE$1 = /* #__PURE__ */ parseKeystroke("Ctrl+Enter");
/**
* The engine of the to-do list feature. It handles creating, editing and removing to-do lists and their items.
*
* It registers the entire functionality of the {@link module:list/list/listediting~ListEditing list editing plugin}
* and extends it with the commands:
*
* - `'todoList'`,
* - `'checkTodoList'`,
*/
var TodoListEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "TodoListEditing";
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
		return [ListEditing];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const model = editor.model;
		const editing = editor.editing;
		const listEditing = editor.plugins.get(ListEditing);
		const elementName = editor.config.get("list.multiBlock") ? "paragraph" : "listItem";
		editor.commands.add("todoList", new ListCommand(editor, "todo"));
		editor.commands.add("checkTodoList", new CheckTodoListCommand(editor));
		editing.view.addObserver(TodoCheckboxChangeObserver);
		model.schema.extend("$listItem", { allowAttributes: "todoListChecked" });
		model.schema.addAttributeCheck((context) => {
			const item = context.last;
			if (!item.getAttribute("listItemId") || item.getAttribute("listType") != "todo") return false;
		}, "todoListChecked");
		editor.conversion.for("upcast").add((dispatcher) => {
			dispatcher.on("element:input", todoItemInputConverter());
			dispatcher.on("element:li", todoListItemUpcastConverter(), { priority: "low" });
			dispatcher.on("element:label", elementUpcastConsumingConverter({
				name: "label",
				classes: "todo-list__label"
			}));
			dispatcher.on("element:label", elementUpcastConsumingConverter({
				name: "label",
				classes: ["todo-list__label", "todo-list__label_without-description"]
			}));
			dispatcher.on("element:span", elementUpcastConsumingConverter({
				name: "span",
				classes: "todo-list__label__description"
			}));
			dispatcher.on("element:ul", attributeUpcastConsumingConverter({
				name: "ul",
				classes: "todo-list"
			}));
		});
		editor.conversion.for("downcast").elementToElement({
			model: elementName,
			view: (element, { writer }) => {
				if (isDescriptionBlock(element, listEditing.getListAttributeNames())) return writer.createContainerElement("span", { class: "todo-list__label__description" });
			},
			converterPriority: "highest"
		});
		listEditing.registerDowncastStrategy({
			scope: "list",
			attributeName: "listType",
			setAttributeOnDowncast(writer, value, element) {
				if (value == "todo") writer.addClass("todo-list", element);
				else writer.removeClass("todo-list", element);
			}
		});
		listEditing.registerDowncastStrategy({
			scope: "itemMarker",
			attributeName: "todoListChecked",
			createElement(writer, modelElement, { dataPipeline }) {
				if (modelElement.getAttribute("listType") != "todo") return null;
				const viewElement = writer.createUIElement("input", {
					type: "checkbox",
					...modelElement.getAttribute("todoListChecked") ? { checked: "checked" } : null,
					...dataPipeline ? { disabled: "disabled" } : { tabindex: "-1" }
				});
				if (dataPipeline) return viewElement;
				const wrapper = writer.createContainerElement("span", { contenteditable: "false" }, viewElement);
				wrapper.getFillerOffset = () => null;
				return wrapper;
			},
			canWrapElement(modelElement) {
				return isDescriptionBlock(modelElement, listEditing.getListAttributeNames());
			},
			createWrapperElement(writer, modelElement, { dataPipeline }) {
				const classes = ["todo-list__label"];
				if (!isDescriptionBlock(modelElement, listEditing.getListAttributeNames())) classes.push("todo-list__label_without-description");
				return writer.createAttributeElement(dataPipeline ? "label" : "span", { class: classes.join(" ") });
			}
		});
		listEditing.on("checkElement", (evt, { modelElement, viewElement }) => {
			const isFirstTodoModelParagraphBlock = isDescriptionBlock(modelElement, listEditing.getListAttributeNames());
			if (viewElement.hasClass("todo-list__label__description") != isFirstTodoModelParagraphBlock) {
				evt.return = true;
				evt.stop();
			}
		});
		listEditing.on("checkElement", (evt, { modelElement, viewElement }) => {
			const isFirstTodoModelItemBlock = modelElement.getAttribute("listType") == "todo" && isFirstBlockOfListItem(modelElement);
			let hasViewItemMarker = false;
			const viewWalker = editor.editing.view.createPositionBefore(viewElement).getWalker({ direction: "backward" });
			for (const { item } of viewWalker) {
				if (item.is("element") && editor.editing.mapper.toModelElement(item)) break;
				if (item.is("element", "input") && item.getAttribute("type") == "checkbox") hasViewItemMarker = true;
			}
			if (hasViewItemMarker != isFirstTodoModelItemBlock) {
				evt.return = true;
				evt.stop();
			}
		});
		listEditing.on("postFixer", (evt, { listNodes, writer }) => {
			for (const { node, previousNodeInList } of listNodes) {
				if (!previousNodeInList) continue;
				if (previousNodeInList.getAttribute("listItemId") != node.getAttribute("listItemId")) continue;
				const previousHasAttribute = previousNodeInList.hasAttribute("todoListChecked");
				const nodeHasAttribute = node.hasAttribute("todoListChecked");
				if (nodeHasAttribute && !previousHasAttribute) {
					writer.removeAttribute("todoListChecked", node);
					evt.return = true;
				} else if (!nodeHasAttribute && previousHasAttribute) {
					writer.setAttribute("todoListChecked", true, node);
					evt.return = true;
				}
			}
		});
		model.document.registerPostFixer((writer) => {
			const changes = model.document.differ.getChanges();
			let wasFixed = false;
			for (const change of changes) if (change.type == "attribute" && change.attributeKey == "listType") {
				const element = change.range.start.nodeAfter;
				if (change.attributeOldValue == "todo" && element.hasAttribute("todoListChecked")) {
					writer.removeAttribute("todoListChecked", element);
					wasFixed = true;
				}
			} else if (change.type == "insert" && change.name != "$text") {
				for (const { item } of writer.createRangeOn(change.position.nodeAfter)) if (item.is("element") && item.getAttribute("listType") != "todo" && item.hasAttribute("todoListChecked")) {
					writer.removeAttribute("todoListChecked", item);
					wasFixed = true;
				}
			}
			return wasFixed;
		});
		this.listenTo(editing.view.document, "keydown", (evt, data) => {
			if (getCode(data) === ITEM_TOGGLE_KEYSTROKE$1) {
				editor.execute("checkTodoList");
				evt.stop();
			}
		}, { priority: "high" });
		this.listenTo(editing.view.document, "todoCheckboxChange", (evt, data) => {
			const viewTarget = data.target;
			if (!viewTarget || !viewTarget.is("element", "input")) return;
			const viewPositionAfter = editing.view.createPositionAfter(viewTarget);
			const modelElement = editing.mapper.toModelPosition(viewPositionAfter).parent;
			/* v8 ignore next -- Defensive guard for externally fired observer events outside to-do list inputs. */
			if (modelElement && isListItemBlock(modelElement) && modelElement.getAttribute("listType") == "todo") this._handleCheckmarkChange(modelElement);
		});
		this.listenTo(editing.view.document, "arrowKey", jumpOverCheckmarkOnSideArrowKeyPress$1(model, editor.locale), { context: "$text" });
		this.listenTo(editing.mapper, "viewToModelPosition", (evt, data) => {
			const viewParent = data.viewPosition.parent;
			const isStartOfListItem = viewParent.is("attributeElement", "li") && data.viewPosition.offset == 0;
			const isStartOfListLabel = isLabelElement(viewParent) && data.viewPosition.offset <= 1;
			const isInInputWrapper = viewParent.is("element", "span") && viewParent.getAttribute("contenteditable") == "false" && isLabelElement(viewParent.parent);
			if (!isStartOfListItem && !isStartOfListLabel && !isInInputWrapper) return;
			const nodeAfter = data.modelPosition.nodeAfter;
			/* v8 ignore next -- Defensive mapper guard for view positions outside to-do list widgets. */
			if (nodeAfter && nodeAfter.getAttribute("listType") == "todo") data.modelPosition = model.createPositionAt(nodeAfter, 0);
		}, { priority: "low" });
		this._initAriaAnnouncements();
	}
	/**
	* Handles the checkbox element change, moves the selection to the corresponding model item to make it possible
	* to toggle the `todoListChecked` attribute using the command, and restores the selection position.
	*
	* Some say it's a hack :) Moving the selection only for executing the command on a certain node and restoring it after,
	* is not a clear solution. We need to design an API for using commands beyond the selection range.
	* See https://github.com/ckeditor/ckeditor5/issues/1954.
	*/
	_handleCheckmarkChange(listItem) {
		const editor = this.editor;
		const model = editor.model;
		const previousSelectionRanges = Array.from(model.document.selection.getRanges());
		model.change((writer) => {
			writer.setSelection(listItem, "end");
			editor.execute("checkTodoList");
			writer.setSelection(previousSelectionRanges);
		});
	}
	/**
	* Observe when user enters or leaves todo list and set proper aria value in global live announcer.
	* This allows screen readers to indicate when the user has entered and left the specified todo list.
	*
	* @internal
	*/
	_initAriaAnnouncements() {
		const { model, ui, t } = this.editor;
		let lastFocusedCodeBlock = null;
		if (!ui) return;
		model.document.selection.on("change:range", () => {
			const focusParent = model.document.selection.focus.parent;
			const lastElementIsTodoList = isTodoListItemElement(lastFocusedCodeBlock);
			const currentElementIsTodoList = isTodoListItemElement(focusParent);
			if (lastElementIsTodoList && !currentElementIsTodoList) ui.ariaLiveAnnouncer.announce(t("Leaving a to-do list"));
			else if (!lastElementIsTodoList && currentElementIsTodoList) ui.ariaLiveAnnouncer.announce(t("Entering a to-do list"));
			lastFocusedCodeBlock = focusParent;
		});
	}
};
/**
* Returns an upcast converter for to-do list items.
*/
function todoListItemUpcastConverter() {
	return (evt, data, conversionApi) => {
		const { writer, schema } = conversionApi;
		if (!data.modelRange) return;
		const groupedItems = Array.from(data.modelRange.getItems({ shallow: true })).filter((item) => item.getAttribute("listType") === "todo" && schema.checkAttribute(item, "listItemId")).reduce((acc, item) => {
			const listItemId = item.getAttribute("listItemId");
			if (!acc.has(listItemId)) acc.set(listItemId, getAllListItemBlocks(item));
			return acc;
		}, /* @__PURE__ */ new Map());
		for (const [, items] of groupedItems.entries()) if (items.some((item) => item.getAttribute("todoListChecked"))) for (const item of items) writer.setAttribute("todoListChecked", true, item);
	};
}
/**
* Returns an upcast converter that detects a to-do list checkbox and marks the list item as a to-do list.
*/
function todoItemInputConverter() {
	return (evt, data, conversionApi) => {
		const modelCursor = data.modelCursor;
		const modelItem = modelCursor.parent;
		const viewItem = data.viewItem;
		if (!conversionApi.consumable.test(viewItem, { name: true })) return;
		if (viewItem.getAttribute("type") != "checkbox" || !modelCursor.isAtStart || !modelItem.hasAttribute("listType")) return;
		conversionApi.consumable.consume(viewItem, { name: true });
		const writer = conversionApi.writer;
		writer.setAttribute("listType", "todo", modelItem);
		if (data.viewItem.hasAttribute("checked")) writer.setAttribute("todoListChecked", true, modelItem);
		data.modelRange = writer.createRange(modelCursor);
	};
}
/**
* Returns an upcast converter that consumes element matching the given matcher pattern.
*/
function elementUpcastConsumingConverter(matcherPattern) {
	const matcher = new Matcher(matcherPattern);
	return (evt, data, conversionApi) => {
		const matcherResult = matcher.match(data.viewItem);
		if (!matcherResult) return;
		if (!conversionApi.consumable.consume(data.viewItem, matcherResult.match)) return;
		Object.assign(data, conversionApi.convertChildren(data.viewItem, data.modelCursor));
	};
}
/**
* Returns an upcast converter that consumes attributes matching the given matcher pattern.
*/
function attributeUpcastConsumingConverter(matcherPattern) {
	const matcher = new Matcher(matcherPattern);
	return (evt, data, conversionApi) => {
		const matcherResult = matcher.match(data.viewItem);
		if (!matcherResult) return;
		const match = matcherResult.match;
		match.name = false;
		conversionApi.consumable.consume(data.viewItem, match);
	};
}
/**
* Returns true if the given list item block should be converted as a description block of a to-do list item.
*/
function isDescriptionBlock(modelElement, listAttributeNames) {
	return (modelElement.is("element", "paragraph") || modelElement.is("element", "listItem")) && modelElement.getAttribute("listType") == "todo" && isFirstBlockOfListItem(modelElement) && hasOnlyListAttributes(modelElement, listAttributeNames);
}
/**
* Returns true if only attributes from the given list are present on the model element.
*/
function hasOnlyListAttributes(modelElement, attributeNames) {
	for (const attributeKey of modelElement.getAttributeKeys()) {
		if (attributeKey.startsWith("selection:")) continue;
		if (!attributeNames.includes(attributeKey)) return false;
	}
	return true;
}
/**
* Jump at the start and end of a to-do list item.
*/
function jumpOverCheckmarkOnSideArrowKeyPress$1(model, locale) {
	return (eventInfo, domEventData) => {
		const direction = getLocalizedArrowKeyCodeDirection(domEventData.keyCode, locale.contentLanguageDirection);
		const schema = model.schema;
		const selection = model.document.selection;
		if (!selection.isCollapsed) return;
		const position = selection.getFirstPosition();
		const parent = position.parent;
		if (direction == "right" && position.isAtEnd) {
			const newRange = schema.getNearestSelectionRange(model.createPositionAfter(parent), "forward");
			if (!newRange) return;
			const newRangeParent = newRange.start.parent;
			if (newRangeParent && isListItemBlock(newRangeParent) && newRangeParent.getAttribute("listType") == "todo") {
				model.change((writer) => writer.setSelection(newRange));
				domEventData.preventDefault();
				domEventData.stopPropagation();
				eventInfo.stop();
			}
		} else if (direction == "left" && position.isAtStart && isListItemBlock(parent) && parent.getAttribute("listType") == "todo") {
			const newRange = schema.getNearestSelectionRange(model.createPositionBefore(parent), "backward");
			if (!newRange) return;
			model.change((writer) => writer.setSelection(newRange));
			domEventData.preventDefault();
			domEventData.stopPropagation();
			eventInfo.stop();
		}
	};
}
/**
* Returns true if the given element is a label element of a to-do list item.
*/
function isLabelElement(viewElement) {
	return !!viewElement && viewElement.is("attributeElement") && viewElement.hasClass("todo-list__label");
}
/**
* Returns true if the given element is a list item model element of a to-do list.
*/
function isTodoListItemElement(element) {
	if (!element) return false;
	if (!element.is("element", "paragraph") && !element.is("element", "listItem")) return false;
	return element.getAttribute("listType") == "todo";
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/todolist/todolistui
*/
/**
* The to-do list UI feature. It introduces the `'todoList'` button that
* allows to convert elements to and from to-do list items and to indent or outdent them.
*/
var TodoListUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "TodoListUI";
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
		const t = this.editor.t;
		createUIComponents(this.editor, "todoList", t("To-do List"), IconTodoList);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/todolist
*/
/**
* The to-do list feature.
*
* This is a "glue" plugin that loads the {@link module:list/todolist/todolistediting~TodoListEditing to-do list
* editing feature} and the {@link module:list/todolist/todolistui~TodoListUI to-do list UI feature}.
*/
var TodoList = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [TodoListEditing, TodoListUI];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "TodoList";
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
* The list command. It is used by the {@link module:list/legacylist~LegacyList legacy list feature}.
*/
var LegacyListCommand = class extends Command {
	/**
	* The type of the list created by the command.
	*/
	type;
	/**
	* Creates an instance of the command.
	*
	* @param editor The editor instance.
	* @param type List type that will be handled by this command.
	*/
	constructor(editor, type) {
		super(editor);
		this.type = type;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.value = this._getValue();
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Executes the list command.
	*
	* @fires execute
	* @param options Command options.
	* @param options.forceValue If set, it will force the command behavior. If `true`, the command will try to convert the
	* selected items and potentially the neighbor elements to the proper list items. If set to `false`, it will convert selected elements
	* to paragraphs. If not set, the command will toggle selected elements to list items or paragraphs, depending on the selection.
	*/
	execute(options = {}) {
		const model = this.editor.model;
		const document = model.document;
		const blocks = Array.from(document.selection.getSelectedBlocks()).filter((block) => checkCanBecomeListItem(block, model.schema));
		const turnOff = options.forceValue !== void 0 ? !options.forceValue : this.value;
		model.change((writer) => {
			if (turnOff) {
				let next = blocks[blocks.length - 1].nextSibling;
				let currentIndent = Number.POSITIVE_INFINITY;
				let changes = [];
				while (next && next.name == "listItem" && next.getAttribute("listIndent") !== 0) {
					const indent = next.getAttribute("listIndent");
					if (indent < currentIndent) currentIndent = indent;
					const newIndent = indent - currentIndent;
					changes.push({
						element: next,
						listIndent: newIndent
					});
					next = next.nextSibling;
				}
				changes = changes.reverse();
				for (const item of changes) writer.setAttribute("listIndent", item.listIndent, item.element);
			}
			if (!turnOff) {
				let lowestIndent = Number.POSITIVE_INFINITY;
				for (const item of blocks) if (item.is("element", "listItem") && item.getAttribute("listIndent") < lowestIndent) lowestIndent = item.getAttribute("listIndent");
				lowestIndent = lowestIndent === 0 ? 1 : lowestIndent;
				_fixType(blocks, true, lowestIndent);
				_fixType(blocks, false, lowestIndent);
			}
			for (const element of blocks.reverse()) if (turnOff && element.name == "listItem") writer.rename(element, "paragraph");
			else if (!turnOff && element.name != "listItem") {
				writer.setAttributes({
					listType: this.type,
					listIndent: 0
				}, element);
				writer.rename(element, "listItem");
			} else if (!turnOff && element.name == "listItem" && element.getAttribute("listType") != this.type) writer.setAttribute("listType", this.type, element);
			/**
			* Event fired by the {@link #execute} method.
			*
			* It allows to execute an action after executing the {@link ~ListCommand#execute} method, for example adjusting
			* attributes of changed blocks.
			*
			* @protected
			* @event _executeCleanup
			*/
			this.fire("_executeCleanup", blocks);
		});
	}
	/**
	* Checks the command's {@link #value}.
	*
	* @returns The current value.
	*/
	_getValue() {
		const listItem = first(this.editor.model.document.selection.getSelectedBlocks());
		return !!listItem && listItem.is("element", "listItem") && listItem.getAttribute("listType") == this.type;
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
		return checkCanBecomeListItem(firstBlock, schema);
	}
};
/**
* Helper function used when one or more list item have their type changed. Fixes type of other list items
* that are affected by the change (are in same lists) but are not directly in selection. The function got extracted
* not to duplicated code, as same fix has to be performed before and after selection.
*
* @param blocks Blocks that are in selection.
* @param isBackward Specified whether fix will be applied for blocks before first selected block (`true`)
* or blocks after last selected block (`false`).
* @param lowestIndent Lowest indent among selected blocks.
*/
function _fixType(blocks, isBackward, lowestIndent) {
	const startingItem = isBackward ? blocks[0] : blocks[blocks.length - 1];
	if (startingItem.is("element", "listItem")) {
		let item = startingItem[isBackward ? "previousSibling" : "nextSibling"];
		let currentIndent = startingItem.getAttribute("listIndent");
		while (item && item.is("element", "listItem") && item.getAttribute("listIndent") >= lowestIndent) {
			if (currentIndent > item.getAttribute("listIndent")) currentIndent = item.getAttribute("listIndent");
			if (item.getAttribute("listIndent") == currentIndent) blocks[isBackward ? "unshift" : "push"](item);
			item = item[isBackward ? "previousSibling" : "nextSibling"];
		}
	}
}
/**
* Checks whether the given block can be replaced by a listItem.
*
* @param block A block to be tested.
* @param schema The schema of the document.
*/
function checkCanBecomeListItem(block, schema) {
	return schema.checkChild(block.parent, "listItem") && !schema.isObject(block);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The list indent command. It is used by the {@link module:list/legacylist~LegacyList legacy list feature}.
*/
var LegacyIndentCommand = class extends Command {
	/**
	* Determines by how much the command will change the list item's indent attribute.
	*/
	_indentBy;
	/**
	* Creates an instance of the command.
	*
	* @param editor The editor instance.
	* @param indentDirection The direction of indent. If it is equal to `backward`, the command will outdent a list item.
	*/
	constructor(editor, indentDirection) {
		super(editor);
		this._indentBy = indentDirection == "forward" ? 1 : -1;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Indents or outdents (depending on the {@link #constructor}'s `indentDirection` parameter) selected list items.
	*
	* @fires execute
	*/
	execute() {
		const model = this.editor.model;
		const doc = model.document;
		let itemsToChange = Array.from(doc.selection.getSelectedBlocks());
		model.change((writer) => {
			const lastItem = itemsToChange[itemsToChange.length - 1];
			let next = lastItem.nextSibling;
			while (next && next.name == "listItem" && next.getAttribute("listIndent") > lastItem.getAttribute("listIndent")) {
				itemsToChange.push(next);
				next = next.nextSibling;
			}
			if (this._indentBy < 0) itemsToChange = itemsToChange.reverse();
			for (const item of itemsToChange) {
				const indent = item.getAttribute("listIndent") + this._indentBy;
				if (indent < 0) writer.rename(item, "paragraph");
				else writer.setAttribute("listIndent", indent, item);
			}
			this.fire("_executeCleanup", itemsToChange);
		});
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @returns Whether the command should be enabled.
	*/
	_checkEnabled() {
		const listItem = first(this.editor.model.document.selection.getSelectedBlocks());
		if (!listItem || !listItem.is("element", "listItem")) return false;
		if (this._indentBy > 0) {
			const indent = listItem.getAttribute("listIndent");
			const type = listItem.getAttribute("listType");
			let prev = listItem.previousSibling;
			while (prev && prev.is("element", "listItem") && prev.getAttribute("listIndent") >= indent) {
				if (prev.getAttribute("listIndent") == indent) return prev.getAttribute("listType") == type;
				prev = prev.previousSibling;
			}
			return false;
		}
		return true;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/legacylist/legacyutils
*/
/**
* Creates a list item {@link module:engine/view/containerelement~ViewContainerElement}.
*
* @internal
* @param writer The writer instance.
*/
function createViewListItemElement(writer) {
	const viewItem = writer.createContainerElement("li");
	viewItem.getFillerOffset = getListItemFillerOffset;
	return viewItem;
}
/**
* Helper function that creates a `<ul><li></li></ul>` or (`<ol>`) structure out of the given `modelItem` model `listItem` element.
* Then, it binds the created view list item (`<li>`) with the model `listItem` element.
* The function then returns the created view list item (`<li>`).
*
* @internal
* @param modelItem Model list item.
* @param conversionApi Conversion interface.
* @returns View list element.
*/
function generateLiInUl(modelItem, conversionApi) {
	const mapper = conversionApi.mapper;
	const viewWriter = conversionApi.writer;
	const listType = modelItem.getAttribute("listType") == "numbered" ? "ol" : "ul";
	const viewItem = createViewListItemElement(viewWriter);
	const viewList = viewWriter.createContainerElement(listType, null);
	viewWriter.insert(viewWriter.createPositionAt(viewList, 0), viewItem);
	mapper.bindElements(modelItem, viewItem);
	return viewItem;
}
/**
* Helper function that inserts a view list at a correct place and merges it with its siblings.
* It takes a model list item element (`modelItem`) and a corresponding view list item element (`injectedItem`). The view list item
* should be in a view list element (`<ul>` or `<ol>`) and should be its only child.
* See comments below to better understand the algorithm.
*
* @internal
* @param modelItem Model list item.
* @param injectedItem
* @param conversionApi Conversion interface.
* @param model The model instance.
*/
function injectViewList(modelItem, injectedItem, conversionApi, model) {
	const injectedList = injectedItem.parent;
	const mapper = conversionApi.mapper;
	const viewWriter = conversionApi.writer;
	let insertPosition;
	const refItem = getSiblingListItem(modelItem.previousSibling, {
		sameIndent: true,
		smallerIndent: true,
		listIndent: modelItem.getAttribute("listIndent")
	});
	const prevItem = modelItem.previousSibling;
	if (refItem && refItem.getAttribute("listIndent") == modelItem.getAttribute("listIndent")) {
		const viewItem = mapper.toViewElement(refItem);
		insertPosition = viewWriter.breakContainer(viewWriter.createPositionAfter(viewItem));
	} else if (prevItem && prevItem.name == "listItem") {
		insertPosition = mapper.toViewPosition(model.createPositionAt(prevItem, "end"));
		const mappedViewAncestor = mapper.findMappedViewAncestor(insertPosition);
		const nestedList = findNestedList(mappedViewAncestor);
		if (nestedList) insertPosition = viewWriter.createPositionBefore(nestedList);
		else insertPosition = viewWriter.createPositionAt(mappedViewAncestor, "end");
	} else insertPosition = mapper.toViewPosition(model.createPositionBefore(modelItem));
	insertPosition = positionAfterUiElements(insertPosition);
	viewWriter.insert(insertPosition, injectedList);
	if (prevItem && prevItem.name == "listItem") {
		const prevView = mapper.toViewElement(prevItem);
		const walker = viewWriter.createRange(viewWriter.createPositionAt(prevView, 0), insertPosition).getWalker({ ignoreElementEnd: true });
		for (const value of walker) if (value.item.is("element", "li")) {
			const breakPosition = viewWriter.breakContainer(viewWriter.createPositionBefore(value.item));
			const viewList = value.item.parent;
			const targetPosition = viewWriter.createPositionAt(injectedItem, "end");
			mergeViewLists(viewWriter, targetPosition.nodeBefore, targetPosition.nodeAfter);
			viewWriter.move(viewWriter.createRangeOn(viewList), targetPosition);
			walker._position = breakPosition;
		}
	} else {
		const nextViewList = injectedList.nextSibling;
		if (nextViewList && (nextViewList.is("element", "ul") || nextViewList.is("element", "ol"))) {
			let lastSubChild = null;
			for (const child of nextViewList.getChildren()) {
				const modelChild = mapper.toModelElement(child);
				if (modelChild && modelChild.getAttribute("listIndent") > modelItem.getAttribute("listIndent")) lastSubChild = child;
				else break;
			}
			if (lastSubChild) {
				viewWriter.breakContainer(viewWriter.createPositionAfter(lastSubChild));
				viewWriter.move(viewWriter.createRangeOn(lastSubChild.parent), viewWriter.createPositionAt(injectedItem, "end"));
			}
		}
	}
	mergeViewLists(viewWriter, injectedList, injectedList.nextSibling);
	mergeViewLists(viewWriter, injectedList.previousSibling, injectedList);
}
function mergeViewLists(viewWriter, firstList, secondList) {
	if (!firstList || !secondList || firstList.name != "ul" && firstList.name != "ol") return null;
	if (firstList.name != secondList.name || firstList.getAttribute("class") !== secondList.getAttribute("class")) return null;
	return viewWriter.mergeContainers(viewWriter.createPositionAfter(firstList));
}
/**
* Helper function that for a given `view.Position`, returns a `view.Position` that is after all `view.UIElement`s that
* are after the given position.
*
* For example:
* `<container:p>foo^<ui:span></ui:span><ui:span></ui:span>bar</container:p>`
* For position ^, the position before "bar" will be returned.
*
* @internal
*/
function positionAfterUiElements(viewPosition) {
	return viewPosition.getLastMatchingPosition((value) => value.item.is("uiElement"));
}
/**
* Helper function that searches for a previous list item sibling of a given model item that meets the given criteria
* passed by the options object.
*
* @internal
* @param options Search criteria.
* @param options.sameIndent Whether the sought sibling should have the same indentation.
* @param options.smallerIndent Whether the sought sibling should have a smaller indentation.
* @param options.listIndent The reference indentation.
* @param options.direction Walking direction.
*/
function getSiblingListItem(modelItem, options) {
	const sameIndent = !!options.sameIndent;
	const smallerIndent = !!options.smallerIndent;
	const indent = options.listIndent;
	let item = modelItem;
	while (item && item.name == "listItem") {
		const itemIndent = item.getAttribute("listIndent");
		if (sameIndent && indent == itemIndent || smallerIndent && indent > itemIndent) return item;
		if (options.direction === "forward") item = item.nextSibling;
		else item = item.previousSibling;
	}
	return null;
}
/**
* Returns a first list view element that is direct child of the given view element.
*
* @internal
*/
function findNestedList(viewElement) {
	for (const node of viewElement.getChildren()) if (node.name == "ul" || node.name == "ol") return node;
	return null;
}
/**
* Returns an array with all `listItem` elements that represent the same list.
*
* It means that values of `listIndent`, `listType`, `listStyle`, `listReversed` and `listStart` for all items are equal.
*
* Additionally, if the `position` is inside a list item, that list item will be returned as well.
*
* @internal
* @param position Starting position.
* @param direction Walking direction.
*/
function getSiblingNodes(position, direction) {
	const items = [];
	const listItem = position.parent;
	const walkerOptions = {
		ignoreElementEnd: false,
		startPosition: position,
		shallow: true,
		direction
	};
	const limitIndent = listItem.getAttribute("listIndent");
	const nodes = [...new ModelTreeWalker(walkerOptions)].filter((value) => value.item.is("element")).map((value) => value.item);
	for (const element of nodes) {
		if (!element.is("element", "listItem")) break;
		if (element.getAttribute("listIndent") < limitIndent) break;
		if (element.getAttribute("listIndent") > limitIndent) continue;
		if (element.getAttribute("listType") !== listItem.getAttribute("listType")) break;
		if (element.getAttribute("listStyle") !== listItem.getAttribute("listStyle")) break;
		if (element.getAttribute("listReversed") !== listItem.getAttribute("listReversed")) break;
		if (element.getAttribute("listStart") !== listItem.getAttribute("listStart")) break;
		if (direction === "backward") items.unshift(element);
		else items.push(element);
	}
	return items;
}
/**
* Returns an array with all `listItem` elements in the model selection.
*
* It returns all the items even if only a part of the list is selected, including items that belong to nested lists.
* If no list is selected, it returns an empty array.
* The order of the elements is not specified.
*
* @internal
*/
function getSelectedListItems(model) {
	let listItems = [...model.document.selection.getSelectedBlocks()].filter((element) => element.is("element", "listItem")).map((element) => {
		const position = model.change((writer) => writer.createPositionAt(element, 0));
		return [...getSiblingNodes(position, "backward"), ...getSiblingNodes(position, "forward")];
	}).flat();
	listItems = [...new Set(listItems)];
	return listItems;
}
const BULLETED_LIST_STYLE_TYPES = [
	"disc",
	"circle",
	"square"
];
const NUMBERED_LIST_STYLE_TYPES = [
	"decimal",
	"decimal-leading-zero",
	"lower-roman",
	"upper-roman",
	"lower-latin",
	"upper-latin"
];
/**
* Checks whether the given list-style-type is supported by numbered or bulleted list.
*
* @internal
*/
function getListTypeFromListStyleType$1(listStyleType) {
	if (BULLETED_LIST_STYLE_TYPES.includes(listStyleType)) return "bulleted";
	if (NUMBERED_LIST_STYLE_TYPES.includes(listStyleType)) return "numbered";
	return null;
}
/**
* Implementation of getFillerOffset for view list item element.
*
* @returns Block filler offset or `null` if block filler is not needed.
*/
function getListItemFillerOffset() {
	const hasOnlyLists = !this.isEmpty && (this.getChild(0).name == "ul" || this.getChild(0).name == "ol");
	if (this.isEmpty || hasOnlyLists) return 0;
	return getViewFillerOffset.call(this);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* A set of helpers related to legacy lists.
*/
var LegacyListUtils = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LegacyListUtils";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* Checks whether the given list-style-type is supported by numbered or bulleted list.
	*/
	getListTypeFromListStyleType(listStyleType) {
		return getListTypeFromListStyleType$1(listStyleType);
	}
	/**
	* Returns an array with all `listItem` elements in the model selection.
	*
	* It returns all the items even if only a part of the list is selected, including items that belong to nested lists.
	* If no list is selected, it returns an empty array.
	* The order of the elements is not specified.
	*/
	getSelectedListItems(model) {
		return getSelectedListItems(model);
	}
	/**
	* Returns an array with all `listItem` elements that represent the same list.
	*
	* It means that values of `listIndent`, `listType`, `listStyle`, `listReversed` and `listStart` for all items are equal.
	*
	* Additionally, if the `position` is inside a list item, that list item will be returned as well.
	*
	* @param position Starting position.
	* @param direction Walking direction.
	*/
	getSiblingNodes(position, direction) {
		return getSiblingNodes(position, direction);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/legacylist/legacyconverters
*/
/**
* A model-to-view converter for the `listItem` model element insertion.
*
* It creates a `<ul><li></li><ul>` (or `<ol>`) view structure out of a `listItem` model element, inserts it at the correct
* position, and merges the list with surrounding lists (if available).
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:insert
* @param model Model instance.
*/
function modelViewInsertion$1(model) {
	return (evt, data, conversionApi) => {
		const consumable = conversionApi.consumable;
		if (!consumable.test(data.item, "insert") || !consumable.test(data.item, "attribute:listType") || !consumable.test(data.item, "attribute:listIndent")) return;
		consumable.consume(data.item, "insert");
		consumable.consume(data.item, "attribute:listType");
		consumable.consume(data.item, "attribute:listIndent");
		const modelItem = data.item;
		const viewItem = generateLiInUl(modelItem, conversionApi);
		injectViewList(modelItem, viewItem, conversionApi, model);
	};
}
/**
* A model-to-view converter for the `listItem` model element removal.
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:remove
* @param model Model instance.
* @returns Returns a conversion callback.
*/
function modelViewRemove(model) {
	return (evt, data, conversionApi) => {
		const viewItem = conversionApi.mapper.toViewPosition(data.position).getLastMatchingPosition((value) => !value.item.is("element", "li")).nodeAfter;
		const viewWriter = conversionApi.writer;
		viewWriter.breakContainer(viewWriter.createPositionBefore(viewItem));
		viewWriter.breakContainer(viewWriter.createPositionAfter(viewItem));
		const viewList = viewItem.parent;
		const viewListPrev = viewList.previousSibling;
		const removeRange = viewWriter.createRangeOn(viewList);
		const removed = viewWriter.remove(removeRange);
		if (viewListPrev && viewListPrev.nextSibling) mergeViewLists(viewWriter, viewListPrev, viewListPrev.nextSibling);
		hoistNestedLists(conversionApi.mapper.toModelElement(viewItem).getAttribute("listIndent") + 1, data.position, removeRange.start, viewItem, conversionApi, model);
		for (const child of viewWriter.createRangeIn(removed).getItems()) conversionApi.mapper.unbindViewElement(child);
		evt.stop();
	};
}
/**
* A model-to-view converter for the `type` attribute change on the `listItem` model element.
*
* This change means that the `<li>` element parent changes from `<ul>` to `<ol>` (or vice versa). This is accomplished
* by breaking view elements and changing their name. The next {@link module:list/legacylist/legacyconverters~modelViewMergeAfterChangeType}
* converter will attempt to merge split nodes.
*
* Splitting this conversion into 2 steps makes it possible to add an additional conversion in the middle.
* Check {@link module:list/legacytodolist/legacytodolistconverters~modelViewChangeType} to see an example of it.
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:attribute
*/
const modelViewChangeType$1 = (evt, data, conversionApi) => {
	if (!conversionApi.consumable.test(data.item, evt.name)) return;
	const viewItem = conversionApi.mapper.toViewElement(data.item);
	const viewWriter = conversionApi.writer;
	viewWriter.breakContainer(viewWriter.createPositionBefore(viewItem));
	viewWriter.breakContainer(viewWriter.createPositionAfter(viewItem));
	const viewList = viewItem.parent;
	const listName = data.attributeNewValue == "numbered" ? "ol" : "ul";
	viewWriter.rename(listName, viewList);
};
/**
* A model-to-view converter that attempts to merge nodes split by {@link module:list/legacylist/legacyconverters~modelViewChangeType}.
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:attribute
*/
const modelViewMergeAfterChangeType = (evt, data, conversionApi) => {
	conversionApi.consumable.consume(data.item, evt.name);
	const viewList = conversionApi.mapper.toViewElement(data.item).parent;
	const viewWriter = conversionApi.writer;
	mergeViewLists(viewWriter, viewList, viewList.nextSibling);
	mergeViewLists(viewWriter, viewList.previousSibling, viewList);
};
/**
* A model-to-view converter for the `listIndent` attribute change on the `listItem` model element.
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:attribute
* @param model Model instance.
* @returns Returns a conversion callback.
*/
function modelViewChangeIndent(model) {
	return (evt, data, conversionApi) => {
		if (!conversionApi.consumable.consume(data.item, "attribute:listIndent")) return;
		const viewItem = conversionApi.mapper.toViewElement(data.item);
		const viewWriter = conversionApi.writer;
		viewWriter.breakContainer(viewWriter.createPositionBefore(viewItem));
		viewWriter.breakContainer(viewWriter.createPositionAfter(viewItem));
		const viewList = viewItem.parent;
		const viewListPrev = viewList.previousSibling;
		const removeRange = viewWriter.createRangeOn(viewList);
		viewWriter.remove(removeRange);
		if (viewListPrev && viewListPrev.nextSibling) mergeViewLists(viewWriter, viewListPrev, viewListPrev.nextSibling);
		hoistNestedLists(data.attributeOldValue + 1, data.range.start, removeRange.start, viewItem, conversionApi, model);
		injectViewList(data.item, viewItem, conversionApi, model);
		for (const child of data.item.getChildren()) conversionApi.consumable.consume(child, "insert");
	};
}
/**
* A special model-to-view converter introduced by the {@link module:list/legacylist~LegacyList list feature}. This converter is fired for
* insert change of every model item, and should be fired before the actual converter. The converter checks whether the inserted
* model item is a non-`listItem` element. If it is, and it is inserted inside a view list, the converter breaks the
* list so the model element is inserted to the view parent element corresponding to its model parent element.
*
* The converter prevents such situations:
*
* ```xml
* // Model:                        // View:
* <listItem>foo</listItem>         <ul>
* <listItem>bar</listItem>             <li>foo</li>
*                                      <li>bar</li>
*                                  </ul>
*
* // After change:                 // Correct view guaranteed by this converter:
* <listItem>foo</listItem>         <ul><li>foo</li></ul><p>xxx</p><ul><li>bar</li></ul>
* <paragraph>xxx</paragraph>       // Instead of this wrong view state:
* <listItem>bar</listItem>         <ul><li>foo</li><p>xxx</p><li>bar</li></ul>
* ```
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:insert
*/
const modelViewSplitOnInsert = (evt, data, conversionApi) => {
	if (!conversionApi.consumable.test(data.item, evt.name)) return;
	if (data.item.name != "listItem") {
		let viewPosition = conversionApi.mapper.toViewPosition(data.range.start);
		const viewWriter = conversionApi.writer;
		const lists = [];
		while (viewPosition.parent.name == "ul" || viewPosition.parent.name == "ol") {
			viewPosition = viewWriter.breakContainer(viewPosition);
			if (viewPosition.parent.name != "li") break;
			const removeStart = viewPosition;
			const removeEnd = viewWriter.createPositionAt(viewPosition.parent, "end");
			if (!removeStart.isEqual(removeEnd)) {
				const removed = viewWriter.remove(viewWriter.createRange(removeStart, removeEnd));
				lists.push(removed);
			}
			viewPosition = viewWriter.createPositionAfter(viewPosition.parent);
		}
		if (lists.length > 0) {
			for (let i = 0; i < lists.length; i++) {
				const previousList = viewPosition.nodeBefore;
				viewPosition = viewWriter.insert(viewPosition, lists[i]).end;
				if (i > 0) {
					const mergePos = mergeViewLists(viewWriter, previousList, previousList.nextSibling);
					if (mergePos && mergePos.parent == previousList) viewPosition.offset--;
				}
			}
			mergeViewLists(viewWriter, viewPosition.nodeBefore, viewPosition.nodeAfter);
		}
	}
};
/**
* A special model-to-view converter introduced by the {@link module:list/legacylist~LegacyList list feature}. This converter takes care of
* merging view lists after something is removed or moved from near them.
*
* Example:
*
* ```xml
* // Model:                        // View:
* <listItem>foo</listItem>         <ul><li>foo</li></ul>
* <paragraph>xxx</paragraph>       <p>xxx</p>
* <listItem>bar</listItem>         <ul><li>bar</li></ul>
*
* // After change:                 // Correct view guaranteed by this converter:
* <listItem>foo</listItem>         <ul>
* <listItem>bar</listItem>             <li>foo</li>
*                                      <li>bar</li>
*                                  </ul>
* ```
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:remove
*/
const modelViewMergeAfter = (evt, data, conversionApi) => {
	const viewPosition = conversionApi.mapper.toViewPosition(data.position);
	const viewItemPrev = viewPosition.nodeBefore;
	const viewItemNext = viewPosition.nodeAfter;
	mergeViewLists(conversionApi.writer, viewItemPrev, viewItemNext);
};
/**
* A view-to-model converter that converts the `<li>` view elements into the `listItem` model elements.
*
* To set correct values of the `listType` and `listIndent` attributes the converter:
* * checks `<li>`'s parent,
* * stores and increases the `conversionApi.store.indent` value when `<li>`'s sub-items are converted.
*
* @internal
* @see module:engine/conversion/upcastdispatcher~UpcastDispatcher#event:element
*/
const viewModelConverter = (evt, data, conversionApi) => {
	if (conversionApi.consumable.consume(data.viewItem, { name: true })) {
		const writer = conversionApi.writer;
		const listItem = writer.createElement("listItem");
		const indent = getIndent$1(data.viewItem);
		writer.setAttribute("listIndent", indent, listItem);
		const type = data.viewItem.parent && data.viewItem.parent.name == "ol" ? "numbered" : "bulleted";
		writer.setAttribute("listType", type, listItem);
		if (!conversionApi.safeInsert(listItem, data.modelCursor)) return;
		const nextPosition = viewToModelListItemChildrenConverter(listItem, data.viewItem.getChildren(), conversionApi);
		data.modelRange = writer.createRange(data.modelCursor, nextPosition);
		conversionApi.updateConversionResult(listItem, data);
	}
};
/**
* A view-to-model converter for the `<ul>` and `<ol>` view elements that cleans the input view of garbage.
* This is mostly to clean whitespaces from between the `<li>` view elements inside the view list element, however, also
* incorrect data can be cleared if the view was incorrect.
*
* @internal
* @see module:engine/conversion/upcastdispatcher~UpcastDispatcher#event:element
*/
const cleanList = (evt, data, conversionApi) => {
	if (conversionApi.consumable.test(data.viewItem, { name: true })) {
		const children = Array.from(data.viewItem.getChildren());
		for (const child of children) if (!(child.is("element", "li") || isList(child))) child._remove();
	}
};
/**
* A view-to-model converter for the `<li>` elements that cleans whitespace formatting from the input view.
*
* @internal
* @see module:engine/conversion/upcastdispatcher~UpcastDispatcher#event:element
*/
const cleanListItem = (evt, data, conversionApi) => {
	if (conversionApi.consumable.test(data.viewItem, { name: true })) {
		if (data.viewItem.childCount === 0) return;
		const children = [...data.viewItem.getChildren()];
		let foundList = false;
		for (const child of children) {
			if (foundList && !isList(child)) child._remove();
			if (isList(child)) foundList = true;
		}
	}
};
/**
* Returns a callback for model position to view position mapping for {@link module:engine/conversion/mapper~Mapper}. The callback fixes
* positions between the `listItem` elements that would be incorrectly mapped because of how list items are represented in the model
* and in the view.
*
* @internal
*/
function modelToViewPosition(view) {
	return (evt, data) => {
		if (data.isPhantom) return;
		const modelItem = data.modelPosition.nodeBefore;
		if (modelItem && modelItem.is("element", "listItem")) {
			const viewItem = data.mapper.toViewElement(modelItem);
			const topmostViewList = viewItem.getAncestors().find(isList);
			const walker = view.createPositionAt(viewItem, 0).getWalker();
			for (const value of walker) if (value.type == "elementStart" && value.item.is("element", "li")) {
				data.viewPosition = value.previousPosition;
				break;
			} else if (value.type == "elementEnd" && value.item == topmostViewList) {
				data.viewPosition = value.nextPosition;
				break;
			}
		}
	};
}
/**
* The callback for view position to model position mapping for {@link module:engine/conversion/mapper~Mapper}. The callback fixes
* positions between the `<li>` elements that would be incorrectly mapped because of how list items are represented in the model
* and in the view.
*
* @internal
* @see module:engine/conversion/mapper~Mapper#event:viewToModelPosition
* @param model Model instance.
* @returns Returns a conversion callback.
*/
function viewToModelPosition(model) {
	return (evt, data) => {
		const viewPos = data.viewPosition;
		const viewParent = viewPos.parent;
		const mapper = data.mapper;
		if (viewParent.name == "ul" || viewParent.name == "ol") {
			if (!viewPos.isAtEnd) {
				const modelNode = mapper.toModelElement(viewPos.nodeAfter);
				data.modelPosition = model.createPositionBefore(modelNode);
			} else {
				const modelNode = mapper.toModelElement(viewPos.nodeBefore);
				const modelLength = mapper.getModelLength(viewPos.nodeBefore);
				data.modelPosition = model.createPositionBefore(modelNode).getShiftedBy(modelLength);
			}
			evt.stop();
		} else if (viewParent.name == "li" && viewPos.nodeBefore && (viewPos.nodeBefore.name == "ul" || viewPos.nodeBefore.name == "ol")) {
			const modelNode = mapper.toModelElement(viewParent);
			let modelLength = 1;
			let viewList = viewPos.nodeBefore;
			while (viewList && isList(viewList)) {
				modelLength += mapper.getModelLength(viewList);
				viewList = viewList.previousSibling;
			}
			data.modelPosition = model.createPositionBefore(modelNode).getShiftedBy(modelLength);
			evt.stop();
		}
	};
}
/**
* Post-fixer that reacts to changes on document and fixes incorrect model states.
*
* In the example below, there is a correct list structure.
* Then the middle element is removed so the list structure will become incorrect:
*
* ```xml
* <listItem listType="bulleted" listIndent=0>Item 1</listItem>
* <listItem listType="bulleted" listIndent=1>Item 2</listItem>   <--- this is removed.
* <listItem listType="bulleted" listIndent=2>Item 3</listItem>
* ```
*
* The list structure after the middle element is removed:
*
* ```xml
* <listItem listType="bulleted" listIndent=0>Item 1</listItem>
* <listItem listType="bulleted" listIndent=2>Item 3</listItem>
* ```
*
* Should become:
*
* ```xml
* <listItem listType="bulleted" listIndent=0>Item 1</listItem>
* <listItem listType="bulleted" listIndent=1>Item 3</listItem>   <--- note that indent got post-fixed.
* ```
*
* @internal
* @param model The data model.
* @param writer The writer to do changes with.
* @returns `true` if any change has been applied, `false` otherwise.
*/
function modelChangePostFixer(model, writer) {
	const changes = model.document.differ.getChanges();
	const itemToListHead = /* @__PURE__ */ new Map();
	let applied = false;
	for (const entry of changes) if (entry.type == "insert" && entry.name == "listItem") _addListToFix(entry.position);
	else if (entry.type == "insert" && entry.name != "listItem") {
		if (entry.name != "$text") {
			const item = entry.position.nodeAfter;
			if (item.hasAttribute("listIndent")) {
				writer.removeAttribute("listIndent", item);
				applied = true;
			}
			if (item.hasAttribute("listType")) {
				writer.removeAttribute("listType", item);
				applied = true;
			}
			if (item.hasAttribute("listStyle")) {
				writer.removeAttribute("listStyle", item);
				applied = true;
			}
			if (item.hasAttribute("listReversed")) {
				writer.removeAttribute("listReversed", item);
				applied = true;
			}
			if (item.hasAttribute("listStart")) {
				writer.removeAttribute("listStart", item);
				applied = true;
			}
			for (const innerItem of Array.from(model.createRangeIn(item)).filter((e) => e.item.is("element", "listItem"))) _addListToFix(innerItem.previousPosition);
		}
		_addListToFix(entry.position.getShiftedBy(entry.length));
	} else if (entry.type == "remove" && entry.name == "listItem") _addListToFix(entry.position);
	else if (entry.type == "attribute" && entry.attributeKey == "listIndent") _addListToFix(entry.range.start);
	else if (entry.type == "attribute" && entry.attributeKey == "listType") _addListToFix(entry.range.start);
	for (const listHead of itemToListHead.values()) {
		_fixListIndents(listHead);
		_fixListTypes(listHead);
	}
	return applied;
	function _addListToFix(position) {
		const previousNode = position.nodeBefore;
		if (!previousNode || !previousNode.is("element", "listItem")) {
			const item = position.nodeAfter;
			if (item && item.is("element", "listItem")) itemToListHead.set(item, item);
		} else {
			let listHead = previousNode;
			if (itemToListHead.has(listHead)) return;
			for (let previousSibling = listHead.previousSibling; previousSibling && previousSibling.is("element", "listItem"); previousSibling = listHead.previousSibling) {
				listHead = previousSibling;
				if (itemToListHead.has(listHead)) return;
			}
			itemToListHead.set(previousNode, listHead);
		}
	}
	function _fixListIndents(item) {
		let maxIndent = 0;
		let fixBy = null;
		while (item && item.is("element", "listItem")) {
			const itemIndent = item.getAttribute("listIndent");
			if (itemIndent > maxIndent) {
				let newIndent;
				if (fixBy === null) {
					fixBy = itemIndent - maxIndent;
					newIndent = maxIndent;
				} else {
					if (fixBy > itemIndent) fixBy = itemIndent;
					newIndent = itemIndent - fixBy;
				}
				writer.setAttribute("listIndent", newIndent, item);
				applied = true;
			} else {
				fixBy = null;
				maxIndent = item.getAttribute("listIndent") + 1;
			}
			item = item.nextSibling;
		}
	}
	function _fixListTypes(item) {
		let typesStack = [];
		let prev = null;
		while (item && item.is("element", "listItem")) {
			const itemIndent = item.getAttribute("listIndent");
			if (prev && prev.getAttribute("listIndent") > itemIndent) typesStack = typesStack.slice(0, itemIndent + 1);
			if (itemIndent != 0) {
				if (typesStack[itemIndent]) {
					const type = typesStack[itemIndent];
					if (item.getAttribute("listType") != type) {
						writer.setAttribute("listType", type, item);
						applied = true;
					}
				} else typesStack[itemIndent] = item.getAttribute("listType");
			}
			prev = item;
			item = item.nextSibling;
		}
	}
}
/**
* A fixer for pasted content that includes list items.
*
* It fixes indentation of pasted list items so the pasted items match correctly to the context they are pasted into.
*
* Example:
*
* ```xml
* <listItem listType="bulleted" listIndent=0>A</listItem>
* <listItem listType="bulleted" listIndent=1>B^</listItem>
* // At ^ paste:  <listItem listType="bulleted" listIndent=4>X</listItem>
* //              <listItem listType="bulleted" listIndent=5>Y</listItem>
* <listItem listType="bulleted" listIndent=2>C</listItem>
* ```
*
* Should become:
*
* ```xml
* <listItem listType="bulleted" listIndent=0>A</listItem>
* <listItem listType="bulleted" listIndent=1>BX</listItem>
* <listItem listType="bulleted" listIndent=2>Y/listItem>
* <listItem listType="bulleted" listIndent=2>C</listItem>
* ```
*
* @internal
*/
const modelIndentPasteFixer = function(evt, [content, selectable]) {
	const model = this;
	let item = content.is("documentFragment") ? content.getChild(0) : content;
	let selection;
	if (!selectable) selection = model.document.selection;
	else selection = model.createSelection(selectable);
	if (item && item.is("element", "listItem")) {
		const pos = selection.getFirstPosition();
		let refItem = null;
		if (pos.parent.is("element", "listItem")) refItem = pos.parent;
		else if (pos.nodeBefore && pos.nodeBefore.is("element", "listItem")) refItem = pos.nodeBefore;
		if (refItem) {
			const indentChange = refItem.getAttribute("listIndent");
			if (indentChange > 0) while (item && item.is("element", "listItem")) {
				item._setAttribute("listIndent", item.getAttribute("listIndent") + indentChange);
				item = item.nextSibling;
			}
		}
	}
};
/**
* Helper function that converts children of a given `<li>` view element into corresponding model elements.
* The function maintains proper order of elements if model `listItem` is split during the conversion
* due to block children conversion.
*
* @param listItemModel List item model element to which converted children will be inserted.
* @param viewChildren View elements which will be converted.
* @param conversionApi Conversion interface to be used by the callback.
* @returns Position on which next elements should be inserted after children conversion.
*/
function viewToModelListItemChildrenConverter(listItemModel, viewChildren, conversionApi) {
	const { writer, schema } = conversionApi;
	let nextPosition = writer.createPositionAfter(listItemModel);
	for (const child of viewChildren) if (child.name == "ul" || child.name == "ol") nextPosition = conversionApi.convertItem(child, nextPosition).modelCursor;
	else {
		const result = conversionApi.convertItem(child, writer.createPositionAt(listItemModel, "end"));
		const convertedChild = result.modelRange.start.nodeAfter;
		if (convertedChild && convertedChild.is("element") && !schema.checkChild(listItemModel, convertedChild.name)) {
			if (result.modelCursor.parent.is("element", "listItem")) listItemModel = result.modelCursor.parent;
			else listItemModel = findNextListItem(result.modelCursor);
			nextPosition = writer.createPositionAfter(listItemModel);
		}
	}
	return nextPosition;
}
/**
* Helper function that seeks for a next list item starting from given `startPosition`.
*/
function findNextListItem(startPosition) {
	const treeWalker = new ModelTreeWalker({ startPosition });
	let value;
	do
		value = treeWalker.next();
	while (!value.value.item.is("element", "listItem"));
	return value.value.item;
}
/**
* Helper function that takes all children of given `viewRemovedItem` and moves them in a correct place, according
* to other given parameters.
*/
function hoistNestedLists(nextIndent, modelRemoveStartPosition, viewRemoveStartPosition, viewRemovedItem, conversionApi, model) {
	const prevModelItem = getSiblingListItem(modelRemoveStartPosition.nodeBefore, {
		sameIndent: true,
		smallerIndent: true,
		listIndent: nextIndent
	});
	const mapper = conversionApi.mapper;
	const viewWriter = conversionApi.writer;
	const prevIndent = prevModelItem ? prevModelItem.getAttribute("listIndent") : null;
	let insertPosition;
	if (!prevModelItem) insertPosition = viewRemoveStartPosition;
	else if (prevIndent == nextIndent) {
		const prevViewList = mapper.toViewElement(prevModelItem).parent;
		insertPosition = viewWriter.createPositionAfter(prevViewList);
	} else {
		const modelPosition = model.createPositionAt(prevModelItem, "end");
		insertPosition = mapper.toViewPosition(modelPosition);
	}
	insertPosition = positionAfterUiElements(insertPosition);
	for (const child of [...viewRemovedItem.getChildren()]) if (isList(child)) {
		insertPosition = viewWriter.move(viewWriter.createRangeOn(child), insertPosition).end;
		mergeViewLists(viewWriter, child, child.nextSibling);
		mergeViewLists(viewWriter, child.previousSibling, child);
	}
}
/**
* Checks if view element is a list type (ul or ol).
*/
function isList(viewElement) {
	return viewElement.is("element", "ol") || viewElement.is("element", "ul");
}
/**
* Calculates the indent value for a list item. Handles HTML compliant and non-compliant lists.
*
* Also, fixes non HTML compliant lists indents:
*
* ```
* before:                                     fixed list:
* OL                                          OL
* |-> LI (parent LIs: 0)                      |-> LI     (indent: 0)
*     |-> OL                                  |-> OL
*         |-> OL                                  |
*         |   |-> OL                              |
*         |       |-> OL                          |
*         |           |-> LI (parent LIs: 1)      |-> LI (indent: 1)
*         |-> LI (parent LIs: 1)                  |-> LI (indent: 1)
*
* before:                                     fixed list:
* OL                                          OL
* |-> OL                                      |
*     |-> OL                                  |
*          |-> OL                             |
*              |-> LI (parent LIs: 0)         |-> LI        (indent: 0)
*
* before:                                     fixed list:
* OL                                          OL
* |-> LI (parent LIs: 0)                      |-> LI         (indent: 0)
* |-> OL                                          |-> OL
*     |-> LI (parent LIs: 0)                          |-> LI (indent: 1)
* ```
*/
function getIndent$1(listItem) {
	let indent = 0;
	let parent = listItem.parent;
	while (parent) {
		if (parent.is("element", "li")) indent++;
		else {
			const previousSibling = parent.previousSibling;
			if (previousSibling && previousSibling.is("element", "li")) indent++;
		}
		parent = parent.parent;
	}
	return indent;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/legacylist/legacylistediting
*/
/**
* The engine of the list feature. It handles creating, editing and removing lists and list items.
*
* It registers the `'numberedList'`, `'bulletedList'`, `'indentList'` and `'outdentList'` commands.
*/
var LegacyListEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LegacyListEditing";
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
			Enter,
			Delete,
			LegacyListUtils
		];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		editor.model.schema.register("listItem", {
			inheritAllFrom: "$block",
			allowAttributes: ["listType", "listIndent"]
		});
		const data = editor.data;
		const editing = editor.editing;
		editor.model.document.registerPostFixer((writer) => modelChangePostFixer(editor.model, writer));
		editing.mapper.registerViewToModelLength("li", getViewListItemLength);
		data.mapper.registerViewToModelLength("li", getViewListItemLength);
		editing.mapper.on("modelToViewPosition", modelToViewPosition(editing.view));
		editing.mapper.on("viewToModelPosition", viewToModelPosition(editor.model));
		data.mapper.on("modelToViewPosition", modelToViewPosition(editing.view));
		editor.conversion.for("editingDowncast").add((dispatcher) => {
			dispatcher.on("insert", modelViewSplitOnInsert, { priority: "high" });
			dispatcher.on("insert:listItem", modelViewInsertion$1(editor.model));
			dispatcher.on("attribute:listType:listItem", modelViewChangeType$1, { priority: "high" });
			dispatcher.on("attribute:listType:listItem", modelViewMergeAfterChangeType, { priority: "low" });
			dispatcher.on("attribute:listIndent:listItem", modelViewChangeIndent(editor.model));
			dispatcher.on("remove:listItem", modelViewRemove(editor.model));
			dispatcher.on("remove", modelViewMergeAfter, { priority: "low" });
		});
		editor.conversion.for("dataDowncast").add((dispatcher) => {
			dispatcher.on("insert", modelViewSplitOnInsert, { priority: "high" });
			dispatcher.on("insert:listItem", modelViewInsertion$1(editor.model));
		});
		editor.conversion.for("upcast").add((dispatcher) => {
			dispatcher.on("element:ul", cleanList, { priority: "high" });
			dispatcher.on("element:ol", cleanList, { priority: "high" });
			dispatcher.on("element:li", cleanListItem, { priority: "high" });
			dispatcher.on("element:li", viewModelConverter);
		});
		editor.model.on("insertContent", modelIndentPasteFixer, { priority: "high" });
		editor.commands.add("numberedList", new LegacyListCommand(editor, "numbered"));
		editor.commands.add("bulletedList", new LegacyListCommand(editor, "bulleted"));
		editor.commands.add("indentList", new LegacyIndentCommand(editor, "forward"));
		editor.commands.add("outdentList", new LegacyIndentCommand(editor, "backward"));
		const viewDocument = editing.view.document;
		this.listenTo(viewDocument, "enter", (evt, data) => {
			const doc = this.editor.model.document;
			const positionParent = doc.selection.getLastPosition().parent;
			if (doc.selection.isCollapsed && positionParent.name == "listItem" && positionParent.isEmpty) {
				this.editor.execute("outdentList");
				data.preventDefault();
				evt.stop();
			}
		}, { context: "li" });
		this.listenTo(viewDocument, "delete", (evt, data) => {
			if (data.direction !== "backward") return;
			const selection = this.editor.model.document.selection;
			if (!selection.isCollapsed) return;
			const firstPosition = selection.getFirstPosition();
			if (!firstPosition.isAtStart) return;
			const positionParent = firstPosition.parent;
			if (positionParent.name !== "listItem") return;
			if (positionParent.previousSibling && positionParent.previousSibling.name === "listItem") return;
			this.editor.execute("outdentList");
			data.preventDefault();
			evt.stop();
		}, { context: "li" });
		this.listenTo(editor.editing.view.document, "tab", (evt, data) => {
			const commandName = data.shiftKey ? "outdentList" : "indentList";
			if (this.editor.commands.get(commandName).isEnabled) {
				editor.execute(commandName);
				data.stopPropagation();
				data.preventDefault();
				evt.stop();
			}
		}, { context: "li" });
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		const commands = this.editor.commands;
		const indent = commands.get("indent");
		const outdent = commands.get("outdent");
		if (indent) indent.registerChildCommand(commands.get("indentList"));
		if (outdent) outdent.registerChildCommand(commands.get("outdentList"));
	}
};
function getViewListItemLength(element) {
	let length = 1;
	for (const child of element.getChildren()) if (child.name == "ul" || child.name == "ol") for (const item of child.getChildren()) length += getViewListItemLength(item);
	return length;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/legacylist
*/
/**
* The legacy list feature.
*
* This is a "glue" plugin that loads the {@link module:list/legacylist/legacylistediting~LegacyListEditing legacy list editing feature}
* and {@link module:list/list/listui~ListUI list UI feature}.
*/
var LegacyList = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [LegacyListEditing, ListUI];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LegacyList";
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
* @module list/legacylistproperties/legacyliststylecommand
*/
/**
* The list style command. It changes the `listStyle` attribute of the selected list items.
*
* If the list type (numbered or bulleted) can be inferred from the passed style type,
* the command tries to convert selected items to a list of that type.
* It is used by the {@link module:list/legacylistproperties~LegacyListProperties legacy list properties feature}.
*/
var LegacyListStyleCommand = class extends Command {
	/**
	* The default type of the list style.
	*/
	defaultType;
	/**
	* Creates an instance of the command.
	*
	* @param editor The editor instance.
	* @param defaultType The list type that will be used by default if the value was not specified during
	* the command execution.
	*/
	constructor(editor, defaultType) {
		super(editor);
		this.defaultType = defaultType;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.value = this._getValue();
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Executes the command.
	*
	* @fires execute
	* @param options.type The type of the list style, e.g. `'disc'` or `'square'`. If `null` is specified, the default
	* style will be applied.
	*/
	execute(options = {}) {
		this._tryToConvertItemsToList(options);
		const model = this.editor.model;
		const listItems = getSelectedListItems(model);
		if (!listItems.length) return;
		model.change((writer) => {
			for (const item of listItems) writer.setAttribute("listStyle", options.type || this.defaultType, item);
		});
	}
	/**
	* Checks the command's {@link #value}.
	*
	* @returns The current value.
	*/
	_getValue() {
		const listItem = this.editor.model.document.selection.getFirstPosition().parent;
		if (listItem && listItem.is("element", "listItem")) return listItem.getAttribute("listStyle");
		return null;
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @returns Whether the command should be enabled.
	*/
	_checkEnabled() {
		const editor = this.editor;
		const numberedList = editor.commands.get("numberedList");
		const bulletedList = editor.commands.get("bulletedList");
		return numberedList.isEnabled || bulletedList.isEnabled;
	}
	/**
	* Checks if the provided list style is valid. Also changes the selection to a list if it's not set yet.
	*
	* @param options Additional options.
	* @param options.type The type of the list style. If `null` is specified, the function does nothing.
	*/
	_tryToConvertItemsToList(options) {
		if (!options.type) return;
		const listType = getListTypeFromListStyleType$1(options.type);
		/* istanbul ignore next -- @preserve */
		if (!listType) return;
		const editor = this.editor;
		const commandName = `${listType}List`;
		if (!editor.commands.get(commandName).value) editor.execute(commandName);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/legacylistproperties/legacylistreversedcommand
*/
/**
* The reversed list command. It changes the `listReversed` attribute of the selected list items. As a result, the list order will be
* reversed.
* It is used by the {@link module:list/legacylistproperties~LegacyListProperties legacy list properties feature}.
*/
var LegacyListReversedCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	refresh() {
		const value = this._getValue();
		this.value = value;
		this.isEnabled = value != null;
	}
	/**
	* Executes the command.
	*
	* @fires execute
	* @param options.reversed Whether the list should be reversed.
	*/
	execute(options = {}) {
		const model = this.editor.model;
		const listItems = getSelectedListItems(model).filter((item) => item.getAttribute("listType") == "numbered");
		model.change((writer) => {
			for (const item of listItems) writer.setAttribute("listReversed", !!options.reversed, item);
		});
	}
	/**
	* Checks the command's {@link #value}.
	*
	* @returns The current value.
	*/
	_getValue() {
		const listItem = this.editor.model.document.selection.getFirstPosition().parent;
		if (listItem && listItem.is("element", "listItem") && listItem.getAttribute("listType") == "numbered") return listItem.getAttribute("listReversed");
		return null;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/legacylistproperties/legacyliststartcommand
*/
/**
* The list start index command. It changes the `listStart` attribute of the selected list items.
* It is used by the {@link module:list/legacylistproperties~LegacyListProperties legacy list properties feature}.
*/
var LegacyListStartCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	refresh() {
		const value = this._getValue();
		this.value = value;
		this.isEnabled = value != null;
	}
	/**
	* Executes the command.
	*
	* @fires execute
	* @param options Execute options.
	* @param options.startIndex The list start index.
	*/
	execute({ startIndex = 1 } = {}) {
		const model = this.editor.model;
		const listItems = getSelectedListItems(model).filter((item) => item.getAttribute("listType") == "numbered");
		model.change((writer) => {
			for (const item of listItems) writer.setAttribute("listStart", startIndex >= 0 ? startIndex : 1, item);
		});
	}
	/**
	* Checks the command's {@link #value}.
	*
	* @returns The current value.
	*/
	_getValue() {
		const listItem = this.editor.model.document.selection.getFirstPosition().parent;
		if (listItem && listItem.is("element", "listItem") && listItem.getAttribute("listType") == "numbered") return listItem.getAttribute("listStart");
		return null;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/legacylistproperties/legacylistpropertiesediting
*/
const DEFAULT_LIST_TYPE = "default";
/**
* The engine of the list properties feature.
*
* It sets the value for the `listItem` attribute of the {@link module:list/legacylist~LegacyList `<listItem>`} element that
* allows modifying the list style type.
*
* It registers the `'listStyle'`, `'listReversed'` and `'listStart'` commands if they are enabled in the configuration.
* Read more in {@link module:list/listconfig~ListPropertiesConfig}.
*/
var LegacyListPropertiesEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [LegacyListEditing];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LegacyListPropertiesEditing";
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
		editor.config.define("list", { properties: {
			styles: true,
			startIndex: false,
			reversed: false
		} });
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const model = editor.model;
		const strategies = createAttributeStrategies(editor.config.get("list.properties"));
		model.schema.extend("listItem", { allowAttributes: strategies.map((s) => s.attributeName) });
		for (const strategy of strategies) strategy.addCommand(editor);
		this.listenTo(editor.commands.get("indentList"), "_executeCleanup", fixListAfterIndentListCommand(editor, strategies));
		this.listenTo(editor.commands.get("outdentList"), "_executeCleanup", fixListAfterOutdentListCommand(editor, strategies));
		this.listenTo(editor.commands.get("bulletedList"), "_executeCleanup", restoreDefaultListStyle(editor));
		this.listenTo(editor.commands.get("numberedList"), "_executeCleanup", restoreDefaultListStyle(editor));
		model.document.registerPostFixer(fixListAttributesOnListItemElements(editor, strategies));
		editor.conversion.for("upcast").add(upcastListItemAttributes(strategies));
		editor.conversion.for("downcast").add(downcastListItemAttributes(strategies));
		this._mergeListAttributesWhileMergingLists(strategies);
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		const editor = this.editor;
		if (editor.commands.get("todoList")) editor.model.document.registerPostFixer(removeListItemAttributesFromTodoList(editor));
	}
	/**
	* Starts listening to {@link module:engine/model/model~Model#deleteContent} and checks whether two lists will be merged into a single
	* one after deleting the content.
	*
	* The purpose of this action is to adjust the `listStyle`, `listReversed` and `listStart` values
	* for the list that was merged.
	*
	* Consider the following model's content:
	*
	* ```xml
	* <listItem listIndent="0" listType="bulleted" listStyle="square">UL List item 1</listItem>
	* <listItem listIndent="0" listType="bulleted" listStyle="square">UL List item 2</listItem>
	* <paragraph>[A paragraph.]</paragraph>
	* <listItem listIndent="0" listType="bulleted" listStyle="circle">UL List item 1</listItem>
	* <listItem listIndent="0" listType="bulleted" listStyle="circle">UL List item 2</listItem>
	* ```
	*
	* After removing the paragraph element, the second list will be merged into the first one.
	* We want to inherit the `listStyle` attribute for the second list from the first one.
	*
	* ```xml
	* <listItem listIndent="0" listType="bulleted" listStyle="square">UL List item 1</listItem>
	* <listItem listIndent="0" listType="bulleted" listStyle="square">UL List item 2</listItem>
	* <listItem listIndent="0" listType="bulleted" listStyle="square">UL List item 1</listItem>
	* <listItem listIndent="0" listType="bulleted" listStyle="square">UL List item 2</listItem>
	* ```
	*
	* See https://github.com/ckeditor/ckeditor5/issues/7879.
	*
	* @param attributeStrategies Strategies for the enabled attributes.
	*/
	_mergeListAttributesWhileMergingLists(attributeStrategies) {
		const model = this.editor.model;
		let firstMostOuterItem;
		this.listenTo(model, "deleteContent", (evt, [selection]) => {
			const firstPosition = selection.getFirstPosition();
			const lastPosition = selection.getLastPosition();
			if (firstPosition.parent === lastPosition.parent) return;
			if (!firstPosition.parent.is("element", "listItem")) return;
			const nextSibling = lastPosition.parent.nextSibling;
			if (!nextSibling || !nextSibling.is("element", "listItem")) return;
			const mostOuterItemList = getSiblingListItem(firstPosition.parent, {
				sameIndent: true,
				listIndent: nextSibling.getAttribute("listIndent")
			});
			if (!mostOuterItemList) return;
			if (mostOuterItemList.getAttribute("listType") === nextSibling.getAttribute("listType")) firstMostOuterItem = mostOuterItemList;
		}, { priority: "high" });
		this.listenTo(model, "deleteContent", () => {
			if (!firstMostOuterItem) return;
			model.change((writer) => {
				const secondListMostOuterItem = getSiblingListItem(firstMostOuterItem.nextSibling, {
					sameIndent: true,
					listIndent: firstMostOuterItem.getAttribute("listIndent"),
					direction: "forward"
				});
				if (!secondListMostOuterItem) {
					firstMostOuterItem = null;
					return;
				}
				const items = [secondListMostOuterItem, ...getSiblingNodes(writer.createPositionAt(secondListMostOuterItem, 0), "forward")];
				for (const listItem of items) for (const strategy of attributeStrategies) if (strategy.appliesToListItem(listItem)) {
					const attributeName = strategy.attributeName;
					const value = firstMostOuterItem.getAttribute(attributeName);
					writer.setAttribute(attributeName, value, listItem);
				}
			});
			firstMostOuterItem = null;
		}, { priority: "low" });
	}
};
/**
* Creates an array of strategies for dealing with enabled listItem attributes.
*/
function createAttributeStrategies(enabledProperties) {
	const strategies = [];
	if (enabledProperties.styles) strategies.push({
		attributeName: "listStyle",
		defaultValue: DEFAULT_LIST_TYPE,
		addCommand(editor) {
			editor.commands.add("listStyle", new LegacyListStyleCommand(editor, DEFAULT_LIST_TYPE));
		},
		appliesToListItem() {
			return true;
		},
		setAttributeOnDowncast(writer, listStyle, element) {
			if (listStyle && listStyle !== DEFAULT_LIST_TYPE) writer.setStyle("list-style-type", listStyle, element);
			else writer.removeStyle("list-style-type", element);
		},
		getAttributeOnUpcast(listParent) {
			return normalizeListStyle(listParent.getStyle("list-style-type")) || DEFAULT_LIST_TYPE;
		}
	});
	if (enabledProperties.reversed) strategies.push({
		attributeName: "listReversed",
		defaultValue: false,
		addCommand(editor) {
			editor.commands.add("listReversed", new LegacyListReversedCommand(editor));
		},
		appliesToListItem(item) {
			return item.getAttribute("listType") == "numbered";
		},
		setAttributeOnDowncast(writer, listReversed, element) {
			if (listReversed) writer.setAttribute("reversed", "reversed", element);
			else writer.removeAttribute("reversed", element);
		},
		getAttributeOnUpcast(listParent) {
			return listParent.hasAttribute("reversed");
		}
	});
	if (enabledProperties.startIndex) strategies.push({
		attributeName: "listStart",
		defaultValue: 1,
		addCommand(editor) {
			editor.commands.add("listStart", new LegacyListStartCommand(editor));
		},
		appliesToListItem(item) {
			return item.getAttribute("listType") == "numbered";
		},
		setAttributeOnDowncast(writer, listStart, element) {
			if (listStart == 0 || listStart > 1) writer.setAttribute("start", listStart, element);
			else writer.removeAttribute("start", element);
		},
		getAttributeOnUpcast(listParent) {
			const startAttributeValue = listParent.getAttribute("start");
			return startAttributeValue >= 0 ? startAttributeValue : 1;
		}
	});
	return strategies;
}
/**
* Returns a converter consumes the `style`, `reversed` and `start` attribute.
* In `style` it searches for the `list-style-type` definition.
* If not found, the `"default"` value will be used.
*/
function upcastListItemAttributes(attributeStrategies) {
	return (dispatcher) => {
		dispatcher.on("element:li", (evt, data, conversionApi) => {
			if (!data.modelRange) return;
			const listParent = data.viewItem.parent;
			const listItem = data.modelRange.start.nodeAfter || data.modelRange.end.nodeBefore;
			for (const strategy of attributeStrategies) if (strategy.appliesToListItem(listItem)) {
				const listStyle = strategy.getAttributeOnUpcast(listParent);
				conversionApi.writer.setAttribute(strategy.attributeName, listStyle, listItem);
			}
		}, { priority: "low" });
	};
}
/**
* Returns a converter that adds `reversed`, `start` attributes and adds `list-style-type` definition as a value for the `style` attribute.
* The `"default"` values are removed and not present in the view/data.
*/
function downcastListItemAttributes(attributeStrategies) {
	return (dispatcher) => {
		for (const strategy of attributeStrategies) dispatcher.on(`attribute:${strategy.attributeName}:listItem`, (evt, data, conversionApi) => {
			const viewWriter = conversionApi.writer;
			const currentElement = data.item;
			const previousElement = getSiblingListItem(currentElement.previousSibling, {
				sameIndent: true,
				listIndent: currentElement.getAttribute("listIndent"),
				direction: "backward"
			});
			const viewItem = conversionApi.mapper.toViewElement(currentElement);
			if (!areRepresentingSameList(currentElement, previousElement)) viewWriter.breakContainer(viewWriter.createPositionBefore(viewItem));
			strategy.setAttributeOnDowncast(viewWriter, data.attributeNewValue, viewItem.parent);
		}, { priority: "low" });
	};
	/**
	* Checks whether specified list items belong to the same list.
	*/
	function areRepresentingSameList(listItem1, listItem2) {
		return listItem2 && listItem1.getAttribute("listType") === listItem2.getAttribute("listType") && listItem1.getAttribute("listIndent") === listItem2.getAttribute("listIndent") && listItem1.getAttribute("listStyle") === listItem2.getAttribute("listStyle") && listItem1.getAttribute("listReversed") === listItem2.getAttribute("listReversed") && listItem1.getAttribute("listStart") === listItem2.getAttribute("listStart");
	}
}
/**
* When indenting list, nested list should clear its value for the attributes or inherit from nested lists.
*
* ■ List item 1.
* ■ List item 2.[]
* ■ List item 3.
* editor.execute( 'indentList' );
*
* ■ List item 1.
*     ○ List item 2.[]
* ■ List item 3.
*/
function fixListAfterIndentListCommand(editor, attributeStrategies) {
	return (evt, changedItems) => {
		const root = changedItems[0];
		const rootIndent = root.getAttribute("listIndent");
		const itemsToUpdate = changedItems.filter((item) => item.getAttribute("listIndent") === rootIndent);
		let previousSibling = null;
		if (root.previousSibling.getAttribute("listIndent") + 1 !== rootIndent) previousSibling = getSiblingListItem(root.previousSibling, {
			sameIndent: true,
			direction: "backward",
			listIndent: rootIndent
		});
		editor.model.change((writer) => {
			for (const item of itemsToUpdate) for (const strategy of attributeStrategies) if (strategy.appliesToListItem(item)) {
				const valueToSet = previousSibling == null ? strategy.defaultValue : previousSibling.getAttribute(strategy.attributeName);
				writer.setAttribute(strategy.attributeName, valueToSet, item);
			}
		});
	};
}
/**
* When outdenting a list, a nested list should copy attribute values
* from the previous sibling list item including the same value for the `listIndent` value.
*
* ■ List item 1.
*     ○ List item 2.[]
* ■ List item 3.
*
* editor.execute( 'outdentList' );
*
* ■ List item 1.
* ■ List item 2.[]
* ■ List item 3.
*/
function fixListAfterOutdentListCommand(editor, attributeStrategies) {
	return (evt, changedItems) => {
		changedItems = changedItems.reverse().filter((item) => item.is("element", "listItem"));
		if (!changedItems.length) return;
		const indent = changedItems[0].getAttribute("listIndent");
		const listType = changedItems[0].getAttribute("listType");
		let listItem = changedItems[0].previousSibling;
		if (listItem.is("element", "listItem")) while (listItem.getAttribute("listIndent") !== indent) listItem = listItem.previousSibling;
		else listItem = null;
		if (!listItem) listItem = changedItems[changedItems.length - 1].nextSibling;
		if (!listItem || !listItem.is("element", "listItem")) return;
		if (listItem.getAttribute("listType") !== listType) return;
		editor.model.change((writer) => {
			const itemsToUpdate = changedItems.filter((item) => item.getAttribute("listIndent") === indent);
			for (const item of itemsToUpdate) for (const strategy of attributeStrategies) if (strategy.appliesToListItem(item)) {
				const attributeName = strategy.attributeName;
				const valueToSet = listItem.getAttribute(attributeName);
				writer.setAttribute(attributeName, valueToSet, item);
			}
		});
	};
}
/**
* Each `listItem` element must have specified the `listStyle`, `listReversed` and `listStart` attributes
* if they are enabled and supported by its `listType`.
* This post-fixer checks whether inserted elements `listItem` elements should inherit the attribute values from
* their sibling nodes or should use the default values.
*
* Paragraph[]
* ■ List item 1. // [listStyle="square", listType="bulleted"]
* ■ List item 2. // ...
* ■ List item 3. // ...
*
* editor.execute( 'bulletedList' )
*
* ■ Paragraph[]  // [listStyle="square", listType="bulleted"]
* ■ List item 1. // [listStyle="square", listType="bulleted"]
* ■ List item 2.
* ■ List item 3.
*
* It also covers a such change:
*
* [Paragraph 1
* Paragraph 2]
* ■ List item 1. // [listStyle="square", listType="bulleted"]
* ■ List item 2. // ...
* ■ List item 3. // ...
*
* editor.execute( 'numberedList' )
*
* 1. [Paragraph 1 // [listStyle="default", listType="numbered"]
* 2. Paragraph 2] // [listStyle="default", listType="numbered"]
* ■ List item 1.  // [listStyle="square", listType="bulleted"]
* ■ List item 2.  // ...
* ■ List item 3.  // ...
*/
function fixListAttributesOnListItemElements(editor, attributeStrategies) {
	return (writer) => {
		let wasFixed = false;
		const insertedListItems = getChangedListItems(editor.model.document.differ.getChanges()).filter((item) => {
			return item.getAttribute("listType") !== "todo";
		});
		if (!insertedListItems.length) return wasFixed;
		let existingListItem = insertedListItems[insertedListItems.length - 1].nextSibling;
		if (!existingListItem || !existingListItem.is("element", "listItem")) {
			existingListItem = insertedListItems[0].previousSibling;
			if (existingListItem) {
				const indent = insertedListItems[0].getAttribute("listIndent");
				while (existingListItem.is("element", "listItem") && existingListItem.getAttribute("listIndent") !== indent) {
					existingListItem = existingListItem.previousSibling;
					if (!existingListItem) break;
				}
			}
		}
		for (const strategy of attributeStrategies) {
			const attributeName = strategy.attributeName;
			for (const item of insertedListItems) {
				if (!strategy.appliesToListItem(item)) {
					writer.removeAttribute(attributeName, item);
					continue;
				}
				if (!item.hasAttribute(attributeName)) {
					if (shouldInheritListType(existingListItem, item, strategy)) writer.setAttribute(attributeName, existingListItem.getAttribute(attributeName), item);
					else writer.setAttribute(attributeName, strategy.defaultValue, item);
					wasFixed = true;
				} else {
					const previousSibling = item.previousSibling;
					if (shouldInheritListTypeFromPreviousItem(previousSibling, item, strategy.attributeName)) {
						writer.setAttribute(attributeName, previousSibling.getAttribute(attributeName), item);
						wasFixed = true;
					}
				}
			}
		}
		return wasFixed;
	};
}
/**
* Checks whether the `listStyle`, `listReversed` and `listStart` attributes
* should be copied from the `baseItem` element.
*
* The attribute should be copied if the inserted element does not have defined it and
* the value for the element is other than default in the base element.
*/
function shouldInheritListType(baseItem, itemToChange, attributeStrategy) {
	if (!baseItem) return false;
	const baseListAttribute = baseItem.getAttribute(attributeStrategy.attributeName);
	if (!baseListAttribute) return false;
	if (baseListAttribute == attributeStrategy.defaultValue) return false;
	if (baseItem.getAttribute("listType") !== itemToChange.getAttribute("listType")) return false;
	return true;
}
/**
* Checks whether the `listStyle`, `listReversed` and `listStart` attributes
* should be copied from previous list item.
*
* The attribute should be copied if there's a mismatch of styles of the pasted list into a nested list.
* Top-level lists are not normalized as we allow side-by-side list of different types.
*/
function shouldInheritListTypeFromPreviousItem(previousItem, itemToChange, attributeName) {
	if (!previousItem || !previousItem.is("element", "listItem")) return false;
	if (itemToChange.getAttribute("listType") !== previousItem.getAttribute("listType")) return false;
	const previousItemIndent = previousItem.getAttribute("listIndent");
	if (previousItemIndent < 1 || previousItemIndent !== itemToChange.getAttribute("listIndent")) return false;
	const previousItemListAttribute = previousItem.getAttribute(attributeName);
	if (!previousItemListAttribute || previousItemListAttribute === itemToChange.getAttribute(attributeName)) return false;
	return true;
}
/**
* Removes the `listStyle`, `listReversed` and `listStart` attributes from "todo" list items.
*/
function removeListItemAttributesFromTodoList(editor) {
	return (writer) => {
		const todoListItems = getChangedListItems(editor.model.document.differ.getChanges()).filter((item) => {
			return item.getAttribute("listType") === "todo" && (item.hasAttribute("listStyle") || item.hasAttribute("listReversed") || item.hasAttribute("listStart"));
		});
		if (!todoListItems.length) return false;
		for (const item of todoListItems) {
			writer.removeAttribute("listStyle", item);
			writer.removeAttribute("listReversed", item);
			writer.removeAttribute("listStart", item);
		}
		return true;
	};
}
/**
* Restores the `listStyle` attribute after changing the list type.
*/
function restoreDefaultListStyle(editor) {
	return (evt, changedItems) => {
		changedItems = changedItems.filter((item) => item.is("element", "listItem"));
		editor.model.change((writer) => {
			for (const item of changedItems) writer.removeAttribute("listStyle", item);
		});
	};
}
/**
* Returns the `listItem` that was inserted or changed.
*
* @param changes The changes list returned by the differ.
*/
function getChangedListItems(changes) {
	const items = [];
	for (const change of changes) {
		const item = getItemFromChange(change);
		if (item && item.is("element", "listItem")) items.push(item);
	}
	return items;
}
function getItemFromChange(change) {
	if (change.type === "attribute") return change.range.start.nodeAfter;
	if (change.type === "insert") return change.position.nodeAfter;
	return null;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/legacylistproperties
*/
/**
* The legacy list properties feature.
*
* This is a "glue" plugin that loads the {@link module:list/legacylistproperties/legacylistpropertiesediting~LegacyListPropertiesEditing
* legacy list properties editing feature} and the
* {@link module:list/listproperties/listpropertiesui~ListPropertiesUI list properties UI feature}.
*/
var LegacyListProperties = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [LegacyListPropertiesEditing, ListPropertiesUI];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LegacyListProperties";
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
* @module list/legacytodolist/legacychecktodolistcommand
*/
const attributeKey = "todoListChecked";
/**
* The check to-do command.
*
* The command is registered by the {@link module:list/legacytodolist/legacytodolistediting~LegacyTodoListEditing} as
* the `checkTodoList` editor command and it is also available via aliased `todoListCheck` name.
*/
var LegacyCheckTodoListCommand = class extends Command {
	/**
	* A list of to-do list items selected by the {@link module:engine/model/selection~ModelSelection}.
	*
	* @internal
	*/
	_selectedElements;
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		this._selectedElements = [];
		this.on("execute", () => {
			this.refresh();
		}, { priority: "highest" });
	}
	/**
	* Updates the command's {@link #value} and {@link #isEnabled} properties based on the current selection.
	*/
	refresh() {
		this._selectedElements = this._getSelectedItems();
		this.value = this._selectedElements.every((element) => !!element.getAttribute(attributeKey));
		this.isEnabled = !!this._selectedElements.length;
	}
	/**
	* Gets all to-do list items selected by the {@link module:engine/model/selection~ModelSelection}.
	*/
	_getSelectedItems() {
		const model = this.editor.model;
		const schema = model.schema;
		const selectionRange = model.document.selection.getFirstRange();
		const startElement = selectionRange.start.parent;
		const elements = [];
		if (schema.checkAttribute(startElement, attributeKey)) elements.push(startElement);
		for (const item of selectionRange.getItems()) if (schema.checkAttribute(item, attributeKey) && !elements.includes(item)) elements.push(item);
		return elements;
	}
	/**
	* Executes the command.
	*
	* @param options.forceValue If set, it will force the command behavior. If `true`, the command will apply
	* the attribute. Otherwise, the command will remove the attribute. If not set, the command will look for its current
	* value to decide what it should do.
	*/
	execute(options = {}) {
		this.editor.model.change((writer) => {
			for (const element of this._selectedElements) if (options.forceValue === void 0 ? !this.value : options.forceValue) writer.setAttribute(attributeKey, true, element);
			else writer.removeAttribute(attributeKey, element);
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* A model-to-view converter for the `listItem` model element insertion.
*
* It converts the `listItem` model element to an unordered list with a {@link module:engine/view/uielement~ViewUIElement checkbox element}
* at the beginning of each list item. It also merges the list with surrounding lists (if available).
*
* It is used by {@link module:engine/controller/editingcontroller~EditingController}.
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:insert
* @param model Model instance.
* @param onCheckboxChecked Callback function.
* @returns Returns a conversion callback.
*/
function modelViewInsertion(model, onCheckboxChecked) {
	return (evt, data, conversionApi) => {
		const consumable = conversionApi.consumable;
		if (!consumable.test(data.item, "insert") || !consumable.test(data.item, "attribute:listType") || !consumable.test(data.item, "attribute:listIndent")) return;
		if (data.item.getAttribute("listType") != "todo") return;
		const modelItem = data.item;
		consumable.consume(modelItem, "insert");
		consumable.consume(modelItem, "attribute:listType");
		consumable.consume(modelItem, "attribute:listIndent");
		consumable.consume(modelItem, "attribute:todoListChecked");
		const viewWriter = conversionApi.writer;
		const viewItem = generateLiInUl(modelItem, conversionApi);
		const checkmarkElement = createCheckmarkElement(modelItem, viewWriter, !!modelItem.getAttribute("todoListChecked"), onCheckboxChecked);
		const span = viewWriter.createContainerElement("span", { class: "todo-list__label__description" });
		viewWriter.addClass("todo-list", viewItem.parent);
		viewWriter.insert(viewWriter.createPositionAt(viewItem, 0), checkmarkElement);
		viewWriter.insert(viewWriter.createPositionAfter(checkmarkElement), span);
		injectViewList(modelItem, viewItem, conversionApi, model);
	};
}
/**
* A model-to-view converter for the `listItem` model element insertion.
*
* It is used by {@link module:engine/controller/datacontroller~DataController}.
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:insert
* @param model Model instance.
* @returns Returns a conversion callback.
*/
function dataModelViewInsertion(model) {
	return (evt, data, conversionApi) => {
		const consumable = conversionApi.consumable;
		if (!consumable.test(data.item, "insert") || !consumable.test(data.item, "attribute:listType") || !consumable.test(data.item, "attribute:listIndent")) return;
		if (data.item.getAttribute("listType") != "todo") return;
		const modelItem = data.item;
		consumable.consume(modelItem, "insert");
		consumable.consume(modelItem, "attribute:listType");
		consumable.consume(modelItem, "attribute:listIndent");
		consumable.consume(modelItem, "attribute:todoListChecked");
		const viewWriter = conversionApi.writer;
		const viewItem = generateLiInUl(modelItem, conversionApi);
		viewWriter.addClass("todo-list", viewItem.parent);
		const label = viewWriter.createContainerElement("label", { class: "todo-list__label" });
		const checkbox = viewWriter.createEmptyElement("input", {
			type: "checkbox",
			disabled: "disabled"
		});
		const span = viewWriter.createContainerElement("span", { class: "todo-list__label__description" });
		if (modelItem.getAttribute("todoListChecked")) viewWriter.setAttribute("checked", "checked", checkbox);
		viewWriter.insert(viewWriter.createPositionAt(viewItem, 0), label);
		viewWriter.insert(viewWriter.createPositionAt(label, 0), checkbox);
		viewWriter.insert(viewWriter.createPositionAfter(checkbox), span);
		injectViewList(modelItem, viewItem, conversionApi, model);
	};
}
/**
* A view-to-model converter for the checkbox element inside a view list item.
*
* It changes the `listType` of the model `listItem` to a `todo` value.
* When a view checkbox element is marked as checked, an additional `todoListChecked="true"` attribute is added to the model item.
*
* It is used by {@link module:engine/controller/datacontroller~DataController}.
*
* @internal
* @see module:engine/conversion/upcastdispatcher~UpcastDispatcher#event:element
*/
const dataViewModelCheckmarkInsertion = (evt, data, conversionApi) => {
	const modelCursor = data.modelCursor;
	const modelItem = modelCursor.parent;
	const viewItem = data.viewItem;
	if (viewItem.getAttribute("type") != "checkbox" || modelItem.name != "listItem" || !modelCursor.isAtStart) return;
	if (!conversionApi.consumable.consume(viewItem, { name: true })) return;
	const writer = conversionApi.writer;
	writer.setAttribute("listType", "todo", modelItem);
	if (data.viewItem.hasAttribute("checked")) writer.setAttribute("todoListChecked", true, modelItem);
	data.modelRange = writer.createRange(modelCursor);
};
/**
* A model-to-view converter for the `listType` attribute change on the `listItem` model element.
*
* This change means that the `<li>` element parent changes to `<ul class="todo-list">` and a
* {@link module:engine/view/uielement~ViewUIElement checkbox UI element} is added at the beginning
* of the list item element (or vice versa).
*
* This converter is preceded by {@link module:list/legacylist/legacyconverters~modelViewChangeType} and followed by
* {@link module:list/legacylist/legacyconverters~modelViewMergeAfterChangeType} to handle splitting and merging surrounding lists
* of the same type.
*
* It is used by {@link module:engine/controller/editingcontroller~EditingController}.
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:attribute
* @param onCheckedChange Callback fired after clicking the checkbox UI element.
* @param view Editing view controller.
* @returns Returns a conversion callback.
*/
function modelViewChangeType(onCheckedChange, view) {
	return (evt, data, conversionApi) => {
		if (!conversionApi.consumable.consume(data.item, evt.name)) return;
		const viewItem = conversionApi.mapper.toViewElement(data.item);
		const viewWriter = conversionApi.writer;
		const labelElement = findLabel(viewItem, view);
		if (data.attributeNewValue == "todo") {
			const isChecked = !!data.item.getAttribute("todoListChecked");
			const checkmarkElement = createCheckmarkElement(data.item, viewWriter, isChecked, onCheckedChange);
			const span = viewWriter.createContainerElement("span", { class: "todo-list__label__description" });
			const itemRange = viewWriter.createRangeIn(viewItem);
			const nestedList = findNestedList(viewItem);
			const descriptionStart = positionAfterUiElements(itemRange.start);
			const descriptionEnd = nestedList ? viewWriter.createPositionBefore(nestedList) : itemRange.end;
			const descriptionRange = viewWriter.createRange(descriptionStart, descriptionEnd);
			viewWriter.addClass("todo-list", viewItem.parent);
			viewWriter.move(descriptionRange, viewWriter.createPositionAt(span, 0));
			viewWriter.insert(viewWriter.createPositionAt(viewItem, 0), checkmarkElement);
			viewWriter.insert(viewWriter.createPositionAfter(checkmarkElement), span);
		} else if (data.attributeOldValue == "todo") {
			const descriptionSpan = findDescription(viewItem, view);
			viewWriter.removeClass("todo-list", viewItem.parent);
			viewWriter.remove(labelElement);
			viewWriter.move(viewWriter.createRangeIn(descriptionSpan), viewWriter.createPositionBefore(descriptionSpan));
			viewWriter.remove(descriptionSpan);
		}
	};
}
/**
* A model-to-view converter for the `todoListChecked` attribute change on the `listItem` model element.
*
* It marks the {@link module:engine/view/uielement~ViewUIElement checkbox UI element} as checked.
*
* It is used by {@link module:engine/controller/editingcontroller~EditingController}.
*
* @internal
* @see module:engine/conversion/downcastdispatcher~DowncastDispatcher#event:attribute
* @param onCheckedChange Callback fired after clicking the checkbox UI element.
* @returns Returns a conversion callback.
*/
function modelViewChangeChecked(onCheckedChange) {
	return (evt, data, conversionApi) => {
		if (data.item.getAttribute("listType") != "todo") return;
		if (!conversionApi.consumable.consume(data.item, "attribute:todoListChecked")) return;
		const { mapper, writer: viewWriter } = conversionApi;
		const isChecked = !!data.item.getAttribute("todoListChecked");
		const oldCheckmarkElement = mapper.toViewElement(data.item).getChild(0);
		const newCheckmarkElement = createCheckmarkElement(data.item, viewWriter, isChecked, onCheckedChange);
		viewWriter.insert(viewWriter.createPositionAfter(oldCheckmarkElement), newCheckmarkElement);
		viewWriter.remove(oldCheckmarkElement);
	};
}
/**
* A model-to-view position at zero offset mapper.
*
* This helper ensures that position inside todo-list in the view is mapped after the checkbox.
*
* It only handles the position at the beginning of a list item as other positions are properly mapped be the default mapper.
*
* @internal
*/
function mapModelToViewPosition(view) {
	return (evt, data) => {
		const modelPosition = data.modelPosition;
		const parent = modelPosition.parent;
		if (!parent.is("element", "listItem") || parent.getAttribute("listType") != "todo") return;
		const descSpan = findDescription(data.mapper.toViewElement(parent), view);
		if (descSpan) data.viewPosition = data.mapper.findPositionIn(descSpan, modelPosition.offset);
	};
}
/**
* Creates a checkbox UI element.
*/
function createCheckmarkElement(modelItem, viewWriter, isChecked, onChange) {
	return viewWriter.createUIElement("label", {
		class: "todo-list__label",
		contenteditable: false
	}, function(domDocument) {
		const checkbox = createElement(document, "input", {
			type: "checkbox",
			tabindex: "-1"
		});
		if (isChecked) checkbox.setAttribute("checked", "checked");
		checkbox.addEventListener("change", () => onChange(modelItem));
		const domElement = this.toDomElement(domDocument);
		domElement.appendChild(checkbox);
		return domElement;
	});
}
function findLabel(viewItem, view) {
	const range = view.createRangeIn(viewItem);
	for (const value of range) if (value.item.is("uiElement", "label")) return value.item;
}
function findDescription(viewItem, view) {
	const range = view.createRangeIn(viewItem);
	for (const value of range) if (value.item.is("containerElement", "span") && value.item.hasClass("todo-list__label__description")) return value.item;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
const ITEM_TOGGLE_KEYSTROKE = /* #__PURE__ */ parseKeystroke("Ctrl+Enter");
/**
* The engine of the to-do list feature. It handles creating, editing and removing to-do lists and their items.
*
* It registers the entire functionality of the {@link module:list/legacylist/legacylistediting~LegacyListEditing legacy list editing
* plugin} and extends it with the commands:
*
* - `'todoList'`,
* - `'checkTodoList'`,
* - `'todoListCheck'` as an alias for `checkTodoList` command.
*/
var LegacyTodoListEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LegacyTodoListEditing";
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
		return [LegacyListEditing];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const { editing, data, model } = editor;
		model.schema.extend("listItem", { allowAttributes: ["todoListChecked"] });
		model.schema.addAttributeCheck((context, attributeName) => {
			const item = context.last;
			if (attributeName == "todoListChecked" && item.name == "listItem" && item.getAttribute("listType") != "todo") return false;
		});
		editor.commands.add("todoList", new LegacyListCommand(editor, "todo"));
		const checkTodoListCommand = new LegacyCheckTodoListCommand(editor);
		editor.commands.add("checkTodoList", checkTodoListCommand);
		editor.commands.add("todoListCheck", checkTodoListCommand);
		data.downcastDispatcher.on("insert:listItem", dataModelViewInsertion(model), { priority: "high" });
		data.upcastDispatcher.on("element:input", dataViewModelCheckmarkInsertion, { priority: "high" });
		editing.downcastDispatcher.on("insert:listItem", modelViewInsertion(model, (listItem) => this._handleCheckmarkChange(listItem)), { priority: "high" });
		editing.downcastDispatcher.on("attribute:listType:listItem", modelViewChangeType((listItem) => this._handleCheckmarkChange(listItem), editing.view));
		editing.downcastDispatcher.on("attribute:todoListChecked:listItem", modelViewChangeChecked((listItem) => this._handleCheckmarkChange(listItem)));
		editing.mapper.on("modelToViewPosition", mapModelToViewPosition(editing.view));
		data.mapper.on("modelToViewPosition", mapModelToViewPosition(editing.view));
		this.listenTo(editing.view.document, "arrowKey", jumpOverCheckmarkOnSideArrowKeyPress(model, editor.locale), { context: "li" });
		this.listenTo(editing.view.document, "keydown", (evt, data) => {
			if (getCode(data) === ITEM_TOGGLE_KEYSTROKE) {
				editor.execute("checkTodoList");
				evt.stop();
			}
		}, { priority: "high" });
		const listItemsToFix = /* @__PURE__ */ new Set();
		this.listenTo(model, "applyOperation", (evt, args) => {
			const operation = args[0];
			if (operation.type == "rename" && operation.oldName == "listItem") {
				const item = operation.position.nodeAfter;
				if (item.hasAttribute("todoListChecked")) listItemsToFix.add(item);
			} else if (operation.type == "changeAttribute" && operation.key == "listType" && operation.oldValue === "todo") {
				for (const item of operation.range.getItems()) if (item.hasAttribute("todoListChecked") && item.getAttribute("listType") !== "todo") listItemsToFix.add(item);
			}
		});
		model.document.registerPostFixer((writer) => {
			let hasChanged = false;
			for (const listItem of listItemsToFix) {
				writer.removeAttribute("todoListChecked", listItem);
				hasChanged = true;
			}
			listItemsToFix.clear();
			return hasChanged;
		});
		this._initAriaAnnouncements();
	}
	/**
	* Handles the checkbox element change, moves the selection to the corresponding model item to make it possible
	* to toggle the `todoListChecked` attribute using the command, and restores the selection position.
	*
	* Some say it's a hack :) Moving the selection only for executing the command on a certain node and restoring it after,
	* is not a clear solution. We need to design an API for using commands beyond the selection range.
	* See https://github.com/ckeditor/ckeditor5/issues/1954.
	*/
	_handleCheckmarkChange(listItem) {
		const editor = this.editor;
		const model = editor.model;
		const previousSelectionRanges = Array.from(model.document.selection.getRanges());
		model.change((writer) => {
			writer.setSelection(listItem, "end");
			editor.execute("checkTodoList");
			writer.setSelection(previousSelectionRanges);
		});
	}
	/**
	* Observe when user enters or leaves todo list and set proper aria value in global live announcer.
	* This allows screen readers to indicate when the user has entered and left the specified todo list.
	*
	* @internal
	*/
	_initAriaAnnouncements() {
		const { model, ui, t } = this.editor;
		let lastFocusedCodeBlock = null;
		if (!ui) return;
		model.document.selection.on("change:range", () => {
			const focusParent = model.document.selection.focus.parent;
			const lastElementIsTodoList = isLegacyTodoListItemElement(lastFocusedCodeBlock);
			const currentElementIsTodoList = isLegacyTodoListItemElement(focusParent);
			if (lastElementIsTodoList && !currentElementIsTodoList) ui.ariaLiveAnnouncer.announce(t("Leaving a to-do list"));
			else if (!lastElementIsTodoList && currentElementIsTodoList) ui.ariaLiveAnnouncer.announce(t("Entering a to-do list"));
			lastFocusedCodeBlock = focusParent;
		});
	}
};
/**
* Handles the left/right (LTR/RTL content) arrow key and moves the selection at the end of the previous block element
* if the selection is just after the checkbox element. In other words, it jumps over the checkbox element when
* moving the selection to the left/right (LTR/RTL).
*
* @returns Callback for 'keydown' events.
*/
function jumpOverCheckmarkOnSideArrowKeyPress(model, locale) {
	return (eventInfo, domEventData) => {
		if (getLocalizedArrowKeyCodeDirection(domEventData.keyCode, locale.contentLanguageDirection) != "left") return;
		const schema = model.schema;
		const selection = model.document.selection;
		if (!selection.isCollapsed) return;
		const position = selection.getFirstPosition();
		const parent = position.parent;
		if (parent.name === "listItem" && parent.getAttribute("listType") == "todo" && position.isAtStart) {
			const newRange = schema.getNearestSelectionRange(model.createPositionBefore(parent), "backward");
			if (newRange) model.change((writer) => writer.setSelection(newRange));
			domEventData.preventDefault();
			domEventData.stopPropagation();
			eventInfo.stop();
		}
	};
}
/**
* Returns true if the given element is a list item model element of a to-do list.
*/
function isLegacyTodoListItemElement(element) {
	return !!element && element.is("element", "listItem") && element.getAttribute("listType") === "todo";
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/legacytodolist
*/
/**
* The legacy to-do list feature.
*
* This is a "glue" plugin that loads the {@link module:list/legacytodolist/legacytodolistediting~LegacyTodoListEditing legacy to-do list
* editing feature} and the {@link module:list/todolist/todolistui~TodoListUI to-do list UI feature}.
*/
var LegacyTodoList = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [LegacyTodoListEditing, TodoListUI];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LegacyTodoList";
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
var AdjacentListsSupport = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "AdjacentListsSupport";
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
		editor.model.schema.register("listSeparator", {
			allowWhere: "$block",
			isBlock: true
		});
		editor.conversion.for("upcast").add((dispatcher) => {
			dispatcher.on("element:ol", listSeparatorUpcastConverter());
			dispatcher.on("element:ul", listSeparatorUpcastConverter());
		}).elementToElement({
			model: "listSeparator",
			view: "ck-list-separator"
		});
		editor.conversion.for("editingDowncast").elementToElement({
			model: "listSeparator",
			view: {
				name: "div",
				classes: ["ck-list-separator", "ck-hidden"]
			}
		});
		editor.conversion.for("dataDowncast").elementToElement({
			model: "listSeparator",
			view: (modelElement, conversionApi) => {
				const viewElement = conversionApi.writer.createContainerElement("ck-list-separator");
				conversionApi.writer.setCustomProperty("dataPipeline:transparentRendering", true, viewElement);
				viewElement.getFillerOffset = () => null;
				return viewElement;
			}
		});
	}
};
/**
* Inserts a list separator element between two lists of the same type (`ol` + `ol` or `ul` + `ul`).
*/
function listSeparatorUpcastConverter() {
	return (evt, data, conversionApi) => {
		const element = data.viewItem;
		const nextSibling = element.nextSibling;
		if (!nextSibling) return;
		if (element.name !== nextSibling.name) return;
		if (!data.modelRange) Object.assign(data, conversionApi.convertChildren(data.viewItem, data.modelCursor));
		const writer = conversionApi.writer;
		const modelElement = writer.createElement("listSeparator");
		if (!conversionApi.safeInsert(modelElement, data.modelCursor)) return;
		const parts = conversionApi.getSplitParts(modelElement);
		data.modelRange = writer.createRange(data.modelRange.start, writer.createPositionAfter(parts[parts.length - 1]));
		conversionApi.updateConversionResult(modelElement, data);
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { AdjacentListsSupport, CheckTodoListCommand, LegacyCheckTodoListCommand, LegacyIndentCommand, LegacyList, LegacyListCommand, LegacyListEditing, LegacyListProperties, LegacyListPropertiesEditing, LegacyListReversedCommand, LegacyListStartCommand, LegacyListStyleCommand, LegacyListUtils, LegacyTodoList, LegacyTodoListEditing, List, ListCommand, ListEditing, ListFormatting, ListIndentCommand, ListItemBoldIntegration, ListItemFontColorIntegration, ListItemFontFamilyIntegration, ListItemFontSizeIntegration, ListItemItalicIntegration, ListMergeCommand, ListProperties, ListPropertiesEditing, ListPropertiesUI, ListPropertiesUtils, ListReversedCommand, ListSplitCommand, ListStartCommand, ListStyleCommand, ListUI, ListUtils, TodoList, TodoListEditing, TodoListUI, ListBlocksIterable as _ListBlocksIterable, ListItemUid as _ListItemUid, ListPropertiesView as _ListPropertiesView, ListWalker as _ListWalker, SiblingListBlocksIterator as _SiblingListBlocksIterator, TodoCheckboxChangeObserver as _TodoCheckboxChangeObserver, canBecomeSimpleListItem as _canBecomeSimpleListItem, createListElement as _createListElement, createListItemElement as _createListItemElement, createUIComponents as _createListUIComponents, createModelToViewPositionMapper as _createModelToViewListPositionMapper, expandListBlocksToCompleteItems as _expandListBlocksToCompleteItems, expandListBlocksToCompleteList as _expandListBlocksToCompleteList, findAndAddListHeadToMap as _findAndAddListHeadToMap, findMappedViewElement as _findMappedListItemViewElement, fixListIndents as _fixListIndents, fixListItemIds as _fixListItemIds, getAllListItemBlocks as _getAllListItemBlocks, getAllSupportedStyleTypes as _getAllSupportedListStyleTypes, getIndent as _getListIndent, getListItemBlocks as _getListItemBlocks, getListItems as _getListItems, getListStyleTypeFromTypeAttribute as _getListStyleTypeFromTypeAttribute, getListTypeFromListStyleType as _getListTypeFromListStyleType, getNestedListBlocks as _getNestedListBlocks, getNormalizedConfig as _getNormalizedListConfig, getSelectedBlockObject as _getSelectedBlockObject, getTypeAttributeFromListStyleType as _getTypeAttributeFromListStyleType, getViewElementIdForListType as _getViewElementIdForListType, getViewElementNameForListType as _getViewElementNameForListType, indentBlocks as _indentListBlocks, isFirstBlockOfListItem as _isFirstBlockOfListItem, isLastBlockOfListItem as _isLastBlockOfListItem, isListItemBlock as _isListItemBlock, isListItemView as _isListItemView, isListView as _isListView, isNumberedListType as _isNumberedListType, isSingleListItem as _isSingleListItem, bogusParagraphCreator as _listItemBogusParagraphCreator, listItemDowncastConverter as _listItemDowncastConverter, listItemDowncastRemoveConverter as _listItemDowncastRemoveConverter, listItemUpcastConverter as _listItemUpcastConverter, listPropertiesUpcastConverter as _listPropertiesUpcastConverter, mergeListItemBefore as _mergeListItemBefore, normalizeListStyle as _normalizeListStyle, outdentFollowingItems as _outdentFollowingListItems, outdentBlocksWithMerge as _outdentListBlocksWithMerge, reconvertItemsOnDataChange as _reconvertListItemsOnDataChange, removeListAttributes as _removeListAttributes, sortBlocks as _sortListBlocks, splitListItemBefore as _splitListItemBefore };
//# sourceMappingURL=index.js.map