/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/utils/utils
 */
import type { Command } from 'ckeditor5/src/core.js';
import type { DocumentSelection, Model } from 'ckeditor5/src/engine.js';
import type Suggestion from '../suggestion.js';
import type { Description } from '../suggestiondescriptionfactory.js';
/**
 * Used in tests for easy suggestion comparison.
 */
export declare function normalizeDescription(description: Array<Description> | Description): string;
/**
 * Renders a rich HTML description out of primitive description string.
 */
export declare function renderDescription(description: string, color?: {
    value: string;
    title: string;
}): string;
export declare function sortSuggestions(suggestions: Array<Suggestion>): Array<Suggestion>;
/**
 * From the list of passed `suggestions` returns those that are selected by given `selection`.
 */
export declare function getSelectedSuggestions(selection: DocumentSelection, suggestions: Array<Suggestion>): Set<Suggestion>;
/**
 * How many suggestion actions should be put into one batch when multiple suggestions are accepted or discarded.
 */
export declare const MAX_SUGGESTION_ACTIONS_IN_BATCH = 100;
/**
 * Executes given `command` for given `suggestions`. If there is a lot of suggestions, the command executions is split into batches.
 * There is at most `MAX_SUGGESTION_ACTIONS_IN_BATCH` exeuctions in one batch. As a result, this limits number of actions to be done
 * in one undo step but may create multiple undo steps.
 */
export declare function executeCommandForSuggestions(model: Model, command: Command, suggestions: Array<Suggestion>): void;
