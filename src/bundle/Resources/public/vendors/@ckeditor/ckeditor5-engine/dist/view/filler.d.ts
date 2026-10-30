/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { type EditingView } from "./view.js";
/**
* Non-breaking space filler creator. This function creates the `&nbsp;` text node.
* It defines how the filler is created.
*
* @see module:engine/view/filler~MARKED_NBSP_FILLER
* @see module:engine/view/filler~BR_FILLER
* @internal
*/
export declare const NBSP_FILLER: (domDocument: Document) => Text;
/**
* Marked non-breaking space filler creator. This function creates the `<span data-cke-filler="true">&nbsp;</span>` element.
* It defines how the filler is created.
*
* @see module:engine/view/filler~NBSP_FILLER
* @see module:engine/view/filler~BR_FILLER
* @internal
*/
export declare const MARKED_NBSP_FILLER: (domDocument: Document) => HTMLSpanElement;
/**
* `<br>` filler creator. This function creates the `<br data-cke-filler="true">` element.
* It defines how the filler is created.
*
* @see module:engine/view/filler~NBSP_FILLER
* @see module:engine/view/filler~MARKED_NBSP_FILLER
* @internal
*/
export declare const BR_FILLER: (domDocument: Document) => HTMLBRElement;
/**
* Length of the {@link module:engine/view/filler~INLINE_FILLER INLINE_FILLER}.
*
* @internal
*/
export declare const INLINE_FILLER_LENGTH = 7;
/**
* Inline filler which is a sequence of the word joiners.
*
* @internal
*/
export declare const INLINE_FILLER: string;
/**
* Checks if the node is a text node which starts with the {@link module:engine/view/filler~INLINE_FILLER inline filler}.
*
* ```ts
* startsWithFiller( document.createTextNode( INLINE_FILLER ) ); // true
* startsWithFiller( document.createTextNode( INLINE_FILLER + 'foo' ) ); // true
* startsWithFiller( document.createTextNode( 'foo' ) ); // false
* startsWithFiller( document.createElement( 'p' ) ); // false
* ```
*
* @param domNode DOM node.
* @returns True if the text node starts with the {@link module:engine/view/filler~INLINE_FILLER inline filler}.
* @internal
*/
export declare function startsWithFiller(domNode: Node | string): boolean;
/**
* Checks if the text node contains only the {@link module:engine/view/filler~INLINE_FILLER inline filler}.
*
* ```ts
* isInlineFiller( document.createTextNode( INLINE_FILLER ) ); // true
* isInlineFiller( document.createTextNode( INLINE_FILLER + 'foo' ) ); // false
* ```
*
* @param domText DOM text node.
* @returns True if the text node contains only the {@link module:engine/view/filler~INLINE_FILLER inline filler}.
* @internal
*/
export declare function isInlineFiller(domText: Text): boolean;
/**
* Get string data from the text node, removing an {@link module:engine/view/filler~INLINE_FILLER inline filler} from it,
* if text node contains it.
*
* ```ts
* getDataWithoutFiller( document.createTextNode( INLINE_FILLER + 'foo' ) ) == 'foo' // true
* getDataWithoutFiller( document.createTextNode( 'foo' ) ) == 'foo' // true
* ```
*
* @param domText DOM text node, possible with inline filler.
* @returns Data without filler.
* @internal
*/
export declare function getDataWithoutFiller(domText: Text | string): string;
/**
* Assign key observer which move cursor from the end of the inline filler to the beginning of it when
* the left arrow is pressed, so the filler does not break navigation.
*
* @param view View controller instance we should inject quirks handling on.
* @internal
*/
export declare function injectQuirksHandling(view: EditingView): void;
