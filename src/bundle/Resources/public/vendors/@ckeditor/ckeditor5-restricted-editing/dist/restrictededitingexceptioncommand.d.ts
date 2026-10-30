/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/restrictededitingexceptioncommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
/**
* The command that toggles exceptions from the restricted editing on text.
*/
export declare class RestrictedEditingExceptionCommand extends Command {
	/**
	* A flag indicating whether the command is active
	*
	* @readonly
	*/
	value: boolean;
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* @inheritDoc
	*/
	override execute(options?: RestrictedEditingExceptionCommandParams): void;
}
export interface RestrictedEditingExceptionCommandParams {
	forceValue?: unknown;
}
