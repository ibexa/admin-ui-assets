/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module table/utils/table-properties
 */
import type { BoxSides } from 'ckeditor5/src/engine.js';
/**
 * Returns a string if all four values of box sides are equal.
 *
 * If a string is passed, it is treated as a single value (pass-through).
 *
 * ```ts
 * // Returns 'foo':
 * getSingleValue( { top: 'foo', right: 'foo', bottom: 'foo', left: 'foo' } );
 * getSingleValue( 'foo' );
 *
 * // Returns undefined:
 * getSingleValue( { top: 'foo', right: 'foo', bottom: 'bar', left: 'foo' } );
 * getSingleValue( { top: 'foo', right: 'foo' } );
 * ```
 */
export declare function getSingleValue(objectOrString: BoxSides | string | undefined): string | undefined;
/**
 * Adds a unit to a value if the value is a number or a string representing a number.
 *
 * **Note**: It does nothing to non-numeric values.
 *
 * ```ts
 * getSingleValue( 25, 'px' ); // '25px'
 * getSingleValue( 25, 'em' ); // '25em'
 * getSingleValue( '25em', 'px' ); // '25em'
 * getSingleValue( 'foo', 'px' ); // 'foo'
 * ```
 *
 * @param defaultUnit A default unit added to a numeric value.
 */
export declare function addDefaultUnitToNumericValue(value: string | number | undefined, defaultUnit: string): string | number | undefined;
export interface NormalizedDefaultProperties {
    borderStyle: string;
    borderWidth: string;
    borderColor: string;
    backgroundColor: string;
    width: string;
    height: string;
    alignment?: string;
    padding?: string;
    verticalAlignment?: string;
    horizontalAlignment?: string;
}
/**
 * Options used to determine which properties should be added to the normalized configuration.
 */
export type NormalizeTableDefaultPropertiesOptions = {
    /**
     * Whether the "alignment" property should be added.
     */
    includeAlignmentProperty?: boolean;
    /**
     * Whether the "padding" property should be added.
     */
    includePaddingProperty?: boolean;
    /**
     * Whether the "verticalAlignment" property should be added.
     */
    includeVerticalAlignmentProperty?: boolean;
    /**
     * Whether the "horizontalAlignment" property should be added.
     */
    includeHorizontalAlignmentProperty?: boolean;
    /**
     * Whether the content is right-to-left.
     */
    isRightToLeftContent?: boolean;
};
/**
 * Returns the normalized configuration.
 *
 * @param config The configuration to normalize.
 * @param options Options used to determine which properties should be added.
 */
export declare function getNormalizedDefaultProperties(config?: Partial<NormalizedDefaultProperties>, options?: NormalizeTableDefaultPropertiesOptions): NormalizedDefaultProperties;
/**
 * Returns the normalized default table properties.
 *
 * @param config The configuration to normalize.
 * @param options Options used to determine which properties should be added.
 */
export declare function getNormalizedDefaultTableProperties(config?: Partial<NormalizedDefaultProperties>, options?: NormalizeTableDefaultPropertiesOptions): NormalizedDefaultProperties;
/**
 * Returns the normalized default cell properties.
 *
 * @param config The configuration to normalize.
 * @param options Options used to determine which properties should be added.
 */
export declare function getNormalizedDefaultCellProperties(config?: Partial<NormalizedDefaultProperties>, options?: NormalizeTableDefaultPropertiesOptions): NormalizedDefaultProperties;
