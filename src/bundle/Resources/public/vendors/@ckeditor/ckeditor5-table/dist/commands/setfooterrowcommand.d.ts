/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/commands/setfooterrowcommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
/**
* The footer row command.
*
* The command is registered by {@link module:table/tableediting~TableEditing} as the `'setTableFooterRow'` editor command.
*
* You can make the row containing the selected cell a footer by executing:
*
* ```ts
* editor.execute( 'setTableFooterRow' );
* ```
*
* **Note:** All following rows will also become footers. If the current row is already a footer, executing this command
* will make it a regular row back again (including the preceding rows).
*/
export declare class SetFooterRowCommand extends Command {
	/**
	* Flag indicating whether the command is active. The command is active when the
	* {@link module:engine/model/selection~ModelSelection} is in a footer row.
	*
	* @observable
	*/
	value: boolean;
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Executes the command.
	*
	* When the selection is in a non-footer row, the command will set the `footerRows` table attribute to cover that row.
	*
	* When the selection is already in a footer row, it will set `footerRows` so the footer section will start after that row.
	*
	* @fires execute
	* @param options.forceValue If set, the command will set (`true`) or unset (`false`) the footer rows according to
	* the `forceValue` parameter instead of the current model state.
	*/
	override execute(options?: {
		forceValue?: boolean;
	}): void;
	/**
	* Checks if a table cell is in the footer section.
	*/
	private _isInFooter;
}
