/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module merge-fields/mergefields
 * @publicApi
 */
import { Plugin } from 'ckeditor5/src/core.js';
import MergeFieldsEditing from './mergefieldsediting.js';
import MergeFieldsUI from './mergefieldsui.js';
/**
 * The merge fields feature.
 *
 * For a detailed overview, check the {@glink features/merge-fields Merge fields} feature documentation.
 *
 * @extends module:core/plugin~Plugin
 */
export default class MergeFields extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof MergeFieldsEditing, typeof MergeFieldsUI];
    /**
     * @inheritDoc
     */
    static get pluginName(): "MergeFields";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
}
