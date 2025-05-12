/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/realtimecollaborativerevisionhistory
 * @publicApi
 */
import { Plugin } from 'ckeditor5/src/core.js';
import CloudServicesRevisionHistoryAdapter from './realtimecollaborativerevisionhistory/cloudservicesrevisionhistoryadapter.js';
import RealTimeCollaborativeEditing from './realtimecollaborativeediting.js';
/**
 * Enables the real-time collaborative revision history feature.
 *
 * Requires adding `RevisionHistory` to the list of editor plugins.
 *
 * Check the {@glink features/collaboration/real-time-collaboration/real-time-collaboration-integration Real-time collaboration guide}
 * to see how to launch the editor in the real-time collaboration mode.
 */
export default class RealTimeCollaborativeRevisionHistory extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly ["RevisionHistory", typeof CloudServicesRevisionHistoryAdapter, typeof RealTimeCollaborativeEditing];
    /**
     * @inheritDoc
     */
    static get pluginName(): "RealTimeCollaborativeRevisionHistory";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
}
