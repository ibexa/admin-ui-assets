/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module code-block/codeblockediting
*/
import { Plugin, type Editor, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ShiftEnter } from "@ckeditor/ckeditor5-enter";
/**
* The editing part of the code block feature.
*
* Introduces the `'codeBlock'` command and the `'codeBlock'` model element.
*/
export declare class CodeBlockEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "CodeBlockEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ShiftEnter]>;
	/**
	* @inheritDoc
	*/
	constructor(editor: Editor);
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* @inheritDoc
	*/
	afterInit(): void;
	/**
	* Observe when user enters or leaves code block and set proper aria value in global live announcer.
	* This allows screen readers to indicate when the user has entered and left the specified code block.
	*
	* @internal
	*/
	private _initAriaAnnouncements;
}
