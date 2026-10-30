/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listproperties/listreversedcommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
/**
* The list reversed command. It changes the `listReversed` attribute of the selected list items,
* letting the user to choose the order of an ordered list.
* It is used by the {@link module:list/listproperties~ListProperties list properties feature}.
*/
export declare class ListReversedCommand extends Command {
	/**
	* @inheritDoc
	*/
	value: boolean | null;
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Executes the command.
	*
	* @fires execute
	* @param options.reversed Whether the list should be reversed.
	*/
	override execute(options?: {
		reversed?: boolean;
	}): void;
	/**
	* Checks the command's {@link #value}.
	*/
	private _getValue;
}
