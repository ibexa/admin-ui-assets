/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/imageresize/utils/getselectedimageeditornodes
*/
import type { ViewElement, ModelElement } from "@ckeditor/ckeditor5-engine";
import type { Editor } from "@ckeditor/ckeditor5-core";
/**
* Finds model, view and DOM element for selected image element. Returns `null` if there is no image selected.
*
* @param editor Editor instance.
* @internal
*/
export declare function getSelectedImageEditorNodes(editor: Editor): ImageEditorNodes | null;
/**
* @internal;
*/
type ImageEditorNodes = {
	model: ModelElement;
	view: ViewElement;
	dom: HTMLElement;
};
export {};
