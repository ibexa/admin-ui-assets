/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module clipboard/utils/viewtoplaintext
 */
import type { DomConverter, ViewDocumentFragment, ViewItem } from '@ckeditor/ckeditor5-engine';
/**
 * Converts {@link module:engine/view/item~Item view item} and all of its children to plain text.
 *
 * @param converter The converter instance.
 * @param viewItem View item to convert.
 * @returns Plain text representation of `viewItem`.
 */
export default function viewToPlainText(converter: DomConverter, viewItem: ViewItem | ViewDocumentFragment): string;
