/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module ckbox/ckboximageedit
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { CKBoxImageEditEditing } from "./ckboximageedit/ckboximageeditediting.js";
import { CKBoxImageEditUI } from "./ckboximageedit/ckboximageeditui.js";
/**
* The CKBox image edit feature.
*/
export declare class CKBoxImageEdit extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "CKBoxImageEdit";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[CKBoxImageEditEditing, CKBoxImageEditUI]>;
}
