/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module list/list/utils/postfixers
 */
import type { Element, Position, Writer } from 'ckeditor5/src/engine.js';
import { type ListIteratorValue } from './listwalker.js';
import { type ListElement } from './model.js';
/**
 * Based on the provided positions looks for the list head and stores it in the provided map.
 *
 * @internal
 * @param position The search starting position.
 * @param itemToListHead The map from list item element to the list head element.
 * @param visited A set of elements that were already visited.
 */
export declare function findAndAddListHeadToMap(position: Position, itemToListHead: Set<ListElement>, visited: Set<Element>): void;
/**
 * Scans the list starting from the given list head element and fixes items' indentation.
 *
 * @internal
 * @param listNodes The iterable of list nodes.
 * @param writer The model writer.
 * @returns Whether the model was modified.
 */
export declare function fixListIndents(listNodes: Iterable<ListIteratorValue>, writer: Writer): boolean;
/**
 * Scans the list starting from the given list head element and fixes items' types.
 *
 * @internal
 * @param listNodes The iterable of list nodes.
 * @param seenIds The set of already known IDs.
 * @param writer The model writer.
 * @returns Whether the model was modified.
 */
export declare function fixListItemIds(listNodes: Iterable<ListIteratorValue>, seenIds: Set<string>, writer: Writer): boolean;
