/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedstyle/mediaembedstyleui
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { MediaEmbedStyleEditing } from "./mediaembedstyleediting.js";
/**
* The media embed style UI plugin.
*
* It registers a button for every style in the resolved
* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles`}
* list, and the default split-button dropdowns (`mediaEmbed:wrapText`, `mediaEmbed:breakText`)
* — filtered to the styles that survived configuration. The resulting components can be placed
* in the {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#toolbar media embed toolbar}.
*/
export declare class MediaEmbedStyleUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[MediaEmbedStyleEditing]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "MediaEmbedStyleUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Returns the alignment button definitions sourced from the resolved options list.
	*/
	private _getButtonDefinitions;
	/**
	* Returns the localized titles of the built-in styles and dropdowns.
	*/
	private _getLocalizedTitles;
	/**
	* Returns the split-button dropdown definitions, filtered to the styles present in the
	* resolved options list. Combines the {@link module:media-embed/mediaembedstyle/constants~DEFAULT_DROPDOWN_DEFINITIONS
	* built-in dropdowns} with custom dropdowns declared inline in
	* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#toolbar `config.mediaEmbed.toolbar`}.
	*
	* A dropdown with fewer than two items is skipped — a single-item dropdown carries no value
	* over the flat button. If the configured `defaultItem` was filtered out, the first surviving
	* item becomes the default.
	*
	* When a *custom* dropdown's items reference styles that are not in the resolved options list,
	* a console warning is emitted (the integrator's config was not fully honored). Built-in
	* dropdowns auto-skip silently — they are added by the plugin, not the integrator.
	*/
	private _getDropdownDefinitions;
	/**
	* Scans `config.mediaEmbed.toolbar` for entries shaped like a dropdown definition
	* (objects with both `items` and `defaultItem`) and returns the valid ones. `defaultItem`
	* is the discriminator between our split-button dropdowns and generic toolbar groupings
	* (which use `items` + `label` and have no `defaultItem`).
	*
	* Invalid entries (wrong name prefix, `defaultItem` missing from `items`) are warned and
	* dropped here. Items that reference filtered-out styles are filtered later by
	* {@link #_getDropdownDefinitions}, alongside the same logic that applies to built-in
	* dropdowns.
	*/
	private _collectCustomDropdowns;
	/**
	* Registers a single alignment toggle button in the component factory.
	*/
	private _createButton;
	/**
	* Registers a split-button dropdown grouping a set of alignment buttons. The action button
	* reflects whichever child option is currently `isOn`, falling back to the dropdown's
	* `defaultItem` when nothing is active.
	*/
	private _createDropdown;
}
