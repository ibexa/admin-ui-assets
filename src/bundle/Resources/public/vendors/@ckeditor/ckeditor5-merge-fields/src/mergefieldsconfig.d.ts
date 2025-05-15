/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module merge-fields/mergefieldsconfig
 * @publicApi
 */
import type { Editor } from 'ckeditor5/src/core.js';
/**
 * The configuration of the merge fields feature.
 *
 * The properties defined in this config are set in the `config.mergeFields` namespace.
 *
 * ```ts
 * ClassicEditor
 * 	.create( editorElement, {
 * 		mergeFields: {
 * 			// Merge fields configuration.
 * 		}
 * 	} )
 * 	.then( ... )
 * 	.catch( ... );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 */
export interface MergeFieldsConfig {
    /**
     * The definitions of the merge fields that can be used in the editor.
     * It's allowed to define them in any combination of groups and individual merge fields.
     * The order of the definitions is respected when displaying the merge fields in the UI dropdown
     * except that merge fields that are not assigned to any group are displayed at the
     * very bottom of the list.
     */
    definitions?: Array<GroupDefinition | MergeFieldDefinition>;
    /**
     * A prefix used to identify merge fields in the editor data.
     *
     * The list of allowed characters includes: ``'"`!#%:;=@{}~$()*+/?[\]^|``.
     *
     * @default '\{\{'
     */
    prefix?: string;
    /**
     * A suffix used to identify merge fields in the editor data.
     *
     * The list of allowed characters includes: ``'"`!#%:;=@{}~$()*+/?[\]^|``.
     *
     * @default '\}\}'
     */
    suffix?: string;
    /**
     * The data sets that can be displayed in place of the merge fields in the editor.
     *
     * @default []
     */
    dataSets?: Array<DataSetDefinition>;
    /**
     * Determines the available preview modes in the dropdown and menu bar. Possible values are:
     *
     * * `'$labels'` - adds the option to display the labels of the merge fields.
     * * `'$defaultValues'` - adds the option to display the default values.
     * * `'$dataSets'` - adds the options to display each of the configured data sets.
     *
     * At least one mode must be enabled. If more than one preview mode is configured,
     * you can add `previewMergeFields` button to the toolbar to switch between them,
     * and the menu bar button will be added automatically to the `View` category.
     *
     * @default [ '$labels', '$defaultValues', '$dataSets' ]
     */
    previewModes?: Array<string>;
    /**
     * A name of the preview mode that should be active when the editor is initialized. Possible values are:
     *
     * * `'$labels'` - displays the labels of the merge fields,
     * * `'$defaultValues'` - displays the default values,
     * * one of the configured {@link module:merge-fields/mergefieldsconfig~MergeFieldsConfig#dataSets data sets} identifiers.
     *
     * If not set, it will default to the one of the {@link ~MergeFieldsConfig#previewModes available preview modes}, with the priority as
     * in the list above.
     */
    initialPreviewMode?: string;
    /**
     * A flag indicating whether the feature preview mode should interpret merge fields
     * {@link ~DataSetDefinition#values data set values} and {@link ~MergeFieldDefinition#defaultValue default values} as HTML strings and
     * render them as HTML.
     *
     * When set to `true`, the merge field value will be interpreted and rendered as HTML. For example, `'<img src="image.jpg" />'` merge
     * field value will be previewed as the image located at given `src`.
     *
     * When set to `false`, the merge field value will be interpreted as a regular text. For example, `'<img src="image.jpg" />'` will be
     * displayed exactly as defined, meaning that text `<img src="image.jpg" />` will be displayed instead of an image.
     *
     * By default, it is set to `false`.
     *
     * Read more about the security of previewing merge fields HTML values in the
     * {@glink features/merge-fields#using-html-tags-in-merge-fields-values Merge fields feature} documentation.
     *
     * @default false
     */
    previewHtmlValues?: boolean;
    /**
     * Callback used to sanitize the HTML used in merge fields values when they are previewed inside the editor.
     *
     * We strongly recommend overwriting the default function to avoid XSS vulnerabilities.
     *
     * Read more about the security aspect of this feature in {@glink features/merge-fields#using-html-tags-in-merge-fields-values Merge
     * fields feature} documentation.
     *
     * The function receives the input HTML (as a string), and should return an object
     * that matches the {@link module:merge-fields/mergefieldsconfig~MergeFieldsSanitizeOutput} interface.
     *
     * ```ts
     * ClassicEditor
     *   .create( editorElement, {
     *     mergeFields: {
     *       previewHtmlValues: true,
     *       sanitizeHtml( inputHtml ) {
     *         // Strip unsafe elements and attributes, e.g.:
     *         // the `<script>` elements and `on*` attributes.
     *         const outputHtml = sanitize( inputHtml );
     *
     *         return {
     *           html: outputHtml,
     *           // true or false depending on whether the sanitizer stripped anything.
     *           hasChanged: ...
     *         };
     *       },
     *     }
     *   } )
     *   .then( ... )
     *   .catch( ... );
     * ```
     *
     * **Note:** The function is used only when the feature
     * {@link module:merge-fields/mergefieldsconfig~MergeFieldsConfig#previewHtmlValues is configured to render previews}.
     */
    sanitizeHtml?: (html: string) => MergeFieldsSanitizeOutput;
}
/**
 * An object returned by the {@link module:merge-fields/mergefieldsconfig~MergeFieldsConfig#sanitizeHtml} function.
 */
