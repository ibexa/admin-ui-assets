/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module code-block/indentcodeblockcommand
*/
import { Command, type Editor } from "@ckeditor/ckeditor5-core";
/**
* The code block indentation increase command plugin.
*/
export declare class IndentCodeBlockCommand extends Command {
	/**
	* A sequence of characters added to the line when the command is executed.
	*/
	private _indentSequence;
	constructor(editor: Editor);
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Executes the command. When the command {@link #isEnabled is enabled}, the indentation of the
	* code lines in the selection will be increased.
	*
	* @fires execute
	*/
	override execute(): void;
	/**
	* Checks whether the command can be enabled in the current context.
	*/
	private _checkEnabled;
}
