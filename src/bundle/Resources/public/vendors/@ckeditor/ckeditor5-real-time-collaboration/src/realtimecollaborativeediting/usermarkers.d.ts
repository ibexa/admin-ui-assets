/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Plugin } from 'ckeditor5/src/core.js';
import Sessions from './sessions.js';
import '../../theme/usermarkers.css';
/**
 * This plugin:
 *
 * 1. Creates marker operations with current user selection on demand.
 * 2. Renders clients selection markers.
 *
 * This plugin does not create markers automatically, instead it provides an API for it {@link #createUserMarkerOperations}.
 * {@link RealTimeCollaborationClient} uses this API to create user selection operations in the most optimal moment
 * (as the last operation in the operations package) - this is to reach the best compression result.
 */
export default class UserMarkers extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Sessions];
    /**
     * @inheritDoc
     */
    static get pluginName(): "UserMarkers";
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
    init(): void;
    afterInit(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Creates marker operations with current user selection.
     */
    createUserMarkerOperations(): void;
}
