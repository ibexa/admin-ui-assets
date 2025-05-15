/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/realtimecollaborativeediting/sessions
 * @publicApi
 */
import { ContextPlugin, type Editor, type Context } from 'ckeditor5/src/core.js';
import { Collection } from 'ckeditor5/src/utils.js';
import WebSocketGateway from './websocketgateway.js';
import { Users, type User } from 'ckeditor5-collaboration/src/collaboration-core.js';
import type { User as ServerUserModel, SessionCollection, ISocket } from '@ckeditor/ckeditor-cloud-services-collaboration/src/services.js';
export type ServerUser = ServerUserModel & User;
/**
 *
 * The `Sessions` plugin stores the information about the users and sessions connected to the rich text editor.
 *
 * The difference between the sessions plugin and the {@link module:collaboration-core/users~Users `Users` plugin} is that
 * `Users` also keeps information about the users who are not currently connected to the editor (for example, a comment
 * author who is currently offline).
 *
 * If your integration uses {@link module:core/context~Context} and there are multiple channels used, the `Sessions` plugin
 * aggregates users connected to all the channels.
 *
 * There are two types of entries in the sessions plugin: connected users and sessions.
 *
 * There is one session for each connection to a given channel. For example, for each open editor instance connecting
 * to a given channel ID, there will be a session. Every session has a user. However, the same user can be linked
 * with multiple sessions (for example, the same user opened the same URL in multiple tabs).
 *
 * In other words, if the same user (with the same user ID) opens the same document in two different tabs, they will create
 * two sessions but only one user will be connected. You will be able to see two selections in the same document, both in
 * the same color, but only a single user in the {@link module:real-time-collaboration/presencelist~PresenceList user presence list}.
 */
export default class Sessions extends ContextPlugin {
    /**
     * A map of session collections connected to the separate channels.
     *
     * The keys of the map are channel IDs and the values are collections of sessions.
     *
     * A session is represented by an object with the following properties:
     * * `id` - A unique session ID.
     * * `user` - A reference to the user.
     */
    channelSessions: Map<string, Collection<ISocket>>;
    /**
     * A map of user collections connected to the separate channels.
     *
     * The keys of the map are channel IDs and the values are collections of users.
     */
    channelConnectedUsers: Map<string, Collection<ISocket>>;
    /**
     * A collection of users currently connected to all channels.
     *
     * A local user is always the first element in this collection.
     */
    allConnectedUsers: Collection<User>;
    /**
     * @inheritDoc
     */
    static get pluginName(): "Sessions";
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
    static get requires(): readonly [typeof WebSocketGateway, typeof Users];
    /**
     * @inheritDoc
     */
    constructor(context: Editor | Context);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Observes given service sessions and updates session and users according to it.
     */
    register(channelId: string, serviceSessions: SessionCollection): void;
    /**
     * Stops observing given service sessions and remove all related sessions and users.
     */
    unregister(channelId: string): void;
    /**
     * Session id of the current client.
     */
    get mySessionId(): string;
    /**
     * Returns a reference to the user connected with a session with the given ID.
     */
    getUserBySessionId(sessionId: string): ServerUser | undefined;
    /**
     * Returns a set of ids of all currently connected sessions for the given user.
     *
     * When one user is connected to the same document in two separate browser tabs
     * then this users belongs to the two sessions.
     *
     * Optionally the result can be limited to the given channelId.
     */
    getUserSessions(user: ServerUser, channelId?: string): Set<string>;
    /**
     * Returns the role of a given user.
     */
    getUserRole(user: ServerUser): string | undefined;
}
/**
 * Fired when the new user session is added.
 *
 * @eventName ~Sessions#sessionAdd:channelId
 */
export type SessionAddEvent = {
    name: 'sessionAdd' | `sessionAdd:${string}`;
    args: [
        {
            channelId: string;
            session: ISocket;
        }
    ];
};
