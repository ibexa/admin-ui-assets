import { IWebSocketGateway } from '../websocketgateway/websocketgateway.js';
import { IRevisionObject } from './revision.js';
export declare const _SERVICE: number;
interface IRevisionHistoryConnectResponse {
    revisions: IRevisionObject[];
    requestId: number;
}
declare const RevisionHistoryService_base: {
    new (): import("ckeditor5/src/utils.js").Emitter;
    prototype: import("ckeditor5/src/utils.js").Emitter;
};
declare class RevisionHistoryService extends /* #__PURE__ -- @preserve */ RevisionHistoryService_base {
    private readonly _documentId;
    private _isConnected;
    private _wsGateway?;
    private _channel?;
    private static readonly _SERVICE;
    constructor(_documentId: string);
    get isConnected(): boolean;
    /**
     * Connects RevisionHistoryService to CKEditor Cloud Services.
     *
     * @throws {@link CKEditorCloudServicesError} error
     * Thrown in the case of errors on the backend side.
     */
    connect(wsGateway: IWebSocketGateway): Promise<IRevisionHistoryConnectResponse | void>;
    /**
     * Disconnects RevisionHistoryService from CKEditor Cloud Services.
     *
     * @throws {@link CKEditorCloudServicesError}
     * Thrown in the case of errors on the backend side.
     */
    disconnect(): void;
    /**
     * Reconnects RevisionHistoryService to CKEditor Cloud Services.
     *
     * @throws {@link CKEditorCloudServicesError}
     * Thrown when connection already exists or in the case of errors on the backend side.
     */
    reconnect(wsGateway: IWebSocketGateway, lastRequestId: number): Promise<IRevisionHistoryConnectResponse>;
    /**
     * Updates revisions.
     *
     * @throws {@link CKEditorCloudServicesError}
     * Thrown in the case of errors on the backend side.
     */
    updateRevisions(revisions: IRevisionObject[], lastRequestId: number): Promise<number>;
    /**
     * Returns revision with given id.
     *
     * @throws {@link CKEditorCloudServicesError}
     * Thrown in the case of errors on the backend side.
     */
    getRevision(revisionId: string): Promise<IRevisionObject>;
    /**
     * Connects or reconnects to WebSocketGateway and starts listening on channel.
     */
    private _connect;
    /**
     * Starts to listen on a given channel.
     */
    private _connectToChannel;
    /**
     * Processes websocket gateway state changes.
     */
    private _onWsGatewayStateChange;
    /**
     * Sends request to RevisionHistory service.
     *
     * @throws {@link ServiceNotConnectedError}
     * Thrown in the case of missing service connection.
     */
    private _sendRequest;
}
export default RevisionHistoryService;
