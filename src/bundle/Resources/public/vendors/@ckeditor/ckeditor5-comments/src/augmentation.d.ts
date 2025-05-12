/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { CommentsConfig, SidebarConfig, Annotations, AnnotationsUIs, EditorAnnotations, InlineAnnotations, WideSidebar, NarrowSidebar, Comments, CommentsRepository, CommentsUI, CommentsOnly, CommentsArchive, CommentsArchiveUI } from './index.js';
declare module '@ckeditor/ckeditor5-core' {
    interface EditorConfig {
        /**
         * The configuration of the comments feature.
         * Introduced by the {@link module:comments/comments~Comments} feature.
         *
         * Read more in {@link module:comments/config~CommentsConfig}.
         *
         * ```ts
         * ClassicEditor
         * 	.create( {
         * 		comments: ... // Locale editor configuration.
         * 	} )
         * 	.then( ... )
         * 	.catch( ... );
         * ```
         *
         * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
         */
        comments?: CommentsConfig;
        /**
         * The configuration of the sidebar feature.
         * Introduced by the {@link module:comments/annotations/sidebar~Sidebar} feature.
         */
        sidebar?: SidebarConfig;
        /**
         * Enables {@link module:comments/commentsonly~CommentsOnly comments-only mode} when the editor initializes.
         *
         * ```ts
         * ClassicEditor
         * 	.create( {
         * 		commentsOnly: true
         * 	} )
         * 	.then( ... )
         * 	.catch( ... );
         * ```
         */
        commentsOnly?: boolean;
    }
    interface PluginsMap {
        [Annotations.pluginName]: Annotations;
        [AnnotationsUIs.pluginName]: AnnotationsUIs;
        [EditorAnnotations.pluginName]: EditorAnnotations;
        [InlineAnnotations.pluginName]: InlineAnnotations;
        [WideSidebar.pluginName]: WideSidebar;
        [NarrowSidebar.pluginName]: NarrowSidebar;
        [Comments.pluginName]: Comments;
        [CommentsRepository.pluginName]: CommentsRepository;
        [CommentsUI.pluginName]: CommentsUI;
        [CommentsOnly.pluginName]: CommentsOnly;
        [CommentsArchive.pluginName]: CommentsArchive;
        [CommentsArchiveUI.pluginName]: CommentsArchiveUI;
    }
}
