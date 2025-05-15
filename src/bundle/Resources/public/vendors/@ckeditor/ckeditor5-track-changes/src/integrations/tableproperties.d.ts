/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/integrations/tableproperties
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import type { Range } from 'ckeditor5/src/engine.js';
import type { default as Suggestion } from '../suggestion.js';
import type { Description } from '../suggestiondescriptionfactory.js';
/**
 * Provides track changes plugin integration for table properties feature.
 */
export default class TrackChangesTableProperties extends Plugin {
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    static get pluginName(): "TrackChangesTableProperties";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * @inheritDoc
     */
    afterInit(): void;
    handleDiscardAction(properties: Array<string>, ranges: Array<Range>, data: any): void;
    handleSuggestionDescription(suggestion: Suggestion): Description | undefined;
}
