/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module alignment/alignmentediting
*/
import { Plugin, type Editor } from "@ckeditor/ckeditor5-core";
/**
* The alignment editing feature. It introduces the {@link module:alignment/alignmentcommand~AlignmentCommand command} and adds
* the `alignment` attribute for block elements in the {@link module:engine/model/model~Model model}.
*/
export declare class AlignmentEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "AlignmentEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	constructor(editor: Editor);
	/**
	* @inheritDoc
	*/
	init(): void;
}
