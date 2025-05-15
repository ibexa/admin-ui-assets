/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/presencelist/presencelistui
 * @publicApi
 */
import { ContextPlugin, type Context, type Editor } from 'ckeditor5/src/core.js';
import Sessions from '../realtimecollaborativeediting/sessions.js';
/**
 * The `PresenceListUI` plugin is a part of the {@link module:real-time-collaboration/presencelist~PresenceList}
 * and handles the UI part of the plugin.
 *
 * The presence list UI has two main modes of displaying users list:
 *
 * * inline (default), which shows users next to each other, and
 * * collapsed, which shows users in a dropdown.
 *
 * By default, the list also displays the {@link module:collaboration-core/users~Users#me local user}.
 */
export default class PresenceListUI extends ContextPlugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "PresenceListUI";
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
    constructor(context: Context | Editor);
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Sessions];
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Creates and shows dropdown list with all connected users.
     */
    showDropdown(): void;
    /**
     * Hides and destroys dropdown list with all connected users.
     */
    hideDropdown(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
