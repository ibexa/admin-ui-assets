/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/converters/table-structure-refresh-handler
*/
import type { EditingController, Model } from "@ckeditor/ckeditor5-engine";
/**
* A table headings refresh handler which marks the table cells or rows in the differ to have it re-rendered
* if the headings attribute changed.
*
* Table heading rows and heading columns are represented in the model by a `headingRows` and `headingColumns` attributes.
*
* When table headings attribute changes, all the cells/rows are marked to re-render to change between `<td>` and `<th>`.
*
* @internal
*/
export declare function tableStructureRefreshHandler(model: Model, editing: EditingController): void;
