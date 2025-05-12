/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/trackchanges
 * @publicApi
 */
import { Plugin } from 'ckeditor5/src/core.js';
import TrackChangesUI from './trackchangesui.js';
import TrackChangesEditing from './trackchangesediting.js';
import 'ckeditor5-collaboration/src/collaboration-core.js';
import type { default as Suggestion, SuggestionJSON } from './suggestion.js';
/**
 * A plugin that provides track changes mode for the editor. In track changes mode, all insertions are visually marked and all deletions
 * are not deleted but also visually marked. Unsupported commands are disabled when the editor is in the track changes mode.
 *
 * To learn how to integrate the track changes feature with your editor, refer to the
 * {@glink features/collaboration/track-changes/track-changes-integration Track changes integration} guide.
 *
 * Basic API:
 *
 * ```ts
 * // Get the track changes plugin:
 * const trackChangesPlugin = editor.plugins.get( 'TrackChanges' );
 *
 * // Add a suggestion:
 * trackChangesPlugin.addSuggestion( suggestionData );
 *
 * // Get all suggestions:
 * trackChangesPlugin.getSuggestions();
 *
 * // Set the adapter:
 * trackChangesPlugin.adapter = {
 * 		// ...
 * }
 * ```
 *
 * The plugin registers several commands:
 *
 * * `trackChanges` &ndash; Toggles the track changes mode in the editor.
 * * `acceptSuggestion` &ndash; Accepts a suggestion with the specified ID.
 * * `discardSuggestion` &ndash; Discards a suggestion with the specified ID.
 * * `acceptAllSuggestions` &ndash; Accepts all suggestions.
 * * `discardAllSuggestions` &ndash; Discards all suggestions.
 * * `acceptSelectedSuggestions` &ndash; Accepts all suggestions in the current selection.
 * * `discardSelectedSuggestions` &ndash; Discards all suggestions in the current selection.
 *
 * Examples:
 *
 * ```ts
 * editor.execute( 'trackChanges' );
 * editor.execute( 'acceptSuggestion', 'suggestion-1' );
 * editor.execute( 'discardSuggestion', 'suggestion-1' );
 * editor.execute( 'acceptAllSuggestions' );
 * editor.execute( 'discardAllSuggestions' );
 * editor.execute( 'acceptSelectedSuggestions' );
 * editor.execute( 'discardSelectedSuggestions' )
 * ```
 *
 * Note that there is no command to add a suggestion. This is because suggestions
 * are added automatically when editing commands are executed while the editor is in track
 * changes mode. For instance:
 *
 * ```ts
 * // Turn on the track changes mode:
 * editor.execute( 'trackChanges' );
 *
 * // Insert some text. It will be automatically inserted as a suggestion:
 * editor.execute( 'input', { text: 'foo' } );
 * ```
 */
export default class TrackChanges extends Plugin {
    static get requires(): readonly [typeof TrackChangesEditing, typeof TrackChangesUI, "Comments"];
    static get pluginName(): "TrackChanges";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * An adapter object that should communicate with the data source to fetch or save the suggestion data.
     *
     * This is a shorthand to {@link module:track-changes/trackchangesediting~TrackChangesEditing#adapter `TrackChangesEditing#adapter`}.
     */
    set adapter(adapter: TrackChangesAdapter | null);
    get adapter(): TrackChangesAdapter | null;
    /**
     * Adds suggestion data.
     *
     * Use this method to load the suggestion data during the editor initialization if you do not use the adapter integration.
     */
    addSuggestion(suggestionData: SuggestionData): Suggestion;
    getSuggestions(options: {
        skipNotAttached?: boolean;
        toJSON: true;
    }): Array<SuggestionJSON>;
    getSuggestions(options?: {
        skipNotAttached?: boolean;
        toJSON?: false;
    }): Array<Suggestion>;
    getSuggestions(options: {
        skipNotAttached?: boolean;
        toJSON: boolean;
    }): Array<Suggestion> | Array<SuggestionJSON>;
    /**
     * Returns the suggestion instance for a given ID.
     */
    getSuggestion(id: string): Suggestion;
}
/**
 * Track changes adapter.
 *
 * The track changes adapter is an object that communicates asynchronously with the data source to fetch or save the suggestion data.
 * It is used internally by the track changes feature whenever a suggestion is loaded, created or deleted.
 *
 * The adapter is optional. You might need to provide it if you are {@glink features/collaboration/track-changes/track-changes-integration}
 * using the track changes feature without real-time collaboration.
 *
 * To set the adapter, overwrite {@link module:track-changes/trackchanges~TrackChanges#adapter the `TrackChanges#adapter` property}.
 */
export interface TrackChangesAdapter {
    /**
     * Called each time the suggestion data is needed.
     *
     * The method should return a promise that resolves with the suggestion data object.
     *
     * @param id The ID of the suggestion to get.
     */
    getSuggestion(id: string): Promise<SuggestionData>;
    /**
     * Called each time a new suggestion is created.
     *
     * The method should save the suggestion data in the database
     * and return a promise that should be resolved when the save is
     * completed.
     *
     * If the promise resolves with an object with the `createdAt` property,
     * this suggestion property will be updated in the suggestion in the editor.
     * This lets you update the suggestion data with server-side information.
     *
     * The `suggestionData` object does not expect the `authorId` property.
     * For security reasons, the author of the suggestion should be set
     * on the server side.
     *
     * If `suggestionData.originalSuggestionId` is set, the new suggestion should
     * have the `authorId` property set to the same as the suggestion with
     * `originalSuggestionId`. This happens when one user splits
     * another user's suggestion, creating a new suggestion as a result. See
     * {@glink features/collaboration/track-changes/track-changes-integration#implementation Track changes integration} guide.
     *
     * **Note:** Failure to properly handle this property will result in editor crash in some scenarios.
     *
     * In any other case, use the current (local) user to set `authorId`.
     *
     * The `suggestionData` object does not expect the `createdAt` property either.
     * You should use the server-side time generator to ensure that all users
     * see the same date.
     *
     * It is recommended to stringify `suggestionData.attributes` value to JSON and save it as a string in your database,
     * and then to parse the strings when loading suggestions.
     */
    addSuggestion(suggestionData: AddSuggestionInput): Promise<SuggestionData>;
    /**
     * Called each time the suggestion properties change.
     *
     * The method should update the suggestion properties in the database
     * and return a promise that should be resolved when the save is
     * completed.
     *
     * Keep in mind that the `data` parameter only contains those
     * properties of a suggestion which changed.
     */
    updateSuggestion(id: string, suggestionData: UpdateSuggestionInput): Promise<void>;
}
export interface SuggestionData extends SuggestionJSON {
    /**
     * Original suggestion ID from which the current one was split.
     */
    originalSuggestionId?: string | null;
}
export type AddSuggestionInput = Omit<SuggestionData, 'authorId' | 'createdAt'>;
export type UpdateSuggestionInput = Partial<Pick<SuggestionJSON, 'hasComments' | 'attributes'>> & {
    state?: 'open' | 'accepted' | 'rejected';
};
