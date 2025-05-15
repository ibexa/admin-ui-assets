/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/realtimecollaborativecomments/cloudservicescommentsadapter
 * @publicApi
 */
import { Context, ContextPlugin, type Editor } from 'ckeditor5/src/core.js';
import { Users } from 'ckeditor5-collaboration/src/collaboration-core.js';
import { CommentsService } from '@ckeditor/ckeditor-cloud-services-collaboration/src/services.js';
import WebSocketGateway, { type ReconnectContextPlugin } from '../realtimecollaborativeediting/websocketgateway.js';
import Sessions from '../realtimecollaborativeediting/sessions.js';
/**
 * The Cloud Services Comments Adapter plugin.
 *
 * Visit the {@glink features/collaboration/context-and-collaboration-features Context and Collaboration Features} guide
 *  to learn how to use it.
 */
export default class CloudServicesCommentsAdapter extends ContextPlugin implements ReconnectContextPlugin {
    static CommentsService: typeof CommentsService;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof WebSocketGateway, "CommentsRepository", typeof Sessions, typeof Users];
    /**
     * @inheritDoc
     */
    static get pluginName(): "CloudServicesCommentsAdapter";
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
    constructor(context: Editor | Context);
    /**
     * @inheritDoc
     */
    init(): Promise<void>;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * A method that will be executed when the `WebSocketGateway` will reconnect.
     */
    reconnect(): Promise<void>;
    /**
     * It connects a service for the given channel ID to the WebSocket and synchronizes local comments (`CommentsRepository`)
     * with remote comments (the `service.connect()`'s response).
     */
    private _connectService;
    private _fetchMissingUsersForThreads;
}
