/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/unlinkcommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
/**
* The unlink command. It is used by the {@link module:link/link~Link link plugin}.
*/
export declare class UnlinkCommand extends Command {
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Executes the command.
	*
	* When the selection is collapsed, it removes the `linkHref` attribute from each node with the same `linkHref` attribute value.
	* When the selection is non-collapsed, it removes the `linkHref` attribute from each node in selected ranges.
	*
	* # Decorators
	*
	* If {@link module:link/linkconfig~LinkConfig#decorators `config.link.decorators`} is specified,
	* all configured decorators are removed together with the `linkHref` attribute.
	*
	* @fires execute
	*/
	override execute(): void;
}
