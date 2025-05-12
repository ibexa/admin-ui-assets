/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { LocaleConfig, Users, Permissions } from './index.js';
import type { RealTimeCollaborationConfig, UsersConfig } from './config.js';
declare module '@ckeditor/ckeditor5-core' {
    interface EditorConfig {
        /**
         * The locale configuration of the editor.
         */
        locale?: LocaleConfig;
        /**
         * The users plugin configuration.
         */
        users?: UsersConfig;
        /**
         * The configuration of the real time collaboration feature.
         *
         * Read more in {@link module:collaboration-core/config~RealTimeCollaborationConfig}.
         *
         * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
         */
        collaboration?: RealTimeCollaborationConfig;
    }
    interface PluginsMap {
        [Permissions.pluginName]: Permissions;
        [Users.pluginName]: Users;
    }
}
