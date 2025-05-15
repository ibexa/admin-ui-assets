/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revisionsidebar/revisionsidebarview
 */
import { View, type ViewCollection } from 'ckeditor5/src/ui.js';
import type { Locale, Collection } from 'ckeditor5/src/utils.js';
import RevisionsSidebarTimePeriodView from './revisionssidebartimeperiodview.js';
import '../../../theme/revisionssidebar/revisionssidebar.css';
import type { default as RevisionView } from '../revision/revisionview.js';
import type { RevisionAction } from './revisionssidebar.js';
import type Revision from '../../revision.js';
/**
 * TODO
 */
export default class RevisionsSidebarView extends View {
    timePeriodViews: ViewCollection<RevisionsSidebarTimePeriodView>;
    /**
     * @observable
     */
    isEnabled: boolean;
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, revisions: Collection<Revision>, revisionActions: Array<RevisionAction>, _requireRevisionName: boolean);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * TODO
     */
    get revisionViews(): Array<RevisionView>;
    /**
     * TODO
     */
    selectRevision(revisionToSelect: Revision | null): void;
    /**
     * TODO
     */
    highlightRevisions(revisionsToHighlight: Array<Revision>): void;
}
