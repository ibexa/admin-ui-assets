/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revision/subrevisionview
 */
import { View } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import '../../../theme/revision/subrevision.css';
import type Revision from '../../revision.js';
/**
 * TODO
 */
export default class SubrevisionView extends View {
    id: string;
    /**
     * @observable
     */
    createdAt: Date;
    /**
     * @observable
     */
    isSelected: boolean;
    constructor(locale: Locale, subRevision: Revision, parentRevisionId: string);
    /**
     * TODO
     */
    select(): void;
    /**
     * TODO
     */
    deselect(): void;
}
