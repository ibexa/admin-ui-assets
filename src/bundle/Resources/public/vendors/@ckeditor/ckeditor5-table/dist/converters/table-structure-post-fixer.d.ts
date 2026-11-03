/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/converters/table-structure-post-fixer
*/
import type { Editor } from "@ckeditor/ckeditor5-core";
/**
* Injects a table structure post-fixer into the model.
*
* It checks if the `headingRows` and `footerRows` attributes do not overlap.
* If they overlap, the `footerRows` attribute is corrected.
*
* We prefer `headingRows` over `footerRows` because changing `headingRows` would require updating
* the `tableCellType` attribute of the cells in the row, which is not required when changing `footerRows`.
*
* @param editor The editor instance.
*/
export declare function injectTableStructurePostFixer(editor: Editor): void;
