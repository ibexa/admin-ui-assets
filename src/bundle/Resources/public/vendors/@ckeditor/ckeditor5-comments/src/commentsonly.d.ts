/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/commentsonly
 * @publicApi
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import CommentsEditing from './comments/commentsediting.js';
/**
 * The `CommentsOnly` plugin allows you to put the editor in a mode where a user can only add, edit or delete comments.
 *
 * Check the {@glink features/collaboration/comments/comments-only-mode Comments-only mode} guide to learn how to use this plugin.
 */
export default class CommentsOnly extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "CommentsOnly";
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
    static get requires(): readonly [typeof CommentsEditing];
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
