/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/realtimecollaborativeediting/websocketgateway
 * @publicApi
 */
import { ContextPlugin, type Plugin, type Editor, type Context } from 'ckeditor5/src/core.js';
import { WebSocketGateway as WebSocketGatewayProvider, type WebSocketGatewayState } from '@ckeditor/ckeditor-cloud-services-collaboration/src/services.js';
import { Notification } from 'ckeditor5/src/ui.js';
export default class WebSocketGateway extends ContextPlugin {
    static WebSocketGateway: typeof WebSocketGatewayProvider;
    static initialReconnectionInterval: number;
    connection: WebSocketGatewayProvider;
    /**
     * The connection state.
     *
     * The `connected` state is set when both, the browser and the WebSocket, are connected.
     */
    state: WebSocketGatewayState;
    static get requires(): readonly ["CloudServices", typeof Notification];
    /**
     * @inheritDoc
     */
    static get pluginName(): "WebSocketGateway";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    constructor(context: Editor | Context);
    /**
     * @inheritDoc
     */
    init(): Promise<unknown>;
    /**
     * Registers a plugin that will be reconnected when the connection is back.
     * The plugin needs to implement the `reconnect()` method.
     */
    addToReconnectionStack(plugin: ReconnectPlugin | ReconnectContextPlugin): void;
    /**
     * Removes the plugin from the reconnection stack.
     */
    removeFromReconnectionStack(plugin: ReconnectPlugin | ReconnectContextPlugin): void;
    /**
     * Checks if the plugin is present in the reconnection stack.
     */
    isInReconnectionStack(plugin: ReconnectPlugin | ReconnectContextPlugin): boolean;
    /**
     * Disconnects the client from the WebSocket server and also stops the DOM emitter listeners to prevent reconnect process.
     */
    disconnect(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
interface Reconnect {
    reconnect: () => void | Promise<void>;
}
export type ReconnectPlugin = Plugin & Reconnect;
export type ReconnectContextPlugin = ContextPlugin & Reconnect;
export {};
