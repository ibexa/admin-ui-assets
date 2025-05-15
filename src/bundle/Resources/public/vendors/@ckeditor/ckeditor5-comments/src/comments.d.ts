/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments
 * @publicApi
 */
import { Plugin } from 'ckeditor5/src/core.js';
import CommentsRepository from './comments/commentsrepository.js';
import CommentsEditing from './comments/commentsediting.js';
import CommentsUI from './comments/commentsui.js';
import CommentsOnly from './commentsonly.js';
import WideSidebar from './annotations/widesidebar.js';
import NarrowSidebar from './annotations/narrowsidebar.js';
import InlineAnnotations from './annotations/inlineannotations.js';
import CommentsArchiveUI from './comments/commentsarchiveui.js';
import CommentsArchive from './comments/commentsarchive.js';
/**
 * The comments plugin, which brings both the UI part and the editing part of this feature.
 *
 * It registers {@link module:comments/comments/addcommentthreadcommand~AddCommentThreadCommand the `AddCommentThreadCommand` command}.
 *
 * To learn more about the comments feature refer to the {@glink features/collaboration/comments/comments Comments} guide.
 */
export default class Comments extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof CommentsRepository, typeof CommentsEditing, typeof CommentsUI, typeof CommentsArchive, typeof CommentsArchiveUI, typeof CommentsOnly, typeof WideSidebar, typeof NarrowSidebar, typeof InlineAnnotations];
    /**
     * @inheritDoc
     */
    static get pluginName(): "Comments";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
}
