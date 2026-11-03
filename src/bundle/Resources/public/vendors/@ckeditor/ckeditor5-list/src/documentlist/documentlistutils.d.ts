/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module list/documentlist/documentlistutils
 */
import type { Element, Node } from 'ckeditor5/src/engine';
import type { ArrayOrItem } from 'ckeditor5/src/utils';
import { Plugin } from 'ckeditor5/src/core';
/**
 * A set of helpers related to document lists.
 */
export default class DocumentListUtils extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "DocumentListUtils";
    /**
     * Expands the given list of selected blocks to include all the items of the lists they're in.
     *
     * @param blocks The list of selected blocks.
     */
    expandListBlocksToCompleteList(blocks: ArrayOrItem<Element>): Array<Element>;
    /**
     * Check if the given block is the first in the list item.
     *
     * @param listBlock The list block element.
     */
    isFirstBlockOfListItem(listBlock: Element): boolean;
    /**
     * Returns true if the given model node is a list item block.
     *
     * @param node A model node.
     */
    isListItemBlock(node: Node): boolean;
    /**
     * Expands the given list of selected blocks to include the leading and tailing blocks of partially selected list items.
     *
     * @param blocks The list of selected blocks.
     * @param options.withNested Whether should include nested list items.
     */
    expandListBlocksToCompleteItems(blocks: ArrayOrItem<Element>, options?: {
        withNested?: boolean;
    }): Array<Element>;
}
