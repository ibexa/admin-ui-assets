/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/utils/getselectedmediaembedwidthinunits
*/
import { type _DimensionWithUnit } from "@ckeditor/ckeditor5-utils";
import type { Editor } from "@ckeditor/ckeditor5-core";
/**
* Returns media embed width in specified units after resize.
*
* 	* If no media embed is selected or command is disabled, `null` will be returned.
*	* If `targetUnit` percentage is passed then it will return width percentage relative to its ancestor.
*
* @param editor Editor instance.
* @param targetUnit Unit in which dimension will be returned.
* @returns Parsed media embed width after resize (with unit).
* @internal
*/
export declare function getSelectedMediaEmbedWidthInUnits(editor: Editor, targetUnit: string): _DimensionWithUnit | null;
