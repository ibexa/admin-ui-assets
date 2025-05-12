/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/realtimecollaborativeediting/realtimecollaborationclient
 * @publicApi
 */
import { Plugin, PendingActions, type Editor } from 'ckeditor5/src/core.js';
import { Notification } from 'ckeditor5/src/ui.js';
import WebSocketGateway from './websocketgateway.js';
import Sessions from './sessions.js';
import UserMarkers from './usermarkers.js';
import { Users, type CollaborationHistory } from 'ckeditor5-collaboration/src/collaboration-core.js';
import { CollaborativeEditingService } from '@ckeditor/ckeditor-cloud-services-collaboration/src/services.js';
/**
 * Handles the real-time collaborative editing.
 */
export default class RealTimeCollaborationClient extends Plugin {
    static CollaborativeEditingService: typeof CollaborativeEditingService;
    /**
     * The ID of the current editing session to which the client is connected (or was connected before losing the connection).
     */
    sessionId: string | null;
    /**
     * Holds the history of operations that have been applied on the collaboration server.
     *
     * Contains only these operations, that have been already synchronized. It is exactly the same for all clients
     * connected to the same editing session.
     *
     * All original operations are cloned.
     */
    serverHistory: CollaborationHistory;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof WebSocketGateway, typeof Sessions, typeof UserMarkers, typeof PendingActions, typeof Users, typeof Notification];
    /**
     * @inheritDoc
     */
    static get pluginName(): "RealTimeCollaborationClient";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * Incremented every time the document is synchronized with Cloud Services server. It can be treated as the server's current document
     * version. This number is stored between editing sessions, so even when all clients disconnect, the editing session is closed, the
     * next time the document is initialized, the version number will stay the same and will continue to be incremented with
     * subsequent document changes.
     *
     * Use this version to compare which client has a newer version of the document. It is recommended to save it together with the
     * document content in the database. Comparing `cloudDocumentVersion` can be used to prevent overwriting a newer content with
     * an older one from another client.
     */
    get cloudDocumentVersion(): number;
    /**
     * The last document version synchronized with the server during current real-time collaboration session.
     *
     * Equals to `0` when the client is not connected to the server yet.
     *
     * This includes only operations created by this or other clients. Notably, user selection markers operations created by
     * the server are excluded.
     */
    get lastSyncVersion(): number;
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Reconnects the client to the document.
     *
     * If the document has been flushed (editing session for that document was closed) in the meantime, the editing session is recreated
     * using the local operations history.
     *
     * There are several scenarios where the reconnection can fail because it is impossible to synchronize local document state with the
     * server editing session or with the document state saved in the database. In those situations, the editor switches to read-only
     * mode and a {@link module:ui/notification/notification~Notification `Notification`} is created.
     */
    reconnect(): Promise<void>;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Handles the server response after the reconnection.
     */
    private _handleReconnectionResponse;
    /**
     * Connects the client to the editing session.
     *
     * If this client is the first one that tries connecting to the session, the session will be created based on its
     * local operations. Otherwise, the server will respond with server operations that are already stored on the server for the
     * existing session and those operations will replace this client's editor content.
     *
     * @param isReconnectionProcess Set to `true` when reconnecting to the document after the document has been flushed.
     */
    private _connectService;
    /**
     * Handles operations received from the server. Callback for the `CollaborativeEditingService#event:operationsReceived`.
     */
    private _handleReceivedOperations;
    /**
     * Connects the client to the editing session after it has been flushed. The client will use the local operations history to re-create
     * the editing session on the server.
     */
    private _connectAfterSessionHasBeenFlushed;
    /**
     * Fetches missing users based on author IDs of the given operations.
     */
    private _fetchMissingUsers;
    /**
     * Performs root loading in a way that is safe for real-time collaboration. Synchronizes with the server and use the local data only
     * if the given root has not been loaded on any other client yet. Returns a promise which resolves after the root is ready.
     *
     * It transforms given data and root attributes into operations and tries to send them to the server. The operations are sent in
     * a regular way. The root is ready after they are finally applied on the server.
     *
     * @private
     */
    private _loadRoot;
    /**
     * Handles the initial connection.
     */
    private _handleInitialConnectionData;
    private _sendBufferedOperations;
    /**
     * Handles a response from the server for the following actions:
     * - connection
     * - reconnection
     * - sending buffered operations.
     *
     * @param sentOperations Operations sent to the server.
     * @param response The server's response.
     * @param requestId
     * @returns Resolves to `true` if the updates process has finished,
     * resolves to `false` if next batch of updates was sent to the server.
     */
    private _handleServerResponse;
}
