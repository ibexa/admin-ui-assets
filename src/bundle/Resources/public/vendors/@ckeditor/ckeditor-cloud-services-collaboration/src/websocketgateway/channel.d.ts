import { type Emitter } from 'ckeditor5/src/utils.js';
import type { ISocket, IWebSocketGateway } from './websocketgateway.js';
declare const Channel_base: {
    new (): Emitter;
    prototype: Emitter;
};
/**
 * Abstracts Socket.io channels event generation as general Emitter that will fire events for all service events.
 *
 * Fires two events for each channel message:
 * 1. 'all:event:event-name'
 * 2. 'event:event-name'
 *
 * Event without 'all' prefix is not fired for messages that socketIdated from this WebSocket.sessionId.
 */
declare class Channel extends /* #__PURE__ -- @preserve */ Channel_base implements Emitter {
    private readonly _channelName;
    private readonly _wsGateway;
    private readonly _socket;
    constructor(_channelName: string, _wsGateway: IWebSocketGateway, _socket: ISocket);
    /**
     * Removes handlers from socket.
     */
    remove(): void;
    /**
     * Returns normalized event name.
     */
    getEventName(eventName?: string | number, all?: boolean): string;
    private _subscribeToChannel;
}
export default Channel;
