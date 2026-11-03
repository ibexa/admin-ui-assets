/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { WidgetResize } from "@ckeditor/ckeditor5-widget";
/**
* The media embed resize by handles feature.
*
* It adds the ability to resize each media embed using handles.
*/
export declare class MediaEmbedResizeHandles extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[WidgetResize]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "MediaEmbedResizeHandles";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Attaches a resizer to every newly inserted media widget. Walks only the ranges
	* reported by the differ — never the whole document — so unrelated inserts (e.g.
	* pressing Enter to create a paragraph) cost only the differ check.
	*
	* Each resizer's `isEnabled` is bound to the plugin in {@link #_attachResizer},
	* so it auto-tracks the resize command's state.
	*/
	private _setupResizerCreator;
	/**
	* Attaches a resizer to a single media widget.
	*/
	private _attachResizer;
}
