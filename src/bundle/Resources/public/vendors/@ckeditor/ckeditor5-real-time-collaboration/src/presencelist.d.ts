/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/presencelist
 * @publicApi
 */
import { ContextPlugin } from 'ckeditor5/src/core.js';
import Sessions from './realtimecollaborativeediting/sessions.js';
import PresenceListUI from './presencelist/presencelistui.js';
/**
 * The `PresenceList` plugin provides a UI which displays all {@link module:collaboration-core/users~Users users} that are
 * currently connected to the edited document. The users are displayed as a row of avatars.
 * The information about the users is provided by
 * [CKEditor Cloud Services](https://ckeditor.com/docs/cs/latest/developer-resources/security/token-endpoint.html#user).
 *
 * The presence list UI collapses to a dropdown if six or more users are connected.
 */
export default class PresenceList extends ContextPlugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Sessions, typeof PresenceListUI];
    /**
     * @inheritDoc
     */
    static get pluginName(): "PresenceList";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
}
