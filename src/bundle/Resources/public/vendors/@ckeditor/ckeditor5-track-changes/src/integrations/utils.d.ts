/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { Editor } from 'ckeditor5/src/core.js';
import type { Range, Model, DowncastAddMarkerEvent } from 'ckeditor5/src/engine.js';
import type { GetCallback } from 'ckeditor5/src/utils.js';
/**
 * Searches given `range` and returns all sub-ranges containing items with given `attributeKey`.
 */
export declare function getRangesWithAttribute(attributeKey: string, range: Range, model: Model): Array<Range>;
/**
 * Returns the conversion function for down-casting split/merge markers.
 */
export declare function downcastSplitMergeMarker(editor: Editor, type: 'split' | 'merge', { showActiveMarker }?: {
    showActiveMarker?: boolean | undefined;
}): GetCallback<DowncastAddMarkerEvent>;
