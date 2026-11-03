/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/list/utils/model
*/
import type { ModelDocumentFragment, ModelElement, Model, ModelNode, ModelWriter, ModelItem, ModelSchema } from "@ckeditor/ckeditor5-engine";
import { type ArrayOrItem } from "@ckeditor/ckeditor5-utils";
import { type ListWalkerOptions } from "./listwalker.js";
import { type ListType } from "../listediting.js";
/**
* The list item ID generator.
*
* @internal
*/
export declare class ListItemUid {
	/**
	* Returns the next ID.
	*
	* @internal
	*/
	static next(): string;
}
/**
* An {@link module:engine/model/element~ModelElement} that is known to be a list element.
*
* @internal
*/
export interface ListElement extends ModelElement {
	getAttribute(key: "listItemId"): string;
	getAttribute(key: "listIndent"): number;
	getAttribute(key: "listType"): ListType;
	getAttribute(key: string): unknown;
}
/**
* Returns true if the given model node is a list item block.
*
* @internal
*/
export declare function isListItemBlock(node: ModelItem | ModelDocumentFragment | null): node is ListElement;
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
export declare function getAllListItemBlocks(listItem: ModelNode, options?: {
	higherIndent?: boolean;
}): Array<ListElement>;
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
export declare function getListItemBlocks(listItem: ModelNode, options?: {
	direction?: "forward" | "backward";
	higherIndent?: boolean;
}): Array<ListElement>;
/**
* Returns a list items nested inside the given list item.
*
* @internal
*/
export declare function getNestedListBlocks(listItem: ModelElement): Array<ListElement>;
/**
* Returns array of all blocks/items of the same list as given block (same indent, same type and properties).
*
* @internal
* @param listItem Starting list item element.
* @param options Additional list walker options to modify the range of returned list items.
*/
export declare function getListItems(listItem: ModelElement, options?: ListWalkerOptions): Array<ListElement>;
/**
* Check if the given block is the first in the list item.
*
* @internal
* @param listBlock The list block element.
*/
export declare function isFirstBlockOfListItem(listBlock: ModelNode): boolean;
/**
* Check if the given block is the last in the list item.
*
* @internal
*/
export declare function isLastBlockOfListItem(listBlock: ModelElement): boolean;
/**
* Expands the given list of selected blocks to include the leading and tailing blocks of partially selected list items.
*
* @internal
* @param blocks The list of selected blocks.
* @param options.withNested Whether should include nested list items.
*/
export declare function expandListBlocksToCompleteItems(blocks: ArrayOrItem<ModelElement>, options?: {
	withNested?: boolean;
}): Array<ListElement>;
/**
* Expands the given list of selected blocks to include all the items of the lists they're in.
*
* @internal
* @param blocks The list of selected blocks.
*/
export declare function expandListBlocksToCompleteList(blocks: ArrayOrItem<ModelElement>): Array<ListElement>;
/**
* Splits the list item just before the provided list block.
*
* @internal
* @param listBlock The list block element.
* @param writer The model writer.
* @returns The array of updated blocks.
*/
export declare function splitListItemBefore(listBlock: ModelElement, writer: ModelWriter): Array<ListElement>;
/**
* Merges the list item with the parent list item.
*
* @internal
* @param listBlock The list block element.
* @param parentBlock The list block element to merge with.
* @param writer The model writer.
* @returns The array of updated blocks.
*/
export declare function mergeListItemBefore(listBlock: ModelNode, parentBlock: ModelElement, writer: ModelWriter): Array<ListElement>;
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
export declare function indentBlocks(blocks: ArrayOrItem<ListElement>, writer: ModelWriter, { expand, indentBy, attributeNames }: {
	expand?: boolean;
	indentBy?: number;
	attributeNames: Array<string>;
}): Array<ListElement>;
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
export declare function outdentBlocksWithMerge(blocks: ArrayOrItem<ListElement>, writer: ModelWriter, { attributeNames }: {
	attributeNames: Array<string>;
}): Array<ListElement>;
/**
* Removes all list attributes from the given blocks.
*
* @internal
* @param blocks The block or iterable of blocks.
* @param writer The model writer.
* @param attributeNames List of attribute names to remove.
* @returns Array of altered blocks.
*/
export declare function removeListAttributes(blocks: ArrayOrItem<ModelElement>, writer: ModelWriter, attributeNames: Array<string>): Array<ModelElement>;
/**
* Checks whether the given blocks are related to a single list item.
*
* @internal
* @param blocks The list block elements.
*/
export declare function isSingleListItem(blocks: Array<ModelNode>): boolean;
/**
* Modifies the indents of list blocks following the given list block so the indentation is valid after
* the given block is no longer a list item.
*
* @internal
* @param lastBlock The last list block that has become a non-list element.
* @param writer The model writer.
* @returns Array of altered blocks.
*/
export declare function outdentFollowingItems(lastBlock: ModelElement, writer: ModelWriter): Array<ListElement>;
/**
* Returns the array of given blocks sorted by model indexes (document order).
*
* @internal
*/
export declare function sortBlocks<T extends ModelElement>(blocks: Iterable<T>): Array<T>;
/**
* Returns a selected block object. If a selected object is inline or when there is no selected
* object, `null` is returned.
*
* @internal
* @param model The instance of editor model.
* @returns Selected block object or `null`.
*/
export declare function getSelectedBlockObject(model: Model): ModelElement | null;
/**
* Checks whether the given block can be replaced by a listItem.
*
* Note that this is possible only when multiBlock = false option is set in feature config.
*
* @param block A block to be tested.
* @param schema The schema of the document.
* @internal
*/
export declare function canBecomeSimpleListItem(block: ModelElement, schema: ModelSchema): boolean;
/**
* Returns true if listType is of type `numbered` or `customNumbered`.
*
* @internal
*/
export declare function isNumberedListType(listType: ListType): boolean;
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
export declare function isFirstListItemInList(listItem: ModelElement): boolean;
