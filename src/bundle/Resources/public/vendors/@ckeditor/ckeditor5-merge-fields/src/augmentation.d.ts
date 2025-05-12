/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { MergeFields, MergeFieldsEditing, MergeFieldsUI } from './index.js';
import type InsertMergeFieldCommand from './insertmergefieldcommand.js';
import type InsertMergeFieldImageCommand from './insertmergefieldimagecommand.js';
import type InsertMergeFieldBlockCommand from './insertmergefieldblockcommand.js';
import type PreviewMergeFieldsCommand from './previewmergefieldscommand.js';
import type { MergeFieldsConfig } from './mergefieldsconfig.js';
declare module '@ckeditor/ckeditor5-core' {
    interface EditorConfig {
        /**
         * Configuration for the merge fields feature.
         */
        mergeFields?: MergeFieldsConfig;
    }
    interface PluginsMap {
        [MergeFields.pluginName]: MergeFields;
        [MergeFieldsEditing.pluginName]: MergeFieldsEditing;
        [MergeFieldsUI.pluginName]: MergeFieldsUI;
    }
    interface CommandsMap {
        insertMergeField: InsertMergeFieldCommand;
        insertMergeFieldBlock: InsertMergeFieldBlockCommand;
        insertMergeFieldImage: InsertMergeFieldImageCommand;
        previewMergeFields: PreviewMergeFieldsCommand;
    }
}