export interface MergeFieldsSanitizeOutput {
    /**
     * An output (safe) HTML that will be inserted into the {@glink framework/architecture/editing-engine editing view}.
     */
    html: string;
    /**
     * A flag that indicates whether the output HTML is different than the input value.
     */
    hasChanged: boolean;
}
export type GroupDefinition = {
    /**
     * The unique identifier of the group.
     *
     * If {@link GroupDefinition#groupLabel} is not specified, the ID will be used as a label in the UI.
     */
    groupId: string;
    /**
     * The human-readable label of the group.
     *
     * It is displayed by the feature's UI.
     */
    groupLabel?: string;
    /**
     * The array of merge fields definitions that belong to the group.
     */
    definitions: Array<MergeFieldDefinition>;
};
/**
 * The definition of a single merge field.
 *
 * Depending on the {@link ~MergeFieldDefinition#type type}, some of the properties may not be relevant:
 *
 * * For `text` merge fields, the `id`, `label`, and `defaultValue` properties are used.
 * * For `block` merge fields, the `id`, `label`, `height`, and `defaultValue` properties are used.
 * * For `image` merge fields, the `id`, `label`, `height`, `width`, and `defaultValue` properties are used.
 */
export interface MergeFieldDefinition {
    /**
     * The unique identifier of the merge field.
     *
     * If {@link ~MergeFieldDefinition#label label} is not specified, the ID will be used as a label.
     *
     * The list of allowed characters includes: `a-z`, `A-Z`, `0-9`, `_`, `.`, and `-`.
     */
    id: string;
    /**
     * The human-readable label of the merge field.
     *
     * It is displayed by the feature's UI and inside the editing area.
     */
    label?: string;
    /**
     * The type of the merge field. It determines how the merge field is rendered in the editor editing area.
     *
     * Possible options are `text` (meaning the merge field will be inline), `block` and `image`.
     *
     * @default 'text'
     */
    type?: MergeFieldType;
    /**
     * The height of the non-text merge field in pixels.
     *
     * It is used only for merge fields of type `block` and `image`. If unset, the default height for block is 120 pixels
     * and for image - 400 pixels.
     *
     * @default 120 (for block)/ 400 (for image)
     */
    height?: number;
    /**
     * The width of the image merge field in pixels.
     *
     * It is used only for merge fields of type `image`. If unset, the default width is 400 pixels.
     *
     * @default 400
     */
    width?: number;
    /**
     * Default value of the merge field.
     *
     * It is used if a value for given merge field has not been provided in a data set and in the default values preview mode.
     */
    defaultValue?: MergeFieldDataSetValue;
}
export type DataSetDefinition = {
    /**
     * A unique identifier of the data set. It cannot start with `$`, as it is reserved for internal use.
     */
    id: string;
    /**
     * A human-readable label of the data set.
     */
    label?: string;
    /**
     * The data to be displayed in the editor in place of merge fields when the data set is previewed.
     *
     * The keys of this object are merge field IDs, while values are the merge field values, which can be strings or functions.
     * If the value is specified as a function, it should return a string. The function will be evaluated each time the data set values
     * are retrieved.
     *
     * ```ts
     * const mergeFieldsConfig = {
     * 	dataSets: [
     *		id: 'customDataSet',
     *		values: {
     *			companyName: 'CKSource',
     *			productName: 'CKEditor 5'
     *		}
     *	]
     * };
     * ```
     */
    values: Record<string, MergeFieldDataSetValue>;
};
export type MergeFieldDataSetValue = string | ((editor: Editor) => string);
export type MergeFieldType = 'text' | 'block' | 'image';
