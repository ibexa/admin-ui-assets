/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/realtimecollaborativetrackchanges/cloudservicestrackchangesadapter
 * @publicApi
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { TrackChangesService } from '@ckeditor/ckeditor-cloud-services-collaboration/src/services.js';
import WebSocketGateway, { type ReconnectPlugin } from '../realtimecollaborativeediting/websocketgateway.js';
import CloudServicesCommentsAdapter from '../realtimecollaborativecomments/cloudservicescommentsadapter.js';
/**
 * The Cloud Services Track Changes Adapter plugin.
 */
export default class CloudServicesTrackChangesAdapter extends Plugin implements ReconnectPlugin {
    static TrackChangesService: typeof TrackChangesService;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof CloudServicesCommentsAdapter, "TrackChangesEditing", typeof WebSocketGateway];
    /**
     * @inheritDoc
     */
    static get pluginName(): "CloudServicesTrackChangesAdapter";
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
     * Waits for the service to be ready before calling the service API.
     */
    private _waitForServiceReady;
    private _fetchMissingUsersForThreads;
}
