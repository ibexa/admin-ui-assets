/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/image/converters
*/
import { type DowncastDispatcher, type UpcastDispatcher } from "@ckeditor/ckeditor5-engine";
import { type ImageUtils } from "../imageutils.js";
/**
* Returns a function that converts the image view representation:
*
* ```html
* <figure class="image"><img src="..." alt="..."></img></figure>
* ```
*
* to the model representation:
*
* ```html
* <imageBlock src="..." alt="..."></imageBlock>
* ```
*
* The entire content of the `<figure>` element except the first `<img>` is being converted as children
* of the `<imageBlock>` model element.
*
* @internal
*/
export declare function upcastImageFigure(imageUtils: ImageUtils): (dispatcher: UpcastDispatcher) => void;
/**
* Returns a function that upcasts an `<img>` element to either an `imageBlock` or an `imageInline` model element.
*
* The image type is first determined from the view structure (see {@link module:image/image/utils~getViewImageType}):
* an `<img>` wrapped in a `<figure class="image">` or styled with `display: block` becomes an `imageBlock`, otherwise
* an `imageInline`.
*
* That structural type is then verified against the schema at the insertion position. If it cannot be placed there -
* neither directly (or after hoisting to an allowed ancestor) nor wrapped in an auto-created paragraph - the converter
* falls back to `matchImageType`. This is what allows a block image to degrade to an inline image inside an inline root
* (and, symmetrically, an inline image to become a block image in a context that only accepts block images) instead of
* being dropped.
*
* Both `ImageBlockEditing` and `ImageInlineEditing` register this converter, each passing the type it falls back to.
* When only one of them is loaded, that single type is always produced.
*
* @internal
* @param matchImageType The image type to fall back to when the type resolved from the view cannot be placed at the
* insertion position.
* @param imageUtils The `ImageUtils` plugin instance.
*/
export declare function upcastImg(matchImageType: "imageBlock" | "imageInline", imageUtils: ImageUtils): (dispatcher: UpcastDispatcher) => void;
/**
* Returns a function that converts the image view representation:
*
* ```html
* <picture><source ... /><source ... />...<img ... /></picture>
* ```
*
* to the model representation as the `sources` attribute:
*
* ```html
* <image[Block|Inline] ... sources="..."></image[Block|Inline]>
* ```
*
* @internal
*/
export declare function upcastPicture(imageUtils: ImageUtils): (dispatcher: UpcastDispatcher) => void;
/**
* Converter used to convert the `srcset` model image attribute to the `srcset` and `sizes` attributes in the view.
*
* @internal
* @param imageType The type of the image.
*/
export declare function downcastSrcsetAttribute(imageUtils: ImageUtils, imageType: "imageBlock" | "imageInline"): (dispatcher: DowncastDispatcher) => void;
/**
* Converts the `source` model attribute to the `<picture><source /><source />...<img /></picture>`
* view structure.
*
* @internal
*/
export declare function downcastSourcesAttribute(imageUtils: ImageUtils): (dispatcher: DowncastDispatcher) => void;
/**
* Converter used to convert a given image attribute from the model to the view.
*
* @internal
* @param imageType The type of the image.
* @param attributeKey The name of the attribute to convert.
*/
export declare function downcastImageAttribute(imageUtils: ImageUtils, imageType: "imageBlock" | "imageInline", attributeKey: string): (dispatcher: DowncastDispatcher) => void;
