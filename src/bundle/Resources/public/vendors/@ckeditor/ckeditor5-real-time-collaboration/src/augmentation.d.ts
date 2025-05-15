/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { PresenceListConfig } from './config.js';
import type { RealTimeCollaborativeEditing, RealTimeCollaborativeTrackChanges, RealTimeCollaborativeComments, RealTimeCollaborativeRevisionHistory, CloudServicesCommentsAdapter, CloudServicesTrackChangesAdapter, CloudServicesRevisionHistoryAdapter, RealTimeCollaborationClient } from './index.js';
declare module '@ckeditor/ckeditor5-core' {
    interface EditorConfig {
        presenceList?: PresenceListConfig;
    }
    interface PluginsMap {
        [RealTimeCollaborativeEditing.pluginName]: RealTimeCollaborativeEditing;
        [RealTimeCollaborativeTrackChanges.pluginName]: RealTimeCollaborativeTrackChanges;
        [RealTimeCollaborativeComments.pluginName]: RealTimeCollaborativeComments;
        [RealTimeCollaborativeRevisionHistory.pluginName]: RealTimeCollaborativeRevisionHistory;
        [CloudServicesCommentsAdapter.pluginName]: CloudServicesCommentsAdapter;
        [CloudServicesTrackChangesAdapter.pluginName]: CloudServicesTrackChangesAdapter;
        [CloudServicesRevisionHistoryAdapter.pluginName]: CloudServicesRevisionHistoryAdapter;
        [RealTimeCollaborationClient.pluginName]: RealTimeCollaborationClient;
    }
}
declare module '@ckeditor/ckeditor5-cloud-services' {
    interface CloudServicesConfig {
        /**
         * The timeout (in seconds) for the connection. Defaults to 10.
         *
         * If the connection will not be established after the specified number of second passes, the editor will throw an error.
         *
         * Raise this value if you are experiencing connection timeout problems.
         *
         * ```ts
         * ClassicEditor
         * 	.create( {
         * 		cloudServices: {
         * 			connectionTimeout: 20,
         * 			// ...
         * 		}
         * 	} )
         * 	.then( ... )
         * 	.catch( ... );
         * ```
         */
        connectionTimeout?: number;
        /**
         * The timeout (in seconds) for each request send to the Cloud Services. Defaults to 20.
         *
         * If the request is not finished after the specified number of second passes, the editor will throw an error.
         *
         * Raise this value if you expect that your requests will be big
         * (e.g. mostly concerns the document data and the initial request).
         *
         * ```ts
         * ClassicEditor
         * 	.create( {
         * 		cloudServices: {
         * 			requestTimeout: 40,
         * 			// ...
         * 		}
         * 	} )
         * 	.then( ... )
         * 	.catch( ... );
         * ```
         */
        requestTimeout?: number;
    }
}
declare module 'ckeditor5-collaboration/src/collaboration-core' {
    interface User {
        orderNumber?: number;
    }
}
