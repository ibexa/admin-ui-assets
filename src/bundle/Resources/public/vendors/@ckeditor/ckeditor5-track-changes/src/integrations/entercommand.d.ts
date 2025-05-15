/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/integrations/entercommand
 */
import { Plugin } from 'ckeditor5/src/core.js';
import { Enter } from 'ckeditor5/src/enter.js';
/**
 * Provides track changes plugin integration for {@link module:enter/entercommand~EnterCommand enter command}.
 */
export default class TrackChangesEnterCommand extends Plugin {
    static get requires(): readonly [typeof Enter];
    init(): void;
}
