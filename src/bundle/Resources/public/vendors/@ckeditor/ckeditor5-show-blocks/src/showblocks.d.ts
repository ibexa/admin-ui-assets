/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module show-blocks/showblocks
 */
import { Plugin } from 'ckeditor5/src/core.js';
import ShowBlocksEditing from './showblocksediting.js';
import ShowBlocksUI from './showblocksui.js';
/**
 * The show blocks feature.
 *
 * For a detailed overview, check the {@glink features/show-blocks Show blocks} feature guide.
 */
export default class ShowBlocks extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "ShowBlocks";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof ShowBlocksEditing, typeof ShowBlocksUI];
}
