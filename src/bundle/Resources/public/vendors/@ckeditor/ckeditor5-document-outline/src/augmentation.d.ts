/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { DocumentOutline, DocumentOutlineUtils, DocumentOutlineConfig, DocumentOutlineUI, TableOfContents, TableOfContentsCommand, TableOfContentsEditing, TableOfContentsUI, HeadingId } from './index.js';
declare module '@ckeditor/ckeditor5-core' {
    interface EditorConfig {
        /**
         * The configuration of the {@link module:document-outline/documentoutline~DocumentOutline} feature.
         *
         * Read more in {@link module:document-outline/documentoutline~DocumentOutlineConfig}.
         */
        documentOutline?: DocumentOutlineConfig;
    }
    interface PluginsMap {
        [DocumentOutline.pluginName]: DocumentOutline;
        [DocumentOutlineUI.pluginName]: DocumentOutlineUI;
        [DocumentOutlineUtils.pluginName]: DocumentOutlineUtils;
        [TableOfContents.pluginName]: TableOfContents;
        [TableOfContentsEditing.pluginName]: TableOfContentsEditing;
        [TableOfContentsUI.pluginName]: TableOfContentsUI;
        [HeadingId.pluginName]: HeadingId;
    }
    interface CommandsMap {
        insertTableOfContents: TableOfContentsCommand;
    }
}
