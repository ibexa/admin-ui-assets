/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/realtimecollaborativecomments
 * @publicApi
 */
import { Plugin } from 'ckeditor5/src/core.js';
import CloudServicesCommentsAdapter from './realtimecollaborativecomments/cloudservicescommentsadapter.js';
import RealTimeCollaborativeEditing from './realtimecollaborativeediting.js';
import WebSocketGateway from './realtimecollaborativeediting/websocketgateway.js';
/**
 * Enables the real-time collaborative comments feature.
 *
 * Check the {@glink features/collaboration/real-time-collaboration/real-time-collaboration-integration Real-time collaboration guide}
 * to see how to launch the editor in the real-time collaboration mode.
 */
export default class RealTimeCollaborativeComments extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly ["Comments", typeof CloudServicesCommentsAdapter, typeof RealTimeCollaborativeEditing, typeof WebSocketGateway];
    /**
     * @inheritDoc
     */
    static get pluginName(): "RealTimeCollaborativeComments";
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
    init(): Promise<void>;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
