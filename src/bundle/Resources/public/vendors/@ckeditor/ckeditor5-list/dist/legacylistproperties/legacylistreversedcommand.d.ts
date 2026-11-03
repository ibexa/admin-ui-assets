/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/legacylistproperties/legacylistreversedcommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
/**
* The reversed list command. It changes the `listReversed` attribute of the selected list items. As a result, the list order will be
* reversed.
* It is used by the {@link module:list/legacylistproperties~LegacyListProperties legacy list properties feature}.
*/
export declare class LegacyListReversedCommand extends Command {
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
	*
	* @returns The current value.
	*/
	private _getValue;
}
