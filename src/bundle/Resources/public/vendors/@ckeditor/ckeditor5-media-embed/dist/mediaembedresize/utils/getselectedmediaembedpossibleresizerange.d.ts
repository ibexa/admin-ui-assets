/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/utils/getselectedmediaembedpossibleresizerange
*/
import type { Editor } from "@ckeditor/ckeditor5-core";
/**
* Returns the min and max resize values for the selected media embed in the specified unit.
*
* @param editor Editor instance.
* @param targetUnit Unit in which dimension will be returned.
* @returns Possible resize range in numeric form.
* @internal
*/
export declare function getSelectedMediaEmbedPossibleResizeRange(editor: Editor, targetUnit: string): PossibleResizeMediaEmbedRange | null;
/**
* @internal
*/
export type PossibleResizeMediaEmbedRange = {
	unit: string;
	lower: number;
	upper: number;
};
