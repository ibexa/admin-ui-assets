/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module typing/typing
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Input } from "./input.js";
import { Delete } from "./delete.js";
/**
* The typing feature. It handles typing.
*
* This is a "glue" plugin which loads the {@link module:typing/input~Input} and {@link module:typing/delete~Delete}
* plugins.
*/
export declare class Typing extends Plugin {
	static get requires(): PluginDependenciesOf<[Input, Delete]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "Typing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
}
