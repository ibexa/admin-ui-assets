/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { ViewModel, type DropdownView } from 'ckeditor5/src/ui.js';
import '../../../theme/revision/revisionactions.css';
import type RevisionView from './revisionview.js';
import type { RevisionAction } from '../revisionssidebar/revisionssidebar.js';
export declare function createActionsDropdownView(revisionView: RevisionView, revisionActions: Array<RevisionAction>): DropdownView;
export interface RevisionDropdownOptions {
    type: 'button';
    model: ViewModel;
}
