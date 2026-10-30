/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module page-break/pagebreakcommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
/**
* The page break command.
*
* The command is registered by {@link module:page-break/pagebreakediting~PageBreakEditing} as `'pageBreak'`.
*
* To insert a page break at the current selection, execute the command:
*
*		editor.execute( 'pageBreak' );
*/
export declare class PageBreakCommand extends Command {
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
