/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module ui/model
*/
import { type ObservableMixinConstructor } from "@ckeditor/ckeditor5-utils";
declare const UIModelBase: ObservableMixinConstructor;
/**
* The base MVC model class.
*/
export declare class UIModel extends UIModelBase {
	[x: string]: unknown;
	/**
	* Creates a new Model instance.
	*
	* @param attributes The model state attributes to be defined during the instance creation.
	* @param properties The (out of state) properties to be appended to the instance during creation.
	*/
	constructor(attributes?: Record<string, unknown>, properties?: Record<string, unknown>);
}
export {};
