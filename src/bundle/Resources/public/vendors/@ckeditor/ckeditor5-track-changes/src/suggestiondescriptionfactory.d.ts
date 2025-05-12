/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { type Locale, type PriorityString } from 'ckeditor5/src/utils.js';
import type { Schema, Element } from 'ckeditor5/src/engine.js';
import type Suggestion from './suggestion.js';
/**
 * Creates descriptions for suggestions and suggestions chains.
 *
 * The class manages everything related to generating descriptions for suggestions. Here, you register labels for elements,
 * attributes, or custom callback for non-regular cases.
 *
 * One or more suggestions that are grouped together (based ond various conditions) create "suggestion chain".
 * In such chain one suggestion may impact other suggestion when it comes to the description of the whole chain.
 * For example, insertion next to deletion results in "Replaced" description.
 */
export default class SuggestionDescriptionFactory {
    constructor(schema: Schema, locale: Locale);
    /**
     * Returns descriptions for given suggestion chain.
     *
     * The structure of the descriptions array is as follows (explained on an example):
     *
     * ```ts
     * [
     *	 { type: 'insertion', content: '*Insert:* 2 paragraphs' },
     *	 { type: 'insertion', content: '*Insert:* image },
     *	 { type: 'replace', content: '*Replace:* "Foo" *with* "Bar"' }
     * ]
     * ```
     *
     * In above example there are three description instances (or lines). Two new (empty) paragraphs were added,
     * an image was added and then "Foo" text was removed and "Bar" text was added. For example, above structure could be rendered as:
     *
     * ```html
     * <p><strong>Insert:</strong> 2 paragraphs</p>
     * <p><strong>Insert:</strong> image</p>
     * <p><strong>Replace:</strong> "Foo" <strong>with</strong> "Bar"</p>
     * ```
     */
    getDescriptions(suggestions: Array<Suggestion>): Array<Description>;
    /**
     * Registers a callback function that returns a custom description for a suggestion.
     *
     * Registered callback is fired for a suggestion whenever there is a need to generate a description for that suggestion.
     *
     * The callback takes the suggestion instance as a parameter and should return
     * {@link module:track-changes/suggestiondescriptionfactory~Description description object} or a falsy value
     * if the suggestion was not handled by the callback.
     *
     * Example of a description callback for the bold style:
     *
     * ```ts
     * suggestionDescriptionFactory.registerDescriptionCallback( suggestion => {
     *		const { data } = suggestion;
     *
     *		// Omit suggestions that are not bold style suggestions.
     *		if ( !data || data.commandName !== 'bold' ) {
     *			return;
     *		}
     *
     *		const isSet = !!data.commandParams[ 0 ].forceValue;
     *		const content = isSet ? '*Set format:* bold' : '*Remove format:* bold';
     *
     *		return {
     *			type: 'format',
     *			content
     *		};
     *	} );
     * ```
     */
    registerDescriptionCallback(callback: DescriptionCallback): void;
    /**
     * For given `elementName` registers how this element will be labeled in a description (for example when it is added
     * or removed).
     *
     * Instead of a string name you may provide a matching function that takes item {@link module:engine/model/item~Item} as an input
     * and should return boolean value.
     *
     * Provided label callback takes one parameter, `quantity`, and is expected to return the label for the element as a string.
     *
     * A simple use case without using internationalization:
     *
     * ```ts
     * suggestionDescriptionFactory.registerElementLabel(
     *		'paragraph',
     *		quantity => quantity == 1 ? 'paragraph' : quantity + ' paragraphs'
     * );
     * ```
     *
     * If you want your feature to be localized to other languages, use localization service:
     *
     * ```ts
     * const t = editor.locale.t; // Remember that you have to use function named `t`.
     *
     * suggestionDescriptionFactory.registerElementLabel(
     *		'paragraph',
     *		quantity => t( { string: 'paragraph', plural: '%0 paragraphs', id: 'ELEMENT_PARAGRAPH' }, quantity )
     * );
     * ```
     */
    registerElementLabel(elementNameOrCallback: string | Function, labelCallback: LabelCallback, priority?: PriorityString): void;
    /**
     * For given `attributeName` registers how this attribute will be labeled in a description (for example when it is added
     * or removed).
     *
     * Example usage with internationalization:
     *
     * ```ts
     * const t = editor.locale.t; // Remember that you have to use function named `t`.
     *
     * suggestionDescriptionFactory.registerAttributeLabel(
     *		'bold',
     *		t( 'bold' )
     * );
     * ```
     */
    registerAttributeLabel(attributeName: string, attributeLabel: string): void;
    /**
     * Returns label registered for given element or the element name if there is no label registered for it.
     */
    getItemLabel(element: Element, quantity?: number): string;
}
/**
 * A description for the suggestion.
 *
 * ```ts
 * {
 *		type: 'format',
 *		label: '*Set format:* bold'
 * }
 * ```
 *
 * A description for the color-related suggestions like font color may specify the `color` property that will provide a better UX
 * by displaying a color box next to the suggestion.
 *
 * ```ts
 * {
 * 		type: 'format',
 * 		label: '*Set font color:*',
 * 		color: {
 * 			value: 'hsl( 60, 60%, 60% )',
 * 			title: 'yellow'
 * 		}
 * }
 * ```
 */
export interface Description {
    type: 'insertion' | 'deletion' | 'replace' | 'format';
    /**
     * Description label. You may use `*` to bold part of the label.
     */
    content: string;
    /**
     * The optional `color` property used for color-related suggestions.
     * The object should provide the `value` (for displaying the color) and `title` (for describing the color) fields.
     */
    color?: {
        value: string;
        title: string;
    };
}
export type DescriptionCallback = (suggestion: Suggestion) => Description | DescriptionItem | undefined;
export type LabelCallback = (quantity: number) => string;
export interface LabelCallbackObject {
    matchingCallback: (element: Element) => boolean;
    label: LabelCallback;
    priority: PriorityString;
}
/**
 * An intermediate state which is easier to operate on when consecutive suggestion
 * ranges are traversed.
 */
interface DescriptionItem {
    type: 'text' | 'addEmptyContainer' | 'addObject' | 'removeEmptyContainer' | 'removeObject' | 'addContainer' | 'removeContainer' | 'addFormat' | 'removeFormat';
    add?: string;
    remove?: string;
    element?: Element;
    quantity?: number;
    key?: string;
}
export {};
