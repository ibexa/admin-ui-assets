/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module ckfinder/ckfinderediting
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { LinkEditing } from "@ckeditor/ckeditor5-link";
import { Notification } from "@ckeditor/ckeditor5-ui";
/**
* The CKFinder editing feature. It introduces the {@link module:ckfinder/ckfindercommand~CKFinderCommand CKFinder command}.
*/
export declare class CKFinderEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "CKFinderEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[Notification, LinkEditing]>;
	/**
	* @inheritDoc
	*/
	init(): void;
}
