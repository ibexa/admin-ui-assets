/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/integrations/inputcommand/inputcommand
 */
import { Plugin } from 'ckeditor5/src/core.js';
import { Input } from 'ckeditor5/src/typing.js';
/**
 * Provides track changes plugin integration for {@link module:typing/inputcommand~InputCommand input command}.
 */
export default class TrackChangesInputCommand extends Plugin {
    static get requires(): readonly [typeof Input];
    init(): void;
}
