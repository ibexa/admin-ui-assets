/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/commentsarchive
 * @publicApi
 */
import { ContextPlugin, type Context, type Editor } from 'ckeditor5/src/core.js';
import { Collection } from 'ckeditor5/src/utils.js';
import CommentsRepository, { type CommentThread } from './commentsrepository.js';
import Annotations from '../annotations/annotations.js';
/**
 * This plugin handles all operations on archived threads needed for the comments archive.
 */
export default class CommentsArchive extends ContextPlugin {
    archivedThreads: Collection<CommentThread>;
    /**
     * @inheritDoc
     */
    static get pluginName(): "CommentsArchive";
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
    static get requires(): readonly [typeof CommentsRepository, typeof Annotations];
    constructor(context: Context | Editor);
    /**
     * @inheritDoc
     */
    init(): void;
}
