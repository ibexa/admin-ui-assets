/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { PaginationConfig, Pagination } from './index.js';
declare module '@ckeditor/ckeditor5-core' {
    interface EditorConfig {
        /**
         * The configuration of the pagination feature. It is used by the pagination feature from the `@ckeditor/ckeditor5-pagination`
         * package.
         *
         * Read more in {@link module:pagination/pagination~PaginationConfig}.
         */
        pagination?: PaginationConfig;
    }
    interface PluginsMap {
        [Pagination.pluginName]: Pagination;
    }
}
