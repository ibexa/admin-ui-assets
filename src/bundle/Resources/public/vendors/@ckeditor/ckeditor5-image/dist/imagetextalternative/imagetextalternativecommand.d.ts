/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/imagetextalternative/imagetextalternativecommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
/**
* The image text alternative command. It is used to change the `alt` attribute of `<imageBlock>` and `<imageInline>` model elements.
*/
export declare class ImageTextAlternativeCommand extends Command {
	/**
	* The command value: `false` if there is no `alt` attribute, otherwise the value of the `alt` attribute.
	*
	* @readonly
	* @observable
	*/
	value: string | false;
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Executes the command.
	*
	* @fires execute
	* @param options
	* @param options.newValue The new value of the `alt` attribute to set.
	*/
	override execute(options: {
		newValue: string;
	}): void;
}
