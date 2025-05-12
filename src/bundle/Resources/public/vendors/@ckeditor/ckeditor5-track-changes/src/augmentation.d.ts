/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { TrackChanges, TrackChangesData, TrackChangesEditing, TrackChangesConfig, AcceptSuggestionCommand, DiscardSuggestionCommand, ExecuteOnAllSuggestionsCommand, ExecuteOnSelectedSuggestionsCommand, TrackChangesCommand, PreviewFinalContentCommand, TrackChangesPreview } from './index.js';
import type { Editor } from 'ckeditor5/src/core.js';
declare module '@ckeditor/ckeditor5-core' {
    interface EditorConfig {
        /**
         * The configuration of the {@link module:track-changes/trackchanges~TrackChanges} feature.
         *
         * Read more in {@link module:track-changes/trackchangesconfig~TrackChangesConfig}.
         */
        trackChanges?: TrackChangesConfig;
        /**
         * The configuration of the track changes data feature.
         */
        trackChangesData?: {
            /**
             * Callback that creates an editor instances.
             *
             * Used in non-standard integrations. See track changes data
             * {@glink features/collaboration/track-changes/track-changes-data#configuring-track-changes-data-plugin configuration guide}.
             */
            editorCreator?: (config: EditorConfig, createElement: Function) => Promise<Editor>;
        };
    }
    interface PluginsMap {
        [TrackChanges.pluginName]: TrackChanges;
        [TrackChangesData.pluginName]: TrackChangesData;
        [TrackChangesEditing.pluginName]: TrackChangesEditing;
        [TrackChangesPreview.pluginName]: TrackChangesPreview;
    }
    interface CommandsMap {
        acceptSuggestion: AcceptSuggestionCommand;
        discardSuggestion: DiscardSuggestionCommand;
        acceptAllSuggestions: ExecuteOnAllSuggestionsCommand<AcceptSuggestionCommand>;
        discardAllSuggestions: ExecuteOnAllSuggestionsCommand<DiscardSuggestionCommand>;
        acceptSelectedSuggestions: ExecuteOnSelectedSuggestionsCommand<AcceptSuggestionCommand>;
        discardSelectedSuggestions: ExecuteOnSelectedSuggestionsCommand<DiscardSuggestionCommand>;
        trackChanges: TrackChangesCommand;
        previewFinalContent: PreviewFinalContentCommand;
    }
}
