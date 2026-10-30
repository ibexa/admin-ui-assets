/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module page-break/pagebreakediting
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The page break editing feature.
*/
export declare class PageBreakEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "PageBreakEditing";
	/**
	* @inheritDoc
	* @internal
	*/
	static get licenseFeatureCode(): string;
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static override get isPremiumPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
