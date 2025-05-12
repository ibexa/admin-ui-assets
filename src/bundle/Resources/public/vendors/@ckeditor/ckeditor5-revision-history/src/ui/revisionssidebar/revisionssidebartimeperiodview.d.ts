/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revisionsidebar/revisionsidebartimeperiodview
 */
import { View, type ViewCollection } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import RevisionView from '../revision/revisionview.js';
import '../../../theme/revisionssidebar/revisionssidebartimeperiod.css';
import type { RevisionAction } from './revisionssidebar.js';
import type Revision from '../../revision.js';
/**
 * TODO
 */
export default class RevisionsSidebarTimePeriodView extends View {
    startDate: Date;
    revisionViews: ViewCollection<RevisionView>;
    constructor(locale: Locale, startDate: Date, revisionActions: Array<RevisionAction>, requireRevisionName: boolean);
    /**
     * TODO
     */
    addRevision(newRevision: Revision): void;
    /**
     * TODO
     */
    removeRevision(revision: Revision): void;
}
