/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/imagestyle/imagestylecommand
*/
import type { ModelElement } from "@ckeditor/ckeditor5-engine";
import { Command, type Editor } from "@ckeditor/ckeditor5-core";
import type { ImageStyleOptionDefinition } from "../imageconfig.js";
/**
* The image style command. It is used to apply {@link module:image/imageconfig~ImageStyleConfig#options image style option}
* to a selected image.
*
* **Note**: Executing this command may change the image model element if the desired style requires an image of a different
* type. See {@link module:image/imagestyle/imagestylecommand~ImageStyleCommand#execute} to learn more.
*/
export declare class ImageStyleCommand extends Command {
	/**
	* An object containing names of default style options for the inline and block images.
	* If there is no default style option for the given image type in the configuration,
	* the name will be `false`.
	*/
	private _defaultStyles;
	/**
	* The styles handled by this command.
	*/
	private _styles;
	/**
	* Creates an instance of the image style command. When executed, the command applies one of
	* {@link module:image/imageconfig~ImageStyleConfig#options style options} to the currently selected image.
	*
	* @param editor The editor instance.
	* @param styles The style options that this command supports.
	*/
	constructor(editor: Editor, styles: Array<ImageStyleOptionDefinition>);
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Returns whether the style with the given name can be applied to the currently selected image.
	*
	* Applying a style may internally trigger a type conversion (block ↔ inline) when the style
	* supports only the opposite type. If that conversion would be rejected by the schema (for
	* example, converting an inline image to a block image inside `$inlineRoot`), this style
	* cannot be applied even though the command itself is enabled. UI components representing
	* individual styles should reflect this per-style state in their `isEnabled`.
	*/
	isStyleEnabled(styleName: string): boolean;
	/**
	* Executes the command and applies the style to the currently selected image:
	*
	* ```ts
	* editor.execute( 'imageStyle', { value: 'side' } );
	* ```
	*
	* **Note**: Executing this command may change the image model element if the desired style requires an image
	* of a different type. Learn more about {@link module:image/imageconfig~ImageStyleOptionDefinition#modelElements model element}
	* configuration for the style option.
	*
	* @param options.value The name of the style (as configured in {@link module:image/imageconfig~ImageStyleConfig#options}).
	* @param options.setImageSizes Specifies whether the image `width` and `height` attributes should be set automatically.
	* The default is `true`.
	* @fires execute
	*/
	override execute(options?: {
		value?: string;
		setImageSizes?: boolean;
	}): void;
	/**
	* Returns `true` if requested style change would trigger the image type change.
	*
	* @param requestedStyle The name of the style (as configured in {@link module:image/imageconfig~ImageStyleConfig#options}).
	* @param imageElement The image model element.
	*/
	shouldConvertImageType(requestedStyle: string, imageElement: ModelElement): boolean;
}
