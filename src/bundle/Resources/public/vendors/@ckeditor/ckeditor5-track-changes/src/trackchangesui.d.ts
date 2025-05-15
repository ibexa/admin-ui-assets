/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/trackchangesui
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { Users } from 'ckeditor5-collaboration/src/collaboration-core.js';
import TrackChangesEditing from './trackchangesediting.js';
/**
 * Provides UI for track changes plugin.
 *
 * This plugin displays {@link module:track-changes/suggestion~Suggestion suggestions} as a
 * {@link module:comments/annotations/annotations~Annotations}.
 */
export default class TrackChangesUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof TrackChangesEditing, typeof Users, "CommentsRepository", "Annotations", "EditorAnnotations"];
    /**
     * @inheritDoc
     */
    static get pluginName(): "TrackChangesUI";
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
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
