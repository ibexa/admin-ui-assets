/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revisionviewer/changedetailsview
 */
import { View } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import type ChangeItem from '../../changeitem.js';
export default class ChangeDetailsView extends View {
    changeId: string;
    /**
     * @observable
     */
    type: string;
    constructor(locale: Locale, model: ChangeItem);
    /**
     * Focuses the view.
     */
    focus(): void;
}
