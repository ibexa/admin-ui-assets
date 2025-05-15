/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/realtimecollaborativerevisionhistory/cloudservicesrevisionhistoryadapter
 * @publicApi
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { Users } from 'ckeditor5-collaboration/src/collaboration-core.js';
import RealTimeCollaborationClient from '../realtimecollaborativeediting/realtimecollaborationclient.js';
import WebSocketGateway, { type ReconnectPlugin } from '../realtimecollaborativeediting/websocketgateway.js';
import Sessions from '../realtimecollaborativeediting/sessions.js';
import { RevisionHistoryService } from '@ckeditor/ckeditor-cloud-services-collaboration/src/services.js';
/**
 * The Cloud Services revision history adapter plugin.
 */
export default class CloudServicesRevisionHistoryAdapter extends Plugin implements ReconnectPlugin {
    static RevisionHistoryService: typeof RevisionHistoryService;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof WebSocketGateway, typeof RealTimeCollaborationClient, "RevisionHistory", typeof Sessions, typeof Users];
    /**
     * @inheritDoc
     */
    static get pluginName(): "CloudServicesRevisionHistoryAdapter";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): Promise<void>;
    /**
     * A method that will be executed when the `WebSocketGateway` will reconnect.
     */
    reconnect(): Promise<void>;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Waits for the service to be ready before calling the service API.
     */
    private _waitForServiceReady;
    private _fetchMissingUsers;
}
