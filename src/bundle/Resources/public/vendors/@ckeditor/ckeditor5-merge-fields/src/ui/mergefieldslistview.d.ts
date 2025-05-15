/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module mergefields/ui/mergefieldslistview
 */
import { ListView, type FilteredView } from 'ckeditor5/src/ui.js';
/**
 * A list view that displays a list of merge fields with filtering capabilities.
 *
 * @private
 */
export default class MergeFieldsListView extends ListView implements FilteredView {
    /**
     * @inheritDoc
     */
    filter(regExp: RegExp | null): {
        resultsCount: number;
        totalItemsCount: number;
    };
}
