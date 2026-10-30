/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-decoupled/decouplededitorui
*/
import { type Editor } from "@ckeditor/ckeditor5-core";
import { EditorUI } from "@ckeditor/ckeditor5-ui";
import { type DecoupledEditorUIView } from "./decouplededitoruiview.js";
/**
* The decoupled editor UI class.
*/
export declare class DecoupledEditorUI extends EditorUI {
	/**
	* The main (top–most) view of the editor UI.
	*/
	readonly view: DecoupledEditorUIView;
	/**
	* Creates an instance of the decoupled editor UI class.
	*
	* @param editor The editor instance.
	* @param view The view of the UI.
	*/
	constructor(editor: Editor, view: DecoupledEditorUIView);
	/**
	* Initializes the UI.
	*/
	init(): void;
	/**
	* @inheritDoc
	*/
	override destroy(): void;
	/**
	* Initializes the inline editor toolbar and its panel.
	*/
	private _initToolbar;
	/**
	* Enable the placeholder text on the editing root.
	*/
	private _initPlaceholder;
}
