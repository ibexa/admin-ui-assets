/// <reference types="node" />
/// <reference types="node" />
import CollaborativeEditingConnectMessage from './messages/collaborativeeditingconnectmessage.js';
import CollaborativeEditingReconnectMessage from './messages/collaborativeeditingreconnectmessage.js';
import CollaborativeEditingResponse from './responses/collaborativeeditingresponse.js';
import CollaborativeEditingConnectResponse from './responses/collaborativeeditingconnectresponse.js';
import { IWebSocketGateway } from './../websocketgateway/websocketgateway.js';
import SessionCollection from '../sessions/sessioncollection.js';
import GetDocumentDetailsResponse from './responses/getdocumentdetailsresponse.js';
export declare const _SERVICE: number;
export interface IOperationsData {
    buffers: (Buffer | Uint8Array)[];
    types: number[];
}
declare const CollaborativeEditingService_base: {
    new (): import("ckeditor5/src/utils.js").Emitter;
    prototype: import("ckeditor5/src/utils.js").Emitter;
};
/**
 * General purpose CollaborativeEditingService used to synchronize data store values with other collaborative nodes.
 */
declare class CollaborativeEditingService extends /* #__PURE__ -- @preserve */ CollaborativeEditingService_base {
    static _SERVICE: number;
    private readonly _bundleVersion;
    private readonly _id;
    private _isConnected;
    private _wsGateway?;
    private _channel?;
    private _connectedSessions?;
    /**
     * Create CollaborativeEditingService instance.
     *
     *     const collabWritingService = new CollaborativeEditingService( '0.9.0', 'post-456-text' );
     *
     * @throws {TypeError}
     * Throws when bundleVersion param is not provided.
     */
    constructor(bundleVersion: string, serviceId?: string);
    getId(): string;
    /**
     * Indicates that CollaborativeEditingService is connected to CKEditor Cloud Services.
     */
    isConnected(): boolean;
    /**
     * Connects CollaborativeEditingService to CKEditor Cloud Services.
     *
     *     const myDocument = new CollaborativeEditingService( '0.9.0', 'article-1234' );
     *
     *     await myDocument.connect( wsGateway );
     *
     * @throws {CKEditorCloudServicesError}
     * Thrown in the case of errors on the backend side.
     */
    connect(wsGateway: IWebSocketGateway, data?: {
        buffers: Buffer[];
        types: number[];
    }, lastOperationId?: string): Promise<CollaborativeEditingConnectResponse | void>;
    /**
     * Reconnects CollaborativeEditingService to CKEditor Cloud Services.
     *
     *     const myDocument = new CollaborativeEditingService( '0.9.0', 'article-1234' );
     *
     *     await myDocument.connect( wsGateway );
     *
     *     wsGateway.on( 'change:state', ( event, property, value ) => {
     *     		 if( value === 'disconnected' ) {
     *     		 	await myDocument.reconnect( wsGateway, 123 );
     *     		 }
     *     } );
     *
     * @throws {CKEditorCloudServicesError}
     * Thrown when connection already exists or in the case of errors on the backend side.
     */
    reconnect(wsGateway: IWebSocketGateway, lastKnowVersion: number): Promise<CollaborativeEditingConnectResponse>;
    /**
     * Disconnects CollaborativeEditingService from CKEditor Cloud Services.
     *
     * @throws {CKEditorCloudServicesError}
     * Thrown in the case of errors on the backend side.
     */
    disconnect(): void;
    /**
     * Gets document details from CKEditor Cloud Services.
     *
     * @throws {CKEditorCloudServicesError}
     * Thrown in the case of errors on the backend side.
     */
    getDocumentDetails(): Promise<GetDocumentDetailsResponse>;
    /**
     * Sends update to connected service. This will propagate update to other connected CollaborativeEditingService.
     * Data update will not be stored on CollaborativeEditingService server instance.
     *
     * @throws {CKEditorCloudServicesError}
     * Throws when baseVersion or data is not provided, data is empty, or in the case of errors on the backend side.
     *
     * @throws {ServiceNotConnectedError}
     * Throws when collaborative editing service is not connected.
     */
    sendOperations(data: IOperationsData, baseVersion: number | string, lastOperationId: string): Promise<CollaborativeEditingResponse>;
    /**
     * Returns read-only observable collection with EndUsers Sessions for collaborative editing service.
     *
     * @throws {CKEditorCloudServicesError}
     * Thrown in the case of errors on the backend side.
     */
    getConnectedSessions(): Promise<SessionCollection>;
    /**
     * Returns a Promise that resolves with read-only observable collection with EndUsers Sessions for given id.
     *
     *    const sessions = await CollaborativeEditingService.getConnectedSessions( 'my-document-id' );
     *
     * @deprecated Use not static version of getConnectedSessions method.
     *
     * @throws {CKEditorCloudServicesError}
     * Throws in the case of errors on the backend side.
     */
    static getConnectedSessions(wsGateway: IWebSocketGateway, id: string): Promise<SessionCollection>;
    _connect(wsGateway: IWebSocketGateway, message: CollaborativeEditingConnectMessage | CollaborativeEditingReconnectMessage): Promise<CollaborativeEditingConnectResponse | void>;
    /**
     * Connects given CollaborativeEditingService to channel.
     */
    protected _connectToChannel(wsGateway: IWebSocketGateway, channelName: string): void;
    /**
     * WebSocketGateway "change:state" events handler.
     */
    private _onWsGatewayStateChange;
}
export default CollaborativeEditingService;
