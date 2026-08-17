/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module paste-from-office/filters/list
 */
import { UpcastWriter, type ViewDocumentFragment } from 'ckeditor5/src/engine';
/**
 * Transforms Word specific list-like elements to the semantic HTML lists.
 *
 * Lists in Word are represented by block elements with special attributes like:
 *
 * ```xml
 * <p class=MsoListParagraphCxSpFirst style='mso-list:l1 level1 lfo1'>...</p> // Paragraph based list.
 * <h1 style='mso-list:l0 level1 lfo1'>...</h1> // Heading 1 based list.
 * ```
 *
 * @param documentFragment The view structure to be transformed.
 * @param stylesString Styles from which list-like elements styling will be extracted.
 */
export declare function transformListItemLikeElementsIntoLists(documentFragment: ViewDocumentFragment, stylesString: string): void;
/**
 * Removes paragraph wrapping content inside a list item.
 */
export declare function unwrapParagraphInListItem(documentFragment: ViewDocumentFragment, writer: UpcastWriter): void;
