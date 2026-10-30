/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/imageresize/imagecustomresizeui
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ContextualBalloon } from "@ckeditor/ckeditor5-ui";
/**
* The custom resize image UI plugin.
*
* The plugin uses the {@link module:ui/panel/balloon/contextualballoon~ContextualBalloon}.
*/
export declare class ImageCustomResizeUI extends Plugin {
	/**
	* The contextual balloon plugin instance.
	*/
	private _balloon?;
	/**
	* A form containing a textarea and buttons, used to change the `alt` text value.
	*/
	private _form?;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ContextualBalloon]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ImageCustomResizeUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	override destroy(): void;
	/**
	* Creates the {@link module:image/imageresize/ui/imagecustomresizeformview~ImageCustomResizeFormView}
	* form.
	*/
	private _createForm;
	/**
	* Shows the {@link #_form} in the {@link #_balloon}.
	*
	* @internal
	*/
	_showForm(unit: string): void;
	/**
	* Removes the {@link #_form} from the {@link #_balloon}.
	*
	* @param focusEditable Controls whether the editing view is focused afterwards.
	*/
	private _hideForm;
	/**
	* Returns `true` when the {@link #_form} is the visible view in the {@link #_balloon}.
	*/
	private get _isVisible();
	/**
	* Returns `true` when the {@link #_form} is in the {@link #_balloon}.
	*/
	private get _isInBalloon();
}
