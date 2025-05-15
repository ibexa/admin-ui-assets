/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module document-outline/documentoutline/documentoutlineutils
 */
import { Plugin } from 'ckeditor5/src/core.js';
import { type Element } from 'ckeditor5/src/engine.js';
import { diffToChanges } from 'ckeditor5/src/utils.js';
/**
 * Document outline utilities.
 */
export default class DocumentOutlineUtils extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "DocumentOutlineUtils";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * Starts listening for editor events and handles them on the model document `change` event. This means both
     * changes to the structure of the document and changes to the selection are reflected in the outline.
     */
    init(): void;
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
/**
 * The definition of the item in the document outline.
 */
export type OutlineItemDefinition = {
    level: number;
    text: string;
    modelElement: Element;
};
/**
 * Fired whenever the headings structure in the document changes.
 *
 * @eventName ~DocumentOutlineUtils#change
 * @param outlineDefinitions The list of current outline definitions.
 * @param outlineChanges Describes what changes were applied in the headings structure.
 * @param activeItemIndex The index of the active document outline item.
 */
export type OutlineChangeEvent = {
    name: 'change';
    args: [
        {
            outlineDefinitions: Array<OutlineItemDefinition>;
            outlineChanges: ReturnType<typeof diffToChanges<OutlineItemDefinition>>;
            activeItemIndex: number;
        }
    ];
};
/**
 * Fired whenever the active document outline item is changed.
 *
 * @eventName ~DocumentOutlineUtils#activeItemIndex
 * @param activeItemIndex The index of the active document outline item.
 */
export type ActiveOutlineItemChangeEvent = {
    name: 'activeItemIndex';
    args: [{
        index: number;
    }];
};
