/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module paste-from-office/filters/table
 */
import { type UpcastWriter, type ViewDocumentFragment } from 'ckeditor5/src/engine.js';
/**
 * Applies border none for table and cells without a border specified.
 * Normalizes style length units to px.
 */
export default function transformTables(documentFragment: ViewDocumentFragment, writer: UpcastWriter): void;
