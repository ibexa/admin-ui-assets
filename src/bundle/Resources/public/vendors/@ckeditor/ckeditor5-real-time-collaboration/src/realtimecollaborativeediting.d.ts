/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/realtimecollaborativeediting
 * @publicApi
 */
import { Plugin } from 'ckeditor5/src/core.js';
import RealTimeCollaborationClient from './realtimecollaborativeediting/realtimecollaborationclient.js';
/**
 * Enables the real-time collaborative editing feature.
 *
 * Check the {@glink features/collaboration/real-time-collaboration/real-time-collaboration-integration Real-time collaboration} guide
 * to see how to launch the editor in the real-time collaboration mode.
 */
export default class RealTimeCollaborativeEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof RealTimeCollaborationClient];
    /**
     * @inheritDoc
     */
    static get pluginName(): "RealTimeCollaborativeEditing";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
}
