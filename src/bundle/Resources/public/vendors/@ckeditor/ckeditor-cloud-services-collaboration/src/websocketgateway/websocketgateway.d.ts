import { ManagerOptions, Socket } from 'socket.io-client';
import { Decoder as IODecoder, Encoder as IOEncoder } from 'socket.io-parser';
import { Emitter } from 'ckeditor5/src/utils.js';
import Channel from './channel.js';
import { IToken } from '../types.js';
import User from './../users/user.js';
import { IMessage } from '../message.js';
export declare const WEB_SOCKET_GATEWAY_STATES: {
    readonly DISCONNECTED: "disconnected";
    readonly CONNECTING: "connecting";
    readonly CONNECTED: "connected";
};
export type IWebSocketGatewayStates = typeof WEB_SOCKET_GATEWAY_STATES;
export type WebSocketGatewayState = IWebSocketGatewayStates[keyof IWebSocketGatewayStates];
export type ConnectionProvider = (url: string, options: IWebSocketGatewayConnectionOptions) => ISocket;
export interface IWebSocketGatewayOptions {
    rejectUnauthorized?: boolean;
    autoReconnect?: boolean;
    agent?: unknown;
    onError?: (error: unknown) => void;
    timeout?: number;
    requestTimeout?: number;
}
export interface ISocket extends Socket {
}
export interface IWebSocketGatewayConnectionOptions extends ManagerOptions {
    parser: {
        Decoder: (new (...args: unknown[]) => IODecoder);
        Encoder: (new (...args: unknown[]) => IOEncoder);
    };
}
export interface IWebSocketGateway extends Emitter {
    _sendRequest<T extends IMessage>(serviceName: number, method: string, buffer: Uint8Array): Promise<T>;
    _getChannel(serviceName: string | number, channelId: string): Channel;
    disconnect(): void;
    reconnect(): Promise<void>;
    me?: User;
    /**
     * @deprecated - Use `socketId` property instead
     */
    sessionId?: string;
    socketId?: string;
    state?: WebSocketGatewayState;
}
declare const WebSocketGateway_base: {
    new (): import("ckeditor5/src/utils.js").Observable;
    prototype: import("ckeditor5/src/utils.js").Observable;
};
/**
 * Represents class for connecting to CKEditor Cloud Services WebSocket API.
 */
declare class WebSocketGateway extends /* #__PURE__ -- @preserve */ WebSocketGateway_base {
    private readonly _requestsManager;
    private readonly _url;
    private _socket?;
    private _socketAuth?;
    private readonly _channels;
    private _connectionAttempt;
    private readonly _token;
    private readonly _options;
    private readonly _connectionProvider;
    private readonly _userFactory;
    /**
     * Represents currently logged user as taken from CMS (Token). Undefined value represents anonymous user.
     */
    me?: User;
    /**
     * Id of an EndUser's socket.
     */
    socketId?: string;
    /**
     * WebSocketGateway connection state.
     */
    state?: WebSocketGatewayState;
    /**
     * Defines "disconnected" state. Returned by {@link WebSocketGateway#state}.
     */
    static readonly STATE_DISCONNECTED: string;
    /**
     * Defines "connecting" state. Returned by {@link WebSocketGateway#state}.
     */
    static readonly STATE_CONNECTING: string;
    /**
     * Defines "connected" state. Returned by {@link WebSocketGateway#state}.
     */
    static readonly STATE_CONNECTED: string;
    /**
     * Returns highest priority for `change:state` handlers.
     */
    static readonly _CHANGE_STATE_EVENT_PRIORITY: number;
    constructor(apiAddress: string, token: IToken, options?: IWebSocketGatewayOptions, connectionProvider?: ConnectionProvider, userFactory?: (wsGateway: IWebSocketGateway, id: string) => Promise<User>);
    /**
     * Id of an EndUser's Session.
     *
     * @deprecated - Use `socketId` property instead
     */
    get sessionId(): string | undefined;
    /**
     * Wait for fulfilled all sent requests.
     * This method might be called before the call disconnect method to ensure all requests are fulfilled.
     */
    waitForAllRequests(time?: number): Promise<void>;
    /**
     * Disconnects from WebSocket Gateway.
     */
    disconnect(): void;
    /**
     * Reconnects disconnected WebSocket Gateway.
     * Only works if it is in disconnected {@link WebSocketGateway#state} otherwise returns resolved promise.
     */
    reconnect(): Promise<void>;
    /**
     * Connects to CKEditor Cloud Services.
     *
     *     const token = await Token.create( 'https://token-endpoint' );
     *     const webSocketGateway = await WebSocketGateway.connect( token );
     */
    static connect(token: IToken, apiAddress?: string, options?: IWebSocketGatewayOptions, provider?: ConnectionProvider, userFactory?: (wsGateway: IWebSocketGateway, id: string) => Promise<User>): Promise<WebSocketGateway>;
    /**
     * Sends request to CKEditor Cloud Services.
     */
    _sendRequest<TResponse extends IMessage>(serviceName: number, method: string, buffer: Uint8Array): Promise<TResponse>;
    /**
     * Returns {@link Channel} associated with given service.
     */
    _getChannel(serviceName: string | number, channelId: string): Channel;
    private _connect;
    private _getPortByProtocol;
    /**
     * Creates unconnected Socket instance or returns already existing one.
     */
    private _setupSocket;
    /**
     * Emits event via socket.
     */
    private _emit;
    private _addAuthData;
    private _removeAuthData;
    /**
     * Socket.io `connect` events handler.
     */
    private _onConnect;
    /**
     * Socket.io `reconnect` events handler.
     */
    private _onReconnect;
    /**
     * Socket.io `disconnect` events handler.
     */
    private _onDisconnect;
    private _debugEvent;
    /**
     * Socket.io `reconnect_error` events handler.
     */
    private _reconnectionAttemptError;
    /**
     * `onUnauthorized` events handler.
     */
    private _onUnauthorized;
    /**
     * Authenticates socket.
     */
    private _authenticate;
    private _isDebugModeEnabled;
}
export default WebSocketGateway;
