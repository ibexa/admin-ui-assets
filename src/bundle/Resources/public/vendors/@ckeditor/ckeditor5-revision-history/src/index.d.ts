/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
export { default as Revision } from './revision.js';
export { default as RevisionHistory } from './revisionhistory.js';
export { default as RevisionsRepository } from './revisionsrepository.js';
export { default as RevisionHistoryUtils } from './revisionhistoryutils.js';
export { default as RevisionViewerLoadingOverlay } from './ui/revisionviewer/revisionviewerloadingoverlay.js';
export { default as RevisionHistoryUI } from './ui/revisionhistory/revisionhistoryui.js';
export { default as RevisionTracker } from './revisiontracker.js';
export { default as RevisionViewer, type RestoreRevisionCommand, type ShowChangeCommand } from './revisionviewer.js';
export { default as RevisionsSidebar } from './ui/revisionssidebar/revisionssidebar.js';
export { default as RevisionViewerUI } from './ui/revisionviewer/revisionviewerui.js';
export { default as RevisionViewerEditor } from './editor/revisionviewereditor.js';
export type { RevisionData } from './revision.js';
export type { RevisionHistoryConfig } from './revisionhistoryconfig.js';
import './augmentation.js';
