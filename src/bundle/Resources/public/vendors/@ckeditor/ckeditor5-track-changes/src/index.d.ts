/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
export { default as TrackChanges, type SuggestionData, type TrackChangesAdapter } from './trackchanges.js';
export { default as TrackChangesData } from './trackchangesdata.js';
export { default as TrackChangesEditing, type AttributeData, type FormatData } from './trackchangesediting.js';
export { default as TrackChangesPreview } from './trackchangespreview.js';
export { default as Suggestion, type SuggestionJSON } from './suggestion.js';
export { default as BaseSuggestionThreadView } from './ui/view/basesuggestionthreadview.js';
export { default as SuggestionThreadView } from './ui/view/suggestionthreadview.js';
export { default as SuggestionView } from './ui/view/suggestionview.js';
export type { Description } from './suggestiondescriptionfactory.js';
export type { TrackChangesConfig } from './trackchangesconfig.js';
export type { default as AcceptSuggestionCommand } from './commands/acceptsuggestioncommand.js';
export type { default as DiscardSuggestionCommand } from './commands/discardsuggestioncommand.js';
export type { default as ExecuteOnAllSuggestionsCommand } from './commands/executeonallsuggestionscommand.js';
export type { default as ExecuteOnSelectedSuggestionsCommand } from './commands/executeonselectedsuggestionscommand.js';
export type { default as TrackChangesCommand } from './commands/trackchangescommand.js';
export type { default as PreviewFinalContentCommand } from './commands/previewfinalcontentcommand.js';
import './augmentation.js';
