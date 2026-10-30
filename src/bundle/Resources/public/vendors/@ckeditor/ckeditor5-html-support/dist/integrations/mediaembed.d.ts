/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module html-support/integrations/mediaembed
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { DataFilter } from "../datafilter.js";
/**
* Provides the General HTML Support integration with {@link module:media-embed/mediaembed~MediaEmbed Media Embed} feature.
*/
export declare class MediaEmbedElementSupport extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[DataFilter]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "MediaEmbedElementSupport";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
