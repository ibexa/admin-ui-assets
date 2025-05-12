/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/integrations/multilevellist
 */
import { Plugin } from 'ckeditor5/src/core.js';
import type Suggestion from '../suggestion.js';
import type { Description } from '../suggestiondescriptionfactory.js';
/**
 * Provides track changes plugin integration for multi-level list feature.
 */
export default class TrackChangesMultiLevelList extends Plugin {
    /**
     * @inheritDoc
     */
    afterInit(): void;
    /**
     * Returns a custom description for a suggestion in case of adding or removing `listMarkerStyle` attribute.
     * Returns an empty description if the change is already covered by a `listType` attribute suggestion.
     */
    handleDescriptions(suggestion: Suggestion): Description | undefined;
}
