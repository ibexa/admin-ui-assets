/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/utils/getselectedmediaembededitornodes
*/
import type { ViewElement, ModelElement } from "@ckeditor/ckeditor5-engine";
import type { Editor } from "@ckeditor/ckeditor5-core";
/**
* Finds model, view and DOM element for selected media embed element.
* Returns `null` if there is no media embed selected.
*
* @param editor Editor instance.
* @internal
*/
export declare function getSelectedMediaEmbedEditorNodes(editor: Editor): MediaEmbedEditorNodes | null;
type MediaEmbedEditorNodes = {
	model: ModelElement;
	view: ViewElement;
	dom: HTMLElement;
};
export {};
