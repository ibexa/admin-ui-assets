/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { RevisionHistory, RevisionHistoryConfig, RevisionsRepository, RevisionHistoryUtils, RevisionViewerLoadingOverlay, RevisionHistoryUI, RevisionTracker, RevisionViewer, RestoreRevisionCommand, ShowChangeCommand, RevisionsSidebar, RevisionViewerUI } from './index.js';
declare module '@ckeditor/ckeditor5-core' {
    interface EditorConfig {
        /**
         * The configuration of the revision history feature.
         * Introduced by the {@link module:revision-history/revisionhistory~RevisionHistory} feature.
         */
        revisionHistory?: RevisionHistoryConfig;
    }
    interface PluginsMap {
        [RevisionHistory.pluginName]: RevisionHistory;
        [RevisionsRepository.pluginName]: RevisionsRepository;
        [RevisionHistoryUtils.pluginName]: RevisionHistoryUtils;
        [RevisionViewerLoadingOverlay.pluginName]: RevisionViewerLoadingOverlay;
        [RevisionHistoryUI.pluginName]: RevisionHistoryUI;
        [RevisionTracker.pluginName]: RevisionTracker;
        [RevisionViewer.pluginName]: RevisionViewer;
        [RevisionsSidebar.pluginName]: RevisionsSidebar;
        [RevisionViewerUI.pluginName]: RevisionViewerUI;
    }
    interface CommandsMap {
        restoreRevision: RestoreRevisionCommand;
        showPreviousChange: ShowChangeCommand<'backward'>;
        showNextChange: ShowChangeCommand<'forward'>;
    }
}
