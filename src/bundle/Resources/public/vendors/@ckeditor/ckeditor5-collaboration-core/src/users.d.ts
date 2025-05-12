/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/users
 * @publicApi
 */
import { ContextPlugin, type Context, type Editor } from 'ckeditor5/src/core.js';
import { Collection } from 'ckeditor5/src/utils.js';
import Permissions from './permissions.js';
import '../theme/usercolors.css';
/**
 * The `Users` plugin provides the basic interface for setting and getting users involved in the document editing process.
 */
export default class Users extends ContextPlugin {
    /**
     * Holds all {@link module:collaboration-core/users~User users} added to the editor.
     *
     * Note, that the {@link module:collaboration-core/users~User#isAnonymous anonymous user} is always present in the editor.
     * You may want to filter it out when processing the users lists.
     *
     * ```ts
     * for ( const user of editor.plugins.get( 'Users' ).users ) {
     *     if ( !user.isAnonymous ) {
     *         console.log( user.name );
     *     }
     * }
     * ```
     *
     * Use {@link #addUser} to add a new user.
     */
    readonly users: Collection<User>;
    /**
     * @inheritDoc
     */
    static get pluginName(): "Users";
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
    static get requires(): readonly [typeof Permissions];
    /**
     * @inheritDoc
     */
    constructor(context: Context | Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * A reference to the local user or `null` if it has not been set.
     */
    get me(): User | null;
    /**
     * Adds a new user to the list of users.
     */
    addUser({ id, name, ...additionalData }: Partial<UserData>): User;
    /**
     * Returns the user with a given ID.
     */
    getUser(id: string): User | null;
    /**
     * Sets an {@link module:collaboration-core/users~User#isAnonymous anonymous user} as {@link #me the local user}.
     *
     * The local user ID will be set to the value of `config.users.anonymousUserId` property. All actions performed by the local user
     * will be contributed to the anonymous user.
     */
    useAnonymousUser(): void;
    /**
     * Sets the user with the given ID as the local user ({@link #me}).
     *
     * The local user can be only set once (this includes setting anonymous as the local user).
     */
    defineMe(userId: string): void;
    /**
     * Returns the author of the operation. It returns {@link #me} by default if it is not overwritten.
     */
    getOperationAuthor(): User | null;
}
/**
 * The representation of a single user that is involved in document editing.
 */
export declare class User {
    /**
     * The ID of the user.
     */
    id: string;
    /**
     * CSS colors classes object for the user.
     */
    color: Color;
    /**
     * The name of the user.
     */
    name: string;
    /**
     * The initials of the user.
     *
     * By default, the initials are composed of the user name's first and last words ignoring non-characters parts:
     *
     * * for `Joe Doe`, the initials are `JD`,
     * * for `Joe Doe (admin)`, the initials are `JD`,
     * * for `Anonymous` the initials are `A`,
     * * for `Katie John-Newman` the initials are `KJ`,
     * * for `Adam Daniel Smith` the initials are `AS`.
     *
     * The initials can be configured by
     * {@link module:collaboration-core/config~UsersConfig#getInitialsCallback `UserConfig#getInitialsCallback`}.
     */
    readonly initials: string;
    /**
     * The URL pointing to the image with the avatar of the user.
     *
     * If avatar is not set, default avatar is used.
     */
    avatar: string | undefined;
    /**
     * @param data User data.
     * @param data.id The ID of the user.
     * @param data.color A helper object to generate CSS classes with the user color in the UI.
     * @param data.name The name of the user.
     * @param data.avatar The URL to the user avatar.
     * @param getInitialsCallback The custom callback configured via the editor configuration to calculate the initials.
     */
    constructor(data: UserData, getInitialsCallback?: (name: string) => string);
    /**
     * Is `true` for the anonymous user, `false` otherwise.
     *
     * The anonymous user is used when there is no defined user for given resource.
     *
     * The situations when the anonymous user is used will depend on your application. For example, it can be used when the editor can be
     * used by "guest" users of your application, or when the original user's account was removed.
     */
    get isAnonymous(): boolean;
    /**
     * Is `true` for the {@link module:collaboration-core/users~Users#me local user}.
     */
    get isMe(): boolean;
}
/**
 * The color object used to generate specified CSS classes with an individual color number assigned to the user.
 */
declare class Color {
    constructor(colorId: number);
    /**
     * Returns CSS class for user avatar background color.
     */
    getBackgroundColorClass(): string;
    /**
     * Returns CSS class for user selection highlight (the selected range).
     */
    getSelectionClass(): string;
    /**
     * Returns CSS class for user caret position element (the pipe).
     */
    getMarkerClass(): string;
}
type UserData = {
    id: string;
    color: Color;
    name: string;
    avatar?: string;
    _isAnonymous?: boolean;
};
export {};
