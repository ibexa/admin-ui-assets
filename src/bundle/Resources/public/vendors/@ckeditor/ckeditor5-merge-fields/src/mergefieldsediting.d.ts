/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { type Element } from 'ckeditor5/src/engine.js';
import type { MergeFieldDefinition, MergeFieldType } from './mergefieldsconfig.js';
/**
 * The merge fields editing feature.
 */
export default class MergeFieldsEditing extends Plugin {
    /**
     * The current preview mode for merge fields. Determines the merge field values displayed in the editor.
     *
     * @observable
     */
    previewMode: string;
    /**
     * All configured preview modes, available to be set as a value for {@link #previewMode}.
     */
    readonly availablePreviewModes: Array<string>;
    /**
     * A flat list of all merge field definitions.
     */
    flattenedMergeFieldDefinitions: Array<MergeFieldDefinition>;
    /**
     * @inheritDoc
     */
    static get requires(): readonly ["ImageUtils", "ImageEditing"];
    /**
     * @inheritDoc
     */
    static get pluginName(): "MergeFieldsEditing";
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
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    afterInit(): void;
    /**
     * Check if the given model element is a merge field.
     *
     * It is a merge field if:
     *
     * * it is a `mergeField` or `mergeFieldBlock` element.
     * * it is an `imageBlock` or `imageInline` element with a `src` attribute that matches the merge field pattern.
     */
    isMergeField(element: Element): boolean;
    /**
     * Returns an object with default merge fields values.
     *
     * Custom merge fields (created by user, not defined in the config) will be returned as well, and their value will be set to `null`.
     *
     * Values defined as functions are evaluated and their result is returned.
     */
    getDefaultValues(): MergeFieldsValues;
    /**
     * Returns an object with merge fields values defined for given data set.
     *
     * Custom merge fields (created by user, not defined in the config) will be returned as well, and their value will be set to `null`.
     *
     * Values defined as functions are evaluated and their result is returned.
     *
     * If the data set is not found, it throws an error.
     *
     * @param dataSetId
     * @param useDefaultValues If set to `true`, merge field default value will be used for these merge fields, for which the data
     * was not defined. If default value is not configured for given merge field, `null` will be still returned.
     */
    getDataSetValues(dataSetId: string, useDefaultValues?: boolean): MergeFieldsValues;
    /**
     * Retrieves the label for the merge field with the given id.
     *
     * If the merge field definition for given id was not found or a label was not specified, function returns `null`.
     */
    getLabel(id: string): string | null;
    /**
     * Returns the default value for the merge field with the given id.
     *
     * If the merge field default value was specified as a callback, it will be executed and the result will be returned.
     *
     * If the merge field definition for given id was not found, or a default value was not specified, `null` is returned.
     */
    getMergeFieldDefaultValue(id: string): string | null;
    /**
     * Returns the value specified for merge field with the given in given data set.
     *
     * If the merge field value was specified as a callback, it will be executed and the result will be returned.
     *
     * If the merge field definition for given id was not found, or the data set has no value for this merge field, `null` is returned.
     */
    getMergeFieldValue(id: string, dataSetId: string): string | null;
    /**
     * Returns the merge field type of the given element or id.
     *
     * Possible values are: `text`, `block`, `image` or `null` if the element is not a merge field.
     */
    getMergeFieldType(idOrElement: string | Element): MergeFieldType | null;
    /**
     * Returns the height of the merge field with the given id.
     *
     * If the merge field is of type `block` or `image` and the height is not specified, the default height is returned.
     *
     * If the merge field is of type `text`, `null` is returned.
     */
    getMergeFieldHeight(id: string): number | null;
    /**
     * Returns the width of the merge field with the given id.
     *
     * If the merge field is of type `image` and the width is not specified, the default width is returned.
     *
     * If the merge field is of type `text` or `block`, `null` is returned.
     */
    getMergeFieldWidth(id: string): number | null;
    /**
     * Returns ids of all merge fields that are present in the document.
     */
    getDocumentMergeFieldsIds(): Array<string>;
    /**
     * Returns ids of all merge fields defined in the configuration and custom merge fields added by the user that exist in the document.
     */
    getMergeFieldsIds(): Array<string>;
    /**
     * Returns the merge field definition for the given id.
     */
    getDefinition(id: string): MergeFieldDefinition | null;
    /**
     * Triggers the reconversion for all merge field elements in the editor content.
     *
     * It can be used for refreshing the values or default values defined through the callbacks.
     */
    refreshMergeFields(): void;
}
export type MergeFieldsValues = Record<string, string | null>;
