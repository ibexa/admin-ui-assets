/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module alignment/alignment
 */
import { Plugin } from 'ckeditor5/src/core';
import AlignmentEditing from './alignmentediting';
import AlignmentUI from './alignmentui';
/**
 * The text alignment plugin.
 *
 * For a detailed overview, check the {@glink features/text-alignment Text alignment feature documentation}
 * and the {@glink api/alignment package page}.
 *
 * This is a "glue" plugin which loads the {@link module:alignment/alignmentediting~AlignmentEditing} and
 * {@link module:alignment/alignmentui~AlignmentUI} plugins.
 */
export default class Alignment extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [AlignmentEditing, AlignmentUI];
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'Alignment';
    }
}
