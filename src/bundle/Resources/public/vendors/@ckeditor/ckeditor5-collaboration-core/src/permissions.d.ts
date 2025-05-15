/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/permissions
 * @publicApi
 */
import { ContextPlugin } from 'ckeditor5/src/core.js';
/**
 * The `Permissions` plugin manages permissions set for the local user.
 *
 * Following is the list of all defined permissions:
 *
 * * `document:write` - modify the content of the document, and resolve comment threads created by any user,
 * * `comment:write` - create, edit and remove own comments and create, remove own comment threads,
 * and resolve comment threads created by any user,
 * * `comment:admin` - resolve and remove comment threads created by other users (enables `comment:write`).
 * * `comment:modify_all` - edit and remove any comments created by other users.
 *
 * For example, a user with `comment:write` permission but with no `document:write` permission will be able to add
 * comments but will not be able to change the document data (comments-only mode).
 *
 * By default, the following permissions are set: `document:write`, `comment:write`, `comment:admin`.
 *
 * Permissions are handled separately for each channel id (for each editor instance and context instance).
 *
 * See also the {@glink features/collaboration/users#user-permissions User permissions} guide to learn how to use this plugin.
 */
export default class Permissions extends ContextPlugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "Permissions";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * Sets permissions for editor/context instance with given `channelId`.
     *
     * If `channelId` is not set, the channel id of the editor/context to which the plugin was added will be used.
     * This means that it is not required if the plugin is added to the editor configuration and {@link module:core/context~Context}
     * is not used.
     *
     * @param permissions Permissions to set.
     * @param channelId The channel ID.
     */
    setPermissions(permissions: Array<string>, channelId?: string): void;
}
