/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/emojicommand
*/
import { Command, type Editor } from "@ckeditor/ckeditor5-core";
/**
* Command that shows the emoji user interface.
*/
export declare class EmojiCommand extends Command {
	constructor(editor: Editor);
	/**
	* Updates the command's {@link #isEnabled} based on the current selection
	* and whether the emoji repository has been loaded.
	*/
	override refresh(): void;
	/**
	* Opens emoji user interface for the current document selection.
	*
	* @fires execute
	* @param [searchValue=''] A default query used to filer the grid when opening the UI.
	*/
	override execute(searchValue?: string): void;
}
