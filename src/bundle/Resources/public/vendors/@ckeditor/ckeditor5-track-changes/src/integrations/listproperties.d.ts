/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/integrations/listproperties
 */
import { Plugin } from 'ckeditor5/src/core.js';
import type { Description } from '../suggestiondescriptionfactory.js';
import type Suggestion from '../suggestion.js';
/**
  * Provides track changes plugin integration for document list properties feature.
  */
export default class TrackChangesDocumentListProperties extends Plugin {
    /**
      * @inheritDoc
      */
    afterInit(): void;
    handleDescriptions(suggestion: Suggestion): Description | undefined;
}
