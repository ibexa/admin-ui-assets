/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/tablescroll/watchers
*/
import { Collection } from "@ckeditor/ckeditor5-utils";
import type { EditingView, Model, ModelElement } from "@ckeditor/ckeditor5-engine";
/**
* Creates a live collection of all `table` model elements present in the document and keeps it
* up to date as tables are inserted, moved, or removed.
*
* @internal
*/
export declare function watchTableModelElements(model: Model): Collection<ModelElement>;
/**
* Observes the DOM width of every editing root and calls `onResize` whenever any of them changes width.
* Height-only changes are ignored, since only a root's width can make a table overflow it.
*
* @internal
*/
export declare function watchRootsWidthResize(view: EditingView, onResize: () => void): () => void;
