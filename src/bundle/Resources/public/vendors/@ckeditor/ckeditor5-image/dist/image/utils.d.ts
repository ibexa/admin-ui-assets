/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/image/utils
*/
import { type ModelDocumentSelection, type MatcherPattern, type ModelPosition, type ModelSchema, type ModelSelection, type ViewContainerElement, type ViewDowncastWriter, type ViewElement } from "@ckeditor/ckeditor5-engine";
import type { Editor } from "@ckeditor/ckeditor5-core";
import { type ImageUtils } from "../imageutils.js";
/**
* Creates a view element representing the inline image.
*
* ```html
* <span class="image-inline"><img></img></span>
* ```
*
* Note that `alt` and `src` attributes are converted separately, so they are not included.
*
* @internal
*/
export declare function createInlineImageViewElement(writer: ViewDowncastWriter): ViewContainerElement;
/**
* Creates a view element representing the block image.
*
* ```html
* <figure class="image"><img></img></figure>
* ```
*
* Note that `alt` and `src` attributes are converted separately, so they are not included.
*
* @internal
*/
export declare function createBlockImageViewElement(writer: ViewDowncastWriter): ViewContainerElement;
/**
* A function returning a `MatcherPattern` for a particular type of View images.
*
* @deprecated
* @internal
* @param matchImageType The type of created image.
*/
export declare function getImgViewElementMatcher(editor: Editor, matchImageType: "imageBlock" | "imageInline"): MatcherPattern;
/**
* Resolves the model image type (`'imageBlock'` or `'imageInline'`) that a given `<img>` view element represents,
* based purely on its view structure.
*
* An `<img>` is treated as a block image when it has a `display: block` style or is wrapped in a block image figure
* (`<figure class="image">`, also `<figure class="image"><a>...</a></figure>` added by the `LinkImage` plugin).
* Otherwise it is treated as an inline image.
*
* Note that this only reflects the view representation - it does not check whether the resolved type is allowed by the
* schema at the insertion position.
*
* @internal
* @param element The `<img>` view element to resolve the type for.
* @param imageUtils The `ImageUtils` plugin instance.
*/
export declare function getViewImageType(element: ViewElement, imageUtils: ImageUtils): "imageBlock" | "imageInline";
/**
* Checks whether the given image type can be placed at the specified position - either directly (or after hoisting
* to an allowed ancestor) or, for inline images, wrapped in an auto-created paragraph.
*
* This is the predicate that decides whether a block image may land at a position or must degrade to an inline image
* (for example, inside an `$inlineRoot` that disallows block content) and, symmetrically, whether an inline image may
* become a block image. `isParagraphable()` is always `false` for `imageBlock` (a block object never fits in a
* paragraph), so the auto-paragraph relaxation only applies to the inline target.
*
* @internal
* @param schema The model schema to check against.
* @param position The position at which the image type should be placed.
* @param imageType The image type to check.
*/
export declare function isImageTypePlaceable(schema: ModelSchema, position: ModelPosition, imageType: "imageBlock" | "imageInline"): boolean;
/**
* Considering the current model selection, it returns the name of the model image element
* (`'imageBlock'` or `'imageInline'`) that will make most sense from the UX perspective if a new
* image was inserted (also: uploaded, dropped, pasted) at that selection.
*
* The assumption is that inserting images into empty blocks or on other block widgets should
* produce block images. Inline images should be inserted in other cases, e.g. in paragraphs
* that already contain some text.
*
* @internal
*/
export declare function determineImageTypeForInsertionAtSelection(schema: ModelSchema, selection: ModelSelection | ModelDocumentSelection): "imageBlock" | "imageInline";
/**
* Returns parsed value of the size, but only if it contains unit: px.
*
* @internal
*/
export declare function getSizeValueIfInPx(size: string | undefined): number | null;
/**
* Returns true if both styles (width and height) are set.
*
* If both image styles: width & height are set, they will override the image width & height attributes in the
* browser. In this case, the image looks the same as if these styles were applied to attributes instead of styles.
* That's why we can upcast these styles to width & height attributes instead of resizedWidth and resizedHeight.
*
* @internal
*/
export declare function widthAndHeightStylesAreBothSet(viewElement: ViewElement): boolean;
