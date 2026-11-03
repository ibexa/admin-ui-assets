/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Command } from "@ckeditor/ckeditor5-core";
/**
* The horizontal line command.
*
* The command is registered by {@link module:horizontal-line/horizontallineediting~HorizontalLineEditing} as `'horizontalLine'`.
*
* To insert a horizontal line at the current selection, execute the command:
*
* ```ts
* editor.execute( 'horizontalLine' );
* ```
*/
export declare class HorizontalLineCommand extends Command {
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Executes the command.
	*
	* @fires execute
	*/
	override execute(): void;
}
