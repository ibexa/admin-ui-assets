/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/integrations/legacylistproperties
 */
import { Plugin } from 'ckeditor5/src/core.js';
import type { Description } from '../suggestiondescriptionfactory.js';
import type Suggestion from '../suggestion.js';
/**
  * Provides track changes plugin integration for list properties feature.
  */
export default class TrackChangesListProperties extends Plugin {
    /**
      * @inheritDoc
      */
    afterInit(): void;
    handleListStyleCommand(executeCommand: Function, options?: {
        type?: string | null;
    }): void;
    handleListReversedCommand(executeCommand: Function, options?: {
        reversed?: boolean;
    }): void;
    handleListStartCommand(executeCommand: Function, options?: {
        startIndex?: number;
    }): void;
    handleDescriptions(suggestion: Suggestion): Description | undefined;
}
