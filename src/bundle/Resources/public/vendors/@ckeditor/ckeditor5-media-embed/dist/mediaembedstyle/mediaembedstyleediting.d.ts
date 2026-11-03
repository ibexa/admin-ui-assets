/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { MediaEmbedEditing } from "../mediaembedediting.js";
import type { NormalizedMediaStyleOption } from "../mediaembedconfig.js";
/**
* The media embed style engine plugin. It extends the schema with the `mediaStyle` attribute,
* registers the {@link module:media-embed/mediaembedstyle/mediaembedstylecommand~MediaEmbedStyleCommand} command,
* and adds the converters that apply alignment CSS classes to the figure.
*/
export declare class MediaEmbedStyleEditing extends Plugin {
	/**
	* The resolved list of media style options. Built once from
	* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles`}
	* during {@link #init} and consumed by both the command and the UI plugin (single source of truth).
	*
	* @internal
	* @readonly
	*/
	normalizedStyles: Array<NormalizedMediaStyleOption>;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[MediaEmbedEditing]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "MediaEmbedStyleEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Registers the downcast and upcast converters for the `mediaStyle` attribute.
	*/
	private _registerConverters;
}
