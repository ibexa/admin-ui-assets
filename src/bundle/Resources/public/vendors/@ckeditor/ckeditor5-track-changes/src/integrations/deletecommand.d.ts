/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/integrations/deletecommand
 */
import { Plugin } from 'ckeditor5/src/core.js';
import { Delete } from 'ckeditor5/src/typing.js';
/**
 * Provides track changes plugin integration for {@link module:typing/inputcommand~DeleteCommand delete command}. Also
 * provides integration {@link module:engine/model/model~Model#deleteContent} as many features use it internally.
 */
export default class TrackChangesDeleteCommand extends Plugin {
    static get requires(): readonly [typeof Delete];
    init(): void;
}
