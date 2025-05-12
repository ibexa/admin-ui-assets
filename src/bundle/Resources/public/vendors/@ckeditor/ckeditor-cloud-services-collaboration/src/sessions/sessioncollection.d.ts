import { Collection } from 'ckeditor5/src/utils.js';
import User from './../users/user.js';
import { IWebSocketGateway } from './../websocketgateway/websocketgateway.js';
export declare const _SERVICE: number;
export interface ISocket {
    id: string;
    user?: User;
    userId?: string;
    role?: string;
    permissions?: string[];
}
/**
 * Collection of connected socket to given service.
 */
declare class SessionCollection extends Collection<ISocket> {
    private readonly _id;
    private readonly _sessionType;
    private readonly _handlers;
    private _channel?;
    private _wsGateway?;
    private _connected;
    private _eventsQueue;
    private _isRunning;
    constructor(_id: string, _sessionType: number);
    /**
     * Connects SessionCollection to CKEditor Cloud Services..
     */
    connect(wsGateway: IWebSocketGateway): Promise<void>;
    /**
     * Disconnects SessionCollection from CKEditor Cloud Services.
     */
    disconnect(force?: boolean): void;
    add(_1: ISocket, _2?: number): this;
    remove(_: number): ISocket;
    private _connectToChannel;
    private _onWsGatewayStateChange;
    private _runQueue;
    private _addHandler;
}
export default SessionCollection;
