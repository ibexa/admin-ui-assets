/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/integrations/tablecolumnresize
 */
import { Plugin } from 'ckeditor5/src/core.js';
import type { Element } from 'ckeditor5/src/engine.js';
import type Suggestion from '../suggestion.js';
import type { Description } from '../suggestiondescriptionfactory.js';
/**
 * Provides track changes plugin integration for table column resize feature.
 */
export default class TrackChangesTableColumnResize extends Plugin {
    /**
     * @inheritDoc
     */
    afterInit(): void;
    handleResizeTableWidthCommand(executeCommand: Function, options: {
        table?: Element;
        tableWidth?: string;
        columnWidths?: string;
    }): void;
    handleSuggestionDescription(suggestion: Suggestion): Description | undefined;
}
